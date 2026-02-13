import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, MapPin, Loader2, LocateFixed } from 'lucide-react';
import { GlassPanel } from "./components/Shared";
import { Dashboard } from "./views/Dashboard";
import { Members, MemberData } from "./views/Members";
import { Programming } from "./views/Programming";
import { AdminLogistics } from "./views/AdminLogistics";
import { Treasury } from "./views/Treasury";
import { Communications } from "./views/Communications";
import { MemberDetail } from "./components/MemberDetail";
import { NavigationDock } from "./components/NavigationDock";
import { verifyOfficerPin } from "@/app/actions/member";
import { toast } from "sonner";

interface OfficerPortalProps {
    onClose: () => void;
}

export const OfficerPortal = ({ onClose }: OfficerPortalProps) => {
    const [view, setView] = useState('login'); // login, dashboard, members, programming, admin, treasury
    const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
    const [authStep, setAuthStep] = useState<'idle' | 'locating' | 'verifying' | 'success'>('idle');
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleLogin = async () => {
        // Simulate Geo-Fenced Login Sequence
        setAuthStep('locating');

        // Step 1: Acquire GPS
        setTimeout(() => {
            setAuthStep('verifying'); // In real app, we would verify Geofence here

            // Step 2: Prompt for PIN 
        }, 1200);
    };

    const handlePinSubmit = async () => {
        if (pin.length < 4) return;
        setLoading(true);

        try {
            const isValid = await verifyOfficerPin(pin);
            if (isValid) {
                setAuthStep('locating');

                setTimeout(() => {
                    setAuthStep('verifying');
                    setTimeout(() => {
                        setAuthStep('success');
                        setTimeout(() => {
                            setView('dashboard');
                            setAuthStep('idle');
                        }, 800);
                    }, 1200);
                }, 1200);
            } else {
                toast.error("Invalid PIN");
            }
        } catch (error) {
            toast.error("Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleExit = () => {
        setView('login');
        setPin("");
    };

    if (!mounted) return null;

    if (view === 'login') {
        return createPortal(
            <div className="fixed inset-0 z-50 bg-[#0A0E17] text-white flex flex-col items-center justify-start pt-24 font-sans w-full h-full animate-in fade-in duration-300">
                {/* Close Button for the Modal */}
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="z-10 w-full max-w-md px-8 text-center">
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(217,119,6,0.4)]">
                            <BookOpen className="w-10 h-10 text-white fill-white/20" />
                        </div>
                        <h1 className="text-4xl font-serif tracking-tight mb-2">FaithHub</h1>
                        <p className="text-slate-400 text-sm tracking-widest uppercase">Officer Portal • SDA Edition</p>
                    </div>

                    {authStep !== 'idle' ? (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-white/5 rounded-full animate-spin"></div>
                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500/50 border-t-amber-400 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-amber-400 animate-pulse" />
                                </div>
                            </div>

                            <div className="h-6 overflow-hidden relative w-full">
                                {authStep === 'locating' && (
                                    <p className="text-amber-400 text-xs tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 text-center">Acquiring Satellites...</p>
                                )}
                                {authStep === 'verifying' && (
                                    <p className="text-emerald-400 text-xs tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 text-center">Verifying Geofence...</p>
                                )}
                                {authStep === 'success' && (
                                    <p className="text-white text-xs tracking-widest uppercase animate-in fade-in slide-in-from-bottom-2 text-center font-bold">Access Granted</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-4">
                            <GlassPanel className="p-8 border-t-white/20">
                                <p className="text-slate-300 mb-6 font-light">Happy Sabbath, <span className="text-white font-medium">Officer</span>.</p>

                                <div className="mb-4">
                                    <input
                                        type="password"
                                        placeholder="Enter Officer PIN"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-center text-white placeholder-slate-500 tracking-widest focus:outline-none focus:border-amber-500/50 transition-colors"
                                        maxLength={4}
                                    />
                                </div>

                                <button
                                    onClick={handlePinSubmit}
                                    disabled={loading || pin.length < 4}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LocateFixed className="w-5 h-5 text-black" />}
                                    {loading ? "Verifying..." : "Geo-Verify & Login"}
                                </button>
                            </GlassPanel>
                            <p className="text-[10px] text-slate-600 uppercase tracking-wider">Location services required for entry</p>
                        </div>
                    )}
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white font-sans overflow-y-auto w-screen h-screen">

            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 px-4 pt-24 pb-32 max-w-2xl mx-auto min-h-screen">
                {view === 'dashboard' && <Dashboard setActiveView={setView} />}
                {view === 'members' && <Members onSelectMember={setSelectedMember} />}
                {view === 'programming' && <Programming />}
                {view === 'communications' && <Communications />}
                {view === 'admin' && <AdminLogistics />}
                {view === 'treasury' && <Treasury />}
            </main>

            {/* Detail Overlay */}
            {selectedMember && (
                <MemberDetail
                    member={selectedMember}
                    onBack={() => setSelectedMember(null)}
                />
            )}

            {/* Cinematic Navigation Dock */}
            <NavigationDock
                view={view}
                setView={(v) => {
                    if (v === 'login') {
                        handleExit();
                    } else {
                        setView(v);
                    }
                }}
            />
        </div>,
        document.body
    );
};
