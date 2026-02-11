'use server'

import { createClient } from '@/lib/supabase/server'

export async function getInfluencers(filters?: { niche?: string, platform?: string }) {
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

    const { data, error } = await query

    if (error) {
        console.error('Error fetching influencers:', error)
        return []
    }

    return data
}
