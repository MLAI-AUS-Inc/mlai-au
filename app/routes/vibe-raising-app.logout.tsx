import { redirect } from "react-router";
import type { Route } from "./+types/vibe-raising-app.logout";
import {
    clearVibeRaisingSessionCookie,
    clearVibeRaisingPublishedUpdateCookie,
    clearVibeRaisingSubmittedCookie,
    getVibeRaisingUser,
    VIBE_RAISING_LANDING_PATH,
} from "~/lib/vibe-raising-session";

export async function action({ request }: Route.ActionArgs) {
    // Clear per-company submitted cookies for all companies
    const user = getVibeRaisingUser(request);
    const clearHeaders: [string, string][] = [
        ["Set-Cookie", clearVibeRaisingSessionCookie()],
    ];
    if (user?.companies?.length) {
        for (const company of user.companies) {
            clearHeaders.push(["Set-Cookie", clearVibeRaisingSubmittedCookie(company.id)]);
            clearHeaders.push(["Set-Cookie", clearVibeRaisingPublishedUpdateCookie(company.id)]);
        }
    }
    return redirect(VIBE_RAISING_LANDING_PATH, { headers: clearHeaders });
}

export async function loader({ request }: Route.LoaderArgs) {
    const user = getVibeRaisingUser(request);
    const clearHeaders: [string, string][] = [
        ["Set-Cookie", clearVibeRaisingSessionCookie()],
    ];

    if (user?.companies?.length) {
        for (const company of user.companies) {
            clearHeaders.push(["Set-Cookie", clearVibeRaisingSubmittedCookie(company.id)]);
            clearHeaders.push(["Set-Cookie", clearVibeRaisingPublishedUpdateCookie(company.id)]);
        }
    }

    return redirect(VIBE_RAISING_LANDING_PATH, { headers: clearHeaders });
}
