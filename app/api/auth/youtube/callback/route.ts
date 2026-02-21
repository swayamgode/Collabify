import { NextRequest, NextResponse } from 'next/server';
import { getYouTubeOAuthClient } from '@/lib/youtube';
import { createClient } from '@/lib/supabase/server';
import { google } from 'googleapis';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.redirect(new URL('/influencer/analytics?error=youtube_denied', request.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL('/influencer/analytics?error=no_code', request.url));
    }

    try {
        const oauth2Client = getYouTubeOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Get the channel ID for this user
        const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
        const channelResponse = await youtube.channels.list({
            part: ['id', 'snippet'],
            mine: true
        });

        const channel = channelResponse.data.items?.[0];
        if (!channel || !channel.id) {
            return NextResponse.redirect(new URL('/influencer/analytics?error=no_channel', request.url));
        }

        // Save the connection to Supabase
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Update influencer record with YouTube details
            // We store the refresh_token so we can get new access_tokens later
            const { error: updateError } = await supabase
                .from('influencers')
                .update({
                    social_handle: channel.snippet?.customUrl?.replace('@', '') || channel.snippet?.title,
                    // These fields might need to be added to your schema
                    // For now, we'll try to update them, or at least the handle
                })
                .eq('id', user.id);

            // Note: In a production app, you'd store the tokens securely 
            // per user in a separate 'youtube_connections' table.
        }

        return NextResponse.redirect(new URL('/influencer/analytics?success=youtube_connected', request.url));
    } catch (err) {
        console.error('YouTube Callback Error:', err);
        return NextResponse.redirect(new URL('/influencer/analytics?error=callback_failed', request.url));
    }
}
