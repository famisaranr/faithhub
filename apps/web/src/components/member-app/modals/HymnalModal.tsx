"use client";

import { X, Music, Search, Loader2, PlayCircle, Repeat } from "lucide-react";
import { useState, useEffect, useTransition, useRef } from "react";
import { getHymns, type HymnWithRecordings } from "@/actions/hymnal-actions";
import { startTransition } from "react";
// Removed useDebounce import


interface HymnalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HymnalModal = ({ isOpen, onClose }: HymnalModalProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [hymns, setHymns] = useState<HymnWithRecordings[]>([]);
    const [isPending, startTransition] = useTransition();
    const [selectedHymn, setSelectedHymn] = useState<HymnWithRecordings | null>(null);

    const [view, setView] = useState<'search' | 'player'>('search');
    const [isPlaying, setIsPlaying] = useState(false);
    // We'll use a callback ref approach actually, or just a simple ref

    // Simple ref for audio element
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isLooping, setIsLooping] = useState(false);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e: any) => console.error("Playback failed:", e));
        }
    };

    const handleOpenHymn = (hymn: HymnWithRecordings) => {
        setSelectedHymn(hymn);
        setView('player');
        setIsPlaying(false);
    };

    const handleBack = () => {
        setView('search');
        setIsPlaying(false);
    };

    const playNextHymn = () => {
        if (!selectedHymn || hymns.length === 0) return;
        const currentIndex = hymns.findIndex(h => h.hymnId === selectedHymn.hymnId);
        if (currentIndex === -1) return;

        const nextIndex = (currentIndex + 1) % hymns.length;
        setSelectedHymn(hymns[nextIndex]);
        setIsPlaying(true);
    };

    const playPreviousHymn = () => {
        if (!selectedHymn || hymns.length === 0) return;
        const currentIndex = hymns.findIndex(h => h.hymnId === selectedHymn.hymnId);
        if (currentIndex === -1) return;

        const prevIndex = (currentIndex - 1 + hymns.length) % hymns.length;
        setSelectedHymn(hymns[prevIndex]);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isOpen) {
            const timeoutId = setTimeout(() => {
                startTransition(async () => {
                    try {
                        const data = await getHymns(searchTerm);

                        if (!data) {
                            setHymns([]);
                            return;
                        }

                        setHymns(data);
                    } catch (err: any) {
                        console.error("Failed to fetch hymns:", err);
                    }
                });
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [searchTerm, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-lg h-[80vh] sm:h-[700px] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-rose-600 p-4 pt-5 text-white flex justify-between items-center shrink-0 shadow-md z-20">
                    <div className="flex items-center gap-2">
                        {view === 'player' && (
                            <button onClick={handleBack} className="mr-2 hover:bg-white/20 p-1 rounded-full transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        )}
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Music className="w-5 h-5" />
                            {view === 'player' && selectedHymn ? `Hymn #${selectedHymn.number}` : 'SDA Hymnal'}
                            {isPending && <Loader2 className="w-4 h-4 animate-spin text-white/80" />}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {view === 'search' ? (
                    <>
                        {/* Search Bar */}
                        <div className="p-4 border-b bg-slate-50/50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-500/50 transition-shadow"
                                    placeholder="Search by title, number, or lyrics..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto bg-slate-50">
                            <div className="max-w-full">
                                {hymns.length === 0 && !isPending ? (
                                    <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                                        <Music className="w-12 h-12 opacity-20" />
                                        <p>No hymns found</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {hymns.map(hymn => (
                                            <div
                                                key={hymn.hymnId}
                                                onClick={() => setSelectedHymn(hymn)}
                                                className={`p-4 hover:bg-white active:bg-rose-50 cursor-pointer flex gap-4 items-center transition-colors ${selectedHymn?.hymnId === hymn.hymnId ? 'bg-white border-l-4 border-rose-500 pl-3' : ''}`}
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100/50 text-rose-700 font-bold shrink-0 text-sm">
                                                    {hymn.number}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-slate-900 truncate">{hymn.title}</h4>
                                                    <p className="text-xs text-slate-500 truncate">{hymn.key} • {hymn.timeSignature}</p>
                                                </div>
                                                {hymn.recordings.length > 0 && (
                                                    <PlayCircle className="w-5 h-5 text-slate-300" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detail View Preview (Bottom Sheet) */}
                        {selectedHymn && (
                            <div className="bg-white border-t border-slate-200 p-4 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-20 animate-in slide-in-from-bottom-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">#{selectedHymn.number} - {selectedHymn.title}</h4>
                                        <p className="text-sm text-slate-500">{selectedHymn.key} • {selectedHymn.tempoBpm} BPM</p>
                                    </div>
                                    <button onClick={() => setSelectedHymn(null)} className="text-slate-400 hover:text-slate-600">Close</button>
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 italic mb-3 line-clamp-2 border border-slate-100">
                                    {selectedHymn.lyrics.substring(0, 100)}...
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenHymn(selectedHymn)}
                                        className="flex-1 bg-rose-600 text-white font-bold py-2.5 rounded-xl hover:bg-rose-700 active:scale-95 transition-all text-sm shadow-lg shadow-rose-200"
                                    >
                                        Open Hymn
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    // PLAYER VIEW
                    selectedHymn && (
                        <div className="flex flex-col flex-1 min-h-0 bg-white relative">
                            {/* Scrollable Lyrics */}
                            <div className="flex-1 overflow-y-auto bg-slate-50">
                                <div className="min-h-full flex flex-col justify-center p-6 text-center">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedHymn.title}</h2>
                                    <p className="text-sm text-rose-600 font-medium mb-2 uppercase tracking-wider">{selectedHymn.subcategory} • {selectedHymn.key}</p>

                                    {selectedHymn.scriptureRefs && selectedHymn.scriptureRefs.length > 0 && (
                                        <p className="text-xs text-slate-500 mb-8 italic font-serif">
                                            Scripture: {selectedHymn.scriptureRefs.join(", ")}
                                        </p>
                                    )}

                                    <div className="whitespace-pre-wrap font-serif text-lg leading-loose text-slate-700 max-w-md mx-auto">
                                        {selectedHymn.lyrics}
                                    </div>
                                </div>
                            </div>

                            {/* Player Controls - Static Bottom */}
                            <div className="bg-white border-t border-slate-200 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                                {selectedHymn.recordings.length > 0 && selectedHymn.recordings[0].audioUrl ? (
                                    <div className="flex flex-col gap-4">
                                        <audio
                                            ref={audioRef}
                                            src={selectedHymn.recordings[0].audioUrl}
                                            controls={false}
                                            autoPlay={isPlaying}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            onEnded={() => {
                                                if (isLooping) {
                                                    playNextHymn();
                                                } else {
                                                    setIsPlaying(false);
                                                }
                                            }}
                                            onError={(e) => console.error("Audio error:", e.currentTarget.error)}
                                            className="hidden"
                                        />

                                        {/* Progress Bar (Visual Only for now) */}
                                        <div className="h-1 bg-slate-100 rounded-full w-full overflow-hidden">
                                            <div className="h-full bg-rose-500 w-0 animate-[pulse_2s_infinite]"></div>
                                        </div>

                                        <div className="flex items-center justify-center gap-8">
                                            <button
                                                onClick={playPreviousHymn}
                                                className="text-slate-400 hover:text-rose-600 transition-colors p-2"
                                                aria-label="Previous Hymn"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                                            </button>

                                            <button
                                                onClick={handlePlayPause}
                                                className="w-16 h-16 flex items-center justify-center bg-rose-600 text-white rounded-full shadow-xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                {isPlaying ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                )}
                                            </button>

                                            <button
                                                onClick={playNextHymn}
                                                className="text-slate-400 hover:text-rose-600 transition-colors p-2"
                                                aria-label="Next Hymn"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                                            </button>

                                            <button
                                                className={`p-2 rounded-full transition-all ${isLooping ? 'text-rose-600 bg-rose-50' : 'text-slate-300 hover:text-slate-500'}`}
                                                onClick={() => setIsLooping(!isLooping)}
                                                title={isLooping ? "Disable Playlist Loop" : "Enable Playlist Loop"}
                                            >
                                                <Repeat className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-400 text-sm py-4">
                                        No audio recording available
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
