'use server'

import { createClient } from '@/lib/supabase/server';

export interface ActivityItem {
    id: string;
    type: 'application' | 'campaign' | 'payment' | 'system' | 'connection';
    title: string;
    description: string;
    timestamp: string;
    status?: string;
    link?: string;
}

export async function getBrandActivity(): Promise<ActivityItem[]> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return [
                {
                    id: 'mock-app-1',
                    type: 'application',
                    title: 'New Application',
                    description: 'SarahVlogs applied to "Summer Tech Review"',
                    timestamp: new Date().toISOString(),
                    status: 'pending',
                    link: '/brand/campaigns/mock-1'
                },
                {
                    id: 'mock-conn-1',
                    type: 'connection',
                    title: 'Connection Requested',
                    description: 'You requested a connection with TechReviewer_99',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    status: 'pending',
                    link: '/brand/influencers'
                },
                {
                    id: 'mock-camp-1',
                    type: 'campaign',
                    title: 'Campaign Created',
                    description: 'You created "Summer Tech Review"',
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                    status: 'active',
                    link: '/brand/campaigns/mock-1'
                }
            ];
        }

        // Get brand's recent applications received
        const { data: applications } = await supabase
            .from('applications')
            .select(`
                id,
                status,
                created_at:applied_at,
                campaign:campaigns!inner(id, title, brand_id),
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

        // Get connection requests
        const { data: connections } = await supabase
            .from('connection_requests')
            .select(`
                id,
                status,
                created_at,
                influencer:influencers(social_handle, id, profiles(full_name))
            `)
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
                    link: `/brand/campaigns/${app.campaign?.id}`
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

        // Process connections
        if (connections) {
            connections.forEach((conn: any) => {
                activity.push({
                    id: `conn-${conn.id}`,
                    type: 'connection',
                    title: 'Connection Requested',
                    description: `You requested a connection with ${conn.influencer?.profiles?.full_name || conn.influencer?.social_handle}`,
                    timestamp: conn.created_at,
                    status: conn.status,
                    link: '/brand/influencers'
                });
            });
        }

        // Sort combined activity by timestamp descending
        return activity.sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 5);
    } catch (error) {
        // ... (returning mock in catch block)
        return [];
    }
}

export async function getInfluencerActivity(): Promise<ActivityItem[]> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return [
                {
                    id: 'mock-app-inf-1',
                    type: 'application',
                    title: 'Application Approved! 🎉',
                    description: 'Your application for "Nike Summer" was approved!',
                    timestamp: new Date().toISOString(),
                    status: 'approved',
                    link: '/influencer/applied'
                },
                {
                    id: 'mock-conn-inf-1',
                    type: 'connection',
                    title: 'New Connection Request',
                    description: 'Acme Inc. wants to connect with you!',
                    timestamp: new Date(Date.now() - 1800000).toISOString(),
                    status: 'pending',
                    link: '/influencer'
                }
            ];
        }

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

        // Get connection requests
        const { data: connections } = await supabase
            .from('connection_requests')
            .select(`
                id,
                status,
                created_at,
                brand:brands(company_name, id)
            `)
            .eq('influencer_id', user.id)
            .order('created_at', { ascending: false })
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

        if (connections) {
            connections.forEach((conn: any) => {
                activity.push({
                    id: `conn-${conn.id}`,
                    type: 'connection',
                    title: 'New Connection Request',
                    description: `${conn.brand?.company_name} wants to connect with you!`,
                    timestamp: conn.created_at,
                    status: conn.status,
                    link: '/influencer'
                });
            });
        }

        return activity.sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 10);
    } catch (error) {
        return [];
    }
}
