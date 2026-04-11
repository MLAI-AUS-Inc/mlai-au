import type { Route } from "./+types/innovate-connect-alliance.team";
import React, { useEffect, useState } from "react";
import {
    Form,
    redirect,
    useActionData,
    useFetcher,
    useLoaderData,
} from "react-router";
import { InformationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";

import AvatarModal from "~/components/AvatarModal";
import { createApiClient } from "~/lib/api";
import { getCurrentUser, updateUser } from "~/lib/auth";
import {
    getInnovateConnectAllianceTeam,
    getInnovateConnectAllianceTeams,
    type InnovateConnectAllianceTeam,
    type InnovateConnectAllianceTeamMember,
} from "~/lib/innovate-connect-alliance";
import { getEnv } from "~/lib/env.server";
import { generateAvatarUrl, getInitials } from "~/lib/avatar";

interface UserData {
    id: number;
    email: string;
    full_name: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    about?: string;
    personas?: string[];
    avatar_url?: string | null;
    innovate_connect_alliance_team?: {
        team_name: string;
        team_id?: number;
        avatar_url?: string | null;
        member_count?: number;
        is_valid_team_size?: boolean;
        members: InnovateConnectAllianceTeamMember[];
    } | null;
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=innovate-connect-alliance&next=/innovate-connect-alliance/team");
    }

    const [currentTeam, availableTeams] = await Promise.all([
        getInnovateConnectAllianceTeam(env, request, (user as any).id),
        getInnovateConnectAllianceTeams(env, request),
    ]);

    return {
        user: user as UserData,
        currentTeam,
        availableTeams,
    };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const formData = await request.formData();
    const intent = formData.get("intent");
    const client = createApiClient(env, request);

    if (intent === "create_team") {
        const teamName = formData.get("team_name")?.toString();
        if (!teamName) return { error: "Team name is required." };

        try {
            await client.post("/api/v1/hackathons/innovate-connect-alliance/teams/", {
                team_name: teamName,
            });
            return { success: true };
        } catch (error: any) {
            return { error: error.response?.data?.error || "Failed to create team." };
        }
    }

    if (intent === "join_team") {
        const teamId = formData.get("team_id")?.toString();
        if (!teamId) return { error: "Please choose a team." };

        try {
            await client.post("/api/v1/hackathons/innovate-connect-alliance/teams/join/", {
                team_id: Number(teamId),
            });
            return { success: true };
        } catch (error: any) {
            return { error: error.response?.data?.error || "Failed to join team." };
        }
    }

    if (intent === "update_profile") {
        try {
            await updateUser(env, formData, request);
            return { success: true, profileUpdated: true };
        } catch (error) {
            console.error("Failed to update profile:", error);
            return { error: "Failed to update profile." };
        }
    }

    return null;
}

const PERSONA_OPTIONS = [
    { id: "hacker", label: "Hacker", emoji: "💻" },
    { id: "hustler", label: "Hustler", emoji: "💼" },
    { id: "hipster", label: "Hipster", emoji: "🎨" },
    { id: "healer", label: "Healer", emoji: "⚕️" },
];

