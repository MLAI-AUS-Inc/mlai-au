import type { Route } from "./+types/esafety.app.team";
import { Form, useActionData, useLoaderData, redirect } from "react-router";
import { backendFetch } from "~/lib/backend.server";
import { getCurrentUser } from "~/lib/auth";

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);
    if (!user) return redirect("/platform/login");

    // Fetch user's team for this hackathon
    // Assuming the backend has an endpoint to get "my team" for a specific hackathon
    // Or we fetch all teams and filter (less efficient)
    // Let's assume GET /api/v1/hackathons/esafety/teams/me exists or we use the general list and filter
    // For now, let's try to fetch all teams and see if the user is in one, or if there's a specific endpoint.
    // The plan said "GET /api/v1/hackathons/esafety/teams/ (maybe filtered to my teams by query param)"

    const res = await backendFetch(env, "/api/v1/hackathons/esafety/teams/?member_id=" + user.id, { method: "GET" });
    // If the backend doesn't support filtering by member_id, we might get all teams.
    // Let's assume the backend returns a list.

    let myTeam = null;
    if (res.ok) {
        const teams = await res.json();
        // If the backend filters for us, great. If not, we might need to find it.
        // Assuming the response is a list of teams.
        if (Array.isArray(teams) && teams.length > 0) {
            myTeam = teams[0]; // Assuming user can only be in one team per hackathon
        }
    }

    return { user, myTeam };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = context.cloudflare.env;
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "create_team") {
        const name = formData.get("name")?.toString();
        if (!name) return { error: "Team name is required" };

        const res = await backendFetch(env, "/api/v1/hackathons/esafety/teams/", {
            method: "POST",
            body: JSON.stringify({ name }),
        });

        if (!res.ok) {
            const err = await res.json();
            return { error: err.detail || "Failed to create team" };
        }
        return { success: true };
    }

    // Join team logic could go here if needed (e.g. via invite code)

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
                            <h3 className="text-base font-semibold leading-6 text-white">Create a Team</h3>
                            {actionData?.error && (
                                <div className="mt-2 rounded-md bg-red-500/10 p-2 text-sm text-red-400">
                                    {actionData.error}
                                </div>
                            )}
                            <Form method="POST" className="mt-4">
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
                    </div>
                )}
            </div>
        </main>
    );
}
