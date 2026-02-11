'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function applyToCampaign(campaignId: string, message: string) {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'You must be logged in to apply for a campaign.' }
    }

    // Check if already applied
    const { data: existingApp, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('campaign_id', campaignId)
        .eq('influencer_id', user.id)
        .single()

    if (existingApp) {
        return { error: 'You have already applied for this campaign.' }
    }

    const { data, error } = await supabase
        .from('applications')
        .insert({
            campaign_id: campaignId,
            influencer_id: user.id,
            message,
            status: 'pending',
        })
        .select()
        .single()

    if (error) {
        console.error('Error applying for campaign:', error)
        return { error: error.message }
    }

    revalidatePath('/influencer/browse')
    revalidatePath('/influencer/applied')
    return { success: true, data }
}

export async function getInfluencerApplications() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('applications')
        .select(`
      *,
      campaigns (
        title,
        budget,
        brands (
          company_name
        )
      )
    `)
        .eq('influencer_id', user.id)
        .order('applied_at', { ascending: false })

    if (error) {
        console.error('Error fetching applications:', error)
        return []
    }

    return data
}

export async function updateApplicationStatus(applicationId: string, status: 'approved' | 'rejected') {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId)
        .select()
        .single()

    if (error) {
        console.error('Error updating application status:', error)
        return { error: error.message }
    }

    revalidatePath('/brand/campaigns')
    return { success: true, data }
}

export async function getCampaignWithApplications(campaignId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('campaigns')
        .select(`
      *,
      applications (
        *,
        influencers (
          *,
          profiles (*)
        )
      )
    `)
        .eq('id', campaignId)
        .single()

    if (error) {
        console.error('Error fetching campaign details:', error)
        return null
    }

    return data
}
