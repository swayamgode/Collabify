'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
    imageUrls: string[];
}

export function LoadingScreen({ onComplete, imageUrls }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isExit, setIsExit] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const total = imageUrls.length || 1;

        if (imageUrls.length === 0) {
            // Fake progress if no images
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setIsExit(true), 500);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
            return () => clearInterval(interval);
        }

        const handleImageLoad = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / total) * 100);
            setProgress(newProgress);

            if (loadedCount >= total) {
                setTimeout(() => setIsExit(true), 800);
            }
        };

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Continue even if error
        });
    }, [imageUrls]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {!isExit && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative mb-12"
                    >
                        <img 
                            src="/logocollabify.png" 
                            alt="Logo" 
                            className="w-24 h-24 object-contain brightness-0 invert opacity-40"
                        />
                        <motion.div 
                            className="absolute inset-0 bg-white"
                            style={{ 
                                clipPath: `inset(${100 - progress}% 0 0 0)`,
                                mixBlendMode: 'difference'
                            }}
                        />
                    </motion.div>

                    <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-1">
                        <motion.span 
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Synchronizing Neural Engine
                        </motion.span>
                        <span className="text-[10px] font-mono text-white/20">
                            {progress}%
                        </span>
                    </div>

                    {/* Ambient Background Glow */}
                    <motion.div 
                        className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.15, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
