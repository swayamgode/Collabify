"use client";

import Link from "next/link";
import { ArrowRight, Target, Zap, Users, BarChart3, Shield, Globe, Star, ChevronRight, Play, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import LandingBackground from "@/components/layout/LandingBackground";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mockupY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const stats = [
    { value: "10K+", label: "Creators" },
    { value: "500+", label: "Brands" },
    { value: "$2M+", label: "Payouts" },
    { value: "98%", label: "ROI" },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Audience Intelligence",
      desc: "Deep-dive into psychographic data to find the perfect creator-brand synergy.",
      color: "blue"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Velocity Engine",
      desc: "Go from concept to campaign live in minutes with our automated workflow.",
      color: "purple"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Creator Lifecycle",
      desc: "End-to-end management from initial discovery to long-term ambassadorship.",
      color: "rose"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Precision Tracking",
      desc: "Real-time attribution and ROI analysis for every single engagement point.",
      color: "indigo"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Brand Sovereignty",
      desc: "Enterprise-grade safety layers ensuring your brand is always protected.",
      color: "emerald"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      desc: "Connect with authentic voices across 60+ countries and niches.",
      color: "amber"
    },
  ];

  const brands = ["Nike", "Apple", "Red Bull", "Spotify", "Modern", "Vibe"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] },
    },
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#F5F5F7] text-black selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      <LandingBackground />

      {/* Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 sm:px-12 backdrop-blur-xl bg-white/40 border-b border-black/[0.03]"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-black rounded-[10px] flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-105 transition-transform">F.</div>
            <span className="text-xl font-bold tracking-[-0.05em] pt-0.5">COLLABIFY</span>
          </Link>

          <nav className="hidden lg:flex gap-10 items-center text-xs font-bold uppercase tracking-widest text-gray-400">
            {["Strategy", "Network", "Solutions", "Market"].map((item) => (
              <Link key={item} href="#" className="hover:text-black hover:tracking-[0.2em] transition-all duration-300">{item}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Login</Link>
            <Link href="/signup" className="h-10 px-6 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-premium active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-8 sm:px-12 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div
              variants={itemVariants}
              className="px-5 py-2 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-md text-[9px] uppercase tracking-[0.3em] font-black mb-10 shadow-sm"
            >
              Elevating Human Connection
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[64px] sm:text-[110px] md:text-[130px] font-black tracking-[-0.06em] leading-[0.88] mb-12"
            >
              POWERING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-black via-black/80 to-gray-400">CREATOR ERA.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-500 max-w-xl mb-16 font-medium leading-relaxed tracking-tight"
            >
              Where elite brands and cultural architects meet. <br className="hidden sm:block" />
              Intelligence-driven influence, delivered at scale.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 mb-32"
            >
              <Link href="/signup?role=brand" className="h-16 px-10 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full flex items-center gap-3 hover:bg-black/90 hover:px-12 transition-all shadow-premium active:scale-95 group">
                Build Campaign <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/signup?role=influencer" className="h-16 px-10 bg-white/60 backdrop-blur-md text-black text-sm font-bold uppercase tracking-widest rounded-full border border-black/5 flex items-center justify-center hover:bg-white/80 transition-all shadow-sm active:scale-95">
                Join Network
              </Link>
            </motion.div>

            {/* Premium Mockup */}
            <motion.div
              style={{ y: mockupY, scale: mockupScale }}
              className="w-full max-w-6xl aspect-[16/10] bg-white rounded-[40px] border border-black/[0.03] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative group p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none" />
              <div className="h-full w-full bg-[#fcfcfd] rounded-[38px] border border-black/[0.02] flex flex-col">
                <div className="h-12 border-b border-black/[0.03] flex items-center px-6 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-black/[0.05]" />
                    <div className="w-3 h-3 rounded-full bg-black/[0.05]" />
                    <div className="w-3 h-3 rounded-full bg-black/[0.05]" />
                  </div>
                  <div className="w-32 h-4 rounded-full bg-black/[0.03]" />
                  <div className="w-10 h-6 rounded-md bg-black text-white text-[8px] flex items-center justify-center font-bold">GO</div>
                </div>
                <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="h-32 rounded-2xl bg-black/[0.02] border border-black/[0.03] p-4 flex flex-col justify-end">
                      <div className="w-12 h-2 rounded-full bg-black/10 mb-2" />
                      <div className="w-full h-4 rounded-lg bg-black/5" />
                    </div>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-12 rounded-xl bg-black/[0.01] border border-black/[0.02]" />
                    ))}
                  </div>
                  <div className="col-span-9 space-y-6">
                    <div className="h-full rounded-3xl bg-white border border-black/[0.03] shadow-sm p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-3">
                          <div className="w-48 h-10 rounded-2xl bg-black/[0.04]" />
                          <div className="w-32 h-4 rounded-full bg-black/[0.02]" />
                        </div>
                        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
                          <BarChart3 size={24} />
                        </div>
                      </div>
                      <div className="h-48 w-full flex items-end gap-3 px-4">
                        {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: 1 + i * 0.05, duration: 1 }}
                            className="flex-1 bg-black/[0.06] rounded-t-lg relative group/bar hover:bg-black transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Brands Section */}
        <section className="py-20 border-y border-black/[0.03] bg-white/30 backdrop-blur-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 text-center mb-12">Trusted by visionary leadership</p>
            <div className="flex flex-wrap justify-between items-center gap-12 opacity-30 grayscale saturate-0 transition-all hover:grayscale-0 hover:opacity-100 duration-1000">
              {brands.map((brand) => (
                <span key={brand} className="text-2xl font-black tracking-tighter hover:text-black transition-colors cursor-default">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-3 group px-4"
                >
                  <span className="text-5xl font-black tracking-tighter group-hover:scale-110 transition-transform origin-left duration-500">{stat.value}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-40 px-8 sm:px-12" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-12 h-1 bg-black mb-8"
                />
                <h2 className="text-[44px] sm:text-[64px] font-black tracking-[-0.05em] leading-[0.9] mb-8">ENGINEERED FOR <br /> HIGH-LATENCY GROWTH.</h2>
                <p className="text-xl text-gray-500 font-medium tracking-tight max-w-lg leading-relaxed">We provide the technical backbone and cultural bridge for brands that refuse to settle for ordinary engagement.</p>
              </div>
              <Link href="#" className="font-bold text-[10px] uppercase tracking-widest border-b-2 border-black pb-2 hover:text-gray-400 hover:border-gray-200 transition-all">Explore Platform</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-[32px] bg-white border border-black/[0.03] shadow-premium hover:shadow-premium-hover transition-all duration-700 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Zap size={120} />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">{feature.desc}</p>
                  <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    Learn More <ChevronRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Noir CTA Section */}
        <section className="py-48 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/30 blur-[200px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-8 sm:px-12 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-16 inline-flex p-3 rounded-2xl border border-white/10 bg-white/5"
            >
              <Zap size={32} />
            </motion.div>
            <h2 className="text-6xl sm:text-[100px] font-black tracking-[-0.06em] leading-[0.85] mb-12">
              READY TO <br />
              <span className="text-gray-600 italic">DOMINATE?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-xl mx-auto mb-20 font-medium leading-relaxed tracking-tight">
              Join the ecosystem where attention is currency and authenticity is the only leverage that matters.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block group"
            >
              <Link href="/signup" className="inline-flex h-20 px-16 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full items-center justify-center transition-all shadow-[0_0_100px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_120px_rgba(255,255,255,0.2)]">
                Launch Now
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Global Network Section */}
        <section className="py-40 px-8 sm:px-12 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-10">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                <Globe size={14} /> The Intelligence Network
              </div>
              <h2 className="text-[44px] sm:text-[60px] font-black tracking-[-0.05em] leading-[0.95]">REACH WITHOUT <br /> FRICTION.</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">Our proprietary algorithm matches your brand DNA with the creators who already share your core values. No more guesswork.</p>

              <div className="space-y-4 pt-6">
                {["Proprietary Matching Engine", "Global Payment Rails", "Automated Compliance Check"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                      <Star size={12} fill="currentColor" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl aspect-square relative">
              <div className="absolute inset-0 bg-black rounded-[40px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="w-[80%] h-[80%] border border-white/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-[60%] h-[60%] border border-white/5 rounded-full" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="space-y-6 text-center">
                    <div className="text-7xl font-black text-white tracking-tighter">140+</div>
                    <div className="text-[10px] uppercase font-black tracking-[0.4em] text-white/50">Markets Integrated</div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 p-6 rounded-2xl bg-white shadow-premium border border-black/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500" />
                <div className="space-y-1">
                  <div className="w-16 h-2 rounded-full bg-black/10" />
                  <div className="w-12 h-2 rounded-full bg-black/5" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 p-6 rounded-3xl bg-white shadow-premium border border-black/5 flex flex-col gap-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200" />)}
                </div>
                <div className="w-24 h-3 rounded-full bg-black/5" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Footer Wrapper */}
        <section className="py-40 bg-[#F5F5F7] px-8 sm:px-12 text-center">
          <div className="max-w-4xl mx-auto rounded-[60px] bg-white p-20 sm:p-32 border border-black/[0.03] shadow-premium relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-transparent to-rose-50/10 pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl font-black tracking-[-0.06em] mb-10">THE FUTURE IS <br /> COLLABORATIVE.</h2>
            <p className="text-xl text-gray-400 mb-16 font-medium tracking-tight">Scale your brand through the power of authentic human connection.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/signup" className="h-16 px-12 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-premium active:scale-95">Get Started</Link>
              <Link href="/contact" className="h-16 px-12 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full border border-black/5 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">Talk to Sales</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-8 sm:px-12 border-t border-black/[0.03] bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
            <div className="space-y-6">
              <div className="text-2xl font-black tracking-tighter">F. COLLABIFY</div>
              <p className="text-sm text-gray-400 max-w-xs font-medium leading-relaxed">The premium operating system for the creator economy and high-growth brands.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-black">Company</div>
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                  {["About", "Network", "Careers", "Contact"].map(item => (
                    <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-black">Legal</div>
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                  {["Privacy", "Terms", "Security", "Ethics"].map(item => (
                    <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
                  ))}
                </div>
              </div>
              <div className="space-y-6 hidden sm:block">
                <div className="text-[10px] font-black uppercase tracking-widest text-black">Social</div>
                <div className="flex flex-col gap-4 text-sm font-bold text-gray-400">
                  {["Instagram", "Twitter", "LinkedIn", "YouTube"].map(item => (
                    <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/[0.03] flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300">
              © 2026 COLLABIFY INTERNATIONAL. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Systems Operational</span>
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">EST. 2024</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
