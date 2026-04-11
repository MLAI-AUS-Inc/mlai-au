import type { Route } from "./+types/innovate-connect-alliance.submissions";
import { useEffect, useState } from "react";
import { Link, redirect, useLoaderData, useRevalidator } from "react-router";

import LatestSubmissionCard from "~/components/innovate-connect-alliance/LatestSubmissionCard";
import SubmissionTable from "~/components/innovate-connect-alliance/SubmissionTable";
import VideoSubmissionForm from "~/components/innovate-connect-alliance/VideoSubmissionForm";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
    getInnovateConnectAllianceAllSubmissions,
    getInnovateConnectAllianceLatestSubmission,
    getInnovateConnectAllianceRecentSubmissions,
    getInnovateConnectAllianceSubmissionById,
    type InnovateConnectAllianceSubmission,
} from "~/lib/innovate-connect-alliance";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=innovate-connect-alliance&next=/innovate-connect-alliance/submissions");
    }

    const hasTeam = Boolean((user as any).innovate_connect_alliance_team);

    let latestSubmission: InnovateConnectAllianceSubmission | null = null;
    let recentSubmissions: InnovateConnectAllianceSubmission[] = [];
    let allSubmissions: InnovateConnectAllianceSubmission[] = [];

    if (hasTeam) {
        try {
            latestSubmission = await getInnovateConnectAllianceLatestSubmission(env, request);
        } catch (error) {
            console.error("Failed to fetch latest submission:", error);
        }

        try {
            recentSubmissions = await getInnovateConnectAllianceRecentSubmissions(env, request);
        } catch (error) {
            console.error("Failed to fetch recent submissions:", error);
        }

        try {
            allSubmissions = await getInnovateConnectAllianceAllSubmissions(env, request);
        } catch (error) {
            console.error("Failed to fetch submission history:", error);
        }
    }

    return { user, hasTeam, latestSubmission, recentSubmissions, allSubmissions };
}

export default function InnovateConnectAllianceSubmissionsPage() {
    const { hasTeam, latestSubmission, recentSubmissions, allSubmissions } =
        useLoaderData<typeof loader>();
    const revalidator = useRevalidator();

    const [selectedSubmission, setSelectedSubmission] =
        useState<InnovateConnectAllianceSubmission | null>(latestSubmission);
    const [historySubmissions, setHistorySubmissions] =
        useState<InnovateConnectAllianceSubmission[]>(allSubmissions);

    useEffect(() => {
        setSelectedSubmission(latestSubmission || allSubmissions[0] || null);
        setHistorySubmissions(allSubmissions);
    }, [allSubmissions, latestSubmission]);

    const handleSubmissionSelect = async (submissionId: number) => {
        try {
            const submission = await getInnovateConnectAllianceSubmissionById(submissionId);
            setSelectedSubmission(submission);
        } catch (error) {
            console.error("Failed to fetch submission detail:", error);
        }
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Team Video Submissions
                    </h1>
                    <p className="mt-3 text-base leading-7 text-white/60">
                        Upload your team’s latest pitch, demo, or walkthrough video. There is no public leaderboard in this app, so focus on clarity and execution quality.
                    </p>
                </div>

                {!hasTeam ? (
                    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-6 py-5">
                        <p className="text-sm text-yellow-100">
                            You need to join or create a team before you can upload a submission.{" "}
                            <Link to="/innovate-connect-alliance/team" className="font-semibold underline">
                                Go to team setup
                            </Link>
                            .
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                            <VideoSubmissionForm
                                onSubmissionSuccess={() => revalidator.revalidate()}
                            />
                            <LatestSubmissionCard submission={selectedSubmission} />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <SubmissionTable
                                title="Recent Team Uploads"
                                description="The latest submission activity across your current team."
                                submissions={recentSubmissions}
                            />
                            <SubmissionTable
                                title="Your Submission History"
                                description="Click one of your uploads to preview it in the detail card."
                                submissions={historySubmissions}
                                onRowClick={handleSubmissionSelect}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
