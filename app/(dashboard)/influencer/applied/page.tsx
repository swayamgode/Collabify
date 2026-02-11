import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, CheckCircle, MoreVertical } from 'lucide-react';
import { getInfluencerApplications } from '@/lib/actions/applications';
import { format } from 'date-fns';

export default async function AppliedCampaignsPage() {
    const applications = await getInfluencerApplications() as any[];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                <p className="text-gray-500">View and track your campaign applications.</p>
            </div>

            <div className="grid gap-6">
                {!applications || applications.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center text-gray-500">
                            You haven't applied for any campaigns yet.
                        </CardContent>
                    </Card>
                ) : (
                    applications.map((app) => (
                        <Card key={app.id}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${app.status === 'approved' ? 'bg-green-50 text-green-600' :
                                            app.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                app.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                                    'bg-blue-50 text-blue-600'
                                            }`}>
                                            {app.status === 'approved' ? <CheckCircle size={20} /> : <Clock size={20} />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{app.campaigns?.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {app.campaigns?.brands?.company_name} • Applied on {format(new Date(app.applied_at), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${app.campaigns?.budget}</p>
                                            <p className={`text-xs font-semibold uppercase tracking-wider ${app.status === 'approved' ? 'text-green-600' :
                                                app.status === 'pending' ? 'text-amber-600' :
                                                    app.status === 'rejected' ? 'text-red-600' :
                                                        'text-blue-600'
                                                }`}>
                                                {app.status.replace('_', ' ')}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
