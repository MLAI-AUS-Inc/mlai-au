import type { Route } from "./+types/esafety.dashboard";
import { redirect, useLoaderData, Link } from "react-router";
import axios from "axios";
import { getEnv } from "~/lib/env.server";
import { getCurrentUser } from "~/lib/auth";
import Leaderboard from "~/components/Leaderboard";

import Announcements, { type Announcement } from "~/components/Announcements";

import { getHackathon, getAnnouncements } from "~/services/hackathon";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    // 1. Extract the cookie header from the incoming browser request
    const cookieHeader = request.headers.get("Cookie");
    const user = await getCurrentUser(env, request);

    if (!user) {
        throw redirect("/platform/login?next=/esafety/dashboard");
    }

    try {
        console.log("Fetching dashboard data...");
        const hackathonPromise = getHackathon(env, request, "esafety").then(data => {
            console.log("getHackathon success");
            return data;
        }).catch(err => {
            console.error("getHackathon failed", err.message);
            return {
                name: "eSafety Hackathon (Fallback)",
                slug: "esafety",
                description: "Develop AI solutions for online safety.",
                start_date: "2025-01-01",
                end_date: "2025-01-02"
            };
        });

        const announcementsPromise = getAnnouncements(env, request, "esafety").then(data => {
            console.log("getAnnouncements success", data);
            return data;
        }).catch(err => {
            console.error("getAnnouncements failed", err.message);
            throw err; // Re-throw to be caught below
        });

        const [hackathon, announcements] = await Promise.all([
            hackathonPromise,
            announcementsPromise
        ]);

        return { user, hackathon, announcements, error: null };
    } catch (error: any) {
        console.error("Failed to load dashboard data", error);
        return {
            user,
            hackathon: {
                name: "eSafety Hackathon",
                slug: "esafety",
                description: "Develop AI solutions for online safety.",
                start_date: "2025-01-01",
                end_date: "2025-01-02"
            },
            announcements: [],
            error: error.message || "Unknown error"
        };
    }
}

export default function EsafetyAppDashboard() {
    const { user, hackathon, announcements, error } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="w-full mx-auto space-y-6">
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* First Row */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column (7/12): Announcements */}
                    <div className="w-full lg:w-7/12 space-y-6">
                        <Announcements announcements={announcements} />
                    </div>

                    {/* Right Column (5/12): Multiple Cards */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        {/* Bot Social Card */}
                        <a href="https://botsocial.mlai.au/" target="_blank" rel="noopener noreferrer" className="block group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="absolute inset-0">
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504"
                                    alt="Bot Social"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            </div>
                            <div className="relative h-full p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-1">Visit Bot Social</h3>
                                <p className="text-sm text-gray-200 font-medium">Fake Social Network</p>
                            </div>
                        </a>

                        {/* Mini Challenge Tutorials Card */}
                        <a
                            href="https://www.kaggle.com/competitions/needle-in-the-hashtag"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 hover:shadow-md transition-shadow group"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Mini Challenge Tutorials</h3>
                            <p className="text-sm text-gray-700">
                                Dive into our dataset and challenge yourself to build the best AI model. Compete on Kaggle!
                            </p>
                        </a>

                        {/* Download Full Dataset Card */}
                        <a
                            href="https://www.kaggle.com/competitions/needle-in-the-hashtag/data"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6 hover:shadow-md transition-shadow group"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Download Full Dataset</h3>
                            <p className="text-sm text-gray-700">
                                Access the complete dataset for the challenge.
                            </p>
                        </a>

                        {/* Submissions Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submissions (Coming Soon)</h3>
                            <p className="text-sm text-gray-700">
                                Ready to submit your project or AI model? Head to the submissions page here.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second Row */}

            </div>
        </div>
    );
}
