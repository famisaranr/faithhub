"use server";

import { BulletinItem, ChurchEvent, MemberProfile, ScheduleItem, WorshipServiceData, DevotionalContent, NotificationItem } from "@/types/member-app";
import { db as prisma } from "@/lib/db";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getMemberProfile(): Promise<MemberProfile> {
    await delay(500);
    return {
        id: "mem_123",
        firstName: "Russell",
        lastName: "Famisaran",
        email: "russell.famisaran@example.com",
        role: "officer",
        church: "Batangas City Central",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Russell"
    };
}

export async function getSabbathSchedule(): Promise<ScheduleItem[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    // Find next Sabbath
    const today = new Date();
    const day = today.getDay();
    const daysUntilSabbath = (6 - day + 7) % 7;
    const nextSabbath = new Date(today);
    nextSabbath.setDate(today.getDate() + daysUntilSabbath);
    nextSabbath.setHours(0, 0, 0, 0);

    const endSabbath = new Date(nextSabbath);
    endSabbath.setHours(23, 59, 59, 999);

    const plans = await prisma.servicePlan.findMany({
        where: {
            tenantId,
            date: {
                gte: nextSabbath,
                lte: endSabbath
            }
        },
        orderBy: { date: 'asc' } // or type priority
    });

    const schedule: ScheduleItem[] = [];

    // Map ServicePlans to ScheduleItems
    // This assumes specific types define the order: Sabbath School -> Divine Service -> AY
    // We might want to sort by time if we had it in the plan, but plan has items with time.

    // Flatten all items from all plans for the day
    plans.forEach(plan => {
        const type = plan.type === 'divine_worship' ? 'divine_service' : plan.type; // Map type

        // Items are stored as JSON, we trust they match the structure
        const items = (plan.items as any[]) || [];

        items.forEach((item: any, index: number) => {
            schedule.push({
                id: `${plan.id}-${index}`,
                time: item.time,
                title: item.title,
                description: item.presenter || item.description,
                details: item.description, // Mapping description to details for extra info
                type: type as any
            });
        });
    });

    // If no schedule found, return mock fallback
    // Fallback Schedule
    if (schedule.length === 0) {
        return [
            {
                id: "default-ss-1",
                time: "08:30",
                title: "Sabbath School",
                description: "Superintendent",
                details: "Start of Services",
                type: "sabbath_school"
            },
            {
                id: "default-ss-2",
                time: "09:30",
                title: "Lesson Study",
                description: "Lesson Review",
                details: "Separation by Classes",
                type: "sabbath_school"
            },
            {
                id: "default-ds-1",
                time: "10:45",
                title: "Divine Worship",
                description: "Speaker",
                details: "Topic",
                type: "divine_service"
            },
            {
                id: "default-ay-1",
                time: "16:00",
                title: "Adventist Youth (AY)",
                description: "Host: Youth Department",
                details: "Afternoon Program",
                type: "ay"
            }
        ];
    }

    return schedule.sort((a, b) => a.time.localeCompare(b.time));
}

export async function getBulletins(): Promise<BulletinItem[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    const bulletins = await prisma.bulletin.findMany({
        where: { tenantId },
        orderBy: { date: 'desc' },
        take: 10
    });

    return bulletins.map(b => ({
        id: b.id,
        title: b.title,
        content: "Click to open bulletin", // Description is optional or contained in file
        date: b.date.toLocaleDateString(),
        priority: 'normal',
        fileUrl: b.fileUrl // We'll need to add this to BulletinItem type if not exists, or handle in UI
        // Note: BulletinItem definition in types/member-app might need update to support fileUrl
    }));
}

export async function getUpcomingEvents(): Promise<ChurchEvent[]> {
    const tenantId = await getTenantId();
    if (!tenantId) return [];

    const events = await prisma.event.findMany({
        where: {
            tenantId,
            status: 'PUBLISHED',
            startDate: { gte: new Date() }
        },
        orderBy: { startDate: 'asc' },
        take: 5
    });

    return events.map(e => ({
        id: e.id,
        title: e.title,
        date: e.startDate.toLocaleDateString(),
        time: e.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        location: e.location || 'TBA',
        description: e.description || '',
        imageUrl: (e.pageConfig as any)?.imageUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop",
        requiresRsvp: false // Default for now
    }));
}

