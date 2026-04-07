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
    BarChart2,
    Shield,
    ShoppingBag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { logout } from '@/app/(auth)/actions';
import { Profile } from '@/lib/types/database';

interface SidebarProps {
    user?: Profile | null;
}

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const isBrand = pathname?.includes('/brand');
    const isAdmin = user?.role === 'admin';

    const brandLinks = [
        { href: '/brand', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/brand/campaigns', label: 'Campaigns', icon: Briefcase },
        { href: '/brand/products', label: 'Products', icon: ShoppingBag },
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

    // Add Admin link if user is admin
    if (isAdmin) {
        links.unshift({ href: '/admin', label: 'Admin', icon: Shield });
    }

    return (
        <aside className="fixed left-6 top-6 bottom-6 z-40 w-20 bg-black rounded-[32px] transition-all hidden md:block overflow-hidden shadow-2xl">
            <div className="flex h-full flex-col items-center py-8">
                <Link href="/" className="mb-10 group relative">
                    <motion.div
                        animate={{
                            borderRadius: [
                                "42% 58% 70% 30% / 45% 45% 55% 55%",
                                "70% 30% 46% 54% / 30% 29% 71% 70%",
                                "28% 72% 52% 48% / 51% 72% 28% 49%",
                                "42% 58% 70% 30% / 45% 45% 55% 55%",
                            ]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-12 h-12 bg-black flex items-center justify-center transition-transform duration-500 overflow-hidden"
                    >
                        <img
                            src="/logocollabify.png"
                            alt="Collabify Logo"
                            className="w-8 h-8 object-contain"
                        />
                    </motion.div>
                </Link>

                <nav className="flex-1 flex flex-col items-center space-y-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative flex items-center justify-center w-10 h-10 rounded-[14px] transition-all duration-300 group",
                                    isActive
                                        ? "bg-white text-black shadow-lg"
                                        : "text-neutral-500 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Icon size={18} className={cn("transition-all duration-300", isActive ? "stroke-[2.5px]" : "stroke-[1.5px] group-hover:scale-110")} />
                                <span className={cn(
                                    "absolute left-16 px-2.5 py-1 rounded-lg bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 border border-white/10 whitespace-nowrap z-50 shadow-xl",
                                    isActive && "hidden"
                                )}>
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col items-center space-y-3">
                    <Link href="/settings" className={cn(
                        "relative flex items-center justify-center w-10 h-10 rounded-[14px] transition-all duration-300 group",
                        pathname === '/settings' ? "bg-white text-black shadow-lg" : "text-neutral-500 hover:text-white hover:bg-white/10"
                    )}>
                        <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="absolute left-16 px-2.5 py-1 rounded-lg bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 border border-white/10 whitespace-nowrap z-50 shadow-xl">
                            Settings
                        </span>
                    </Link>
                    <button
                        onClick={async () => {
                            await logout();
                        }}
                        className="relative flex items-center justify-center w-10 h-10 rounded-[14px] text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                    >
                        <LogOut size={18} />
                        <span className="absolute left-16 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
