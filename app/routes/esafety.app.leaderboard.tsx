import type { Route } from "./+types/esafety.app.leaderboard";
import { useLoaderData, redirect } from "react-router";
import { axiosInstance } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    // Leaderboard might be public, but let's require login for now as per plan context (or maybe not?)
    // Plan didn't explicitly say leaderboard is private, but it's part of the "app".
    // Let's allow public access but show user's team highlighted if logged in.

    let leaderboard = [];
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get("/api/v1/hackathons/esafety/leaderboard/", { headers });
        leaderboard = response.data;
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
    }

    return { user, leaderboard };
}

export default function EsafetyAppLeaderboard() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Leaderboard</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Coming Soon
                </p>
            </div>
        </main>
    );
}
