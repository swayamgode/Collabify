'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // For demo: verify against Convex profiles
    // In a real app, you'd use a real auth provider like Clerk + Convex
    const profile = await convex.query(api.profiles.getProfile, { userId: email });

    if (!profile) {
        // Fallback or auto-signup for demo
        const isInfluencer = email.includes('influencer');
        const role = isInfluencer ? 'influencer' : 'brand';

        const profileId = await convex.mutation(api.profiles.createProfile, {
            userId: email,
            fullName: email.split('@')[0],
            role,
        });

        if (role === 'brand') {
            await convex.mutation(api.brands.createBrand, {
                profileId,
                companyName: `${email.split('@')[0]}'s Brand`,
            });
        }

        // Mock Session
        const cookieStore = await cookies();
        cookieStore.set('mock_user_id', email, { path: '/' });

        revalidatePath('/', 'layout');
        redirect(isInfluencer ? '/influencer' : '/brand');
        return;
    }

    // Mock Session
    const cookieStore = await cookies();
    cookieStore.set('mock_user_id', email, { path: '/' });

    revalidatePath('/', 'layout');

    // Redirect based on role in Convex
    if (profile.role === 'influencer') {
        redirect('/influencer');
    } else {
        redirect('/brand');
    }
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string;
    const fullName = formData.get('fullName') as string;
    const role = formData.get('role') as 'brand' | 'influencer';

    // Create profile in Convex
    const profileId = await convex.mutation(api.profiles.createProfile, {
        userId: email,
        fullName,
        role,
    });

    if (role === 'brand') {
        await convex.mutation(api.brands.createBrand, {
            profileId,
            companyName: `${fullName}'s Brand`,
        });
    }

    // Mock Session
    const cookieStore = await cookies();
    cookieStore.set('mock_user_id', email, { path: '/' });

    revalidatePath('/', 'layout')
    return redirect(role === 'brand' ? '/brand' : '/influencer')
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('mock_user_id');
    revalidatePath('/', 'layout')
    redirect('/')
}
