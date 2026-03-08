"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mainSpringConfig = { damping: 30, stiffness: 300, restDelta: 0.001 };
    const outerSpringConfig = { damping: 40, stiffness: 250, restDelta: 0.001 };

    const springX = useSpring(mouseX, mainSpringConfig);
    const springY = useSpring(mouseY, mainSpringConfig);

    const outerX = useSpring(mouseX, outerSpringConfig);
    const outerY = useSpring(mouseY, outerSpringConfig);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer Concentric Circle (Fluid Trailing Ring) */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-black/10 rounded-full pointer-events-none z-[10000] hidden md:block"
                style={{
                    x: outerX,
                    y: outerY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            {/* Inner Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] border border-black/10 shadow-sm hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};
