'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { updateApplicationStatus } from '@/lib/actions/applications';
import { format } from 'date-fns';

export default function CampaignApplicationManager({ applications: initialApplications, campaignId }: { applications: any[], campaignId: string }) {
    const [applications, setApplications] = useState(initialApplications);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    async function handleStatusUpdate(applicationId: string, status: 'approved' | 'rejected') {
        setUpdatingId(applicationId);
        try {
            const result = await updateApplicationStatus(applicationId, status);
            if (result.success) {
                setApplications(prev => prev.map(app =>
                    app.id === applicationId ? { ...app, status } : app
                ));
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Applications ({applications.length})</CardTitle>
                <CardDescription>
                    {applications.length === 0
                        ? "No applications received yet for this campaign."
                        : "Review and manage influencer applications."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {applications.length === 0 ? (
                    <div className="h-[200px] flex flex-col items-center justify-center border-t">
                        <div className="p-4 rounded-full bg-gray-50 mb-4">
                            <Users size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-500 text-sm">Applications will appear here once influencers start applying.</p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {applications.map((app) => (
                            <div key={app.id} className="py-6 first:pt-0 last:pb-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                                            {app.influencers?.profiles?.full_name?.charAt(0) || 'I'}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{app.influencers?.profiles?.full_name || 'Influencer'}</h4>
                                            <p className="text-sm text-gray-500">
                                                Applied on {format(new Date(app.applied_at), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {app.status === 'pending' ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700"
                                                    disabled={updatingId === app.id}
                                                    onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                                >
                                                    <XCircle size={16} className="mr-2" />
                                                    Reject
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                    disabled={updatingId === app.id}
                                                    onClick={() => handleStatusUpdate(app.id, 'approved')}
                                                >
                                                    <CheckCircle size={16} className="mr-2" />
                                                    Approve
                                                </Button>
                                            </>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm text-gray-700 italic">"{app.message}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
