'use server'

import { revalidatePath } from 'next/cache'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cookies } from 'next/headers'

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

export async function createCampaign(formData: FormData) {
    try {
        const auth = await getAuthContext();

        if (!auth?.brand) {
            console.warn('Authentication failed or brand not found. Cannot create campaign.');
            return {
                error: 'Brand profile not found or not authenticated.'
            };
        }

        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const budget = parseFloat(formData.get('budget') as string)
        const deadlineDate = formData.get('deadline') as string
        const platforms = formData.getAll('platforms') as string[]
        const minFollowers = parseInt(formData.get('minFollowers') as string) || 0;
        const requirementsText = formData.get('requirements') as string || '';
        const requirements = requirementsText.split('\n').filter(r => r.trim() !== '');

        const deadline = deadlineDate ? new Date(deadlineDate).getTime() : Date.now() + 864000000;

        const campaignId = await convex.mutation(api.campaigns.createCampaign, {
            brandId: auth.brand._id,
            title,
            description,
            budget,
            deadline,
            status: 'active',
            minFollowers,
            requirements,
            platforms,
        });

        // Trigger n8n webhook (AI matching workflow)
        try {
            await fetch('http://localhost:5678/webhook-test/collabify-matcher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign: {
                        title,
                        description,
                        budget,
                        deadline,
                        minFollowers,
                        requirements,
                        platforms,
                        niche: (platforms && platforms.length > 0) ? platforms[0] : 'General',
                    },
                    campaignId: campaignId,
                    brandName: auth.brand.companyName,
                    // Point to our new custom Convex HTTP endpoint
                    callbackUrl: `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/update-matches`,
                }),
            });
        } catch (webhookError) {
            console.error('Failed to trigger n8n webhook:', webhookError);
        }

        revalidatePath('/brand/campaigns')
        return { success: true, id: campaignId }
    } catch (error: any) {
        console.error('Error creating campaign in Convex:', error);
        return {
            error: error.message || 'An unexpected error occurred while creating the campaign.'
        };
    }
}

export async function getCampaigns(filters?: { search?: string }) {
    try {
        const campaigns = await convex.query(api.campaigns.getCampaigns, { search: filters?.search });
        return campaigns.map(c => ({ ...c, id: c._id }));
    } catch (error) {
        console.error('Error fetching campaigns from Convex:', error);
        return [];
    }
}

export async function getBrandCampaigns(brandId: string) {
    if (!brandId) return [];
    try {
        const campaigns = await convex.query(api.campaigns.getBrandCampaigns, { brandId: brandId as any });
        return campaigns.map(c => ({ ...c, id: c._id }));
    } catch (error) {
        console.error('Error fetching brand campaigns from Convex:', error);
        return [];
    }
}
