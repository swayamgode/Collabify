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
        { href: '/brand/create-campaign', label: 'Create Campaign', icon: PlusCircle },
        { href: '/brand/influencers', label: 'Find Influencers', icon: Users },
    ];

    const influencerLinks = [
        { href: '/influencer', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/influencer/analytics', label: 'Analytics', icon: BarChart2 },
        { href: '/influencer/browse', label: 'Browse Campaigns', icon: Search },
        { href: '/influencer/applied', label: 'My Applications', icon: Briefcase },
        { href: '/influencer/earnings', label: 'Earnings', icon: DollarSign },
    ];

    const links = isBrand ? brandLinks : influencerLinks;

    return (
        <aside className="fixed left-4 top-4 bottom-4 z-40 w-24 bg-sidebar border border-white/10 rounded-[32px] transition-transform hidden md:block overflow-hidden shadow-2xl">
            <div className="flex h-full flex-col items-center py-10">
                <Link href="/" className="mb-12 flex items-center justify-center">
                    <span className="text-3xl font-extrabold text-white tracking-widest">F.</span>
                </Link>

                <ul className="space-y-10 flex-1 flex flex-col items-center">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center justify-center p-3 rounded-2xl transition-all duration-300 group relative",
                                        isActive
                                            ? "bg-white text-black shadow-lg scale-110"
                                            : "text-secondary hover:text-white"
                                    )}
                                >
                                    <Icon className={cn("h-6 w-6 transition-all", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                                    {isActive && (
                                        <div className="absolute -right-2 w-1.5 h-1.5 bg-white rounded-full shadow-glow"></div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-auto space-y-8 flex flex-col items-center">
                    <Link href="/settings" className={cn(
                        "p-3 rounded-2xl transition-all hover:bg-white/5 group",
                        pathname === '/settings' ? "bg-white text-black" : "text-secondary"
                    )}>
                        <Settings className="h-6 w-6" />
                    </Link>
                    <button
                        onClick={async () => {
                            await logout();
                        }}
                        className="p-3 rounded-2xl text-secondary hover:text-red-400 transition-all"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </aside>
    );
};
