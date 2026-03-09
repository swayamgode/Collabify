import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const url = "https://posh-dotterel-818.convex.cloud"
const convex = new ConvexHttpClient(url);

async function dump() {
    try {
        const result = await convex.query(api.users.getUserByEmail, { email: "swayam@example.com" });
        console.log("User:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
