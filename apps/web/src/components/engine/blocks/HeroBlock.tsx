"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionConfig } from "../types";
import { useEffect, useState } from "react";

const CountdownDisplay = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const TimeBox = ({ val, label }: { val: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="text-3xl md:text-5xl font-heading font-bold text-gold tabular-nums tracking-widest">
                {val.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-gray-300 mt-1">
                {label}
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center py-6 backdrop-blur-sm bg-black/20 rounded-xl border border-white/10 mt-8 mb-4">
            <TimeBox val={timeLeft.days} label="Days" />
            <div className="text-2xl md:text-4xl text-white/30 font-light mb-4">:</div>
            <TimeBox val={timeLeft.hours} label="Hours" />
            <div className="text-2xl md:text-4xl text-white/30 font-light mb-4">:</div>
            <TimeBox val={timeLeft.minutes} label="Minutes" />
            <div className="text-2xl md:text-4xl text-white/30 font-light mb-4">:</div>
            <TimeBox val={timeLeft.seconds} label="Seconds" />
        </div>
    );
};

export const HeroBlock = ({ section }: { section: SectionConfig & { type: "hero" } }) => {
    return (
        <section id={section.id} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Layer: Gradient + Image/Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
                <img
                    src={section.backgroundImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover scale-105 animate-slow-zoom"
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-gold font-serif text-xl key-label tracking-[0.3em] uppercase mb-4">
                        100th Anniversary
                    </h2>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tight drop-shadow-2xl mb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                >
                    {section.title}
                </motion.h1>

                {/* Dynamic Countdown */}
                {section.countdownTarget && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <CountdownDisplay targetDate={section.countdownTarget} />
                    </motion.div>
                )}

                <motion.p
                    className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    {section.subtitle}
                </motion.p>

                <motion.div
                    className="flex gap-4 justify-center pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    {section.actions?.map((action, i) => (
                        <Button
                            key={i}
                            size="lg"
                            variant={action.variant === "default" ? "secondary" : "outline"} // Invert for dark bg
                            className="text-lg px-8 py-6 rounded-full transition-all hover:scale-105"
                            asChild
                        >
                            <a href={action.url}>{action.label}</a>
                        </Button>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
};
