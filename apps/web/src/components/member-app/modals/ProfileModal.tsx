"use client";

import { X, UserCircle, Bell, Settings, LogOut, ChevronRight, ChevronLeft, Shield, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getMemberProfile, getNotifications, logout, markNotificationAsRead } from "@/app/actions/member";
import { MemberProfile, NotificationItem } from "@/types/member-app";
import { toast } from "sonner";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: 'main' | 'account' | 'notifications' | 'settings';
}

type ViewState = 'main' | 'account' | 'notifications' | 'settings';

export const ProfileModal = ({ isOpen, onClose, initialTab = 'main' }: ProfileModalProps) => {
    const [view, setView] = useState<ViewState>(initialTab);
    const [profile, setProfile] = useState<MemberProfile | null>(null);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Settings State
    const [darkMode, setDarkMode] = useState(false);
    const [pushEnabled, setPushEnabled] = useState(false);

    useEffect(() => {
        // Load settings from localStorage
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        const storedPush = localStorage.getItem('pushEnabled') === 'true';

        setDarkMode(storedDarkMode);
        setPushEnabled(storedPush);

        // Apply dark mode if needed (assuming 'dark' class on html element)
        if (storedDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        localStorage.setItem('darkMode', String(newValue));
        if (newValue) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const togglePush = () => {
        const newValue = !pushEnabled;
        setPushEnabled(newValue);
        localStorage.setItem('pushEnabled', String(newValue));
        if (newValue) {
            toast.success("Push notifications enabled");
        } else {
            toast.info("Push notifications disabled");
        }
    };

    useEffect(() => {
        if (isOpen) {
            setView(initialTab);
            loadProfile();
            if (view === 'notifications' || initialTab === 'notifications') {
                loadNotifications();
            }
        }
    }, [isOpen]);

    // Update view when initialTab changes while open (e.g. clicking notification bell)
    useEffect(() => {
        if (isOpen && initialTab) {
            setView(initialTab);
        }
    }, [initialTab, isOpen]);

    useEffect(() => {
        if (view === 'notifications') {
            loadNotifications();
        }
    }, [view]);

    const loadProfile = async () => {
        try {
            const data = await getMemberProfile();
            setProfile(data as unknown as MemberProfile);
        } catch (error) {
            console.error("Failed to load profile", error);
            toast.error("Failed to load profile");
        }
    };

    const loadNotifications = async () => {
        setIsLoading(true);
        try {
            const data = await getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Failed to load notifications", error);
            toast.error("Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            toast.success("Signed out successfully");
            onClose();
            // Optional: Redirect to login or home if needed
            // window.location.href = '/login'; 
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Failed to sign out");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            await markNotificationAsRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (error) {
            toast.error("Failed to update notification");
        }
    };

    if (!isOpen) return null;

    const renderHeader = (title: string, backTo: ViewState = 'main') => (
        <div className="bg-[#005f9e] p-6 text-white relative shrink-0">
            <button
                onClick={backTo === 'main' && view === 'main' ? onClose : () => setView(backTo)}
                className="absolute top-6 right-6 text-white/70 hover:text-white"
            >
                <X className="w-6 h-6" />
            </button>
            {view !== 'main' && (
                <button
                    onClick={() => setView('main')}
                    className="absolute top-6 left-6 text-white/70 hover:text-white flex items-center gap-1 text-sm"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </button>
            )}
            <h2 className="text-2xl font-bold mt-2">{title}</h2>
            {view === 'main' && profile && (
                <div className="flex items-center gap-3 mt-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border-2 border-white/30 text-xl font-bold">
                        {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                    </div>
                    <div>
                        <p className="font-semibold text-lg">{profile.firstName} {profile.lastName}</p>
                        <p className="text-blue-100 text-sm">{profile.role}</p>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md h-[90vh] sm:h-[800px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col">

                {view === 'main' && (
                    <>
                        {renderHeader('My Profile')}
                        <div className="p-6 space-y-1 overflow-y-auto">
                            <button
                                onClick={() => setView('account')}
                                className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition text-left group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-[#005f9e] group-hover:text-white transition">
                                    <UserCircle className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-slate-700 flex-1">Account Details</span>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </button>

                            <button
                                onClick={() => setView('notifications')}
                                className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition text-left group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-[#005f9e] group-hover:text-white transition">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-slate-700">Notifications</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </button>

                            <button
                                onClick={() => setView('settings')}
                                className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 rounded-xl transition text-left group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-[#005f9e] group-hover:text-white transition">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-slate-700 flex-1">App Settings</span>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </button>

                            <div className="h-4"></div>

                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="w-full flex items-center gap-3 p-4 hover:bg-red-50 rounded-xl transition text-left group"
                            >
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <span className="font-medium text-red-600">
                                    {isLoading ? 'Signing Out...' : 'Sign Out'}
                                </span>
                            </button>
                        </div>
                    </>
                )}

                {view === 'account' && (
                    <>
                        {renderHeader('Account Details')}
                        <div className="p-6 space-y-6 overflow-y-auto">
                            {profile ? (
                                <>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Member ID</label>
                                        <div className="p-3 bg-slate-50 rounded-lg text-slate-700 font-mono text-sm">{profile.id}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                        <div className="p-3 bg-slate-50 rounded-lg text-slate-700 font-medium">{profile.firstName} {profile.lastName}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                        <div className="p-3 bg-slate-50 rounded-lg text-slate-700">{profile.email}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Membership Status</label>
                                        <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            <span className="font-medium">Active Member</span>
                                        </div>
                                    </div>
                                </>
                            ) : <div className="text-center p-8 text-slate-400">Loading profile...</div>}
                        </div>
                    </>
                )}

                {view === 'notifications' && (
                    <>
                        {renderHeader('Notifications')}
                        <div className="flex-1 overflow-y-auto bg-slate-50">
                            {isLoading && notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">Loading notifications...</div>
                            ) : notifications.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {notifications.map(n => (
                                        <div key={n.id} className={`p-4 bg-white ${!n.read ? 'bg-blue-50/30' : ''}`}>
                                            <div className="flex gap-3">
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className={`font-medium text-sm ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h4>
                                                        <span className="text-[10px] text-slate-400">{n.time}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed">{n.message}</p>
                                                    {!n.read && (
                                                        <button
                                                            onClick={() => handleMarkRead(n.id)}
                                                            className="text-xs text-[#005f9e] font-medium mt-2 hover:underline"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                        <Bell className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <p>No notifications yet</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {view === 'settings' && (
                    <>
                        {renderHeader('App Settings')}
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <h4 className="font-medium text-slate-900">Push Notifications</h4>
                                    <p className="text-xs text-slate-500">Receive alerts about church events</p>
                                </div>
                                <div
                                    className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${pushEnabled ? 'bg-[#005f9e]' : 'bg-slate-200'}`}
                                    onClick={togglePush}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${pushEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <h4 className="font-medium text-slate-900">Dark Mode</h4>
                                    <p className="text-xs text-slate-500">Adjust app appearance</p>
                                </div>
                                <div
                                    className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${darkMode ? 'bg-[#005f9e]' : 'bg-slate-200'}`}
                                    onClick={toggleDarkMode}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400">Centennial Church App</p>
                                <p className="text-[10px] text-slate-300 mt-1">Version 1.0.2 (Build 2026)</p>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};
