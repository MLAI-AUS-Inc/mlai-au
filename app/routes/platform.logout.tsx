import type { Route } from "./+types/platform.logout";
import { redirect } from "react-router";
import { logout } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";


export async function loader({ context, request }: Route.LoaderArgs) {
    const response = await logout(getEnv(context), request);
    const headers = new Headers();
    if (response.headers['set-cookie']) {
        // Axios headers can be an array or string, handle both
        const cookies = response.headers['set-cookie'];
        if (Array.isArray(cookies)) {
            cookies.forEach(cookie => headers.append("Set-Cookie", cookie));
        } else {
            headers.append("Set-Cookie", cookies);
        }
    }
    return redirect("http://localhost:5173", { headers });
}

export async function action({ context, request }: Route.ActionArgs) {
    const response = await logout(getEnv(context), request);
    const headers = new Headers();
    if (response.headers['set-cookie']) {
        const cookies = response.headers['set-cookie'];
        if (Array.isArray(cookies)) {
            cookies.forEach(cookie => headers.append("Set-Cookie", cookie));
        } else {
            headers.append("Set-Cookie", cookies);
        }
    }
    return redirect("http://localhost:5173", { headers });
}

export default function PlatformLogout() {
    return null;
}
