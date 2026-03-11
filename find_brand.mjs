import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const convex = new ConvexHttpClient("https://posh-dotterel-818.convex.cloud");

async function findBrandForCampaign() {
    try {
        // First get all campaigns to find their brandIds
        const campaigns = await convex.query(api.campaigns.getCampaigns, {});
        console.log("Number of campaigns:", campaigns.length);
        if (campaigns.length > 0) {
            console.log("First campaign brandId:", campaigns[0].brandId);
            console.log("First campaign _id:", campaigns[0]._id);

            // Now check all brands
            // Can't list all brands but we know the brandId from campaign
        }
    } catch (e) {
        console.error("Failed:", e);
    }
}

findBrandForCampaign();
