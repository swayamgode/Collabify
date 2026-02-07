'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { ChevronLeft, Calendar, DollarSign, Users, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
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

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">Summer Collection 2024</CardTitle>
                                    <CardDescription className="mt-2 text-base">
                                        Join us in promoting our new sustainable summer collection. We're looking for lifestyle and fashion creators.
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
                                        <p className="text-sm font-semibold">July 15, 2024</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-50">
                                        <DollarSign size={18} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Budget</p>
                                        <p className="text-sm font-semibold">$5,000.00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold mb-3">Requirements</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                                    <li>At least 10k followers on Instagram</li>
                                    <li>Focus on high-quality visual content</li>
                                    <li>Past experience with fashion brands preferred</li>
                                    <li>3-4 Story posts and 1 Reel</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Applications (0)</CardTitle>
                            <CardDescription>No applications received yet for this campaign.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px] flex flex-col items-center justify-center border-t">
                            <div className="p-4 rounded-full bg-gray-50 mb-4">
                                <Users size={32} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 text-sm">Applications will appear here once influencers start applying.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Campaign Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Applications</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Approved</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Budget Spent</span>
                                <span className="font-semibold">$0 / $5,000</span>
                            </div>
                            <div className="pt-4 mt-4 border-t">
                                <div className="flex items-center gap-2 text-xs text-amber-600 font-medium">
                                    <Clock size={14} />
                                    <span>32 days left to apply</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
