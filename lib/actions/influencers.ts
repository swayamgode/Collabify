"use server";

import { getYouTubeChannelStats, getYouTubeRecentVideos, searchYouTubeChannels, YouTubeStats } from "@/lib/youtube";

export async function fetchInfluencerYouTubeStats(channelId: string): Promise<YouTubeStats | null> {
    if (!channelId) return null;
    return await getYouTubeChannelStats(channelId);
}

export async function getInfluencers(filters?: { search?: string }) {
    // Mock data for influencers to fix build error and support offline mode
    const influencers = [
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
        },
        {
            id: 'mock-2',
            social_handle: '@sarahstyles',
            niche: ['Beauty', 'Fashion'],
            follower_count: 85000,
            platforms: ['Instagram', 'YouTube'],
            profiles: {
                full_name: 'Sarah Chen',
                avatar_url: null,
                is_verified: true
            }
        },
        {
            id: 'mock-3',
            social_handle: '@marcus_fit',
            niche: ['Fitness', 'Wellness'],
            follower_count: 220000,
            platforms: ['Instagram'],
            profiles: {
                full_name: 'Marcus Knight',
                avatar_url: null,
                is_verified: false
            }
        }
    ];

    if (filters?.search) {
        const query = filters.search.toLowerCase();
        return influencers.filter(inf =>
            inf.profiles.full_name.toLowerCase().includes(query) ||
            inf.social_handle.toLowerCase().includes(query)
        );
    }

    return influencers;
}

export async function searchExternalInfluencers(query: string) {
    try {
        const results = await searchYouTubeChannels(query);

        return results.map(channel => ({
            id: `ext-${channel.id}`,
            is_external: true,
            social_handle: `@${channel.title.toLowerCase().replace(/\s+/g, '_')}`,
            niche: ['YouTube Creator'],
            follower_count: 0, // We'll fetch this from stats when profile is viewed
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
