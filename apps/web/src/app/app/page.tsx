import { DEV_CENTENNIAL_CONFIG } from "@/components/engine/dev-config";
import { TenantApp } from "@/components/TenantApp";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Tenant } from "@/components/member-app/types";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function AppPage() {
    try {
        // Read tenant slug from header set by middleware
        const headersList = await headers();
        const tenantSlug = headersList.get("x-tenant-slug");

        if (!tenantSlug) {
            // No tenant slug means this is accessed without proper routing
            notFound();
        }

        console.log(`[AppPage] Loading tenant: ${tenantSlug}`);

        const config = DEV_CENTENNIAL_CONFIG;
        let tenant: Tenant | null = null;
        let dbErrorInstance: Error | null = null;

        try {
            tenant = await db.tenant.findUnique({
                where: { slug: tenantSlug },
            });
            console.log(`[AppPage] Found tenant: ${tenant?.slug} (ID: ${tenant?.id})`);
        } catch (dbError) {
            console.error("[AppPage] Database query failed:", dbError);
            dbErrorInstance = dbError as Error;
        }

        // If tenant not found but we have config, show limited mode
        if (!tenant && config) {
            console.log("[AppPage] Rendering with Dev Config (Tenant not found or DB error)");
            return (
                <div className="min-h-screen flex flex-col">
                    <div className="bg-yellow-500 text-black px-4 py-2 text-center text-sm font-bold">
                        <div>⚠️ {dbErrorInstance ? "Database Unreachable" : "Tenant Not Found"} - Running in Limited Mode</div>
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
        console.error("[AppPage] Critical Error:", e);
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
