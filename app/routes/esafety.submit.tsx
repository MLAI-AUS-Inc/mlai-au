import type { Route } from "./+types/esafety.submit";
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
        const response = await axiosInstance.post("/api/v1/hackathons/esafety/submissions/", backendFormData, {
            headers,
        });
        return { success: true, result: response.data };
    } catch (error: any) {
        const errDetail = error.response?.data?.detail || "Submission failed";
        return { error: errDetail };
    }
}

export default function EsafetyAppSubmit() {
    const actionData = useActionData<typeof action>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a Submission</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Coming Soon
                </p>
            </div>
        </main>
    );
}
