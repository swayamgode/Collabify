'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Briefcase,
    Users,
    LayoutDashboard,
    PlusCircle,
    DollarSign,
    Search,
    Settings,
    LogOut,
    BarChart2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/app/(auth)/actions';

export function Sidebar() {
    const pathname = usePathname();
    const isBrand = pathname?.includes('/brand');

    const brandLinks = [
        { href: '/brand', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/brand/campaigns', label: 'Campaigns', icon: Briefcase },
        { href: '/brand/create-campaign', label: 'Create', icon: PlusCircle },
        { href: '/brand/influencers', label: 'Search', icon: Users },
    ];

    const influencerLinks = [
        { href: '/influencer', label: 'Home', icon: LayoutDashboard },
        { href: '/influencer/analytics', label: 'Trends', icon: BarChart2 },
        { href: '/influencer/browse', label: 'Feed', icon: Search },
        { href: '/influencer/applied', label: 'Work', icon: Briefcase },
        { href: '/influencer/earnings', label: 'Payouts', icon: DollarSign },
    ];

    const links = isBrand ? brandLinks : influencerLinks;

    return (
        <aside className="fixed left-6 top-6 bottom-6 z-40 w-24 bg-black rounded-[40px] transition-all hidden md:block overflow-hidden shadow-2xl">
            <div className="flex h-full flex-col items-center py-12">
                <Link href="/" className="mb-14 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                        <span className="text-xl font-black text-black leading-none">C.</span>
                    </div>
                </Link>

                <nav className="flex-1 flex flex-col items-center space-y-6">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative flex flex-col items-center justify-center p-4 rounded-[24px] transition-all duration-500 group",
                                    isActive
                                        ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                        : "text-gray-500 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon size={22} className={cn("transition-all duration-500", isActive ? "stroke-[2.5px]" : "stroke-[1.5px] group-hover:scale-110")} />
                                <span className={cn(
                                    "absolute left-24 px-3 py-1.5 rounded-xl bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-white/10 whitespace-nowrap z-50",
                                    isActive && "hidden"
                                )}>
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col items-center space-y-4">
                    <Link href="/settings" className={cn(
                        "p-4 rounded-[24px] transition-all duration-500 group relative",
                        pathname === '/settings' ? "bg-white text-black" : "text-gray-500 hover:text-white hover:bg-white/5"
                    )}>
                        <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                        <span className="absolute left-24 px-3 py-1.5 rounded-xl bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-white/10 whitespace-nowrap z-50">
                            Settings
                        </span>
                    </Link>
                    <button
                        onClick={async () => {
                            await logout();
                        }}
                        className="p-4 rounded-[24px] text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-500 group relative"
                    >
                        <LogOut size={22} />
                        <span className="absolute left-24 px-3 py-1.5 rounded-xl bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
