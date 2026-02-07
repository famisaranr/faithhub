import { ChevronRight, Phone, Mail, LocateFixed, Navigation } from 'lucide-react';
import { GlassPanel, Badge } from "../components/Shared";
import { MemberData } from "../views/Members";

export const MemberDetail = ({ member, onBack }: { member?: MemberData | null, onBack: () => void }) => {
    if (!member) return null;

    const openNavigation = () => {
        if (!member.address) return;
        // Open Google Maps with Address
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(member.address)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0A0E17] flex flex-col animate-in slide-in-from-bottom duration-500">
            {/* Cinematic Header Image Placeholder */}
            <div className="h-64 bg-gradient-to-b from-slate-800 to-[#0A0E17] relative w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-[#0A0E17]/50 to-[#0A0E17]"></div>

                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white z-20 hover:bg-white/10"
                >
                    <ChevronRight className="w-6 h-6 rotate-180" />
                </button>

                <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-[2px] shadow-2xl shadow-amber-900/50">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-serif text-white">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <span>{member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pt-16 pb-8 overflow-y-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif text-white">{member.name}</h1>
                        <p className="text-amber-400/80 font-medium">{member.role}</p>
                    </div>
                    <Badge status={member.status} />
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                    <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Phone className="w-5 h-5 text-emerald-400" />
                        <span className="text-xs text-slate-300">Call</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-slate-300">Email</span>
                    </button>
                    <button
                        onClick={openNavigation}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 transition-colors group"
                    >
                        <LocateFixed className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-slate-300 group-hover:text-amber-400">Navigate</span>
                    </button>
                </div>

                <div className="mt-8 space-y-6">
                    <section>
                        <h3 className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">Geo-Location Data</h3>
                        <GlassPanel className="p-4 space-y-3">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-slate-400 text-sm">Registered Address</span>
                                <span className="text-white text-sm text-right">{member.address}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-slate-400 text-sm">Last Ping</span>
                                <span className="text-white text-sm">{member.lastSeen}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 text-sm">Distance</span>
                                <span className="text-emerald-400 text-sm flex items-center gap-1">
                                    <Navigation className="w-3 h-3" /> {member.distance} miles
                                </span>
                            </div>
                        </GlassPanel>
                    </section>

                    <section>
                        <h3 className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">Clerk's Notes</h3>
                        <GlassPanel className="p-4">
                            <p className="text-slate-300 text-sm italic">
                                "Requested transfer of membership letter from previous conference. Pending board review."
                            </p>
                            <div className="mt-2 text-right text-xs text-slate-500">- Church Clerk, Yesterday</div>
                        </GlassPanel>
                    </section>
                </div>
            </div>
        </div>
    );
};
