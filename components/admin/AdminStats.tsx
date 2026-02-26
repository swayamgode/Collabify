import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Shield, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminStatsProps {
    stats: {
        pendingCount: number;
        verifiedCount: number;
        totalUsers: number;
    };
}

export function AdminStats({ stats }: AdminStatsProps) {
    const statCards = [
        { label: 'Pending Verifications', value: stats.pendingCount, icon: Clock, color: 'purple' },
        { label: 'Verified Users', value: stats.verifiedCount, icon: Shield, color: 'blue' },
        { label: 'Total Platform Users', value: stats.totalUsers, icon: Users, color: 'green' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statCards.map((stat, i) => (
                <Card key={i} className="group border-none shadow-premium hover:shadow-premium-hover card-hover bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</span>
                        <div className={cn("p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110", {
                            "bg-purple-50 text-purple-600": stat.color === 'purple',
                            "bg-blue-50 text-blue-600": stat.color === 'blue',
                            "bg-green-50 text-green-600": stat.color === 'green',
                        })}>
                            <stat.icon size={18} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold tracking-tighter mb-4">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
