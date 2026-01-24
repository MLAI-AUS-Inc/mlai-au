import type { Route } from "./+types/esafety";
import { redirect, Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import { getEnv } from "~/lib/env.server";

import type { User } from "~/types/user";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        throw redirect("/platform/login?next=/esafety/dashboard");
    }

    return { user: user as User };
}

export default function EsafetyApp() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <AuthenticatedLayout user={user}>
            <Outlet />
        </AuthenticatedLayout>
    );
}
