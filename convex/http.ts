import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/update-matches",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const body = await request.json();
        const { campaignId, matches } = body;

        if (!campaignId || !matches) {
            return new Response("Missing campaignId or matches", { status: 400 });
        }

        await ctx.runMutation(api.campaigns.updateAIMatches, {
            campaignId: campaignId,
            ai_matches: matches,
        });

        return new Response(null, { status: 200 });
    }),
});

export default http;
