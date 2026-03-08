"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles, Layout, MessageSquare, Briefcase, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import Scene from "@/components/Scene";

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
    <div className="flex flex-col min-h-screen bg-transparent text-black selection:bg-black selection:text-white font-sans antialiased relative">
      <Scene />

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

      <main className="flex-1 w-full relative z-10">
        {/* Layer 1: Hero Section */}
        <section className="min-h-screen pt-20 pb-12 px-6 overflow-hidden flex flex-col justify-center bg-transparent pointer-events-none">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center pointer-events-auto">
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

        {/* Layer 2: Illustration Section */}
        <section className="min-h-screen max-w-6xl mx-auto px-6 py-20 bg-transparent flex flex-col justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-full relative flex flex-col items-center pointer-events-auto mt-20"
          >
            {/* Subtext overlay for 3D Scene */}
            <div className="flex items-center gap-6 sm:gap-12 text-[14px] font-black text-gray-800 uppercase tracking-[0.2em] bg-white/40 backdrop-blur-md px-8 py-4 rounded-full shadow-sm">
              <span>Visionary Brands</span>
              <div className="w-12 h-[2px] bg-black" />
              <span>Cultural Creators</span>
            </div>
          </motion.div>
        </section>

        {/* Layer 3: Product Grid */}
        <section className="min-h-screen w-full mx-auto px-6 py-32 bg-transparent pointer-events-none flex flex-col justify-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
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
