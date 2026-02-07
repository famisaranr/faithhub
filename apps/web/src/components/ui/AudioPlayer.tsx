"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAYLIST = [
    "/track1.mp3",
    "/track2.mp3",
    "/track3.mp3"
];

export const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-play next track when current one ends
    const handleEnded = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    // Effect to handle track changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = PLAYLIST[currentTrackIndex];
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-700">
            <audio
                ref={audioRef}
                onEnded={handleEnded}
            // Removed 'loop' attribute because we handle looping via onEnded playlist logic
            />

            <div className="bg-background/80 backdrop-blur-md p-2 rounded-full shadow-xl border border-primary/20 flex gap-1 items-center">
                {/* Track Info (Hidden on mobile, visible on hover/desktop could be nice, but keeping simple for now) */}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="rounded-full hover:bg-gold/20 text-gold h-10 w-10"
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTrack}
                    className="rounded-full hover:bg-gold/20 text-gold h-10 w-10"
                >
                    <SkipForward className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="rounded-full hover:bg-gold/20 text-gold h-10 w-10"
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    );
};
