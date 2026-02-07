"use client";

import { Bell, MapPin } from "lucide-react";

import { Tenant } from "./types";

interface AppHeaderProps {
    onOpenNotifications?: () => void;
    tenant?: Tenant;
}

export const AppHeader = ({ onOpenNotifications, tenant }: AppHeaderProps) => {
    return (
        <header className="bg-white px-4 pt-12 pb-4 shadow-sm z-20 flex justify-between items-center sticky top-0 transition-colors duration-500" id="app-header">
            {/* Church Identity Block */}
            <div className="flex items-center gap-3 cursor-pointer">
                <div id="church-logo" className="w-10 h-10 bg-[#005f9e] rounded-lg flex items-center justify-center text-white shadow-sm transition-colors duration-500">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z" />
                    </svg>
                </div>
                <div>
                    <h1 id="church-name" className="text-sm font-bold text-slate-900 leading-tight">
                        {tenant?.name || "Church Hub"}
                    </h1>
                    <div className="flex items-center gap-1">
                        <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">SDA Church</p>
                        <MapPin className="w-3 h-3 text-[#005f9e] animate-pulse hidden" />
                    </div>
                </div>
            </div>

            <button
                onClick={onOpenNotifications}
                className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition active:scale-95 outline-none focus:ring-2 focus:ring-[#005f9e]/20"
            >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </header>
    );
};
