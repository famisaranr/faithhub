"use client";

import { X, Play, SkipForward, SkipBack } from "lucide-react";

interface AudioModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AudioModal = ({ isOpen, onClose }: AudioModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 text-white p-6">
                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-xl font-bold">Hope Channel Radio</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>

                <div className="w-full aspect-square bg-slate-800 rounded-2xl mb-8 flex items-center justify-center shadow-inner">
                    <div className="w-32 h-32 bg-indigo-500 rounded-full animate-pulse flex items-center justify-center">
                        <Play className="w-12 h-12 fill-current ml-1" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold">Faith For Today</h3>
                    <p className="text-slate-400">Live Broadcast</p>
                </div>

                <div className="flex justify-center items-center gap-8 mb-4">
                    <button className="text-slate-400 hover:text-white"><SkipBack className="w-8 h-8" /></button>
                    <button className="w-16 h-16 bg-white rounded-full text-slate-900 flex items-center justify-center hover:scale-105 transition"><Play className="w-6 h-6 fill-current ml-1" /></button>
                    <button className="text-slate-400 hover:text-white"><SkipForward className="w-8 h-8" /></button>
                </div>
            </div>
        </div>
    );
};
