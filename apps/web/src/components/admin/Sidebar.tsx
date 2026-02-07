import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/events", label: "Events", icon: Calendar },
    { href: "/dashboard/rsvps", label: "RSVP List", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r hidden md:block">
            <div className="p-6">
                <span className="text-2xl font-bold text-primary">FaithHub</span>
            </div>
            <nav className="mt-6 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
