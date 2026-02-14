import { getCampaigns } from '@/lib/actions/campaigns';
import BrowseCampaignsClient from './BrowseCampaignsClient';

export default async function BrowseCampaignsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params?.q ? decodeURIComponent(params.q) : undefined;
    const campaigns = await getCampaigns({ search: query });

    return <BrowseCampaignsClient initialCampaigns={campaigns} />;
}
