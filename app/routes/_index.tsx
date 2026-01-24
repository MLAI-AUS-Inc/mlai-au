import type { Route } from "./+types/_index";
import { useLoaderData } from "react-router";
import HackathonPage from "./hackathon";
import HomePage from "./home";
import { fetchSubstackPosts } from "~/lib/substack";
import { fetchEvents } from "~/lib/events";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Check if we are on the esafety subdomain
    // This logic handles:
    // - esafety.mlai.au (Production)
    // - esafety.localhost (Local development)
    const isEsafety = hostname.startsWith("esafety.");

    let eventsPromise;
    let substackPostsPromise;

    if (!isEsafety) {
        const env = getEnv(context) as unknown as Record<string, any>;
        eventsPromise = fetchEvents({
            humanitixApiKey: env.PRIVATE_HUMANITIX_API_KEY,
            lumaApiKey: env.LUMA_API_KEY,
        });
        substackPostsPromise = fetchSubstackPosts();
    }

    return {
        isEsafety,
        events: eventsPromise,
        substackPosts: substackPostsPromise
    };
}

export default function Index() {
    const { isEsafety, events, substackPosts } = useLoaderData<typeof loader>();

    if (isEsafety) {
        return <HackathonPage />;
    }

    return <HomePage events={events as Promise<any>} substackPosts={substackPosts as Promise<any>} />;
}
