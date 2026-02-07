"use client";

import { useEffect, useState } from "react";
import { SABBATH_STAGES, SabbathStage } from "./types";
import { X } from "lucide-react";

interface SabbathOverlayProps {
    stage: SabbathStage | null;
    onDismiss: () => void;
}

export const SabbathOverlay = ({ stage, onDismiss }: SabbathOverlayProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (stage) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [stage]);

    if (!stage || !visible) return null;

    const config = SABBATH_STAGES[stage];
    if (!config) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 pointer-events-auto" onClick={onDismiss}></div>

            {/* Modal Card */}
            <div className="bg-white w-full max-w-md mx-4 mb-6 rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-in slide-in-from-bottom-10 fade-in duration-500 pointer-events-auto">
                <div className={`h-24 bg-gradient-to-r ${config.colorClass} relative flex items-center justify-center`}>
                    {/* Icon based on stage - generic for now or specific */}
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {stage === 'prep' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                            {stage === 'ready' && <path d="M8.56 2.72a7 7 0 0 1 0 18.56m6.88-18.56a7 7 0 0 1 0 18.56" />}
                            {stage === 'warning' && <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />}
                            {stage === 'sabbath' && <path d="M3 6h18M3 12h18M3 18h18" />}
                        </svg>
                    </div>
                    <button onClick={onDismiss} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{config.statusText}</h3>
                    <p className="text-slate-500 mb-6 font-medium">{config.subText}</p>

                    <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                        <div className={`h-full ${config.progressColor} transition-all duration-1000`} style={{ width: config.progress }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
