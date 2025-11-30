import type { Route } from "./+types/esafety.submit";
import { redirect, useLoaderData } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import SubmissionForm from "~/components/esafety/SubmissionForm";
import Leaderboard from "~/components/esafety/Leaderboard";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login");
    return { user };
}

export default function EsafetyAppSubmit() {
    const { user } = useLoaderData<typeof loader>();
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Submission</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Upload your predictions to see how you rank against other teams.
                </p>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <SubmissionForm
                    user={user}
                    onSubmissionSuccess={() => {
                        // Refresh leaderboard by reloading the page
                        window.location.reload();
                    }}
                />
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <Leaderboard />
            </div>
        </main>
    );
}
