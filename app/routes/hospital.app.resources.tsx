import type { Route } from "./+types/hospital.app.resources";
import { useLoaderData, redirect } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login?app=hospital&next=/hospital/app/resources");
    return { user };
}

export default function HospitalAppResources() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resources</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Guides, datasets, and tools to help you build your Medhack: Frontiers solution.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Getting Started Card */}
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Getting Started</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            New to the hackathon? Start here to understand the challenge, rules, and how to submit.
                        </p>
                    </div>
                </div>

                {/* Dataset Card */}
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Datasets</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Access the datasets provided for the Medhack: Frontiers challenge.
                        </p>
                    </div>
                </div>

                {/* Submission Guide Card */}
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Submission Guide</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Learn how to format and submit your predictions for scoring.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Need Help?</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Reach out to mentors and other participants on Slack, or contact the organising team.
                    </p>
                </div>
            </div>
        </main>
    );
}
