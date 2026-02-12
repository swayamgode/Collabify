import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Briefcase, DollarSign, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { getInfluencerStats } from '@/lib/actions/stats';

export default async function InfluencerDashboardPage() {
    const stats = await getInfluencerStats();

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-end">
                <Link href="/influencer/browse">
                    <Button className="gap-2 px-8">
                        <Search size={18} />
                        Find Campaigns
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Active Apps</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <Briefcase size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{stats?.activeApps || 0}</div>
                        <p className="text-xs text-secondary mt-2">Waiting for brand review</p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">Earnings</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <DollarSign size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">${stats?.earnings || 0}</div>
                        <p className="text-xs text-secondary mt-2">Cleared and available</p>
                    </CardContent>
                </Card>

                <Card className="hover:scale-[1.02] transition-transform">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-secondary uppercase tracking-widest">New Deals</CardTitle>
                        <div className="p-2 bg-black/5 rounded-xl">
                            <Star size={16} className="text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold tracking-tight">{stats?.newCampaigns || 0}</div>
                        <p className="text-xs text-secondary mt-2">Live deals to explore</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                        <CardDescription>How to grow your Collabify presence.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/settings">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl h-14 px-6 border-gray-100 hover:border-black/10 transition-all">
                                Complete Your Profile
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/influencer/browse">
                            <Button variant="outline" className="w-full justify-between group rounded-2xl h-14 px-6 border-gray-100 hover:border-black/10 transition-all">
                                Apply for More Deals
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                        <div className="p-6 bg-background rounded-[24px] border border-gray-100 space-y-3 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-black/[0.02] rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <p className="text-base font-bold text-foreground">High Engagement Matters</p>
                            <p className="text-sm text-secondary leading-relaxed">Brands prioritize creators with consistent engagement over raw follower counts. Focus on your community!</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
