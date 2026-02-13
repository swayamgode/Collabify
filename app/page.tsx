"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play, Users, Target, Zap, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const influencers = [
    "/Gemini_Generated_Image_251jse251jse251j.png",
    "/Gemini_Generated_Image_7yqwvs7yqwvs7yqw.png",
    "/Gemini_Generated_Image_8kczx78kczx78kcz.png",
    "/Gemini_Generated_Image_adans2adans2adan.png",
    "/Gemini_Generated_Image_hiv2dhiv2dhiv2dh.png",
  ];

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#F5F5F7] overflow-x-hidden selection:bg-black selection:text-white">
      {/* Navigation - Ultra Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 sm:px-12 backdrop-blur-xl bg-white/40 border-b border-white/20">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter text-black flex items-center gap-1"
          >
            COLLABIFY<span className="text-gray-400">.</span>
          </motion.div>
          <nav className="hidden md:flex gap-10 items-center">
            {["Features", "Creators", "Strategy"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-gray-500 hover:text-black transition-all hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-gray-700 hover:text-black transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="group px-6 py-3 rounded-full text-sm font-bold bg-black text-white hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
              Get Started <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Cinematic Hero Section */}
        <section className="relative pt-48 pb-32 px-6 sm:px-12 min-h-[90vh] flex flex-col justify-center overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/20 blur-[150px] rounded-full -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 blur-[150px] rounded-full -z-10 animate-pulse duration-700"></div>

          {/* Floating Characters - Hero Integration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden sm:block hidden">
            <motion.img
              src={influencers[0]}
              initial={{ x: -100, y: 100, opacity: 0, rotate: -12 }}
              animate={{ x: 100, y: 150, opacity: 0.4, rotate: -5 }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute left-0 top-1/4 w-64 grayscale opacity-20"
            />
            <motion.img
              src={influencers[4]}
              initial={{ x: 100, y: -50, opacity: 0, rotate: 12 }}
              animate={{ x: -50, y: 0, opacity: 0.4, rotate: 5 }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute right-0 top-1/3 w-72 grayscale opacity-20"
            />
            <motion.img
              src={influencers[2]}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 100, opacity: 0.3 }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute left-1/4 bottom-0 w-56 grayscale opacity-10"
            />
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-black mb-12 tracking-widest uppercase"
            >
              <div className="flex -space-x-2">
                {influencers.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 object-contain grayscale" />
                ))}
              </div>
              <span className="text-gray-700">Next-Gen Influence Engine</span>
              <Sparkles size={14} className="text-black" />
            </motion.div>

            <div className="relative inline-block">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl sm:text-[120px] font-black tracking-tighter leading-[0.85] text-black mb-12 relative z-10"
              >
                UNLEASH YOUR <br />
                <span className="italic font-serif text-gray-400">DIGITAL REACH.</span>
              </motion.h1>

              {/* Supporting Characters next to Title with Labels */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -left-48 top-0 hidden lg:flex flex-col items-center gap-2 group/char"
              >
                <img
                  src={influencers[1]}
                  className="w-40 grayscale group-hover/char:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer"
                />
                <div className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-full opacity-0 group-hover/char:opacity-100 transition-opacity uppercase tracking-tighter">
                  @vanguard_creator
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -right-48 bottom-0 hidden lg:flex flex-col items-center gap-2 group/char"
              >
                <div className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-full opacity-0 group-hover/char:opacity-100 transition-opacity uppercase tracking-tighter">
                  @digital_pioneer
                </div>
                <img
                  src={influencers[3]}
                  className="w-40 grayscale group-hover/char:grayscale-0 transition-all duration-500 hover:scale-110 cursor-pointer"
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-500 max-w-3xl mb-16 leading-relaxed font-bold italic"
            >
              The premium destination for world-class creators and disruptive brands.
              Forge alliances that define the future of culture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 mb-24"
            >
              <Link href="/signup?role=brand" className="group px-14 py-6 rounded-full bg-black text-white font-black text-xl flex items-center gap-3 hover:bg-gray-900 transition-all shadow-2xl hover:shadow-black/30 ring-4 ring-black/5">
                Launch Brand Campaign <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/signup?role=influencer" className="px-14 py-6 rounded-full bg-white border-2 border-gray-100 text-black font-black text-xl hover:bg-gray-50 transition-all shadow-sm">
                Join as Creator
              </Link>
            </motion.div>

            {/* Video Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-full max-w-5xl relative group/video"
            >
              <div className="absolute -inset-4 bg-gradient-to-b from-gray-200 to-transparent blur-2xl opacity-50"></div>

              {/* Overlapping Character for Depth */}
              <motion.img
                src={influencers[4]}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute -right-20 -top-20 w-64 hidden xl:block z-20 grayscale brightness-110 drop-shadow-2xl hover:grayscale-0 transition-all cursor-alias"
              />

              <div className="relative rounded-[48px] overflow-hidden border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-black group cursor-pointer aspect-video sm:aspect-auto sm:h-[600px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

                <div className="absolute bottom-12 left-12 right-12 flex flex-col sm:flex-row justify-between items-end gap-6 text-left">
                  <div className="glass p-8 rounded-[32px] border border-white/20 backdrop-blur-2xl">
                    <p className="text-xs font-black uppercase tracking-widest text-black/50 mb-2">Exclusive Preview</p>
                    <h3 className="text-3xl font-black text-black">Precision Analytics Dashboard</h3>
                    <p className="text-gray-500 font-bold mt-2">Track real-time ROI across all platforms.</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black shadow-2xl"
                  >
                    <Play fill="black" size={32} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Creator Network Section */}
        <section id="creators" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-6"
                >
                  Verified Creators
                </motion.div>
                <h2 className="text-5xl sm:text-8xl font-black tracking-tighter text-black leading-[0.9]">
                  ELITE TALENT, <br />
                  <span className="text-gray-200">PROVEN IMPACT.</span>
                </h2>
              </div>
              <p className="text-xl text-gray-500 font-bold max-w-md italic mb-4">
                "Collabify has completely transformed how we source talent. The quality is unmatched."
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {influencers.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group aspect-[3/4] rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 cursor-cell"
                >
                  <img
                    src={src}
                    alt={`Creator ${i + 1}`}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-90 group-hover:scale-100"
                  />
                  <div className="absolute inset-x-6 bottom-6 glass p-6 rounded-[24px] border border-white/40 shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-black text-black">Elite Partner</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Now</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid - Precision Icons */}
        <section id="features" className="py-40 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Target size={32} />,
                  title: "Surgical Targeting",
                  desc: "Our AI identifies the exact audience overlap between your brand and creator communities.",
                  color: "blue"
                },
                {
                  icon: <Zap size={32} />,
                  title: "Rapid Deployment",
                  desc: "Go from campaign brief to live posts in record time with automated contracting.",
                  color: "purple"
                },
                {
                  icon: <Users size={32} />,
                  title: "Creator Advocacy",
                  desc: "Foster long-term relationships that result in organic brand loyalty and higher LTV.",
                  color: "black"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15 }}
                  className="p-12 rounded-[56px] bg-white border border-gray-100 shadow-premium hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all flex flex-col group h-full"
                >
                  <div className="w-20 h-20 rounded-[28px] bg-gray-50 flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 text-lg font-bold leading-relaxed mb-10 flex-1">{feature.desc}</p>
                  <div className="pt-8 border-t border-gray-50 text-black font-black flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer">
                    Deep Dive <ArrowRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Killer CTA Section */}
        <section className="py-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[80px] bg-black p-16 sm:p-32 relative overflow-hidden text-center"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

            <div className="relative z-10">
              <h2 className="text-5xl sm:text-[100px] font-black tracking-tighter text-white mb-12 leading-[0.85]">
                STOP WAITING. <br />
                <span className="italic font-serif text-gray-500 underline decoration-white/20 decoration-8 underline-offset-12">START DOMINATING.</span>
              </h2>

              <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-16 font-bold leading-relaxed">
                Join the exclusive circle of brands scaling beyond limits. Your next viral campaign starts here.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <Link href="/signup" className="group px-16 py-7 rounded-full bg-white text-black font-black text-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  Enter the Network
                </Link>
                <Link href="/contact" className="text-xl font-bold text-gray-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1">
                  Request Private Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Ultra Minimal Footer */}
      <footer className="py-32 px-6 sm:px-12 bg-[#F5F5F7] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
            <div className="text-4xl font-black tracking-tighter text-black">
              COLLABIFY<span className="text-gray-400">.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-12">
              {["Platform", "Network", "Enterprise", "Journal", "Careers"].map((link) => (
                <Link key={link} href="#" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all">
                  {link}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-8">
              {/* Social icons would go here, using names for now */}
              {["𝕏", "IG", "LI"].map(social => (
                <span key={social} className="text-xl font-black cursor-pointer hover:scale-125 transition-transform">{social}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-200">
            <div className="text-xs font-black text-gray-300 uppercase tracking-widest">
              Built by Visionaries for Visionaries.
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
              © 2024 COLLABIFY DIGITAL ASSETS. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

