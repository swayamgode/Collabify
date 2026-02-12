import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background bg-gradient-mesh font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 pl-32 transition-all">
                <Topbar />
                <main className="p-8 pt-40 px-10 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>
            </div>
        </div>
    );
}
