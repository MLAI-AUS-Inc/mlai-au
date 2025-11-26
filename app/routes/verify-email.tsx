import type { Route } from "./+types/verify-email";
import { redirect } from "react-router";
import { verifyMagicLink } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return { error: "Missing token" };
    }

    try {
        const data = await verifyMagicLink(getEnv(context), token);

        // Successfully verified - redirect to dashboard
        // The backend sets the authentication cookie via Set-Cookie header
        return redirect("/platform/dashboard");
    } catch (error) {
        console.error("Magic link verification error:", error);
        return redirect("/platform/login?error=verification_failed");
    }
}

export default function VerifyEmail() {
    // This component only renders during the brief moment before redirect
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="mb-4">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                </div>
                <p className="text-sm text-gray-600">Verifying your email...</p>
            </div>
        </div>
    );
}
