"use client";

import { useState } from "react";
import { RsvpSection } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Using local zod for speed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// Schema definition
const RsvpSchema = z.object({
    firstName: z.string().min(2, "Name is too short"),
    lastName: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    status: z.enum(["GOING", "MAYBE", "NOT_GOING"]),
    groupSize: z.coerce.number().min(1).max(10),
    selectedEvents: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please select at least one event.",
    }),
});

type RsvpFormValues = z.infer<typeof RsvpSchema>;

const AVAILABLE_EVENTS = [
    { id: "prayer-jan", label: "100 Days of Prayer (Jan 17 - Apr 26)" },
    { id: "blood-donation", label: "Blood Donation (July 12)" },
    { id: "gala-night", label: "Gala Night (July 18)" },
    { id: "revival", label: "Revival & Reaping Campaign (July 19-24)" },
    { id: "history-exhibit", label: "Church History Exhibit (July 19-25)" },
    { id: "motorcade", label: "Grand Motorcade (July 19)" },
    { id: "heroes-day", label: "Community Heroes Recognition (July 19)" },
    { id: "thanksgiving", label: "Thanksgiving Worship Service (July 25)" },
    { id: "fun-day", label: "Family Fun Day (July 26)" },
    { id: "gift-giving", label: "Gift Giving to 100 Families (Aug 2)" },
    { id: "prayer-aug", label: "100 Days of Prayer (Aug 1 - Nov 8)" },
];

export const RsvpBlock = ({ section }: { section: RsvpSection }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm<RsvpFormValues>({
        resolver: zodResolver(RsvpSchema),
        defaultValues: {
            status: "GOING",
            groupSize: 1,
            selectedEvents: []
        }
    });

    const onSubmit = async (data: RsvpFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Submitting RSVP:", data);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEventChange = (eventId: string, checked: boolean) => {
        const current = form.getValues("selectedEvents");
        if (checked) {
            form.setValue("selectedEvents", [...current, eventId]);
        } else {
            form.setValue("selectedEvents", current.filter((id) => id !== eventId));
        }
    };

    const selectedEventsCount = form.watch("selectedEvents").length;
    const selectedEventsIds = form.watch("selectedEvents");

    // Helper to format selected text
    const getSelectedLabel = () => {
        if (selectedEventsCount === 0) return "Select Events to attend...";
        if (selectedEventsCount === 1) {
            const evt = AVAILABLE_EVENTS.find(e => e.id === selectedEventsIds[0]);
            return evt ? evt.label : "1 Event Selected";
        }
        return `${selectedEventsCount} Events Selected`;
    };

    if (success) {
        return (
            <section id={section.id} className="py-24 bg-muted/30">
                <div className="container max-w-xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-8 bg-background rounded-2xl shadow-xl border border-primary/20"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-secondary mb-2">Registration Confirmed!</h2>
                        <p className="text-muted-foreground">Thank you! We have reserved your spot for the selected events.</p>
                        <Button className="mt-8" variant="outline" onClick={() => setSuccess(false)}>Register Another</Button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id={section.id} className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
                <div className="sticky top-24">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                        {section.title}
                    </h2>
                    <p className="text-lg text-secondary-foreground/80 leading-relaxed mb-8">
                        Join us for this momentous occasion. Select the events you wish to attend so we can prepare for your arrival.
                    </p>

                    <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                📅
                            </div>
                            <div>
                                <p className="font-bold text-lg">Multiple Events</p>
                                <p className="text-sm opacity-70">July 12 - Aug 2, 2026</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                📍
                            </div>
                            <div>
                                <p className="font-bold text-lg">Batangas City SDA Church</p>
                                <p className="text-sm opacity-70">P. Burgos Street, Batangas City</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-2xl z-10">
                    <CardHeader>
                        <CardTitle>Secure Your Seat</CardTitle>
                        <CardDescription>Select events and enter your details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Personal Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input {...form.register("firstName")} id="firstName" placeholder="Juan" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
                                    {form.formState.errors.firstName && <p className="text-red-500 text-xs">{form.formState.errors.firstName.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input {...form.register("lastName")} id="lastName" placeholder="Dela Cruz" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
                                    {form.formState.errors.lastName && <p className="text-red-500 text-xs">{form.formState.errors.lastName.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input {...form.register("email")} id="email" type="email" placeholder="juan@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
                            </div>

                            {/* Attendance Status */}
                            <div className="space-y-2">
                                <Label>Will you attend?</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["GOING", "MAYBE", "NOT_GOING"].map((status) => (
                                        <div
                                            key={status}
                                            onClick={() => form.setValue("status", status as any)}
                                            className={`cursor-pointer text-center py-2 rounded-md text-sm font-medium transition-colors border ${form.watch("status") === status
                                                ? "bg-primary text-secondary border-primary"
                                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                }`}
                                        >
                                            {status.replace("_", " ")}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Event Selection - DROPDOWN */}
                            {form.watch("status") === "GOING" && (
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Select Events to attend</Label>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between h-auto py-3 px-4 text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                <span className={`${selectedEventsCount === 0 ? "text-gray-400" : "text-white font-medium"}`}>
                                                    {getSelectedLabel()}
                                                </span>
                                                <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto bg-secondary text-secondary-foreground border-gold/20">
                                            <DropdownMenuLabel>Available Events</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {AVAILABLE_EVENTS.map((evt) => (
                                                <DropdownMenuCheckboxItem
                                                    key={evt.id}
                                                    checked={selectedEventsIds.includes(evt.id)}
                                                    onCheckedChange={(checked) => handleEventChange(evt.id, checked)}
                                                >
                                                    {evt.label}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {form.formState.errors.selectedEvents && (
                                        <p className="text-red-500 text-xs mt-2">{form.formState.errors.selectedEvents.message}</p>
                                    )}
                                </div>
                            )}

                            {form.watch("status") === "GOING" && (
                                <div className="space-y-2">
                                    <Label htmlFor="groupSize">Total Guests (including you)</Label>
                                    <Input
                                        type="number"
                                        {...form.register("groupSize")}
                                        id="groupSize"
                                        min={1}
                                        max={10}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                    />
                                    <p className="text-xs text-muted-foreground">Max 10 per registration.</p>
                                </div>
                            )}

                            <Button type="submit" className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold" disabled={isSubmitting}>
                                {isSubmitting ? "Confirming..." : "Confirm RSVP"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
