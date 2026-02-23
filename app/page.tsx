"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Target, Zap, ChevronRight, TrendingUp, Shield, BarChart3, Globe, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const stats = [
    { value: "10K+", label: "Verified Creators" },
    { value: "500+", label: "Global Brands" },
    { value: "$2M+", label: "Creator Earnings" },
    { value: "98%", label: "Brand Retention" },
  ];

  const features = [
    {
      icon: <Target size={24} />,
      title: "Audience Overlap",
      desc: "Our AI identifies the exact psychographic overlap between your brand and creator communities.",
    },
    {
      icon: <Zap size={24} />,
      title: "Auto-Briefing",
      desc: "Transform ideas into campaign briefs instantly with our proprietary LLM workflows.",
    },
    {
      icon: <Users size={24} />,
      title: "Creator Lifecycle",
      desc: "From discovery to long-term ambassador programs, manage everything in one premium space.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Real-time ROI",
      desc: "Every post tracked. Every click analyzed. Full transparency on your marketing spend.",
    },
    {
      icon: <Shield size={24} />,
      title: "Enterprise Safety",
      desc: "Multi-layer verification ensuring your brand only appears alongside brand-safe content.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Scale",
      desc: "Micro-influencers in Berlin or Mega-stars in NYC. Scale your reach across 40+ countries.",
    },
  ];

  const testimonials = [
    {
      quote: "The interface alone tells you this is a different class of platform. The performance back it up.",
      name: "Julian R.",
      role: "CMO, VentureStyle",
    },
    {
      quote: "Collabify didn't just find us influencers; they found us partners who actually love our brand.",
      name: "Elena G.",
      role: "Head of Growth, AuraBeauty",
    },
    {
      quote: "Finally, a platform that respects creators' time. The workflow is entirely friction-free.",
      name: "David K.",
      role: "Lifestyle Creator (1.2M)",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-black selection:bg-black selection:text-white">

      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-100/30 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-100/30 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-mesh opacity-40" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 sm:px-16 backdrop-blur-md bg-white/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-[-0.05em] flex items-center gap-1.5"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs">C.</div>
            COLLABIFY
          </motion.div>

          <nav className="hidden lg:flex gap-12 items-center text-sm font-semibold text-gray-400">
            {["Strategy", "Network", "Enterprise", "Market"].map((item) => (
              <Link key={item} href="#" className="hover:text-black transition-colors">{item}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-black">Login</Link>
            <Link href="/signup" className="h-11 px-6 bg-black text-white text-sm font-bold rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-glow active:scale-95">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-48 pb-32 px-8 sm:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-1 rounded-full border border-black/5 bg-white/50 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] font-black mb-12"
            >
              The New Standard of Influence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl sm:text-[120px] font-bold tracking-[-0.05em] leading-[0.9] mb-10"
            >
              FORGE YOUR <br />
              <span className="text-gray-300">LEGACY.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-2xl text-gray-500 max-w-2xl mb-16 font-medium leading-relaxed"
            >
              We connect visionary brands with creators who define culture.
              Zero noise. Pure performance. Scale without limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 mb-32"
            >
              <Link href="/signup?role=brand" className="h-16 px-12 bg-black text-white text-lg font-bold rounded-full flex items-center gap-3 hover:bg-gray-900 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                Build a Campaign <ArrowRight size={20} />
              </Link>
              <Link href="/signup?role=influencer" className="h-16 px-12 bg-white text-black text-lg font-bold rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">
                Join Network
              </Link>
            </motion.div>

            {/* Dashboard Mockup Preview */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              className="w-full max-w-6xl aspect-[16/9] bg-white rounded-[40px] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden relative group"
            >
              <div className="absolute inset-x-0 top-0 h-10 bg-gray-50 flex items-center px-6 gap-2 border-b border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="p-12 h-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 w-full">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-48 rounded-[24px] bg-gray-50 animate-pulse border border-gray-100" />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-8 sm:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileInView={{ opacity: [0, 1], y: [20, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-4xl font-bold tracking-tighter">{stat.value}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-40 px-8 sm:px-16" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl font-bold tracking-tight mb-6">Designed for those who lead.</h2>
                <p className="text-xl text-gray-500 font-medium">We built the engine. You drive the growth. Our tools are crafted to eliminate every barrier between your brand and viral potential.</p>
              </div>
              <div className="pb-2">
                <Link href="#" className="font-bold text-sm border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">See all features</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-10 rounded-[32px] bg-white border border-gray-50 shadow-sm hover:shadow-premium transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Value Prop Section */}
        <section className="py-40 bg-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-500 blur-[150px] rounded-full" />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-500 blur-[150px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-8 sm:px-16 relative z-10 text-center">
            <h2 className="text-5xl sm:text-[90px] font-bold tracking-[-0.05em] leading-[0.9] mb-12">
              WHY SETTLE FOR <br />
              <span className="text-gray-600 italic">ORDINARY?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto mb-20 font-medium leading-relaxed">
              Don't leave your brand to chance. Use the intelligence network that top-tier VCs and growth heads trust.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-left mb-24 max-w-5xl mx-auto">
              <div>
                <div className="text-3xl font-bold mb-4 text-white">4.2x</div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Average ROI vs Traditional Ads</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-4 text-white">2 Min</div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">To launch a global campaign</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-4 text-white">100%</div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Brand safe verified content</p>
              </div>
            </div>

            <Link href="/signup" className="inline-flex h-20 px-16 bg-white text-black text-2xl font-black rounded-full items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]">
              Enter Collabify
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-40 px-8 sm:px-16 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-24">
              <div className="w-12 h-1 bg-black mb-8" />
              <h2 className="text-4xl font-bold tracking-tight text-center">Loved by Growth Teams.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-12 rounded-[40px] bg-white border border-gray-100 flex flex-col items-center text-center group card-hover shadow-sm"
                >
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={14} fill="black" className="text-black" />
                    ))}
                  </div>
                  <p className="text-xl font-bold leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-black text-sm uppercase tracking-widest">{t.name}</p>
                    <p className="text-xs text-gray-400 font-bold mt-1 tracking-wider uppercase">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-40 bg-[#F8F9FA] px-8 sm:px-16 text-center">
          <div className="max-w-4xl mx-auto rounded-[60px] bg-white p-24 border border-gray-100 shadow-premium">
            <h2 className="text-5xl font-bold tracking-tight mb-8">Ready to dominate?</h2>
            <p className="text-xl text-gray-500 mb-12 font-medium">Join 500+ brands building the future of social commerce.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/signup" className="h-14 px-10 bg-black text-white font-bold rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-glow active:scale-95">Get Started</Link>
              <Link href="/contact" className="h-14 px-10 bg-white text-black font-bold rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm">Talk to Sales</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-8 sm:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-sm">
          <div className="text-xl font-black tracking-tighter">COLLABIFY</div>
          <div className="flex gap-12 font-bold text-gray-400">
            {["Privacy", "Terms", "Security", "About"].map(link => (
              <Link key={link} href="#" className="hover:text-black transition-colors">{link}</Link>
            ))}
          </div>
          <div className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">
            © 2024 COLLABIFY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
