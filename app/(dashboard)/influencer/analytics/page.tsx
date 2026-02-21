import { getInfluencerAnalytics } from '@/lib/actions/analytics';
import {
    Eye, Users, TrendingUp, BarChart2, Star, CheckCircle2,
    Clock, Zap, Award, Globe, Heart, MessageCircle, Share2,
    Play, ExternalLink, ChevronUp, ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Link from 'next/link';

function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toLocaleString();
}

function formatCurrency(n: number): string {
    return `$${n.toLocaleString()}`;
}

// Retro bar that renders with a fill percentage
function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
    const pct = Math.min(100, (value / max) * 100);
    return (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: color }}
            />
        </div>
    );
}

// Donut-style ring progress
function RingProgress({ value, label, color }: { value: number; label: string; color: string }) {
    const circumference = 2 * Math.PI * 36;
    const strokeDash = (value / 100) * circumference;
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#f0f0f2" strokeWidth="7" />
                    <circle
                        cx="40" cy="40" r="36" fill="none"
                        stroke={color}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={`${strokeDash} ${circumference}`}
                        className="transition-all duration-1000"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-foreground">{value}%</span>
                </div>
            </div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{label}</p>
        </div>
    );
}

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
    YouTube: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
    Instagram: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' },
    TikTok: { bg: 'bg-slate-900', text: 'text-white', border: 'border-slate-800' },
};

const platformGradients: Record<string, string> = {
    YouTube: 'from-red-500 to-red-400',
    Instagram: 'from-purple-500 via-pink-500 to-orange-400',
    TikTok: 'from-slate-800 to-teal-500',
};

import { connectYouTube } from '@/lib/actions/youtube';

