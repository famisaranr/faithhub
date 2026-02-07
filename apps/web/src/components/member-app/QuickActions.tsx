"use client";

import { Banknote, BookOpen, Sun, SmartphoneNfc, Key, Music, Headphones, Sparkles } from "lucide-react";
import { ModalType } from "./types";

interface QuickActionsProps {
    onOpenModal: (type: ModalType) => void;
    onLaunchCentennial?: () => void;
}

export const QuickActions = ({ onOpenModal, onLaunchCentennial }: QuickActionsProps) => {
    return (
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 snap-x hide-scrollbar px-1">
            {/* Centennial Special */}
            {onLaunchCentennial && (
                <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={onLaunchCentennial}>
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-500 rounded-2xl shadow-lg border border-amber-300 flex items-center justify-center text-white">
                        <Sparkles className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-800">Centennial</span>
                </button>
            )}

            {/* Give */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('giving')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-green-700">
                    <Banknote className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Give</span>
            </button>

            {/* Lesson */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('lesson')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#005f9e]">
                    <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Lesson</span>
            </button>

            {/* Worship */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('worship')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-orange-500">
                    <Sun className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Worship</span>
            </button>

            {/* Tech Prep */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('tech-prep')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-700">
                    <SmartphoneNfc className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Tech Prep</span>
            </button>

            {/* Officer Mode */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('officer')}>
                <div className="w-14 h-14 bg-slate-800 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-white">
                    <Key className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Officer</span>
            </button>

            {/* Hymnal */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('hymnal')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-rose-600">
                    <Music className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Hymnal</span>
            </button>

            {/* Audio */}
            <button className="snap-start flex flex-col items-center gap-2 min-w-[72px] active:opacity-70 transition" onClick={() => onOpenModal('audio')}>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
                    <Headphones className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-600">Audio</span>
            </button>
        </div>
    );
};
