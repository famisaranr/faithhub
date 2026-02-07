"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createTenant } from "@/actions/create-tenant";
import { Check, Loader2, ArrowRight, ArrowLeft, Church, User, CreditCard } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Step Components
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
    <div className="flex justify-center mb-8 gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
            <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${i + 1 <= currentStep ? "w-8 bg-gold" : "w-2 bg-white/20"}`}
            />
        ))}
    </div>
);

import { Suspense } from "react";

// ... previous imports ...

function SetupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tier = searchParams.get("tier") || "starter";

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        churchName: "",
        slug: "",
        customDomain: "",
        adminName: "",
        adminEmail: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from name if slug is empty
        if (name === "churchName" && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
            }));
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await createTenant(formData);
            if (result.success) {
                // Redirect to tenant login or dashboard
                // Since this is a multi-tenant app, we'd typically redirect to sub-domain
                // For this MVP/Monorepo setup with [host] routing:
                router.push(`/${result.slug}`);
            } else {
                setError(result.error || "Something went wrong");
                setIsLoading(false);
            }
        } catch (err) {
            setError("An unexpected error occurred.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg relative z-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-heading font-bold mb-2">Set up your Church</h1>
                <p className="text-gray-400">Step {step} of 3</p>
            </div>

            <StepIndicator currentStep={step} totalSteps={3} />

            <div className="bg-secondary/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                                    <CreditCard className="w-8 h-8" />
                                </div>
                                <h2 className="text-xl font-bold">Subscription Active</h2>
                                <p className="text-gray-400 text-sm">You selected the <span className="text-white font-bold uppercase">{tier}</span> plan.</p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3 text-green-400 text-sm">
                                <Check className="w-5 h-5 shrink-0" />
                                <div>Payment method verified. You won't be charged until your 14-day trial ends.</div>
                            </div>
                            <Button onClick={nextStep} className="w-full bg-gold text-secondary hover:bg-gold/90 h-12 text-lg font-bold">
                                Continue to Setup
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Church Name</label>
                                <input
                                    type="text"
                                    name="churchName"
                                    value={formData.churchName}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                                    placeholder="e.g. Batangas City Central"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Church Slug (URL)</label>
                                <div className="flex items-center">
                                    <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-lg px-3 py-3 text-gray-500 text-sm">faithhub.com/</span>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-r-lg px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                                        placeholder="batangas-city"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Custom Domain (Optional)</label>
                                <input
                                    type="text"
                                    name="customDomain"
                                    value={formData.customDomain}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                                    placeholder="e.g. mychurch.org"
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white">Back</Button>
                                <Button onClick={nextStep} disabled={!formData.churchName || !formData.slug} className="flex-1 bg-gold text-secondary hover:bg-gold/90 font-bold">
                                    Next <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Admin Name</label>
                                <input
                                    type="text"
                                    name="adminName"
                                    value={formData.adminName}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Admin Email</label>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={formData.adminEmail}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-2">
                                <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white" disabled={isLoading}>Back</Button>
                                <Button onClick={handleSubmit} disabled={!formData.adminName || !formData.adminEmail || isLoading} className="flex-1 bg-gold text-secondary hover:bg-gold/90 font-bold h-12 text-lg">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating...
                                        </>
                                    ) : (
                                        "Launch Church Hub"
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function SetupWizard() {
    return (
        <div className="min-h-screen bg-[#05080f] text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
            </div>

            <Suspense fallback={
                <div className="w-full max-w-lg relative z-10 flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
                    <div className="text-gray-400">Loading setup wizard...</div>
                </div>
            }>
                <SetupForm />
            </Suspense>
        </div>
    );
}
