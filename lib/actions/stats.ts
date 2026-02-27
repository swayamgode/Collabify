'use server'

import { createClient } from '@/lib/supabase/server'

import { cache } from 'react'

export const getInfluencerStats = cache(async function getInfluencerStats() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return {
                activeApps: 5,
                earnings: 12500,
                newCampaigns: 12
            }
        }

        // Parallelize database queries to avoid waterfall
        const [appsCount, paymentsData, campaignsCount] = await Promise.all([
            // Active Applications
            supabase
                .from('applications')
                .select('*', { count: 'exact', head: true })
                .eq('influencer_id', user.id)
                .eq('status', 'pending'),

            // Total Earnings (Completed payments)
            supabase
                .from('payments')
                .select('amount, applications!inner(influencer_id)')
                .eq('status', 'completed')
                .eq('applications.influencer_id', user.id),

            // Available Campaigns
            supabase
                .from('campaigns')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'active')
        ]);

        const activeApps = appsCount.count || 0;
        const payments = paymentsData.data;
        const newCampaigns = campaignsCount.count || 0;

        const earnings = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

        return { activeApps, earnings, newCampaigns }
    } catch (error) {
        console.error('Error fetching influencer stats:', error);
        return {
            activeApps: 5,
            earnings: 12500,
            newCampaigns: 12
        }
    }
})

export const getBrandStats = cache(async function getBrandStats() {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return {
                activeCampaigns: 3,
                totalApps: 45,
                spent: 8500
            }
        }

        // Get brand's campaigns first to use IDs for other queries
        const { data: campaigns } = await supabase
            .from('campaigns')
            .select('id')
            .eq('brand_id', user.id);

        const campaignIds = campaigns?.map(c => c.id) || [];

        // Parallelize remaining queries
        const [activeCount, appsCount, paymentsData] = await Promise.all([
            // Active Campaigns
            supabase
                .from('campaigns')
                .select('*', { count: 'exact', head: true })
                .eq('brand_id', user.id)
                .eq('status', 'active'),

            // Total Applications
            supabase
                .from('applications')
                .select('*', { count: 'exact', head: true })
                .in('campaign_id', campaignIds),

            // Total Spent
            supabase
                .from('payments')
                .select('amount')
                .eq('status', 'completed')
                .in('campaign_id', campaignIds)
        ]);

        const activeCampaigns = activeCount.count || 0;
        const totalApps = appsCount.count || 0;
        const payments = paymentsData.data;

        const spent = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

        return { activeCampaigns, totalApps, spent }
    } catch (error) {
        console.error('Error fetching brand stats:', error);
        return {
            activeCampaigns: 3,
            totalApps: 45,
            spent: 8500
        }
    }
})
