import type { Route } from "./+types/hospital.app.submit";
import { useLoaderData, redirect, useRevalidator, Link } from "react-router";
import { getCurrentUser, getHospitalRecentSubmissions } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import SubmissionForm from "~/components/hospital/SubmissionForm";
import RecentSubmissions from "~/components/hospital/RecentSubmissions";

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

    const handleSubmissionSuccess = () => {
        revalidator.revalidate();
    };

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Submission</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Upload your predictions to see how you rank against other teams.
                </p>
            </div>

            {!hasTeam ? (
                <div className="rounded-md bg-yellow-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Team required</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    You need to join or create a team before making submissions.{' '}
                                    <Link to="/hospital/app/team" className="font-medium underline hover:text-yellow-600">
                                        Go to Team Management
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <SubmissionForm user={user} onSubmissionSuccess={handleSubmissionSuccess} />

                    <RecentSubmissions submissions={recentSubmissions} />

                    <div className="text-center">
                        <Link
                            to="/hospital/app/leaderboard"
                            className="text-sm font-medium text-[#783f8e] hover:text-[#8f52a5]"
                        >
                            View Full Leaderboard &rarr;
                        </Link>
                    </div>
                </>
            )}
        </main>
    );
}
