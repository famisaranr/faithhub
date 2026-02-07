'use server';

import { db as prisma } from '@/lib/db'; // Assuming generic prisma client export
import { InventoryItem, Member, OfficerAlert, ServicePlan } from '@prisma/client';

const FIXED_TENANT_SLUG = 'batangas-city-central';

async function getTenantId() {
    const tenant = await prisma.tenant.findUnique({
        where: { slug: FIXED_TENANT_SLUG },
        select: { id: true }
    });
    return tenant?.id;
}

export async function getOfficerDashboardMetrics() {
    const tenantId = await getTenantId();
    if (!tenantId) return null;

    const [membersCount, inventoryLowCount, activeAlerts, upcomingService] = await Promise.all([
        prisma.member.count({ where: { tenantId, status: 'active' } }),
        prisma.inventoryItem.count({ where: { tenantId, status: { in: ['Low', 'Critical'] } } }),
        prisma.officerAlert.findMany({
            where: { tenantId, isRead: false },
            orderBy: { timestamp: 'desc' },
            take: 5
        }),
        prisma.servicePlan.findFirst({
            where: { tenantId, date: { gte: new Date() } },
            orderBy: { date: 'asc' }
        })
    ]);

    return {
        stats: {
            members: membersCount,
            inventoryIssues: inventoryLowCount,
            nextService: upcomingService?.title || 'None Upcoming'
        },
        alerts: activeAlerts
    };
}

export async function getMembers(query: string = '', statusFilter: string = 'all'): Promise<Member[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    const where: any = { tenantId };

    if (query) {
        where.name = { contains: query, mode: 'insensitive' };
    }

    if (statusFilter && statusFilter !== 'all') {
        where.status = statusFilter;
    }

    return prisma.member.findMany({
        where,
        orderBy: { name: 'asc' }
    });
}

export async function getServicePlans(targetDate?: Date): Promise<ServicePlan[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    // Default to the upcoming Sabbath if no date provided
    let referenceDate = targetDate || new Date();

    // Calculate the Sabbath of the requested week
    // If reference is Sabbath (6), use it. If not, find next Sabbath.
    const day = referenceDate.getDay();
    const daysUntilSabbath = (6 - day + 7) % 7;
    const sabbathDate = new Date(referenceDate);
    sabbathDate.setDate(referenceDate.getDate() + daysUntilSabbath);
    sabbathDate.setHours(23, 59, 59, 999); // End of Sabbath

    // Start of the "Service Week" (e.g., Wednesday for Midweek)
    // Sabbath is day 6. Wed is day 3. So 3 days before Sabbath.
    const weekStartDate = new Date(sabbathDate);
    weekStartDate.setDate(sabbathDate.getDate() - 4); // Tuesday/Wednesday buffer
    weekStartDate.setHours(0, 0, 0, 0);

    return prisma.servicePlan.findMany({
        where: {
            tenantId,
            date: {
                gte: weekStartDate,
                lte: sabbathDate
            }
        },
        orderBy: { date: 'asc' }
    });
}

export async function getInventory(): Promise<InventoryItem[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    return prisma.inventoryItem.findMany({
        where: { tenantId },
        orderBy: { name: 'asc' }
    });
}

export async function markAlertRead(alertId: string) {
    const tenantId = await getTenantId();
    if (!tenantId) return;

    await prisma.officerAlert.update({
        where: { id: alertId, tenantId }, // Ensure tenant isolation
        data: { isRead: true }
    });
}

// --- CSV Ingestion & Import Logic ---

interface CsvServicePlanRow {
    service_date: string; // YYYY-MM-DD
    service_type: string; // Midweek, Vespers, Sabbath
    segment_order: string | number;
    segment_name: string;
    leader?: string;
    hymn_number?: string | number;
    notes?: string;
}

interface IngestResult {
    success: boolean;
    message: string;
    importId?: string;
    warnings?: string[];
}

export async function ingestServicePlans(
    rows: CsvServicePlanRow[],
    filename: string,
    dryRun: boolean = true
): Promise<IngestResult> {
    const tenantId = await getTenantId();
    if (!tenantId) return { success: false, message: "Unauthorized" };

    const warnings: string[] = [];
    const validPlans: any[] = [];

    // 1. Group rows by Date + Service Type -> Single ServicePlan
    const groupedPlans: Record<string, any[]> = {};

    for (const [index, row] of rows.entries()) {
        const rowNum = index + 1;

        // Basic Validation
        if (!row.service_date || !row.segment_name) {
            warnings.push(`Row ${rowNum}: Missing date or segment name. Skipped.`);
            continue;
        }

        const dateStr = row.service_date;
        const typeStr = row.service_type?.toLowerCase() || 'divine_worship';
        const key = `${dateStr}_${typeStr}`;

        if (!groupedPlans[key]) {
            groupedPlans[key] = [];
        }
        groupedPlans[key].push({
            ...row,
            rowNum
        });
    }

    // 2. Process Groups into ServicePlan objects
    for (const key in groupedPlans) {
        const groupRows = groupedPlans[key];
        const [dateStr, typeStr] = key.split('_');

        // Validate Date
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            warnings.push(`Invalid date format for group ${key}. Skipped.`);
            continue;
        }

        // Map Service Type
        let dbType = 'divine_worship';
        if (typeStr.includes('midweek')) dbType = 'midweek';
        else if (typeStr.includes('vespers')) dbType = 'vespers';
        else if (typeStr.includes('sabbath')) dbType = 'sabbath_school';

        // Construct ServicePlan Items
        const items = groupRows
            .sort((a, b) => Number(a.segment_order) - Number(b.segment_order))
            .map(r => ({
                time: "10:00", // Default time
                title: r.segment_name,
                description: r.notes || "",
                presenter: r.leader || "",
                action: "speak" // default
            }));

        validPlans.push({
            tenantId,
            date,
            type: dbType,
            title: `${groupRows[0].service_type || 'Service'}`,
            items,
        });
    }

    if (dryRun) {
        return {
            success: true,
            message: `Dry Run: Parsed ${validPlans.length} service plans from ${rows.length} rows.`,
            warnings
        };
    }

    // 3. Commit to DB
    try {
        // Create Import Log
        const importLog = await prisma.importLog.create({
            data: {
                tenantId,
                filename,
                status: 'success',
                rowCount: rows.length,
                importedBy: 'Officer'
            }
        });

        // Insert Plans in Bulk
        const plansToInsert = validPlans.map(plan => ({
            ...plan,
            importId: importLog.id,
            // Ensure items is strictly JSON compatible if needed, though Prisma handles it
        }));

        const batchResult = await prisma.servicePlan.createMany({
            data: plansToInsert
        });

        const insertedCount = batchResult.count;

        return {
            success: true,
            message: `Successfully imported ${insertedCount} plans.`,
            importId: importLog.id,
            warnings
        };

    } catch (error) {
        console.error("Ingest Error", error);
        return { success: false, message: "Database commit failed.", warnings: [(error as Error).message] };
    }
}
