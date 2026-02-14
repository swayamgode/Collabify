import { ReactNode } from 'react';
import { requireRole } from '@/lib/auth/role';

export default async function InfluencerLayout({ children }: { children: ReactNode }) {
    // Ensure only influencer users can access this layout
    await requireRole('influencer');

    return <>{children}</>;
}
