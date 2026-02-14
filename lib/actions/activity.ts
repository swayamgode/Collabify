'use server'

import { createClient } from '@/lib/supabase/server';

export interface ActivityItem {
    id: string;
    type: 'application' | 'campaign' | 'payment' | 'system';
    title: string;
    description: string;
    timestamp: string;
    status?: string;
    link?: string;
}

export async function getBrandActivity(): Promise<ActivityItem[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    // Get brand's recent applications received
    // We need to join campaigns to filter by brand_id
    const { data: applications } = await supabase
        .from('applications')
        .select(`
            id,
            status,
            created_at:applied_at,
            campaign:campaigns!inner(title, brand_id),
            influencer:influencers(social_handle, id)
        `)
        .eq('campaign.brand_id', user.id)
        .order('applied_at', { ascending: false })
        .limit(5);

    // Get recent campaigns created
    const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id, title, status, created_at')
        .eq('brand_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

    const activity: ActivityItem[] = [];

    // Process applications
    if (applications) {
        applications.forEach((app: any) => {
            activity.push({
                id: `app-${app.id}`,
                type: 'application',
                title: 'New Application',
                description: `${app.influencer?.social_handle || 'An influencer'} applied to "${app.campaign?.title}"`,
                timestamp: app.created_at,
                status: app.status,
                link: `/brand/campaigns/${app.campaign.id}`
            });
        });
    }

    // Process campaigns
    if (campaigns) {
        campaigns.forEach((camp: any) => {
            activity.push({
                id: `camp-${camp.id}`,
                type: 'campaign',
                title: 'Campaign Created',
                description: `You created "${camp.title}"`,
                timestamp: camp.created_at,
                status: camp.status,
                link: `/brand/campaigns/${camp.id}`
            });
        });
    }

    // Sort combined activity by timestamp descending
    return activity.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);
}

export async function getInfluencerActivity(): Promise<ActivityItem[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    // Get applications submitted/updated
    const { data: applications } = await supabase
        .from('applications')
        .select(`
            id,
            status,
            created_at:applied_at,
            campaign:campaigns(title, brand:brands(company_name))
        `)
        .eq('influencer_id', user.id)
        .order('applied_at', { ascending: false })
        .limit(10);

    const activity: ActivityItem[] = [];

    if (applications) {
        applications.forEach((app: any) => {
            let title = 'Application Submitted';
            let description = `You applied to "${app.campaign?.title}" by ${app.campaign?.brand?.company_name}`;

            if (app.status === 'approved') {
                title = 'Application Approved! 🎉';
                description = `Your application for "${app.campaign?.title}" was approved!`;
            } else if (app.status === 'rejected') {
                title = 'Application Update';
                description = `Status update for "${app.campaign?.title}"`;
            }

            activity.push({
                id: `app-${app.id}`,
                type: 'application',
                title: title,
                description: description,
                timestamp: app.created_at,
                status: app.status,
                link: '/influencer/applied'
            });
        });
    }

    // Could add more activity types here (payments, new relevant campaigns, etc.)

    return activity;
}
