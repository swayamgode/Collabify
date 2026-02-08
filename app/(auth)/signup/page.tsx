'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { signup } from '../actions';
import { useFormStatus } from 'react-dom';

function SignupButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? 'Creating account...' : 'Create Account'}
        </Button>
    );
}

export default function SignupPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const defaultRole = searchParams.get('role') === 'influencer' ? 'influencer' : 'brand';
    const [role, setRole] = useState<'brand' | 'influencer'>(defaultRole);

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                    Choose your role and get started
                </CardDescription>
            </CardHeader>
            <form action={signup}>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${role === 'brand' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                                }`}
                            onClick={() => setRole('brand')}
                        >
                            <div className="font-semibold">Brand</div>
                            <div className="text-xs text-gray-500">I want to hire creators</div>
                        </div>
                        <div
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${role === 'influencer' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'
                                }`}
                            onClick={() => setRole('influencer')}
                        >
                            <div className="font-semibold">Influencer</div>
                            <div className="text-xs text-gray-500">I want to find campaigns</div>
                        </div>
                    </div>

                    {/* Hidden input to pass role to the action */}
                    <input type="hidden" name="role" value={role} />

                    <div className="grid gap-2">
                        <label htmlFor="fullName">Full Name</label>
                        <Input id="fullName" name="fullName" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email">Email</label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <SignupButton />
                    <div className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-black hover:underline">
                            Login
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}

