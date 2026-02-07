import { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, ChevronRight } from 'lucide-react';
import { GlassPanel, Badge } from "../components/Shared";
import { getMembers } from '@/app/actions/officer';

// --- Geo-Intelligence Configuration (Simplified for MVP) ---
// const CHURCH_LOCATION = { lat: 40.7128, lng: -74.0060 }; // Mock Center Point

export interface MemberData {
    id: string; // Changed to string to match CUID
    name: string;
    role: string;
    status: string;
    image?: string | null;
    lastSeen: string;
    location: string;
    giving: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    distance?: string;
}

export const Members = ({ onSelectMember }: { onSelectMember: (m: MemberData) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [members, setMembers] = useState<MemberData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const dbMembers = await getMembers(searchTerm);
                if (dbMembers) {
                    const mappedMembers: MemberData[] = dbMembers.map((m: any) => ({
                        id: m.id,
                        name: m.name,
                        role: m.role.charAt(0).toUpperCase() + m.role.slice(1),
                        status: m.status.charAt(0).toUpperCase() + m.status.slice(1),
                        image: m.avatarUrl,
                        lastSeen: "Today", // Mocked
                        location: "Main Sanctuary", // Mocked
                        giving: "Faithful", // Mocked
                        phone: m.phone,
                        email: m.email,
                        address: m.address,
                        distance: "0.2" // Mocked
                    }));
                    setMembers(mappedMembers);
                }
            } catch (error) {
                console.error("Failed to fetch members", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search slightly
        const timer = setTimeout(() => {
            fetchMembers();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className="h-full pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="sticky top-0 z-20 pb-4 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h1 className="text-3xl font-serif text-white tracking-tight">Shepherd's View</h1>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs mt-1">
                            <Navigation className="w-3 h-3" />
                            <span>Sorted by Name</span>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search brethren..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 backdrop-blur-md transition-all"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <div className="text-slate-500 text-center py-4">Loading members...</div>
                ) : members.length === 0 ? (
                    <div className="text-slate-500 text-center py-4">No members found.</div>
                ) : (
                    members.map((member) => (
                        <GlassPanel
                            key={member.id}
                            onClick={() => onSelectMember(member)}
                            className="p-4 flex items-center justify-between group hover:bg-white/10 cursor-pointer active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-serif font-bold border border-white/10 shadow-inner overflow-hidden">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                                        )}
                                    </div>
                                    {(parseFloat(member.distance!) < 0.5) && (
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0A0E17] flex items-center justify-center">
                                            <MapPin className="w-3 h-3 text-white fill-white" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">{member.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-slate-400 text-sm">{member.role}</p>
                                        <span className="text-slate-600 text-xs">•</span>
                                        <p className="text-slate-500 text-xs flex items-center gap-0.5">
                                            <Navigation className="w-2.5 h-2.5" /> {member.address || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge status={member.status} />
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                        </GlassPanel>
                    ))
                )}
            </div>
        </div>
    );
};
