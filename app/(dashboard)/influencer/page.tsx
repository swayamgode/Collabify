import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Briefcase, DollarSign, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getInfluencerStats } from '@/lib/actions/stats';

export default async function InfluencerDashboardPage() {
    const stats = await getInfluencerStats();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Influencer Dashboard</h1>
                    <p className="text-gray-500">Welcome back! Manage your collaborations and earnings.</p>
                </div>
                <Link href="/influencer/browse">
                    <Button className="gap-2">
                        <Search size={18} />
                        Find Campaigns
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Apps</CardTitle>
                        <Briefcase size={16} className="text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.activeApps || 0}</div>
                        <p className="text-xs text-gray-500 mt-1">Waiting for brand review</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <DollarSign size={16} className="text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats?.earnings || 0}</div>
                        <p className="text-xs text-gray-500 mt-1">Cleared and available</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Campaigns</CardTitle>
                        <Star size={16} className="text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.newCampaigns || 0}</div>
                        <p className="text-xs text-gray-500 mt-1">Live deals to explore</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                        <CardDescription>How to grow your Collabify presence.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/settings">
                            <Button variant="outline" className="w-full justify-between group">
                                Complete Your Profile
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/influencer/browse">
                            <Button variant="outline" className="w-full justify-between group">
                                Apply for More Deals
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Platform Tips</CardTitle>
                        <CardDescription>Maximize your collaboration success.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                            <p className="text-sm font-medium">Tip: High Engagement Matters</p>
                            <p className="text-xs text-gray-500">Brands prioritize creators with consistent engagement over raw follower counts.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
