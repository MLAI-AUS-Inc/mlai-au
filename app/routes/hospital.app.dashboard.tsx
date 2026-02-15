import type { Route } from "./+types/hospital.app.dashboard";
import { redirect, useLoaderData, Link } from "react-router";
import { axiosInstance } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import { getCurrentUser } from "~/lib/auth";
import Leaderboard from "~/components/Leaderboard";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) {
        return redirect("/platform/login?next=/hospital/app/dashboard");
    }

    // Fetch hackathon details
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get("/api/v1/hackathons/hospital/", { headers });
        return { user, hackathon: response.data };
    } catch (error) {
        // Fallback to mock data if backend is missing
        console.warn("Hackathon API not found, using mock data");
        return {
            user,
            hackathon: {
                name: "Medhack: Frontiers",
                slug: "hospital",
                description: "Revolutionizing healthcare with AI.",
                start_date: "2025-01-01",
                end_date: "2025-01-02"
            }
        };
    }
}

export default function HospitalAppDashboard() {
    const { user, hackathon } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="w-full mx-auto space-y-6">
                {/* First Row */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column (7/12): Welcome Card */}
                    <div className="w-full lg:w-7/12 space-y-6">
                        <div className="relative w-full bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                Welcome to Medhack: Frontiers!
                            </h2>
                            <p className="max-w-2xl text-balance text-xl tracking-tight text-gray-900 mt-4">
                                Join us to build the future of medicine. Whether you're tackling AI for the first time
                                or building a game-changing solution, we've got you covered.
                            </p>
                            <Leaderboard />
                        </div>
                    </div>

                    {/* Right Column (5/12): Multiple Cards */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        {/* Submissions Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submissions</h3>
                            <p className="text-sm text-gray-700">
                                Ready to submit your project or AI model? Head to the submissions page here.
                            </p>
                            <Link
                                to="/hospital/app/submit"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Submissions
                            </Link>
                        </div>

                        {/* Team Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Team</h3>
                            <p className="text-sm text-gray-700">
                                Manage your team or join an existing one.
                            </p>
                            <Link
                                to="/hospital/app/team"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Team Management
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
