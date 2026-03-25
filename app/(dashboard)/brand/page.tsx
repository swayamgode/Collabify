import { Button } from '@/components/ui/Button';
import {
    Plus, Briefcase, Users, DollarSign,
    TrendingUp, Zap, Target, BarChart3, Sparkles,
    ChevronRight, ArrowUpRight, Star, Activity,
    Clock, CheckCircle2
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

    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* ── Verification Banner ── */}
            <VerificationBanner status={profileData?.profile?.verification_status ?? 'unverified'} />

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black">
                        Dashboard
                    </h1>
                    <p className="text-sm text-black/40 mt-0.5 font-medium">
                        Here's what's happening with your campaigns today.
                    </p>
                </div>
                <Link href="/brand/create-campaign">
                    <button className="inline-flex items-center gap-2 h-10 px-5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/80 transition-colors shadow-sm">
                        <Plus size={16} strokeWidth={2.5} />
                        New Campaign
                    </button>
                </Link>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        label: 'Active Campaigns',
                        value: stats?.activeCampaigns ?? 0,
                        icon: Briefcase,
                        sub: '+2 this week',
                        subColor: 'text-emerald-600',
                        iconColor: 'text-black bg-black/5',
                    },
                    {
                        label: 'Total Applications',
                        value: stats?.totalApps ?? 0,
                        icon: Users,
                        sub: '+12% this month',
                        subColor: 'text-violet-600',
                        iconColor: 'text-violet-600 bg-violet-50',
                    },
                    {
                        label: 'Budget Deployed',
                        value: `$${stats?.spent?.toLocaleString() ?? '0'}`,
                        icon: DollarSign,
                        sub: 'All-time total',
                        subColor: 'text-black/40',
                        iconColor: 'text-blue-600 bg-blue-50',
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white border border-black/[0.07] rounded-2xl p-5 flex items-start gap-4 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                    >
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', stat.iconColor)}>
                            <stat.icon size={18} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-black/40 uppercase tracking-wide mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold tracking-tight text-black leading-none mb-1.5 tabular-nums">
                                {stat.value}
                            </p>
                            <p className={cn('text-xs font-semibold', stat.subColor)}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ── Left col (2/3) ── */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Activity */}
                    <ActivityFeed items={activity} role="brand" />

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-sm font-semibold text-black/40 uppercase tracking-wide mb-3 px-1">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Find Influencers */}
                            <Link href="/brand/influencers">
                                <div className="group relative bg-black rounded-2xl p-6 overflow-hidden cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-neutral-800" />
                                    <div className="relative z-10">
                                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/15 transition-colors">
                                            <Target size={17} className="text-white" strokeWidth={1.75} />
                                        </div>
                                        <h3 className="text-white font-bold text-base mb-1">Find Influencers</h3>
                                        <p className="text-white/40 text-sm font-medium leading-relaxed mb-4">
                                            Discover verified creators that match your brand.
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                                            Browse talent <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Manage Campaigns */}
                            <Link href="/brand/campaigns">
                                <div className="group bg-white border border-black/[0.07] rounded-2xl p-6 overflow-hidden cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-300">
                                    <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                                        <BarChart3 size={17} className="text-violet-600" strokeWidth={1.75} />
                                    </div>
                                    <h3 className="font-bold text-base mb-1 text-black group-hover:text-violet-600 transition-colors">
                                        Manage Campaigns
                                    </h3>
                                    <p className="text-black/40 text-sm font-medium leading-relaxed mb-4">
                                        Review applications and track your campaign stats.
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/30 group-hover:text-violet-600 transition-colors">
                                        View all <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar (1/3) ── */}
                <div className="space-y-4">

                    {/* AI Insights */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                        {/* Card header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">AI Insights</span>
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                                <Sparkles size={12} className="text-white" />
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Trending insight */}
                            <div className="bg-black rounded-xl p-4">
                                <div className="flex items-center gap-1.5 mb-2.5">
                                    <TrendingUp size={12} className="text-emerald-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Trending</span>
                                </div>
                                <p className="text-white font-semibold text-sm leading-snug mb-1.5">
                                    Authenticity-led content
                                </p>
                                <p className="text-white/50 text-xs font-medium leading-relaxed">
                                    Audiences engage{' '}
                                    <span className="text-emerald-400 font-bold">40% more</span>
                                    {' '}with "day in the life" styles this week.
                                </p>
                            </div>

                            {/* Quick Tip */}
                            <div className="flex items-start gap-3 bg-violet-50 rounded-xl p-4 border border-violet-100/50">
                                <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Zap size={13} className="text-violet-600" strokeWidth={1.75} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-violet-800 mb-0.5">Quick Win</p>
                                    <p className="text-xs text-violet-600/70 font-medium leading-relaxed">
                                        Add lifestyle CTAs to campaign briefs to boost engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rising Talent */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                            <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">Rising Talent</span>
                            <Link href="/brand/influencers">
                                <span className="text-xs font-semibold text-black hover:text-black/50 transition-colors flex items-center gap-1">
                                    See all <ChevronRight size={12} />
                                </span>
                            </Link>
                        </div>

                        <div className="divide-y divide-black/[0.04]">
                            {[
                                { name: 'TechReviewer_99', niche: 'Tech', followers: '105K', score: 94 },
                                { name: 'SarahVlogs', niche: 'Lifestyle', followers: '450K', score: 98 },
                                { name: 'FitWithAlex', niche: 'Fitness', followers: '218K', score: 87 },
                            ].map((creator, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center gap-3 px-5 py-3.5 hover:bg-black/[0.02] transition-colors cursor-pointer"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center">
                                            <span className="text-xs font-bold text-black/40">
                                                {creator.name[0]}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <Star size={6} className="text-white fill-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-black truncate leading-none mb-0.5">
                                            {creator.name}
                                        </p>
                                        <p className="text-[11px] text-black/35 font-medium">
                                            {creator.niche} · {creator.followers}
                                        </p>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs font-bold text-emerald-600 mb-1">{creator.score}%</p>
                                        <div className="w-12 h-1 bg-black/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-black rounded-full"
                                                style={{ width: `${creator.score}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Snapshot */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                            <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">Performance</span>
                            <span className="text-[10px] font-semibold text-black/30 uppercase tracking-wide">This Month</span>
                        </div>

                        <div className="p-5 space-y-4">
                            {[
                                { label: 'Reach', pct: 74 },
                                { label: 'Engagement', pct: 58 },
                                { label: 'Conversions', pct: 42 },
                            ].map((m, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs font-semibold text-black/50">{m.label}</span>
                                        <span className="text-xs font-bold text-black">{m.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-black/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-black rounded-full"
                                            style={{ width: `${m.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <Link href="/brand/campaigns">
                                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-black/30 hover:text-black transition-colors cursor-pointer pt-1">
                                    <Activity size={12} />
                                    View full analytics
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
