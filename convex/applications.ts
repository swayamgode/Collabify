import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateApplicationStatus = mutation({
    args: {
        applicationId: v.id("applications"),
        status: v.union(
            v.literal("pending"),
            v.literal("under_review"),
            v.literal("approved"),
            v.literal("rejected")
        ),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.applicationId, {
            status: args.status,
        });
    },
});

export const createApplication = mutation({
    args: {
        campaignId: v.id("campaigns"),
        influencerId: v.id("influencers"),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        // Prevent duplicate applications
        const existing = await ctx.db
            .query("applications")
            .withIndex("by_campaignId", (q) => q.eq("campaignId", args.campaignId))
            .filter((q) => q.eq(q.field("influencerId"), args.influencerId))
            .unique();

        if (existing) {
            throw new Error("Already applied to this campaign");
        }

        return await ctx.db.insert("applications", {
            ...args,
            status: "pending",
            appliedAt: Date.now(),
        });
    },
});

export const getInfluencerApplications = query({
    args: { influencerId: v.id("influencers") },
    handler: async (ctx, args) => {
        const apps = await ctx.db
            .query("applications")
            .withIndex("by_influencerId", (q) => q.eq("influencerId", args.influencerId))
            .collect();

        return await Promise.all(
            apps.map(async (app) => {
                const campaign = await ctx.db.get(app.campaignId);
                const brand = campaign ? await ctx.db.get(campaign.brandId) : null;
                return {
                    ...app,
                    campaigns: {
                        ...campaign,
                        brands: { company_name: brand?.companyName },
                    },
                };
            })
        );
    },
});
