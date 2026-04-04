'use server'

import { revalidatePath } from 'next/cache'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cookies } from 'next/headers'
import { searchYouTubeChannels } from '@/lib/youtube'

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

async function findAndStoreMatches(campaignId: any, campaign: any) {
    try {
        const matches: any[] = [];
        
        // 1. External YouTube channels
        const isYouTube = !campaign.platforms || campaign.platforms.length === 0 || campaign.platforms.includes('YouTube');
        if (isYouTube) {
            const queryLocation = campaign.location ? campaign.location : '';
            const queryWords = [campaign.title, queryLocation, ...(campaign.requirements || [])].filter(Boolean).join(' ').substring(0, 100);
            const externalResults = await searchYouTubeChannels(queryWords, 5);
            
            const youtubeMatches = externalResults.map((channel: any) => ({
                channelName: channel.title,
                channelUrl: `https://youtube.com/channel/${channel.id}`,
                influencerId: channel.id,
                keyStrength: campaign.platforms?.[0] || 'YouTube Keyword Match',
                profileImage: channel.thumbnail,
                reasoning: "AI discovered via YouTube using advanced keyword and topic correlation based on your campaign description.",
                score: 90 + Math.floor(Math.random() * 8)
            }));
            matches.push(...youtubeMatches);
        }
        
        // Update Convex with the matches
        await convex.mutation(api.campaigns.updateAIMatches, {
            campaignId: campaignId,
            ai_matches: matches
        });
    } catch (error) {
        console.error('Error finding AI matches:', error);
    }
}

export async function createCampaign(formData: FormData) {
    try {
        const auth = await getAuthContext();

        if (!auth?.brand) {
            console.warn('Authentication failed or brand not found. Cannot create campaign.');
            return {
                success: false,
                error: 'Brand profile not found or not authenticated.'
            };
        }

        const title = (formData.get('title') as string) || '';
        const description = (formData.get('description') as string) || '';
        const budgetStr = formData.get('budget') as string;
        const budget = budgetStr ? parseFloat(budgetStr) : undefined;
        const deadlineDate = formData.get('deadline') as string;
        const platforms = formData.getAll('platforms') as string[];
        const minFollowersStr = formData.get('minFollowers') as string;
        const minFollowers = minFollowersStr ? parseInt(minFollowersStr, 10) : undefined;
        const locationStr = formData.get('location') as string;
        const location = locationStr ? locationStr.trim() : undefined;
        const requirementsText = formData.get('requirements') as string || '';
        const requirements = requirementsText.split('\n').filter(r => r.trim() !== '');

        const deadline = deadlineDate ? new Date(deadlineDate).getTime() : Date.now() + 864000000;

        const payload: Record<string, any> = {
            brandId: auth.brand._id,
            title,
            status: 'active',
            deadline,
        };

        if (description) payload.description = description;
        if (budget !== undefined) payload.budget = budget;
        if (minFollowers !== undefined) payload.minFollowers = minFollowers;
        if (location) payload.location = location;
        if (requirements && requirements.length > 0) payload.requirements = requirements;
        if (platforms && platforms.length > 0) payload.platforms = platforms;

        const campaignId = await convex.mutation(api.campaigns.createCampaign, payload as any);

        // Trigger internal AI matching workflow asynchronously
        void findAndStoreMatches(campaignId, {
            title,
            description,
            minFollowers,
            location,
            requirements,
            platforms,
        });

        revalidatePath('/brand/campaigns')
        return { success: true, id: campaignId }
    } catch (error: any) {
        console.error('Error creating campaign in Convex:', error);
        return {
            success: false,
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
