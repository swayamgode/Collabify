import { getAdminStats, getPendingVerifications } from '@/lib/actions/admin';
import { AdminStats } from '@/components/admin/AdminStats';
import { VerificationList } from '@/components/admin/VerificationList';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        // Not an admin, redirect to their respective dashboard
        if (profile?.role === 'brand') redirect('/brand');
        if (profile?.role === 'influencer') redirect('/influencer');
        redirect('/login');
    }

    const stats = await getAdminStats();
    const pendingRequests = await getPendingVerifications();

    return (
        <div className="space-y-12 max-w-7xl mx-auto">
            {/* Hero Heading */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-gradient-premium">Admin Control Panel</h2>
                    <p className="text-gray-500 font-medium mt-2">Manage users and platform-wide verifications.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <AdminStats stats={stats} />

            <div className="grid grid-cols-1 gap-10">
                {/* Pending Verifications */}
                <VerificationList initialProfiles={pendingRequests || []} />
            </div>
        </div>
    );
}
