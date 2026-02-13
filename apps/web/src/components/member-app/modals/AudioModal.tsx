"use client";

import { X, Play, Pause, Loader2, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Plus, Radio, Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface AudioModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DEFAULT_STATIONS = [
    { name: "Hope Radio Davao", url: "https://stream.zeno.fm/cdwd08y17s8uv", subtitle: "Live Broadcast" },
    { name: "Adventist Home Radio", url: "https://stream.zeno.fm/0t307770338uv", subtitle: "Cebu City" },
    { name: "3ABN Radio", url: "https://war.str3am.com:7180/live", subtitle: "Global Broadcast" },
    { name: "AWR Asia", url: "https://stream.zeno.fm/2r026027s8uv", subtitle: "Manila Stream" },
];

export const AudioModal = ({ isOpen, onClose }: AudioModalProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [error, setError] = useState(false);

    // Station Management
    const [stations, setStations] = useState(DEFAULT_STATIONS);
    const [currentStationIndex, setCurrentStationIndex] = useState(0);
    const [showStationList, setShowStationList] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customUrl, setCustomUrl] = useState("");
    const [customName, setCustomName] = useState("");

    // Load custom stations from local storage on mount
    useEffect(() => {
        const savedCustom = localStorage.getItem('custom_radio_station');
        if (savedCustom) {
            try {
                const parsed = JSON.parse(savedCustom);
                setStations(prev => [...prev, parsed]);
            } catch (e) {
                console.error("Failed to parse custom station", e);
            }
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            // Stop audio when modal closes
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            setIsLoading(false);
            setShowStationList(false); // Reset view
            setShowCustomInput(false);
        } else {
            // Reset state when opening
            setError(false);
            // Optionally auto-play? Let's not auto-play for better UX unless requested
        }
    }, [isOpen]);

    // Handle station change
    const changeStation = (index: number) => {
        setCurrentStationIndex(index);
        setError(false);
        setIsPlaying(false);
        setIsLoading(true);
        setShowStationList(false);

        // Slight delay to allow audio element to update src
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                }).catch(err => {
                    console.error("Auto-play failed after station change", err);
                    setIsLoading(false);
                    // Don't set error immediately, let user try clicking play
                });
            }
        }, 100);
    };

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsLoading(true);
            setError(false);
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.error("Playback failed", err);
                setError(true);
                toast.error("Unable to play stream. Trying next station...");
                handleError(); // Trigger auto-switch
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
        setIsPlaying(false);

        // Auto-try next station if error occurs while playing
        // But only if we haven't looped through all of them heavily
        // For now, let's just toast and let user pick, to avoid infinite loops if all are down
        toast.error(`Stream "${stations[currentStationIndex].name}" is offline.`);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const saveCustomStation = () => {
        if (!customUrl) {
            toast.error("Please enter a valid URL");
            return;
        }
        const newStation = {
            name: customName || `Custom Station ${stations.length + 1}`,
            url: customUrl,
            subtitle: "User Added"
        };

        setStations(prev => [...prev, newStation]);
        localStorage.setItem('custom_radio_station', JSON.stringify(newStation));
        toast.success("Station added!");
        setCustomUrl("");
        setCustomName("");
        setShowCustomInput(false);
        // Switch to new station
        changeStation(stations.length);
    };

    if (!isOpen) return null;

    const currentStation = stations[currentStationIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 text-white p-6 border border-slate-800 flex flex-col h-[500px] sm:h-auto">
                <audio
                    ref={audioRef}
                    src={currentStation.url}
                    preload="none"
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                    onError={handleError}
                />

                {/* Header */}
                <div className="flex justify-between items-start mb-6 shrink-0">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></span>
                        Hope Channel Radio
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowStationList(!showStationList)}
                            className={`p-2 rounded-full transition ${showStationList ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-slate-400'}`}
                        >
                            <ListMusic className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-center relative overflow-hidden">

                    {/* Station List View */}
                    {showStationList ? (
                        <div className="absolute inset-0 overflow-y-auto pr-2 space-y-2 animate-in fade-in slide-in-from-right-10 duration-200">
                            {stations.map((station, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => changeStation(idx)}
                                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${currentStationIndex === idx ? 'bg-indigo-600/20 border border-indigo-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStationIndex === idx ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                        {currentStationIndex === idx && isPlaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className={`font-medium ${currentStationIndex === idx ? 'text-white' : 'text-slate-300'}`}>{station.name}</p>
                                        <p className="text-xs text-slate-500">{station.subtitle}</p>
                                    </div>
                                </button>
                            ))}

                            {!showCustomInput ? (
                                <button
                                    onClick={() => setShowCustomInput(true)}
                                    className="w-full p-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm mt-4"
                                >
                                    <Plus className="w-4 h-4" /> Add Custom Stream URL
                                </button>
                            ) : (
                                <div className="p-4 bg-slate-800 rounded-xl space-y-3 mt-4 border border-slate-700">
                                    <h4 className="text-sm font-medium text-slate-300">Add Custom Station</h4>
                                    <input
                                        type="text"
                                        placeholder="Station Name"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                                        value={customName}
                                        onChange={e => setCustomName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Stream URL (mp3/m3u8)"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                                        value={customUrl}
                                        onChange={e => setCustomUrl(e.target.value)}
                                    />
                                    <div className="flex gap-2 justify-end pt-2">
                                        <button
                                            onClick={() => setShowCustomInput(false)}
                                            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={saveCustomStation}
                                            className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition flex items-center gap-1"
                                        >
                                            <Save className="w-3 h-3" /> Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Player View */
                        <div className="flex flex-col items-center animate-in fade-in slide-in-from-left-10 duration-200">
                            <div className="w-full max-w-[200px] aspect-square bg-slate-800/50 rounded-3xl mb-8 flex items-center justify-center shadow-inner relative overflow-hidden group">
                                {/* Background Animation */}
                                {isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <div className="w-24 h-24 bg-indigo-500 rounded-full animate-ping absolute"></div>
                                        <div className="w-32 h-32 bg-indigo-500 rounded-full animate-ping delay-75 absolute"></div>
                                        <div className="w-40 h-40 bg-indigo-500 rounded-full animate-ping delay-150 absolute"></div>
                                    </div>
                                )}

                                <div className={`w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-indigo-900/50 transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
                                    {isLoading ? (
                                        <Loader2 className="w-12 h-12 animate-spin text-white/90" />
                                    ) : isPlaying ? (
                                        <div className="flex gap-1 items-end h-10">
                                            <span className="w-1.5 bg-white/90 rounded-t animate-[music-bar_1s_ease-in-out_infinite]"></span>
                                            <span className="w-1.5 bg-white/90 rounded-t animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]"></span>
                                            <span className="w-1.5 bg-white/90 rounded-t animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]"></span>
                                            <span className="w-1.5 bg-white/90 rounded-t animate-[music-bar_1.1s_ease-in-out_infinite_0.3s]"></span>
                                        </div>
                                    ) : (
                                        <Play className="w-12 h-12 fill-white text-white ml-1" />
                                    )}
                                </div>
                            </div>

                            <div className="text-center mb-10 space-y-1 w-full">
                                <h3 className="text-2xl font-bold tracking-tight truncate px-4">{currentStation.name}</h3>
                                <p className="text-indigo-200 font-medium">{currentStation.subtitle}</p>
                            </div>

                            <div className="flex justify-center items-center gap-8 mb-6">
                                <button
                                    onClick={toggleMute}
                                    className="text-slate-400 hover:text-white transition p-3 hover:bg-white/5 rounded-full"
                                >
                                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                </button>

                                <button
                                    onClick={togglePlay}
                                    disabled={isLoading || error}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-indigo-900/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'bg-red-500/20 text-red-500' : 'bg-white text-indigo-900 hover:bg-indigo-50'}`}
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                    ) : isPlaying ? (
                                        <Pause className="w-8 h-8 fill-current" />
                                    ) : (
                                        <Play className="w-8 h-8 fill-current ml-1" />
                                    )}
                                </button>

                                <button
                                    onClick={() => changeStation((currentStationIndex + 1) % stations.length)}
                                    className="text-slate-400 hover:text-white p-3 hover:bg-white/5 rounded-full transition"
                                >
                                    <SkipForward className="w-6 h-6" />
                                </button>
                            </div>

                            {error && (
                                <p className="text-red-400 text-xs text-center mt-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                    Stream offline. Try changing stations.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes music-bar {
                    0%, 100% { height: 10px; }
                    50% { height: 30px; }
                }
            `}</style>
        </div>
    );
};
