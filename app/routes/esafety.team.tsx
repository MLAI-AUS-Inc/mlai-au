import type { Route } from "./+types/esafety.team";
import { Form, useActionData, useLoaderData, redirect } from "react-router";
import { axiosInstance } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login");

    // Fetch user's team for this hackathon
    let myTeam = null;
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get("/api/v1/hackathons/esafety/teams/?member_id=" + (user as any).id, { headers });
        const teams = response.data;

        if (Array.isArray(teams) && teams.length > 0) {
            myTeam = teams[0]; // Assuming user can only be in one team per hackathon
        }
    } catch (error) {
        console.error("Failed to fetch teams:", error);
    }

    return { user, myTeam };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = context.cloudflare.env;
    const formData = await request.formData();
    const intent = formData.get("intent");

    const cookieHeader = request.headers.get("Cookie");
    const headers: Record<string, string> = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    if (intent === "create_team") {
        const name = formData.get("name")?.toString();
        if (!name) return { error: "Team name is required" };

        try {
            await axiosInstance.post("/api/v1/hackathons/esafety/teams/", { name }, { headers });
            return { success: true };
        } catch (error: any) {
            const errDetail = error.response?.data?.detail || "Failed to create team";
            return { error: errDetail };
        }
    }

    if (intent === "join_team") {
        const code = formData.get("code")?.toString();
        if (!code) return { error: "Team code/name is required" };

        try {
            await axiosInstance.post("/api/v1/hackathons/esafety/teams/join/", { code }, { headers });
            return { success: true };
        } catch (error: any) {
            const errDetail = error.response?.data?.detail || "Failed to join team";
            return { error: errDetail };
        }
    }

    return null;
}

export default function EsafetyAppTeam() {
    const { user, myTeam } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Team Management
                    </h2>
                </div>
            </div>

            <div className="mt-8">
                {myTeam ? (
                    <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-white">Your Team: {myTeam.name}</h3>
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-400">Members</h4>
                                <ul className="mt-2 divide-y divide-white/10">
                                    {myTeam.members?.map((member: any) => (
                                        <li key={member.id} className="py-2 text-sm text-white">
                                            {member.full_name || member.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg bg-white/5 shadow ring-1 ring-white/10">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-white">Create or Join a Team</h3>
                            {actionData?.error && (
                                <div className="mt-2 rounded-md bg-red-500/10 p-2 text-sm text-red-400">
                                    {actionData.error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Create Team Form */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-300 mb-4">Create a new team</h4>
                                    <Form method="POST">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                                Team Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                name="intent"
                                                value="create_team"
                                                className="rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                                            >
                                                Create Team
                                            </button>
                                        </div>
                                    </Form>
                                </div>

                                {/* Join Team Form */}
                                <div className="border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                    <h4 className="text-sm font-medium text-gray-300 mb-4">Join an existing team</h4>
                                    <Form method="POST">
                                        <div>
                                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-white">
                                                Team Code / Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    required
                                                    placeholder="Enter team name to join"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                name="intent"
                                                value="join_team"
                                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                            >
                                                Join Team
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
