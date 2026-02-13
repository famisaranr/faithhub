import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "ourfaithhub.com";
const APP_ENTRY = "/app"; // change to "/sign-in" if you want auth first

function getHostname(req: NextRequest) {
    return (req.headers.get("x-forwarded-host") || req.headers.get("host") || "")
        .split(":")[0]
        .toLowerCase();
}

function getTenantSlugFromHostname(hostname: string) {
    if (hostname === ROOT_DOMAIN) return null;
    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) return hostname.replace(`.${ROOT_DOMAIN}`, "");
    return null; // custom domains later
}

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const path = url.pathname;

    const hostname = getHostname(req);
    const tenantSlug = process.env.SINGLE_TENANT_SLUG || getTenantSlugFromHostname(hostname);

    // 1) ROOT DOMAIN: allow marketing landing only here
    if (hostname === ROOT_DOMAIN) {
        return NextResponse.next();
    }

    // 2) TENANT SUBDOMAIN: never allow marketing landing routes
    // Redirect "/" (and optionally "/landing") to app entry.
    if (path === "/" || path === "/landing" || path.startsWith("/landing/")) {
        url.pathname = APP_ENTRY;
        return NextResponse.redirect(url);
    }

    // 3) Inject tenant slug into the REQUEST headers for server-side resolution
    const requestHeaders = new Headers(req.headers);
    if (tenantSlug) requestHeaders.set("x-tenant-slug", tenantSlug);

    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
