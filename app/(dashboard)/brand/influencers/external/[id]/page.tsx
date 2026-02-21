import { getYouTubeChannelStats, getYouTubeRecentVideos } from '@/lib/youtube';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Youtube, Users, Eye, Play, Star, TrendingUp, Calendar, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ExternalInfluencerProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id: channelId } = await params;
    const stats = await getYouTubeChannelStats(channelId);
    const videos = await getYouTubeRecentVideos(channelId);

    if (!stats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Youtube className="h-16 w-16 text-red-500 opacity-20" />
                <h2 className="text-2xl font-bold">Channel Not Found</h2>
                <p className="text-muted-foreground text-center">We couldn't fetch details for this YouTube channel.</p>
                <Link href="/brand/influencers">
                    <Button variant="outline">Back to Search</Button>
                </Link>
            </div>
        );
    }

    const formatNumber = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
        if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
        return n.toLocaleString();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            <div className="flex items-center gap-4">
                <Link href="/brand/influencers">
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl">
                        <ChevronLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Channel Analytics</h1>
                    <p className="text-secondary">External creator data from YouTube</p>
                </div>
            </div>

            {/* Profile Header */}
            <Card className="overflow-hidden border-none shadow-premium bg-gradient-to-br from-white to-gray-50/50">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="h-32 w-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden shrink-0">
                            <img src={stats.thumbnails?.high?.url || stats.thumbnails?.medium?.url} alt={stats.channelName} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black mb-2">{stats.channelName}</h2>
                            <p className="text-secondary text-sm max-w-2xl line-clamp-3 mb-4">{stats.description}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-xs flex items-center gap-2 border border-red-100">
                                    <Youtube size={14} /> YouTube Creator
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center gap-2 border border-indigo-100">
                                    <Star size={14} /> High Growth
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold text-secondary uppercase tracking-widest">Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{formatNumber(stats.subscriberCount)}</div>
                        <p className="text-xs text-secondary mt-1 font-medium">Global reach</p>
                    </CardContent>
                </Card>
                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold text-secondary uppercase tracking-widest">Lifetime Views</CardTitle>
                        <Eye className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{formatNumber(stats.viewCount)}</div>
                        <p className="text-xs text-secondary mt-1 font-medium">Total impressions</p>
                    </CardContent>
                </Card>
                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold text-secondary uppercase tracking-widest">Total Videos</CardTitle>
                        <Play className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black">{stats.videoCount}</div>
                        <p className="text-xs text-secondary mt-1 font-medium">Content uploads</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black">Recent Content</h3>
                    <div className="text-xs font-bold text-secondary uppercase tracking-widest">Latest 5 Videos</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((vid) => (
                        <Card key={vid.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                                    {new Date(vid.publishedAt).toLocaleDateString()}
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h4 className="text-sm font-bold leading-tight mb-4 group-hover:text-red-500 transition-colors line-clamp-2 h-10">{vid.title}</h4>
                                <div className="flex items-center gap-4 text-secondary text-xs font-bold">
                                    <div className="flex items-center gap-1"><Eye size={12} /> {formatNumber(vid.viewCount)}</div>
                                    <div className="flex items-center gap-1"><Heart size={12} /> {formatNumber(vid.likeCount)}</div>
                                    <div className="flex items-center gap-1"><MessageCircle size={12} /> {vid.commentCount}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Recruitment CTA */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none text-white p-8 overflow-hidden relative shadow-2xl shadow-indigo-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2">Want to work with this creator?</h3>
                        <p className="text-indigo-100 text-sm max-w-sm">
                            We can reach out to {stats.channelName} on your behalf and invite them to Collabify for your campaign.
                        </p>
                    </div>
                    <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-black h-14 px-10 rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                        Invite to Campaign
                    </Button>
                </div>
            </Card>
        </div>
    );
}
