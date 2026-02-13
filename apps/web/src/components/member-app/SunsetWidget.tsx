"use client";

import { useEffect, useState } from "react";
import { Moon, Sunrise, Sunset } from "lucide-react";
import { SABBATH_STAGES, SabbathStage } from "./types";

interface SunsetWidgetProps {
    onStageChange: (stage: SabbathStage | null) => void;
    stage?: SabbathStage | null;
}

export const SunsetWidget = ({ onStageChange, stage }: SunsetWidgetProps) => {
    // Mocking sunset time (6:02 PM today)
    const [timeLeftStr, setTimeLeftStr] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();


            // Calculate time until 6:00 PM today (mock) to match Protocol Hook
            const sunset = new Date();
            sunset.setHours(18, 0, 0, 0);

            if (now > sunset) {
                // If past sunset, show countdown to next day sunset? Or just 00:00:00
                // For simplified UX, let's just show "Sabbath Started" if we were managing that state, 
                // but here let's just show a clear countdown looking forward if needed.
                // Actually, if it's negative, let's just make it tomorrow 6:02 PM for the loop
                sunset.setDate(sunset.getDate() + 1);
            }

            const diff = sunset.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeftStr(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Derived styles based on stage
    // If we want the widget to *look* different based on the specific stage (like the prototype did),
    // we need to access the config.

    // Let's assume for this specific component, we render the "Standard" view, 
    // and if a stage is active (passed via props or calculated), we show the specific UI.

    // NOTE: In the prototype, the widget background changes.
    // I'll stick to a default view for now, and maybe add the 'active' prop in a future iteration if strictly needed for the simulator to update *this* widget's look.
    // The Prototype code modified the DOM element `#sunset-card`.

    // Derived styles based on stage
    const activeConfig = stage ? SABBATH_STAGES[stage] : null;
    const bgClass = activeConfig ? `bg-gradient-to-br ${activeConfig.colorClass}` : 'bg-gradient-to-br from-[#005f9e] to-[#004e82]';

    return (
        <div
            id="sunset-card"
            className={`w-full ${bgClass} rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transition-all duration-1000`}
        >
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 opacity-90 mb-1">
                        <Moon className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wider">{activeConfig?.statusText || 'Sunset Countdown'}</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight font-mono">{activeConfig?.timer || timeLeftStr}</h2>
                    <p className="text-sm opacity-80 mt-1 font-medium">{activeConfig?.subText || 'Sunset at 6:02 PM Today'}</p>
                </div>

                {/* Weather Icon (Static for now) */}
                <div className="flex flex-col items-end">
                    <SunIcon />
                    <span className="text-lg font-bold">29°C</span>
                </div>
            </div>

            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-white/20 w-full">
                <div
                    id="sunset-progress"
                    className={`h-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000`}
                    style={{ width: activeConfig?.progress || '45%' }}
                ></div>
            </div>

            {/* Background Decor */}
            <div className="absolute -right-4 -bottom-8 opacity-10 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48">
                    <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z" />
                </svg>
            </div>
        </div>
    );
};

const SunIcon = () => (
    <svg className="w-8 h-8 text-yellow-300 animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="M4.93 4.93l1.41 1.41"></path>
        <path d="M17.66 17.66l1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="M6.34 17.66l-1.41 1.41"></path>
        <path d="M19.07 4.93l-1.41 1.41"></path>
    </svg>
);
