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
    LogOut
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
        { href: '/influencer/browse', label: 'Browse Campaigns', icon: Search },
        { href: '/influencer/applied', label: 'My Applications', icon: Briefcase },
        { href: '/influencer/earnings', label: 'Earnings', icon: DollarSign },
    ];

    const links = isBrand ? brandLinks : influencerLinks;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-sidebar transition-transform hidden md:block">
            <div className="flex h-full flex-col px-4 py-6">
                <Link href="/" className="mb-10 flex items-center px-2">
                    <span className="self-center whitespace-nowrap text-2xl font-bold text-gradient-primary tracking-tight">Collabify.</span>
                </Link>
                <ul className="space-y-1.5 font-medium flex-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center rounded-xl p-3 group transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                                    <span className="ml-3 text-sm">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-auto border-t border-white/5 pt-6">
                    <ul className="space-y-1.5 font-medium">
                        <li>
                            <Link href="/settings" className={cn(
                                "flex items-center rounded-xl p-3 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200",
                                pathname === '/settings' && "bg-white/5 text-foreground"
                            )}>
                                <Settings className="h-5 w-5" />
                                <span className="ml-3 text-sm">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center rounded-xl p-3 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                            >
                                <LogOut className="h-5 w-5 transition-colors" />
                                <span className="ml-3 text-sm">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}

