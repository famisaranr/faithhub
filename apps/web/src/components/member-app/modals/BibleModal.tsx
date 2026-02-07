"use client";

import { X, Search } from "lucide-react";

interface BibleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BibleModal = ({ isOpen, onClose }: BibleModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md h-[90vh] sm:h-[800px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="flex-1 bg-slate-100 rounded-xl flex items-center px-4 py-2">
                        <Search className="w-4 h-4 text-slate-400 mr-2" />
                        <input type="text" placeholder="Search Book, Chapter..." className="bg-transparent text-sm w-full outline-none" />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    <p>Bible Reader Integration Component</p>
                </div>
            </div>
        </div>
    );
};
