import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBrandByProfile = query({
    args: { profileId: v.id("profiles") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("brands")
            .withIndex("by_profileId", (q) => q.eq("profileId", args.profileId))
            .unique();
    },
});

export const getFirstBrand = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("brands").first();
    },
});


export const createBrand = mutation({
    args: {
        profileId: v.id("profiles"),
        companyName: v.string(),
        industry: v.optional(v.string()),
        preferredPlatforms: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("brands", {
            profileId: args.profileId,
            companyName: args.companyName,
            industry: args.industry,
            preferredPlatforms: args.preferredPlatforms,
        });
    },
});
