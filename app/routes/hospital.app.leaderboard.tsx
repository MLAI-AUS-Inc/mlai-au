import type { Route } from "./+types/hospital.app.leaderboard";
import { useLoaderData } from "react-router";
import { getHospitalLeaderboard } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

interface LeaderboardEntry {
    team_id: number;
    team_name: string;
    score: number;
    submitted_at: string;
    patients_at_risk: number | null;
    false_alarms: number | null;
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);

    try {
        const leaderboard = await getHospitalLeaderboard(env, request) as LeaderboardEntry[];
        return { leaderboard, error: null };
    } catch (error) {
        console.error("Failed to fetch the HealthHack leaderboard:", error);
        return {
            leaderboard: [] as LeaderboardEntry[],
            error: "The live leaderboard is temporarily unavailable. Please try again shortly.",
        };
    }
}

function rankDisplay(index: number) {
    if (index === 0) return { medal: "🥇", className: "text-amber-300 font-black" };
    if (index === 1) return { medal: "🥈", className: "text-slate-200 font-black" };
    if (index === 2) return { medal: "🥉", className: "text-orange-300 font-black" };
    return { medal: "", className: "text-white/80 font-semibold" };
}

function formatScore(score: number) {
    return Number.isFinite(score) ? score.toFixed(2) : "—";
}

function formatSubmissionTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Australia/Sydney",
    }).format(date);
}

export default function HospitalAppLeaderboard() {
    const { leaderboard, error } = useLoaderData<typeof loader>();

    return (
        <main className="min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="relative overflow-hidden rounded-2xl border border-indigo-300/30 bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-950 px-6 py-8 shadow-[0_0_40px_rgba(99,102,241,0.18)] sm:px-10">
                    <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-indigo-300/20 blur-3xl" />
                    <div className="relative">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">HealthHack 2026</p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Live Leaderboard</h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">
                            See every coding-track team&apos;s best submission. Standings update as new scores are recorded.
                        </p>
                    </div>
                </header>

                <section className="healthhack-card overflow-hidden rounded-2xl" aria-labelledby="leaderboard-heading">
                    <div className="border-b border-indigo-300/15 px-5 py-5 sm:px-7">
                        <h2 id="leaderboard-heading" className="text-xl font-black text-white">Team standings</h2>
                        <p className="mt-1 text-sm text-white/55">Only each team&apos;s highest-scoring submission is shown.</p>
                    </div>

                    {error ? (
                        <div className="px-6 py-12 text-center">
                            <p className="text-base font-semibold text-rose-300">{error}</p>
                        </div>
                    ) : leaderboard.length === 0 ? (
                        <div className="px-6 py-14 text-center">
                            <p className="text-lg font-bold text-white">No submissions yet</p>
                            <p className="mt-2 text-sm text-white/55">Be the first team to claim a place on the leaderboard.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-indigo-300/15">
                                <thead className="bg-indigo-950/30">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-5 pr-3 text-left text-xs font-bold uppercase tracking-wider text-indigo-200 sm:pl-7">Rank</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-indigo-200">Team</th>
                                        <th scope="col" className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-indigo-200">Score</th>
                                        <th scope="col" className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-indigo-200">Patients at risk</th>
                                        <th scope="col" className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-indigo-200">False alarms</th>
                                        <th scope="col" className="py-3.5 pl-3 pr-5 text-left text-xs font-bold uppercase tracking-wider text-indigo-200 sm:pr-7">Last submission</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-indigo-300/10">
                                    {leaderboard.map((entry, index) => {
                                        const rank = rankDisplay(index);
                                        return (
                                            <tr key={entry.team_id} className={index < 3 ? "bg-indigo-400/[0.06]" : "transition-colors hover:bg-white/[0.03]"}>
                                                <td className={`whitespace-nowrap py-4 pl-5 pr-3 text-sm sm:pl-7 ${rank.className}`}>
                                                    {rank.medal ? `${rank.medal} ${index + 1}` : index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-white">{entry.team_name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-black text-indigo-200">{formatScore(entry.score)}</td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-right text-sm ${entry.patients_at_risk != null && entry.patients_at_risk > 0 ? "font-semibold text-rose-300" : "text-white/55"}`}>
                                                    {entry.patients_at_risk ?? "—"}
                                                </td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-right text-sm ${entry.false_alarms != null && entry.false_alarms > 0 ? "font-semibold text-amber-300" : "text-white/55"}`}>
                                                    {entry.false_alarms ?? "—"}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-3 pr-5 text-sm text-white/55 sm:pr-7">{formatSubmissionTime(entry.submitted_at)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
