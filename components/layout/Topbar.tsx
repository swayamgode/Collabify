'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function Topbar() {
    return (
        <nav className="fixed top-0 z-30 w-full border-b border-gray-100 bg-white dark:bg-black dark:border-gray-800 pl-64 transition-all">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start max-w-lg w-full">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                                type="text"
                                className="pl-10 w-full bg-gray-50 border-transparent focus:bg-white transition-colors"
                                placeholder="Search campaigns, influencers..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                            {/* Placeholder Avatar */}
                            <img src="https://ui-avatars.com/api/?name=User+Name" alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
