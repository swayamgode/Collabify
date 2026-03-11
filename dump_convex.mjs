
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function dump() {
    try {
        const campaigns = await convex.query(api.campaigns.getCampaigns, {});
        console.log("Campaigns:", JSON.stringify(campaigns, null, 2));
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
