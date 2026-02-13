import { X, CheckCircle, Loader2, Upload, Camera } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { submitOffering } from "@/app/actions/member";
import { getGivingConfig } from "@/app/actions/officer";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface GivingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GivingModal = ({ isOpen, onClose }: GivingModalProps) => {
    const [step, setStep] = useState<'amount' | 'details' | 'success'>('amount');
    const [status, setStatus] = useState<'idle' | 'uploading' | 'submitting'>('idle');
    const [amounts, setAmounts] = useState({
        tithe: '',
        localBudget: '',
        buildingFund: ''
    });
    const [config, setConfig] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            getGivingConfig().then(setConfig);
            setStep('amount');
            setStatus('idle');
            setAmounts({ tithe: '', localBudget: '', buildingFund: '' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAmountChange = (key: keyof typeof amounts, value: string) => {
        if (value && !/^\d*$/.test(value)) return;
        setAmounts(prev => ({ ...prev, [key]: value }));
    };

    const total = Object.values(amounts).reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);

    const handleConfirmAmount = () => {
        if (total === 0) return;
        setStep('details');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Convert to Base64
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;

            setStatus('uploading');
            try {
                await submitOffering({
                    tithe: parseInt(amounts.tithe) || 0,
                    localBudget: parseInt(amounts.localBudget) || 0,
                    buildingFund: parseInt(amounts.buildingFund) || 0
                }, base64String);

                setStatus('idle');
                setStep('success');
            } catch (error) {
                console.error("Upload failed", error);
                toast.error("Failed to upload proof of transfer.");
                setStatus('idle');
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 text-center border-b border-slate-100 relative">
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition hidden sm:flex">
                        <X className="w-4 h-4 text-slate-500" />
                    </button>
                    <h2 className="text-xl font-serif font-bold text-slate-900">Tithe & Offering</h2>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mt-1">
                        {step === 'amount' && "Secure Giving"}
                        {step === 'details' && "Manual Transfer Details"}
                        {step === 'success' && "God Bless You"}
                    </p>
                </div>

                <div className="p-6">
                    {step === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Thank You!</h3>
                            <p className="text-slate-600 mb-6 max-w-xs mx-auto leading-relaxed">
                                "Bring the whole tithe into the storehouse, that there may be food in my house."
                                <br />
                                <span className="text-sm font-semibold text-slate-400 mt-2 block">- Malachi 3:10</span>
                            </p>

                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition"
                            >
                                Close via Amen
                            </button>
                        </div>
                    ) : step === 'details' ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <div className="text-center mb-4">
                                <p className="text-sm text-slate-500">Total Amount to Transfer</p>
                                <p className="text-3xl font-bold text-slate-900 font-mono mt-1">₱{total.toLocaleString()}</p>
                            </div>

                            {config?.isVisible && (
                                <div className="w-full space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {config.gcashNumber && (
                                        <div className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">GCash</p>
                                                <p className="font-mono text-lg font-bold text-slate-800">{config.gcashNumber}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(config.gcashNumber);
                                                    toast.success("Copied GCash number");
                                                }}
                                                className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    )}

                                    {config.bankName && (
                                        <div className="text-left pt-2">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{config.bankName}</p>
                                            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                                <div>
                                                    <p className="font-mono text-sm font-bold text-slate-800">{config.accountNumber}</p>
                                                    <p className="text-xs text-slate-400 font-medium mt-0.5">{config.accountName}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(config.accountNumber);
                                                        toast.success("Copied Account Number");
                                                    }}
                                                    className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 font-medium transition"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="pt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={status === 'uploading'}
                                    className="w-full py-4 bg-[#005f9e] text-white font-bold rounded-2xl shadow-lg shadow-[#005f9e]/30 active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {status === 'uploading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Uploading Proof...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5" />
                                            Upload Proof of Transfer
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-slate-400 mt-3">
                                    Please upload a screenshot of your transaction.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in slide-in-from-left-4">
                            {/* Tithe Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group focus-within:ring-2 focus-within:ring-[#005f9e]/10 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#005f9e] font-bold text-sm flex items-center justify-center shadow-sm">
                                        10%
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Tithe</h4>
                                        <p className="text-xs text-slate-500">Conference Fund</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 group-focus-within:border-[#005f9e] transition w-32 shadow-sm">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.tithe}
                                        onChange={(e) => handleAmountChange('tithe', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Local Budget Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm flex items-center justify-center shadow-sm">
                                        Off
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Local Budget</h4>
                                        <p className="text-xs text-slate-500">Utilities & Expense</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 group-focus-within:border-emerald-500 transition w-32 shadow-sm">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.localBudget}
                                        onChange={(e) => handleAmountChange('localBudget', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Building Fund Row */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group focus-within:ring-2 focus-within:ring-orange-500/10 transition">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center shadow-sm">
                                        Bld
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Building Fund</h4>
                                        <p className="text-xs text-slate-500">Church Renovation</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 group-focus-within:border-orange-500 transition w-32 shadow-sm">
                                    <span className="text-slate-400 font-bold text-sm">₱</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full text-right font-bold text-slate-800 outline-none text-lg placeholder:text-slate-300 bg-transparent"
                                        value={amounts.buildingFund}
                                        onChange={(e) => handleAmountChange('buildingFund', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer for Amount Step */}
                {step === 'amount' && (
                    <div className="p-6 bg-white border-t border-slate-100 pb-8 sm:pb-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-500 font-medium">Total (PHP)</span>
                            <span className="text-2xl font-bold text-slate-900 font-mono">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>

                        <button
                            onClick={handleConfirmAmount}
                            disabled={total === 0}
                            className="w-full py-4 bg-[#005f9e] text-white font-bold rounded-2xl shadow-lg shadow-[#005f9e]/30 active:scale-95 transition disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                        >
                            Next <span className="opacity-60 text-sm font-normal">(Payment Details)</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
