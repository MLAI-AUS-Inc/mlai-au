import type { Route } from "./+types/innovate-connect-alliance";
import { Outlet, redirect, useLoaderData } from "react-router";

import InnovateConnectAllianceLayout from "~/components/InnovateConnectAllianceLayout";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import type { User } from "~/types/user";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=innovate-connect-alliance&next=/innovate-connect-alliance");
    }

    return { user: user as User };
}

export default function InnovateConnectAllianceApp() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <InnovateConnectAllianceLayout user={user}>
            <Outlet />
        </InnovateConnectAllianceLayout>
    );
}
