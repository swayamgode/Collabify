'use server'

import { createClient } from '@/lib/supabase/server'

export interface PlatformStat {
    platform: string
    icon: string
    color: string
    gradientFrom: string
    gradientTo: string
    subscribers: number
    totalViews: number
    avgViews: number
    engagementRate: number
    avgRetention: number
    postFrequency: string
    growth: number
}

export interface TopContent {
    title: string
    platform: string
    views: number
    likes: number
    comments: number
    date: string
    thumbnail: string
    url: string
}

export interface AudienceDemographic {
    label: string
    percentage: number
    color: string
}

export interface MonthlyGrowth {
    month: string
    subscribers: number
    views: number
}

export interface InfluencerAnalytics {
    name: string
    handle: string
    avatar: string
    bio: string
    niche: string[]
    verifiedBrands: number
    collaborationsCompleted: number
    avgResponseTime: string
    profileScore: number

    // Overall metrics
    totalSubscribers: number
    totalViews: number
    avgEngagementRate: number
    avgRetention: number
    sponsorshipFulfillmentRate: number

    platforms: PlatformStat[]
    topContent: TopContent[]

    audienceGender: AudienceDemographic[]
    audienceAge: AudienceDemographic[]
    audienceCountry: AudienceDemographic[]

    monthlyGrowth: MonthlyGrowth[]

    rates: {
        sponsored_post: number
        story_mention: number
        dedicated_video: number
        brand_ambassador: number
    }
}

const MOCK_ANALYTICS: InfluencerAnalytics = {
    name: 'Alex Rivera',
    handle: '@alexrivera',
    avatar: 'AR',
    bio: 'Tech, Gaming & Lifestyle creator. Helping brands connect with Gen-Z audiences authentically. 3x Creator of the Year nominee.',
    niche: ['Tech', 'Gaming', 'Lifestyle'],
    verifiedBrands: 24,
    collaborationsCompleted: 47,
    avgResponseTime: '< 2 hrs',
    profileScore: 94,

    totalSubscribers: 2_840_000,
    totalViews: 185_600_000,
    avgEngagementRate: 6.8,
    avgRetention: 62,
    sponsorshipFulfillmentRate: 98,

    platforms: [
        {
            platform: 'YouTube',
            icon: 'YT',
            color: '#FF0000',
            gradientFrom: '#FF0000',
            gradientTo: '#FF6B6B',
            subscribers: 1_450_000,
            totalViews: 120_000_000,
            avgViews: 480_000,
            engagementRate: 7.2,
            avgRetention: 58,
            postFrequency: '2x / week',
            growth: 12.4,
        },
        {
            platform: 'Instagram',
            icon: 'IG',
            color: '#E1306C',
            gradientFrom: '#833AB4',
            gradientTo: '#FD1D1D',
            subscribers: 890_000,
            totalViews: 48_200_000,
            avgViews: 95_000,
            engagementRate: 8.1,
            avgRetention: 72,
            postFrequency: '5x / week',
            growth: 18.7,
        },
        {
            platform: 'TikTok',
            icon: 'TT',
            color: '#010101',
            gradientFrom: '#010101',
            gradientTo: '#69C9D0',
            subscribers: 500_000,
            totalViews: 17_400_000,
            avgViews: 340_000,
            engagementRate: 11.4,
            avgRetention: 85,
            postFrequency: '7x / week',
            growth: 34.2,
        },
    ],

    topContent: [
        {
            title: 'I Tested EVERY Apple Vision Pro App for 30 Days',
            platform: 'YouTube',
            views: 2_400_000,
            likes: 187_000,
            comments: 14_300,
            date: '2025-12-15',
            thumbnail: 'YT',
            url: '#',
        },
        {
            title: 'Gaming Setup Tour 2025 – $50,000 Battle Station',
            platform: 'YouTube',
            views: 1_890_000,
            likes: 143_000,
            comments: 9_800,
            date: '2025-11-30',
            thumbnail: 'YT',
            url: '#',
        },
        {
            title: 'Day in the Life of a Full-Time Creator',
            platform: 'Instagram',
            views: 980_000,
            likes: 94_000,
            comments: 7_200,
            date: '2026-01-08',
            thumbnail: 'IG',
            url: '#',
        },
        {
            title: 'POV: Unboxing the Most Expensive Tech of 2025',
            platform: 'TikTok',
            views: 4_200_000,
            likes: 580_000,
            comments: 28_000,
            date: '2026-01-20',
            thumbnail: 'TT',
            url: '#',
        },
        {
            title: 'Why I Quit My 9-5 to Create Full Time (Real Numbers)',
            platform: 'YouTube',
            views: 1_650_000,
            likes: 128_000,
            comments: 22_400,
            date: '2025-10-05',
            thumbnail: 'YT',
            url: '#',
        },
        {
            title: 'Testing Viral Tech Products so you don\'t have to',
            platform: 'TikTok',
            views: 3_100_000,
            likes: 420_000,
            comments: 18_900,
            date: '2026-02-01',
            thumbnail: 'TT',
            url: '#',
        },
    ],

    audienceGender: [
        { label: 'Male', percentage: 62, color: '#6366F1' },
        { label: 'Female', percentage: 35, color: '#EC4899' },
        { label: 'Other', percentage: 3, color: '#8B5CF6' },
    ],

    audienceAge: [
        { label: '13-17', percentage: 8, color: '#FB923C' },
        { label: '18-24', percentage: 38, color: '#6366F1' },
        { label: '25-34', percentage: 31, color: '#10B981' },
        { label: '35-44', percentage: 15, color: '#F59E0B' },
        { label: '45+', percentage: 8, color: '#8B5CF6' },
    ],

    audienceCountry: [
        { label: '🇺🇸 United States', percentage: 42, color: '#6366F1' },
        { label: '🇮🇳 India', percentage: 18, color: '#10B981' },
        { label: '🇬🇧 United Kingdom', percentage: 11, color: '#F59E0B' },
        { label: '🇨🇦 Canada', percentage: 8, color: '#EC4899' },
        { label: '🇦🇺 Australia', percentage: 6, color: '#8B5CF6' },
        { label: '🌍 Others', percentage: 15, color: '#6B7280' },
    ],

    monthlyGrowth: [
        { month: 'Sep', subscribers: 2_490_000, views: 14_200_000 },
        { month: 'Oct', subscribers: 2_550_000, views: 15_800_000 },
        { month: 'Nov', subscribers: 2_640_000, views: 17_400_000 },
        { month: 'Dec', subscribers: 2_720_000, views: 18_900_000 },
        { month: 'Jan', subscribers: 2_790_000, views: 16_300_000 },
        { month: 'Feb', subscribers: 2_840_000, views: 19_200_000 },
    ],

    rates: {
        sponsored_post: 8500,
        story_mention: 2200,
        dedicated_video: 18000,
        brand_ambassador: 45000,
    },
}

