import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Upload, Clock, Mic, MessageCircle, Music, Info } from 'lucide-react';
import { GlassPanel } from "../components/Shared";
import { getServicePlans } from '@/app/actions/officer';
import { ImportModal } from './ImportModal';

type ServiceItem = {
    time: string;
    title: string;
    description: string;
    presenter: string;
    action: string;
};

const DEPARTMENT_PLANS = [
    { dept: "Music", status: "approved", event: "Easter Special", date: "April 2024" },
    { dept: "Deaconry", status: "pending", event: "Communion", date: "March 2024" },
];

export const Programming = () => {
    const [serviceData, setServiceData] = useState<Record<string, ServiceItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('services');
    const [selectedService, setSelectedService] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showImport, setShowImport] = useState(false);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const plans = await getServicePlans(currentDate);
            const data: Record<string, ServiceItem[]> = {};

            plans.forEach(plan => {
                const key = plan.type;
                // @ts-ignore - Validating Json type is complex, assuming correct structure for now
                data[key] = (plan.items as ServiceItem[]) || [];
            });

            setServiceData(data);
            // Default to Divine Worship if available, else first key
            if (Object.keys(data).length > 0 && !selectedService) {
                setSelectedService('divine_worship');
            } else if (!data[selectedService] && Object.keys(data).length > 0) {
                setSelectedService(Object.keys(data)[0]);
            }

        } catch (error) {
            console.error("Failed to fetch service plans", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [currentDate]);

    // Format current week range (Sat to Fri? or dynamically based on view)
    // The getServicePlans fetches the week surrounding the target. 
    // Let's display the Sabbath date as anchor.
    const getSabbathDate = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + 6; // Adjust to Saturday
        return new Date(d.setDate(diff));
    };

    const sabbathDate = getSabbathDate(currentDate);

    const changeWeek = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (offset * 7));
        setCurrentDate(newDate);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Week Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/5">
                    <button onClick={() => changeWeek(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <Calendar className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Week Of</p>
                            <p className="text-white font-bold whitespace-nowrap">
                                {sabbathDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => changeWeek(1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={() => setShowImport(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors flex-1 md:flex-none justify-center"
                    >
                        <Upload size={18} />
                        <span className="inline">Import Schedule</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats or Status */}
            {!loading && Object.keys(serviceData).length === 0 && (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                    <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-400">No service plans found for this week.</p>
                    <button
                        onClick={() => setShowImport(true)}
                        className="text-indigo-400 text-sm mt-2 hover:underline"
                    >
                        Import a schedule CSV?
                    </button>
                </div>
            )}

            {Object.keys(serviceData).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Service Selector */}
                    <div className="space-y-2">
                        {Object.keys(serviceData)
                            .sort((a, b) => {
                                const order = ['midweek', 'vespers', 'sabbath_school', 'divine_worship', 'ay'];
                                const indexA = order.indexOf(a);
                                const indexB = order.indexOf(b);
                                // If not found in order list (-1), put at the end
                                return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                            })
                            .map(key => (
                                <button
                                    key={key}
                                    onClick={() => setSelectedService(key)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${selectedService === key
                                        ? 'bg-indigo-500/20 border-indigo-500/50 text-white shadow-lg shadow-indigo-900/20'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                        }`}
                                >
                                    <div className={`w-2 h-12 rounded-full ${selectedService === key ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                                    <div>
                                        <p className="font-bold capitalize">{key.replace(/_/g, ' ')}</p>
                                        <p className="text-xs opacity-70">{serviceData[key].length} segments</p>
                                    </div>
                                </button>
                            ))}
                    </div>

                    {/* Main Content - Run Sheet */}
                    <div className="lg:col-span-3">
                        <GlassPanel className="min-h-[500px] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white capitalize flex items-center gap-2">
                                    {selectedService.replace(/_/g, ' ')}
                                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                                </h3>
                                <div className="text-sm text-slate-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {/* Placeholder Total Time */}
                                    ~90 mins
                                </div>
                            </div>

                            <div className="divide-y divide-white/5">
                                {serviceData[selectedService]?.map((item, idx) => (
                                    <div key={idx} className="p-4 hover:bg-white/5 transition-colors group flex items-start gap-4">
                                        <div className="w-16 pt-1 text-right">
                                            <span className="text-sm font-mono text-indigo-300">{item.time}</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-medium text-white group-hover:text-indigo-200 transition-colors">
                                                    {item.title}
                                                </p>
                                                <div className="flex gap-2">
                                                    {item.action === 'sing' && <Music className="w-4 h-4 text-pink-400" />}
                                                    {item.action === 'preach' && <Mic className="w-4 h-4 text-amber-400" />}
                                                    {item.action === 'speak' && <MessageCircle className="w-4 h-4 text-blue-400" />}
                                                </div>
                                            </div>

                                            {item.description && (
                                                <p className="text-sm text-slate-400 mb-2">{item.description}</p>
                                            )}

                                            {item.presenter && (
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                    Presented by <span className="text-slate-300">{item.presenter}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>
                    </div>
                </div>
            )}

            <ImportModal
                isOpen={showImport}
                onClose={() => setShowImport(false)}
                onSuccess={() => {
                    fetchServices(); // Refresh data
                }}
            />
        </div>
    );
};
