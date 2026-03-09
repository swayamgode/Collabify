'use server'
// Forced recompile to use Convex backend

import { revalidatePath } from 'next/cache'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cookies } from 'next/headers'
import { cache } from 'react'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function getAuthContext() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('mock_user_id')?.value;
    if (!userId) return null;

    const profile = await convex.query(api.profiles.getProfile, { userId });
    if (!profile) return null;

    const brand = await convex.query(api.brands.getBrandByProfile, { profileId: profile._id });
    const influencer = await convex.query(api.influencers.getInfluencerByProfile, { profileId: profile._id });

    return { userId, profile, brand, influencer };
}

export async function applyToCampaign(campaignId: string, message: string) {
    try {
        const auth = await getAuthContext();

        if (!auth?.influencer) {
            return { error: 'You must be logged in as an influencer to apply.' }
        }

        await convex.mutation(api.applications.createApplication, {
            campaignId: campaignId as any,
            influencerId: auth.influencer._id,
            message,
        });

        revalidatePath('/influencer/browse')
        revalidatePath('/influencer/applied')
        return { success: true };
    } catch (error: any) {
        return { error: error.message || 'Failed to apply' };
    }
}

export const getInfluencerApplications = cache(async function getInfluencerApplications() {
    try {
        const auth = await getAuthContext();
        if (!auth?.influencer) return [];

        const apps = await convex.query(api.applications.getInfluencerApplications, {
            influencerId: auth.influencer._id
        });

        return apps.map(app => ({
            ...app,
            id: app._id,
            applied_at: new Date(app._creationTime).toISOString()
        }));
    } catch (error) {
        console.warn('Convex error fetching applications, returning mock');
        return [];
    }
})

export async function updateApplicationStatus(applicationId: string, status: 'approved' | 'rejected' | 'pending') {
    try {
        await convex.mutation(api.applications.updateApplicationStatus, {
            applicationId: applicationId as any,
            status: status as any
        });

        revalidatePath('/brand/campaigns')
        return { success: true }
    } catch (error) {
        console.error('Error updating application status in Convex:', error);
        return { success: false }
    }
}

export const getCampaignWithApplications = cache(async function getCampaignWithApplications(campaignId: string) {
    console.log("getCampaignWithApplications CALL RECEIVED WITH:", typeof campaignId, JSON.stringify(campaignId));
    if (!campaignId || typeof campaignId !== 'string' || campaignId.trim() === '') {
        console.warn("getCampaignWithApplications: invalid campaignId, returning null");
        return null;
    }
    try {
        const campaign = await convex.query(api.campaigns.getCampaignWithDetails, { campaignId: campaignId as any });
        if (!campaign) return null;

        return {
            ...campaign,
            id: campaign._id,
            applications: campaign.applications.map((app: any) => ({
                ...app,
                id: app._id,
                applied_at: new Date(app._creationTime).toISOString(),
                influencers: {
                    ...app.influencers,
                    profiles: {
                        ...app.influencers.profiles,
                        full_name: app.influencers.profiles?.full_name || 'Incognito'
                    }
                }
            }))
        };
    } catch (error) {
        console.error('Error fetching campaign details from Convex:', error)
        return null;
    }
})
