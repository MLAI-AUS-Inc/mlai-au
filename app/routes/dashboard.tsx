import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";

export function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Check if we are on the esafety subdomain
    const isEsafety = hostname.startsWith("esafety.");

    if (isEsafety) {
        return redirect("/esafety/app");
    }

    return redirect("/platform/dashboard");
}
