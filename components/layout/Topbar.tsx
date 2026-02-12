'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function Topbar() {
    return (
        <nav className="fixed top-0 right-0 left-0 md:left-64 z-30 border-b border-white/5 glass-dark transition-all">
            <div className="px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center justify-start flex-1 max-w-xl">
                        <div className="relative w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                                type="text"
                                className="pl-10 w-full bg-white/5 border-transparent focus:bg-white/10 transition-all rounded-xl text-sm"
                                placeholder="Search campaigns, influencers..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="rounded-xl p-2.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all relative group">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-black"></span>
                        </button>
                        <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden cursor-pointer hover:border-primary/40 transition-all">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=818cf8&color=fff" alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
