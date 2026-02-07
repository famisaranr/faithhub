"use client";

import { TimelineSection } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const TimelineBlock = ({ section }: { section: TimelineSection }) => {
    return (
        <section id={section.id} className="py-24 bg-background text-foreground">
            <div className="container px-4">
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-primary">
                    {section.title}
                </h2>

                <div className="relative max-w-4xl mx-auto space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
                    {section.items.map((item, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Icon/Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <span className="w-2.5 h-2.5 bg-secondary rounded-full" />
                            </div>

                            {/* Content */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-primary font-mono text-xl">{item.year}</span>
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-2 text-foreground">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                {item.image && (
                                    <img src={item.image} alt={item.title} className="mt-4 rounded-lg w-full h-48 object-cover" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
