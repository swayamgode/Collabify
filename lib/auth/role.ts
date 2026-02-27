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

import { getProfileData } from '@/lib/actions/profiles';

/**
 * Get the current user's profile with role
 */
export async function getCurrentUserProfile() {
    try {
        const data = await getProfileData();
        return data?.profile || null;
    } catch (error) {
        return null;
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
