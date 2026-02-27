'use server'

import { createClient } from '@/lib/supabase/server'
import { findYouTubeChannelId, getYouTubeChannelStats } from '@/lib/youtube'

import { cache } from 'react'

export const getInfluencers = cache(async function getInfluencers(filters?: { niche?: string, platform?: string, search?: string }) {
    try {
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
            throw error;
        }

        if (filters?.search && data) {
            const searchLower = filters.search.toLowerCase();
            return data.filter((inf: any) =>
                inf.social_handle?.toLowerCase().includes(searchLower) ||
                inf.profiles?.full_name?.toLowerCase().includes(searchLower)
            );
        }

        return data
    } catch (error) {
        console.warn('Supabase offline or error, returning mock influencers');
        const mockInfluencers = [
            {
                id: 'mock-inf-1',
                social_handle: '@lifestyle_vlogs',
                follower_count: 500000,
                platforms: ['Instagram', 'YouTube'],
                niche: ['Lifestyle', 'Fashion'],
                profiles: {
                    full_name: 'Sarah Parker',
                    avatar_url: null,
                    is_verified: true
                }
            },
            {
                id: 'mock-inf-2',
                social_handle: '@tech_reviewer',
                follower_count: 1200000,
                platforms: ['YouTube', 'Twitter'],
                niche: ['Tech', 'Gaming'],
                profiles: {
                    full_name: 'Alex Johnson',
                    avatar_url: null,
                    is_verified: true
                }
            }
        ];

        if (filters?.search || filters?.niche || filters?.platform) {
            return mockInfluencers.filter((inf: any) => {
                const searchLower = filters?.search?.toLowerCase();
                const matchesSearch = !searchLower || (
                    inf.social_handle.toLowerCase().includes(searchLower) ||
                    inf.profiles.full_name.toLowerCase().includes(searchLower)
                );
                const matchesNiche = !filters?.niche || inf.niche.includes(filters.niche);
                const matchesPlatform = !filters?.platform || inf.platforms.includes(filters.platform);
                return matchesSearch && matchesNiche && matchesPlatform;
            });
        }

        return mockInfluencers;
    }
})

export const searchExternalInfluencers = cache(async function searchExternalInfluencers(query: string) {
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
})
