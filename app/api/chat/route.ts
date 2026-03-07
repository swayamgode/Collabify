// This route has been disabled as OpenAI integration was removed.
export async function POST(req: Request) {
    return new Response(JSON.stringify({ error: 'Chat feature is currently unavailable.' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
    });
}
