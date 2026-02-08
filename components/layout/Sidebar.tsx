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
        { href: '/brand/campaigns', label: 'Campaigns', icon: Briefcase },
        { href: '/brand/create-campaign', label: 'Create Campaign', icon: PlusCircle },
        { href: '/brand/influencers', label: 'Find Influencers', icon: Users },
    ];

    const influencerLinks = [
        { href: '/influencer/browse', label: 'Browse Campaigns', icon: Search },
        { href: '/influencer/applied', label: 'My Applications', icon: Briefcase },
        { href: '/influencer/earnings', label: 'Earnings', icon: DollarSign },
    ];

    const links = isBrand ? brandLinks : influencerLinks;

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-100 bg-white dark:bg-black dark:border-gray-800 transition-transform">
            <div className="flex h-full flex-col px-3 py-4">
                <Link href="/" className="mb-10 flex items-center pl-2.5">
                    <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">SocialConnector.</span>
                </Link>
                <ul className="space-y-2 font-medium flex-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "flex items-center rounded-lg p-2 group transition-colors",
                                        isActive
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5 transition duration-75", isActive ? "text-white dark:text-black" : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white")} />
                                    <span className="ml-3">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-auto border-t border-gray-100 pt-4 dark:border-gray-700">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/settings" className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                <Settings className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="ml-3">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-red-50 hover:text-red-600 dark:text-white dark:hover:bg-red-900/10 group transition-colors"
                            >
                                <LogOut className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-red-600 dark:text-gray-400" />
                                <span className="ml-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}

