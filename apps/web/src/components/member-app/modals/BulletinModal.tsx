import { X, FileText, Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getBulletins } from "@/app/actions/member";
import { BulletinItem } from "@/types/member-app";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BulletinModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BulletinModal = ({ isOpen, onClose }: BulletinModalProps) => {
    const [bulletins, setBulletins] = useState<BulletinItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getBulletins()
                .then(data => {
                    setBulletins(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    toast.error("Failed to load bulletins. Please try again.");
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
                    <h2 className="text-2xl font-bold">Church Bulletins</h2>
                    <p className="opacity-80 text-sm mt-1">Updates & Announcements</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {loading ? (
                        <div className="flex items-center justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                        </div>
                    ) : (
                        bulletins.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                <FileText className="w-12 h-12 mb-2 opacity-20" />
                                <p>No bulletins at this time</p>
                            </div>
                        ) : (
                            bulletins.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <span className={cn(
                                            "text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md",
                                            item.priority === 'high' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                        )}>
                                            {item.date}
                                        </span>
                                        {item.priority === 'high' && (
                                            <span className="flex h-2 w-2 rounded-full bg-red-500" />
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                        <div className="w-12 h-1 bg-slate-100 rounded-full mt-2 mb-3" />
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                                        {item.fileUrl && (
                                            <a
                                                href={item.fileUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 mt-4 text-[#005f9e] font-medium hover:underline"
                                            >
                                                <FileText className="w-4 h-4" />
                                                View Bulletin File
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
