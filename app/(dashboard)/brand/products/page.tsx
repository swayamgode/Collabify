"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Sparkles, ShoppingBag, ArrowRight, Users, Wand2, Youtube, ExternalLink, Play, Eye } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { motion, AnimatePresence } from "framer-motion";
import { fetchInfluencerYouTubeStats } from "@/lib/actions/influencers";

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
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-black">Product Catalog</h1>
                    <p className="text-neutral-500 text-sm mt-1">Manage products and find AI-matched influencers.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className="gap-2 bg-black text-white hover:bg-neutral-800 transition-all rounded-md h-9 px-4 text-xs font-bold uppercase tracking-wider"
                >
                    {isAdding ? "Cancel" : <><Plus size={16} /> Add Product</>}
                </Button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <Card className="bg-white border hover:border-black/50 transition-colors border-black/20 shadow-none rounded-md mb-6">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-2">
                                    <Wand2 className="text-black" size={16} />
                                    <CardTitle className="text-black text-base font-bold uppercase tracking-wider">New Product Affinity Analysis</CardTitle>
                                </div>
                                <CardDescription className="text-neutral-500 text-xs">Describe your product to start the recommendation engine.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-black uppercase tracking-wider">Product Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g., Quantum X1 Smartwatch"
                                                className="bg-white border-black/20 text-black rounded-md h-10 text-sm focus-visible:ring-black"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-black uppercase tracking-wider">Primary Category</label>
                                            <Select
                                                value={formData.category}
                                                onValueChange={(val: string) => setFormData({ ...formData, category: val })}
                                            >
                                                <SelectTrigger className="bg-white border-black/20 text-black rounded-md h-10 text-sm focus:ring-black">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-black/20 text-black rounded-md">
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
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-black uppercase tracking-wider">Product Narrative</label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e: any) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="What makes this product special? We'll use this to find the right voices..."
                                            className="bg-white border-black/20 text-black rounded-md min-h-[100px] text-sm focus-visible:ring-black"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-black text-white hover:bg-neutral-800 h-10 rounded-md font-bold uppercase tracking-wider text-xs mt-2">
                                        Initialize Product & Scan Influencers
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-6">
                {!products ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 border border-black/10 border-dashed rounded-md">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black/20 border-r-2 border-black"></div>
                        <p className="text-neutral-500 text-sm font-medium animate-pulse">Synchronizing Catalog...</p>
                    </div>
                ) : products.length === 0 ? (
                    <Card className="bg-neutral-50 border-black/10 border-dashed py-20 rounded-md shadow-none text-center">
                        <div className="flex flex-col items-center gap-3">
                            <ShoppingBag size={32} className="text-neutral-400 mb-2" />
                            <div className="space-y-1">
                                <h3 className="text-lg font-black text-black">No active products</h3>
                                <p className="text-neutral-500 text-sm max-w-sm mx-auto">Your product catalog is empty. Add products to activate AI recommendations.</p>
                            </div>
                            <Button variant="outline" onClick={() => setIsAdding(true)} className="mt-6 border-black/20 text-black hover:bg-neutral-100 hover:border-black/40 h-9 px-6 rounded-md text-xs font-bold uppercase tracking-wider">
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

function ProductRecommendationCard({ product }: { product: any }) {
    const recommendations = useQuery(api.influencers.getRecommendedInfluencers, {
        productId: product._id
    });

    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        if (recommendations) {
            const timer = setTimeout(() => setIsScanning(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [recommendations]);

    return (
        <Card className="bg-white border-black/10 shadow-sm rounded-md relative group hover:border-black/30 transition-colors">
            <div className="p-6 flex flex-col lg:flex-row gap-8">
                {/* Product Side */}
                <div className="lg:w-1/3 flex flex-col">
                    <div className="flex-1">
                        <Badge className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-4 border-transparent">
                            {product.category}
                        </Badge>
                        <h2 className="text-xl font-black text-black leading-tight mb-2">{product.name}</h2>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-6 lg:mt-auto border-t border-black/5 lg:border-none">
                        <Button variant="outline" className="flex-1 lg:flex-none border-black/20 text-black hover:bg-neutral-100 rounded-md h-8 px-4 text-[10px] font-bold uppercase tracking-wider">
                            Manage
                        </Button>
                        <Button variant="ghost" className="flex-1 lg:flex-none text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-md h-8 px-4 text-[10px] font-bold uppercase tracking-wider">
                            Performance
                        </Button>
                    </div>
                </div>

                {/* AI Recommendations Side */}
                <div className="flex-1 bg-neutral-50 rounded-md p-6 border border-black/10 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isScanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div className="relative w-16 h-16 mb-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-[2px] border-dashed border-black/20 rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="text-black" size={24} />
                                    </div>
                                </div>
                                <h4 className="text-black font-black text-xs tracking-[0.2em] uppercase mb-1">Neural Matching</h4>
                                <p className="text-neutral-500 text-[10px] font-bold tracking-wider uppercase">Syncing data with {product.category} network...</p>

                                <motion.div
                                    initial={{ top: "-10%" }}
                                    animate={{ top: "110%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-60"
                                />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/5">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-black" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Creator Matches</h3>
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.1em] text-black bg-white px-2 py-1 rounded border border-black/10">
                            High Affinity
                        </div>
                    </div>

                    {!recommendations ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-black/5 animate-pulse rounded-md" />)}
                        </div>
                    ) : recommendations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-10 text-center"
                        >
                            <Users size={24} className="text-neutral-300 mx-auto mb-3" />
                            <p className="text-neutral-500 text-xs font-medium max-w-[200px] mx-auto">
                                No direct match found. Try fine-tuning product tags.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {recommendations.slice(0, 3).map((inf, idx) => (
                                <InfluencerItem key={inf._id} inf={inf} idx={idx} />
                            ))}
                        </div>
                    )}

                    {recommendations && recommendations.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                            <button className="text-neutral-500 text-[9px] font-black uppercase tracking-wider hover:text-black transition-colors flex items-center gap-1.5">
                                Explore Full Match List <ArrowRight size={12} />
                            </button>
                            <div className="text-[9px] text-black font-bold tracking-widest bg-black/5 px-2 py-1 rounded">
                                {recommendations.length} MATCHES
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col gap-3 p-4 rounded-md bg-white border border-black/10 hover:border-black/30 transition-colors group/inf shadow-sm"
        >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center text-black border border-black/10 font-black text-xl">
                            {inf.profile?.fullName?.[0] || "I"}
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 bg-black text-white border-2 border-white px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter">
                            {(inf.matchScore || 0)}%
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-black font-bold text-sm truncate">{inf.profile?.fullName || "Influencer"}</h4>
                            {inf.profile?.isVerified && (
                                <div className="w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="white" className="w-2 h-2"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {inf.matchReasons?.map((reason: string) => (
                                <span key={reason} className="text-[8px] text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-black/5 uppercase font-bold tracking-wider">
                                    {reason}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                    {inf.youtubeChannelId && (
                        <a
                            href={`https://youtube.com/channel/${inf.youtubeChannelId}`}
                            target="_blank"
                            className="p-1.5 bg-neutral-100 text-black rounded hover:bg-black hover:text-white transition-colors border border-black/5"
                        >
                            <Youtube size={14} />
                        </a>
                    )}
                    <Button variant="outline" className="border-black/20 text-black hover:bg-neutral-100 rounded h-7 px-3 text-[9px] font-bold uppercase tracking-wider">
                        Connect
                    </Button>
                </div>
            </div>

            {/* Analytics Subsection */}
            {inf.youtubeChannelId && (
                <div className="pt-3 border-t border-black/5 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-neutral-500">
                            <Users size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-wider">Subs</span>
                        </div>
                        <p className="text-black font-bold text-xs">
                            {loadingYt ? "..." : (ytStats?.subscriberCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-neutral-500">
                            <Eye size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-wider">Views</span>
                        </div>
                        <p className="text-black font-bold text-xs">
                            {loadingYt ? "..." : (ytStats?.viewCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-neutral-500">
                            <Play size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-wider">Vids</span>
                        </div>
                        <p className="text-black font-bold text-xs">
                            {loadingYt ? "..." : (ytStats?.videoCount || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="hidden sm:flex items-end justify-end">
                        <a
                            href={`https://youtube.com/channel/${inf.youtubeChannelId}`}
                            target="_blank"
                            className="text-[8px] font-bold text-black hover:text-neutral-600 flex items-center gap-1 uppercase tracking-wider"
                        >
                            View Channel <ExternalLink size={8} />
                        </a>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`inline-flex items-center border rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-2 ${className}`}>
            {children}
        </div>
    )
}

