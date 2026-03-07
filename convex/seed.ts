import { mutation } from "./_generated/server";

export const seedInfluencers = mutation({
    args: {},
    handler: async (ctx) => {
        const influencers = [
            {
                fullName: "Alex Rivera",
                role: "influencer" as const,
                userId: "mock_alex",
                niche: ["Tech", "Gaming"],
                followerCount: 150000,
                handle: "alex_builds",
                youtubeChannelId: "UCX6OQ3DkcsbYNE6H8uQQuVA", // MrBeast for demo
                verified: true,
            },
            {
                fullName: "Sarah Chen",
                role: "influencer" as const,
                userId: "mock_sarah",
                niche: ["Beauty", "Fashion"],
                followerCount: 85000,
                handle: "sarahstyles",
                youtubeChannelId: "UC-lHJZR3Gqxm24_Vd_AJ5Yw", // PewDiePie for demo
                verified: true,
            },
            {
                fullName: "Marcus Knight",
                role: "influencer" as const,
                userId: "mock_marcus",
                niche: ["Fitness", "Wellness"],
                followerCount: 220000,
                handle: "marcus_fit",
                youtubeChannelId: "UC788vJ0NIn8VvM4E8L-O1XQ",
                verified: false,
            },
            {
                fullName: "Elena Gomez",
                role: "influencer" as const,
                userId: "mock_elena",
                niche: ["Gaming", "Esports"],
                followerCount: 45000,
                handle: "elena_plays",
                youtubeChannelId: "UC_UfD0Yf1-285L0n_S_yvjw",
                verified: true,
            },
            {
                fullName: "David Wang",
                role: "influencer" as const,
                userId: "mock_david",
                niche: ["Tech", "AI"],
                followerCount: 12000,
                handle: "davidaicreator",
                youtubeChannelId: "UCvXhpx6-n6M_fN8F7Qp3Tig",
                verified: false,
            }
        ];

        for (const inf of influencers) {
            // Check if profile exists
            const existing = await ctx.db
                .query("profiles")
                .withIndex("by_userId", (q) => q.eq("userId", inf.userId))
                .unique();

            if (!existing) {
                const profileId = await ctx.db.insert("profiles", {
                    userId: inf.userId,
                    fullName: inf.fullName,
                    role: "influencer",
                    updatedAt: Date.now(),
                    isVerified: inf.verified,
                    verificationStatus: inf.verified ? "verified" : "unverified",
                });

                await ctx.db.insert("influencers", {
                    profileId,
                    socialHandle: inf.handle,
                    youtubeChannelId: inf.youtubeChannelId, // Added
                    niche: inf.niche,
                    followerCount: inf.followerCount,
                    platforms: ["Instagram", "Twitter", "YouTube"],
                });
            }
        }

        // Also seed the current user as a brand if not exists
        const brandUser = {
            userId: "user_123",
            fullName: "Collabify Admin",
            company: "Collabify Corp",
        };

        const existingBrand = await ctx.db
            .query("profiles")
            .withIndex("by_userId", (q) => q.eq("userId", brandUser.userId))
            .unique();

        if (!existingBrand) {
            const profileId = await ctx.db.insert("profiles", {
                userId: brandUser.userId,
                fullName: brandUser.fullName,
                role: "brand",
                updatedAt: Date.now(),
                isVerified: true,
                verificationStatus: "verified",
            });

            await ctx.db.insert("brands", {
                profileId,
                companyName: brandUser.company,
                industry: "Technology",
            });
        }

        return "Seeding completed!";
    },
});
