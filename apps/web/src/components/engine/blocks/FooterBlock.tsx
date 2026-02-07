"use client";

import { SectionConfig } from "../types";
import { Facebook, Instagram, Globe, Heart } from "lucide-react";

export const FooterBlock = ({ section }: { section: SectionConfig & { type: "footer" } }) => {
    return (
        <footer className="bg-[#05080f] text-white py-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-sm" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-12 gap-8 items-center relative z-10">

                {/* Church Info */}
                <div className="lg:col-span-5 space-y-4">
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">Batangas City SDA Church</h3>
                        <div className="h-1 w-16 bg-gold rounded-full" />
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm max-w-md">
                        Celebrating 100 years of God's faithfulness. Join us as we look back with gratitude and move forward with hope toward eternity.
                    </p>
                    <div className="flex gap-3 pt-2">
                        {[
                            { icon: Facebook, href: "https://www.facebook.com/search/top?q=batangas%20city%20seventh-day%20adventist%20church" },
                            { icon: Instagram, href: "#" },
                            { icon: Globe, href: "https://www.adventistyearbook.org/entity?EntityID=13073" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 hover:border-gold/30 transition-all duration-300"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Spacer (Hidden on mobile) */}
                <div className="hidden lg:block lg:col-span-2" />

                {/* FaithHub Support Card */}
                <div className="lg:col-span-5 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-primary/20 to-gold/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <div className="relative bg-secondary/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl overflow-hidden hover:border-gold/30 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            {/* Logo Box */}
                            <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center shrink-0">
                                <span className="font-heading font-bold text-lg text-secondary">FH</span>
                            </div>

                            <div className="space-y-0.5">
                                <p className="text-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                                    Proudly Powered By
                                </p>
                                <h4 className="text-lg font-bold font-heading text-white tracking-wide">
                                    FaithHub
                                </h4>
                                <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                                    Empowering churches with premium digital experiences.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                                Sponsored by: Russell B. Famisaran
                            </span>
                            <a
                                href="https://faithhub.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-gold hover:text-white transition-colors flex items-center gap-1 group/link"
                            >
                                Visit Website
                                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <p className="text-gray-500 text-xs">
                    &copy; 2026 Batangas City SDA Church. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
                    <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};
