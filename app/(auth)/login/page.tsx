'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { login } from '../actions';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? 'Signing in...' : 'Sign In'}
        </Button>
    );
}

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                <CardDescription className="text-center">
                    Enter your email to sign in to your account
                </CardDescription>
            </CardHeader>
            <form action={login}>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <label htmlFor="email">Email</label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password">Password</label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="rounded border-gray-300" />
                        <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Remember me</label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <LoginButton />
                    <div className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-semibold text-black hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
                <div className="px-6 pb-6 pt-2">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Dev Bypass</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href="/brand"
                            className="w-full inline-flex items-center justify-center rounded-full font-medium transition-colors h-10 px-4 text-sm bg-transparent border border-gray-200 text-foreground hover:bg-gray-50"
                        >
                            Brand
                        </Link>
                        <Link
                            href="/influencer"
                            className="w-full inline-flex items-center justify-center rounded-full font-medium transition-colors h-10 px-4 text-sm bg-transparent border border-gray-200 text-foreground hover:bg-gray-50"
                        >
                            Influencer
                        </Link>
                    </div>
                </div>
            </form>
        </Card>
    );
}

