"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingParticles = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-black/5 blur-[1px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        x: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                        y: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                        opacity: [0, 0.4, 0.4, 0],
                        scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
