"use client";

import { EVENTS } from "@/data/centennial-events";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useEffect } from "react";

export default function PrintProgramPage() {

    // Auto-trigger print on load (optional, but convenient)
    useEffect(() => {
        // user can click button if auto-print is annoying
    }, []);

    return (
        <div className="min-h-screen bg-white text-black p-8 font-serif">
            {/* Print Header */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <Button onClick={() => window.print()} className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print Now
                </Button>
                <div className="text-sm text-gray-500">
                    Use <span className="font-bold">Ctrl + P</span> (Cmd + P) to print.
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 border-b-2 border-black pb-8">
                    <h1 className="text-4xl font-bold mb-2 uppercase tracking-widest">Centennial Celebration</h1>
                    <h2 className="text-2xl italic text-gray-700">100 Years of God's Grace</h2>
                    <p className="mt-4 text-sm font-sans text-gray-500">Batangas City SDA Central Church • 1926 - 2026</p>
                </div>

                <div className="space-y-8">
                    {EVENTS.map((evt, idx) => (
                        <div key={idx} className="break-inside-avoid mb-8">
                            <div className="flex items-baseline justify-between border-b border-gray-300 pb-2 mb-4">
                                <h3 className="text-xl font-bold uppercase">
                                    {evt.title}
                                </h3>
                                <span className="text-sm font-bold whitespace-nowrap ml-4">
                                    {evt.date}, {evt.year}
                                </span>
                            </div>

                            {evt.description && (
                                <p className="mb-4 italic text-gray-700">{evt.description}</p>
                            )}

                            {evt.program && (
                                <div className="pl-4 border-l-2 border-gray-200 ml-2">
                                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Order of Service</h4>
                                    <div className="grid grid-cols-1 gap-y-1">
                                        {evt.program.map((item, pIdx) => (
                                            <div key={pIdx} className="flex text-sm">
                                                <span className="w-24 shrink-0 text-gray-500 font-sans text-xs pt-1">
                                                    {item.time || ""}
                                                </span>
                                                <div className="flex-1">
                                                    <span className="font-semibold mr-2">{item.part}</span>
                                                    {(item.person || item.note) && (
                                                        <span className="text-gray-600 block sm:inline sm:before:content-['-'] sm:before:mx-1 before:text-gray-400">
                                                            {item.person && <span className="italic">{item.person} </span>}
                                                            {item.note && <span className="text-xs text-gray-500">({item.note})</span>}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-xs text-gray-400 font-sans border-t border-gray-200 pt-8 print:block">
                    Batangas City Seventh-day Adventist Central Church &copy; 2026
                </div>
            </div>
        </div>
    );
}
