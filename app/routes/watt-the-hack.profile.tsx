import type { Route } from "./+types/watt-the-hack.profile";
import { Form, redirect, useActionData, useLoaderData } from "react-router";
import { getCurrentUser, updateUser } from "~/lib/auth";
import { getInitials, generateAvatarUrl } from "~/lib/avatar";
import { getEnv } from "~/lib/env.server";
import {
  createGenericTeam,
  getGenericCurrentTeam,
  getGenericTeams,
  joinGenericTeam,
  WATT_THE_HACK_SLUG,
  type GenericHackathonTeam,
} from "~/lib/generic-hackathon";
import type { User } from "~/types/user";

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  let user = null;
  try {
    user = await getCurrentUser(env, request);
  } catch (error) {
    console.warn("Treating Watt The Hack auth lookup failure as logged out.", error);
  }
  if (!user) {
    throw redirect("/platform/login?app=watt-the-hack&next=/watt-the-hack/profile");
  }

  const [currentTeam, teams] = await Promise.all([
    getGenericCurrentTeam(env, request).catch(() => null),
    getGenericTeams(env, request).catch(() => []),
  ]);

  return { user: user as User, currentTeam, teams };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  try {
    if (intent === "create_team") {
      const teamName = String(formData.get("team_name") || "").trim();
      if (!teamName) return { error: "Team name is required." };
      await createGenericTeam(env, request, WATT_THE_HACK_SLUG, teamName);
      return { success: "Team created." };
    }

    if (intent === "join_team") {
      const code = String(formData.get("code") || "").trim();
      if (!code) return { error: "Team code or name is required." };
      await joinGenericTeam(env, request, WATT_THE_HACK_SLUG, code);
      return { success: "Team joined." };
    }

    if (intent === "update_profile") {
      formData.set("app", WATT_THE_HACK_SLUG);
      formData.delete("intent");
      await updateUser(env, formData, request);
      return { success: "Profile updated." };
    }
  } catch (error: any) {
    const detail = error?.response?.data?.error || error?.response?.data?.detail || error?.message;
    return { error: detail || "Request failed." };
  }

  return { error: "Unsupported action." };
}

function TeamCard({ team }: { team: GenericHackathonTeam | null }) {
  if (!team) {
    return (
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        You are not on a Watt The Hack team yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950">{team.team_name}</h2>
          <p className="mt-1 text-sm text-gray-500">Team code: {team.code}</p>
        </div>
        <span className="rounded-full bg-[#e6f8d8] px-3 py-1 text-sm font-semibold text-[#24523f]">
          {team.member_count}/6 members
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {team.members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
            <img
              alt=""
              src={member.avatar_url || generateAvatarUrl(getInitials(member.full_name || member.email))}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-950">{member.full_name || member.email}</p>
              <p className="truncate text-xs text-gray-500">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WattTheHackProfile() {
  const { user, currentTeam, teams } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const avatarUrl = user.avatar_url || generateAvatarUrl(getInitials(user.full_name || user.email));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        <section className="rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-6 py-5">
            <div className="flex items-center gap-4">
              <img alt="" src={avatarUrl} className="h-14 w-14 rounded-full object-cover ring-1 ring-black/10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-950">Profile</h1>
                <p className="text-sm text-gray-600">Update your participant details.</p>
              </div>
            </div>
          </div>

          <Form method="post" encType="multipart/form-data" className="space-y-6 px-6 py-6">
            <input type="hidden" name="intent" value="update_profile" />
            <input type="hidden" name="app" value={WATT_THE_HACK_SLUG} />

            {actionData?.success && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">{actionData.success}</div>
            )}
            {actionData?.error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{actionData.error}</div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">First name</span>
                <input
                  name="first_name"
                  defaultValue={(user as any).first_name || ""}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 shadow-sm focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Last name</span>
                <input
                  name="last_name"
                  defaultValue={(user as any).last_name || ""}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 shadow-sm focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                name="email"
                type="email"
                defaultValue={user.email}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 shadow-sm focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone</span>
              <input
                name="phone"
                defaultValue={(user as any).phone || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 shadow-sm focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">About</span>
              <textarea
                name="about"
                rows={5}
                defaultValue={(user as any).about || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-950 shadow-sm focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Profile image</span>
                <input name="avatar" type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-700" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Team image</span>
                <input name="team_avatar" type="file" accept="image/*" className="mt-1 block w-full text-sm text-gray-700" />
              </label>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="rounded-md bg-[#10231f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d3c35]">
                Save profile
              </button>
            </div>
          </Form>
        </section>

        <aside className="space-y-6">
          <TeamCard team={currentTeam} />

          <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Create a Team</h2>
            <Form method="post" className="mt-4 flex gap-2">
              <input type="hidden" name="intent" value="create_team" />
              <input
                name="team_name"
                placeholder="Team name"
                className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
              />
              <button type="submit" className="rounded-md bg-[#9fe870] px-3 py-2 text-sm font-semibold text-[#10231f] hover:bg-[#b2f38a]">
                Create
              </button>
            </Form>
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-950">Join a Team</h2>
            <Form method="post" className="mt-4 flex gap-2">
              <input type="hidden" name="intent" value="join_team" />
              <input
                name="code"
                list="watt-team-list"
                placeholder="TEAM1 or team name"
                className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-950 focus:border-[#1f6f54] focus:outline-none focus:ring-1 focus:ring-[#1f6f54]"
              />
              <datalist id="watt-team-list">
                {teams.map((team) => (
                  <option key={team.id} value={team.code}>{team.team_name}</option>
                ))}
              </datalist>
              <button type="submit" className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-gray-950 hover:bg-gray-50">
                Join
              </button>
            </Form>
            {teams.length > 0 && (
              <div className="mt-4 space-y-2">
                {teams.slice(0, 6).map((team) => (
                  <div key={team.id} className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm">
                    <span className="font-medium text-gray-800">{team.team_name}</span>
                    <span className="text-gray-500">{team.code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
