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
import { BulletinModal } from "./modals/BulletinModal";
import { SabbathOverlay } from "./SabbathOverlay";
import { Tenant } from "./types";
import { useSabbathProtocol } from "./hooks/useSabbathProtocol";

interface MemberAppShellProps {
    onLaunchCentennial?: () => void;
    tenant?: Tenant;
}

export const MemberAppShell = ({ onLaunchCentennial, tenant }: MemberAppShellProps) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [profileTab, setProfileTab] = useState<'main' | 'notifications' | 'account' | 'settings'>('main');

    // Intelligent Sabbath Protocol
    const automatedStage = useSabbathProtocol();
    // We can still allow manual override for dev/testing if we kept a separate state, 
    // but the requirement is to make it built-in.
    // Let's use the automated stage.
    // If we wanted to keep the simulator hidden, we could uncomment the manual state.
    // const [manualStage, setManualStage] = useState<SabbathStage | null>(null); 
    const sabbathStage = automatedStage;

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

                {/* Pass the active stage to SunsetWidget so it syncs up */}
                <SunsetWidget onStageChange={() => { }} stage={sabbathStage} />

                <QuickActions onOpenModal={openModal} onLaunchCentennial={onLaunchCentennial} />

                <SabbathSchedule onOpenLesson={() => openModal('lesson')} />

                <Announcements onOpenBulletin={() => openModal('bulletin')} />

                {/* Branding Footer */}
                <div className="mt-8 mb-6 flex justify-center opacity-60 hover:opacity-100 transition active:scale-95">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                        <svg className="w-3 h-3 text-sda-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="6" height="6" x="2" y="2" rx="1" /><rect width="6" height="6" x="16" y="2" rx="1" /><rect width="6" height="6" x="2" y="16" rx="1" /><rect width="6" height="6" x="16" y="16" rx="1" /><path d="M5 5h.01" /><path d="M19 5h.01" /><path d="M5 19h.01" /><path d="M19 19h.01" />
                        </svg>
                        <p className="text-[10px] text-slate-500 font-medium">Powered by our <span className="font-bold text-slate-700">FaithHub</span></p>
                    </div>
                </div>

                {/* PROTOCOL TEST CONTROLS - REMOVED for Automated Production Use */}

            </main>

            {/* Bottom Nav */}
            <BottomNav onOpenModal={openModal} onHome={closeModal} />

            {/* Overlays & Modals */}
            {/* The overlay will now appear automatically based on time */}
            <SabbathOverlay stage={sabbathStage} onDismiss={() => {
                // If dismissed, maybe we temporarily silence it?
                // For now, simpler implementation: just hide visually until next stage change triggers re-render?
                // Actually, SabbathOverlay handles its own visibility state (see visible state in SabbathOverlay).
                // But it resets when stage changes. 
                // So calling onDismiss just closes the current popup. Correct.
            }} />

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
            {activeModal === 'bulletin' && <BulletinModal isOpen={true} onClose={closeModal} />}

        </div>
    );
}

