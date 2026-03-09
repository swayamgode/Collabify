import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const convex = new ConvexHttpClient("https://posh-dotterel-818.convex.cloud");

async function dump() {
    try {
        const campaignId = "jd7feetd47rgya8g91e9246f4x82jvjv";
        const campaign = await convex.query(api.campaigns.getCampaignWithDetails, { campaignId: campaignId as any });

        if (!campaign) {
            console.log("No campaign found!");
            return;
        }

        const mapped = {
            ...campaign,
            id: campaign._id,
            applications: campaign.applications.map((app: any) => ({
                ...app,
                id: app._id,
                applied_at: new Date(app._creationTime).toISOString(),
                influencers: {
                    ...app.influencers,
                    profiles: {
                        ...app.influencers.profiles,
                        full_name: app.influencers.profiles?.full_name || 'Incognito'
                    }
                }
            }))
        };
        console.log("Mapped successfully:", !!mapped);
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
