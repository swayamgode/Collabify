"use client";

import { motion } from 'framer-motion';
import {
    Plus, Briefcase, Users, DollarSign,
    TrendingUp, Zap, Target, BarChart3, Sparkles,
    ChevronRight, ArrowUpRight, Star, Activity,
} from 'lucide-react';
import Link from 'next/link';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
} as any;

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as any;

export function BrandDashboardClient({ stats, activity, profileData }: any) {
    return (
        <motion.div 
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-4 max-w-6xl mx-auto pb-8"
        >
            {/* ── Dynamic Page Header ── */}
            <motion.div variants={item} className="relative overflow-hidden rounded-xl bg-black p-6 text-white shadow-xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
                            Welcome back
                        </h1>
                        <p className="text-white/60 font-medium text-sm">
                            Here's what's happening with your campaigns today.
                        </p>
                    </div>
                    <Link href="/brand/create-campaign">
                        <button className="inline-flex items-center gap-2 h-10 px-5 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition-all active:scale-95">
                            <Plus size={16} strokeWidth={2.5} />
                            New Campaign
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        label: 'Active Campaigns',
                        value: stats?.activeCampaigns ?? 0,
                        icon: Briefcase,
                        sub: '+2 this week',
                    },
                    {
                        label: 'Total Applications',
                        value: stats?.totalApps ?? 0,
                        icon: Users,
                        sub: '+12% this month',
                    },
                    {
                        label: 'Budget Deployed',
                        value: `$${stats?.spent?.toLocaleString() ?? '0'}`,
                        icon: DollarSign,
                        sub: 'All-time total',
                    },
                ].map((stat, i) => (
                    <motion.div
                        variants={item}
                        key={i}
                        className="group relative bg-white border border-neutral-200 rounded-xl p-4 overflow-hidden transition-all duration-300 hover:border-black hover:-translate-y-0.5"
                    >
                        <div className="relative z-10 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-neutral-100 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                <stat.icon size={18} strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-extrabold tracking-tight text-black leading-none mb-1 tabular-nums">
                                    {stat.value}
                                </p>
                                <p className="text-xs font-semibold text-neutral-500">{stat.sub}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* ── Left col (2/3) ── */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Activity Feed */}
                    <motion.div variants={item} className="bg-white rounded-xl border border-neutral-200 p-4">
                        <ActivityFeed items={activity} role="brand" />
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={item}>
                        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 px-1">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Find Influencers */}
                            <Link href="/brand/influencers">
                                <div className="group relative bg-black rounded-xl p-5 overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center mb-3">
                                            <Target size={18} className="text-white" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1">Find Influencers</h3>
                                        <p className="text-neutral-400 text-xs font-medium leading-relaxed mb-4">
                                            Discover verified creators that match your style.
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 group-hover:text-white transition-colors">
                                            Browse talent <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Manage Campaigns */}
                            <Link href="/brand/campaigns">
                                <div className="group relative bg-white border border-neutral-200 rounded-xl p-5 overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:border-black shadow-sm hover:shadow-md">
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                                            <BarChart3 size={18} className="text-black group-hover:text-white transition-colors" strokeWidth={2} />
                                        </div>
                                        <h3 className="font-bold text-lg mb-1 text-black">
                                            Manage Campaigns
                                        </h3>
                                        <p className="text-neutral-500 text-xs font-medium leading-relaxed mb-4">
                                            Review applications, track deliverables, and analyze metrics.
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 group-hover:text-black transition-colors">
                                            View all <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </motion.div>
                </div>

                {/* ── Right Sidebar (1/3) ── */}
                <div className="space-y-4">

                    {/* AI Insights */}
                    <motion.div variants={item} className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-black transition-colors">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-black" />
                                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">AI Insights</span>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            {/* Trending insight */}
                            <div className="relative overflow-hidden border border-neutral-200 rounded-lg p-4 group cursor-pointer hover:border-black transition-colors">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp size={12} className="text-black" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Trending Now</span>
                                    </div>
                                    <p className="text-black font-bold text-sm leading-snug mb-1">
                                        Authenticity-led content
                                    </p>
                                    <p className="text-neutral-500 text-xs font-medium leading-relaxed">
                                        Audiences engage{' '}
                                        <span className="text-black font-bold">40% more</span>
                                        {' '}with "day in the life" styles this week.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Tip */}
                            <div className="flex items-start gap-3 bg-neutral-50 rounded-lg p-4 border border-neutral-100 group">
                                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                                    <Zap size={14} className="text-black" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-black mb-0.5">Quick Win</p>
                                    <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                                        Add lifestyle CTAs to campaign briefs to boost engagement rates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rising Talent */}
                    <motion.div variants={item} className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-black transition-colors">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Rising Talent</span>
                            <Link href="/brand/influencers">
                                <span className="text-[10px] font-bold text-black hover:text-neutral-600 transition-colors flex items-center gap-1">
                                    Top 1% <ChevronRight size={12} />
                                </span>
                            </Link>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {[
                                { name: 'TechReviewer_99', niche: 'Tech', followers: '105K', score: 94 },
                                { name: 'SarahVlogs', niche: 'Lifestyle', followers: '450K', score: 98 },
                                { name: 'FitWithAlex', niche: 'Fitness', followers: '218K', score: 87 },
                            ].map((creator, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors cursor-pointer"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shadow-sm">
                                            <span className="text-xs font-bold text-neutral-600">
                                                {creator.name[0]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-black truncate leading-none mb-1 group-hover:text-neutral-700 transition-colors">
                                            {creator.name}
                                        </p>
                                        <p className="text-[10px] text-neutral-500 font-medium">
                                            {creator.niche} <span className="mx-0.5 opacity-50">&bull;</span> {creator.followers}
                                        </p>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <p className="text-[10px] font-bold text-black mb-1">{creator.score}% Match</p>
                                        <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-black rounded-full"
                                                style={{ width: `${creator.score}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Performance Snapshot */}
                    <motion.div variants={item} className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-black transition-colors">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Performance</span>
                            <span className="px-2 py-0.5 bg-neutral-100 text-black font-bold text-[8px] rounded uppercase tracking-widest">This Month</span>
                        </div>

                        <div className="p-4 space-y-4">
                            {[
                                { label: 'Reach', pct: 88 },
                                { label: 'Engagement', pct: 64 },
                                { label: 'Conversions', pct: 42 },
                            ].map((m, i) => (
                                <div key={i} className="group cursor-default">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-xs font-bold text-neutral-600 group-hover:text-black transition-colors">{m.label}</span>
                                        <span className="text-xs font-extrabold text-black">{m.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-black rounded-full origin-left group-hover:scale-x-105 transition-transform duration-500"
                                            style={{ width: `${m.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2">
                                <Link href="/brand/campaigns">
                                    <div className="flex items-center justify-center gap-1.5 py-2 mt-1 rounded-lg border border-neutral-200 hover:border-black text-xs font-bold text-black transition-colors cursor-pointer group">
                                        <Activity size={14} className="group-hover:scale-110 transition-transform" />
                                        View full analytics
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}
