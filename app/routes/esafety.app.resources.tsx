import type { Route } from "./+types/esafety.app.resources";
import { useLoaderData, redirect, Link } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login");
    return { user };
}

export default function EsafetyAppResources() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resources & Challenges</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Coming Soon
                </p>
            </div>
        </main>
    );
}
