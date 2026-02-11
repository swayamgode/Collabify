export type Profile = {
    id: string;
    updated_at?: string;
    full_name?: string;
    avatar_url?: string;
    role: 'brand' | 'influencer';
    bio?: string;
    website?: string;
};

export type Brand = {
    id: string;
    company_name: string;
    industry?: string;
    preferred_platforms?: string[];
};

export type Influencer = {
    id: string;
    social_handle?: string;
    niche?: string[];
    follower_count?: number;
    platforms?: string[];
};

export type Campaign = {
    id: string;
    brand_id: string;
    title: string;
    description?: string;
    budget?: number;
    deadline?: string;
    status: 'draft' | 'active' | 'completed' | 'cancelled';
    created_at: string;
};

export type Application = {
    id: string;
    campaign_id: string;
    influencer_id: string;
    status: 'pending' | 'under_review' | 'approved' | 'rejected';
    message?: string;
    applied_at: string;
};

export type Payment = {
    id: string;
    campaign_id?: string;
    application_id?: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    created_at: string;
};
