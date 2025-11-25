import type { Route } from "./+types/esafety.app.dashboard";
import { redirect, useLoaderData, Link } from "react-router";
import { axiosInstance } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import Leaderboard from "~/components/Leaderboard";

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);
    if (!user) {
        return redirect("/platform/login?next=/esafety/app/dashboard");
    }

    // Fetch hackathon details
    try {
        const response = await axiosInstance.get("/api/v1/hackathons/esafety/");
        return { user, hackathon: response.data };
    } catch (error) {
        throw new Response("Hackathon not found", { status: 404 });
    }
}

export default function EsafetyAppDashboard() {
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
                                Welcome to MedHack!
                            </h2>
                            <p className="max-w-2xl text-balance text-xl tracking-tight text-gray-900 mt-4">
                                Get ready to innovate in the healthcare space. Whether you're tackling AI for the first time
                                or building a game-changing solution, we've got you covered.
                            </p>
                            <Leaderboard />
                        </div>
                    </div>

                    {/* Right Column (5/12): Multiple Cards */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        {/* Kaggle Competition Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kaggle Competition</h3>
                            <p className="text-sm text-gray-700">
                                Dive into our dataset and challenge yourself to build the best AI model. Compete on Kaggle!
                            </p>
                            <a
                                href="https://www.kaggle.com/t/f1cbdfca97334325ae7147fe6d3a93e7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Kaggle
                            </a>
                        </div>

                        {/* Beginner Tract Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Beginner Tract</h3>
                            <p className="text-sm text-gray-700">
                                Learn AI step by step, even if you have zero coding experience, and build your first neural network!
                            </p>
                            <Link
                                to="/beginner"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Beginner Tract
                            </Link>
                        </div>

                        {/* Advanced Tract Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Tract</h3>
                            <p className="text-sm text-gray-700">
                                Identify a real-world healthcare challenge, build a solution, and pitch your idea for a big prize!
                            </p>
                            <Link
                                to="/advanced"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Advanced Tract
                            </Link>
                        </div>

                        {/* Submissions Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submissions</h3>
                            <p className="text-sm text-gray-700">
                                Ready to submit your project or AI model? Head to the submissions page here.
                            </p>
                            <Link
                                to="/submissions"
                                className="mt-3 inline-block text-indigo-600 font-semibold hover:underline"
                            >
                                Go to Submissions
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Second Row */}

            </div>
        </div>
    );
}
