"use client";

import { ReactNode, useState, useEffect } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<ConvexReactClient | null>(null);

    useEffect(() => {
        if (convexUrl) {
            setClient(new ConvexReactClient(convexUrl));
        }
    }, []);

    if (!convexUrl) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-6">
                    <div className="inline-flex p-4 bg-red-500/10 rounded-full">
                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Configuration Required</h1>
                    <p className="text-gray-400 font-medium">
                        The <code className="text-blue-400">NEXT_PUBLIC_CONVEX_URL</code> is missing.
                        Please run <code className="text-white">npx convex dev</code> to initialize your backend.
                    </p>
                    <div className="pt-4">
                        <a
                            href="https://docs.convex.dev/get-started"
                            target="_blank"
                            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                        >
                            View Setup Documentation →
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (!client) return null;

    return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
