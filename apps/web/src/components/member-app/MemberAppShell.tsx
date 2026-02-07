"use client";

import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { SunsetWidget } from "./SunsetWidget";
import { QuickActions } from "./QuickActions";
import { SabbathSchedule } from "./SabbathSchedule";
import { Announcements } from "./Announcements";
import { BottomNav } from "./BottomNav";
import { ModalType, SabbathStage } from "./types";
import { Toaster } from "sonner"; // Assuming we might use sonner, or custom toast from prototype

// Modals
import { GivingModal } from "./modals/GivingModal";
import { WorshipModal } from "./modals/WorshipModal";
import { EventsModal } from "./modals/EventsModal";
import { TechPrepModal } from "./modals/TechPrepModal";
import { OfficerModal } from "./modals/OfficerModal";
import { ProfileModal } from "./modals/ProfileModal";
import { BibleModal } from "./modals/BibleModal";
import { LessonModal } from "./modals/LessonModal";
import { AudioModal } from "./modals/AudioModal";
import { HymnalModal } from "./modals/HymnalModal";
import { SabbathOverlay } from "./SabbathOverlay";
import { Tenant } from "./types";

interface MemberAppShellProps {
    onLaunchCentennial?: () => void;
    tenant?: Tenant;
}

export const MemberAppShell = ({ onLaunchCentennial, tenant }: MemberAppShellProps) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [sabbathStage, setSabbathStage] = useState<SabbathStage | null>(null);
    const [profileTab, setProfileTab] = useState<'main' | 'notifications' | 'account' | 'settings'>('main');

    const openModal = (id: ModalType) => {
        setProfileTab('main'); // Reset profile tab when opening generic modals
        setActiveModal(id);
    };

    const closeModal = () => setActiveModal(null);

    const openProfileNotifications = () => {
        setProfileTab('notifications');
        setActiveModal('profile');
    };

    return (
        <div className="bg-gray-50 text-slate-800 h-screen flex flex-col font-sans select-none relative overflow-hidden">
            {/* Notification Toast Container Placeholder - can integrate Sonner here */}
            {/* <Toaster /> */}

            {/* Top Header */}
            <AppHeader onOpenNotifications={openProfileNotifications} tenant={tenant} />

            {/* Main Scrollable Content */}
            <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 hide-scrollbar">

                <SunsetWidget onStageChange={setSabbathStage} stage={sabbathStage} />

                <QuickActions onOpenModal={openModal} onLaunchCentennial={onLaunchCentennial} />

                <SabbathSchedule onOpenLesson={() => openModal('lesson')} />

                <Announcements />

                {/* Branding Footer */}
                <div className="mt-8 mb-6 flex justify-center opacity-60 hover:opacity-100 transition active:scale-95">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                        <svg className="w-3 h-3 text-sda-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="6" height="6" x="2" y="2" rx="1" /><rect width="6" height="6" x="16" y="2" rx="1" /><rect width="6" height="6" x="2" y="16" rx="1" /><rect width="6" height="6" x="16" y="16" rx="1" /><path d="M5 5h.01" /><path d="M19 5h.01" /><path d="M5 19h.01" /><path d="M19 19h.01" />
                        </svg>
                        <p className="text-[10px] text-slate-500 font-medium">Powered by our <span className="font-bold text-slate-700">FaithHub</span></p>
                    </div>
                </div>

                {/* PROTOCOL TEST CONTROLS (Dev Only) */}
                <div className="mt-8 p-4 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">-- Sabbath Protocol Simulator --</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button onClick={() => setSabbathStage('prep')} className="px-3 py-2 bg-slate-200 rounded text-[10px] font-bold text-slate-600">30m: Prep</button>
                        <button onClick={() => setSabbathStage('ready')} className="px-3 py-2 bg-yellow-100 rounded text-[10px] font-bold text-yellow-700">18m: Ready</button>
                        <button onClick={() => setSabbathStage('warning')} className="px-3 py-2 bg-orange-100 rounded text-[10px] font-bold text-orange-700">5m: Warning</button>
                        <button onClick={() => setSabbathStage('sabbath')} className="px-3 py-2 bg-indigo-100 rounded text-[10px] font-bold text-indigo-700">0m: Sunset</button>
                    </div>
                </div>
            </main>

            {/* Bottom Nav */}
            <BottomNav onOpenModal={openModal} onHome={closeModal} />

            {/* Overlays & Modals */}
            <SabbathOverlay stage={sabbathStage} onDismiss={() => setSabbathStage(null)} />

            {activeModal === 'giving' && <GivingModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'worship' && <WorshipModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'events' && <EventsModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'tech-prep' && <TechPrepModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'officer' && <OfficerModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'profile' && <ProfileModal isOpen={true} onClose={closeModal} initialTab={profileTab} />}
            {activeModal === 'bible' && <BibleModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'lesson' && <LessonModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'audio' && <AudioModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'hymnal' && <HymnalModal isOpen={true} onClose={closeModal} />}

        </div>
    );
}
