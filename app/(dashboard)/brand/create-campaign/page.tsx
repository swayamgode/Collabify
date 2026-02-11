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
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold">Campaign Created!</h2>
                <p className="text-gray-500 text-center">Your campaign has been successfully created and is now active. Redirecting you to your campaigns...</p>
            </div>
        );
    }

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

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                        <CardDescription>Fill in the basic information for your new campaign.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="title">Campaign Title</label>
                            <Input id="title" name="title" placeholder="e.g. Summer Collection Launch" required />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                className="flex min-h-[120px] w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Describe what you want influencers to do..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="budget">Total Budget</label>
                                <Input id="budget" name="budget" type="number" placeholder="0.00" required />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium" htmlFor="deadline">Deadline</label>
                                <Input id="deadline" name="deadline" type="date" required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium" htmlFor="platforms">Required Platforms</label>
                            <div className="flex gap-4">
                                {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(platform => (
                                    <label key={platform} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" name="platforms" value={platform} className="rounded border-gray-300" />
                                        <span className="text-sm">{platform}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                        <Link href="/brand/campaigns">
                            <Button variant="outline" type="button" disabled={isLoading}>Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : 'Create Campaign'}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
