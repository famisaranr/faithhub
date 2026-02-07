import { X, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitOffering } from "@/app/actions/member";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface GivingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GivingModal = ({ isOpen, onClose }: GivingModalProps) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [amounts, setAmounts] = useState({
        tithe: '',
        localBudget: '',
        buildingFund: ''
    });

    if (!isOpen) return null;

    const handleAmountChange = (key: keyof typeof amounts, value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return;
        setAmounts(prev => ({ ...prev, [key]: value }));
    };

    const total = Object.values(amounts).reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

    const handleSubmit = async () => {
        if (total === 0) return;

        setStatus('submitting');
        try {
            await submitOffering({
                tithe: parseInt(amounts.tithe) || 0,
                localBudget: parseInt(amounts.localBudget) || 0,
                buildingFund: parseInt(amounts.buildingFund) || 0
            });
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setAmounts({ tithe: '', localBudget: '', buildingFund: '' });
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Giving failed", error);
            setStatus('idle');
            toast.error("Failed to process offering. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 text-center border-b border-slate-100 relative">
                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden"></div>
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition hidden sm:flex">
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                    <h2 className="text-xl font-serif font-bold text-slate-900">Tithe & Offering</h2>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">Secure GCash / Bank Transfer</p>
                </div>

                <div className="p-6">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Thank You!</h3>
                            <p className="text-slate-500 mt-2">Your faithful giving makes a difference.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Tithe Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#005f9e] font-bold text-sm flex items-center justify-center">
                                        10%
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Tithe</h4>
                                        <p className="text-xs text-slate-500">Conference Fund</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 focus-within:border-[#005f9e] focus-within:ring-2 focus-within:ring-[#005f9e]/20 transition w-32">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.tithe}
                                        onChange={(e) => handleAmountChange('tithe', e.target.value)}
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                            </div>

                            {/* Local Budget Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-sm flex items-center justify-center">
                                        Off
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Local Budget</h4>
                                        <p className="text-xs text-slate-500">Utilities & Expense</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 focus-within:border-[#005f9e] focus-within:ring-2 focus-within:ring-[#005f9e]/20 transition w-32">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.localBudget}
                                        onChange={(e) => handleAmountChange('localBudget', e.target.value)}
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                            </div>

                            {/* Building Fund Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center">
                                        Bld
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Building Fund</h4>
                                        <p className="text-xs text-slate-500">Church Renovation</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 focus-within:border-[#005f9e] focus-within:ring-2 focus-within:ring-[#005f9e]/20 transition w-32">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.buildingFund}
                                        onChange={(e) => handleAmountChange('buildingFund', e.target.value)}
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {status !== 'success' && (
                    <div className="p-6 bg-white border-t border-slate-100 pb-8 sm:pb-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-500 font-medium">Total (PHP)</span>
                            <span className="text-2xl font-bold text-slate-900 font-mono">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={total === 0 || status === 'submitting'}
                            className="w-full py-4 bg-[#005f9e] text-white font-bold rounded-2xl shadow-lg shadow-[#005f9e]/30 active:scale-95 transition disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Confirm Offering
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
