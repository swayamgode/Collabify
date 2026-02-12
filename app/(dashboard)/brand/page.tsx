import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Briefcase, Users, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getBrandStats } from '@/lib/actions/stats';

export default async function BrandDashboardPage() {
    const stats = await getBrandStats();

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-end">
                <Link href="/brand/create-campaign">
                    <Button className="gap-2 px-8">
                        <Plus size={18} />
                        New Campaign
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Active Campaigns</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <Briefcase size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{stats?.activeCampaigns || 0}</div>
                        <p className="text-xs text-secondary mt-2">Ready for influencers</p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Total Apps</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <Users size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{stats?.totalApps || 0}</div>
                        <p className="text-xs text-secondary mt-2">Creators wanting to collab</p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Total Spent</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <DollarSign size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">${stats?.spent || 0}</div>
                        <p className="text-xs text-secondary mt-2">Across all collaborations</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks you might want to perform.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/brand/influencers">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl h-14 px-6 border-gray-100 hover:border-black/10 transition-all">
                                Find New Influencers
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/brand/campaigns">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl h-14 px-6 border-gray-100 hover:border-black/10 transition-all">
                                Manage Existing Campaigns
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Insights</CardTitle>
                        <CardDescription>AI-powered suggestions for your brand.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-6 bg-background rounded-[24px] border border-gray-100 space-y-3 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-black/[0.02] rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <p className="text-base font-bold text-foreground">Trending Platform: TikTok</p>
                            <p className="text-sm text-secondary leading-relaxed">Campaigns in the "Tech" niche are seeing 25% more engagement this week. Scale up there!</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
