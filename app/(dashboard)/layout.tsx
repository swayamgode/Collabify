import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen">
            <Sidebar />
            <div className="md:pl-64 flex flex-col min-h-screen">
                <Topbar />
                <main className="p-4 sm:p-8 pt-24 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
