'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, User, ExternalLink, ShieldCheck } from 'lucide-react';
import { updateVerificationStatus } from '@/lib/actions/admin';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Profile {
    id: string;
    full_name: string | null;
    role: string | null;
    verification_status: string | null;
    updated_at: string | null;
    avatar_url: string | null;
}

interface VerificationListProps {
    initialProfiles: Profile[];
}

export function VerificationList({ initialProfiles }: VerificationListProps) {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [loading, setLoading] = useState<string | null>(null);

    const handleAction = async (userId: string, status: 'verified' | 'rejected', fullName: string) => {
        setLoading(userId);
        try {
            const result = await updateVerificationStatus(userId, status, fullName);
            if (result.success) {
                setProfiles(prev => prev.filter(p => p.id !== userId));
                toast.success(`User ${fullName} ${status === 'verified' ? 'verified' : 'rejected'}`);
            } else {
                toast.error(result.error || 'Failed to update status');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(null);
        }
    };

    if (profiles.length === 0) {
        return (
            <Card className="border-none shadow-premium p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <Check size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">No pending requests</h3>
                        <p className="text-gray-500 font-medium">All catch up! Good job.</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <ShieldCheck className="text-blue-600" size={24} />
                    Pending Verification Requests
                </h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
                    {profiles.length} Total
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {profiles.map((profile) => (
                    <Card key={profile.id} className="border-none shadow-premium bg-white group hover:shadow-premium-hover transition-all overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                                    {profile.avatar_url ? (
                                        <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={24} className="text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg tracking-tight">{profile.full_name || 'Anonymous User'}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest", {
                                            "bg-blue-50 text-blue-600": profile.role === 'brand',
                                            "bg-purple-50 text-purple-600": profile.role === 'influencer'
                                        })}>
                                            {profile.role}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Requested {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'recently'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 ml-auto md:ml-0">
                                <Button
                                    variant="ghost"
                                    className="h-10 text-gray-500 hover:text-red-600 hover:bg-red-50 gap-2 font-bold text-sm"
                                    onClick={() => handleAction(profile.id, 'rejected', profile.full_name || 'User')}
                                    disabled={loading === profile.id}
                                >
                                    <X size={16} />
                                    Reject
                                </Button>
                                <Button
                                    className="h-10 bg-green-600 hover:bg-green-700 text-white gap-2 shadow-glow-green font-bold text-sm"
                                    onClick={() => handleAction(profile.id, 'verified', profile.full_name || 'User')}
                                    disabled={loading === profile.id}
                                >
                                    <Check size={16} />
                                    Verify User
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
