'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Instagram, Youtube, Twitter, Star, Mail, Globe, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { searchExternalInfluencers } from '@/lib/actions/influencers';
import { sendConnectionRequest } from '@/lib/actions/connections';
import { toast } from 'sonner';

export default function InfluencerDiscoveryClient({ initialInfluencers }: { initialInfluencers: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('All');
    const [externalInfluencers, setExternalInfluencers] = useState<any[]>([]);
    const [isSearchingExternal, setIsSearchingExternal] = useState(false);
    const [connectingId, setConnectingId] = useState<string | null>(null);

    const filteredInfluencers = initialInfluencers.filter(inf => {
        const matchesSearch = inf.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.social_handle?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesNiche = selectedNiche === 'All' || inf.niche?.includes(selectedNiche);
        return matchesSearch && matchesNiche;
    });

    const handleExternalSearch = async () => {
        if (!searchTerm || searchTerm.length < 3) return;
        setIsSearchingExternal(true);
        try {
            const results = await searchExternalInfluencers(searchTerm);
            setExternalInfluencers(results);
        } catch (error) {
            console.error('External search failed:', error);
        } finally {
            setIsSearchingExternal(false);
        }
    };

    const handleConnect = async (influencer: any) => {
        if (influencer.is_external) {
            toast.success("Invitation sent!", {
                description: `We've invited ${influencer.profiles?.full_name} to join Collabify.`
            });
            return;
        }

        setConnectingId(influencer.id);
        try {
            const result = await sendConnectionRequest(influencer.id);
            if (result.success) {
                toast.success("Request sent!", {
                    description: `Connection request sent to ${influencer.profiles?.full_name}.`
                });
            } else {
                toast.error(result.error || "Failed to send request.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setConnectingId(null);
        }
    };

    const niches = ['All', 'Fashion', 'Fitness', 'Tech', 'Food', 'Lifestyle', 'Travel'];
    const allResults = [...filteredInfluencers, ...externalInfluencers];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Find Influencers</h1>
                    <p className="text-secondary">Discover and connect with top creators for your brand.</p>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-secondary/60" />
                    <Input
                        className="pl-10 h-11 rounded-xl shadow-sm border-gray-100 placeholder:text-secondary/50"
                        placeholder="Search by name or social handle..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleExternalSearch()}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    {niches.map(niche => (
                        <Button
                            key={niche}
                            variant={selectedNiche === niche ? 'primary' : 'outline'}
                            size="sm"
                            className="rounded-full px-4 h-9"
                            onClick={() => setSelectedNiche(niche)}
                        >
                            {niche}
                        </Button>
                    ))}
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 gap-2 shadow-sm border-gray-100"
                        onClick={handleExternalSearch}
                        disabled={isSearchingExternal || searchTerm.length < 3}
                    >
                        {isSearchingExternal ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
                        Search External
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allResults.length === 0 ? (
                    <Card className="col-span-full border-dashed">
                        <CardContent className="p-16 text-center text-secondary">
                            <div className="flex flex-col items-center gap-4">
                                <Search size={48} className="text-gray-200" />
                                <div>
                                    <p className="text-lg font-semibold text-foreground">No influencers found matching your criteria</p>
                                    <p className="text-sm">Try searching for external creators using the "Search External" button.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    allResults.map((inf: any) => (
                        <Card key={inf.id} className={`overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-gray-100/50 group ${inf.is_external ? 'bg-gradient-to-br from-white to-indigo-50/20' : ''}`}>
                            <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 flex items-end justify-center pb-4 relative overflow-hidden">
                                {inf.is_external && (
                                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1 shadow-sm">
                                        <Globe size={10} /> EXTERNAL
                                    </div>
                                )}
                                <div className="h-24 w-24 rounded-3xl border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    {inf.profiles?.avatar_url ? (
                                        <img src={inf.profiles.avatar_url} alt={inf.profiles?.full_name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-3xl font-black text-indigo-200 uppercase">
                                            {inf.profiles?.full_name?.charAt(0) || 'I'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <CardHeader className="text-center pt-8">
                                <CardTitle className="text-xl font-black flex items-center justify-center gap-2">
                                    {inf.profiles?.full_name}
                                    {inf.profiles?.is_verified && (
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white shadow-sm">
                                            <ShieldCheck size={12} strokeWidth={3} />
                                        </div>
                                    )}
                                </CardTitle>
                                <p className="text-sm font-bold text-indigo-600/70">{inf.social_handle}</p>
                            </CardHeader>
                            <CardContent className="flex-1 px-6">
                                <div className="flex justify-center gap-4 mb-6">
                                    {inf.platforms?.includes('Instagram') && <Instagram size={18} className="text-pink-500" />}
                                    {inf.platforms?.includes('YouTube') && <Youtube size={18} className="text-red-500" />}
                                    {inf.platforms?.includes('Twitter') && <Twitter size={18} className="text-blue-400" />}
                                </div>

                                <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                                    {(inf.niche || ['Creator']).map((n: string) => (
                                        <span key={n} className="px-2.5 py-1 rounded-lg bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-secondary border border-gray-100">
                                            {n}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center border-t border-gray-50 pt-6">
                                    <div>
                                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Reach</p>
                                        <p className="text-lg font-black text-foreground">
                                            {inf.follower_count >= 1000000
                                                ? `${(inf.follower_count / 1000000).toFixed(1)}M`
                                                : `${(inf.follower_count / 1000).toFixed(0)}K`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Score</p>
                                        <div className="flex items-center justify-center gap-1 text-lg font-black text-foreground">
                                            {inf.is_external ? 'AI' : '4.8'} <Star size={14} className="fill-amber-400 text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="p-6 border-t border-gray-50 flex gap-3">
                                <Button
                                    className="flex-1 gap-2 rounded-xl h-11 font-bold shadow-lg shadow-primary/10"
                                    onClick={() => handleConnect(inf)}
                                    disabled={connectingId === inf.id}
                                >
                                    {connectingId === inf.id ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                                    {inf.is_external ? 'Invite' : 'Connect'}
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="flex-1 rounded-xl h-11 font-bold border-gray-100"
                                    onClick={() => {
                                        if (inf.is_external) {
                                            window.location.href = `/brand/influencers/external/${inf.id.split('-')[1]}`;
                                        } else {
                                            window.location.href = `/brand/influencers/${inf.id}`;
                                        }
                                    }}
                                >
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
