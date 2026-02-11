import { getProfileData } from '@/lib/actions/profiles';
import SettingsClient from './SettingsClient';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
    const data = await getProfileData();

    if (!data) {
        redirect('/login');
    }

    return <SettingsClient data={data} />;
}
