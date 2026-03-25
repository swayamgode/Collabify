'use client'

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { requestVerification } from '@/lib/actions/profiles';
import { toast } from 'sonner';

interface VerificationBannerProps {
    status?: 'unverified' | 'pending' | 'verified' | 'rejected' | string | null;
}

export function VerificationBanner({ status }: VerificationBannerProps) {
    const [loading, setLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleRequest = async () => {
        setLoading(true);
        try {
            const result = await requestVerification();
            if (result.success) {
                setCurrentStatus('pending');
                toast.success('Verification request sent successfully!');
            } else {
                toast.error(result.error || 'Failed to send request');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (currentStatus === 'verified') return null;

    if (currentStatus === 'pending') {
        return (
            <Card className="border-none shadow-premium bg-blue-50/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <Clock size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg tracking-tight">Verification Pending</h4>
                        <p className="text-sm text-blue-600/70 font-medium">Our team is reviewing your profile. We'll get back to you soon.</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-premium bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck size={120} />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
                    <ShieldCheck size={32} />
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-2xl tracking-tighter">Get Your Verified Badge</h4>
                    <p className="text-blue-100 font-medium max-w-md">
                        Boost your credibility and attract more {status === 'brand' ? 'influencers' : 'brands'} with a verified mark.
                    </p>
                </div>
            </div>

            <Button
                onClick={handleRequest}
                disabled={loading}
                className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-10 rounded-2xl font-bold shadow-2xl relative z-10 gap-2 active:scale-95 transition-all"
            >
                {loading ? 'Processing...' : (
                    <>
                        <Sparkles size={18} />
                        Verify Now
                    </>
                )}
            </Button>
        </Card>
    );
}
