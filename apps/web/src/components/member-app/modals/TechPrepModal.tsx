"use client";

import { X, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

interface TechPrepModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TechPrepModal = ({ isOpen, onClose }: TechPrepModalProps) => {
    const [checklist, setChecklist] = useState({
        silencePhone: false,
        brightness: false,
        bibleApp: false,
        notepad: false
    });

    const toggle = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-800 p-6 text-white relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold">Tech Prep</h2>
                    <p className="opacity-80 text-sm mt-1">Get ready for worship</p>
                </div>

                <div className="p-6 space-y-3">
                    <button onClick={() => toggle('silencePhone')} className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${checklist.silencePhone ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-slate-100'}`}>
                        <span className={`font-bold ${checklist.silencePhone ? 'text-green-800' : 'text-slate-700'}`}>Silence Phone</span>
                        {checklist.silencePhone ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Circle className="w-6 h-6 text-slate-300" />}
                    </button>

                    <button onClick={() => toggle('brightness')} className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${checklist.brightness ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-slate-100'}`}>
                        <span className={`font-bold ${checklist.brightness ? 'text-green-800' : 'text-slate-700'}`}>Adjust Brightness</span>
                        {checklist.brightness ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Circle className="w-6 h-6 text-slate-300" />}
                    </button>

                    <button onClick={() => toggle('bibleApp')} className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${checklist.bibleApp ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-slate-100'}`}>
                        <span className={`font-bold ${checklist.bibleApp ? 'text-green-800' : 'text-slate-700'}`}>Open Bible App</span>
                        {checklist.bibleApp ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Circle className="w-6 h-6 text-slate-300" />}
                    </button>

                    <button onClick={() => toggle('notepad')} className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${checklist.notepad ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-slate-100'}`}>
                        <span className={`font-bold ${checklist.notepad ? 'text-green-800' : 'text-slate-700'}`}>Ready Notepad</span>
                        {checklist.notepad ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Circle className="w-6 h-6 text-slate-300" />}
                    </button>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">Reverence in the House of the Lord</p>
                </div>
            </div>
        </div>
    );
};
