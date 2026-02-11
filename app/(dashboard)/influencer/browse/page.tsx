import { getCampaigns } from '@/lib/actions/campaigns';
import BrowseCampaignsClient from './BrowseCampaignsClient';

export default async function BrowseCampaignsPage() {
    const campaigns = await getCampaigns();

    return <BrowseCampaignsClient initialCampaigns={campaigns} />;
}
