import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';
import { getEarnings } from '@/lib/actions/payments';

export default async function EarningsPage() {
    const { total, available, pending, transactions } = await getEarnings();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
                    <p className="text-gray-500">Track and manage your collaboration income.</p>
                </div>
                <Button className="gap-2">
                    <CreditCard size={18} />
                    Withdraw Funds
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">${total.toFixed(2)}</div>
                        <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                            <TrendingUp size={12} />
                            +0% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Available to Withdraw</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">${available.toFixed(2)}</div>
                        <p className="text-xs text-gray-500 mt-1">Earnings ready for payout</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Pending Clearings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">${pending.toFixed(2)}</div>
                        <p className="text-xs text-gray-500 mt-1">Ongoing or unprocessed payments</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest payouts and campaign earnings.</CardDescription>
                </CardHeader>
                <CardContent>
                    {transactions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No transactions found.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {transactions.map((tx: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2 mb-2 last:mb-0">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${tx.amount.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                                            <ArrowUpRight size={16} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{tx.label}</p>
                                            <p className="text-xs text-gray-500">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-sm ${tx.amount.startsWith('+') ? 'text-black' : 'text-red-500'}`}>
                                            {tx.amount}
                                        </p>
                                        <p className={`text-xs uppercase font-medium ${tx.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}`}>
                                            {tx.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                {transactions.length > 0 && (
                    <div className="p-4 border-t text-center">
                        <Button variant="ghost" size="sm" className="text-gray-500">View All Transactions</Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
