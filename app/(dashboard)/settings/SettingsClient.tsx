'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, CheckCircle2, AlertCircle, User, Briefcase, Globe, Hash } from 'lucide-react';
import { updateProfile, updateInfluencerDetails, updateBrandDetails } from '@/lib/actions/profiles';

export default function SettingsClient({ data }: { data: any }) {
    const { profile, roleData } = data;
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);
        const result = await updateProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
        }
        setIsLoading(false);
    }

    async function handleRoleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);
        const result = profile.role === 'influencer'
            ? await updateInfluencerDetails(formData)
            : await updateBrandDetails(formData);

        if (result.success) {
            setMessage({ type: 'success', text: `${profile.role === 'influencer' ? 'Influencer' : 'Brand'} details updated!` });
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update details' });
        }
        setIsLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account and profile information.</p>
            </div>

            {message && (
                <div className={`px-4 py-3 rounded-xl flex items-center gap-3 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            <div className="grid gap-8">
                {/* General Profile */}
                <form onSubmit={handleProfileSubmit}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="text-primary" size={20} />
                                <CardTitle>Personal Information</CardTitle>
                            </div>
                            <CardDescription>Update your basic contact and background details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input name="fullName" defaultValue={profile.full_name || ''} placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Bio</label>
                                <textarea
                                    name="bio"
                                    defaultValue={profile.bio || ''}
                                    placeholder="Tell us about yourself..."
                                    className="flex min-h-[100px] w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black transition-all"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input name="website" className="pl-10" defaultValue={profile.website || ''} placeholder="https://example.com" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-white/5 bg-white/[0.02] flex justify-end p-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                                Save Profile
                            </Button>
                        </CardFooter>
                    </Card>
                </form>

                {/* Role Specific Settings */}
                <form onSubmit={handleRoleSubmit}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Briefcase className="text-primary" size={20} />
                                <CardTitle>{profile.role === 'influencer' ? 'Influencer Details' : 'Brand Details'}</CardTitle>
                            </div>
                            <CardDescription>
                                {profile.role === 'influencer'
                                    ? "Configure your social reach and niches."
                                    : "Company details and platform preferences."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {profile.role === 'influencer' ? (
                                <>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Social Handle</label>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input name="socialHandle" className="pl-10" defaultValue={roleData?.social_handle || ''} placeholder="@username" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Follower Count</label>
                                        <Input name="followerCount" type="number" defaultValue={roleData?.follower_count || 0} />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Platforms</label>
                                        <div className="flex flex-wrap gap-4">
                                            {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(p => (
                                                <label key={p} className="flex items-center gap-2 cursor-pointer text-sm">
                                                    <input
                                                        type="checkbox"
                                                        name="platforms"
                                                        value={p}
                                                        defaultChecked={roleData?.platforms?.includes(p)}
                                                        className="rounded border-white/10 bg-white/5"
                                                    />
                                                    {p}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Niches (Multiselect)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Fashion', 'Tech', 'Fitness', 'Food', 'Travel', 'Lifestyle'].map(n => (
                                                <label key={n} className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full cursor-pointer hover:bg-white/10 hover:border-white/10 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        name="niche"
                                                        value={n}
                                                        defaultChecked={roleData?.niche?.includes(n)}
                                                        className="hidden"
                                                    />
                                                    <span className={`text-xs font-medium`}>{n}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Company Name</label>
                                        <Input name="companyName" defaultValue={roleData?.company_name || ''} placeholder="Acme Inc." />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Industry</label>
                                        <Input name="industry" defaultValue={roleData?.industry || ''} placeholder="e.g. Technology, Fashion" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-medium">Preferred Platforms</label>
                                        <div className="flex flex-wrap gap-4">
                                            {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(p => (
                                                <label key={p} className="flex items-center gap-2 cursor-pointer text-sm">
                                                    <input
                                                        type="checkbox"
                                                        name="platforms"
                                                        value={p}
                                                        defaultChecked={roleData?.preferred_platforms?.includes(p)}
                                                        className="rounded border-white/10 bg-white/5"
                                                    />
                                                    {p}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="border-t border-white/5 bg-white/[0.02] flex justify-end p-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                                Update {profile.role === 'influencer' ? 'Influencer' : 'Brand'} Info
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}
