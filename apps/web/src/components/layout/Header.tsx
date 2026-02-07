"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = ["Home", "History", "Program", "Venue", "FAQ"];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-secondary/80 backdrop-blur-md transition-all duration-300">
            <div className="flex items-center gap-3 relative z-50">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-primary/5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>
                </div>
                <span className="text-xl font-bold font-serif tracking-wide text-white">
                    BC SDA <span className="text-primary">100</span>
                </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider font-serif"
                    >
                        {item}
                    </Link>
                ))}
                <Button
                    asChild
                    className="font-bold bg-[#B45F06] hover:bg-[#B45F06]/90 text-white border-none rounded-md px-6 tracking-wide"
                >
                    <Link href="#rsvp">RSVP</Link>
                </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white relative z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 top-0 left-0 w-full h-screen bg-secondary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-2xl font-serif text-white hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Button
                            asChild
                            className="font-bold bg-[#B45F06] hover:bg-[#B45F06]/90 text-white border-none rounded-full px-8 py-6 text-xl tracking-wide mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <Link href="#rsvp">RSVP NOW</Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
