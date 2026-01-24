import { redirect } from "react-router";
import type { Route } from "./+types/valley.logout";
import { clearValleySessionCookie } from "~/lib/valley-session";

export async function action({ request }: Route.ActionArgs) {
    return redirect("/valley", {
        headers: [
            ["Set-Cookie", clearValleySessionCookie()],
            ["Set-Cookie", "valley_submitted=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"]
        ]
    });
}

export async function loader() {
    // If accessed via GET, also logout
    return redirect("/valley", {
        headers: {
            "Set-Cookie": clearValleySessionCookie()
        }
    });
}
