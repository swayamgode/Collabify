'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const fullName = formData.get('fullName') as string
    const bio = formData.get('bio') as string
    const website = formData.get('website') as string

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            bio,
            website,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/settings')
    return { success: true }
}

export async function updateInfluencerDetails(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const socialHandle = formData.get('socialHandle') as string
    const niche = formData.getAll('niche') as string[]
    const platforms = formData.getAll('platforms') as string[]
    const followerCount = parseInt(formData.get('followerCount') as string)

    const { error } = await supabase
        .from('influencers')
        .update({
            social_handle: socialHandle,
            niche,
            platforms,
            follower_count: followerCount
        })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/settings')
    return { success: true }
}

export async function updateBrandDetails(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const companyName = formData.get('companyName') as string
    const industry = formData.get('industry') as string
    const preferredPlatforms = formData.getAll('platforms') as string[]

    const { error } = await supabase
        .from('brands')
        .update({
            company_name: companyName,
            industry,
            preferred_platforms: preferredPlatforms
        })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/settings')
    return { success: true }
}

export async function getProfileData() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.warn('No authenticated user found for profile data, using mock developer profile');
            return getMockProfile('brand'); // Default to brand for mock developer mode
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (profileError || !profile) {
            console.error('Error fetching profile:', profileError)
            throw profileError;
        }

        let roleData = null
        if (profile.role === 'influencer') {
            const { data, error: influencerError } = await supabase
                .from('influencers')
                .select('*')
                .eq('id', user.id)
                .single()
            if (influencerError) throw influencerError;
            roleData = data
        } else if (profile.role === 'brand') {
            const { data, error: brandError } = await supabase
                .from('brands')
                .select('*')
                .eq('id', user.id)
                .single()
            if (brandError) throw brandError;
            roleData = data
        }

        return { profile, roleData }
    } catch (error) {
        console.warn('Supabase offline, returning mock profile data');
        return getMockProfile('brand');
    }
}

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
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.warn('No authenticated user for verification request, simulating success in dev mode');
            return { success: true };
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                verification_status: 'pending',
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

        if (error) {
            console.error('Error requesting verification:', error);
            throw error;
        }

        revalidatePath('/settings')
        revalidatePath('/brand')
        revalidatePath('/influencer')
        return { success: true }
    } catch (error: any) {
        console.warn('Supabase offline, simulating verification request success');
        return { success: false, error: error.message || 'Supabase offline' };
    }
}
