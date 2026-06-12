import type { Route } from "./+types/verify-email";
import { useLoaderData } from "react-router";
import { normalizeAuthNextForApp } from "~/lib/auth-return";
import { getEnv } from "~/lib/env.server";
import { verifyMagicLinkWithCookies } from "~/lib/auth";
import { assertWattTheHackAuthEnabled } from "~/lib/watt-the-hack-access";

const PRODUCTION_BACKEND_BASE_URL = "https://api.mlai.au";

function getLoginHref(app: string | null, next: string): string {
    const params = new URLSearchParams();

    if (app) {
        params.set("app", app);
    }

    params.set("next", next);
    return `/platform/login?${params.toString()}`;
}

function isLocalhostRequest(request: Request) {
    const hostname = new URL(request.url).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname.endsWith(".localhost");
}

function sanitizeCookieForLocalhost(cookie: string) {
    return cookie
        .split(";")
        .map((part) => part.trim())
        .filter((part) => {
            const lower = part.toLowerCase();
            return lower !== "secure" && !lower.startsWith("domain=");
        })
        .map((part) => {
            if (part.toLowerCase().startsWith("samesite=")) {
                return "SameSite=Lax";
            }
            return part;
        })
        .join("; ");
}

async function verifyTokenWithLocalhostFallback(
    env: Env,
    request: Request,
    token: string,
    options: { app?: string | null; next?: string | null },
) {
    try {
        return await verifyMagicLinkWithCookies(env, token, options);
    } catch (error: any) {
        const configuredBackend = String(env.BACKEND_BASE_URL || "").trim();
        const shouldRetryProduction =
            isLocalhostRequest(request) &&
            error.response?.status === 400 &&
            configuredBackend.includes("localhost");

        if (!shouldRetryProduction) {
            throw error;
        }

        console.warn("Local magic-link verification failed; retrying production backend for emailed link.");
        return verifyMagicLinkWithCookies(env, token, {
            ...options,
            backendBaseUrl: PRODUCTION_BACKEND_BASE_URL,
        });
    }
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const app = url.searchParams.get("app");
    assertWattTheHackAuthEnabled(app, url.searchParams.get("next"));
    const next = normalizeAuthNextForApp(app, url.searchParams.get("next"), { fallback: "/esafety/dashboard" });
    const loginHref = getLoginHref(app, next);

    if (!token) {
        return { error: "No token provided", loginHref };
    }

    try {
        const shouldSanitizeCookies = isLocalhostRequest(request);
        const { setCookieHeaders } = await verifyTokenWithLocalhostFallback(env, request, token, { app, next });

        // Forward Set-Cookie headers from the backend to the browser
        const headers = new Headers();
        if (Array.isArray(setCookieHeaders)) {
            for (const cookie of setCookieHeaders) {
                headers.append("Set-Cookie", shouldSanitizeCookies ? sanitizeCookieForLocalhost(cookie) : cookie);
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
