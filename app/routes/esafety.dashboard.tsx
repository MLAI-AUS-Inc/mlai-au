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

    const headers: Record<string, string> = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    // Mock announcements data for fallback
    const mockAnnouncements: Announcement[] = [
        {
            id: '1',
            title: 'Welcome to the eSafety Hackathon!',
            body: '<p>We are thrilled to have you here. Get ready to build innovative solutions for online safety. Check out the resources tab for datasets and guides.</p>',
            date: 'Today at 9:00 AM',
            datetime: new Date().toISOString(),
            author: {
                name: 'eSafety Team',
                imageUrl: 'https://ui-avatars.com/api/?name=eSafety+Team&background=random',
                href: '#',
            },
        },
        {
            id: '2',
            title: 'Submission Guidelines',
            body: '<p>Please ensure your submissions include a video demo and a link to your GitHub repository. The deadline is Sunday at 5 PM.</p>',
            date: 'Yesterday',
            datetime: new Date(Date.now() - 86400000).toISOString(),
            author: {
                name: 'Hackathon Admin',
                imageUrl: 'https://ui-avatars.com/api/?name=Admin&background=random',
                href: '#',
            },
        },
        {
            id: '3',
            title: 'Mentor Sessions',
            body: '<p>Mentors will be available in the main hall from 2 PM to 4 PM today. Don\'t miss this opportunity to get feedback on your ideas.</p>',
            date: '2 days ago',
            datetime: new Date(Date.now() - 172800000).toISOString(),
            author: {
                name: 'Community Manager',
                imageUrl: 'https://ui-avatars.com/api/?name=Community&background=random',
                href: '#',
            },
        }
    ];

    try {
        const [hackathon, announcements] = await Promise.all([
            getHackathon("esafety", headers).catch(() => ({
                name: "eSafety Hackathon",
                slug: "esafety",
                description: "Develop AI solutions for online safety.",
                start_date: "2025-01-01",
                end_date: "2025-01-02"
            })),
            getAnnouncements("esafety", headers).catch(() => mockAnnouncements)
        ]);

        return { user, hackathon, announcements };
    } catch (error) {
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
            announcements: mockAnnouncements
        };
    }
}

export default function EsafetyAppDashboard() {
    const { user, hackathon, announcements } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="w-full mx-auto space-y-6">
                {/* First Row */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column (7/12): Announcements */}
                    <div className="w-full lg:w-7/12 space-y-6">
                        <Announcements announcements={announcements} />
                    </div>

                    {/* Right Column (5/12): Multiple Cards */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        {/* Kaggle Competition Card */}
                        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kaggle Competition (Coming Soon)</h3>
                            <p className="text-sm text-gray-700">
                                Dive into our dataset and challenge yourself to build the best AI model. Compete on Kaggle!
                            </p>
                        </div>

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