export async function getWorshipData(): Promise<WorshipServiceData> {
    // This is typically the "Divine Worship" plan.
    // We can fetch it similarly to getSabbathSchedule but specifically separate it.
    // For now keeping mock to avoid breaking "Worship" mode if it relies on specific structure not yet in ServicePlan
    await delay(500);
    return {
        preacher: "Pr. Jun Cruz (SCLC)",
        topic: "Faith in the Fire",
        text: "Daniel 3:17-18",
        hymns: {
            opening: "001 - Praise to the Lord",
            scripture: "Psalm 23",
            closing: "524 - It Is Well With My Soul"
        },
        liturgy: [
            { type: "Doxology", title: "Praise God From Whom All Blessings Flow", action: "Stand" },
            { type: "Invocation", title: "Invocation", presenter: "Elder On Duty", action: "Kneel" },
            { type: "Welcome", title: "Welcome & Greetings", presenter: "Clerk on Duty" },
            { type: "Hymn", title: "001 - Praise to the Lord", action: "Stand" },
            { type: "Scripture", title: "Daniel 3:17-18", details: "Read by: Sis. Anna", action: "Stand" },
            { type: "Prayer", title: "Pastoral Prayer", presenter: "Elder On Duty", action: "Kneel" },
            { type: "Giving", title: "Tithes & Offerings", details: "Offertory Music", action: "Sit" },
            { type: "Feature", title: "Children's Story", presenter: "Teacher Joy" },
            { type: "Music", title: "Special Music", presenter: "Youth Choir" },
            { type: "Message", title: "Faith in the Fire", presenter: "Pr. Jun Cruz", action: "Sit" },
            { type: "Hymn", title: "524 - It Is Well With My Soul", action: "Stand" },
            { type: "Closing", title: "Benediction", presenter: "Pr. Jun Cruz", action: "Stand" }
        ]
    };
}

export async function getDailyDevotional(type: 'morning' | 'evening'): Promise<DevotionalContent> {
    await delay(600);
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (type === 'morning') {
        return {
            date,
            type: 'morning',
            title: "The Power of Patience",
            source: "Conflict and Courage",
            page: "124",
            verse: "Rest in the Lord, and wait patiently for Him. Psalm 37:7",
            content: [
                "God expects His children to be patient. In our modern world of instant gratification, patience is a virtue that is often overlooked.",
                "To wait for God's timing requires faith. It means trusting that He knows what is best for us and when it is best to provide it.",
                "Let us start this day by committing our plans to Him, asking for the strength to wait on His perfect will."
            ]
        };
    } else {
        return {
            date,
            type: 'evening',
            title: "Rest for the Weary",
            source: "Maranatha",
            page: "202",
            verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Matthew 11:28",
            content: [
                "As the day comes to a close, take a moment to unburden your heart. The trials of the day may have been heavy, but His grace is sufficient.",
                "Jesus invites us to exchange our weariness for His rest. It is not just physical sleep, but a deep spiritual peace that He offers.",
                "Sleep tonight in the assurance that He watches over you."
            ]
        };
    }
}



async function getTenantId() {
    // In a real app, this would be fetched from the session or request headers (subdomain)
    // For this demo, we'll return a hardcoded ID for 'batangas' to match Officer Portal
    const tenant = await prisma.tenant.findUnique({
        where: { slug: 'batangas' }
    });
    return tenant?.id;
}

export async function submitOffering(breakdown: Record<string, number>, proof: string) {
    const tenantId = await getTenantId();
    if (!tenantId) return { success: false, message: "Unauthorized" };

    const member = await getMemberProfile();
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

    try {
        await prisma.offering.create({
            data: {
                tenantId,
                memberId: member.id,
                amount: total,
                breakdown,
                proof,
                status: "PENDING"
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to submit offering:", error);
        return { success: false, message: "Failed to submit offering" };
    }
}

export async function verifyOfficerPin(pin: string): Promise<boolean> {
    await delay(1000);
    return pin === "2026"; // Mock PIN
}

// Profile & Settings Actions

export async function getNotifications(): Promise<NotificationItem[]> {
    await delay(600);
    return [
        {
            id: "n1",
            type: "alert",
            title: "Sabbath Protocol",
            message: "Sunset is approaching in 15 minutes. Please prepare for worship.",
            time: "15m ago",
            read: false
        },
        {
            id: "n2",
            type: "info",
            title: "New Bulletin",
            message: "The weekly bulletin has been updated for Sabbath, Feb 8.",
            time: "2h ago",
            read: true
        },
        {
            id: "n3",
            type: "success",
            title: "Tithe Received",
            message: "Your tithe of ₱5,000 has been successfully recorded. Thank you for your faithfulness.",
            time: "1d ago",
            read: true
        }
    ];
}

export async function markNotificationAsRead(id: string) {
    await delay(300);
    return { success: true };
}

export async function logout() {
    await delay(1000);
    return { success: true };
}
