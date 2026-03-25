import { redirect } from "react-router";
import type { Route } from "./+types/vibe-raising-app.logout";
import { logout } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
    clearVibeRaisingSubmittedCookie,
    getVibeRaisingLoginHref,
    getVibeRaisingProfile,
} from "~/lib/vibe-raising";

async function handleLogout(context: Route.ActionArgs["context"], request: Request) {
    const env = getEnv(context);
    const headers = new Headers();

    try {
        const profile = await getVibeRaisingProfile(env, request);
        if (profile?.companies.length) {
            for (const company of profile.companies) {
                headers.append("Set-Cookie", clearVibeRaisingSubmittedCookie(company.id));
            }
        }
    } catch (error) {
        console.error("Failed to load Vibe Raising profile during logout:", error);
    }

    try {
        const response = await logout(env, request);
        if (response.headers["set-cookie"]) {
            const cookies = response.headers["set-cookie"];
            if (Array.isArray(cookies)) {
                cookies.forEach((cookie) => headers.append("Set-Cookie", cookie));
            } else {
                headers.append("Set-Cookie", cookies);
            }
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }

    return redirect(getVibeRaisingLoginHref(request, "/vibe-raising"), { headers });
}

export async function action({ request, context }: Route.ActionArgs) {
    return handleLogout(context, request);
}

export async function loader({ request, context }: Route.LoaderArgs) {
    return handleLogout(context, request);
}
