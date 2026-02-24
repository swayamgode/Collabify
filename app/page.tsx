"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles, Layout, MessageSquare, Briefcase, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const products = [
    {
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      title: "AI Discovery",
      badge: "Now with Q&A",
      desc: "Ask literally anything. Our AI will find the perfect creators for you.",
      color: "bg-purple-50"
    },
    {
      icon: <Layout className="w-5 h-5 text-rose-500" />,
      title: "Campaigns",
      desc: "Centralize your creator workflows. No more hunting for spreadsheets.",
      color: "bg-rose-50"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-blue-500" />,
      title: "Payments",
      desc: "Manage complex payouts and contracts without the chaos.",
      color: "bg-blue-50"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-amber-500" />,
      title: "Relations",
      desc: "Simple, powerful, beautiful. Long-term partner management.",
      color: "bg-amber-50"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans antialiased">

      {/* Navigation */}
      <header className="sticky top-0 z-50 py-4 px-6 sm:px-12 bg-white/80 backdrop-blur-md flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded flex items-center justify-center text-white text-xs font-bold">C.</div>
            <span className="text-lg font-bold tracking-tight">Collabify</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-600">
            {["Product", "Download", "Solutions", "Resources", "Pricing"].map((item) => (
              <div key={item} className="hover:text-black flex items-center gap-0.5 cursor-pointer">
                {item} <ChevronRight size={12} className="rotate-90" />
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-black">Request a demo</Link>
          <div className="w-[1px] h-4 bg-gray-200 hidden sm:block mx-1" />
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black">Log in</Link>
          <Link href="/signup" className="px-4 py-1.5 bg-black text-white text-sm font-bold rounded hover:bg-gray-800 transition-colors">
            Get Collabify free
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6 overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 leading-[1.1]"
            >
              Discover, plan, scale. <br />
              With Influence at your side.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xl sm:text-2xl text-gray-900 font-medium mb-10 max-w-2xl px-4"
            >
              Collabify is the connected workspace where high-growth brands and creators build culture together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/signup" className="inline-flex h-12 px-6 bg-black text-white text-lg font-bold rounded-lg items-center gap-2 hover:bg-gray-800 transition-all group">
                Get Collabify free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Illustration Section */}
        <section className="max-w-6xl mx-auto px-6 pb-32 pt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-full relative flex flex-col items-center"
          >
            {/* The "Scene" */}
            <div className="relative w-full flex items-end justify-center min-h-[400px] mb-12">

              {/* Ground Line - Hand Drawn Style */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[1px] bg-black/10" />

              {/* Left Character (The Creator) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative mb-0 flex flex-col items-center z-0"
              >
                {/* Floating Annotation: Message Bubble */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-12 -left-8 px-3 py-1 bg-white border-2 border-black rounded-2xl text-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 z-20"
                >
                  <MessageSquare size={10} fill="black" /> Hello!
                </motion.div>

                <img
                  src="/Gemini_Generated_Image_8kczx78kczx78kcz.png"
                  alt="Creative Influencer"
                  className="w-48 sm:w-64 h-auto mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </motion.div>

              {/* Center Character (The Platform) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10 -mx-12 -mb-2 flex flex-col items-center"
              >
                {/* Floating Annotation: Platform Badge */}
                <motion.div
                  animate={{ rotate: [12, -12, 12] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -top-4 -right-2 w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white z-20 shadow-lg"
                >
                  <span className="text-xs font-black">C.</span>
                </motion.div>

                <div className="relative">
                  <img
                    src="/Gemini_Generated_Image_251jse251jse251j.png"
                    alt="Collabify Core"
                    className="w-56 sm:w-80 h-auto mix-blend-multiply transition-transform hover:scale-105 duration-500"
                  />
                  {/* Highlight Glow behind center char */}
                  <div className="absolute inset-0 bg-blue-400/5 blur-3xl -z-10 rounded-full scale-75" />
                </div>
              </motion.div>

              {/* Right Character (The Brand) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative mb-0 flex flex-col items-center z-0"
              >
                {/* Floating Annotation: Analytics Card */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-8 -right-8 p-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col gap-1 z-20"
                >
                  <div className="w-8 h-1.5 bg-black rounded-full" />
                  <div className="flex gap-0.5 items-end h-6">
                    {[3, 6, 4, 8, 5].map((h, i) => (
                      <div key={i} className="w-1 bg-black rounded-t-full" style={{ height: `${h * 4}px` }} />
                    ))}
                  </div>
                </motion.div>

                <img
                  src="/Gemini_Generated_Image_adans2adans2adan.png"
                  alt="Brand Representative"
                  className="w-48 sm:w-64 h-auto mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </motion.div>
            </div>

            {/* Subtext under illustration */}
            <div className="flex items-center gap-12 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <span>Visionary Brands</span>
              <div className="w-12 h-[1px] bg-gray-200" />
              <span>Cultural Creators</span>
            </div>
          </motion.div>
        </section>

        {/* Product Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${product.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{product.title}</h3>
                      {product.badge && (
                        <span className="px-1.5 py-0.5 bg-purple-100 text-[10px] font-bold text-purple-600 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                  {product.desc}
                </p>
                <div className="mt-4 text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Learn more <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-50 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[10px] font-bold">C.</div>
            <span className="text-sm font-bold tracking-tight">Collabify</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-medium text-gray-500 mb-12">
            {["Product", "Company", "Resources", "Legal", "Social"].map(link => (
              <Link key={link} href="#" className="hover:text-black transition-colors">{link}</Link>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 font-medium">© 2026 Collabify Labs Inc.</p>
        </div>
      </footer>
    </div>
  );
}
