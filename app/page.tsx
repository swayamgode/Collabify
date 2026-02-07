import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="py-6 px-4 sm:px-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tight">SocialConnector.</div>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-gray-600 transition-colors">How it Works</Link>
          <Link href="/login" className="text-sm font-medium hover:text-gray-600 transition-colors">Login</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/signup" className="px-6 py-2.5 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          New: Campaign Analytics
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Connect Brands with <br />
          <span className="text-gray-400">Top Influencers.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mb-12">
          The all-in-one platform for managing influencer campaigns. Streamline collaboration, track performance, and scale your brand reach effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/signup?role=brand" className="px-8 py-4 rounded-full bg-black text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
            I'm a Brand <ArrowRight size={18} />
          </Link>
          <Link href="/signup?role=influencer" className="px-8 py-4 rounded-full bg-white border border-gray-200 text-black font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
            I'm an Influencer
          </Link>
        </div>

        {/* Social Proof / Features snippet */}
        <div className="mt-24 w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {[
            { title: "Verified Creators", desc: "Access a network of vetted influencers." },
            { title: "Secure Payments", desc: "Automated escrow for peace of mind." },
            { title: "Real-time Metrics", desc: "Track ROI with detailed dashboards." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <CheckCircle size={20} className="text-black" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        <p>© 2024 SocialConnector. All rights reserved.</p>
      </footer>
    </div>
  );
}
