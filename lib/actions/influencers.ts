'use server'

import { createClient } from '@/lib/supabase/server'
import { findYouTubeChannelId, getYouTubeChannelStats } from '@/lib/youtube'

export async function getInfluencers(filters?: { niche?: string, platform?: string, search?: string }) {
    const supabase = await createClient()

    let query = supabase
        .from('influencers')
        .select(`
            *,
            profiles (*)
        `)

    if (filters?.niche) {
        query = query.contains('niche', [filters.niche])
    }

    if (filters?.platform) {
        query = query.contains('platforms', [filters.platform])
    }

    if (filters?.search) {
        query = query.ilike('social_handle', `%${filters.search}%`);
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching influencers:', error)
        return []
    }

    if (filters?.search && data) {
        const searchLower = filters.search.toLowerCase();
        return data.filter((inf: any) =>
            inf.social_handle?.toLowerCase().includes(searchLower) ||
            inf.profiles?.full_name?.toLowerCase().includes(searchLower)
        );
    }

    return data
}

export async function searchExternalInfluencers(query: string) {
    if (!query || query.length < 3) return [];

    try {
        const channelId = await findYouTubeChannelId(query);
        if (!channelId) return [];

        const stats = await getYouTubeChannelStats(channelId);
        if (!stats) return [];

        return [{
            id: `external-${channelId}`,
            is_external: true,
            platform: 'YouTube',
            profiles: {
                full_name: stats.channelName,
                avatar_url: stats.thumbnails?.medium?.url || stats.thumbnails?.default?.url
            },
            social_handle: query.startsWith('@') ? query : `@${stats.channelName.replace(/\s+/g, '')}`,
            follower_count: stats.subscriberCount,
            platforms: ['YouTube'],
            niche: ['General Content'], // YouTube search doesn't give niche easily
            stats: stats
        }];
    } catch (error) {
        console.error('Error in searchExternalInfluencers:', error);
        return [];
    }
}
