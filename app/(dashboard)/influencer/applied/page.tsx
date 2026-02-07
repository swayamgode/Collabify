'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, CheckCircle, XCircle, MoreVertical } from 'lucide-react';

const applications = [
    {
        id: '1',
        brand: 'LuxFit Wear',
        campaign: 'Yoga Essentials Promotion',
        status: 'Pending',
        date: 'Dec 22, 2023',
        amount: '$500',
    },
    {
        id: '2',
        brand: 'FreshBites',
        campaign: 'Summer Healthy Recipes',
        status: 'Approved',
        date: 'Dec 15, 2023',
        amount: '$350',
    },
    {
        id: '3',
        brand: 'GlowSkin',
        campaign: 'Unboxing Series',
        status: 'Under Review',
        date: 'Dec 10, 2023',
        amount: '$1,200',
    }
];

export default function AppliedCampaignsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                <p className="text-gray-500">View and track your campaign applications.</p>
            </div>

            <div className="grid gap-6">
                {applications.map((app) => (
                    <Card key={app.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${app.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                            app.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                                                'bg-blue-50 text-blue-600'
                                        }`}>
                                        {app.status === 'Approved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{app.campaign}</h3>
                                        <p className="text-sm text-gray-500">{app.brand} • Applied on {app.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{app.amount}</p>
                                        <p className={`text-xs font-semibold uppercase tracking-wider ${app.status === 'Approved' ? 'text-green-600' :
                                                app.status === 'Pending' ? 'text-amber-600' :
                                                    'text-blue-600'
                                            }`}>
                                            {app.status}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical size={16} />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
