"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const springConfig = { damping: 30, stiffness: 200, restDelta: 0.001 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="cursor-glow fixed top-0 left-0 hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};
