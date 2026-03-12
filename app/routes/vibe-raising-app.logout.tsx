import { redirect } from "react-router";
import type { Route } from "./+types/vibe-raising-app.logout";
import { clearVibeRaisingSessionCookie } from "~/lib/vibe-raising-session";

export async function action({ request }: Route.ActionArgs) {
    return redirect("/vibe-raising", {
        headers: [
            ["Set-Cookie", clearVibeRaisingSessionCookie()],
            ["Set-Cookie", "vibe_raising_submitted=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"]
        ]
    });
}

export async function loader() {
    // If accessed via GET, also logout
    return redirect("/vibe-raising", {
        headers: {
            "Set-Cookie": clearVibeRaisingSessionCookie()
        }
    });
}
