import { cookies } from 'next/headers'
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { cache } from 'react'

export interface ActivityItem {
    id: string;
    type: 'application' | 'campaign' | 'payment' | 'system' | 'connection';
    title: string;
    description: string;
    timestamp: string;
    status?: string;
    link?: string;
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const getBrandActivity = cache(async function getBrandActivity(): Promise<ActivityItem[]> {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            return getMockActivity('brand');
        }

        const profile = await convex.query(api.profiles.getProfile, { userId });
        if (!profile) return getMockActivity('brand');

        const brand = await convex.query(api.brands.getBrandByProfile, { profileId: profile._id });
        if (!brand) return getMockActivity('brand');

        // Fetch campaigns for this brand
        const campaigns = await convex.query(api.campaigns.getBrandCampaigns, { brandId: brand._id });

        const activity: ActivityItem[] = [];

        // Convert campaigns to activity items
        campaigns.slice(0, 5).forEach(camp => {
            activity.push({
                id: camp._id,
                type: 'campaign',
                title: 'Campaign Created',
                description: `You created "${camp.title}"`,
                timestamp: new Date(camp.createdAt).toISOString(),
                status: camp.status,
                link: `/brand/campaigns/${camp._id}`
            });
        });

        return activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
        console.error('Error fetching brand activity:', error);
        return getMockActivity('brand');
    }
})

function getMockActivity(role: 'brand' | 'influencer'): ActivityItem[] {
    return [
        {
            id: 'mock-1',
            type: 'system',
            title: 'Welcome!',
            description: `Welcome to your new Collabify ${role} dashboard.`,
            timestamp: new Date().toISOString(),
        }
    ];
}

export const getInfluencerActivity = cache(async function getInfluencerActivity(): Promise<ActivityItem[]> {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('mock_user_id')?.value;

        if (!userId) {
            return getMockActivity('influencer');
        }

        const activity: ActivityItem[] = [
            {
                id: 'welcome-i',
                type: 'system',
                title: 'Influencer Dashboard Active',
                description: 'You are now ready to find brand campaigns.',
                timestamp: new Date().toISOString()
            }
        ];

        return activity;
    } catch (error) {
        console.error('Error fetching influencer activity:', error);
        return getMockActivity('influencer');
    }
})
