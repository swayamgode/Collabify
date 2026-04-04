"use client";

import { motion } from 'framer-motion';
import {
    Plus, Briefcase, Users, DollarSign,
    TrendingUp, Zap, Target, BarChart3, Sparkles,
    ChevronRight, ArrowUpRight, Star, Activity,
} from 'lucide-react';
import Link from 'next/link';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { VerificationBanner } from '@/components/dashboard/VerificationBanner';
import { cn } from '@/lib/utils';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function BrandDashboardClient({ stats, activity, profileData }: any) {
    return (
        <motion.div 
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* ── Verification Banner ── */}
            <motion.div variants={item}>
                <VerificationBanner status={profileData?.profile?.verification_status ?? 'unverified'} />
            </motion.div>

            {/* ── Dynamic Page Header ── */}
            <motion.div variants={item} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 p-8 sm:p-10 text-white shadow-2xl shadow-violet-500/20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                
                {/* Decorative glowing orbs */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 blur-3xl rounded-full mix-blend-overlay"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/20 blur-3xl rounded-full mix-blend-overlay"></div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                            Welcome back to Collabify
                        </h1>
                        <p className="text-white/80 font-medium text-lg">
                            Here's what's happening with your campaigns today.
                        </p>
                    </div>
                    <Link href="/brand/create-campaign">
                        <button className="inline-flex items-center gap-2 h-12 px-6 bg-white text-violet-900 text-sm font-bold rounded-2xl hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] active:scale-95 group">
                            <Plus size={18} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                            New Campaign
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                    {
                        label: 'Active Campaigns',
                        value: stats?.activeCampaigns ?? 0,
                        icon: Briefcase,
                        sub: '+2 this week',
                        baseColor: 'violet',
                    },
                    {
                        label: 'Total Applications',
                        value: stats?.totalApps ?? 0,
                        icon: Users,
                        sub: '+12% this month',
                        baseColor: 'fuchsia',
                    },
                    {
                        label: 'Budget Deployed',
                        value: `$${stats?.spent?.toLocaleString() ?? '0'}`,
                        icon: DollarSign,
                        sub: 'All-time total',
                        baseColor: 'orange',
                    },
                ].map((stat, i) => (
                    <motion.div
                        variants={item}
                        key={i}
                        className="group relative bg-white border border-black/5 rounded-[2rem] p-6 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
                    >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${stat.baseColor}-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        
                        <div className="relative z-10 flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-${stat.baseColor}-50 text-${stat.baseColor}-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                <stat.icon size={22} strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-black/40 uppercase tracking-wider mb-1.5">{stat.label}</p>
                                <p className="text-3xl font-extrabold tracking-tight text-black leading-none mb-2 tabular-nums">
                                    {stat.value}
                                </p>
                                <p className={`text-sm font-semibold text-${stat.baseColor}-600`}>{stat.sub}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── Left col (2/3) ── */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Activity Feed */}
                    <motion.div variants={item} className="bg-white rounded-[2rem] border border-black/5 p-6 shadow-sm">
                        <ActivityFeed items={activity} role="brand" />
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={item}>
                        <h2 className="text-sm font-bold text-black/40 uppercase tracking-widest mb-4 px-2">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Find Influencers */}
                            <Link href="/brand/influencers">
                                <div className="group relative rounded-[2rem] p-7 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(139,92,246,0.25)] hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors backdrop-blur-md">
                                            <Target size={20} className="text-white" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-white font-extrabold text-xl mb-2">Find Influencers</h3>
                                        <p className="text-white/60 text-sm font-medium leading-relaxed mb-6">
                                            Discover verified creators that perfectly match your brand's unique style.
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                                            Browse talent <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Manage Campaigns */}
                            <Link href="/brand/campaigns">
                                <div className="group relative bg-white border border-black/5 rounded-[2rem] p-7 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-black/10 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center mb-5 group-hover:bg-fuchsia-100 transition-colors">
                                            <BarChart3 size={20} className="text-fuchsia-600" strokeWidth={2} />
                                        </div>
                                        <h3 className="font-extrabold text-xl mb-2 text-black group-hover:text-fuchsia-700 transition-colors">
                                            Manage Campaigns
                                        </h3>
                                        <p className="text-black/50 text-sm font-medium leading-relaxed mb-6">
                                            Review applications, track deliverables, and analyze your campaign metrics.
                                        </p>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-black/30 group-hover:text-fuchsia-600 transition-colors">
                                            View all <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </motion.div>
                </div>

                {/* ── Right Sidebar (1/3) ── */}
                <div className="space-y-6">

                    {/* AI Insights */}
                    <motion.div variants={item} className="bg-white border border-black/5 rounded-[2rem] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                        {/* Card header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.03] bg-gradient-to-r from-transparent via-emerald-50/30 to-transparent">
                            <div className="flex items-center gap-2.5">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-black/50 uppercase tracking-widest">AI Insights</span>
                            </div>
                            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center group cursor-pointer hover:bg-neutral-800 transition-colors">
                                <Sparkles size={14} className="text-white group-hover:rotate-12 transition-transform" />
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Trending insight */}
                            <div className="relative overflow-hidden rounded-2xl p-5 group cursor-pointer">
                                <div className="absolute inset-0 bg-neutral-900 group-hover:bg-black transition-colors" />
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp size={14} className="text-emerald-400" />
                                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">Trending Now</span>
                                    </div>
                                    <p className="text-white font-bold text-base leading-snug mb-2">
                                        Authenticity-led content
                                    </p>
                                    <p className="text-white/60 text-sm font-medium leading-relaxed">
                                        Audiences engage{' '}
                                        <span className="text-emerald-400 font-bold bg-emerald-400/10 px-1 rounded">40% more</span>
                                        {' '}with "day in the life" styles this week.
                                    </p>
                                </div>
                            </div>

                            {/* Quick Tip */}
                            <div className="flex items-start gap-3.5 bg-violet-50/50 rounded-2xl p-5 border border-violet-100/50 hover:bg-violet-50 transition-colors group">
                                <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Zap size={16} className="text-violet-600" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-extrabold text-violet-900 mb-1">Quick Win</p>
                                    <p className="text-sm text-violet-700/80 font-medium leading-relaxed">
                                        Add lifestyle CTAs to campaign briefs to boost engagement rates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rising Talent */}
                    <motion.div variants={item} className="bg-white border border-black/5 rounded-[2rem] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.03]">
                            <span className="text-xs font-bold text-black/50 uppercase tracking-widest">Rising Talent</span>
                            <Link href="/brand/influencers">
                                <span className="text-xs font-bold text-black hover:text-violet-600 transition-colors flex items-center gap-1 group">
                                    Top 1% <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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
                                    className="group flex items-center gap-4 px-6 py-4 hover:bg-neutral-50/80 transition-colors cursor-pointer"
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                            <span className="text-sm font-extrabold text-black/60">
                                                {creator.name[0]}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                            <Star size={8} className="text-white fill-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-extrabold text-black truncate leading-none mb-1.5 group-hover:text-violet-600 transition-colors">
                                            {creator.name}
                                        </p>
                                        <p className="text-xs text-black/40 font-semibold tracking-wide">
                                            {creator.niche} <span className="mx-1 opacity-50">&bull;</span> {creator.followers}
                                        </p>
                                    </div>

                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-extrabold text-emerald-600 mb-1.5">{creator.score}% Match</p>
                                        <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                                                style={{ width: `${creator.score}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Performance Snapshot */}
                    <motion.div variants={item} className="bg-white border border-black/5 rounded-[2rem] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.03]">
                            <span className="text-xs font-bold text-black/50 uppercase tracking-widest">Performance</span>
                            <span className="px-2.5 py-1 bg-black/5 text-black font-bold text-[10px] rounded-full uppercase tracking-widest">This Month</span>
                        </div>

                        <div className="p-6 space-y-5">
                            {[
                                { label: 'Reach', pct: 88, color: 'violet' },
                                { label: 'Engagement', pct: 64, color: 'fuchsia' },
                                { label: 'Conversions', pct: 42, color: 'orange' },
                            ].map((m, i) => (
                                <div key={i} className="group cursor-default">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-black/60 group-hover:text-black transition-colors">{m.label}</span>
                                        <span className="text-sm font-extrabold text-black">{m.pct}%</span>
                                    </div>
                                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${m.color}-500 rounded-full origin-left group-hover:scale-x-105 transition-transform duration-500`}
                                            style={{ width: `${m.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2">
                                <Link href="/brand/campaigns">
                                    <div className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-black/[0.02] hover:bg-black/[0.04] text-sm font-bold text-black/60 hover:text-black transition-all cursor-pointer group">
                                        <Activity size={16} className="group-hover:scale-110 transition-transform" />
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
