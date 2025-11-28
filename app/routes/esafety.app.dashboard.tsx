import type { Route } from "./+types/esafety.app.dashboard";
import { redirect, useLoaderData, Link } from "react-router";
import { backendFetch } from "~/lib/backend.server";
import { getCurrentUser } from "~/lib/auth";

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);
    if (!user) {
        return redirect("/platform/login?next=https://esafety.mlai.au/app"); // Adjust domain if needed, or use relative
    }

    // Fetch hackathon details
    const res = await backendFetch(env, "/api/v1/hackathons/esafety/", { method: "GET" });
    if (!res.ok) {
        throw new Response("Hackathon not found", { status: 404 });
    }
    const hackathon = await res.json();

    return { user, hackathon };
}

export default function EsafetyAppDashboard() {
    const { user, hackathon } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        {hackathon.name} Dashboard
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link
                        to="/platform/dashboard"
                        className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                    >
                        Back to Platform
                    </Link>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Team Card */}
                <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                    <div className="p-6">
                        <h3 className="text-base font-semibold leading-6 text-white">My Team</h3>
                        <p className="mt-2 text-sm text-gray-400">Manage your team members and details.</p>
                        <div className="mt-6">
                            <Link
                                to="/esafety/app/team"
                                className="text-sm font-semibold leading-6 text-teal-400 hover:text-teal-300"
                            >
                                Go to Team <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Submit Card */}
                <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                    <div className="p-6">
                        <h3 className="text-base font-semibold leading-6 text-white">Submit</h3>
                        <p className="mt-2 text-sm text-gray-400">Upload your predictions for scoring.</p>
                        <div className="mt-6">
                            <Link
                                to="/esafety/app/submit"
                                className="text-sm font-semibold leading-6 text-teal-400 hover:text-teal-300"
                            >
                                Make a Submission <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Card */}
                <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                    <div className="p-6">
                        <h3 className="text-base font-semibold leading-6 text-white">Leaderboard</h3>
                        <p className="mt-2 text-sm text-gray-400">See how you stack up against other teams.</p>
                        <div className="mt-6">
                            <Link
                                to="/esafety/app/leaderboard"
                                className="text-sm font-semibold leading-6 text-teal-400 hover:text-teal-300"
                            >
                                View Leaderboard <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
