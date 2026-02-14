'use server'

import { createClient } from '@/lib/supabase/server'

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
        // Search by profile name or social handle
        // Using `or` filter with related table (profiles.full_name) is tricky in Supabase JS client directly with `ilike`.
        // We'll search on social_handle or fetch all and filter in memory if necessary, 
        // but try to use `or` on the main table first.
        // Assuming profiles is joined, we can filter on profiles.full_name via specific syntax or simpler backend search.
        // For simplicity, let's search just social_handle first, or use text search if enabled.
        query = query.ilike('social_handle', `%${filters.search}%`);
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching influencers:', error)
        return []
    }

    // If searching by name that is only in profiles, we might need a separate query or filter in JS
    // Since we select `profiles`, let's filter in memory if simple join filter fails or is complex
    if (filters?.search && data) {
        const searchLower = filters.search.toLowerCase();
        return data.filter((inf: any) =>
            inf.social_handle?.toLowerCase().includes(searchLower) ||
            inf.profiles?.full_name?.toLowerCase().includes(searchLower)
        );
    }

    return data
}
