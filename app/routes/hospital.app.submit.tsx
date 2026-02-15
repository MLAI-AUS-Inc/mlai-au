import type { Route } from "./+types/hospital.app.submit";
import { Form, useActionData, useLoaderData, redirect } from "react-router";

import { getCurrentUser } from "~/lib/auth";
import { axiosInstance } from "~/lib/api";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
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
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const cookieHeader = request.headers.get("Cookie");
    const headers: Record<string, string> = {
        "Content-Type": "multipart/form-data",
    };
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    try {
        const response = await axiosInstance.post("/api/v1/hackathons/hospital/submissions/", backendFormData, {
            headers,
        });
        return { success: true, result: response.data };
    } catch (error: any) {
        const errDetail = error.response?.data?.detail || "Submission failed";
        return { error: errDetail };
    }
}

export default function HospitalAppSubmit() {
    const actionData = useActionData<typeof action>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Submission</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Upload your predictions to see how you rank against other teams.
                </p>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Upload Predictions</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Upload your CSV file containing your predictions for the Medhack: Frontiers challenge.
                    </p>

                    {actionData?.error && (
                        <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                            {actionData.error}
                        </div>
                    )}

                    {actionData?.success && (
                        <div className="mt-4 rounded-md bg-green-50 p-4">
                            <h4 className="text-sm font-medium text-green-800">Submission Successful!</h4>
                            <div className="mt-2 text-sm text-green-700">
                                <p>Score: {actionData.result.score}</p>
                            </div>
                        </div>
                    )}

                    <Form method="POST" encType="multipart/form-data" className="mt-6">
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                                CSV File
                            </label>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    accept=".csv"
                                    required
                                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Upload
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    );
}
