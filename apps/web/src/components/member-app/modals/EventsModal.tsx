import { X, Calendar as CalendarIcon, MapPin, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getUpcomingEvents } from "@/app/actions/member";
import { ChurchEvent } from "@/types/member-app";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EventsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EventsModal = ({ isOpen, onClose }: EventsModalProps) => {
    const [events, setEvents] = useState<ChurchEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getUpcomingEvents()
                .then(data => {
                    setEvents(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    toast.error("Failed to load events. Please try again.");
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md h-[80vh] sm:h-[700px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col">
                <div className="bg-[#005f9e] p-6 text-white relative shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Upcoming Events</h2>
                    <p className="opacity-80 text-sm mt-1">Mark your calendars</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                        </div>
                    ) : (
                        events.map((event) => {
                            const dateObj = new Date(event.date);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('default', { month: 'short' });

                            return (
                                <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                                    <div className="bg-blue-50 w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 border border-blue-100 text-[#005f9e]">
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
                                        <span className="text-2xl font-bold leading-none">{day}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800">{event.title}</h4>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                            <MapPin className="w-3 h-3" />
                                            <span>{event.location}</span>
                                        </div>
                                        {event.requiresRsvp && (
                                            <button className="mt-3 px-3 py-1.5 bg-slate-100 font-bold text-xs text-slate-600 rounded-lg hover:bg-slate-200 transition">Register</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
