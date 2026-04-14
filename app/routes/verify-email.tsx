import type { Route } from "./+types/verify-email";
import { useLoaderData } from "react-router";
import { getEnv } from "~/lib/env.server";
import { verifyMagicLinkWithCookies } from "~/lib/auth";

function getDefaultNext(app: string | null): string {
    if (app === "hospital") return "/hospital/app";
    if (app === "innovate-connect-alliance") return "/innovate-connect-alliance";
    if (app === "vibe-raising") return "/vibe-raising";
    return "/esafety/dashboard";
}

function getLoginHref(app: string | null, next: string): string {
    const params = new URLSearchParams();

    if (app) {
        params.set("app", app);
    }

    params.set("next", next);
    return `/platform/login?${params.toString()}`;
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const app = url.searchParams.get("app");
    const next = url.searchParams.get("next") || getDefaultNext(app);
    const loginHref = getLoginHref(app, next);

    if (!token) {
        return { error: "No token provided", loginHref };
    }

    try {
        const { setCookieHeaders } = await verifyMagicLinkWithCookies(env, token, { app, next });

        // Forward Set-Cookie headers from the backend to the browser
        const headers = new Headers();
        if (Array.isArray(setCookieHeaders)) {
            for (const cookie of setCookieHeaders) {
                headers.append("Set-Cookie", cookie);
            }
        }

        headers.set("Location", next);
        return new Response(null, { status: 302, headers });
    } catch (error: any) {
        console.error("Verification failed:", error.message, error.response?.status, error.response?.data);
        return {
            error: "Verification failed. The link may have expired. Please request a new one.",
            loginHref,
        };
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
                            href={data?.loginHref || "/platform/login"}
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
