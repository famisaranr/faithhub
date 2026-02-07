import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

export const GlassPanel = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={cn(
      "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);

export const Badge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "Active": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "On Duty": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Away": "bg-slate-500/20 text-slate-300 border-slate-500/30",
    "Checking In": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Low": "bg-red-500/20 text-red-300 border-red-500/30",
    "Good": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Planning": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Approved": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Ok": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Ready": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  };
  const style = colors[status] || colors["Active"];

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${style} backdrop-blur-md`}>
      {status}
    </span>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  delay: number;
  isTextValue?: boolean;
}

export const MetricCard = ({ title, value, trend, icon: Icon, delay, isTextValue }: MetricCardProps) => (
  <GlassPanel className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group hover:bg-white/10 cursor-pointer">
    <div className={`absolute top-0 right-0 p-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl -mr-10 -mt-10 transition-opacity duration-700 opacity-50 group-hover:opacity-100`}></div>

    <div className="flex justify-between items-start z-10">
      <span className="text-slate-400 text-sm uppercase tracking-wider font-medium">{title}</span>
      <Icon className="text-amber-400/80 w-5 h-5" />
    </div>

    <div className="z-10 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both" style={{ animationDelay: `${delay}ms` }}>
      <h3 className={cn("font-serif text-white font-medium", isTextValue ? "text-xl mt-2" : "text-3xl")}>{value}</h3>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-emerald-400 text-xs font-bold">{trend}</span>
        {!isTextValue && <span className="text-slate-500 text-xs">vs last Sabbath</span>}
      </div>
    </div>
  </GlassPanel>
);

export const ProgressBar = ({ percentage, colorClass = "bg-emerald-500" }: { percentage: number, colorClass?: string }) => (
  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
    <div className={cn("h-full transition-all duration-1000", percentage < 30 ? 'bg-red-500' : colorClass)} style={{ width: `${percentage}%` }}></div>
  </div>
);
