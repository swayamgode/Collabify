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
  useSpring,
  AnimatePresence,
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

interface Drop {
  id: number;
  x: number;
  y: number;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isRevealMode, setIsRevealMode] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const dropIdCounter = useRef(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isRevealMode) {
        const newDrop = {
          id: dropIdCounter.current++,
          x: e.clientX,
          y: e.clientY
        };

        setDrops(prev => [...prev, newDrop]);

        // Remove drop after 6 seconds (Persistence)
        setTimeout(() => {
          setDrops(prev => prev.filter(d => d.id !== newDrop.id));
        }, 6000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isRevealMode]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-black selection:text-white antialiased overflow-x-hidden relative font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Georgia', serif; }
        
        .heavy-fluid {
           filter: url('#strong-gooey');
        }
      `}</style>

      {/* Strong Gooey Filter for even stronger liquid tension */}
      <svg className="hidden">
        <defs>
          <filter id="strong-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 65 -32" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <CustomCursor />

      <header className="fixed top-0 left-10 right-10 z-[100] py-8 flex items-center justify-between">
        {/* Empty left space to balance the logo (which is absolute) */}
        <div className="w-64 hidden lg:block" />

        {/* Centered Navigation Pill */}
        <nav className={`flex items-center gap-6 px-6 py-2 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg border border-black/5" : "bg-white/50 backdrop-blur-md border border-black/5"} rounded-full transition-all duration-300`}>
          <Link href="/" className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full">Home</Link>
          <Link href="#" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Contact</Link>
          <Link href="#" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Influencers</Link>
          <Link href="#" className="text-sm font-bold text-black/60 hover:text-black transition-colors">About</Link>
        </nav>

        {/* Right Aligned Auth Links */}
        <div className="flex items-center gap-6 min-w-[250px] justify-end">
          <Link href="/login" className="text-sm font-bold text-black hover:text-black/60 transition-colors">Login</Link>
          <Link href="/signup" className="px-6 py-2 bg-black text-white text-sm font-bold rounded-full transition-transform hover:scale-105 shadow-lg shadow-black/10">Get Started</Link>
        </div>
      </header>

      <main className="flex-1">
        <section ref={heroRef} className="relative pt-40 pb-32 px-6 flex flex-col items-center min-h-[95vh] cursor-none group bg-white">

          {/* Collabify Amoeba Logo Trigger */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              borderRadius: [
                "0% 100% 70% 100% / 0% 70% 100% 100%",
                "0% 100% 42% 100% / 0% 45% 100% 44%",
                "0% 100% 58% 100% / 0% 45% 100% 55%",
                "0% 100% 62% 100% / 0% 44% 100% 59%",
                "0% 100% 70% 100% / 0% 70% 100% 100%",
              ]
            }}
            transition={{
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 },
              borderRadius: {
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            onMouseEnter={() => setIsRevealMode(true)}
            className="absolute left-0 top-0 w-80 h-80 bg-black z-[60] flex items-center justify-center transition-all active:scale-95 group/trigger overflow-hidden cursor-pointer pointer-events-auto"
          >
            <div className="absolute left-10 top-10 w-32 h-32 flex items-center justify-center">
              <img
                src="/logocollabify.png"
                alt="Collabify Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* 1. Base Layer (Bottom Text) */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none"
          >
            <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] font-[800] tracking-[-0.03em] mb-8 leading-[1.05] text-black">
              Discover, plan, scale. <br />
              With Influence at your side.
            </h1>
            <p className="text-base sm:text-lg text-black/60 font-medium mb-10 max-w-2xl px-4 leading-relaxed">
              Collabify is the connected workspace where high-growth brands <br className="hidden md:block" /> and creators build culture together.
            </p>
            <Link href="/signup" className="pointer-events-auto h-12 px-10 bg-black text-white text-sm font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
              Get Collabify free <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* 2. Stronger Liquid Reveal Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg width="100%" height="110%" className="absolute inset-0">
              <mask id="fluidMask">
                <g className="heavy-fluid">
                  <AnimatePresence>
                    {drops.map((drop) => (
                      <motion.circle
                        key={drop.id}
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: 120, opacity: 1 }}
                        exit={{ r: 0, opacity: 0, transition: { duration: 1.2, ease: "circIn" } }}
                        cx={drop.x}
                        cy={drop.y}
                        fill="white"
                      />
                    ))}
                  </AnimatePresence>
                </g>
              </mask>
            </svg>

            <motion.div
              style={{
                y: heroY,
                opacity: heroOpacity,
                maskImage: 'url(#fluidMask)',
                WebkitMaskImage: 'url(#fluidMask)'
              }}
              className="absolute top-0 left-0 right-0 bottom-[-100px] bg-black text-white pt-40 flex flex-col items-center text-center translate-z-0"
            >
              <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] font-[800] tracking-[-0.03em] mb-8 leading-[1.05] text-white">
                  Create, lead, win. <br />
                  The future is yours.
                </h1>
                <p className="text-base sm:text-lg text-white/60 font-medium mb-10 max-w-2xl px-4 leading-relaxed">
                  Unlock exclusive tools and viral strategies <br className="hidden md:block" /> built for the next generation of brands.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3. Character Videos (Fixed Background) */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
            <div className="absolute left-0 bottom-[5%] w-[38%] max-w-[550px]">
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply grayscale opacity-100 contrast-[5] brightness-[1.1]"
              >
                <source src="/analyticman.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="absolute right-0 bottom-[-5%] w-[35%] max-w-[550px]">
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply opacity-100 contrast-[5] brightness-[1.1]"
              >
                <source src="/selfiewomen.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
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

      {/* Footer */}
      <footer className="bg-white py-24 px-6 sm:px-12 border-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">
          <div className="flex items-center gap-3">
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
