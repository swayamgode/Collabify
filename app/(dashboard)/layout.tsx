'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gray-50 min-h-screen dark:bg-black">
            <Sidebar />
            <div className="pl-64">
                <div className="p-8 pt-20">
                    {children}
                </div>
            </div>
        </div>
    );
}
