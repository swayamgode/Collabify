import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Briefcase, Users, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getBrandStats } from '@/lib/actions/stats';

export default async function BrandDashboardPage() {
    const stats = await getBrandStats();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening with your campaigns.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <Button className="gap-2">
                        <Plus size={18} />
                        New Campaign
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Briefcase size={16} className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.activeCampaigns || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Ready for influencers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <Users size={16} className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalApps || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Creators wanting to collab</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <DollarSign size={16} className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats?.spent || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all collaborations</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks you might want to perform.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/brand/influencers">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl">
                                Find New Influencers
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/brand/campaigns">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl">
                                Manage Existing Campaigns
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Insights</CardTitle>
                        <CardDescription>AI-powered suggestions for your brand.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                            <p className="text-sm font-medium text-primary">Trending Platform: TikTok</p>
                            <p className="text-xs text-muted-foreground">Campaigns in the "Tech" niche are seeing 25% more engagement this week.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
