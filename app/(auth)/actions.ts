'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import * as crypto from 'crypto'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Helper to hash password
const hashPassword = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Check against real users table
    const user = await convex.query(api.users.getUserByEmail, { email });

    // Strictly check: User must exist, and password must match
    if (!user || user.password !== hashPassword(password)) {
        // Redirect back with error for specific login failure
        const searchParams = new URLSearchParams({
            error: "Invalid email or password. Please try again."
        });
        redirect(`/login?${searchParams.toString()}`);
    }

    // Now get the specific profile associated with this user
    const profile = await convex.query(api.profiles.getProfile, { userId: user._id });

    if (!profile) {
        // This shouldn't happen if signup works correctly, but good to check
        redirect('/login?error=Profile missing. Contact support.');
    }

    // Set genuine session
    const cookieStore = await cookies();
    cookieStore.set('mock_user_id', user._id, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    revalidatePath('/', 'layout');

    // Proceed to dashboard
    redirect(profile.role === 'influencer' ? '/influencer' : '/brand');
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const role = formData.get('role') as 'brand' | 'influencer';

    let redirectPath = '';
    try {
        // 1. Create the secure user credential record
        const userId = await convex.mutation(api.users.createUser, {
            email,
            password: hashPassword(password),
            role,
        });

        // 2. Create the associated profile
        const profileId = await convex.mutation(api.profiles.createProfile, {
            userId,
            fullName,
            role,
        });

        // 3. Optional: Create role-specific table entry
        if (role === 'brand') {
            await convex.mutation(api.brands.createBrand, {
                profileId,
                companyName: `${fullName}'s Brand`,
            });
        }

        // 4. Log them in immediately
        const cookieStore = await cookies();
        cookieStore.set('mock_user_id', userId, { path: '/' });

        revalidatePath('/', 'layout');
        redirectPath = role === 'brand' ? '/brand' : '/influencer';
    } catch (error: any) {
        console.error("Signup error:", error);
        
        let errorMessage = error.message || "Failed to create account. Please try again.";
        if (errorMessage.includes("User already exists")) {
            errorMessage = "A user with this email already exists. Please log in instead.";
        }
        
        const searchParams = new URLSearchParams({
            error: errorMessage
        });
        redirectPath = `/signup?${searchParams.toString()}`;
    }

    if (redirectPath) {
        redirect(redirectPath);
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('mock_user_id');
    revalidatePath('/', 'layout')
    redirect('/')
}
