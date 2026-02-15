import type { Route } from "./+types/hospital.app.team";
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
        const response = await axiosInstance.get("/api/v1/hackathons/hospital/teams/?member_id=" + (user as any).id, { headers });
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
            await axiosInstance.post("/api/v1/hackathons/hospital/teams/", { name }, { headers });
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
            await axiosInstance.post("/api/v1/hackathons/hospital/teams/join/", { code }, { headers });
            return { success: true };
        } catch (error: any) {
            const errDetail = error.response?.data?.detail || "Failed to join team";
            return { error: errDetail };
        }
    }

    return null;
}

export default function HospitalAppTeam() {
    const { user, myTeam } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Team Management</h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                    Create or join a team for Medhack: Frontiers.
                </p>
            </div>

            <div className="mt-8">
                {myTeam ? (
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Your Team: {myTeam.name}</h3>
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500">Members</h4>
                                <ul className="mt-2 divide-y divide-gray-200">
                                    {myTeam.members?.map((member: any) => (
                                        <li key={member.id} className="py-2 text-sm text-gray-900">
                                            {member.full_name || member.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Create or Join a Team</h3>
                            {actionData?.error && (
                                <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-700">
                                    {actionData.error}
                                </div>
                            )}

                            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Create Team Form */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-4">Create a new team</h4>
                                    <Form method="POST">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Team Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                name="intent"
                                                value="create_team"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Create Team
                                            </button>
                                        </div>
                                    </Form>
                                </div>

                                {/* Join Team Form */}
                                <div className="border-t border-gray-200 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                    <h4 className="text-sm font-medium text-gray-500 mb-4">Join an existing team</h4>
                                    <Form method="POST">
                                        <div>
                                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                                                Team Code / Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    required
                                                    placeholder="Enter team name to join"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                name="intent"
                                                value="join_team"
                                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
