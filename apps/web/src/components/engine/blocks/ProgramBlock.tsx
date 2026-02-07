"use client";

import { Calendar, Download, AlertCircle, ChevronDown, ChevronUp, User, Music, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionConfig } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Types for the Detailed Program
interface ProgramItem {
    time?: string;
    part: string;
    person?: string;
    note?: string;
}

interface EventItem {
    date: string;
    year: string;
    title: string;
    description: string;
    highlight?: boolean;
    program?: ProgramItem[]; // Optional detailed program
}

const EVENTS: EventItem[] = [
    {
        date: "January 17 - April 26",
        year: "2026",
        title: "100 Days of Prayer",
        description: "Launch of our spiritual journey leading up to the centennial.",
        program: [
            { part: "Daily Devotional", note: "Via Zoom & Facebook Live (5:00 AM)" },
            { part: "Weekly Prayer Meeting", note: "Every Wednesday @ 7:00 PM" }
        ]
    },
    {
        date: "July 12",
        year: "2026",
        title: "Blood Donation Drive",
        description: "Community service initiative saving lives.",
        program: [
            { time: "8:00 AM", part: "Opening Prayer & Orientation", person: "Dr. Health Ministries" },
            { time: "8:30 AM", part: "Blood Extraction Begins" },
            { time: "12:00 PM", part: "Closing & Distribution of Snacks" }
        ]
    },
    {
        date: "July 18",
        year: "2026",
        title: "Centennial Church Family Banquet / Gala Night",
        description: "A formal evening of gratitude and fellowship.",
        highlight: true,
        program: [
            { time: "6:00 PM", part: "Red Carpet & Photo Op" },
            { time: "6:30 PM", part: "Opening Prayer", person: "Elder Cruz" },
            { time: "6:35 PM", part: "Welcome Remarks", person: "Centennial Chairman" },
            { time: "7:00 PM", part: "Dinner Service (Buffet)" },
            { time: "8:00 PM", part: "History Video Presentation", note: "'100 Years of Grace'" },
            { time: "8:30 PM", part: "Awarding of Pioneers" },
            { time: "9:30 PM", part: "Closing Prayer" }
        ]
    },
    {
        date: "July 19 - 24",
        year: "2026",
        title: "Revival & Reaping Campaign",
        description: "Nightly worship and revival meetings.",
        program: [
            { time: "7:00 PM", part: "Nightly Service", note: "Guest Speaker: Pr. Evangelist" }
        ]
    },
    {
        date: "July 19 - 25",
        year: "2026",
        title: "Church History Exhibit",
        description: "A walk through 100 years of God's leading.",
        program: [
            { time: "8:00 AM - 5:00 PM", part: "Open Viewing", note: "Church Lobby" }
        ]
    },
    {
        date: "July 19",
        year: "2026",
        title: "Grand Motorcade",
        description: "A parade around the city celebrating our history.",
        program: [
            { time: "6:00 AM", part: "Assembly", note: "Church Grounds" },
            { time: "7:00 AM", part: "Motorcade Begins" }
        ]
    },
    {
        date: "July 19",
        year: "2026",
        title: "Community Heroes Recognition",
        description: "Honoring those who serve our city.",
        program: [
            { time: "3:00 PM", part: "Awarding Ceremony" }
        ]
    },
    {
        date: "July 25",
        year: "2026",
        title: "Centennial Thanksgiving Worship Service",
        description: "The main celebration Sabbath.",
        highlight: true,
        program: [
            { time: "8:30 AM", part: "Sabbath School", note: "Panel Discussion: History of BCSDA" },
            { time: "10:30 AM", part: "Divine Worship Service" },
            { part: "Prelude", person: "Pianist / Orchestra" },
            { part: "Doxology", person: "Congregation" },
            { part: "Invocation", person: "Union President" },
            { part: "Welcome Remarks", person: "Head Elder" },
            { part: "Opening Hymn", note: "'Joy By and By' (Theme Song)" },
            { part: "Scripture Reading", person: "Selected Youth", note: "Psalm 100" },
            { part: "Pastoral Prayer", person: "Mission President" },
            { part: "Tithes & Offerings", person: "Church Treasurer" },
            { part: "Introduction of Speaker" },
            { part: "Special Music", person: "Centennial Grand Choir" },
            { part: "Message", person: "Pr. Ted Wilson (General Conference President)" },
            { part: "Closing Hymn", note: "'We Have This Hope'" },
            { part: "Benediction", person: "Senior Pastor" }
        ]
    },
    {
        date: "July 26",
        year: "2026",
        title: "Family Fun Day",
        description: "Games, food, and fellowship for all ages.",
        program: [
            { time: "8:00 AM", part: "Registration" },
            { time: "9:00 AM", part: "Games Begin" }
        ]
    },
    {
        date: "August 2",
        year: "2026",
        title: "Gift Giving to 100 Families",
        description: "Sharing our blessings with the community.",
        program: [
            { time: "9:00 AM", part: "Distribution" }
        ]
    },
    {
        date: "August 1 - November 8",
        year: "2026",
        title: "100 Days of Prayer (Closing)",
        description: "Closing the year with sustained intercession.",
    }
];

