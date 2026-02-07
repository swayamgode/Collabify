'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Instagram, Youtube, Twitter, Star } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
    {
        id: '1',
        brand: 'LuxFit Wear',
        title: 'Yoga Essentials Promotion',
        category: 'Fitness',
        budget: '$300 - $800',
        platform: 'Instagram',
        followers: '5k+',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: '2',
        brand: 'TechGadget Co',
        title: 'New Smartwatch Review',
        category: 'Technology',
        budget: '$1,200',
        platform: 'YouTube',
        followers: '20k+',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
    },
    {
        id: '3',
        brand: 'FreshBites',
        title: 'Healthy Meal Prep Challenge',
        category: 'Food & Drink',
        budget: '$500+',
        platform: 'TikTok',
        followers: '10k+',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=60',
    },
];

export default function BrowseCampaignsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Explore Campaigns</h1>
                <p className="text-gray-500">Find the perfect brands to collaborate with.</p>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-10" placeholder="Search by brand, category, or keyword..." />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter size={18} />
                    Filters
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <div className="h-48 w-full overflow-hidden bg-gray-100">
                            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{campaign.brand}</p>
                                    <CardTitle className="mt-1">{campaign.title}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {campaign.category}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                    {campaign.platform}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-1">
                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                    {campaign.followers} followers
                                </span>
                                <span className="font-bold text-black">{campaign.budget}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4 flex gap-2">
                            <Button variant="outline" className="flex-1">Details</Button>
                            <Button className="flex-1">Apply Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
