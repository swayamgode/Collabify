
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const convex = new ConvexHttpClient("https://posh-dotterel-818.convex.cloud");

async function dump() {
    try {
        const campaigns = await convex.query(api.campaigns.getCampaigns, {});
        console.log("Campaigns:", JSON.stringify(campaigns, null, 2));
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