const EventCard = ({ evt }: { evt: EventItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Dot */}
            <div className={`
                absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-white z-10
                ${evt.highlight ? "bg-primary scale-125 shadow-[0_0_10px_#fbbf24]" : "bg-gray-300"}
            `} />

            <div className={`
                rounded-xl transition-all overflow-hidden
                ${evt.highlight ? "bg-white border-2 border-primary/20 shadow-lg" : "bg-gray-50 border border-gray-100"}
            `}>
                {/* Header (Always Visible) */}
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gold uppercase tracking-wider">
                            {evt.date}, {evt.year}
                        </span>
                        {evt.highlight && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full mt-2 md:mt-0 w-fit">
                                <AlertCircle className="w-3 h-3" /> Major Event
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-secondary">
                                {evt.title}
                            </h3>
                            {evt.description && (
                                <p className="text-gray-600 mt-1">{evt.description}</p>
                            )}
                        </div>
                        {evt.program && (
                            <Button variant="ghost" size="icon" className="shrink-0 text-gray-400">
                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isOpen && evt.program && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-100/50 border-t border-gray-100"
                        >
                            <div className="p-6 space-y-3">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                    Order of Service / Program
                                </h4>
                                {evt.program.map((item, i) => (
                                    <div key={i} className="flex gap-4 text-sm group">
                                        <div className="w-16 font-mono text-gray-400 text-xs py-1 shrink-0">
                                            {item.time || "•"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-secondary flex items-center gap-2">
                                                {item.part}
                                            </div>
                                            {(item.person || item.note) && (
                                                <div className="text-gray-500 text-xs mt-0.5 pl-0">
                                                    {item.person && <span className="font-medium text-gold mr-2">{item.person}</span>}
                                                    {item.note && <span className="italic">{item.note}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export const ProgramBlock = ({ section }: { section: SectionConfig & { type: "program" } }) => {
    const downloadPdf = () => {
        window.open("/program-schedule.pdf", "_blank");
    };

    return (
        <section id={section.id} className="py-24 bg-white text-secondary">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold text-secondary mb-4">{section.title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A year-long celebration of faith, service, and community.
                    </p>
                </div>

                <div className="relative border-l-2 border-gold/30 ml-4 md:ml-12 space-y-8">
                    {EVENTS.map((evt, idx) => (
                        <motion.div
                            key={idx}
                            className="relative pl-8 md:pl-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <EventCard evt={evt} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="gap-2" onClick={downloadPdf}>
                        <Download className="w-5 h-5" />
                        Download Printable Schedule (PDF)
                    </Button>
                </div>
            </div>
        </section>
    );
};
