import type { Route } from "./+types/api.notify-search-engines";
import { json } from "react-router";
import { getEnv } from "~/lib/env.server";
import { notifySearchEngines } from "~/lib/search-notifier";

function unauthorized(detail: string) {
    return json({ error: detail }, { status: 401 });
}

export async function action({ request, context }: Route.ActionArgs) {
    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405 });
    }

    const env = getEnv(context) as Record<string, string | undefined>;
    const apiKey = env.INTERNAL_API_KEY || env.SEARCH_NOTIFY_API_KEY;
    if (!apiKey) {
        return json({ error: "API key not configured" }, { status: 500 });
    }

    const authHeader = request.headers.get("authorization") || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
    const headerKey = request.headers.get("x-api-key") || undefined;

    if (bearerToken !== apiKey && headerKey !== apiKey) {
        return unauthorized("Unauthorized");
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch (error) {
        return json({ error: `Invalid JSON: ${String(error)}` }, { status: 400 });
    }

    const urls = Array.isArray((payload as any)?.urls) ? (payload as any).urls as string[] : [];
    const filtered = urls
        .map((url) => (typeof url === "string" ? url.trim() : ""))
        .filter(Boolean);

    const invalidUrls = filtered.filter((value) => {
        try {
            new URL(value);
            return false;
        } catch {
            return true;
        }
    });

    if (filtered.length === 0) {
        return json({ error: "Body must include `urls` as a non-empty string array." }, { status: 400 });
    }
    if (invalidUrls.length > 0) {
        return json({ error: `Invalid URLs: ${invalidUrls.join(", ")}` }, { status: 400 });
    }

    const googleEnabled = String(env.GOOGLE_INDEXING_ENABLED || "false").toLowerCase() === "true";
    const results = await notifySearchEngines(filtered, {
        indexNowKey: env.INDEXNOW_KEY,
        indexNowKeyLocation: env.INDEXNOW_KEY_LOCATION,
        googleIndexingEnabled: googleEnabled,
        googleCredentialsBase64: env.GOOGLE_INDEXING_CREDENTIALS,
    });

    const overallOk = results.indexNow.ok && (!googleEnabled || results.google.ok);
    const status = overallOk ? 200 : 207;

    return json(
        {
            ok: overallOk,
            results,
        },
        { status },
    );
}
