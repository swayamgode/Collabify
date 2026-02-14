'use client';

import { ActivityItem } from '@/lib/actions/activity';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, XCircle, Clock, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';

interface ActivityFeedProps {
    items: ActivityItem[];
    role: 'brand' | 'influencer';
}

function getActivityIcon(type: string, status?: string) {
    if (status === 'approved') return <CheckCircle className="text-green-500" size={18} />;
    if (status === 'rejected') return <XCircle className="text-red-500" size={18} />;
    if (type === 'campaign') return <Briefcase className="text-blue-500" size={18} />;
    return <Clock className="text-amber-500" size={18} />;
}

export function ActivityFeed({ items, role }: ActivityFeedProps) {
    if (!items || items.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>No recent activity found.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FileText className="text-gray-300 mb-2" size={32} />
                        <p className="text-sm text-gray-500">
                            {role === 'brand'
                                ? "Create a campaign to get started!"
                                : "Apply to campaigns to see activity here!"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                            <div className="mt-1 p-2 bg-white border border-gray-100 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                                {getActivityIcon(item.type, item.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-semibold truncate pr-2">{item.title}</h4>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">{item.description}</p>
                                {item.link && (
                                    <Link href={item.link} className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2 inline-flex items-center gap-1 group/link">
                                        View Details <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
