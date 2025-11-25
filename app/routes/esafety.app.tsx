import type { Route } from "./+types/esafety.app";
import { redirect, Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import EsafetyAppLayout from "~/components/EsafetyAppLayout";

interface UserData {
    email: string;
    full_name: string;
    avatar_url?: string;
}

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);

    if (!user) {
        return redirect("/platform/login?next=/esafety/app/dashboard");
    }

    return { user: user as UserData };
}

export default function EsafetyApp() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <EsafetyAppLayout user={user}>
            <Outlet />
        </EsafetyAppLayout>
    );
}
