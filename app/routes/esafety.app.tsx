import type { Route } from "./+types/esafety.app";
import { redirect, Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import EsafetyAppLayout from "~/components/EsafetyAppLayout";
import { getEnv } from "~/lib/env.server";

import type { User } from "~/types/user";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    // 1. Extract the cookie header from the incoming browser request
    const cookieHeader = request.headers.get("Cookie");

    // 2. Forward it to the backend API call
    const response = await fetch("http://esafety.localhost/api/v1/auth/me/", {
        headers: {
            "Content-Type": "application/json",
            // CRITICAL: Pass the cookies so the backend knows who we are
            "Cookie": cookieHeader || "",
        },
    });

    if (response.status === 401) {
        throw redirect("/platform/login?next=/esafety/app/dashboard");
    }

    const user = await response.json();

    if (!user) {
        return redirect("/platform/login?next=/esafety/app/dashboard");
    }

    // Enforce esafety subdomain
    const url = new URL(request.url);
    const hostname = url.hostname;
    // Allow localhost for testing if needed, but primarily check for 'esafety.' prefix
    // In production/dev with custom domains, this ensures we are on the right "app"
    if (!hostname.startsWith("esafety.")) {
        // Redirect to main platform dashboard if accessed via wrong domain
        // You might want to show a 404 or a specific error page instead
        return redirect("/platform/dashboard");
    }

    return { user: user as User };
}

export default function EsafetyApp() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <EsafetyAppLayout user={user}>
            <Outlet />
        </EsafetyAppLayout>
    );
}
