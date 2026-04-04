import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChevronLeft, Calendar, DollarSign, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { getCampaignWithApplications } from '@/lib/actions/applications';
import { format } from 'date-fns';
import CampaignApplicationManager from './CampaignApplicationManager';
import AIMatchesList from './AIMatchesList';

export default async function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const campaign = await getCampaignWithApplications(id) as any;

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
            <div className="flex items-center gap-4 mb-2">
                <Link href="/brand/campaigns">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronLeft size={20} />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Campaign Detail</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-10">
                
                {/* --- TOP ROW: Details & Stats --- */}
                <div className="xl:col-span-8">
                    <Card className="h-full">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                                    <CardDescription className="mt-1">
                                        {campaign.description}
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm">Edit Campaign</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 py-3 border-y mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                                        <Calendar size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Deadline</p>
                                        <p className="text-sm font-semibold truncate">
                                            {campaign.deadline ? format(new Date(campaign.deadline), 'MMM d, yyyy') : 'No deadline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-l pl-4">
                                    <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                                        <DollarSign size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Budget</p>
                                        <p className="text-sm font-semibold">${campaign.budget}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border-l pl-4">
                                    <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                                        <Users size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-500">Followers</p>
                                        <p className="text-sm font-semibold">{campaign.minFollowers ? `${campaign.minFollowers.toLocaleString()}+` : 'Any'}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase font-bold text-gray-500 mb-2">Requirements / Location</h4>
                                <div className="text-sm text-gray-700 flex items-center gap-2 mb-2">
                                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md font-medium">{campaign.platforms?.join(', ') || 'Any Platform'}</span>
                                    {campaign.location && (
                                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md font-medium">📍 {campaign.location}</span>
                                    )}
                                </div>
                                {campaign.requirements && campaign.requirements.length > 0 && (
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-1 mt-3">
                                        {campaign.requirements.map((req: string, i: number) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="xl:col-span-4">
                    <Card className="h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Campaign Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Applications Received</span>
                                <span className="font-semibold text-lg">{campaign.applications?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Approved Influencers</span>
                                <span className="font-semibold text-lg">{approvedCount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Budget Allocated</span>
                                <span className="font-semibold text-lg">$0 / ${campaign.budget}</span>
                            </div>
                            <div className="pt-5 mt-5 border-t">
                                <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50 py-2 rounded-lg font-bold border border-green-100">
                                    <CheckCircle size={16} />
                                    <span>Active Campaign</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- BOTTOM ROW: Applications & AI Matches --- */}
                <div className="xl:col-span-6">
                    <div className="h-full bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                        <CampaignApplicationManager
                            applications={campaign.applications || []}
                            campaignId={campaign.id}
                        />
                    </div>
                </div>

                <div className="xl:col-span-6">
                    <div className="h-full bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                        <AIMatchesList matches={campaign.ai_matches || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}
