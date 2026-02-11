import { getInfluencers } from '@/lib/actions/influencers';
import InfluencerDiscoveryClient from './InfluencerDiscoveryClient';

export default async function InfluencerDiscoveryPage() {
    const influencers = await getInfluencers();

    return <InfluencerDiscoveryClient initialInfluencers={influencers} />;
}
