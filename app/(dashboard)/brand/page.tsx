import { getBrandStats } from '@/lib/actions/stats';
import { getBrandActivity } from '@/lib/actions/activity';
import { getProfileData } from '@/lib/actions/profiles';
import { BrandDashboardClient } from './BrandDashboardClient';

export default async function BrandDashboardPage() {
    const [stats, activity, profileData] = await Promise.all([
        getBrandStats(),
        getBrandActivity(),
        getProfileData()
    ]);

    return (
        <BrandDashboardClient 
            stats={stats} 
            activity={activity} 
            profileData={profileData} 
        />
    );
}
