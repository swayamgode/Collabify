'use server'

import { createClient } from '@/lib/supabase/server'

export async function getInfluencerStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Active Applications
    const { count: activeApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('influencer_id', user.id)
        .eq('status', 'pending')

    // Total Earnings (Completed payments)
    const { data: payments } = await supabase
        .from('payments')
        .select('amount, applications!inner(influencer_id)')
        .eq('status', 'completed')
        .eq('applications.influencer_id', user.id)

    const earnings = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

    // Available Campaigns
    const { count: newCampaigns } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

    return { activeApps, earnings, newCampaigns }
}

export async function getBrandStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Active Campaigns
    const { count: activeCampaigns } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('brand_id', user.id)
        .eq('status', 'active')

    // Total Applications (across all campaigns)
    const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id')
        .eq('brand_id', user.id)

    const campaignIds = campaigns?.map(c => c.id) || []

    const { count: totalApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .in('campaign_id', campaignIds)

    // Total Spent
    const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed')
        .in('campaign_id', campaignIds)

    const spent = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

    return { activeCampaigns, totalApps, spent }
}