import { getYouTubeChannelStats, getYouTubeRecentVideos, findYouTubeChannelId } from '@/lib/youtube'

export async function getInfluencerAnalytics(): Promise<InfluencerAnalytics> {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // Default to mock data if not logged in
        if (!user) return MOCK_ANALYTICS

        // Fetch user profile and influencer specific details
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        const { data: influencer } = await supabase
            .from('influencers')
            .select('*')
            .eq('id', user.id)
            .single()

        if (!profile || !influencer) return MOCK_ANALYTICS

        let analytics = {
            ...MOCK_ANALYTICS,
            name: profile.full_name || MOCK_ANALYTICS.name,
            handle: influencer.social_handle ? `@${influencer.social_handle}` : MOCK_ANALYTICS.handle,
            niche: influencer.niche?.length ? influencer.niche : MOCK_ANALYTICS.niche,
            totalSubscribers: influencer.follower_count || MOCK_ANALYTICS.totalSubscribers,
        }

        // If we have a YouTube API key and a handle, try to get real data
        if (process.env.YOUTUBE_API_KEY && influencer.social_handle) {
            // 1. Try to find the Channel ID from the handle
            const channelId = await findYouTubeChannelId(influencer.social_handle)

            if (channelId) {
                const [ytStats, ytVideos] = await Promise.all([
                    getYouTubeChannelStats(channelId),
                    getYouTubeRecentVideos(channelId, 5)
                ])

                if (ytStats) {
                    // Update YouTube specific platform stat
                    analytics.platforms = analytics.platforms.map(p => {
                        if (p.platform === 'YouTube') {
                            return {
                                ...p,
                                subscribers: ytStats.subscriberCount,
                                totalViews: ytStats.viewCount,
                                avgViews: Math.round(ytStats.viewCount / (ytStats.videoCount || 1)),
                            }
                        }
                        return p
                    })

                    analytics.totalSubscribers = ytStats.subscriberCount
                    analytics.totalViews = ytStats.viewCount
                }

                if (ytVideos.length > 0) {
                    // Convert YouTube videos to TopContent format
                    const realContent = ytVideos.map(v => ({
                        title: v.title,
                        platform: 'YouTube',
                        views: v.viewCount,
                        likes: v.likeCount,
                        comments: v.commentCount,
                        date: v.publishedAt,
                        thumbnail: v.thumbnail,
                        url: `https://youtube.com/watch?v=${v.id}`
                    }))

                    // Prepend real content to top content
                    analytics.topContent = [...realContent, ...analytics.topContent.filter(c => c.platform !== 'YouTube')].slice(0, 6)
                }
            }
        }

        return analytics
    } catch (error) {
        console.error('Error in getInfluencerAnalytics:', error)
        return MOCK_ANALYTICS
    }
}
