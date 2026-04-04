'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ChevronLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { createCampaign } from '@/lib/actions/campaigns';
import { useRouter } from 'next/navigation';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await createCampaign(formData);

            if (result.error) {
                setError(result.error);
                setIsLoading(false);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/brand/campaigns');
                }, 1500);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <h2 className="text-2xl font-bold">Campaign Created!</h2>
                <p className="text-muted-foreground text-center">Your campaign has been successfully created and is now active. Redirecting you to your campaigns...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-10">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/brand/campaigns">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-full">
                        <ChevronLeft size={16} />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Create Campaign</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-4">
                        <CardTitle className="text-lg">Campaign Configuration</CardTitle>
                        <CardDescription>Launch your new initiative by filling out all details below.</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
                            
                            {/* Column 1: Core Details */}
                            <div className="md:col-span-4 space-y-5">
                                <div>
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Core Identifiers</h3>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <label className="text-xs font-semibold" htmlFor="title">Campaign Title</label>
                                            <Input id="title" name="title" placeholder="e.g. Summer Collection Launch" required className="h-9 text-sm" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label className="text-xs font-semibold" htmlFor="description">Description & Goals</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                required
                                                className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all resize-none"
                                                placeholder="What is the main objective? Describe what you want influencers to produce..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Logistics & Budget */}
                            <div className="md:col-span-4 space-y-5">
                                <div>
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Logistics & Constraints</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label className="text-xs font-semibold" htmlFor="budget">Budget ($)</label>
                                                <Input id="budget" name="budget" type="number" placeholder="0.00" required className="h-9 text-sm" />
                                            </div>
                                            <div className="grid gap-2">
                                                <label className="text-xs font-semibold" htmlFor="deadline">Deadline</label>
                                                <Input id="deadline" name="deadline" type="date" required className="h-9 text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <label className="text-xs font-semibold" htmlFor="requirements">Specific Deliverable Logic</label>
                                            <textarea
                                                id="requirements"
                                                name="requirements"
                                                className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all resize-none"
                                                placeholder="Enter specific rules (e.g.&#10;Must include #Collabify hashtag&#10;Video length > 60s&#10;Tag @brand in caption)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Audience & Matchmaking */}
                            <div className="md:col-span-4 space-y-5">
                                <div>
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Creator Matchmaking</h3>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label className="text-xs font-semibold" htmlFor="minFollowers">Min. Followers</label>
                                                <Input id="minFollowers" name="minFollowers" type="number" placeholder="50000" className="h-9 text-sm" />
                                            </div>
                                            <div className="grid gap-2">
                                                <label className="text-xs font-semibold" htmlFor="location">Target Location</label>
                                                <Input id="location" name="location" placeholder="e.g. Vasai, India" className="h-9 text-sm" />
                                            </div>
                                        </div>
                                        
                                        <div className="grid gap-3 pt-2">
                                            <label className="text-xs font-semibold">Preferred Network Integrations</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(platform => (
                                                    <label key={platform} className="flex items-center gap-2 cursor-pointer text-sm font-medium border rounded-md p-2 hover:bg-muted/50 transition-colors">
                                                        <input type="checkbox" name="platforms" value={platform} className="w-3.5 h-3.5 rounded border-input bg-background text-primary" />
                                                        <span className="text-xs">{platform}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                    
                    <CardFooter className="bg-muted/20 border-t px-6 py-4 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Pressing Launch will trigger the AI matcher based on Location and Keywords.</p>
                        <div className="flex gap-3">
                            <Link href="/brand/campaigns">
                                <Button variant="outline" type="button" disabled={isLoading} className="h-10 px-6">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="h-10 px-8">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Initiating...
                                    </>
                                ) : 'Launch Campaign'}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
