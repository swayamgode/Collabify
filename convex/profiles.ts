import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProfile = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("profiles")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .unique();
    },
});

// Alias for getProfileByUserId
export const getProfileByUserId = getProfile;

export const createProfile = mutation({
    args: {
        userId: v.string(),
        fullName: v.optional(v.string()),
        role: v.union(v.literal("brand"), v.literal("influencer"), v.literal("admin")),
        bio: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("profiles")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .unique();

        if (existing) {
            return existing._id;
        }

        return await ctx.db.insert("profiles", {
            userId: args.userId,
            fullName: args.fullName,
            role: args.role,
            bio: args.bio,
            updatedAt: Date.now(),
            isVerified: false,
            verificationStatus: "unverified",
        });
    },
});

export const updateProfile = mutation({
    args: {
        id: v.id("profiles"),
        fullName: v.optional(v.string()),
        bio: v.optional(v.string()),
        website: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});
