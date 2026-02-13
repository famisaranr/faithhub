import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "ourfaithhub.com";

function getHostname(req: NextRequest) {
    return (req.headers.get("x-forwarded-host") || req.headers.get("host") || "")
        .split(":")[0]
        .toLowerCase();
}

function getTenantSlug(hostname: string) {
    if (hostname === ROOT_DOMAIN) return null;

    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
        return hostname.replace(`.${ROOT_DOMAIN}`, "");
    }

    // custom domains later: map hostname -> tenant
    return null;
}

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // SINGLE TENANT MODE (optional fallback)
    if (process.env.SINGLE_TENANT_SLUG) {
        res.headers.set("x-tenant-slug", process.env.SINGLE_TENANT_SLUG);
        return res;
    }

    const hostname = getHostname(req);
    const tenantSlug = getTenantSlug(hostname);

    if (tenantSlug) {
        res.headers.set("x-tenant-slug", tenantSlug);
    }

    return res;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
