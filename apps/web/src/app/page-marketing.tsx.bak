"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, LayoutGrid, Calendar, Users, CreditCard, Smartphone, Globe, Shield } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-6 rounded-2xl bg-secondary/50 border border-white/10 hover:border-gold/30 transition-all duration-300 group hover:shadow-lg hover:shadow-gold/5"
    >
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-gold group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const PricingCard = ({ tier, price, features, recommended = false }: { tier: string, price: string, features: string[], recommended?: boolean }) => (
    <div className={`relative p-8 rounded-2xl border ${recommended ? "border-gold/50 bg-secondary/80 shadow-xl shadow-gold/10" : "border-white/10 bg-white/5"} flex flex-col`}>
        {recommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-secondary text-xs font-bold uppercase tracking-widest rounded-full">
                Most Popular
            </div>
        )}
        <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-400 uppercase tracking-widest mb-2">{tier}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-bold text-white">{price}</span>
                <span className="text-gray-500">/mo</span>
            </div>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-gold shrink-0" />
                    <span>{feat}</span>
                </li>
            ))}
        </ul>
        <Link href={`/setup?tier=${tier.toLowerCase()}`} className="block w-full">
            <Button className={`w-full py-6 font-bold text-lg ${recommended ? "bg-gold text-secondary hover:bg-gold/90" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                Choose {tier}
            </Button>
        </Link>
    </div>
);

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#05080f] text-white overflow-hidden selection:bg-gold/30 selection:text-gold">

            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05080f]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="text-2xl font-bold font-heading tracking-tight text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gold">FH</div>
                        FaithHub
                    </span>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/laway-sda" target="_blank" className="hover:text-white transition-colors">View Demo</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-gray-400 hover:text-white">Login</Button>
                        <Link href="/setup">
                            <Button className="bg-gold text-secondary hover:bg-gold/90 font-bold">Start Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-32">
                {/* Hero Section */}
                <section className="relative px-6 pb-20 pt-10 md:pt-20 text-center max-w-5xl mx-auto">
                    {/* Background Effects */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-widest mb-8 hover:bg-white/10 transition-colors cursor-default">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Now available for Global Adventism
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight mb-8 leading-[1.1]">
                            The Operating System for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                                Modern Ministry
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Launch your church's digital event hub in 15 minutes. Replace fragmented tools with one unified platform for Events, RSVPs, and Member Management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/setup?tier=starter">
                                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-gold text-secondary hover:bg-gold/90 hover:scale-105 transition-all shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)]">
                                    Start 14-Day Free Trial
                                </Button>
                            </Link>
                            <Link href="/laway-sda">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 text-white gap-2">
                                    <Globe className="w-5 h-5" /> View Demo Tenant
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Problem / Solution */}
                <section className="py-24 border-y border-white/5 bg-secondary/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-gold font-heading text-xl mb-4">The Problem</h2>
                                <h3 className="text-4xl font-bold mb-6">Fragmented Chaos</h3>
                                <div className="space-y-4">
                                    {["Facebook Groups for announcements", "Google Forms for registrations", "WhatsApp for coordination", "Spreadsheets for member data"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-200/80">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-gold font-heading text-xl mb-4">The Solution</h2>
                                <h3 className="text-4xl font-bold mb-6">Unified Clarity</h3>
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-secondary to-secondary/50 border border-gold/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-32 bg-gold/5 rounded-full blur-3xl" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">One Canonical Link</h4>
                                                <p className="text-gray-400 text-sm">Everything at your-church.faithhub.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                                                <Smartphone className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Installable PWA</h4>
                                                <p className="text-gray-400 text-sm">Your app on their home screen.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Automated Updates</h4>
                                                <p className="text-gray-400 text-sm">Push notifications & auto-reminders.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Bento Grid */}
                <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Everything you need to <span className="text-gold">thrive</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Built specifically for the needs of Adventist churches, conferences, and ministries.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={LayoutGrid}
                            title="Event Hubs"
                            description="Create beautiful landing pages for Anniversaries, Revivals, and Youth Weeks in seconds."
                            delay={0}
                        />
                        <FeatureCard
                            icon={Calendar}
                            title="Smart RSVPs"
                            description="Know exactly who's coming. Generate QR codes for check-in and automate email confirmations."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Smartphone}
                            title="Progressive Web App"
                            description="No App Store friction. Members simply 'Add to Home Screen' for a full native app experience."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={CreditCard}
                            title="Tithing & Giving"
                            description="Secure digital giving integration with clear reporting for treasurers."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={Globe}
                            title="Custom Domains"
                            description="Use your own domain (e.g., central-church.org) while we handle the hosting and SSL."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Member Directory"
                            description="Secure, role-based access to your member database. Keep your flock connected."
                            delay={0.5}
                        />
                    </div>
                </section>

                {/* Pricing */}
                {/* Pricing - Temporarily Hidden
                <section id="pricing" className="py-24 border-t border-white/5 bg-secondary/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-heading font-bold mb-4">Simple, Transparent Pricing</h2>
                            <p className="text-gray-400">Start small and grow as your digital ministry expands.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <PricingCard
                                tier="Starter"
                                price="$15"
                                features={[
                                    "1 Active Event Hub",
                                    "Basic RSVP Management",
                                    "Email Confirmations",
                                    "Hosted on faithhub.com"
                                ]}
                            />
                            <PricingCard
                                tier="Pro"
                                price="$39"
                                recommended={true}
                                features={[
                                    "Unlimited Events",
                                    "Custom Domain Support",
                                    "Installable PWA",
                                    "Priority Support",
                                    "Advanced Analytics"
                                ]}
                            />
                            <PricingCard
                                tier="Conference"
                                price="$150+"
                                features={[
                                    "Multi-Church Management",
                                    "District-wide stats",
                                    "Custom Branding / Whitelabel",
                                    "Dedicated Account Manager",
                                    "SLA Guarantee"
                                ]}
                            />
                        </div>
                    </div>
                </section>
                */}

                <section className="py-32 text-center">
                    <h2 className="text-4xl font-heading font-bold mb-8">Ready to modernize your ministry?</h2>
                    <Link href="/setup?tier=starter">
                        <Button size="lg" className="h-16 px-10 text-xl font-bold bg-gold text-secondary hover:bg-gold/90 rounded-full shadow-2xl shadow-gold/20">
                            Get Started for Free
                        </Button>
                    </Link>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 bg-[#030508] text-center text-gray-500 text-sm">
                <div className="mb-4 flex items-center justify-center gap-2 opacity-50">
                    <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center text-gold">FH</div>
                    <span className="font-heading font-bold text-white">FaithHub</span>
                </div>
                &copy; 2026 FaithHub. All rights reserved.
            </footer>
        </div>
    );
}

