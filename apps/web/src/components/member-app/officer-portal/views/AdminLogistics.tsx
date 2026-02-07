import { useState, useEffect } from 'react';
import { Package, FileText, ClipboardList, Wrench, ChevronRight } from 'lucide-react';
import { GlassPanel, ProgressBar } from "../components/Shared";
import { getInventory } from '@/app/actions/officer';

interface InventoryItemDisplay {
    item: string;
    level: number;
    status: string;
}

export const AdminLogistics = () => {
    const [inventory, setInventory] = useState<InventoryItemDisplay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const items = await getInventory();
                if (items) {
                    const mappedItems = items.map(i => ({
                        item: i.name,
                        level: Math.min(i.quantity, 100), // Cap at 100 for progress bar visualization
                        status: i.status
                    }));
                    setInventory(mappedItems);
                }
            } catch (error) {
                console.error("Failed to fetch inventory", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    return (
        <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-6">
                <h1 className="text-3xl font-serif text-white tracking-tight">Admin & Logistics</h1>
                <p className="text-slate-400 text-sm">Operations, Facilities & Clerk's Desk</p>
            </div>

            <div className="grid gap-6">
                {/* Inventory Section */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inventory Levels</h3>
                    </div>
                    <GlassPanel className="p-5 space-y-4">
                        {loading ? (
                            <p className="text-slate-500 text-sm">Loading inventory...</p>
                        ) : inventory.length === 0 ? (
                            <p className="text-slate-500 text-sm">No inventory recorded.</p>
                        ) : (
                            inventory.map((inv, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-slate-200">{inv.item}</span>
                                        <span className={`text-xs ${inv.status === 'Low' || inv.status === 'Critical' ? 'text-red-400' : 'text-emerald-400'}`}>{inv.status}</span>
                                    </div>
                                    <ProgressBar percentage={inv.level} colorClass={inv.status === 'Low' || inv.status === 'Critical' ? 'bg-red-500' : 'bg-emerald-500'} />
                                </div>
                            ))
                        )}
                    </GlassPanel>
                </section>

                {/* Clerk's Desk */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clerk's Desk</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <GlassPanel className="p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 cursor-pointer">
                            <span className="text-2xl font-serif text-white mb-1">2</span>
                            <span className="text-xs text-slate-400">Transfers Pending</span>
                        </GlassPanel>
                        <GlassPanel className="p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 cursor-pointer">
                            <span className="text-2xl font-serif text-white mb-1">4</span>
                            <span className="text-xs text-slate-400">Baptisms Planned</span>
                        </GlassPanel>
                    </div>
                    <GlassPanel className="p-4 mt-3 flex justify-between items-center cursor-pointer hover:bg-white/10">
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-200">Board Meeting Minutes</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                    </GlassPanel>
                </section>

                {/* Facilities */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-slate-400" />
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Facility Status</h3>
                    </div>
                    <GlassPanel className="p-4 border-l-4 border-l-red-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-white text-sm font-medium">Mic 2 Malfunction</h4>
                                <p className="text-slate-500 text-xs mt-1">Reported by A/V Team • Main Sanctuary</p>
                            </div>
                            <button className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">High Priority</button>
                        </div>
                    </GlassPanel>
                </section>
            </div>
        </div>
    );
};
