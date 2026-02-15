import type { Route } from "./+types/verify-email";
import { redirect, useLoaderData } from "react-router";
import axios from "axios";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const app = url.searchParams.get("app");
    const next = url.searchParams.get("next") || (app === "hospital" ? "/hospital/app" : "/esafety/dashboard");

    if (!token) {
        return { error: "No token provided" };
    }

    try {
        const baseURL = env.BACKEND_BASE_URL || "http://localhost:8000";
        const response = await axios.get(`${baseURL}/api/v1/auth/verify-magic-link/`, {
            params: { token },
            withCredentials: true,
        });

        // Forward Set-Cookie headers from the backend to the browser
        const headers = new Headers();
        const setCookieHeaders = response.headers["set-cookie"];
        if (setCookieHeaders) {
            if (Array.isArray(setCookieHeaders)) {
                setCookieHeaders.forEach((cookie: string) => {
                    headers.append("Set-Cookie", cookie);
                });
            } else {
                headers.append("Set-Cookie", setCookieHeaders as string);
            }
        }

        headers.set("Location", next);
        return new Response(null, { status: 302, headers });
    } catch (error: any) {
        console.error("Verification failed:", error.message, error.response?.status, error.response?.data);
        return { error: "Verification failed. The link may have expired. Please request a new one." };
    }
}

export default function VerifyEmail() {
    const data = useLoaderData<typeof loader>();

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="mx-auto max-w-md px-4 text-center">
                {data?.error ? (
                    <div className="rounded-lg bg-white p-8 shadow sm:rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-900">Verification Failed</h2>
                        <p className="mt-2 text-sm text-gray-500">{data.error}</p>
                        <a
                            href="/platform/login"
                            className="mt-6 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Back to Login
                        </a>
                    </div>
                ) : (
                    <p className="text-gray-500">Verifying...</p>
                )}
            </div>
        </main>
    );
}
