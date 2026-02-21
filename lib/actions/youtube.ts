'use server'

import { redirect } from 'next/navigation';
import { getYouTubeAuthUrl } from '@/lib/youtube';
import { createClient } from '@/lib/supabase/server';

export async function connectYouTube() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If no user is logged in (likely during demo/dev without Supabase setup)
    if (!user) {
        // Instead of crashing, let's redirect to login or just show the auth flow anyway for demo purposes
        // Actually, for the demo to work without real auth, we can just proceed to generate the URL
        console.warn('Proceeding with YouTube connection without a verified user session (Demo Mode)');
    }

    try {
        const authUrl = getYouTubeAuthUrl();
        redirect(authUrl);
    } catch (error) {
        // If redirect throws (which is normal for Next.js redirect), we rethrow it
        if ((error as any).digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error('Failed to initiate YouTube connection:', error);
        redirect('/influencer/analytics?error=connection_failed');
    }
}
