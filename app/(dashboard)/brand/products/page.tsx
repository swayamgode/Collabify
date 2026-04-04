"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Sparkles, ShoppingBag, ArrowRight, Users, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandProductsPage() {
    // Mock Profile Access (linked to Clerk/Auth later)
    const mockProfileId = "user_123" as any;
    const profile = useQuery(api.profiles.getProfile, { userId: mockProfileId });
    const brand = useQuery(api.brands.getBrandByProfile, profile ? { profileId: profile._id } : "skip" as any);

    const products = useQuery(api.products.getBrandProducts, brand ? { brandId: brand._id } : "skip" as any);
    const createProduct = useMutation(api.products.createProduct);

    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brand) return;

        try {
            await createProduct({
                brandId: brand._id,
                name: formData.name,
                category: formData.category,
                description: formData.description,
            });
            toast.success("Product added successfully!");
            setIsAdding(false);
            setFormData({ name: "", category: "", description: "" });
        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-white mb-2">Product Catalog</h1>
                        <p className="text-gray-400 text-lg">Manage products and find AI-matched influencers.</p>
                    </div>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className="gap-2 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-2xl h-12 px-6"
                >
                    {isAdding ? "Cancel" : <><Plus size={20} /> Add Product</>}
                </Button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Wand2 className="text-purple-400" size={20} />
                                    <CardTitle className="text-white text-xl">New Product Affinity Analysis</CardTitle>
                                </div>
                                <CardDescription className="text-gray-400">Describe your product to start the recommendation engine.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Product Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g., Quantum X1 Smartwatch"
                                                className="bg-black/50 border-white/10 text-white rounded-xl h-12"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Primary Category</label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(val: string) => setFormData({ ...formData, category: val })}
                                            >
                                                <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl h-12">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-neutral-900 border-white/10 text-white">
                                                    <SelectItem value="Tech">Tech & Gadgets</SelectItem>
                                                    <SelectItem value="Fashion">Fashion & Apparel</SelectItem>
                                                    <SelectItem value="Beauty">Beauty & Cosmetics</SelectItem>
                                                    <SelectItem value="Fitness">Fitness & Wellness</SelectItem>
                                                    <SelectItem value="Gaming">Gaming</SelectItem>
                                                    <SelectItem value="Food">Food & Beverage</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">Product Narrative</label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="What makes this product special? We'll use this to find the right voices..."
                                            className="bg-black/50 border-white/10 text-white rounded-xl min-h-[120px]"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 h-14 rounded-xl font-black uppercase tracking-widest text-xs">
                                        Initialize Product & Scan Influencers
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-8">
                {!products ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white/20 border-r-2 border-white"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Synchronizing Catalog...</p>
                    </div>
                ) : products.length === 0 ? (
                    <Card className="bg-white/5 border-white/10 border-dashed p-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <ShoppingBag size={48} className="text-gray-600 mb-2" />
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-white">No active products</h3>
                                <p className="text-gray-500 max-w-md">Your product catalog is empty. Add products to activate AI recommendations.</p>
                            </div>
                            <Button variant="outline" onClick={() => setIsAdding(true)} className="mt-8 border-white/10 text-white hover:bg-white/5 h-12 px-8 rounded-2xl">
                                Start Cataloging
                            </Button>
                        </div>
                    </Card>
                ) : (
                    products.map((product) => (
                        <ProductRecommendationCard key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}

import { fetchInfluencerYouTubeStats } from "@/lib/actions/influencers";
import { Youtube, ExternalLink, Play, Eye } from "lucide-react";

function ProductRecommendationCard({ product }: { product: any }) {
    const recommendations = useQuery(api.influencers.getRecommendedInfluencers, {
        productId: product._id
    });

    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        if (recommendations) {
            const timer = setTimeout(() => setIsScanning(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [recommendations]);

    return (
        <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-500 rounded-[40px] relative">
            <div className="p-10 flex flex-col lg:flex-row gap-12">
                {/* Product Side */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            {product.category}
                        </Badge>
                    </div>
                    <h2 className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{product.name}</h2>
                    <p className="text-gray-400 leading-relaxed text-base font-medium opacity-80">
                        {product.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 rounded-2xl h-12 px-6 text-xs font-black uppercase tracking-widest">
                            Manage
                        </Button>
                        <Button variant="ghost" className="text-gray-600 hover:text-white rounded-2xl h-12 px-6 text-xs font-black uppercase tracking-widest">
                            Performance
                        </Button>
                    </div>
                </div>

                {/* AI Recommendations Side */}
                <div className="flex-1 bg-neutral-900/40 rounded-[32px] p-8 border border-white/5 relative overflow-hidden backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {isScanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-neutral-900/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative w-24 h-24 mb-6">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-[3px] border-dashed border-blue-500/40 rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="text-blue-400 animate-pulse" size={32} />
                                    </div>
                                </div>
                                <h4 className="text-white font-black text-sm tracking-[0.3em] uppercase mb-2">Neural Matching</h4>
                                <p className="text-gray-500 text-xs font-medium tracking-wide">Syncing data with {product.category} network...</p>

                                <motion.div
                                    initial={{ top: "-10%" }}
                                    animate={{ top: "110%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 shadow-[0_0_25px_rgba(59,130,246,0.8)]"
                                />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-400/10 rounded-xl">
                                <Sparkles size={20} className="text-yellow-400" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Creator Recommendations</h3>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.1em] text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                            High Affinity
                        </div>
                    </div>

                    {!recommendations ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-3xl" />)}
                        </div>
                    ) : recommendations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-16 text-center"
                        >
                            <Users size={32} className="text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm font-medium max-w-xs mx-auto">
                                Our network couldn't find a direct match yet.
                                <br />
                                Try fine-tuning your product tags.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5">
                            {recommendations.slice(0, 3).map((inf, idx) => (
                                <InfluencerItem key={inf._id} inf={inf} idx={idx} />
                            ))}
                        </div>
                    )}

                    {recommendations && recommendations.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <button className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2">
                                Explore Full Match List <ArrowRight size={14} />
                            </button>
                            <div className="text-[10px] text-gray-700 font-bold tracking-widest">
                                {recommendations.length} MATCHES FOUND
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}

function InfluencerItem({ inf, idx }: { inf: any, idx: number }) {
    const [ytStats, setYtStats] = useState<any>(null);
    const [loadingYt, setLoadingYt] = useState(false);

    useEffect(() => {
        async function getStats() {
            if (inf.youtubeChannelId) {
                setLoadingYt(true);
                try {
                    const stats = await fetchInfluencerYouTubeStats(inf.youtubeChannelId);
                    setYtStats(stats);
                } catch (error) {
                    console.error("Failed to fetch YT stats", error);
                } finally {
                    setLoadingYt(false);
                }
            }
        }
        getStats();
    }, [inf.youtubeChannelId]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col gap-4 p-6 rounded-[24px] bg-white/[0.03] hover:bg-white/[0.08] transition-all border border-white/5 group/inf hover:border-white/10"
        >
            <div className="flex items-center gap-5">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                        {inf.profile?.fullName?.[0] || "I"}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-black border border-white/10 px-2 py-1 rounded-lg">
                        <div className="text-[10px] font-black text-blue-400 tracking-tighter">{(inf.matchScore || 0)}%</div>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white font-black text-lg truncate tracking-tight">{inf.profile?.fullName || "Influencer"}</h4>
                        {inf.profile?.isVerified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {inf.matchReasons?.map((reason: string) => (
                            <span key={reason} className="text-[9px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 uppercase font-black tracking-wider">
                                {reason}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="hidden xl:flex flex-col items-end mr-4">
                    <div className="flex items-center gap-2 mb-1">
                        <a
                            href={inf.youtubeChannelId ? `https://youtube.com/channel/${inf.youtubeChannelId}` : '#'}
                            target="_blank"
                            className="p-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all group/yt"
                        >
                            <Youtube size={16} />
                        </a>
                        <Button variant="secondary" className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                            Connect
                        </Button>
                    </div>
                </div>
            </div>

            {/* Analytics Subsection */}
            {inf.youtubeChannelId && (
                <div className="mt-2 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Users size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Subscribers</span>
                        </div>
                        <p className="text-white font-bold text-sm">
                            {loadingYt ? "..." : (ytStats?.subscriberCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Eye size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Total Views</span>
                        </div>
                        <p className="text-white font-bold text-sm">
                            {loadingYt ? "..." : (ytStats?.viewCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Play size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Videos</span>
                        </div>
                        <p className="text-white font-bold text-sm">
                            {loadingYt ? "..." : (ytStats?.videoCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-end justify-end">
                        <a
                            href={inf.youtubeChannelId ? `https://youtube.com/channel/${inf.youtubeChannelId}` : '#'}
                            target="_blank"
                            className="text-[9px] font-black text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-widest"
                        >
                            View Channel <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// Simple Badge component since it might not be in the UI library yet
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`inline-flex items-center border rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-2 ${className}`}>
            {children}
        </div>
    )
}
