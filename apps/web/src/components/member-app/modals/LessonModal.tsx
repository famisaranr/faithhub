"use client";

import { X } from "lucide-react";

interface LessonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LessonModal = ({ isOpen, onClose }: LessonModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md h-[90vh] sm:h-[800px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col">
                <div className="bg-[#005f9e] p-4 text-white flex justify-between items-center">
                    <h3 className="font-bold">Sabbath School Lesson</h3>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <iframe src="https://sabbath-school.adventech.io/" className="w-full h-full border-none rounded-xl" title="SS Lesson"></iframe>
                </div>
            </div>
        </div>
    );
};
