import type { Route } from "./+types/_index";
import { useLoaderData } from "react-router";
import HackathonPage from "./hackathon";
import HomePage from "./home";

export function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Check if we are on the esafety subdomain
    // This logic handles:
    // - esafety.mlai.au (Production)
    // - esafety.localhost (Local development)
    const isEsafety = hostname.startsWith("esafety.");

    return { isEsafety };
}

export default function Index() {
    const { isEsafety } = useLoaderData<typeof loader>();

    if (isEsafety) {
        return <HackathonPage />;
    }

    return <HomePage />;
}
