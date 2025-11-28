import type { Route } from "./+types/platform.logout";
import { redirect } from "react-router";
import { logout } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";


export async function loader({ context, request }: Route.LoaderArgs) {
    await logout(getEnv(context), request);
    return redirect("http://localhost:5173");
}

export async function action({ context, request }: Route.ActionArgs) {
    await logout(getEnv(context), request);
    return redirect("http://localhost:5173");
}

export default function PlatformLogout() {
    return null;
}
