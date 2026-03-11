
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function dump() {
    try {
        const result = await convex.query(api.users.getUserByEmail, { email: "swayam@example.com" });
        console.log("User:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Dump failed:", e);
    }
}

dump();
