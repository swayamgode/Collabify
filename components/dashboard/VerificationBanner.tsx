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
            <Card className="border-none shadow-premium bg-neutral-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative">
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                        <Clock size={16} className="animate-pulse" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm tracking-tight text-black">Verification Pending</h4>
                        <p className="text-xs text-black/60 font-medium">Our team is reviewing your profile. We'll get back to you soon.</p>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-premium bg-black p-4 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck size={80} />
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <ShieldCheck size={20} />
                </div>
                <div className="space-y-0.5">
                    <h4 className="font-bold text-base tracking-tight">Get Your Verified Badge</h4>
                    <p className="text-white/60 text-xs font-medium max-w-md">
                        Boost credibility and attract more {status === 'brand' ? 'influencers' : 'brands'}.
                    </p>
                </div>
            </div>

            <Button
                onClick={handleRequest}
                disabled={loading}
                className="bg-white text-black hover:bg-neutral-200 h-10 px-6 rounded-xl text-sm font-bold shadow-xl relative z-10 gap-2 active:scale-95 transition-all"
            >
                {loading ? 'Processing...' : (
                    <>
                        <Sparkles size={14} />
                        Verify Now
                    </>
                )}
            </Button>
        </Card>
    );
}
