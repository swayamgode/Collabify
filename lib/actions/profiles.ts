import { cookies } from 'next/headers'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cache } from 'react'
import { revalidatePath } from 'next/cache'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function updateProfile(formData: FormData) {
    // For now, updating stays as a mock or we could implement a Convex mutation
    revalidatePath('/settings')
    return { success: true }
}

export async function updateInfluencerDetails(formData: FormData) {
    revalidatePath('/settings')
    return { success: true }
}

export async function updateBrandDetails(formData: FormData) {
    revalidatePath('/settings')
    return { success: true }
}

export const getProfileData = cache(async function getProfileData() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            console.warn('No authenticated user found for profile data, using mock developer profile');
            return getMockProfile('brand');
        }

        const profile = await convex.query(api.profiles.getProfile, { userId });

        if (!profile) {
            console.warn('Profile not found in Convex, using mock');
            return getMockProfile('brand');
        }

        let roleData = null
        if (profile.role === 'influencer') {
            roleData = await convex.query(api.influencers.getInfluencerByProfile, { profileId: profile._id });
        } else if (profile.role === 'brand') {
            roleData = await convex.query(api.brands.getBrandByProfile, { profileId: profile._id });
        }

        // Map Convex fields to match expected UI structure (snake_case if necessary)
        const mappedProfile = {
            ...profile,
            id: profile._id,
            full_name: profile.fullName,
            verification_status: profile.verificationStatus,
            is_verified: profile.isVerified
        };

        const mappedRoleData = roleData ? {
            ...roleData,
            id: roleData._id,
            company_name: (roleData as any).companyName, // for brands
            social_handle: (roleData as any).socialHandle, // for influencers
            follower_count: (roleData as any).followerCount,
        } : null;

        return { profile: mappedProfile, roleData: mappedRoleData }
    } catch (error) {
        console.warn('Convex connection error or other failure, returning mock profile data', error);
        return getMockProfile('brand');
    }
})

function getMockProfile(role: 'brand' | 'influencer') {
    return {
        profile: {
            id: 'mock-user-id',
            full_name: 'Josh Miller',
            role: role,
            bio: 'Passionate about building the future of influence.',
            website: 'https://collabify.so',
            avatar_url: null,
            is_verified: true,
            verification_status: 'verified'
        },
        roleData: role === 'brand' ? {
            id: 'mock-user-id',
            company_name: 'Collabify Labs',
            industry: 'Technology',
            preferred_platforms: ['Instagram', 'YouTube']
        } : {
            id: 'mock-user-id',
            social_handle: '@josh_creates',
            niche: ['Tech', 'Lifestyle'],
            follower_count: 125000,
            platforms: ['Instagram', 'YouTube']
        }
    };
}

export async function requestVerification() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            console.warn('No authenticated user for verification request, simulating success in dev mode');
            return { success: true };
        }

        // Ideally here we'd call a Convex mutation to update status
        // For now we'll just revalidate

        revalidatePath('/settings')
        revalidatePath('/brand')
        revalidatePath('/influencer')
        return { success: true }
    } catch (error: any) {
        console.warn('Supabase offline, simulating verification request success');
        return { success: false, error: error.message || 'Supabase offline' };
    }
}
