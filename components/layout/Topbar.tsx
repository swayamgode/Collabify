'use client';

import { Bell, Search, Building2, User, ShieldCheck } from 'lucide-react';
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
        <div className="fixed top-6 left-40 right-10 z-30 flex items-start justify-end gap-6 pointer-events-none">
            {/* Greeting box removed as per user request for a cleaner design */}

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
