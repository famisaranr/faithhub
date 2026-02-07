import { DEV_CENTENNIAL_CONFIG } from "@/components/engine/dev-config";
import { TenantApp } from "@/components/TenantApp";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Tenant } from "@/components/member-app/types";

export const dynamic = 'force-dynamic';

export default async function TenantPage({ params }: { params: Promise<{ host: string }> }) {
    try {
        const { host } = await params;
        console.log(`[TenantPage] Loading for host: ${host}`);

        // Still using dev config for the marketing site part for now
        const config = DEV_CENTENNIAL_CONFIG;

        let tenant: Tenant | null = null;
        let dbErrorInstance: Error | null = null;

        try {
            tenant = await db.tenant.findUnique({
                where: { slug: host },
            });
            console.log(`[TenantPage] Found tenant: ${tenant?.slug} (ID: ${tenant?.id})`);
        } catch (dbError) {
            console.error("[TenantPage] Database query failed:", dbError);
            dbErrorInstance = dbError as Error;
            // Continue to fallback checks
        }

        // If we have a config, we can render in limited mode even if DB failed or tenant not found
        // But if tenant was found, we pass it.
        // If tenant NOT found and NO config (impossible here as config is hardcoded), we 404.

        // For the specific case where DB failed (tenant is null) but we want to show Limited Mode:
        if (!tenant && config) {
            console.log("[TenantPage] Rendering with Dev Config (Tenant not found or DB error)");
            return (
                <div className="min-h-screen flex flex-col">
                    <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm font-bold">
                        <div>⚠️ {tenant === null ? "Database Unreachable" : "Tenant Not Found"} - Running in Limited Mode</div>
                        {dbErrorInstance && (
                            <div className="text-xs font-mono mt-1 opacity-80 max-w-md mx-auto truncate">
                                Error: {dbErrorInstance.message}
                            </div>
                        )}
                    </div>
                    <TenantApp config={config} tenant={undefined} />
                </div>
            );
        }

        if (!tenant) {
            notFound();
        }

        return <TenantApp config={config} tenant={tenant} />;

    } catch (e) {
        console.error("[TenantPage] Critical Error:", e);
        return (
            <div className="min-h-screen flex items-center justify-center p-8 text-center bg-slate-50">
                <div className="max-w-md space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900">Service Temporarily Unavailable</h1>
                    <p className="text-slate-600">
                        A critical error occurred while loading this page.
                    </p>
                    <div className="p-4 bg-slate-200 rounded text-left text-xs font-mono overflow-auto">
                        Error: {(e as Error).message}
                    </div>
                </div>
            </div>
        );
    }
}
