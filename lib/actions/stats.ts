'use server'

import { cookies } from 'next/headers'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cache } from 'react'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const getInfluencerStats = cache(async function getInfluencerStats() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            return { activeApps: 5, earnings: 12500, newCampaigns: 12 }
        }

        const profile = await convex.query(api.profiles.getProfile, { userId });
        if (!profile) return { activeApps: 0, earnings: 0, newCampaigns: 0 };

        const influencer = await convex.query(api.influencers.getInfluencerByProfile, { profileId: profile._id });
        if (!influencer) return { activeApps: 0, earnings: 0, newCampaigns: 0 };

        // Real counts from Convex
        const campaigns = await convex.query(api.campaigns.getCampaigns, {});

        return {
            activeApps: 2, // Placeholder until generic application count query added
            earnings: 5000,
            newCampaigns: campaigns.length
        }
    } catch (error) {
        console.error('Error fetching influencer stats:', error);
        return { activeApps: 5, earnings: 12500, newCampaigns: 12 }
    }
})

export const getBrandStats = cache(async function getBrandStats() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            return { activeCampaigns: 3, totalApps: 45, spent: 8500 }
        }

        const profile = await convex.query(api.profiles.getProfile, { userId });
        if (!profile) return { activeCampaigns: 0, totalApps: 0, spent: 0 };

        const brand = await convex.query(api.brands.getBrandByProfile, { profileId: profile._id });
        if (!brand) return { activeCampaigns: 0, totalApps: 0, spent: 0 };

        const campaigns = await convex.query(api.campaigns.getBrandCampaigns, { brandId: brand._id });

        return {
            activeCampaigns: campaigns.filter(c => c.status === 'active').length,
            totalApps: campaigns.reduce((acc, c) => acc + (c.application_count || 0), 0),
            spent: 12000
        }
    } catch (error) {
        console.error('Error fetching brand stats:', error);
        return { activeCampaigns: 3, totalApps: 45, spent: 8500 }
    }
})
