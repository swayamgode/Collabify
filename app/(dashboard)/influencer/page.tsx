import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Briefcase, DollarSign, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getInfluencerStats } from '@/lib/actions/stats';
import { getInfluencerActivity } from '@/lib/actions/activity';
import { getProfileData } from '@/lib/actions/profiles';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { VerificationBanner } from '@/components/dashboard/VerificationBanner';
import { cn } from '@/lib/utils';

export default async function InfluencerDashboardPage() {
    // parallelize data fetching to reduce page load time
    const [stats, activity, profileData] = await Promise.all([
        getInfluencerStats(),
        getInfluencerActivity(),
        getProfileData()
    ]);

    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Verification Banner */}
            <VerificationBanner status={profileData?.profile?.verification_status ?? 'unverified'} />

            {/* Heading */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-gradient-premium">Creator Dashboard</h2>
                    <p className="text-gray-500 font-medium mt-2">Manage your growth and monetize your influence.</p>
                </div>
                <Link href="/influencer/browse">
                    <Button size="lg" className="h-14 px-10 gap-2 shadow-glow hover:-translate-y-1 transition-all">
                        <Search size={20} />
                        Find Campaigns
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Active Applications', value: stats?.activeApps || 0, icon: Briefcase, color: 'blue', sub: 'Waiting for review' },
                    { label: 'Total Earnings', value: `$${stats?.earnings || 0}`, icon: DollarSign, color: 'green', sub: '+15% from last month' },
                    { label: 'Available Opportunities', value: stats?.newCampaigns || 0, icon: Star, color: 'amber', sub: 'New campaigns' }
                ].map((stat, i) => (
                    <Card key={i} className="group border-none shadow-premium hover:shadow-premium-hover card-hover bg-white overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</span>
                            <div className={cn("p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110", {
                                "bg-blue-50 text-blue-600": stat.color === 'blue',
                                "bg-green-50 text-green-600": stat.color === 'green',
                                "bg-amber-50 text-amber-600": stat.color === 'amber',
                            })}>
                                <stat.icon size={18} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold tracking-tighter mb-4">{stat.value}</div>
                            <div className="flex items-center gap-2">
                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest", {
                                    "bg-blue-100/50 text-blue-700": stat.color === 'blue',
                                    "bg-green-100/50 text-green-700": stat.color === 'green',
                                    "bg-amber-100/50 text-amber-700": stat.color === 'amber',
                                })}>
                                    {stat.sub}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Analytics Banner */}
            <Link href="/influencer/analytics" className="block group">
                <div className="relative overflow-hidden rounded-[40px] bg-black p-10 shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-32 translate-x-24 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full translate-y-32 group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Advanced Analytics</span>
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">Master your metrics. <br />Grow your brand.</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                                {[
                                    { label: 'Total Reach', val: '2.8M' },
                                    { label: 'Avg Retention', val: '62%' },
                                    { label: 'Engagement', val: '6.8%' },
                                    { label: 'Total Views', val: '185M' },
                                ].map(s => (
                                    <div key={s.label} className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
                                        <div className="text-white font-bold text-xl">{s.val}</div>
                                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3 bg-white text-black font-black px-8 py-5 rounded-full shadow-xl group-hover:bg-gray-100 transition-all text-sm uppercase tracking-widest">
                            View Report
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <div className="relative">
                        <ActivityFeed items={activity} role="influencer" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/settings" className="block group">
                            <Card className="p-8 border-none shadow-premium hover:shadow-premium-hover card-hover group cursor-pointer h-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-amber-600 transition-colors">Complete Profile</h3>
                                        <p className="text-sm text-gray-500 font-medium">Boost your visibility to top-tier brands.</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/influencer/browse" className="block group">
                            <Card className="p-8 border-none shadow-premium hover:shadow-premium-hover card-hover group cursor-pointer h-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-green-600 transition-colors">Browse Campaigns</h3>
                                        <p className="text-sm text-gray-500 font-medium">Explore high-ticket opportunities.</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>

                <div className="space-y-8">
                    <Card className="border-none shadow-premium p-8 space-y-8 h-fit">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Growth Engine</span>
                            </div>
                            <h3 className="text-lg font-bold">Smart Insights</h3>
                        </div>

                        <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <TrendingUp size={16} className="text-purple-600" />
                                Pro Tip: Media Kits
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                Creators with a complete media kit get 3x more direct offers. Use our builder to generate one instantly.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">High-Growth Brands</span>
                            <div className="space-y-4">
                                {[
                                    { name: 'Nike', niche: 'Sports', campaigns: '5 Campaigns', color: 'bg-black text-white' },
                                    { name: 'Spotify', niche: 'Music', campaigns: '2 Campaigns', color: 'bg-green-600 text-white' }
                                ].map((brand, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs", brand.color)}>
                                                {brand.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{brand.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{brand.niche} • {brand.campaigns}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 group-hover:bg-black group-hover:text-white transition-all">Apply</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
