import { Users, BookOpen, Heart, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlassPanel, MetricCard } from "../components/Shared";
import { useEffect, useState } from 'react';
import { getOfficerDashboardMetrics } from '@/app/actions/officer';

interface DashboardProps {
    setActiveView: (view: string) => void;
}

interface DashboardData {
    stats: {
        members: number;
        inventoryIssues: number;
        nextService: string;
    };
    alerts: {
        id: string;
        type: string;
        title: string;
        message: string;
        timestamp: Date;
    }[];
}

export const Dashboard = ({ setActiveView }: DashboardProps) => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const metrics = await getOfficerDashboardMetrics();
                // Map the raw backend response to our matched interface if needed,
                // but our server action returns exactly this structure + isRead, tenantId etc.
                if (metrics) {
                    setData(metrics as unknown as DashboardData);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard metrics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-white tracking-tight">Command Center</h1>
                    <p className="text-slate-400 text-sm">Divine Service • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-lg opacity-40 animate-pulse"></div>
                    <GlassPanel className="relative px-3 py-1 flex items-center gap-2 border-red-500/30">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-white tracking-widest">LIVE</span>
                    </GlassPanel>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                <MetricCard
                    title="Members"
                    value={loading ? "..." : data?.stats.members.toString() || "0"}
                    trend="Active"
                    icon={Users}
                    delay={100}
                />
                <MetricCard
                    title="Tithes & Off."
                    value="$12.4k"
                    trend="+5%"
                    icon={Heart}
                    delay={200}
                />
                <MetricCard
                    title="Next Service"
                    value={loading ? "..." : (data?.stats.nextService || "None")}
                    trend="Upcoming"
                    icon={BookOpen}
                    delay={300}
                    isTextValue
                />
                <MetricCard
                    title="Logistics"
                    value={loading ? "..." : (data?.stats.inventoryIssues ? `${data.stats.inventoryIssues} Issues` : "All Good")}
                    trend="Inventory"
                    icon={Wrench}
                    delay={400}
                    isTextValue
                />
            </div>

            {/* Live Alerts Section */}
            <div>
                <h2 className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-3 ml-1">Live Feed</h2>
                <div className="space-y-3">
                    {loading ? (
                        <p className="text-slate-500 text-sm">Loading alerts...</p>
                    ) : data?.alerts.length === 0 ? (
                        <p className="text-slate-500 text-sm">No new alerts.</p>
                    ) : (
                        data?.alerts.map((alert) => (
                            <GlassPanel key={alert.id} className={`p-4 flex items-center gap-4 border-l-4 ${alert.type === 'alert' ? 'border-l-red-500' :
                                alert.type === 'success' ? 'border-l-emerald-500' :
                                    'border-l-amber-500'
                                }`}>
                                <div className={`${alert.type === 'alert' ? 'bg-red-500/20' :
                                    alert.type === 'success' ? 'bg-emerald-500/20' :
                                        'bg-amber-500/20'
                                    } p-2 rounded-full`}>
                                    {alert.type === 'alert' ? (
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                    ) : alert.type === 'success' ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-amber-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">{alert.title}</p>
                                    <p className="text-slate-500 text-xs">{alert.message}</p>
                                </div>
                            </GlassPanel>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
