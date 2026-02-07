import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-secondary/80 backdrop-blur-md transition-all duration-300">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-primary/5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                    </svg>
                </div>
                <span className="text-xl font-bold font-serif tracking-wide text-white">
                    BC SDA <span className="text-primary">100</span>
                </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {["Home", "History", "Program", "Venue", "FAQ"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider font-serif"
                    >
                        {item}
                    </Link>
                ))}
                <Button
                    asChild
                    className="font-bold bg-[#B45F06] hover:bg-[#B45F06]/90 text-white border-none rounded-md px-6 tracking-wide"
                >
                    <Link href="#rsvp">RSVP</Link>
                </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </Button>
        </header>
    );
}
