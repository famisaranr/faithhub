import { z } from "zod";

export const RsvpSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number required for SMS updates").optional().or(z.literal("")),
    status: z.enum(["GOING", "NOT_GOING", "MAYBE"]),
    groupSize: z.coerce.number().min(1).max(10).default(1),
    dietaryRestrictions: z.string().optional(),
    eventId: z.string().min(1, "Event ID is missing")
});

export type RsvpFormValues = z.infer<typeof RsvpSchema>;
