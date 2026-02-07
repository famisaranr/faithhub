"use server";

import { PrismaClient } from "@prisma/client";
import { RsvpSchema, RsvpFormValues } from "@/lib/validators/rsvp";

const prisma = new PrismaClient();

export async function submitRsvp(data: RsvpFormValues) {
    const result = RsvpSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: "Invalid data", details: result.error.flatten() };
    }

    const { firstName, lastName, ...rest } = result.data;
    const fullName = `${firstName} ${lastName}`;

    try {
        // Check if event exists (mock check for now if DB is empty, but prisma call will handle real DB)
        /* 
        const event = await prisma.event.findUnique({ where: { id: rest.eventId } });
        if (!event) return { success: false, error: "Event not found" };
        */

        // Create RSVP
        // Note: For MVP/Proto without seeding, this might fail if eventId is fake.
        // We will allow it to fail or mock it if strictly needed, 
        // but let's assume valid eventId from seeded data.

        const rsvp = await prisma.rsvp.create({
            data: {
                name: fullName,
                email: rest.email || null,
                phone: rest.phone || null,
                status: rest.status,
                groupSize: rest.groupSize,
                eventId: rest.eventId, // Ensure this ID exists in DB!
                answers: rest.dietaryRestrictions ? { dietary: rest.dietaryRestrictions } : undefined
            }
        });

        return { success: true, rsvpId: rsvp.id };
    } catch (error) {
        console.error("RSVP Error:", error);
        return { success: false, error: "Failed to save RSVP." };
    }
}
