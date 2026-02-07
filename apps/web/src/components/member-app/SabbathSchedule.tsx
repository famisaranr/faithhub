import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getSabbathSchedule } from "@/app/actions/member";
import { ScheduleItem } from "@/types/member-app";
import { cn } from "@/lib/utils";

interface SabbathScheduleProps {
    onOpenLesson: () => void;
}

export const SabbathSchedule = ({ onOpenLesson }: SabbathScheduleProps) => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getSabbathSchedule();
                setSchedule(data);
            } catch (error) {
                console.error("Failed to load schedule", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="mt-6">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-900 text-lg">Sabbath Order</h3>
                    <div className="h-4 w-12 bg-slate-200 rounded animate-pulse"></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-slate-900 text-lg">Sabbath Order</h3>
                <span className="text-xs text-[#005f9e] font-bold bg-blue-50 px-2 py-1 rounded">Today</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {schedule.map((item) => {
                    const isLesson = item.type === "sabbath_school" && item.title.includes("Lesson");
                    const isDivine = item.type === "divine_service";

                    return (
                        <div
                            key={item.id}
                            className={cn(
                                "p-4 flex gap-4 transition-colors duration-500",
                                isDivine ? "bg-orange-50/50 border-l-4 border-l-orange-400" : "",
                                isLesson ? "active:bg-slate-50 cursor-pointer" : ""
                            )}
                            onClick={isLesson ? onOpenLesson : undefined}
                        >
                            <div className="flex flex-col items-center min-w-[3rem]">
                                <span className={cn(
                                    "text-xs font-mono font-bold",
                                    isDivine ? "text-orange-700" : "text-slate-400"
                                )}>
                                    {item.time}
                                </span>
                                {!isDivine && (
                                    <div className="h-full w-0.5 bg-slate-100 mt-1 mb-[-1.5rem]"></div>
                                )}
                            </div>
                            <div className="w-full">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                    {isLesson && <ChevronRight className="w-4 h-4 text-slate-300" />}
                                </div>
                                {item.description && <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>}
                                {item.details && (
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block",
                                        isDivine ? "text-slate-400 italic bg-transparent p-0" : "text-[#005f9e] bg-[#f0f9ff]"
                                    )}>
                                        {item.details}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
