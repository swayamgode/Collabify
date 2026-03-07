"use client";

import { motion } from "framer-motion";

interface RoughBorderProps {
    children: React.ReactNode;
    className?: string;
}

export const RoughCard = ({ children, className }: RoughBorderProps) => {
    return (
        <div className={`relative ${className}`}>
            {/* Hand-drawn look border using SVG filters */}
            <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" preserveAspectRatio="none">
                <filter id="hand-drawn">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
                <rect
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#hand-drawn)"
                    className="opacity-20"
                />
            </svg>
            <div className="bg-white rounded-xl border border-black/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.03)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-300 p-8 h-full">
                {children}
            </div>
        </div>
    );
};
