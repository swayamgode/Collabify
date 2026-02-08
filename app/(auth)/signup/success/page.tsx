import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SignupSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle size={32} />
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Registration Successful!</h1>
                <p className="text-gray-500 max-w-sm">
                    We've sent a verification email to your inbox. Please confirm your email to continue.
                </p>
            </div>
            <Link href="/login" className="w-full max-w-xs">
                <Button className="w-full" variant="outline">
                    Back to Login
                </Button>
            </Link>
        </div>
    );
}
