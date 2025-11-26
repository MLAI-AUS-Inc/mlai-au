import type { Route } from "./+types/esafety.app.resources";
import { useLoaderData, redirect, Link } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env);
    if (!user) return redirect("/platform/login");
    return { user };
}

export default function EsafetyAppResources() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Resources & Challenges
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link
                        to="/esafety/app"
                        className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>

            <div className="space-y-12">
                {/* Challenges Section */}
                <section>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Challenges</h3>
                    <div className="bg-white/5 rounded-lg shadow ring-1 ring-white/10 overflow-hidden">
                        <div className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-2">Needle in the Hashtag</h4>
                            <p className="text-gray-300 mb-4">
                                Develop an AI model to detect harmful content in a simulated social media feed.
                                Your goal is to accurately classify posts while minimizing false positives.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li><strong>Task:</strong> Multi-label classification of social media posts.</li>
                                <li><strong>Input:</strong> Text content, metadata, and user history.</li>
                                <li><strong>Output:</strong> Probability scores for various harm categories (e.g., cyberbullying, hate speech).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Datasets Section */}
                <section>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Datasets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-lg shadow ring-1 ring-white/10 p-6">
                            <h4 className="text-lg font-semibold text-white mb-2">Training Data</h4>
                            <p className="text-gray-300 mb-4 text-sm">
                                A labeled dataset of 50,000 simulated social media posts.
                            </p>
                            <a
                                href="#"
                                className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download from Kaggle &rarr;
                            </a>
                        </div>
                        <div className="bg-white/5 rounded-lg shadow ring-1 ring-white/10 p-6">
                            <h4 className="text-lg font-semibold text-white mb-2">Test Set</h4>
                            <p className="text-gray-300 mb-4 text-sm">
                                Unlabeled posts for submission.
                            </p>
                            <a
                                href="#"
                                className="text-teal-400 hover:text-teal-300 text-sm font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download from Kaggle &rarr;
                            </a>
                        </div>
                    </div>
                </section>

                {/* Starter Kits Section */}
                <section>
                    <h3 className="text-xl font-bold text-teal-400 mb-4">Starter Kits</h3>
                    <div className="bg-white/5 rounded-lg shadow ring-1 ring-white/10 p-6">
                        <h4 className="text-lg font-semibold text-white mb-2">Python Starter Notebook</h4>
                        <p className="text-gray-300 mb-4">
                            Get started quickly with this Jupyter notebook containing data loading, basic EDA, and a baseline model.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
                            >
                                Open in Colab
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
