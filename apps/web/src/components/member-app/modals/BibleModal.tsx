"use client";

import { X, Search, ChevronLeft, ChevronRight, Loader2, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BIBLE_BOOKS } from "@/lib/BibleData";
import { toast } from "sonner";

interface BibleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BibleVerse {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
}

interface BibleResponse {
    reference: string;
    verses: BibleVerse[];
    text: string;
    translation_id: string;
    translation_name: string;
    translation_note: string;
}

export const BibleModal = ({ isOpen, onClose }: BibleModalProps) => {
    const [currentBook, setCurrentBook] = useState(BIBLE_BOOKS[0]);
    const [currentChapter, setCurrentChapter] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [bibleData, setBibleData] = useState<BibleResponse | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // For auto-scrolling to top on chapter change
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Reset loop
    useEffect(() => {
        if (!isOpen) {
            // Optional: reset to Genesis 1 on close, or perserve state? Let's preserve for now.
        }
    }, [isOpen]);

    // Fetch Bible Data
    const fetchChapter = async (book: string, chapter: number) => {
        setIsLoading(true);
        try {
            // Clean inputs for URL
            const cleanBook = book.replace(/\s+/g, '+');
            const response = await fetch(`https://bible-api.com/${cleanBook}+${chapter}?translation=kjv`);

            if (!response.ok) {
                throw new Error("Chapter not found");
            }

            const data: BibleResponse = await response.json();
            setBibleData(data);

            // Scroll to top
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }

        } catch (error) {
            console.error("Bible fetch error:", error);
            toast.error("Failed to load chapter. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    // Initial Load & Updates
    useEffect(() => {
        if (isOpen) {
            fetchChapter(currentBook.name, currentChapter);
        }
    }, [isOpen, currentBook, currentChapter]);

    const handleNextChapter = () => {
        if (currentChapter < currentBook.chapters) {
            setCurrentChapter(prev => prev + 1);
        } else {
            // Find next book
            const currentBookIndex = BIBLE_BOOKS.findIndex(b => b.name === currentBook.name);
            if (currentBookIndex < BIBLE_BOOKS.length - 1) {
                const nextBook = BIBLE_BOOKS[currentBookIndex + 1];
                setCurrentBook(nextBook);
                setCurrentChapter(1);
            } else {
                toast.info("You contain reached the end of the Bible.");
            }
        }
    };

    const handlePrevChapter = () => {
        if (currentChapter > 1) {
            setCurrentChapter(prev => prev - 1);
        } else {
            // Find prev book
            const currentBookIndex = BIBLE_BOOKS.findIndex(b => b.name === currentBook.name);
            if (currentBookIndex > 0) {
                const prevBook = BIBLE_BOOKS[currentBookIndex - 1];
                setCurrentBook(prevBook);
                setCurrentChapter(prevBook.chapters);
            }
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // Simple heuristic: Try to parse "Book Chapter" or "Book Chapter:Verse"
        // Since bible-api handles fuzzy matching nicely, we can pass the query directly.
        // However, we want to update our local state (book/chapter) to match what comes back.
        // This is tricky because the API returns standardized names.
        // For simplified implementation: use the query to fetch, then try to map back to our state if possible.

        setIsLoading(true);
        fetch(`https://bible-api.com/${searchQuery}?translation=kjv`)
            .then(res => {
                if (!res.ok) throw new Error("Reference not found");
                return res.json();
            })
            .then((data: BibleResponse) => {
                setBibleData(data);
                // Attempt to sync state (optional, but good UX)
                if (data.verses.length > 0) {
                    const firstVerse = data.verses[0];
                    const matchedBook = BIBLE_BOOKS.find(b => b.name.toLowerCase() === firstVerse.book_name.toLowerCase())
                        || BIBLE_BOOKS.find(b => firstVerse.book_name.toLowerCase().includes(b.name.toLowerCase()));

                    if (matchedBook) {
                        setCurrentBook(matchedBook);
                        setCurrentChapter(firstVerse.chapter);
                    }
                }
                setSearchQuery("");
            })
            .catch(err => {
                toast.error("Could not find that reference.");
            })
            .finally(() => setIsLoading(false));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-2xl h-[95vh] sm:h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col font-serif">

                {/* Header / Controls */}
                <div className="p-4 border-b border-slate-100 flex flex-col gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-sans">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            Bible Reader
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 font-sans">
                        {/* Book Select */}
                        <select
                            value={currentBook.name}
                            onChange={(e) => {
                                const book = BIBLE_BOOKS.find(b => b.name === e.target.value);
                                if (book) {
                                    setCurrentBook(book);
                                    setCurrentChapter(1);
                                }
                            }}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {BIBLE_BOOKS.map(book => (
                                <option key={book.name} value={book.name}>{book.name}</option>
                            ))}
                        </select>

                        {/* Chapter Select */}
                        <select
                            value={currentChapter}
                            onChange={(e) => setCurrentChapter(Number(e.target.value))}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-24"
                        >
                            {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>Ch {num}</option>
                            ))}
                        </select>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Go to (e.g. John 3:16)..."
                                className="bg-transparent text-sm w-full outline-none py-2 placeholder:text-slate-400"
                            />
                        </form>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto relative" ref={scrollContainerRef}>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-30">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        </div>
                    ) : null}

                    <div className="max-w-prose mx-auto p-6 pb-24">
                        {bibleData ? (
                            <>
                                <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-2 font-serif">
                                    {currentBook.name} {currentChapter}
                                </h1>
                                <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-sans mb-8">
                                    King James Version
                                </p>
                                <div className="text-lg leading-relaxed text-slate-700">
                                    {bibleData.verses.map((verse) => (
                                        <span key={verse.verse} className="inline group hover:bg-yellow-50/50 transition-colors">
                                            <span className="text-[10px] align-top text-slate-400 font-sans mr-1 select-none font-bold">
                                                {verse.verse}
                                            </span>
                                            <span dangerouslySetInnerHTML={{ __html: verse.text.replace(/\n/g, '<br/>') }}></span>
                                            {" "}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-12 text-center text-sm text-slate-400 italic">
                                    {bibleData.translation_note}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 text-slate-400">
                                Select a book and chapter to start reading.
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / Navigation */}
                <div className="p-4 border-t border-slate-100 bg-white/90 backdrop-blur flex justify-between items-center font-sans">
                    <button
                        onClick={handlePrevChapter}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors disabled:opacity-50"
                        disabled={currentBook.name === "Genesis" && currentChapter === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                    </button>

                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
                        {currentBook.name} {currentChapter}
                    </span>

                    <button
                        onClick={handleNextChapter}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors disabled:opacity-50"
                        disabled={currentBook.name === "Revelation" && currentChapter === 22}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
