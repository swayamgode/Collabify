'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Plus, MoreVertical, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
    {
        id: '1',
        title: 'Summer Collection 2024',
        status: 'Active',
        influencers: 12,
        applications: 45,
        budget: '$5,000',
        dueDate: 'July 15, 2024',
    },
    {
        id: '2',
        title: 'Fitness App Launch',
        status: 'Draft',
        influencers: 0,
        applications: 0,
        budget: '$2,500',
        dueDate: 'August 1, 2024',
    },
    {
        id: '3',
        title: 'Eco-Friendly Skincare',
        status: 'Completed',
        influencers: 8,
        applications: 120,
        budget: '$3,800',
        dueDate: 'June 10, 2024',
    },
];

export default function BrandCampaignsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
                    <p className="text-gray-500">Manage and track your influencer campaigns.</p>
                </div>
                <Link href="/brand/create-campaign">
                    <Button className="gap-2">
                        <Plus size={18} />
                        Create Campaign
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="hover:border-gray-300 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle>{campaign.title}</CardTitle>
                                <CardDescription>Due by {campaign.dueDate}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        campaign.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {campaign.status}
                                </span>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical size={16} />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium">{campaign.influencers} Influencers</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium">{campaign.applications} Applications</span>
                                </div>
                                <div className="ml-auto font-semibold">
                                    {campaign.budget}
                                </div>
                                <Link href={`/brand/campaigns/${campaign.id}`}>
                                    <Button variant="outline" size="sm">View Details</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
