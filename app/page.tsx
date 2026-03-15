"use client";

import Link from "next/link";
import Scene from "@/components/Scene";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  Sun,
  Moon
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
  id: number | string;
  x: number;
  y: number;
  fullScreen?: boolean;
}

export default function Home() {
  const [scrolledState, setScrolled] = useState(false);
  const scrolled = scrolledState;
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const dropIdCounter = useRef(0);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleThemeToggle = (x: number, y: number) => {
    setIsDarkMode((prev) => {
      const newIsDark = !prev;
      if (newIsDark) {
        setDrops(d => [...d.filter(drop => drop.id !== 'theme-toggle'), { id: 'theme-toggle', x, y, fullScreen: true }]);
      } else {
        setDrops(d => d.filter(drop => drop.id !== 'theme-toggle'));
      }
      return newIsDark;
    });
  };

  const NavbarContent = ({ layer, isInteractive }: { layer: 'base' | 'reveal', isInteractive: boolean }) => {
    const isReveal = layer === 'reveal';
    const isScrolled = scrolled;
    const pointerEvents = isInteractive ? 'pointer-events-auto' : 'pointer-events-none';

    return (
      <>
        <div className="w-64 hidden lg:block" />
        {/* Navigation Wrapper - Identical padding and size */}
        <nav className={`flex items-center gap-6 px-6 py-2 rounded-full transition-all duration-200 ${pointerEvents} ${isReveal
          ? "bg-transparent border-transparent"
          : isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border border-black/5"
            : "bg-white/50 backdrop-blur-md border border-black/5"
          }`}>
          <Link href="/" className={`text-sm font-bold transition-colors ${isReveal ? "text-white" : "text-black"}`}>Home</Link>
          <Link href="#" className={`text-sm font-bold transition-colors ${isReveal ? "text-white/80" : "text-black/50 hover:text-black"}`}>Contact</Link>
          <Link href="#" className={`text-sm font-bold transition-colors ${isReveal ? "text-white/80" : "text-black/50 hover:text-black"}`}>Influencers</Link>
          <Link href="#" className={`text-sm font-bold transition-colors ${isReveal ? "text-white/80" : "text-black/50 hover:text-black"}`}>About</Link>
        </nav>

        {/* Auth Group - Identical spacing */}
        <div className={`flex items-center gap-6 min-w-[250px] justify-end ${pointerEvents}`}>
          <button 
            tabIndex={isInteractive ? 0 : -1}
            onClick={(e) => {
              if (mainRef.current && isInteractive) {
                const rect = mainRef.current.getBoundingClientRect();
                const btnReact = e.currentTarget.getBoundingClientRect();
                const x = btnReact.left + btnReact.width / 2 - rect.left;
                const y = btnReact.top + btnReact.height / 2 - rect.top;
                handleThemeToggle(x, y);
              }
            }}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${isReveal ? "text-white hover:bg-white/10" : "text-black hover:bg-black/10"}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/login" tabIndex={isInteractive ? 0 : -1} className={`text-sm font-bold transition-colors ${isReveal ? "text-white" : "text-black"}`}>Login</Link>
          <Link
            href="/signup"
            tabIndex={isInteractive ? 0 : -1}
            className={`px-6 py-2 text-sm font-bold rounded-full transition-all hover:scale-105 shadow-xl ${isReveal
              ? "bg-white text-black"
              : "bg-black text-white"
              }`}
          >
            Get Started
          </Link>
        </div>
      </>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      {/* Base Layer Header - Stays Black */}
      <header className={`fixed top-0 left-10 right-10 z-[100] py-8 flex items-center justify-between pointer-events-none transition-opacity duration-300 opacity-100`}>
        <NavbarContent layer="base" isInteractive={!isDarkMode} />
      </header>

      <main ref={mainRef} className="flex-1 relative">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-40 pb-32 px-6 flex flex-col items-center min-h-[95vh] cursor-none group bg-white">
          <div className="absolute left-8 top-8 w-24 h-24 flex items-center justify-center z-[60] pointer-events-auto">
            <img
              src="/logocollabify.png"
              alt="Collabify Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* 1. Base Layer (Bottom Text) */}
          <motion.div
            style={{ y: heroY }}
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

          {/* 3. Character Videos (Fixed Background) */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
            <div className="absolute left-0 bottom-[-6%] w-[38%] max-w-[550px]">
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply grayscale opacity-100 contrast-[5] brightness-[1.1]"
              >
                <source src="/analyticman.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="absolute right-0 bottom-[-18%] w-[35%] max-w-[550px]">
              <video
                autoPlay loop muted playsInline
                className="w-full h-auto mix-blend-multiply opacity-100 contrast-[5] brightness-[1.1]"
              >
                <source src="/selfiewomen.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Feature Grid - Clean Overlap transition */}
        <section className="relative bg-white flex flex-col items-center">
          <div className="py-48 flex flex-col items-center w-full relative z-10 bg-white">
            <div className="mb-6">
              <div className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                The Toolkit
              </div>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-center mb-36 font-serif">
              Tools that move <br />
              as fast as you do.
            </h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        duration: 0.8,
                        bounce: 0.4
                      }
                    }
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-gray-50/50 border border-gray-100 p-10 rounded-[3rem] flex flex-col hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group cursor-default"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.highlight} flex items-center justify-center mb-10 border border-black/5 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-5 group-hover:text-black transition-colors">{feature.title}</h3>
                  <p className="text-black/40 font-bold text-sm leading-relaxed mb-10 group-hover:text-black/60 transition-colors">
                    {feature.desc}
                  </p>
                  <Link href="#" className="mt-auto text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-black group-hover:gap-6 transition-all duration-500">
                    LEARN MORE <ChevronRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-24 px-6 sm:px-12 border-none relative z-[100]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">
            <div className="flex items-center gap-3">
              <span className="text-black text-lg font-black tracking-tighter lowercase">collabify.</span>
            </div>
            <div className="flex gap-10">
              <span>© 2026 Collabify Labs Inc.</span>
              <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-black transition-colors">Terms</Link>
            </div>
          </div>
        </footer>

        {/* --- REVEAL LAYER FULL PAGE --- */}
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full z-[105] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0">
            <mask id="fluidMask">
              <g className="heavy-fluid">
                <AnimatePresence>
                  {drops.map((drop) => (
                    <motion.circle
                      key={drop.id}
                      initial={{ r: 0, opacity: 0 }}
                      animate={{ r: drop.fullScreen ? 5000 : 180, opacity: 1 }}
                      exit={{ r: 0, opacity: 0, transition: { duration: 0.5, ease: "circIn" } }}
                      cx={drop.x}
                      cy={drop.y}
                      fill="white"
                      transition={drop.fullScreen ? { duration: 1.2, ease: "anticipate" } : undefined}
                    />
                  ))}
                </AnimatePresence>
              </g>
            </mask>
          </svg>
          <motion.div
            style={{
              maskImage: 'url(#fluidMask)',
              WebkitMaskImage: 'url(#fluidMask)'
            }}
            className="absolute top-0 left-0 right-0 h-full min-h-[150vh] bg-black text-white translate-z-0 pb-[20rem]"
          >
            {/* Reveal Layer Header - Turns White Only Where Fluid Is */}
            <header className="fixed top-0 left-10 right-10 z-[110] py-8 flex items-center justify-between pointer-events-none">
              <NavbarContent layer="reveal" isInteractive={isDarkMode} />
            </header>

            {/* Subtle Stars Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
              {/* Cluster 1 */}
              <div className="absolute top-[2%] left-[10%] w-[1.5px] h-[1.5px] bg-white rounded-full blur-[0.2px] animate-pulse" />
              <div className="absolute top-[8%] left-[80%] w-[1px] h-[1px] bg-white rounded-full" />
              <div className="absolute top-[15%] left-[15%] w-[1.8px] h-[1.8px] bg-white rounded-full blur-[0.4px]" />
              <div className="absolute top-[20%] left-[85%] w-[1.2px] h-[1.2px] bg-white rounded-full animate-pulse" />
              <div className="absolute top-[30%] left-[25%] w-[1px] h-[1px] bg-white rounded-full" />
              
              {/* Added more stars throughout the height */}
              <div className="absolute top-[45%] left-[55%] w-[1.8px] h-[1.8px] bg-white rounded-full blur-[0.4px] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[60%] left-[92%] w-[1px] h-[1px] bg-white rounded-full" />
              <div className="absolute top-[75%] left-[38%] w-[1.4px] h-[1.4px] bg-white rounded-full" />
              <div className="absolute top-[85%] left-[70%] w-[1.2px] h-[1.2px] bg-white rounded-full blur-[0.2px]" />
              <div className="absolute top-[95%] left-[12%] w-[1px] h-[1px] bg-white rounded-full opacity-50" />
            </div>

            {/* Reveal Content - Hero Twin */}
            <div className="relative pt-40 pb-32 px-6 flex flex-col items-center min-h-[95vh]">
              <motion.div
                style={{ y: heroY }}
                className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center"
              >
                <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] font-[800] tracking-[-0.03em] mb-8 leading-[1.05] text-white">
                  Create, lead, win. <br />
                  The future is yours.
                </h1>
                <p className="text-base sm:text-lg text-white/60 font-medium mb-10 max-w-2xl px-4 leading-relaxed">
                  Unlock exclusive tools and viral strategies <br className="hidden md:block" /> built for the next generation of brands.
                </p>
                <Link href="/signup" className="pointer-events-auto h-12 px-10 bg-white text-black text-sm font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
                  Get Collabify free <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Reveal Phase Characters */}
              <div className="absolute inset-x-0 bottom-[-100px] top-0 pointer-events-none z-0 hidden sm:block">
                <div className="absolute left-[-6%] bottom-[22%] w-[48%] max-w-[650px]">
                  <video autoPlay loop muted playsInline className="w-full h-auto opacity-100 contrast-[5] brightness-[1.5] grayscale">
                    <source src="/floating man.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="absolute right-[2%] bottom-[8%] w-[30%] max-w-[450px]">
                  <video autoPlay loop muted playsInline className="w-full h-auto opacity-100 contrast-[5] brightness-[1.5]">
                    <source src="/womenfloating.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            {/* Reveal Content - The Toolkit Twin (Dark Mode) */}
            <div className="py-48 flex flex-col items-center w-full relative z-10 bg-transparent">
              <div className="mb-6">
                <div className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                  The Toolkit
                </div>
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-center mb-36 font-serif text-white">
                Tools that move <br />
                as fast as you do.
              </h2>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] flex flex-col hover:bg-black hover:border-zinc-700 transition-all duration-500 group cursor-default shadow-xl"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feature.highlight.replace('50', '20')} flex items-center justify-center mb-10 border border-white/5`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-5 text-white">{feature.title}</h3>
                    <p className="text-white/40 font-bold text-sm leading-relaxed mb-10 group-hover:text-white/70 transition-colors">
                      {feature.desc}
                    </p>
                    <Link href="#" className="mt-auto text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white">
                      LEARN MORE <ChevronRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Reveal Content - Footer Twin (Dark Mode) */}
            <footer className="bg-transparent py-24 px-6 sm:px-12 border-none">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                <div className="flex items-center gap-3">
                  <span className="text-white text-lg font-black tracking-tighter lowercase">collabify.</span>
                </div>
                <div className="flex gap-10">
                  <span>© 2026 Collabify Labs Inc.</span>
                  <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </div>
              </div>
            </footer>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
