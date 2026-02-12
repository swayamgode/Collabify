import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background bg-gradient-mesh overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight text-gradient-primary">Collabify.</div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">How it Works</Link>
            <Link href="/login" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Login</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2 rounded-full text-sm font-medium text-foreground hover:bg-black/5 transition-colors hidden sm:block border border-gray-200">
              Log in
            </Link>
            <Link href="/signup" className="px-5 py-2 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-all shadow-lg">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-40 pb-20 max-w-5xl mx-auto relative">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/[0.02] blur-[120px] -z-10 rounded-full"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-xs font-medium mb-8">
          <Sparkles size={14} className="text-black" />
          <span className="text-secondary">New: Campaign Analytics</span>
        </div>

        <h1 className="text-5xl sm:text-8xl font-bold tracking-tight mb-8 leading-[1.05] text-foreground">
          Connect Brands with <br />
          <span className="text-secondary italic font-serif">Top Influencers.</span>
        </h1>

        <p className="text-lg text-secondary max-w-2xl mb-12 leading-relaxed">
          The all-in-one platform for managing influencer campaigns. Streamline collaboration, track performance, and scale your brand reach effortlessly.
        </p>

        <div className="flex flex-col sm:row gap-4 w-full sm:w-auto">
          <Link href="/signup?role=brand" className="group px-10 py-4 rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl">
            I'm a Brand <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/signup?role=influencer" className="px-10 py-4 rounded-full bg-white border border-gray-200 text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
            I'm an Influencer
          </Link>
        </div>

        {/* Social Proof / Features snippet */}
        <div className="mt-32 w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {[
            { title: "Verified Creators", desc: "Access a network of vetted influencers and creators." },
            { title: "Secure Payments", desc: "Automated escrow system for total peace of mind." },
            { title: "Real-time Metrics", desc: "Detailed ROI tracking with live dashbaords." },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white border border-gray-50 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
                <CheckCircle size={22} className="transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-secondary border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <p>© 2024 Collabify. All rights reserved.</p>
      </footer>
    </div>
  );
}
