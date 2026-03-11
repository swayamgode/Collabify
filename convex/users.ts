import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
    args: {
        email: v.string(),
        password: v.string(), // Hashed!
        role: v.union(v.literal("brand"), v.literal("influencer")),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (existing) {
            throw new Error("User already exists");
        }

        const userId = await ctx.db.insert("users", {
            email: args.email,
            password: args.password,
            role: args.role,
            createdAt: Date.now(),
        });

        return userId;
    },
});

export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
    },
});
