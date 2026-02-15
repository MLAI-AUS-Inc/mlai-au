import type { Route } from "./+types/hospital.app.leaderboard";
import { useLoaderData, redirect } from "react-router";
import { axiosInstance } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    let leaderboard = [];
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get("/api/v1/hackathons/hospital/leaderboard/", { headers });
        leaderboard = response.data;
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
    }

    return { user, leaderboard };
}

export default function HospitalAppLeaderboard() {
    const { user, leaderboard } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Leaderboard (Medhack: Frontiers)
                    </h2>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                        Rank
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Team
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Score
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Last Submission
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {leaderboard.map((entry: any, index: number) => (
                                    <tr key={entry.team_id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                            {index + 1}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {entry.team_name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {entry.score}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {new Date(entry.submitted_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
