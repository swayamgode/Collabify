'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Instagram, Youtube, Twitter, Star, Mail } from 'lucide-react';

export default function InfluencerDiscoveryClient({ initialInfluencers }: { initialInfluencers: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('All');

    const filteredInfluencers = initialInfluencers.filter(inf => {
        const matchesSearch = inf.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.social_handle?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesNiche = selectedNiche === 'All' || inf.niche?.includes(selectedNiche);
        return matchesSearch && matchesNiche;
    });

    const niches = ['All', 'Fashion', 'Fitness', 'Tech', 'Food', 'Lifestyle', 'Travel'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Find Influencers</h1>
                <p className="text-gray-500">Discover and connect with top creators for your brand.</p>
            </div>

            <div className="flex gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                        className="pl-10"
                        placeholder="Search by name or social handle..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {niches.map(niche => (
                        <Button
                            key={niche}
                            variant={selectedNiche === niche ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedNiche(niche)}
                        >
                            {niche}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInfluencers.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="p-12 text-center text-gray-500">
                            No influencers found matching your criteria.
                        </CardContent>
                    </Card>
                ) : (
                    filteredInfluencers.map((inf) => (
                        <Card key={inf.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                            <div className="h-32 bg-gray-100 flex items-end justify-center pb-4 relative">
                                <div className="h-20 w-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400">
                                    {inf.profiles?.full_name?.charAt(0) || 'I'}
                                </div>
                            </div>
                            <CardHeader className="text-center pt-2">
                                <CardTitle>{inf.profiles?.full_name}</CardTitle>
                                <p className="text-sm text-gray-500">{inf.social_handle}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex justify-center gap-4 mb-4">
                                    {inf.platforms?.includes('Instagram') && <Instagram size={18} className="text-pink-600" />}
                                    {inf.platforms?.includes('YouTube') && <Youtube size={18} className="text-red-600" />}
                                    {inf.platforms?.includes('Twitter') && <Twitter size={18} className="text-blue-400" />}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center mb-4">
                                    {inf.niche?.map((n: string) => (
                                        <span key={n} className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center border-t pt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Followers</p>
                                        <p className="font-bold">{(inf.follower_count / 1000).toFixed(1)}k</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Avg Rating</p>
                                        <div className="flex items-center justify-center gap-1 font-bold">
                                            4.8 <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="p-4 border-t flex gap-2">
                                <Button className="flex-1 gap-2" size="sm">
                                    <Mail size={16} />
                                    Invite
                                </Button>
                                <Button variant="outline" className="flex-1" size="sm">
                                    Profile
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
