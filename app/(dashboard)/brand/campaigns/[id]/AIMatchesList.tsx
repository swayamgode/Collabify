import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, ExternalLink, Activity, Users, Eye, Play, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getYouTubeChannelStats, type YouTubeStats } from '@/lib/youtube';

interface AIMatch {
    channelName: string;
    channelUrl: string;
    influencerId: string;
    keyStrength: string;
    profileImage: string;
    reasoning: string;
    score: number;
}

interface EnrichedMatch extends AIMatch {
    ytStats: YouTubeStats | null;
}

function formatNumber(n: number): string {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
}

function ScoreRing({ score }: { score: number }) {
    const color = score >= 85 ? 'from-purple-500 to-indigo-600' : score >= 70 ? 'from-blue-500 to-cyan-500' : 'from-amber-500 to-orange-500';
    return (
        <div className="flex flex-col items-end shrink-0">
            <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br ${color}`}>
                {score}%
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">MATCH</span>
        </div>
    );
}

export default async function AIMatchesList({ matches }: { matches: AIMatch[] }) {
    if (!matches || matches.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-purple-500" size={20} />
                        AI Recommendations
                    </CardTitle>
                    <CardDescription>
                        Our AI is currently analyzing influencers to find the perfect matches for your campaign.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[150px] flex items-center justify-center border-t border-dashed rounded-b-xl border-gray-200">
                        <div className="flex flex-col items-center gap-3 text-gray-500">
                            <Activity className="animate-pulse text-purple-400" size={32} />
                            <p className="text-sm">AI matching will appear here automatically after campaign creation.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Sort by score descending
    const sortedMatches = [...matches].sort((a, b) => (b.score || 0) - (a.score || 0));

    // Fetch YouTube stats for all matches in parallel
    const enriched: EnrichedMatch[] = await Promise.all(
        sortedMatches.map(async (match) => {
            const ytStats = match.influencerId ? await getYouTubeChannelStats(match.influencerId) : null;
            return { ...match, ytStats };
        })
    );

    return (
        <Card className="border-purple-100 shadow-md shadow-purple-100/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full -z-10" />
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Sparkles className="text-purple-500" size={20} />
                    AI Recommended Influencers
                </CardTitle>
                <CardDescription>
                    {enriched.length} influencer{enriched.length === 1 ? '' : 's'} matched to your campaign using AI analysis and YouTube channel analytics.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                {enriched.map((match, idx) => {
                    const avatarUrl = match.ytStats?.thumbnails?.high?.url
                        || match.ytStats?.thumbnails?.medium?.url
                        || match.ytStats?.thumbnails?.default?.url
                        || match.profileImage
                        || `https://ui-avatars.com/api/?name=${encodeURIComponent(match.channelName)}&background=f3e8ff&color=7e22ce&size=128`;

                    return (
                        <div key={idx} className="rounded-2xl border border-purple-50 bg-white shadow-sm overflow-hidden">
                            {/* Header Row */}
                            <div className="flex items-start gap-4 p-5">
                                {/* Avatar */}
                                <div className="shrink-0 relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={avatarUrl}
                                        alt={match.channelName}
                                        className="w-16 h-16 rounded-2xl border-2 border-purple-100 object-cover shadow-sm"
                                        referrerPolicy="no-referrer"
                                    />
                                    {/* Rank badge */}
                                    {idx === 0 && (
                                        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow">
                                            #1
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                        <div>
                                            <h4 className="font-black text-gray-900 text-lg leading-tight">
                                                {match.ytStats?.channelName || match.channelName}
                                            </h4>
                                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700">
                                                {match.keyStrength}
                                            </span>
                                        </div>
                                        <ScoreRing score={match.score} />
                                    </div>
                                </div>
                            </div>

                            {/* YouTube Analytics Row */}
                            {match.ytStats && (
                                <div className="grid grid-cols-3 gap-px bg-purple-50 border-t border-purple-50">
                                    <div className="bg-white px-4 py-3 flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1 text-indigo-500">
                                            <Users size={14} />
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Subscribers</span>
                                        </div>
                                        <span className="text-lg font-black text-gray-900">
                                            {formatNumber(match.ytStats.subscriberCount)}
                                        </span>
                                    </div>
                                    <div className="bg-white px-4 py-3 flex flex-col items-center gap-1 border-l border-r border-purple-50">
                                        <div className="flex items-center gap-1 text-blue-500">
                                            <Eye size={14} />
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Total Views</span>
                                        </div>
                                        <span className="text-lg font-black text-gray-900">
                                            {formatNumber(match.ytStats.viewCount)}
                                        </span>
                                    </div>
                                    <div className="bg-white px-4 py-3 flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1 text-red-500">
                                            <Play size={14} />
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Videos</span>
                                        </div>
                                        <span className="text-lg font-black text-gray-900">
                                            {match.ytStats.videoCount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* AI Reasoning */}
                            <div className="px-5 pb-4 pt-3">
                                <p className="text-[13px] text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed italic">
                                    "{match.reasoning}"
                                </p>

                                {/* Action Row */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <TrendingUp size={14} className="text-green-500" />
                                        <span>Avg views/video: <strong>{formatNumber(Math.round((match.ytStats?.viewCount || 0) / Math.max(match.ytStats?.videoCount || 1, 1)))}</strong></span>
                                    </div>
                                    <Link
                                        href={`/brand/influencers/external/${match.influencerId}`}
                                    >
                                        <Button variant="outline" size="sm" className="gap-2 text-purple-700 border-purple-200 hover:bg-purple-50 hover:border-purple-300">
                                            Full Analytics <ExternalLink size={13} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
