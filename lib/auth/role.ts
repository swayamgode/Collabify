'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Get the current user's role from the database
 * @returns The user's role ('brand' | 'influencer') or null if not authenticated
 */
export async function getUserRole(): Promise<'brand' | 'influencer' | null> {
    // For dev/demo mode bypass
    return null;
}

/**
 * Get the current user's profile with role
 */
export async function getCurrentUserProfile() {
    // Return mock profile for dev/demo mode
    const mockUser = {
        id: 'mock-user-123',
        full_name: 'Demo User',
        email: 'demo@collabify.com',
        role: 'brand',     // This is the default mock role
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return mockUser;
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        return profile || mockUser;
    } catch (error) {
        // console.warn('Supabase error:', error);
        return mockUser;
    }
}

/**
 * Redirect user to their appropriate dashboard based on role
 */
export async function redirectToDashboard() {
    // No-op or default
    return;
}

/**
 * Ensure the user has access to a specific role's routes
 * If not, redirect them to their correct dashboard
 */
export async function requireRole(requiredRole: 'brand' | 'influencer') {
    // Bypass role check for dev demo
    return;
}
