import type { Route } from "./+types/esafety.app.submit";
import { Form, useActionData, useLoaderData, redirect } from "react-router";

import { getCurrentUser } from "~/lib/auth";

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);
    if (!user) return redirect("/platform/login");
    return { user };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = context.cloudflare.env;
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return { error: "Please upload a valid CSV file." };
    }

    // We need to construct a FormData object to send to the backend
    // Note: backendFetch sets Content-Type to application/json by default, 
    // so we need to override it or use a raw fetch for file uploads.
    // The backendFetch helper might not be suitable for FormData if it forces JSON.
    // Let's use a raw fetch here or modify backendFetch. 
    // For simplicity, I'll use raw fetch but reuse the logic for URL and credentials.

    const url = new URL("/api/v1/hackathons/esafety/submissions/", env.BACKEND_BASE_URL).toString();
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: backendFormData,
        // Do NOT set Content-Type header when sending FormData, let the browser set it with boundary
    });

    if (!res.ok) {
        const err = await res.json();
        return { error: err.detail || "Submission failed" };
    }

    const result = await res.json();
    return { success: true, result };
}

export default function EsafetyAppSubmit() {
    const actionData = useActionData<typeof action>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Make a Submission
                    </h2>
                </div>
            </div>

            <div className="mt-8">
                <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-white">Upload Predictions</h3>
                        <p className="mt-2 text-sm text-gray-400">
                            Upload your CSV file containing your predictions.
                        </p>

                        {actionData?.error && (
                            <div className="mt-4 rounded-md bg-red-500/10 p-4 text-sm text-red-400">
                                {actionData.error}
                            </div>
                        )}

                        {actionData?.success && (
                            <div className="mt-4 rounded-md bg-green-500/10 p-4">
                                <h4 className="text-sm font-medium text-green-400">Submission Successful!</h4>
                                <div className="mt-2 text-sm text-green-300">
                                    <p>Score: {actionData.result.score}</p>
                                    {/* Display other metrics if available */}
                                </div>
                            </div>
                        )}

                        <Form method="POST" encType="multipart/form-data" className="mt-6">
                            <div>
                                <label htmlFor="file" className="block text-sm font-medium leading-6 text-white">
                                    CSV File
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        accept=".csv"
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                                >
                                    Upload
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}
