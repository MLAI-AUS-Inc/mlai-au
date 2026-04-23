import type { Route } from "./+types/innovate-connect-alliance.dashboard";
import { Link, redirect, useLoaderData } from "react-router";
import { ArrowRightIcon, DocumentArrowUpIcon, MegaphoneIcon, UsersIcon } from "@heroicons/react/24/outline";

import Announcements, { type Announcement } from "~/components/Announcements";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { getInnovateConnectAllianceLatestSubmission } from "~/lib/innovate-connect-alliance";
import { getAnnouncements, getHackathon } from "~/services/hackathon";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=innovate-connect-alliance&next=/innovate-connect-alliance");
    }

    let hackathon = {
        name: "Innovate Connect Alliance",
        slug: "innovate-connect-alliance",
        description: "Build, collaborate, and submit your team story as video.",
        start_date: "2026-01-01",
        end_date: "2026-12-31",
    };

    try {
        hackathon = await getHackathon(env, request, "innovate-connect-alliance");
    } catch (error) {
        console.error("Failed to fetch hackathon metadata:", error);
    }

    let announcements: Announcement[] = [];
    try {
        announcements = await getAnnouncements(env, request, "innovate-connect-alliance");
    } catch (error) {
        console.error("Failed to fetch announcements:", error);
    }

    const team = (user as any).innovate_connect_alliance_team;
    const hasTeam = Boolean(team);

    let latestSubmission = null;
    if (hasTeam) {
        try {
            latestSubmission = await getInnovateConnectAllianceLatestSubmission(env, request);
        } catch (error) {
            console.error("Failed to fetch latest submission:", error);
        }
    }

    return { user, hackathon, announcements, team, hasTeam, latestSubmission };
}

export default function InnovateConnectAllianceDashboard() {
    const { hackathon, announcements, team, hasTeam, latestSubmission } =
        useLoaderData<typeof loader>();

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="overflow-hidden rounded-2xl border border-[#8ef4d4]/20 bg-gradient-to-r from-[#1a0e2e] via-[#1f1437] to-[#10333a] px-6 py-8 shadow-[0_0_30px_rgba(142,244,212,0.08)] sm:px-8 lg:px-10">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8ef4d4]/80">
                        {hackathon.name}
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Build the idea, align the team, and submit the story as video.
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
                        {hackathon.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to={hasTeam ? "/innovate-connect-alliance/submissions" : "/innovate-connect-alliance/team"}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#8ef4d4] px-4 py-2.5 text-sm font-semibold text-[#110822] hover:bg-[#77e4c1]"
                        >
                            {hasTeam ? "Go to Submissions" : "Create or Join a Team"}
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/innovate-connect-alliance/docs"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
                        >
                            Read the Docs
                        </Link>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <Announcements announcements={announcements} />

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                            <div className="flex items-center gap-3">
                                <UsersIcon className="h-6 w-6 text-[#8ef4d4]" />
                                <h2 className="text-lg font-semibold text-white">Team Status</h2>
                            </div>
                            {hasTeam ? (
                                <>
                                    <p className="mt-4 text-sm text-white/50">Current team</p>
                                    <p className="mt-1 text-xl font-semibold text-white">{team.team_name}</p>
                                    <p className="mt-2 text-sm text-white/60">
                                        {team.member_count ?? team.members?.length ?? 0} members
                                    </p>
                                    <Link
                                        to="/innovate-connect-alliance/team"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                                    >
                                        Manage Team
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="mt-4 text-sm leading-6 text-white/60">
                                        You need a team before you can upload a submission.
                                    </p>
                                    <Link
                                        to="/innovate-connect-alliance/team"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                                    >
                                        Start Team Setup
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                            <div className="flex items-center gap-3">
                                <DocumentArrowUpIcon className="h-6 w-6 text-[#8ef4d4]" />
                                <h2 className="text-lg font-semibold text-white">Latest Submission</h2>
                            </div>
                            {latestSubmission ? (
                                <>
                                    <p className="mt-4 text-base font-semibold text-white">
                                        {latestSubmission.title}
                                    </p>
                                    <p className="mt-2 text-sm text-white/60">
                                        Submitted by {latestSubmission.participant_name}
                                    </p>
                                    <p className="mt-2 text-sm text-white/45">
                                        {latestSubmission.original_filename}
                                    </p>
                                </>
                            ) : (
                                <p className="mt-4 text-sm text-white/60">
                                    No video uploaded yet.
                                </p>
                            )}
                            <Link
                                to="/innovate-connect-alliance/submissions"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                            >
                                Open Submissions
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                            <div className="flex items-center gap-3">
                                <MegaphoneIcon className="h-6 w-6 text-[#8ef4d4]" />
                                <h2 className="text-lg font-semibold text-white">Need the rules?</h2>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-white/60">
                                The docs page covers the submission format, rules, timeline, review criteria, and contact path for organizer questions.
                            </p>
                            <Link
                                to="/innovate-connect-alliance/docs"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8ef4d4] hover:text-[#8ef4d4]/80"
                            >
                                Open Docs
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
