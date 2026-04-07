import { Sidebar } from '@/components/layout/Sidebar';
import { getCurrentUserProfile } from '@/lib/auth/role';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUserProfile();

    return (
        <div className="min-h-screen bg-background bg-gradient-mesh font-sans">
            <Sidebar user={user} />
            <div className="flex flex-col flex-1 pl-32 transition-all">
                <main className="p-8 pt-10 px-10 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-400">
                    {children}
                </main>
            </div>
        </div>
    );
}
