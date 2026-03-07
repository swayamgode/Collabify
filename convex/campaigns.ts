import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCampaigns = query({
    args: { search: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let campaigns = await ctx.db.query("campaigns").order("desc").collect();

        // Joint-like behavior: fetch brand names
        const campaignsWithBrands = await Promise.all(
            campaigns.map(async (campaign) => {
                const brand = await ctx.db.get(campaign.brandId);
                return {
                    ...campaign,
                    brands: { company_name: brand?.companyName },
                };
            })
        );

        if (args.search) {
            const searchLower = args.search.toLowerCase();
            return campaignsWithBrands.filter(
                (c) =>
                    c.title.toLowerCase().includes(searchLower) ||
                    c.description?.toLowerCase().includes(searchLower) ||
                    c.brands.company_name?.toLowerCase().includes(searchLower)
            );
        }

        return campaignsWithBrands;
    },
});

export const getBrandCampaigns = query({
    args: { brandId: v.id("brands") },
    handler: async (ctx, args) => {
        const campaigns = await ctx.db
            .query("campaigns")
            .withIndex("by_brandId", (q) => q.eq("brandId", args.brandId))
            .order("desc")
            .collect();

        return await Promise.all(
            campaigns.map(async (campaign) => {
                const applications = await ctx.db
                    .query("applications")
                    .withIndex("by_campaignId", (q) => q.eq("campaignId", campaign._id))
                    .collect();
                return {
                    ...campaign,
                    application_count: applications.length,
                };
            })
        );
    },
});

export const createCampaign = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("campaigns", {
            ...args,
            createdAt: Date.now(),
        });
    },
});
