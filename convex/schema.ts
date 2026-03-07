import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    profiles: defineTable({
        userId: v.string(), // This will be the ID from the auth provider (e.g., Clerk)
        updatedAt: v.number(),
        fullName: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
        role: v.union(v.literal("brand"), v.literal("influencer"), v.literal("admin")),
        bio: v.optional(v.string()),
        website: v.optional(v.string()),
        isVerified: v.boolean(),
        verificationStatus: v.union(
            v.literal("unverified"),
            v.literal("pending"),
            v.literal("verified"),
            v.literal("rejected")
        ),
    })
        .index("by_userId", ["userId"])
        .index("by_role", ["role"]),

    brands: defineTable({
        profileId: v.id("profiles"),
        companyName: v.string(),
        industry: v.optional(v.string()),
        preferredPlatforms: v.optional(v.array(v.string())),
    }).index("by_profileId", ["profileId"]),

    products: defineTable({
        brandId: v.id("brands"),
        name: v.string(),
        description: v.string(),
        category: v.string(), // e.g., "Tech", "Beauty", "Fashion"
        targetAudience: v.optional(v.string()),
        images: v.optional(v.array(v.string())),
        createdAt: v.number(),
    }).index("by_brandId", ["brandId"])
        .index("by_category", ["category"]),

    influencers: defineTable({
        profileId: v.id("profiles"),
        socialHandle: v.optional(v.string()),
        youtubeChannelId: v.optional(v.string()), // Added for YouTube integration
        niche: v.array(v.string()), // Changed to required for matching
        followerCount: v.optional(v.number()),
        platforms: v.optional(v.array(v.string())),
    }).index("by_profileId", ["profileId"]),

    campaigns: defineTable({
        brandId: v.id("brands"),
        title: v.string(),
        description: v.optional(v.string()),
        budget: v.optional(v.number()),
        deadline: v.optional(v.number()),
        status: v.union(
            v.literal("draft"),
            v.literal("active"),
            v.literal("completed"),
            v.literal("cancelled")
        ),
        minFollowers: v.optional(v.number()),
        requirements: v.optional(v.array(v.string())),
        createdAt: v.number(),
    }).index("by_brandId", ["brandId"])
        .index("by_status", ["status"]),

    connectionRequests: defineTable({
        brandId: v.id("brands"),
        influencerId: v.id("influencers"),
        status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("declined")),
        message: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_brand_influencer", ["brandId", "influencerId"]),

    applications: defineTable({
        campaignId: v.id("campaigns"),
        influencerId: v.id("influencers"),
        status: v.union(
            v.literal("pending"),
            v.literal("under_review"),
            v.literal("approved"),
            v.literal("rejected")
        ),
        message: v.optional(v.string()),
        appliedAt: v.number(),
    }).index("by_campaignId", ["campaignId"])
        .index("by_influencerId", ["influencerId"])
        .index("by_status", ["status"]),

    payments: defineTable({
        campaignId: v.optional(v.id("campaigns")),
        applicationId: v.optional(v.id("applications")),
        amount: v.number(),
        status: v.union(
            v.literal("pending"),
            v.literal("completed"),
            v.literal("failed"),
            v.literal("refunded")
        ),
        createdAt: v.number(),
    }).index("by_campaignId", ["campaignId"])
        .index("by_status", ["status"]),
});
