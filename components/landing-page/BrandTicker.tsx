"use client";

import { motion } from "framer-motion";

const brands = [
    "Luxe", "Aura", "Nova", "Flux", "Ember", "Pulse", "Zenith", "Apex", "Vera", "Kin", "Zen", "Onyx", "Velo", "Pure"
];

export const BrandTicker = () => {
    return (
        <div className="w-full py-20 overflow-hidden bg-white/30 backdrop-blur-sm border-y border-gray-100/50 mt-20 relative">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-6 mb-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] text-center">
                    TRUSTED BY THE WORLD'S MOST INNOVATIVE TEAMS
                </p>
            </div>

            <div className="relative flex">
                <motion.div
                    className="flex gap-24 whitespace-nowrap min-w-full items-center"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {[...brands, ...brands].map((brand, i) => (
                        <span
                            key={i}
                            className="text-4xl sm:text-6xl font-black text-gray-100 hover:text-black hover:scale-110 transition-all duration-500 cursor-default px-4 tracking-tighter"
                        >
                            {brand.toUpperCase()}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
