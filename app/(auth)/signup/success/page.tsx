'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function SignupSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 bg-green-500/10 rounded-[32px] flex items-center justify-center text-green-500 shadow-lg shadow-green-500/5 border border-green-500/20"
            >
                <CheckCircle2 size={48} />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
            >
                <h1 className="text-4xl font-black tracking-tight text-gradient-premium">Registration Successful!</h1>
                <p className="text-gray-500 max-w-sm mx-auto font-medium text-lg lg:text-xl">
                    We've sent a verification link to your inbox. Please confirm your email to activate your account.
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-xs pt-4"
            >
                <Link href="/login" className="w-full">
                    <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl hover:translate-y-[-2px] transition-all gap-2">
                        Back to Login
                        <ArrowRight size={20} />
                    </Button>
                </Link>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-gray-400 font-bold uppercase tracking-widest"
            >
                Welcome to the future of Influence
            </motion.p>
        </div>
    );
}
