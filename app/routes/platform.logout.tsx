import type { Route } from "./+types/platform.logout";
import { redirect } from "react-router";
import { logout } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";


export async function loader({ context, request }: Route.LoaderArgs) {
    const headers = new Headers();
    try {
        const response = await logout(getEnv(context), request);
        if (response.headers['set-cookie']) {
            const cookies = response.headers['set-cookie'];
            if (Array.isArray(cookies)) {
                cookies.forEach(cookie => headers.append("Set-Cookie", cookie));
            } else {
                headers.append("Set-Cookie", cookies);
            }
        }
    } catch (error) {
        console.error("Logout failed:", error);
        // Even if logout fails (e.g. 401), we should still redirect the user
    }
    return redirect("/", { headers });
}

export async function action({ context, request }: Route.ActionArgs) {
    const headers = new Headers();
    try {
        const response = await logout(getEnv(context), request);
        if (response.headers['set-cookie']) {
            const cookies = response.headers['set-cookie'];
            if (Array.isArray(cookies)) {
                cookies.forEach(cookie => headers.append("Set-Cookie", cookie));
            } else {
                headers.append("Set-Cookie", cookies);
            }
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
    return redirect("/", { headers });
}

export default function PlatformLogout() {
    return null;
}
