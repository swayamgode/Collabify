import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Briefcase, Users, DollarSign, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getBrandStats } from '@/lib/actions/stats';
import { getBrandActivity } from '@/lib/actions/activity';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { cn } from '@/lib/utils';

export default async function BrandDashboardPage() {
    const stats = await getBrandStats();
    const activity = await getBrandActivity();

    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Hero Heading */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-gradient-premium">Dashboard Overview</h2>
                    <p className="text-gray-500 font-medium mt-2">Scale your reach with real-time intelligence.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <Button size="lg" className="h-14 px-10 gap-2 shadow-glow hover:-translate-y-1 transition-all">
                        <Plus size={20} />
                        New Campaign
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Active Campaigns', value: stats?.activeCampaigns || 0, icon: Briefcase, color: 'blue', plus: '+2 this week' },
                    { label: 'Total Applications', value: stats?.totalApps || 0, icon: Users, color: 'purple', plus: '+12% month' },
                    { label: 'Budget Deployed', value: `$${stats?.spent?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', plus: 'All-time' }
                ].map((stat, i) => (
                    <Card key={i} className="group border-none shadow-premium hover:shadow-premium-hover card-hover bg-white overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</span>
                            <div className={cn("p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110", {
                                "bg-blue-50 text-blue-600": stat.color === 'blue',
                                "bg-purple-50 text-purple-600": stat.color === 'purple',
                                "bg-green-50 text-green-600": stat.color === 'green',
                            })}>
                                <stat.icon size={18} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-5xl font-bold tracking-tighter mb-4">{stat.value}</div>
                            <div className="flex items-center gap-2">
                                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest", {
                                    "bg-blue-100/50 text-blue-700": stat.color === 'blue',
                                    "bg-purple-100/50 text-purple-700": stat.color === 'purple',
                                    "bg-green-100/50 text-green-700": stat.color === 'green',
                                })}>
                                    {stat.plus}
                                </span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Performance</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="relative group">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        <ActivityFeed items={activity} role="brand" />
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/brand/influencers" className="block group">
                            <Card className="p-8 border-none shadow-premium hover:shadow-premium-hover card-hover group cursor-pointer h-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">Find Influencers</h3>
                                        <p className="text-sm text-gray-500 font-medium">Discover verified talent.</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/brand/campaigns" className="block group">
                            <Card className="p-8 border-none shadow-premium hover:shadow-premium-hover card-hover group cursor-pointer h-full">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-600 transition-colors">Manage Campaigns</h3>
                                        <p className="text-sm text-gray-500 font-medium">Review applications & stats.</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-600 transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Sidebar Content Area */}
                <div className="space-y-8">
                    <Card className="border-none shadow-premium p-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Market Insights</span>
                            </div>
                            <h3 className="text-lg font-bold">AI Recommendations</h3>
                        </div>

                        <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 group">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <TrendingUp size={16} className="text-blue-600" />
                                Trending: Authenticity
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                Audiences are engaging 40% more with "day in the life" content this week. Consider updating your campaign briefs.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Rising Talent</span>
                            <div className="space-y-4">
                                {[
                                    { name: 'TechReviewer_99', niche: 'Tech', followers: '105K' },
                                    { name: 'SarahVlogs', niche: 'Lifestyle', followers: '450K' }
                                ].map((creator, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" />
                                            <div>
                                                <p className="font-bold text-sm">{creator.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{creator.niche} • {creator.followers}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 group-hover:bg-black group-hover:text-white transition-all">View</Button>
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
