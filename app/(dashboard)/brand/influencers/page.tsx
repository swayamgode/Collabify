import { getInfluencers } from '@/lib/actions/influencers';
import InfluencerDiscoveryClient from './InfluencerDiscoveryClient';

export default async function InfluencerDiscoveryPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params?.q ? decodeURIComponent(params.q) : undefined;
    const influencers = await getInfluencers({ search: query });

    return <InfluencerDiscoveryClient initialInfluencers={influencers as any} />;
}
