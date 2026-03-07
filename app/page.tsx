"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CustomCursor } from "@/components/landing-page/CustomCursor";

const features = [
  {
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    title: "AI Neural Discovery",
    desc: "Our neural engine finds creators with specific brand DNA, not just vanity metrics.",
    highlight: "bg-purple-100/50"
  },
  {
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    title: "Global Payments",
    desc: "One-click international payouts with automated tax and escrow management.",
    highlight: "bg-blue-100/50"
  },
  {
    icon: <Zap className="w-5 h-5 text-rose-600" />,
    title: "Automated Workflows",
    desc: "Manage 100s of campaigns simultaneously without a single spreadsheet.",
    highlight: "bg-rose-100/50"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    title: "Enterprise Legal",
    desc: "Built-in contract generation and digital rights management for elite teams.",
    highlight: "bg-emerald-100/50"
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-black selection:text-white antialiased overflow-x-hidden relative font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Georgia', serif; }
      `}</style>

      <CustomCursor />

      {/* Navigation - Pixel Perfect Match */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-center">
        <nav className={`flex items-center gap-1 px-1.5 py-1.5 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg border border-black/5" : "bg-transparent"} rounded-full transition-all duration-300`}>
          <Link href="/" className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full">Home</Link>
          <Link href="#" className="px-4 py-2 text-sm font-bold text-black/60 hover:text-black transition-colors">Contact</Link>
          <Link href="#" className="px-4 py-2 text-sm font-bold text-black/60 hover:text-black transition-colors">Influencers</Link>
          <Link href="#" className="px-4 py-2 text-sm font-bold text-black/60 hover:text-black transition-colors mr-4">About</Link>

          <div className="flex items-center gap-2 ml-4">
            <Link href="/login" className="px-4 py-2 text-sm font-bold text-black">Login</Link>
            <Link href="/signup" className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full transition-transform hover:scale-105 active:scale-95">Get Started</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Exact Hero Section - Matching Text Size & Font Weight */}
        <section ref={heroRef} className="pt-64 pb-32 px-6 relative flex flex-col items-center min-h-[90vh]">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20"
          >
            <h1 className="text-2xl sm:text-4xl md:text-[4rem] font-[800] tracking-[-0.03em] mb-8 leading-[1.05] text-black">
              Discover, plan, scale. <br />
              With Influence at your side.
            </h1>

            <p className="text-base sm:text-lg text-black/60 font-medium mb-10 max-w-2xl px-4 leading-relaxed">
              Collabify is the connected workspace where high-growth brands <br className="hidden md:block" /> and creators build culture together.
            </p>

            <Link href="/signup" className="h-10 px-8 bg-black text-white text-sm font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
              Get Collabify free <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Videos - Sharp & Clear (mix-blend-multiply at 100% opacity, No White box) */}
          <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
            {/* Left analyticman video */}
            <motion.div
              style={{
                x: useTransform(springX, [0, 2000], [-30, 30]),
                y: useTransform(springY, [0, 1000], [-15, 15]),
              }}
              className="absolute left-0 bottom-[10%] w-[35%] max-w-[550px]"
            >
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply grayscale contrast-[1.6]"
              >
                <source src="/analyticman.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Right selfiewomen video */}
            <motion.div
              style={{
                x: useTransform(springX, [0, 2000], [30, -30]),
                y: useTransform(springY, [0, 1000], [15, -15]),
              }}
              className="absolute right-0 bottom-[-5%] w-[33%] max-w-[550px]"
            >
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply contrast-[1.6]"
              >
                <source src="/selfiewomen.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </section>

        {/* Feature Section - Exact Reference Match */}
        <section className="py-48 bg-white flex flex-col items-center">
          <div className="mb-6">
            <div className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
              The Toolkit
            </div>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-center mb-36 font-serif">
            Tools that move <br />
            as fast as you do.
          </h2>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50/50 border border-gray-100 p-10 rounded-[3rem] flex flex-col hover:bg-white hover:shadow-2xl transition-all duration-700 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.highlight} flex items-center justify-center mb-10 border border-black/5 shadow-sm group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-5">{feature.title}</h3>
                <p className="text-black/40 font-bold text-sm leading-relaxed mb-10">
                  {feature.desc}
                </p>
                <Link href="#" className="mt-auto text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-black group-hover:gap-6 transition-all duration-500">
                  LEARN MORE <ChevronRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white py-24 px-6 sm:px-12 border-t border-black/[0.03]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-bold">C.</div>
            <span className="text-black text-lg font-black tracking-tighter lowercase">collabify.</span>
          </div>
          <div className="flex gap-10">
            <span>© 2026 Collabify Labs Inc.</span>
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
