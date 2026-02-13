// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // export default clerkMiddleware(async (auth, req) => {
    const url = req.nextUrl;

    // Get hostname (e.g. events.faithhub.com or localhost:3000)
    let hostname = req.headers.get("host")!;

    // Handle localhost ports dynamically
    const isLocalhost = hostname.includes("localhost");
    const isRootDomain =
        hostname === "faithhub.com" ||
        (isLocalhost && !hostname.includes(".localhost")); // e.g. localhost:3000

    // Normalize tenant domains for localhost
    if (isLocalhost && hostname.includes(".localhost")) {
        hostname = hostname.replace(/\.localhost(:\d+)?$/, `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    }

    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

    // Rewrites for app pages
    // SINGLE TENANT MODE: If SINGLE_TENANT_SLUG is set, force all traffic to that tenant
    // SINGLE TENANT MODE: If SINGLE_TENANT_SLUG is set, force all traffic to that tenant
    if (process.env.SINGLE_TENANT_SLUG && !path.startsWith("/landing")) {
        return NextResponse.rewrite(
            new URL(`/${process.env.SINGLE_TENANT_SLUG}${path}`, req.url)
        );
    }

    // MULTI TENANT MODE: Use hostname to determine tenant
    // IF HOST IS NOT ROOT DOMAIN
    if (!isRootDomain && hostname !== process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
        // Extract subdomain slug from hostname
        // e.g., "laway-sda.ourfaithhub.com" -> "laway-sda"
        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "ourfaithhub.com";
        const tenantSlug = hostname.replace(`.${rootDomain}`, "");

        // Dynamic Tenant Routing
        return NextResponse.rewrite(
            new URL(`/${tenantSlug}${path}`, req.url)
        );
    }

    return NextResponse.next();
}
// });

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
