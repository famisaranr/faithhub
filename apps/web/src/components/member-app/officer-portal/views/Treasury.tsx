import { useState, useEffect } from 'react';
import { Banknote, Save, Loader2, Eye, EyeOff, CheckCircle, XCircle, FileImage, Upload } from 'lucide-react';
import { GlassPanel } from "../components/Shared";
import { getGivingConfig, updateGivingConfig, getPendingOfferings, approveOffering } from '@/app/actions/officer';
import { toast } from "sonner";

export const Treasury = () => {
    const [config, setConfig] = useState({
        gcashNumber: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        isVisible: true
    });
    const [pendingOfferings, setPendingOfferings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [viewingProof, setViewingProof] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const [configData, offeringsData] = await Promise.all([
                getGivingConfig(),
                getPendingOfferings()
            ]);

            if (configData) {
                setConfig(prev => ({ ...prev, ...configData as any }));
            }
            if (offeringsData) {
                setPendingOfferings(offeringsData);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateGivingConfig(config);
        if (result.success) {
            toast.success("Treasury settings updated");
        } else {
            toast.error("Failed to save settings");
        }
        setSaving(false);
    };

    const handleApprove = async (id: string) => {
        setProcessingId(id);
        const result = await approveOffering(id);
        if (result.success) {
            toast.success("Offering approved");
            setPendingOfferings(prev => prev.filter(o => o.id !== id));
        } else {
            toast.error("Failed to approve offering");
        }
        setProcessingId(null);
    };

    if (loading) return <div className="p-8 text-center text-slate-400">Loading treasury data...</div>;

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
            <div className="mb-6">
                <h1 className="text-3xl font-serif text-white tracking-tight">Treasury</h1>
                <p className="text-slate-400 text-sm">Manage Giving & Verifications</p>
            </div>

            {/* Config Section */}
            <GlassPanel className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-emerald-400" />
                        Payment Methods
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 uppercase tracking-widest hidden sm:inline">
                            {config.isVisible ? 'Visible to Members' : 'Hidden'}
                        </span>
                        <button
                            onClick={() => handleChange('isVisible', !config.isVisible)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider ${config.isVisible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'}`}
                        >
                            {config.isVisible ? (
                                <>
                                    <Eye className="w-3 h-3" /> Show Payment Options
                                </>
                            ) : (
                                <>
                                    <EyeOff className="w-3 h-3" /> Payment Options Hidden
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GCash Number</label>
                        <input
                            type="text"
                            value={config.gcashNumber}
                            onChange={(e) => handleChange('gcashNumber', e.target.value)}
                            placeholder="09XX XXX XXXX"
                            className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bank Name</label>
                            <input
                                type="text"
                                value={config.bankName}
                                onChange={(e) => handleChange('bankName', e.target.value)}
                                placeholder="e.g. BPI, BDO"
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Name</label>
                                <input
                                    type="text"
                                    value={config.accountName}
                                    onChange={(e) => handleChange('accountName', e.target.value)}
                                    placeholder="Account Name"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Number</label>
                                <input
                                    type="text"
                                    value={config.accountNumber}
                                    onChange={(e) => handleChange('accountNumber', e.target.value)}
                                    placeholder="Account Number"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-emerald-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Configuration
                    </button>
                </div>
            </GlassPanel>

            {/* Verification Queue Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white flex items-center gap-2 pl-2">
                    <FileImage className="w-5 h-5 text-blue-400" />
                    Pending Verifications
                    {pendingOfferings.length > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {pendingOfferings.length}
                        </span>
                    )}
                </h3>

                {pendingOfferings.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-white/5 rounded-2xl border border-white/5">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No pending verifications</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {pendingOfferings.map((offering) => {
                            const breakdown = typeof offering.breakdown === 'string'
                                ? JSON.parse(offering.breakdown)
                                : offering.breakdown;

                            return (
                                <GlassPanel key={offering.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-white text-lg">{offering.member?.name || 'Unknown Member'}</p>
                                            <span className="text-slate-400 text-sm">•</span>
                                            <p className="font-mono text-emerald-400 font-bold">₱{offering.amount.toLocaleString()}</p>
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            {new Date(offering.createdAt).toLocaleDateString()} at {new Date(offering.createdAt).toLocaleTimeString()}
                                        </p>
                                        <div className="flex gap-2 text-xs text-slate-500 mt-1">
                                            {breakdown.tithe > 0 && <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">Tithe: {breakdown.tithe}</span>}
                                            {breakdown.localBudget > 0 && <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">Budget: {breakdown.localBudget}</span>}
                                            {breakdown.buildingFund > 0 && <span className="bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded">Building: {breakdown.buildingFund}</span>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => setViewingProof(offering.proof)}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-white/5 hover:border-white/10"
                                        >
                                            View Proof
                                        </button>
                                        <button
                                            onClick={() => handleApprove(offering.id)}
                                            disabled={processingId === offering.id}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 min-w-[100px]"
                                        >
                                            {processingId === offering.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Approve"
                                            )}
                                        </button>
                                    </div>
                                </GlassPanel>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Proof Modal */}
            {viewingProof && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setViewingProof(null)}
                >
                    <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <button
                            onClick={() => setViewingProof(null)}
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition z-10"
                        >
                            <XCircle className="w-6 h-6" />
                        </button>
                        <div className="p-1 max-h-[85vh] overflow-auto flex justify-center bg-black/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={viewingProof}
                                alt="Proof of Transfer"
                                className="max-w-full h-auto rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
