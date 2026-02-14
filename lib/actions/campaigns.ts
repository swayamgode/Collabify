'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Campaign } from '@/lib/types/database'

export async function createCampaign(formData: FormData) {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        // For development/mocking purposes, if no user is found, we might want to return an error
        // but the user might be using a mock session. 
        // However, to write to Supabase, we NEED an actual user ID.
        return { error: 'You must be logged in to create a campaign.' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const budget = parseFloat(formData.get('budget') as string)
    const deadline = formData.get('deadline') as string
    const platforms = formData.getAll('platforms') as string[]

    const { data, error } = await supabase
        .from('campaigns')
        .insert({
            brand_id: user.id,
            title,
            description,
            budget,
            deadline: deadline ? new Date(deadline).toISOString() : null,
            status: 'active', // default to active for now
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating campaign:', error)
        return { error: error.message }
    }

    revalidatePath('/brand/campaigns')
    return { success: true, data }
}

export async function getCampaigns(filters?: { search?: string }) {
    const supabase = await createClient()

    let query = supabase
        .from('campaigns')
        .select(`
      *,
      brands (
        company_name
      )
    `)
        .order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
        console.error('Error fetching campaigns:', error)
        return []
    }

    if (filters?.search && data) {
        const searchLower = filters.search.toLowerCase()
        return data.filter((campaign: any) =>
            campaign.title.toLowerCase().includes(searchLower) ||
            campaign.description?.toLowerCase().includes(searchLower) ||
            campaign.brands?.company_name?.toLowerCase().includes(searchLower)
        )
    }

    return data
}

export async function getBrandCampaigns(brandId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('campaigns')
        .select(`
      *,
      applications (count)
    `)
        .eq('brand_id', brandId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching brand campaigns:', error)
        return []
    }

    // Map to include a simple count property
    return data.map(campaign => ({
        ...campaign,
        application_count: campaign.applications?.[0]?.count || 0
    }))
}
