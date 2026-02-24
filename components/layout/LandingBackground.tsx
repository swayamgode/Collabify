"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#F5F5F7]">
            {/* Primary Animated Gradients */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-100/30 blur-[130px] rounded-full mix-blend-multiply"
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 100, 0],
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-100/30 blur-[130px] rounded-full mix-blend-multiply"
            />
            <motion.div
                animate={{
                    x: [0, 60, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-rose-100/20 blur-[130px] rounded-full mix-blend-darken"
            />

            {/* Grain/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Top Gradient Fade */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#F5F5F7] to-transparent" />
        </div>
    );
}
