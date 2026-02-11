import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChevronLeft, Calendar, DollarSign, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { getCampaignWithApplications } from '@/lib/actions/applications';
import { format } from 'date-fns';
import CampaignApplicationManager from './CampaignApplicationManager';

export default async function CampaignDetailsPage({ params }: { params: { id: string } }) {
    const campaign = await getCampaignWithApplications(params.id) as any;

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-bold">Campaign not found</h2>
                <Link href="/brand/campaigns" className="mt-4">
                    <Button>Back to Campaigns</Button>
                </Link>
            </div>
        );
    }

    const approvedCount = campaign.applications?.filter((a: any) => a.status === 'approved').length || 0;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/brand/campaigns">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronLeft size={20} />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Campaign Detail</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{campaign.title}</CardTitle>
                                    <CardDescription className="mt-2 text-base">
                                        {campaign.description}
                                    </CardDescription>
                                </div>
                                <Button variant="outline">Edit Campaign</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 py-4 border-y">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-50">
                                        <Calendar size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Deadline</p>
                                        <p className="text-sm font-semibold">
                                            {campaign.deadline ? format(new Date(campaign.deadline), 'MMM d, yyyy') : 'No deadline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-50">
                                        <DollarSign size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Budget</p>
                                        <p className="text-sm font-semibold">${campaign.budget}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold mb-3">Requirements</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                                    <li>Platform: {campaign.platforms?.join(', ') || 'Any'}</li>
                                    <li>Focus on high-quality visual content</li>
                                    <li>Past experience with similar brands preferred</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <CampaignApplicationManager
                        applications={campaign.applications || []}
                        campaignId={campaign.id}
                    />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Campaign Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Applications</span>
                                <span className="font-semibold">{campaign.applications?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Approved</span>
                                <span className="font-semibold">{approvedCount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Budget Spent</span>
                                <span className="font-semibold">$0 / ${campaign.budget}</span>
                            </div>
                            <div className="pt-4 mt-4 border-t">
                                <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                                    <Clock size={14} />
                                    <span>Active Campaign</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
