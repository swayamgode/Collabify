import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const convex = new ConvexHttpClient("https://posh-dotterel-818.convex.cloud");

async function seedTestUser() {
    try {
        // Get one campaign to find the brandId
        const campaigns = await convex.query(api.campaigns.getCampaigns, {});
        if (!campaigns.length) {
            console.log("No campaigns found!");
            return;
        }

        // Get the brand
        const brandId = campaigns[0].brandId;
        console.log("Campaign brandId:", brandId);

        // Directly query the brand record (use getBrandByProfile if we know profileId)
        // Let's try to find the profile linked to this brand
        // We don't have a getBrandById query, so let's check the profile linked to brand

        // Create a test user and link to this brand's profile
        // First create the user
        const email = "swayam@collabify.com";
        const password = "swayam123"; // will be hashed

        // Hash: sha256 of "swayam123"
        // Let's just print what we know

        console.log("To log in as the brand that owns these campaigns:");
        console.log("1. Go to http://localhost:3001/signup");
        console.log("2. Sign up with email: swayam@collabify.com, role: Brand");
        console.log("3. This creates a new brand, then you can create new campaigns");
        console.log("");
        console.log("OR - Let me create a seed user for you...");

        // Try creating a user
        try {
            const userId = await convex.mutation(api.users.createUser, {
                email,
                password: require('crypto').createHash('sha256').update(password).digest('hex'),
                role: "brand"
            });
            console.log("Created test user with ID:", userId);
        } catch (e) {
            if (e.message && e.message.includes("User already exists")) {
                console.log("User already exists, try logging in with:", email, password);
            } else {
                console.log("Create user error:", e.message);
            }
        }
    } catch (e) {
        console.error("Failed:", e);
    }
}

seedTestUser();
