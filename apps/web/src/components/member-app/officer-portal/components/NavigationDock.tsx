import { Activity, Users, Layers, Briefcase, LogOut, Banknote, Megaphone } from 'lucide-react';

interface NavButtonProps {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavButton = ({ icon: Icon, label, active, onClick }: NavButtonProps) => (
    <button
        onClick={onClick}
        className={`relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 ${active ? '-translate-y-2' : 'opacity-50 hover:opacity-80'}`}
    >
        {active && (
            <div className="absolute -top-3 w-8 h-8 bg-amber-500/30 blur-lg rounded-full"></div>
        )}
        <Icon className={`w-5 h-5 mb-1 ${active ? 'text-white' : 'text-slate-400'}`} />
        <span className={`text-[9px] font-medium tracking-wide ${active ? 'text-white' : 'text-slate-500'}`}>{label}</span>
    </button>
);

export const NavigationDock = ({ view, setView }: { view: string, setView: (v: string) => void }) => {
    return (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-2 pointer-events-none">
            <div className="pointer-events-auto backdrop-blur-2xl bg-[#0A0E17]/90 border border-white/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center px-2 py-2 gap-1">
                <NavButton
                    icon={Activity}
                    label="Home"
                    active={view === 'dashboard'}
                    onClick={() => setView('dashboard')}
                />
                <NavButton
                    icon={Users}
                    label="Shepherd"
                    active={view === 'members'}
                    onClick={() => setView('members')}
                />
                <NavButton
                    icon={Layers}
                    label="Programs"
                    active={view === 'programming'}
                    onClick={() => setView('programming')}
                />
                <NavButton
                    icon={Briefcase}
                    label="Admin"
                    active={view === 'admin'}
                    onClick={() => setView('admin')}
                />
                <NavButton
                    icon={Megaphone}
                    label="Comms"
                    active={view === 'communications'}
                    onClick={() => setView('communications')}
                />
                <NavButton
                    icon={Banknote}
                    label="Finance"
                    active={view === 'treasury'}
                    onClick={() => setView('treasury')}
                />
                <div className="w-[1px] h-8 bg-white/10 mx-1"></div>
                <NavButton
                    icon={LogOut}
                    label="Exit"
                    active={false}
                    onClick={() => setView('login')}
                />
            </div>
        </div>
    );
};
