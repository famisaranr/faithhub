import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Check database connection
        const [hymnCount, recordingCount, tenantCount] = await Promise.all([
            db.hymn.count(),
            db.recording.count(),
            db.tenant.count(),
        ]);

        return NextResponse.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            database: {
                connected: true,
                hymns: hymnCount,
                recordings: recordingCount,
                tenants: tenantCount,
            },
            checks: {
                hymnalData: hymnCount >= 12 && recordingCount >= 12,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: "unhealthy",
                timestamp: new Date().toISOString(),
                database: {
                    connected: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                },
            },
            { status: 500 }
        );
    }
}
