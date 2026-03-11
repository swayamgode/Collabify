
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const convex = new ConvexHttpClient("https://posh-dotterel-818.convex.cloud");

async function dump() {
    try {
        const result = await convex.query(api.campaigns.getCampaignWithDetails, { campaignId: "jd7feetd47rgya8g91e9246f4x82jvjv" });
        console.log("Campaign:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
