import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProduct = mutation({
    args: {
        brandId: v.id("brands"),
        name: v.string(),
        description: v.string(),
        category: v.string(),
        targetAudience: v.optional(v.string()),
        images: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("products", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const getBrandProducts = query({
    args: { brandId: v.id("brands") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("products")
            .withIndex("by_brandId", (q) => q.eq("brandId", args.brandId))
            .order("desc")
            .collect();
    },
});

export const getProduct = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.productId);
    },
});
