import { DEV_CENTENNIAL_CONFIG } from "@/components/engine/dev-config";
import { TenantApp } from "@/components/TenantApp";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function TenantPage({ params }: { params: Promise<{ host: string }> }) {
    const { host } = await params;

    const tenant = await db.tenant.findUnique({
        where: { slug: host },
    });

    if (!tenant) {
        notFound();
    }

    // Still using dev config for the marketing site part for now
    const config = DEV_CENTENNIAL_CONFIG;

    return <TenantApp config={config} tenant={tenant} />;
}
