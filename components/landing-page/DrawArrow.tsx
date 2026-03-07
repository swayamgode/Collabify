"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const DrawArrow = ({ className }: { className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <div ref={ref} className={className}>
            <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none overflow-visible"
            >
                <motion.path
                    d="M10 10 Q 50 10 50 50 Q 50 90 90 90"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="0 1"
                    style={{ pathLength }}
                    className="opacity-30"
                />
                {/* Simple arrow head reveal */}
                <motion.path
                    d="M85 85 L90 90 L85 95"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="opacity-30"
                />
            </motion.svg>
        </div>
    );
};
