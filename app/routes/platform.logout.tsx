import type { Route } from "./+types/platform.logout";
import { redirect } from "react-router";
import { logout } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ context }: Route.LoaderArgs) {
    await logout(getEnv(context));
    return redirect("/");
}

export default function PlatformLogout() {
    return null;
}
