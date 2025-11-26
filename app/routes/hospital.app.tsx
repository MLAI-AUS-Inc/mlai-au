import type { Route } from "./+types/hospital.app";
import { redirect, Outlet, useLoaderData } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import HospitalAppLayout from "~/components/HospitalAppLayout";
import { getEnv } from "~/lib/env.server";

interface UserData {
    email: string;
    full_name: string;
    avatar_url?: string;
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?next=/hospital/app/dashboard");
    }

    return { user: user as UserData };
}

export default function HospitalApp() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <HospitalAppLayout user={user}>
            <Outlet />
        </HospitalAppLayout>
    );
}
