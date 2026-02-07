"use client";

import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { SectionConfig } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQ_ITEMS = [
    {
        question: "Is there a parking area available?",
        answer: "Yes, ample parking is available at the rear compound of the church. Additional parking is secured at the nearby Batangas National High School grounds with shuttle service provided."
    },
    {
        question: "What is the attire for the Grand Celebration?",
        answer: "For the Gala Night (July 18), the attire is Formal / Black Tie. For the Sabbath Divine Service (July 25), we encourage Filipiniana or Church Formal attire."
    },
    {
        question: "Can I bring children?",
        answer: "Yes! We have a dedicated 'Children's Corner' facility with supervised activities during the main program so parents can focus on worship. The Family Fun Day is specifically designed for kids!"
    },
    {
        question: "How can I donate to the Centennial Fund?",
        answer: "You can donate via bank transfer (BPI: 1234-5678-90), GCash (0917-123-4567), or at the Treasury booth in the lobby. Please label your donation 'Centennial Fund'."
    }
];

const FaqItem = ({ item }: { item: typeof FAQ_ITEMS[0] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white border rounded-lg overflow-hidden transition-all hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="text-lg font-heading text-secondary font-medium">
                    {item.question}
                </span>
                <span className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FaqBlock = ({ section }: { section: SectionConfig & { type: "faq" } }) => {
    return (
        <section id={section.id} className="py-24 bg-gray-50 text-secondary">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-5xl font-heading font-bold text-secondary">
                        FAQ
                    </h2>
                    <div className="flex justify-center items-center gap-4 text-gold/40">
                        <div className="h-px w-12 bg-gold/40" />
                        <HelpCircle className="w-5 h-5" />
                        <div className="h-px w-12 bg-gold/40" />
                    </div>
                    <p className="text-xl text-gray-500 italic font-serif">
                        {section.description || "Information for our guests."}
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <FaqItem item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