export default function InnovateConnectAllianceTeamPage() {
    const { user: initialUser, currentTeam, availableTeams } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const fetcher = useFetcher<typeof action>();

    const [firstName, setFirstName] = useState(initialUser.first_name || "");
    const [lastName, setLastName] = useState(initialUser.last_name || "");
    const [email, setEmail] = useState(initialUser.email || "");
    const [phone, setPhone] = useState(initialUser.phone || "");
    const [about, setAbout] = useState(initialUser.about || "");
    const [personas, setPersonas] = useState<string[]>(initialUser.personas || []);
    const [selectedTeamId, setSelectedTeamId] = useState<string>("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [teamAvatarFile, setTeamAvatarFile] = useState<File | null>(null);
    const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
    const [previewTeamAvatarUrl, setPreviewTeamAvatarUrl] = useState<string | null>(null);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isTeamAvatarModalOpen, setIsTeamAvatarModalOpen] = useState(false);

    const team = currentTeam || initialUser.innovate_connect_alliance_team || null;
    const teamMembers = team?.members || [];
    const teamName = team?.team_name || "";
    const teamAvatarUrl =
        previewTeamAvatarUrl ||
        team?.avatar_url ||
        generateAvatarUrl(getInitials(teamName || "ICA Team"));
    const avatarUrl =
        previewAvatarUrl ||
        initialUser.avatar_url ||
        generateAvatarUrl(getInitials(initialUser.full_name || "Innovator"));

    useEffect(() => {
        setFirstName(initialUser.first_name || "");
        setLastName(initialUser.last_name || "");
        setEmail(initialUser.email || "");
        setPhone(initialUser.phone || "");
        setAbout(initialUser.about || "");
        setPersonas(initialUser.personas || []);
    }, [initialUser]);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success && fetcher.data.profileUpdated) {
                setMessage("Profile updated successfully.");
                setError("");
                setAvatarFile(null);
                setTeamAvatarFile(null);
            } else if (fetcher.data.error) {
                setError(fetcher.data.error);
                setMessage("");
            }
        }
    }, [fetcher.data, fetcher.state]);

    const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");
        setError("");

        const formData = new FormData();
        formData.append("intent", "update_profile");
        formData.append("app", "innovate-connect-alliance");
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (about) formData.append("about", about);
        personas.forEach((persona) => formData.append("personas", persona));
        if (avatarFile) formData.append("avatar", avatarFile);
        if (teamAvatarFile) formData.append("team_avatar", teamAvatarFile);

        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
    };

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <img src={avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
                        <button
                            type="button"
                            onClick={() => setIsAvatarModalOpen(true)}
                            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition hover:opacity-100"
                        >
                            <PencilIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{initialUser.full_name}</h1>
                        <p className="text-sm text-white/50">
                            {teamName ? `Member of ${teamName}` : "No team yet"}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80">
                            <div className="px-5 py-5">
                                <h2 className="text-lg font-semibold text-white">
                                    {teamName ? "Change Team" : "Create or Join a Team"}
                                </h2>
                                <p className="mt-1 text-sm text-white/45">
                                    Teams need between 2 and 6 members before a video can be submitted.
                                </p>
                            </div>
                            <div className="grid gap-6 border-t border-white/10 px-5 py-5 md:grid-cols-2">
                                <Form method="post" className="space-y-4">
                                    <div>
                                        <label htmlFor="new-team-name" className="block text-sm font-medium text-white">
                                            New Team Name
                                        </label>
                                        <input
                                            id="new-team-name"
                                            name="team_name"
                                            type="text"
                                            className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30"
                                            placeholder="Enter a team name"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        name="intent"
                                        value="create_team"
                                        className="rounded-lg bg-[#8ef4d4] px-4 py-2 text-sm font-semibold text-[#110822] hover:bg-[#78e5c2]"
                                    >
                                        Create Team
                                    </button>
                                </Form>

                                <Form method="post" className="space-y-4">
                                    <div>
                                        <label htmlFor="join-team" className="block text-sm font-medium text-white">
                                            Join Existing Team
                                        </label>
                                        <select
                                            id="join-team"
                                            name="team_id"
                                            value={selectedTeamId}
                                            onChange={(event) => setSelectedTeamId(event.target.value)}
                                            className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                        >
                                            <option value="">Choose a team</option>
                                            {availableTeams.map((availableTeam) => (
                                                <option
                                                    key={availableTeam.team_id}
                                                    value={availableTeam.team_id}
                                                    className="text-black"
                                                >
                                                    {availableTeam.team_name} ({availableTeam.member_count ?? 0} members)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        name="intent"
                                        value="join_team"
                                        className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
                                    >
                                        Join Team
                                    </button>
                                </Form>
                            </div>

                            {actionData?.error && (
                                <p className="border-t border-white/10 px-5 py-4 text-sm text-red-300">
                                    {actionData.error}
                                </p>
                            )}
                            {actionData?.success && !actionData?.profileUpdated && (
                                <p className="border-t border-white/10 px-5 py-4 text-sm text-[#8ef4d4]">
                                    Team updated successfully.
                                </p>
                            )}
                        </section>

                        <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80">
                            <div className="px-5 py-5">
                                <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                                <p className="mt-1 text-sm text-white/45">
                                    Keep your profile current so teammates and reviewers know your strengths.
                                </p>
                            </div>
                            <div className="border-t border-white/10 px-5 py-5">
                                <form onSubmit={handleProfileSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-white">First name</label>
                                            <input
                                                value={firstName}
                                                onChange={(event) => setFirstName(event.target.value)}
                                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Last name</label>
                                            <input
                                                value={lastName}
                                                onChange={(event) => setLastName(event.target.value)}
                                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-white">Phone</label>
                                            <input
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                                className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white">About</label>
                                        <textarea
                                            rows={4}
                                            value={about}
                                            onChange={(event) => setAbout(event.target.value)}
                                            className="mt-2 block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <label className="block text-sm font-medium text-white">Personas</label>
                                            <div className="group relative">
                                                <InformationCircleIcon className="h-4 w-4 text-white/35" />
                                                <div className="absolute left-0 top-full z-10 mt-2 hidden w-64 rounded-lg bg-black px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                                                    Pick the strengths that best describe how you contribute to a team.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            {PERSONA_OPTIONS.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={personas.includes(option.id)}
                                                        onChange={(event) => {
                                                            if (event.target.checked) {
                                                                setPersonas([...personas, option.id]);
                                                            } else {
                                                                setPersonas(personas.filter((persona) => persona !== option.id));
                                                            }
                                                        }}
                                                    />
                                                    <span>
                                                        {option.emoji} {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {(message || error) && (
                                        <p className={`text-sm ${error ? "text-red-300" : "text-[#8ef4d4]"}`}>
                                            {error || message}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={fetcher.state !== "idle"}
                                        className="rounded-lg bg-[#8ef4d4] px-4 py-2 text-sm font-semibold text-[#110822] hover:bg-[#78e5c2] disabled:opacity-60"
                                    >
                                        {fetcher.state !== "idle" ? "Saving..." : "Save Profile"}
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#8ef4d4]/70">
                                        Team
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-white">
                                        {teamName || "No Team Yet"}
                                    </h2>
                                </div>
                                {teamName && (
                                    <div className="relative">
                                        <img
                                            src={teamAvatarUrl}
                                            alt=""
                                            className="h-14 w-14 rounded-xl object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsTeamAvatarModalOpen(true)}
                                            className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 transition hover:opacity-100"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="mt-4 text-sm text-white/50">
                                {teamName
                                    ? `${teamMembers.length} of 6 seats filled. Teams need at least 2 members to submit.`
                                    : "Create or join a team to unlock video submissions."}
                            </p>
                        </section>

                        <section className="rounded-2xl border border-white/10 bg-[#1a0e2e]/80 p-6">
                            <h3 className="text-lg font-semibold text-white">Team Members</h3>
                            <div className="mt-4 space-y-3">
                                {teamMembers.length > 0 ? (
                                    teamMembers.map((member) => (
                                        <div
                                            key={member.id || member.email || member.full_name}
                                            className="flex items-start gap-3 rounded-lg bg-white/5 px-3 py-3"
                                        >
                                            <img
                                                src={
                                                    member.avatar_url ||
                                                    generateAvatarUrl(getInitials(member.full_name))
                                                }
                                                alt=""
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-white">
                                                    {member.full_name}
                                                </p>
                                                <p className="text-xs text-white/45">
                                                    {member.role || "Participant"}
                                                </p>
                                                {member.personas && member.personas.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {member.personas.map((persona) => (
                                                            <span
                                                                key={persona}
                                                                className="rounded-full bg-[#8ef4d4]/10 px-2 py-1 text-xs font-medium text-[#8ef4d4]"
                                                            >
                                                                {persona}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-white/45">No team members to show yet.</p>
                                )}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>

            <AvatarModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                onSave={(file) => {
                    setAvatarFile(file);
                    setPreviewAvatarUrl(URL.createObjectURL(file));
                }}
                initialImage={avatarUrl}
            />
            <AvatarModal
                isOpen={isTeamAvatarModalOpen}
                onClose={() => setIsTeamAvatarModalOpen(false)}
                onSave={(file) => {
                    setTeamAvatarFile(file);
                    setPreviewTeamAvatarUrl(URL.createObjectURL(file));
                }}
                initialImage={teamAvatarUrl}
                title="Update Team Logo"
            />
        </div>
    );
}
