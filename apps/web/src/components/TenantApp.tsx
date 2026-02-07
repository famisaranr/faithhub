"use client";

import { useState } from "react";
import { MemberAppShell } from "./member-app/MemberAppShell";
import { PageRenderer } from "./engine/PageRenderer";
import { PageConfig } from "./engine/types";
import { ArrowLeft } from "lucide-react";

import { Tenant } from "./member-app/types";

interface TenantAppProps {
    config: PageConfig;
    tenant?: Tenant;
}

type ViewState = 'member-app' | 'marketing-site';

export const TenantApp = ({ config, tenant }: TenantAppProps) => {
    const [view, setView] = useState<ViewState>('member-app');

    const toggleView = () => {
        setView(prev => prev === 'member-app' ? 'marketing-site' : 'member-app');
    };

    // Centennial Logic: check slug or specific flag.
    // Ideally this should be data-driven, e.g. tenant.features.marketingSite
    const hasMarketingSite = tenant?.slug === 'batangas-city-central';

    if (view === 'marketing-site') {
        return (
            <div className="relative">
                <PageRenderer config={config} />

                {/* Floating Action Button to return to App */}
                <button
                    onClick={() => setView('member-app')}
                    className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to App
                </button>
            </div>
        );
    }

    return (
        <MemberAppShell
            onLaunchCentennial={hasMarketingSite ? () => setView('marketing-site') : undefined}
            tenant={tenant}
        />
    );
};
