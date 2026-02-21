import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Briefcase, DollarSign, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getInfluencerStats } from '@/lib/actions/stats';
import { getInfluencerActivity } from '@/lib/actions/activity';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export default async function InfluencerDashboardPage() {
    const stats = await getInfluencerStats();
    const activity = await getInfluencerActivity();

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
                    <p className="text-secondary mt-1">Track your growth and manage collaborations.</p>
                </div>
                <Link href="/influencer/browse">
                    <Button className="gap-2 px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                        <Search size={20} />
                        Find Campaigns
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-blue-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Active Applications</CardTitle>
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-sm">
                            <Briefcase size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">{stats?.activeApps || 0}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">Waiting</span>
                            for review
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-green-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Total Earnings</CardTitle>
                        <div className="p-3 bg-green-100 rounded-2xl text-green-600 shadow-sm">
                            <DollarSign size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">${stats?.earnings || 0}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-xs">+15%</span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-amber-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Available Deal</CardTitle>
                        <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shadow-sm">
                            <Star size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">{stats?.newCampaigns || 0}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded text-xs">New</span>
                            opportunities
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Banner */}
            <Link href="/influencer/analytics" className="block group">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-8 shadow-2xl shadow-indigo-200 hover:shadow-indigo-300/60 transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-32 translate-x-24 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-20 group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur">
                                    <TrendingUp size={20} className="text-white" />
                                </div>
                                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Creator Analytics</span>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">View Your Full Analytics Report</h3>
                            <p className="text-indigo-100/80 text-sm max-w-lg leading-relaxed">
                                See your total views, subscribers, average retention, engagement rate, audience demographics,
                                platform breakdown — everything brands need to decide to work with you.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-5">
                                {[
                                    { label: 'Total Reach', val: '2.8M' },
                                    { label: 'Avg Retention', val: '62%' },
                                    { label: 'Engagement', val: '6.8%' },
                                    { label: 'Lifetime Views', val: '185M' },
                                ].map(s => (
                                    <div key={s.label} className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 border border-white/20">
                                        <div className="text-white font-black text-lg">{s.val}</div>
                                        <div className="text-indigo-200 text-xs">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3 bg-white text-indigo-700 font-black px-6 py-3.5 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:-translate-x-1 transition-all">
                            View Analytics
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ActivityFeed items={activity} role="influencer" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/settings" className="block group">
                            <Card className="h-full hover:border-black/20 transition-all cursor-pointer group-hover:shadow-lg">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition-colors">Complete Profile</h3>
                                        <p className="text-secondary text-sm">Boost your visibility to brands.</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-amber-50 transition-colors">
                                        <ArrowRight className="text-gray-400 group-hover:text-amber-600 transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/influencer/browse" className="block group">
                            <Card className="h-full hover:border-black/20 transition-all cursor-pointer group-hover:shadow-lg">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors">View All Campaigns</h3>
                                        <p className="text-secondary text-sm">Find deals that match your niche.</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors">
                                        <ArrowRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp size={20} className="text-purple-600" />
                                Growth Tips
                            </CardTitle>
                            <CardDescription>Maximize your success.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl border border-purple-100 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-24 h-24 bg-purple-200/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <h4 className="font-bold text-purple-900 mb-2">💡 Tip: Media Kits</h4>
                                <p className="text-sm text-purple-800/80 leading-relaxed">
                                    Influencers with a complete media kit linked in their bio get 3x more direct offers.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Top Brands Hiring</h4>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">NI</div>
                                        <div>
                                            <p className="font-bold text-sm">Nike</p>
                                            <p className="text-xs text-secondary">Sports • 5 Campaigns</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8">Apply</Button>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold text-xs">SF</div>
                                        <div>
                                            <p className="font-bold text-sm">Spotify</p>
                                            <p className="text-xs text-secondary">Music • 2 Campaigns</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8">Apply</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
