"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const createTenantSchema = z.object({
    churchName: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
    customDomain: z.string().optional(),
    adminName: z.string().min(2),
    adminEmail: z.string().email(),
});

export async function createTenant(data: z.infer<typeof createTenantSchema>) {
    const validated = createTenantSchema.parse(data);

    try {
        // Check for existing slug
        const existing = await db.tenant.findUnique({
            where: { slug: validated.slug }
        });

        if (existing) {
            return { success: false, error: "Slug already taken" };
        }

        const tenant = await db.tenant.create({
            data: {
                name: validated.churchName,
                slug: validated.slug,
                customDomain: validated.customDomain || null,
                members: {
                    create: {
                        name: validated.adminName,
                        email: validated.adminEmail,
                        role: "officer",
                        status: "active"
                    }
                },
                // Create a default service plan for next Sabbath
                servicePlans: {
                    create: {
                        date: new Date(), // Today/Now, effectively
                        type: "divine_worship",
                        title: "Inaugural Service",
                        items: [
                            { time: "11:00", title: "Prelude", description: "Organist", action: "play_music" },
                            { time: "11:05", title: "Invocation", description: "Elder", action: "mic_on" },
                        ]
                    }
                }
            }
        });

        return { success: true, slug: tenant.slug };
    } catch (error) {
        console.error("Failed to create tenant:", error);
        return { success: false, error: "Failed to create tenant. Please try again." };
    }
}
