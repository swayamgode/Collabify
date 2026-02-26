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
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) return null

    let roleData = null
    if (profile.role === 'influencer') {
        const { data } = await supabase
            .from('influencers')
            .select('*')
            .eq('id', user.id)
            .single()
        roleData = data
    } else {
        const { data } = await supabase
            .from('brands')
            .select('*')
            .eq('id', user.id)
            .single()
        roleData = data
    }

    return { profile, roleData }
}

export async function requestVerification() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('profiles')
        .update({
            verification_status: 'pending',
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) return { error: error.message }

    revalidatePath('/settings')
    revalidatePath('/brand')
    revalidatePath('/influencer')
    return { success: true }
}
