'use server'

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Get the current user's role from the database
 * @returns The user's role ('brand' | 'influencer') or null if not authenticated
 */
export async function getUserRole(): Promise<'brand' | 'influencer' | null> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    return profile?.role || null;
}

/**
 * Get the current user's profile with role
 */
export async function getCurrentUserProfile() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return profile;
}

/**
 * Redirect user to their appropriate dashboard based on role
 */
export async function redirectToDashboard() {
    const role = await getUserRole();

    if (!role) {
        redirect('/login');
    }

    if (role === 'brand') {
        redirect('/brand');
    } else {
        redirect('/influencer');
    }
}

/**
 * Ensure the user has access to a specific role's routes
 * If not, redirect them to their correct dashboard
 */
export async function requireRole(requiredRole: 'brand' | 'influencer') {
    const role = await getUserRole();

    if (!role) {
        redirect('/login');
    }

    if (role !== requiredRole) {
        // User is trying to access the wrong dashboard
        if (role === 'brand') {
            redirect('/brand');
        } else {
            redirect('/influencer');
        }
    }
}
