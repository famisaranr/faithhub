import { useEffect, useState } from "react";
import { getBulletins } from "@/app/actions/member";
import { BulletinItem } from "@/types/member-app";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Announcements = () => {
    const [bulletins, setBulletins] = useState<BulletinItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getBulletins();
                setBulletins(data);
            } catch (error) {
                console.error("Failed to load bulletins", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="mt-8 mb-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Bulletins</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                    {[1, 2].map((i) => (
                        <div key={i} className="snap-center min-w-[260px] bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center h-28">
                            <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 mb-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Bulletins</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                {bulletins.map((item) => (
                    <div key={item.id} className="snap-center min-w-[260px] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <span className={cn(
                            "text-[10px] font-bold tracking-wider uppercase",
                            item.priority === 'high' ? "text-red-600" : "text-[#005f9e]"
                        )}>
                            {item.date}
                        </span>
                        <h4 className="font-bold text-slate-800 mt-1">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
