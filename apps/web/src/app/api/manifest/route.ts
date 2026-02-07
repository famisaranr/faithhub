import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Extract host from headers to determine tenant
    const host = req.headers.get("host") || "faithhub.com";

    // Logic to determine tenant details could theoretically query DB here
    // For MVP/Demo, we assume everything ending in "localhost" or specific domains is "Centennial" or "FaithHub"

    const isCentennial = host.includes("centennial") || host.includes("batangascitysda");

    if (isCentennial) {
        return NextResponse.json({
            name: "Batangas City SDA Centennial",
            short_name: "BCSDA 100",
            description: "100 Years of Grace - Batangas City Central Seventh-day Adventist Church",
            start_url: "/",
            display: "standalone",
            background_color: "#1e293b", // Navy
            theme_color: "#fbbf24", // Gold
            icons: [
                {
                    src: "/icon-192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/icon-512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        });
    }

    // Default Platform Manifest
    return NextResponse.json({
        name: "FaithHub Platform",
        short_name: "FaithHub",
        description: "The Operating System for Global Adventism",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png"
            }
        ]
    });
}
