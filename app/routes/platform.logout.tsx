import type { Route } from "./+types/platform.logout";
import { redirect } from "react-router";
import { logout } from "~/lib/auth";

export async function loader({ context }: Route.LoaderArgs) {
    await logout(context.cloudflare.env);
    return redirect("/");
}

export default function PlatformLogout() {
    return null;
}
