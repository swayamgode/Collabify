"use server";

import { getYouTubeChannelStats, searchYouTubeChannels, YouTubeStats } from "@/lib/youtube";
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function fetchInfluencerYouTubeStats(channelId: string): Promise<YouTubeStats | null> {
    if (!channelId) return null;
    return await getYouTubeChannelStats(channelId);
}

export async function getInfluencers(filters?: { search?: string }) {
    try {
        const influencersResult = await convex.query(api.influencers.listAllInfluencers, {});

        // Map to expected UI structure
        const influencers = influencersResult.map((inf: any) => ({
            id: inf._id,
            social_handle: inf.socialHandle,
            niche: inf.niche,
            follower_count: inf.followerCount || 0,
            platforms: inf.platforms || ['YouTube'],
            profiles: {
                full_name: inf.profile?.fullName,
                avatar_url: inf.profile?.avatarUrl,
                is_verified: inf.profile?.isVerified,
                bio: inf.profile?.bio
            }
        }));

        if (filters?.search) {
            const query = filters.search.toLowerCase();
            return influencers.filter(inf =>
                inf.profiles.full_name?.toLowerCase().includes(query) ||
                inf.social_handle?.toLowerCase().includes(query)
            );
        }

        return influencers;
    } catch (error) {
        console.warn('Convex offline or error, returning mock influencers', error);
        // Fallback to mock data to keep UI functional
        return [
            {
                id: 'mock-1',
                social_handle: '@alex_builds',
                niche: ['Tech', 'Gaming'],
                follower_count: 150000,
                platforms: ['Instagram', 'Twitter', 'YouTube'],
                profiles: {
                    full_name: 'Alex Rivera',
                    avatar_url: null,
                    is_verified: true
                }
            }
        ];
    }
}

export async function searchExternalInfluencers(query: string) {
    try {
        const results = await searchYouTubeChannels(query);

        return results.map(channel => ({
            id: `ext-${channel.id}`,
            is_external: true,
            social_handle: `@${channel.title.toLowerCase().replace(/\s+/g, '_')}`,
            niche: ['YouTube Creator'],
            follower_count: 0,
            platforms: ['YouTube'],
            profiles: {
                full_name: channel.title,
                avatar_url: channel.thumbnail,
                is_verified: false
            }
        }));
    } catch (error) {
        console.error('External search failed:', error);
        return [];
    }
}
