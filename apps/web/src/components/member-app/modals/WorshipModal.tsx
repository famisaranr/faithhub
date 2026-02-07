import { X, BookOpen, Music, FileText, Sun, Moon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getWorshipData, getDailyDevotional } from "@/app/actions/member";
import { WorshipServiceData, DevotionalContent } from "@/types/member-app";
import { toast } from "sonner";

interface WorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Tab = 'liturgy' | 'hymns' | 'notes' | 'daily';

export const WorshipModal = ({ isOpen, onClose }: WorshipModalProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('liturgy');
    const [worshipData, setWorshipData] = useState<WorshipServiceData | null>(null);
    const [devotionalData, setDevotionalData] = useState<DevotionalContent | null>(null);
    const [devotionalType, setDevotionalType] = useState<'morning' | 'evening'>('morning');
    const [loading, setLoading] = useState(true);
    const [loadingDevotional, setLoadingDevotional] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getWorshipData()
                .then(data => {
                    setWorshipData(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    toast.error("Failed to load worship data. Please try again.");
                });

            // Initial fetch for devotional
            setLoadingDevotional(true);
            getDailyDevotional('morning')
                .then(data => {
                    setDevotionalData(data);
                    setLoadingDevotional(false);
                })
                .catch(() => {
                    setLoadingDevotional(false);
                    toast.error("Failed to load devotional. Please try again.");
                });
        }
    }, [isOpen]);

    useEffect(() => {
        if (activeTab === 'daily') {
            setLoadingDevotional(true);
            getDailyDevotional(devotionalType)
                .then(data => {
                    setDevotionalData(data);
                    setLoadingDevotional(false);
                })
                .catch(() => {
                    setLoadingDevotional(false);
                    toast.error("Failed to load devotional. Please try again.");
                });
        }
    }, [devotionalType, activeTab]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[800px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-3xl z-20 sticky top-0">
                    <h2 className="text-xl font-serif font-bold text-slate-800 ml-2">Worship Service</h2>
                    <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-4 pt-2 border-b border-slate-100 overflow-x-auto">
                    <div className="flex gap-6 min-w-max">
                        <button
                            onClick={() => setActiveTab('liturgy')}
                            className={cn(
                                "pb-3 text-sm font-bold transition-all relative",
                                activeTab === 'liturgy' ? "text-[#005f9e]" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Liturgy</span>
                            {activeTab === 'liturgy' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005f9e] rounded-t-full"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('daily')}
                            className={cn(
                                "pb-3 text-sm font-bold transition-all relative",
                                activeTab === 'daily' ? "text-orange-600" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <span className="flex items-center gap-2"><Sun className="w-4 h-4" /> Daily</span>
                            {activeTab === 'daily' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('hymns')}
                            className={cn(
                                "pb-3 text-sm font-bold transition-all relative",
                                activeTab === 'hymns' ? "text-[#005f9e]" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <span className="flex items-center gap-2"><Music className="w-4 h-4" /> Hymns</span>
                            {activeTab === 'hymns' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005f9e] rounded-t-full"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={cn(
                                "pb-3 text-sm font-bold transition-all relative",
                                activeTab === 'notes' ? "text-[#005f9e]" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Notes</span>
                            {activeTab === 'notes' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005f9e] rounded-t-full"></span>}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="w-8 h-8 text-[#005f9e] animate-spin" />
                            <p className="text-slate-400 text-sm">Loading service data...</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'liturgy' && worshipData && (
                                <div className="space-y-4 pb-20">
                                    {/* Date Header */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sabbath Service</h3>
                                        <p className="text-xs text-slate-400 mt-1">Today</p>
                                    </div>

                                    {worshipData.liturgy.map((item, index) => (
                                        <div key={index} className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 hover:border-blue-200 transition-colors relative overflow-hidden group">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 group-hover:bg-[#005f9e] transition-colors"></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.type}</span>
                                                    {item.action && (
                                                        <span className={cn(
                                                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                                            item.action === 'Stand' ? "text-[#005f9e] bg-blue-50" : "text-slate-500 bg-slate-100"
                                                        )}>{item.action}</span>
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-slate-800">{item.title}</h4>
                                                {item.details && <p className="text-xs text-slate-500 mt-1">{item.details}</p>}
                                                {item.presenter && <p className="text-xs text-slate-400 italic mt-1">{item.presenter}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'daily' && (
                                <div className="space-y-6 pb-20">
                                    {/* Daily Header */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <button onClick={() => { }} className="p-1 -ml-1 text-slate-400 hover:text-slate-600">
                                                {/* Placeholder for back if needed */}
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Daily Devotional</h3>
                                            <p className="text-xs font-serif font-bold text-slate-600 mt-0.5">{devotionalData?.date || "Loading..."}</p>
                                        </div>
                                    </div>

                                    {/* Toggle */}
                                    <div className="bg-orange-50 p-1 rounded-xl flex">
                                        <button
                                            onClick={() => setDevotionalType('morning')}
                                            className={cn(
                                                "flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                                devotionalType === 'morning' ? "bg-white text-orange-600 shadow-sm" : "text-orange-300 hover:text-orange-500"
                                            )}
                                        >
                                            <Sun className="w-3 h-3" /> Morning Watch
                                        </button>
                                        <button
                                            onClick={() => setDevotionalType('evening')}
                                            className={cn(
                                                "flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                                devotionalType === 'evening' ? "bg-white text-indigo-600 shadow-sm" : "text-orange-300 hover:text-indigo-500"
                                            )}
                                        >
                                            <Moon className="w-3 h-3" /> Evening Watch
                                        </button>
                                    </div>

                                    {loadingDevotional ? (
                                        <div className="flex justify-center py-12">
                                            <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                                        </div>
                                    ) : devotionalData ? (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <h2 className="text-2xl font-serif font-bold text-slate-900 text-center leading-tight mb-3 uppercase">{devotionalData.title}</h2>

                                            <div className="flex justify-center mb-6">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                                    {devotionalData.source} • Page {devotionalData.page}
                                                </span>
                                            </div>

                                            <div className="relative pl-4 border-l-4 border-orange-200 mb-6">
                                                <p className="font-serif italic text-lg text-slate-700 leading-relaxed">
                                                    "{devotionalData.verse}"
                                                </p>
                                            </div>

                                            <div className="space-y-4 text-slate-600 leading-relaxed font-serif text-[15px]">
                                                {devotionalData.content.map((paragraph, i) => (
                                                    <p key={i}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            )}

                            {activeTab === 'hymns' && (
                                <div className="text-center py-12 text-slate-400">
                                    <Music className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>Hymn selection coming soon</p>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div className="h-full">
                                    <textarea
                                        className="w-full h-full p-4 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#005f9e]/20 resize-none text-sm placeholder:text-slate-300"
                                        placeholder="Type your sermon notes here..."
                                    ></textarea>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
