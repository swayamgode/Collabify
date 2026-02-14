'use client';

import { Bell, Search, Building2, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Profile } from '@/lib/types/database';

interface TopbarProps {
    user?: Profile | null;
}

export function Topbar({ user }: TopbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isBrand = pathname?.includes('/brand');
    const role = isBrand ? 'Brand' : 'Influencer';

    // Default greeting if user name is missing
    const userName = user?.full_name?.split(' ')[0] || 'Josh';

    const greeting = isBrand
        ? 'Welcome back to your brand dashboard!'
        : 'Ready to find your next collaboration?';

    return (
        <div className="fixed top-6 left-40 right-10 z-30 flex items-start justify-between gap-6 pointer-events-none">
            <div className="flex-1 h-24 bg-white rounded-design shadow-premium border border-gray-100 px-12 flex items-center justify-between overflow-hidden relative pointer-events-auto">
                <div className="z-10 flex items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">Hello {userName}!</h2>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black text-white flex items-center gap-1.5">
                                {isBrand ? <Building2 size={12} /> : <User size={12} />}
                                {role}
                            </span>
                        </div>
                        <p className="text-secondary text-sm font-medium">{greeting}</p>
                    </div>
                </div>
                {/* Subtle illustration placeholder area */}
                <div className="absolute right-10 bottom-0 top-0 flex items-center">
                    <div className="w-24 h-24 bg-background rounded-full absolute -right-8 -bottom-8 opacity-40"></div>
                </div>
            </div>

            <div className="glass px-8 py-4 rounded-design flex items-center gap-8 border-white/40 shadow-premium pointer-events-auto">
                <div className="relative group">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const query = e.currentTarget.value;
                                if (!query) return;
                                const target = isBrand ? '/brand/influencers' : '/influencer/browse';
                                router.push(`${target}?q=${encodeURIComponent(query)}`);
                            }
                        }}
                        className="bg-transparent border-none pl-7 pr-4 py-1 text-sm font-medium focus:ring-0 w-32 focus:w-48 transition-all placeholder:text-secondary"
                    />
                </div>

                <button className="relative p-1 text-secondary hover:text-foreground transition-colors">
                    <Bell size={22} strokeWidth={1.5} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-black rounded-full border-2 border-white"></span>
                </button>

                <div className="h-11 w-11 rounded-full bg-black/5 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:border-black/10 transition-all">
                    {user?.avatar_url ? (
                        <img src={user.avatar_url} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                        <img
                            src={`https://ui-avatars.com/api/?name=${userName}&background=000&color=fff`}
                            alt={userName}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
