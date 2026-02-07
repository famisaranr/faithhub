"use client";

import { Home, BookOpenCheck, Heart, Calendar, User } from "lucide-react";
import { ModalType } from "./types";

interface BottomNavProps {
    onOpenModal: (type: ModalType) => void;
    onHome?: () => void;
}

export const BottomNav = ({ onOpenModal, onHome }: BottomNavProps) => {
    return (
        <nav className="bg-white border-t border-slate-100 pb-[env(safe-area-inset-bottom)] fixed bottom-0 w-full z-30">
            <div className="flex justify-around items-center h-16">
                <button
                    onClick={onHome}
                    className="flex flex-col items-center gap-1 text-[#005f9e] w-full active:opacity-70 transition"
                >
                    <Home className="w-5 h-5 fill-current" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button onClick={() => onOpenModal('bible')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 w-full active:text-[#005f9e] transition">
                    <BookOpenCheck className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Bible</span>
                </button>
                {/* Center Action Button */}
                <button onClick={() => onOpenModal('giving')} className="flex flex-col items-center justify-center -mt-6 w-14 h-14 bg-[#005f9e] rounded-full shadow-lg shadow-[#005f9e]/30 text-white transform active:scale-95 transition border-4 border-gray-50">
                    <Heart className="w-6 h-6" />
                </button>
                <button onClick={() => onOpenModal('events')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 w-full active:text-[#005f9e] transition">
                    <Calendar className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Events</span>
                </button>
                <button onClick={() => onOpenModal('profile')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 w-full active:text-[#005f9e] transition">
                    <User className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </div>
        </nav>
    );
};
