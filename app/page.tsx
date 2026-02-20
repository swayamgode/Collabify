"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Target, Zap, ChevronRight, TrendingUp, Shield, BarChart3, Globe, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const stats = [
    { value: "10K+", label: "Creators" },
    { value: "500+", label: "Brands" },
    { value: "$2M+", label: "Paid Out" },
    { value: "98%", label: "Satisfaction" },
  ];

  const features = [
    {
      icon: <Target size={28} />,
      title: "Surgical Targeting",
      desc: "Our AI identifies the exact audience overlap between your brand and creator communities.",
    },
    {
      icon: <Zap size={28} />,
      title: "Rapid Deployment",
      desc: "Go from campaign brief to live posts in record time with automated contracting.",
    },
    {
      icon: <Users size={28} />,
      title: "Creator Advocacy",
      desc: "Foster long-term relationships that result in organic brand loyalty and higher LTV.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Precision Analytics",
      desc: "Track real-time ROI, engagement rates, and campaign performance across all platforms.",
    },
    {
      icon: <Shield size={28} />,
      title: "Verified Creators",
      desc: "Every creator is verified and vetted to ensure brand safety and authentic audiences.",
    },
    {
      icon: <Globe size={28} />,
      title: "Global Reach",
      desc: "Access a diverse network of creators spanning every niche and geography worldwide.",
    },
  ];

  const testimonials = [
    {
      quote: "Collabify has completely transformed how we source talent. The quality is unmatched.",
      name: "Sarah K.",
      role: "Marketing Director, TechCo",
    },
    {
      quote: "We tripled our brand reach in one quarter. The ROI tracking alone is worth it.",
      name: "Marcus L.",
      role: "Growth Lead, StyleBrand",
    },
    {
      quote: "As a creator, Collabify simplified my brand partnerships and boosted my earnings significantly.",
      name: "Priya M.",
      role: "Content Creator, 500K followers",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F7] overflow-x-hidden selection:bg-black selection:text-white">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5 px-6 sm:px-12 backdrop-blur-xl bg-white/60 border-b border-gray-200/60">
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
            <Link href="/signup" className="group px-6 py-3 rounded-full text-sm font-bold bg-black text-white hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
              Get Started <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-6 sm:px-12 min-h-[90vh] flex flex-col justify-center overflow-hidden">
          {/* Ambient blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/20 blur-[150px] rounded-full -z-10 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 blur-[150px] rounded-full -z-10" />

          <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-black mb-12 tracking-widest uppercase"
            >
              <Sparkles size={14} className="text-black" />
              <span className="text-gray-700">Next-Gen Influence Engine</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl sm:text-[110px] font-black tracking-tighter leading-[0.85] text-black mb-10"
            >
              UNLEASH YOUR <br />
              <span className="italic font-serif text-gray-400">DIGITAL REACH.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-500 max-w-3xl mb-16 leading-relaxed font-bold italic"
            >
              The premium destination for world-class creators and disruptive brands.
              Forge alliances that define the future of culture.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 mb-24"
            >
              <Link href="/signup?role=brand" className="group px-14 py-6 rounded-full bg-black text-white font-black text-xl flex items-center gap-3 hover:bg-gray-900 transition-all shadow-2xl hover:shadow-black/30 ring-4 ring-black/5">
                Launch Brand Campaign <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/signup?role=influencer" className="px-14 py-6 rounded-full bg-white border-2 border-gray-200 text-black font-black text-xl hover:bg-gray-50 transition-all shadow-sm">
                Join as Creator
              </Link>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-8 bg-white rounded-[32px] border border-gray-100 shadow-lg px-10 py-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-black text-black tracking-tight">{stat.value}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="creators" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-4"
              >
                How It Works
              </motion.div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-black leading-[0.9]">
                THREE STEPS <br />
                <span className="text-gray-200">TO IMPACT.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-16 left-[22%] right-[22%] h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0" />

              {[
                {
                  step: "01",
                  icon: <TrendingUp size={32} />,
                  title: "Post Your Campaign",
                  desc: "Define your goals, budget, and ideal creator profile in minutes using our smart form.",
                },
                {
                  step: "02",
                  icon: <Users size={32} />,
                  title: "Match With Creators",
                  desc: "Our AI instantly surfaces the most relevant verified creators for your brand.",
                },
                {
                  step: "03",
                  icon: <Star size={32} />,
                  title: "Launch & Track ROI",
                  desc: "Approve partnerships, run campaigns, and monitor real-time analytics—all in one place.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative z-10 flex flex-col items-center text-center p-10 rounded-[40px] bg-[#F5F5F7] border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 text-xs font-black tracking-widest">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-[18px] bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-4">{step.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-4"
              >
                Platform Features
              </motion.div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-black leading-[0.9]">
                BUILT FOR <br />
                <span className="text-gray-200">SCALE.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="w-16 h-16 rounded-[20px] bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed flex-1">{feature.desc}</p>
                  <div className="pt-6 mt-6 border-t border-gray-50 text-black font-black flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer text-sm">
                    Learn More <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="strategy" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-4"
              >
                Testimonials
              </motion.div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-black leading-[0.9]">
                REAL RESULTS, <br />
                <span className="text-gray-200">PROVEN IMPACT.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[40px] bg-[#F5F5F7] border border-gray-100 flex flex-col gap-6"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="black" className="text-black" />
                    ))}
                  </div>
                  <p className="text-gray-700 font-bold text-lg leading-relaxed italic">"{t.quote}"</p>
                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <p className="font-black text-black">{t.name}</p>
                    <p className="text-sm text-gray-400 font-bold">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist / Value Props */}
        <section className="py-24 px-6 bg-[#F5F5F7]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-[48px] p-16 shadow-sm"
            >
              <h3 className="text-4xl font-black tracking-tight mb-12 text-center">Why Collabify?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Smart AI-powered creator matching",
                  "Automated contracts & payments",
                  "Real-time campaign analytics",
                  "Brand safety & creator vetting",
                  "Dedicated account management",
                  "Multi-platform campaign support",
                  "Transparent pricing, no surprises",
                  "24/7 priority support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle size={20} className="text-black shrink-0" />
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto rounded-[80px] bg-black p-16 sm:p-32 relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

            <div className="relative z-10">
              <h2 className="text-5xl sm:text-[90px] font-black tracking-tighter text-white mb-12 leading-[0.85]">
                STOP WAITING. <br />
                <span className="italic font-serif text-gray-500">START DOMINATING.</span>
              </h2>
              <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-16 font-bold leading-relaxed">
                Join the exclusive circle of brands scaling beyond limits. Your next viral campaign starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <Link href="/signup" className="group px-16 py-7 rounded-full bg-white text-black font-black text-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
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

      {/* Footer */}
      <footer className="py-24 px-6 sm:px-12 bg-[#F5F5F7] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="text-4xl font-black tracking-tighter text-black">
              COLLABIFY<span className="text-gray-400">.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              {["Platform", "Network", "Enterprise", "Journal", "Careers"].map((link) => (
                <Link key={link} href="#" className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all">
                  {link}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-8">
              {["𝕏", "IG", "LI"].map((social) => (
                <span key={social} className="text-xl font-black cursor-pointer hover:scale-125 transition-transform">{social}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-200">
            <div className="text-xs font-black text-gray-300 uppercase tracking-widest">
              Built by Visionaries for Visionaries.
            </div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
              © 2024 COLLABIFY. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
