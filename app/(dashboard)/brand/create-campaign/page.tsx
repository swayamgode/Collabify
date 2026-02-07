'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateCampaignPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/brand/campaigns">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronLeft size={20} />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaign Details</CardTitle>
                    <CardDescription>Fill in the basic information for your new campaign.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="title">Campaign Title</label>
                        <Input id="title" placeholder="e.g. Summer Collection Launch" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="flex min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe what you want influencers to do..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="budget">Total Budget</label>
                            <Input id="budget" type="number" placeholder="0.00" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="deadline">Deadline</label>
                            <Input id="deadline" type="date" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="platforms">Required Platforms</label>
                        <div className="flex gap-4">
                            {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(platform => (
                                <label key={platform} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span className="text-sm">{platform}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                    <Link href="/brand/campaigns">
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button>Create Campaign</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
