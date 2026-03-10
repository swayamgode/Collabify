import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Plus, Briefcase, Users, DollarSign, ArrowRight,
    TrendingUp, Zap, Target, BarChart3, Sparkles,
    ChevronRight, Activity, Star
} from 'lucide-react';
import Link from 'next/link';
import { getBrandStats } from '@/lib/actions/stats';
import { getBrandActivity } from '@/lib/actions/activity';
import { getProfileData } from '@/lib/actions/profiles';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { VerificationBanner } from '@/components/dashboard/VerificationBanner';
import { cn } from '@/lib/utils';

export default async function BrandDashboardPage() {
    const [stats, activity, profileData] = await Promise.all([
        getBrandStats(),
        getBrandActivity(),
        getProfileData()
    ]);

    const statCards = [
        {
            label: 'Active Campaigns',
            value: stats?.activeCampaigns || 0,
            icon: Briefcase,
            badge: '+2 this week',
            badgeColor: 'text-emerald-600 bg-emerald-50',
            iconBg: 'bg-black text-white',
            trend: '+18%',
            trendPos: true,
        },
        {
            label: 'Total Applications',
            value: stats?.totalApps || 0,
            icon: Users,
            badge: '+12% month',
            badgeColor: 'text-violet-600 bg-violet-50',
            iconBg: 'bg-violet-600 text-white',
            trend: '+12%',
            trendPos: true,
        },
        {
            label: 'Budget Deployed',
            value: `$${stats?.spent?.toLocaleString() || '0'}`,
            icon: DollarSign,
            badge: 'All-time',
            badgeColor: 'text-sky-600 bg-sky-50',
            iconBg: 'bg-sky-600 text-white',
            trend: 'Lifetime',
            trendPos: true,
        },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            {/* Verification Banner */}
            <VerificationBanner status={profileData?.profile?.verification_status} />

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Brand Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-[-0.04em] text-foreground">
                        Dashboard <span className="text-gradient-premium">Overview</span>
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">Scale your reach with real-time intelligence.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <Button
                        size="lg"
                        className="h-12 px-8 gap-2 bg-black text-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        New Campaign
                    </Button>
                </Link>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {statCards.map((stat, i) => (
                    <Card
                        key={i}
                        className="group relative bg-white border border-gray-100/80 rounded-[20px] overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    >
                        {/* Subtle top shimmer line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-5">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                                    stat.iconBg
                                )}>
                                    <stat.icon size={18} strokeWidth={2} />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                                    stat.badgeColor
                                )}>
                                    {stat.badge}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
                                <p className="text-4xl font-black tracking-[-0.04em] text-foreground tabular-nums">
                                    {stat.value}
                                </p>
                            </div>

                            {/* Mini bar chart visual */}
                            <div className="mt-4 flex items-end gap-0.5 h-8">
                                {[40, 65, 45, 80, 55, 90, 70].map((h, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-1 rounded-sm opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                        style={{
                                            height: `${h}%`,
                                            backgroundColor: i === 1 ? '#7c3aed' : i === 2 ? '#0284c7' : '#000',
                                            transitionDelay: `${idx * 30}ms`
                                        }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left col: Activity + Quick Actions */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Activity Feed */}
                    <ActivityFeed items={activity} role="brand" />

                    {/* Quick Actions – 2-col grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Find Influencers */}
                        <Link href="/brand/influencers" className="group block">
                            <div className="relative bg-black rounded-[20px] p-7 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
                                {/* bg orb */}
                                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500" />
                                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl" />

                                <div className="relative z-10">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                                        <Target size={20} className="text-white" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg tracking-tight mb-1">Find Influencers</h3>
                                    <p className="text-white/50 text-sm font-medium">Discover verified talent that fits your brand.</p>
                                    <div className="mt-5 flex items-center gap-1.5 text-white/60 group-hover:text-white/90 transition-colors text-xs font-bold uppercase tracking-wider">
                                        Explore
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Manage Campaigns */}
                        <Link href="/brand/campaigns" className="group block">
                            <div className="relative bg-white border border-gray-100 rounded-[20px] p-7 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-violet-500/5 blur-2xl" />

                                <div className="relative z-10">
                                    <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-violet-100 transition-all duration-300">
                                        <BarChart3 size={20} className="text-violet-600" />
                                    </div>
                                    <h3 className="font-bold text-lg tracking-tight mb-1 group-hover:text-violet-600 transition-colors">Manage Campaigns</h3>
                                    <p className="text-gray-400 text-sm font-medium">Review applications &amp; performance stats.</p>
                                    <div className="mt-5 flex items-center gap-1.5 text-gray-400 group-hover:text-violet-600 transition-colors text-xs font-bold uppercase tracking-wider">
                                        View All
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Right col: Insights sidebar */}
                <div className="space-y-5">

                    {/* AI Insights card */}
                    <Card className="border border-gray-100 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                        <div className="p-6 space-y-5">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">AI Insights</span>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                                    <Sparkles size={14} className="text-white" />
                                </div>
                            </div>

                            <h3 className="font-black text-lg tracking-tight -mt-1">Market Intelligence</h3>

                            {/* Insight block */}
                            <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/15 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp size={14} className="text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Trending</span>
                                    </div>
                                    <p className="text-white font-bold text-sm leading-snug mb-2">Authenticity-led content</p>
                                    <p className="text-white/50 text-xs leading-relaxed">
                                        Audiences engage <span className="text-emerald-400 font-bold">40% more</span> with "day in the life" content this week.
                                    </p>
                                </div>
                            </div>

                            {/* Engagement tip */}
                            <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100/60">
                                <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Zap size={14} className="text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-violet-800 mb-0.5">Quick Win</p>
                                    <p className="text-xs text-violet-600/80 leading-relaxed font-medium">Update your campaign briefs to include lifestyle-oriented CTAs to boost engagement.</p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 mx-6" />

                        {/* Rising Talent */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">Rising Talent</span>
                                <Link href="/brand/influencers">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-black hover:text-gray-500 transition-colors flex items-center gap-1">
                                        See all <ChevronRight size={10} />
                                    </span>
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: 'TechReviewer_99', niche: 'Tech', followers: '105K', score: 94 },
                                    { name: 'SarahVlogs', niche: 'Lifestyle', followers: '450K', score: 98 },
                                ].map((creator, i) => (
                                    <div
                                        key={i}
                                        className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-300 cursor-pointer"
                                    >
                                        {/* Avatar with gradient ring */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 border border-gray-100 flex items-center justify-center">
                                                <span className="text-xs font-black text-gray-500">
                                                    {creator.name[0]}
                                                </span>
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                                <Star size={8} className="text-white fill-white" />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{creator.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                {creator.niche} · {creator.followers}
                                            </p>
                                        </div>

                                        {/* Match score */}
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[10px] font-black text-emerald-600">{creator.score}%</span>
                                            <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                                                    style={{ width: `${creator.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Performance Snapshot card */}
                    <Card className="border border-gray-100 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">Performance</span>
                            </div>
                            <h3 className="font-black text-base tracking-tight">This Month</h3>

                            <div className="space-y-3">
                                {[
                                    { label: 'Reach', pct: 74, color: 'bg-black' },
                                    { label: 'Engagement', pct: 58, color: 'bg-violet-500' },
                                    { label: 'Conversions', pct: 42, color: 'bg-sky-500' },
                                ].map((m, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-bold text-gray-600">{m.label}</span>
                                            <span className="text-xs font-black text-gray-900">{m.pct}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full transition-all duration-1000", m.color)}
                                                style={{ width: `${m.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/brand/campaigns">
                                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black transition-colors group cursor-pointer">
                                    <Activity size={12} />
                                    View full analytics
                                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
