import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Briefcase, Users, DollarSign, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getBrandStats } from '@/lib/actions/stats';
import { getBrandActivity } from '@/lib/actions/activity';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export default async function BrandDashboardPage() {
    const stats = await getBrandStats();
    const activity = await getBrandActivity();

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-secondary mt-1">Here's what's happening with your campaigns today.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <Button className="gap-2 px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                        <Plus size={20} />
                        New Campaign
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-blue-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Active Campaigns</CardTitle>
                        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shadow-sm">
                            <Briefcase size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">{stats?.activeCampaigns || 0}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-xs">+2 this week</span>
                            Active now
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-purple-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Total Applications</CardTitle>
                        <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shadow-sm">
                            <Users size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">{stats?.totalApps || 0}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-xs">+12%</span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md border-primary/5 bg-gradient-to-br from-white to-green-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Total Budget Spent</CardTitle>
                        <div className="p-3 bg-green-100 rounded-2xl text-green-600 shadow-sm">
                            <DollarSign size={20} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tight text-foreground">${stats?.spent?.toLocaleString() || '0'}</div>
                        <p className="text-sm text-secondary mt-3 flex items-center gap-1.5 font-medium">
                            <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">All time</span>
                            Investment
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ActivityFeed items={activity} role="brand" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/brand/influencers" className="block group">
                            <Card className="h-full hover:border-black/20 transition-all cursor-pointer group-hover:shadow-lg">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">Find Influencers</h3>
                                        <p className="text-secondary text-sm">Discover top talent for your brand.</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                                        <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/brand/campaigns" className="block group">
                            <Card className="h-full hover:border-black/20 transition-all cursor-pointer group-hover:shadow-lg">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">Manage Campaigns</h3>
                                        <p className="text-secondary text-sm">Review applications & stats.</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-purple-50 transition-colors">
                                        <ArrowRight className="text-gray-400 group-hover:text-purple-600 transition-colors" />
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
                                <TrendingUp size={20} className="text-blue-600" />
                                Market Insights
                            </CardTitle>
                            <CardDescription>AI-powered suggestions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-24 h-24 bg-blue-200/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <h4 className="font-bold text-blue-900 mb-2">🔥 Trending: Authenticity</h4>
                                <p className="text-sm text-blue-800/80 leading-relaxed">
                                    Audiences are engaging 40% more with "day in the life" style content this week compared to polished ads.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recommended Channels</h4>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="font-bold text-sm">TechReviewer_99</p>
                                            <p className="text-xs text-secondary">Tech • 105K</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8">View</Button>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="font-bold text-sm">SarahVlogs</p>
                                            <p className="text-xs text-secondary">Lifestyle • 450K</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8">View</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
