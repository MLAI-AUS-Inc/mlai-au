import { redirect } from "react-router";
import type { Route } from "./+types/vibe-raising-app.logout";
import { clearVibeRaisingSessionCookie, getVibeRaisingUser } from "~/lib/vibe-raising-session";

export async function action({ request }: Route.ActionArgs) {
    // Clear per-company submitted cookies for all companies
    const user = getVibeRaisingUser(request);
    const clearHeaders: [string, string][] = [
        ["Set-Cookie", clearVibeRaisingSessionCookie()],
    ];
    if (user?.companies?.length) {
        for (const company of user.companies) {
            clearHeaders.push(["Set-Cookie", `vibe_submitted_${company.id}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`]);
        }
    }
    return redirect("/vibe-raising", { headers: clearHeaders });
}

export async function loader() {
    // If accessed via GET, also logout
    return redirect("/vibe-raising", {
        headers: {
            "Set-Cookie": clearVibeRaisingSessionCookie()
        }
    });
}
