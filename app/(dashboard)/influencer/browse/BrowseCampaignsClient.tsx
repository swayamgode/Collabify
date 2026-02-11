'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { applyToCampaign } from '@/lib/actions/applications';

interface CampaignWithBrand {
    id: string;
    title: string;
    description?: string;
    budget?: number;
    deadline?: string;
    brands: {
        company_name: string;
    };
}

export default function BrowseCampaignsClient({ initialCampaigns }: { initialCampaigns: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [applyingId, setApplyingId] = useState<string | null>(null);
    const [appliedIds, setAppliedIds] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [showApplyModal, setShowApplyModal] = useState<string | null>(null);

    const filteredCampaigns = initialCampaigns.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.brands?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleApply(campaignId: string) {
        setApplyingId(campaignId);
        try {
            const result = await applyToCampaign(campaignId, message || 'I am interested in this collaboration!');
            if (result.success) {
                setAppliedIds([...appliedIds, campaignId]);
                setShowApplyModal(null);
                setMessage('');
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert('Failed to apply. Please try again.');
        } finally {
            setApplyingId(null);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Explore Campaigns</h1>
                <p className="text-gray-500">Find the perfect brands to collaborate with.</p>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        className="pl-10"
                        placeholder="Search by brand, category, or keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter size={18} />
                    Filters
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => {
                    const isApplied = appliedIds.includes(campaign.id);

                    return (
                        <Card key={campaign.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                            <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center border-b">
                                <span className="text-gray-400 font-medium">Campaign Image</span>
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {campaign.brands?.company_name || 'Brand'}
                                        </p>
                                        <CardTitle className="mt-1">{campaign.title}</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {campaign.description}
                                </p>
                                <div className="flex items-center justify-between text-sm mt-auto">
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        Verified Brand
                                    </span>
                                    <span className="font-bold text-black">${campaign.budget}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-4 flex gap-2">
                                <Button variant="outline" className="flex-1">Details</Button>
                                {isApplied ? (
                                    <Button disabled className="flex-1 bg-green-50 text-green-700 border-green-100 hover:bg-green-50">
                                        <CheckCircle2 size={16} className="mr-2" />
                                        Applied
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1"
                                        onClick={() => setShowApplyModal(campaign.id)}
                                        disabled={applyingId === campaign.id}
                                    >
                                        {applyingId === campaign.id ? (
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                        ) : 'Apply Now'}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Apply for Campaign</CardTitle>
                            <CardDescription>Tell the brand why you're a good fit for this collaboration.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <textarea
                                className="w-full min-h-[100px] rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Write a short message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 border-t p-4">
                            <Button variant="ghost" onClick={() => setShowApplyModal(null)}>Cancel</Button>
                            <Button onClick={() => handleApply(showApplyModal)} disabled={applyingId !== null}>
                                {applyingId ? 'Applying...' : 'Submit Application'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
