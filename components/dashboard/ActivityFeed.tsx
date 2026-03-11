'use client';

import { ActivityItem } from '@/lib/actions/activity';
import { formatDistanceToNow } from 'date-fns';
import {
    CheckCircle2, XCircle, Clock, Briefcase, FileText, ChevronRight, Plus
} from 'lucide-react';
import Link from 'next/link';

interface ActivityFeedProps {
    items: ActivityItem[];
    role: 'brand' | 'influencer';
}

function getActivityMeta(type: string, status?: string): {
    icon: React.ReactNode;
    dot: string;
} {
    if (status === 'approved') return {
        icon: <CheckCircle2 size={15} strokeWidth={1.75} className="text-emerald-500" />,
        dot: 'bg-emerald-500',
    };
    if (status === 'rejected') return {
        icon: <XCircle size={15} strokeWidth={1.75} className="text-red-400" />,
        dot: 'bg-red-400',
    };
    if (type === 'campaign') return {
        icon: <Briefcase size={15} strokeWidth={1.75} className="text-black" />,
        dot: 'bg-black',
    };
    return {
        icon: <Clock size={15} strokeWidth={1.75} className="text-amber-500" />,
        dot: 'bg-amber-400',
    };
}

export function ActivityFeed({ items, role }: ActivityFeedProps) {
    // ── Empty State ──
    if (!items || items.length === 0) {
        return (
            <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                    <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Recent Activity
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                    <div className="w-10 h-10 rounded-xl bg-black/[0.04] flex items-center justify-center mb-4">
                        <FileText size={17} strokeWidth={1.75} className="text-black/25" />
                    </div>
                    <p className="text-sm font-semibold text-black/40 mb-1">No activity yet</p>
                    <p className="text-xs text-black/25 font-medium leading-relaxed max-w-xs">
                        {role === 'brand'
                            ? 'Create your first campaign to start seeing activity here.'
                            : 'Apply to campaigns to see your activity here.'}
                    </p>
                    {role === 'brand' && (
                        <Link href="/brand/create-campaign" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:text-black/60 transition-colors">
                            <Plus size={13} strokeWidth={2.5} />
                            Create a campaign
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    // ── Feed ──
    return (
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.05]">
                <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                    Recent Activity
                </span>
                <span className="text-[11px] font-semibold text-black/30">
                    {items.length} {items.length === 1 ? 'update' : 'updates'}
                </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-black/[0.04]">
                {items.map((item) => {
                    const meta = getActivityMeta(item.type, item.status);
                    return (
                        <div
                            key={item.id}
                            className="group flex items-start gap-3.5 px-5 py-4 hover:bg-black/[0.02] transition-colors"
                        >
                            {/* Icon badge */}
                            <div className="mt-0.5 w-8 h-8 rounded-xl bg-black/[0.04] border border-black/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-black/[0.06] transition-colors">
                                {meta.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm font-semibold text-black leading-snug truncate">
                                        {item.title}
                                    </p>
                                    <span className="text-[11px] text-black/30 font-medium whitespace-nowrap flex-shrink-0 pt-0.5">
                                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-xs text-black/40 font-medium leading-relaxed line-clamp-2 mt-0.5">
                                    {item.description}
                                </p>
                                {item.link && (
                                    <Link
                                        href={item.link}
                                        className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-semibold text-black/40 hover:text-black transition-colors group/link"
                                    >
                                        View details
                                        <ChevronRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
