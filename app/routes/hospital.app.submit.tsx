import { useState, useEffect, useCallback } from 'react';
import type { Route } from "./+types/hospital.app.submit";
import { useLoaderData, redirect, useRevalidator, Link } from "react-router";
import { getCurrentUser, getHospitalRecentSubmissions, getHospitalLatestSubmission, getHospitalSubmissionById, getHospitalAllSubmissions } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import SubmissionForm from "~/components/hospital/SubmissionForm";
import RecentSubmissions from "~/components/hospital/RecentSubmissions";
import NewestSubmissionCard from "~/components/hospital/NewestSubmissionCard";
import ClassAccuracyBars from "~/components/hospital/ClassAccuracyBars";
import ConfusionMatrixHeatmap from "~/components/hospital/ConfusionMatrixHeatmap";
import MissedCrisesAlert from "~/components/hospital/MissedCrisesAlert";
import First100RowsTable from "~/components/hospital/First100RowsTable";
import SubmissionHistory from "~/components/hospital/SubmissionHistory";
import type { HospitalSubmission, SubmissionSummary } from "~/types/submission";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login?app=hospital&next=/hospital/app/submit");

    const hasTeam = !!(user.hospital_team || user.team);

    let recentSubmissions: any[] = [];
    if (hasTeam) {
        try {
            recentSubmissions = await getHospitalRecentSubmissions(env, request);
        } catch (error) {
            console.error("Failed to fetch recent submissions:", error);
        }
    }

    return { user, hasTeam, recentSubmissions };
}

export default function HospitalAppSubmit() {
    const { user, hasTeam, recentSubmissions } = useLoaderData<typeof loader>();
    const revalidator = useRevalidator();

    const [submission, setSubmission] = useState<HospitalSubmission | null>(null);
    const [allSubmissions, setAllSubmissions] = useState<SubmissionSummary[]>([]);
    const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

    const fetchLatestSubmission = useCallback(async () => {
        try {
            setIsSubmissionLoading(true);
            const data = await getHospitalLatestSubmission();
            if (data && data.submission_id != null) {
                setSubmission(data);
            }
        } catch (error) {
            console.error("Failed to fetch latest submission:", error);
        } finally {
            setIsSubmissionLoading(false);
        }
    }, []);

    const fetchAllSubmissions = useCallback(async () => {
        try {
            const data = await getHospitalAllSubmissions();
            if (Array.isArray(data)) {
                setAllSubmissions(data);
            }
        } catch (error) {
            console.error("Failed to fetch all submissions:", error);
        }
    }, []);

    useEffect(() => {
        if (hasTeam) {
            fetchLatestSubmission();
            fetchAllSubmissions();
        }
    }, [hasTeam, fetchLatestSubmission, fetchAllSubmissions]);

    const handleSubmissionSelect = async (submissionId: number) => {
        try {
            setIsSubmissionLoading(true);
            const data = await getHospitalSubmissionById(submissionId);
            if (data) {
                setSubmission(data);
            }
        } catch (error) {
            console.error("Failed to fetch submission:", error);
        } finally {
            setIsSubmissionLoading(false);
        }
    };

    const handleSubmissionSuccess = () => {
        revalidator.revalidate();
        fetchLatestSubmission();
        fetchAllSubmissions();
    };

    const feedback = submission?.feedback;
    const bestScore = allSubmissions.length > 0
        ? Math.max(...allSubmissions.map((s) => s.score))
        : null;

    return (
        <main className="min-h-screen bg-[#110822] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-7xl space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Make a Submission</h2>
                    <p className="mt-4 text-lg leading-6 text-white/50">
                        Upload your predictions to see how you rank against other teams.
                    </p>
                </div>

                {!hasTeam ? (
                    <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-300">Team required</h3>
                                <div className="mt-2 text-sm text-yellow-200/70">
                                    <p>
                                        You need to join or create a team before making submissions.{' '}
                                        <Link to="/hospital/app/team" className="font-medium underline hover:text-yellow-100">
                                            Go to Team Management
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Submission card + Recent submissions row */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-5/12">
                                <NewestSubmissionCard submission={submission} />
                                {isSubmissionLoading && (
                                    <div className="mt-2 text-center text-xs text-white/30">Loading...</div>
                                )}
                            </div>
                            <div className="md:w-7/12">
                                <RecentSubmissions
                                    submissions={recentSubmissions}
                                    onRowClick={handleSubmissionSelect}
                                />
                            </div>
                        </div>

                        {/* Feedback section */}
                        {submission && (
                            feedback ? (
                                <div className="space-y-6">
                                    <MissedCrisesAlert
                                        missedCrisesTotal={feedback.missed_crises_total}
                                        missedCrises={feedback.missed_crises}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ClassAccuracyBars classStats={feedback.class_stats} />
                                        <ConfusionMatrixHeatmap confusionMatrix={feedback.confusion_matrix} />
                                    </div>
                                    <First100RowsTable rows={feedback.first_100_public} />
                                </div>
                            ) : (
                                <div className="bg-[#1a0e2e]/80 border border-[#e2a9f1]/20 rounded-2xl p-6 text-center">
                                    <p className="text-white/50 text-sm">
                                        Detailed feedback is not available for this submission.
                                    </p>
                                </div>
                            )
                        )}

                        {/* Submission history */}
                        <SubmissionHistory
                            submissions={allSubmissions}
                            selectedId={submission?.submission_id ?? null}
                            bestScore={bestScore}
                            onSelect={handleSubmissionSelect}
                        />

                        <SubmissionForm user={user} onSubmissionSuccess={handleSubmissionSuccess} />

                        <div className="text-center">
                            <Link
                                to="/hospital/app/leaderboard"
                                className="text-sm font-medium text-[#e2a9f1] hover:text-[#e2a9f1]/80"
                            >
                                View Full Leaderboard &rarr;
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
