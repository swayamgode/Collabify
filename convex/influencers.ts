import { v } from "convex/values";
import { query } from "./_generated/server";

export const getRecommendedInfluencers = query({
    args: {
        productId: v.optional(v.id("products")),
        category: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        let targetCategory = args.category;

        if (args.productId) {
            const product = await ctx.db.get(args.productId);
            if (product) {
                targetCategory = product.category;
            }
        }

        if (!targetCategory) return [];

        const allInfluencers = await ctx.db.query("influencers").collect();
        const categoryLower = targetCategory.toLowerCase();

        // Joint-like behavior to fetch full profile details
        const influencersWithScores = await Promise.all(
            allInfluencers.map(async (influencer) => {
                const profile = await ctx.db.get(influencer.profileId);

                let score = 0;
                const matchReasons: string[] = [];

                // 1. Direct Category Match
                const isDirectMatch = influencer.niche.some(n => n.toLowerCase() === categoryLower);
                if (isDirectMatch) {
                    score += 60;
                    matchReasons.push("Direct niche match");
                } else {
                    // 2. Partial/Semantic Niche Match
                    const isPartialMatch = influencer.niche.some(n =>
                        n.toLowerCase().includes(categoryLower) || categoryLower.includes(n.toLowerCase())
                    );
                    if (isPartialMatch) {
                        score += 40;
                        matchReasons.push("Related interest match");
                    }
                }

                // 3. Follower Tier Bonus
                if ((influencer.followerCount || 0) > 100000) {
                    score += 15;
                    matchReasons.push("High reach");
                } else if ((influencer.followerCount || 0) > 10000) {
                    score += 10;
                    matchReasons.push("Established audience");
                }

                // 4. Verification Bonus
                if (profile?.isVerified) {
                    score += 10;
                    matchReasons.push("Verified creator");
                }

                return {
                    ...influencer,
                    profile,
                    matchScore: Math.min(score, 100),
                    matchReasons,
                };
            })
        );

        // Filter out low scores and sort
        return influencersWithScores
            .filter(inf => inf.matchScore > 10)
            .sort((a, b) => b.matchScore - a.matchScore);
    },
});

export const getInfluencerByProfile = query({
    args: { profileId: v.id("profiles") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("influencers")
            .withIndex("by_profileId", (q) => q.eq("profileId", args.profileId))
            .unique();
    },
});

export const listAllInfluencers = query({
    args: {},
    handler: async (ctx) => {
        const influencers = await ctx.db.query("influencers").collect();
        return await Promise.all(
            influencers.map(async (inf) => ({
                ...inf,
                profile: await ctx.db.get(inf.profileId),
            }))
        );
    },
});