export default async function InfluencerAnalyticsPage() {
    const data = await getInfluencerAnalytics();

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">

            {/* ─── Header ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">
                            {data.avatar}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-black tracking-tight">{data.name}</h2>
                                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 size={10} />Verified
                                </span>
                            </div>
                            <p className="text-secondary text-sm">{data.handle}</p>
                        </div>
                    </div>
                    <p className="text-secondary text-sm max-w-xl leading-relaxed">{data.bio}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        {data.niche.map(n => (
                            <span key={n} className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full border border-indigo-100">
                                {n}
                            </span>
                        ))}
                        <form action={connectYouTube} className="ml-auto">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full shadow-lg shadow-red-200 transition-all hover:-translate-y-0.5"
                            >
                                <Play size={14} fill="white" />
                                Connect YouTube Account
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                    <div className="flex gap-3 text-center">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-premium px-5 py-3">
                            <div className="text-xl font-black text-indigo-600">{data.collaborationsCompleted}</div>
                            <div className="text-xs text-secondary font-medium mt-0.5">Collabs Done</div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-premium px-5 py-3">
                            <div className="text-xl font-black text-green-600">{data.sponsorshipFulfillmentRate}%</div>
                            <div className="text-xs text-secondary font-medium mt-0.5">Fulfillment</div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-premium px-5 py-3">
                            <div className="text-xl font-black text-amber-600">{data.avgResponseTime}</div>
                            <div className="text-xs text-secondary font-medium mt-0.5">Response</div>
                        </div>
                    </div>

                    {/* Profile score */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-5 py-3 text-white flex items-center justify-between shadow-lg shadow-indigo-200">
                        <div>
                            <div className="text-xs font-semibold opacity-80 uppercase tracking-wider">Creator Score</div>
                            <div className="text-3xl font-black">{data.profileScore}<span className="text-sm font-medium opacity-70">/100</span></div>
                        </div>
                        <Award size={36} className="opacity-80" />
                    </div>
                </div>
            </div>

            {/* ─── Top-level KPIs ─── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                    {
                        label: 'Total Reach',
                        value: formatNumber(data.totalSubscribers),
                        sub: 'across all platforms',
                        icon: Users,
                        color: 'text-indigo-600',
                        bg: 'bg-indigo-50',
                        gradient: 'from-white to-indigo-50/40',
                        trend: '+15.2%',
                        up: true,
                    },
                    {
                        label: 'Lifetime Views',
                        value: formatNumber(data.totalViews),
                        sub: 'total video impressions',
                        icon: Eye,
                        color: 'text-blue-600',
                        bg: 'bg-blue-50',
                        gradient: 'from-white to-blue-50/40',
                        trend: '+22.8%',
                        up: true,
                    },
                    {
                        label: 'Avg Engagement',
                        value: `${data.avgEngagementRate}%`,
                        sub: 'likes + comments / views',
                        icon: Heart,
                        color: 'text-pink-600',
                        bg: 'bg-pink-50',
                        gradient: 'from-white to-pink-50/40',
                        trend: '+3.1%',
                        up: true,
                    },
                    {
                        label: 'Avg Retention',
                        value: `${data.avgRetention}%`,
                        sub: 'of video watch time kept',
                        icon: BarChart2,
                        color: 'text-emerald-600',
                        bg: 'bg-emerald-50',
                        gradient: 'from-white to-emerald-50/40',
                        trend: '-1.2%',
                        up: false,
                    },
                ].map(kpi => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={kpi.label} className={`bg-gradient-to-br ${kpi.gradient} hover:scale-[1.02] transition-transform`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold text-secondary uppercase tracking-widest">
                                    {kpi.label}
                                </CardTitle>
                                <div className={`p-2.5 ${kpi.bg} rounded-xl ${kpi.color}`}>
                                    <Icon size={18} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black tracking-tight text-foreground">{kpi.value}</div>
                                <div className="flex items-center gap-1.5 mt-2">
                                    <span className={`text-xs font-bold flex items-center gap-0.5 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                                        {kpi.up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                        {kpi.trend}
                                    </span>
                                    <span className="text-xs text-secondary">{kpi.sub}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* ─── Platform Breakdown ─── */}
            <div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600"><Zap size={18} /></div>
                    <div>
                        <h3 className="text-lg font-black">Platform Performance</h3>
                        <p className="text-xs text-secondary">Detailed stats per social platform</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.platforms.map(p => {
                        const pt = platformColors[p.platform] ?? { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100' };
                        const grad = platformGradients[p.platform] ?? 'from-gray-600 to-gray-400';
                        return (
                            <Card key={p.platform} className="overflow-hidden">
                                {/* Platform header strip */}
                                <div className={`bg-gradient-to-r ${grad} px-6 py-4 flex items-center justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-black text-sm">
                                            {p.icon}
                                        </div>
                                        <div>
                                            <div className="text-white font-black text-lg">{p.platform}</div>
                                            <div className="text-white/70 text-xs font-medium">{p.postFrequency}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-black text-xl">{formatNumber(p.subscribers)}</div>
                                        <div className="text-white/70 text-xs">followers</div>
                                    </div>
                                </div>

                                <CardContent className="pt-5 space-y-4">
                                    {[
                                        { label: 'Avg Views / Post', value: formatNumber(p.avgViews), icon: Eye, progress: (p.avgViews / 500_000) * 100 },
                                        { label: 'Engagement Rate', value: `${p.engagementRate}%`, icon: Heart, progress: p.engagementRate * 5 },
                                        { label: 'Avg Watch Retention', value: `${p.avgRetention}%`, icon: BarChart2, progress: p.avgRetention },
                                        { label: 'Total Views', value: formatNumber(p.totalViews), icon: Play, progress: (p.totalViews / 130_000_000) * 100 },
                                    ].map(stat => {
                                        const StatIcon = stat.icon;
                                        return (
                                            <div key={stat.label}>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-xs text-secondary font-medium flex items-center gap-1.5">
                                                        <StatIcon size={12} />
                                                        {stat.label}
                                                    </span>
                                                    <span className="text-sm font-black">{stat.value}</span>
                                                </div>
                                                <StatBar value={Math.min(stat.progress, 100)} max={100} color={p.color} />
                                            </div>
                                        );
                                    })}

                                    {/* Growth badge */}
                                    <div className="pt-2 flex items-center justify-between border-t border-gray-50">
                                        <span className="text-xs text-secondary font-medium">30-day Growth</span>
                                        <span className="text-sm font-black text-green-600 flex items-center gap-0.5">
                                            <ChevronUp size={14} />{p.growth}%
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* ─── Monthly Growth Chart (CSS bars) + Audience Demographics ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Monthly Growth */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <TrendingUp size={18} className="text-indigo-600" />
                            6-Month Growth Trend
                        </CardTitle>
                        <CardDescription>Monthly subscriber and view growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Subscribers bar chart */}
                        <div className="space-y-5">
                            <div>
                                <p className="text-xs text-secondary uppercase tracking-wider font-semibold mb-3">Subscribers</p>
                                <div className="flex items-end gap-3 h-28">
                                    {data.monthlyGrowth.map((m, i) => {
                                        const maxSub = Math.max(...data.monthlyGrowth.map(x => x.subscribers));
                                        const h = (m.subscribers / maxSub) * 100;
                                        const isLast = i === data.monthlyGrowth.length - 1;
                                        return (
                                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                                                <div className="relative w-full group cursor-pointer" style={{ height: `${h}%` }}>
                                                    <div
                                                        className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-700 ${isLast ? 'bg-indigo-600' : 'bg-indigo-200'} group-hover:bg-indigo-500`}
                                                        style={{ height: '100%' }}
                                                    />
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {formatNumber(m.subscribers)}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-secondary font-medium">{m.month}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-secondary uppercase tracking-wider font-semibold mb-3">Monthly Views</p>
                                <div className="flex items-end gap-3 h-20">
                                    {data.monthlyGrowth.map((m, i) => {
                                        const maxV = Math.max(...data.monthlyGrowth.map(x => x.views));
                                        const h = (m.views / maxV) * 100;
                                        const isLast = i === data.monthlyGrowth.length - 1;
                                        return (
                                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                                                <div className="relative w-full group cursor-pointer" style={{ height: `${h}%` }}>
                                                    <div
                                                        className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-700 ${isLast ? 'bg-emerald-500' : 'bg-emerald-200'} group-hover:bg-emerald-400`}
                                                        style={{ height: '100%' }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-secondary font-medium">{m.month}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Audience demographics */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Globe size={18} className="text-purple-600" />
                            Audience Insights
                        </CardTitle>
                        <CardDescription>Demographics breakdown</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Gender */}
                        <div>
                            <p className="text-xs text-secondary uppercase tracking-wider font-semibold mb-3">Gender</p>
                            <div className="h-3 rounded-full overflow-hidden flex gap-0.5">
                                {data.audienceGender.map(g => (
                                    <div
                                        key={g.label}
                                        className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-700"
                                        style={{ width: `${g.percentage}%`, backgroundColor: g.color }}
                                        title={`${g.label}: ${g.percentage}%`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                {data.audienceGender.map(g => (
                                    <div key={g.label} className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                                        <span className="text-xs text-secondary">{g.label} {g.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Age */}
                        <div>
                            <p className="text-xs text-secondary uppercase tracking-wider font-semibold mb-3">Age Groups</p>
                            <div className="space-y-2.5">
                                {data.audienceAge.map(a => (
                                    <div key={a.label} className="flex items-center gap-3">
                                        <span className="text-xs text-secondary w-12 shrink-0">{a.label}</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${a.percentage}%`, backgroundColor: a.color }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold w-8 text-right">{a.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Countries */}
                        <div>
                            <p className="text-xs text-secondary uppercase tracking-wider font-semibold mb-3">Top Countries</p>
                            <div className="space-y-2">
                                {data.audienceCountry.map(c => (
                                    <div key={c.label} className="flex items-center justify-between">
                                        <span className="text-xs text-foreground font-medium">{c.label}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-secondary w-8 text-right">{c.percentage}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ─── Three engagement ring metrics ─── */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Star size={18} className="text-amber-500" />
                        Key Performance Rings
                    </CardTitle>
                    <CardDescription>At-a-glance quality metrics that brands care about most</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-4">
                        <RingProgress value={data.avgRetention} label="Avg Retention" color="#6366F1" />
                        <RingProgress value={Math.round(data.avgEngagementRate * 10)} label="Engagement" color="#EC4899" />
                        <RingProgress value={data.sponsorshipFulfillmentRate} label="Fulfillment" color="#10B981" />
                        <RingProgress value={data.profileScore} label="Creator Score" color="#F59E0B" />
                    </div>
                </CardContent>
            </Card>

            {/* ─── Top Performing Content ─── */}
            <div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-amber-100 rounded-xl text-amber-600"><Play size={18} /></div>
                    <div>
                        <h3 className="text-lg font-black">Top Performing Content</h3>
                        <p className="text-xs text-secondary">Best posts by views across all platforms</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data.topContent.map((c, i) => {
                        const pt = platformColors[c.platform] ?? { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100' };
                        const grad = platformGradients[c.platform] ?? 'from-gray-400 to-gray-600';
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-gray-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
                            >
                                {/* Thumbnail */}
                                <div className={`h-20 bg-gradient-to-br ${grad} flex items-center justify-center relative`}>
                                    <Play size={28} className="text-white/80 group-hover:scale-110 transition-transform" />
                                    <div className="absolute top-3 left-3">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${pt.bg} ${pt.text} border ${pt.border}`}>
                                            {c.platform}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className="text-[10px] font-bold text-white/80 bg-black/40 px-2 py-1 rounded-lg">
                                            #{i + 1}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h4 className="text-sm font-bold text-foreground leading-tight line-clamp-2 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {c.title}
                                    </h4>
                                    <div className="flex items-center gap-4 text-secondary">
                                        <span className="flex items-center gap-1 text-xs font-semibold">
                                            <Eye size={11} /> {formatNumber(c.views)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-semibold">
                                            <Heart size={11} /> {formatNumber(c.likes)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-semibold">
                                            <MessageCircle size={11} /> {formatNumber(c.comments)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                        <span className="text-[10px] text-secondary">
                                            {new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <ExternalLink size={12} className="text-secondary group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Sponsorship Rates ─── */}
            <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 border-0 text-white shadow-2xl shadow-indigo-950/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-white">
                        <Share2 size={18} className="text-indigo-400" />
                        Sponsorship Rate Card
                    </CardTitle>
                    <CardDescription className="text-indigo-300/80">
                        Transparent pricing for brand collaborations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Sponsored Post', key: 'sponsored_post', icon: '📸', desc: 'Instagram / TikTok post' },
                            { label: 'Story / Reel', key: 'story_mention', icon: '✨', desc: '24h story / short reel' },
                            { label: 'Dedicated Video', key: 'dedicated_video', icon: '🎬', desc: 'Full YouTube integration' },
                            { label: 'Brand Ambassador', key: 'brand_ambassador', icon: '🚀', desc: 'Monthly partnership deal' },
                        ].map(rate => (
                            <div
                                key={rate.key}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-400/40 group cursor-pointer"
                            >
                                <div className="text-2xl mb-3">{rate.icon}</div>
                                <div className="text-2xl font-black text-white mb-1">
                                    {formatCurrency(data.rates[rate.key as keyof typeof data.rates])}
                                </div>
                                <div className="text-sm font-semibold text-indigo-200">{rate.label}</div>
                                <div className="text-xs text-indigo-300/60 mt-1">{rate.desc}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 pt-5 border-t border-white/10">
                        <div className="flex items-center gap-2 text-indigo-200 text-sm">
                            <CheckCircle2 size={14} className="text-green-400" />
                            Prices are negotiable for long-term partnerships
                        </div>
                        <div className="flex items-center gap-2 text-indigo-200 text-sm">
                            <CheckCircle2 size={14} className="text-green-400" />
                            Custom packages available on request
                        </div>
                        <div className="flex items-center gap-2 text-indigo-200 text-sm">
                            <Clock size={14} className="text-amber-400" />
                            Avg turnaround: 5–7 business days
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ─── CTA for brands ─── */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl shadow-indigo-200">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="text-2xl font-black mb-2">Interested in a collaboration?</h3>
                <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
                    Share your analytics profile with brands. Verified performance data builds trust and lands better deals.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link href="/influencer/browse">
                        <button className="bg-white text-indigo-700 font-black px-6 py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                            Browse Campaigns
                        </button>
                    </Link>
                    <button className="bg-white/20 backdrop-blur border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-all text-sm">
                        Copy Profile Link
                    </button>
                </div>
            </div>
        </div>
    );
}
