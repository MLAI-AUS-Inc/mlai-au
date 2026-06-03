import type { Route } from "./+types/watt-the-hack.profile";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Form, redirect, useActionData, useFetcher, useLoaderData } from "react-router";
import { InformationCircleIcon, PencilIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import AvatarModal from "~/components/AvatarModal";
import { getCurrentUser, updateUser } from "~/lib/auth";
import { getInitials, generateAvatarUrl } from "~/lib/avatar";
import { getEnv } from "~/lib/env.server";
import {
  createGenericTeam,
  disbandGenericTeam,
  getGenericCurrentTeam,
  getGenericTeams,
  joinGenericTeam,
  leaveGenericTeam,
  transferTeamLead,
  WATT_THE_HACK_SLUG,
  type GenericHackathonMember,
  type GenericHackathonTeam,
} from "~/lib/generic-hackathon";
import { wattClasses } from "~/lib/watt-theme";
import type { User } from "~/types/user";

interface WattUser extends User {
  first_name?: string;
  last_name?: string;
  phone?: string;
  about?: string;
  personas?: string[];
}

type ActionResult = {
  success?: boolean | string;
  profileUpdated?: boolean;
  error?: string;
};

const PERSONA_OPTIONS = [
  { id: "hacker", label: "I am a Hacker", description: "You build things. You love code and technical challenges." },
  { id: "hustler", label: "I am a Hustler", description: "You sell things. You focus on business, marketing, and growth." },
  { id: "hipster", label: "I am a Hipster", description: "You design things. You care about UX, UI, and aesthetics." },
  { id: "healer", label: "I am a Healer", description: "You heal people. You bring clinical or health domain expertise." },
] as const;

const PERSONA_CONFIG: Record<string, { label: string; color: string }> = {
  hacker: { label: "Hacker", color: "border-[#c9dbb8] bg-[#e6efd7] text-[#155420]" },
  hustler: { label: "Hustler", color: "border-[#f0c742]/60 bg-[#fff8dc] text-[#6f4b08]" },
  hipster: { label: "Hipster", color: "border-[#df5047]/25 bg-[#fff1ef] text-[#9f2f28]" },
  healer: { label: "Healer", color: "border-[#c9dbb8] bg-[#edf5df] text-[#155420]" },
};

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

  return { user: user as WattUser, currentTeam, teams };
}

export async function action({ request, context }: Route.ActionArgs): Promise<ActionResult | null> {
  const env = getEnv(context);
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  try {
    if (intent === "create_team") {
      const teamName = String(formData.get("name") || formData.get("team_name") || "").trim();
      if (!teamName) return { error: "Team name is required." };
      await createGenericTeam(env, request, WATT_THE_HACK_SLUG, teamName);
      return { success: true };
    }

    if (intent === "join_team") {
      const code = String(formData.get("code") || "").trim();
      if (!code) return { error: "Team code or name is required." };
      await joinGenericTeam(env, request, WATT_THE_HACK_SLUG, code);
      return { success: true };
    }

    if (intent === "leave_team") {
      await leaveGenericTeam(env, request, WATT_THE_HACK_SLUG);
      return { success: true };
    }

    if (intent === "transfer_lead") {
      const memberId = Number(formData.get("member_id"));
      if (!memberId) return { error: "Pick a teammate to make leader." };
      await transferTeamLead(env, request, WATT_THE_HACK_SLUG, memberId);
      return { success: true };
    }

    if (intent === "disband_team") {
      await disbandGenericTeam(env, request, WATT_THE_HACK_SLUG);
      return { success: true };
    }

    if (intent === "update_profile") {
      formData.set("app", WATT_THE_HACK_SLUG);
      formData.delete("intent");
      await updateUser(env, formData, request);
      return { success: true, profileUpdated: true };
    }
  } catch (error: any) {
    const detail = error?.response?.data?.error || error?.response?.data?.detail || error?.message;
    return { error: detail || "Request failed." };
  }

  return null;
}

function personaLabel(persona: string) {
  return PERSONA_CONFIG[persona.toLowerCase()]?.label || persona;
}

function personaClass(persona: string) {
  return PERSONA_CONFIG[persona.toLowerCase()]?.color || "border-[#e8dfcf] bg-[#fffefa] text-[#64705f]";
}

export default function WattTheHackProfile() {
  const { user: initialUser, currentTeam, teams } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>() as ActionResult | undefined;
  const fetcher = useFetcher<ActionResult>();

  const [firstName, setFirstName] = useState(initialUser.first_name || "");
  const [lastName, setLastName] = useState(initialUser.last_name || "");
  const [email, setEmail] = useState(initialUser.email || "");
  const [phone, setPhone] = useState(initialUser.phone || "");
  const [about, setAbout] = useState(initialUser.about || "");
  const [personas, setPersonas] = useState<string[]>(initialUser.personas || []);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);

  const [teamAvatarFile, setTeamAvatarFile] = useState<File | null>(null);
  const [previewTeamAvatarUrl, setPreviewTeamAvatarUrl] = useState<string | null>(null);
  const [isTeamAvatarModalOpen, setIsTeamAvatarModalOpen] = useState(false);

  const [joinSearch, setJoinSearch] = useState("");
  const [isJoinDropdownOpen, setIsJoinDropdownOpen] = useState(false);
  const joinDropdownRef = useRef<HTMLDivElement>(null);

  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(joinSearch.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (joinDropdownRef.current && !joinDropdownRef.current.contains(event.target as Node)) {
        setIsJoinDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFirstName(initialUser.first_name || "");
    setLastName(initialUser.last_name || "");
    setEmail(initialUser.email || "");
    setPhone(initialUser.phone || "");
    setAbout(initialUser.about || "");
    setPersonas(initialUser.personas || []);
  }, [initialUser]);

  useEffect(() => {
    return () => {
      if (previewAvatarUrl) URL.revokeObjectURL(previewAvatarUrl);
      if (previewTeamAvatarUrl) URL.revokeObjectURL(previewTeamAvatarUrl);
    };
  }, [previewAvatarUrl, previewTeamAvatarUrl]);

  useEffect(() => {
    const data = fetcher.data;
    if (fetcher.state === "idle" && data) {
      if (data.success && data.profileUpdated) {
        setMessage("Profile updated successfully.");
        setError("");
        setAvatarFile(null);
        setTeamAvatarFile(null);
      } else if (data.error) {
        setMessage("");
        setError(data.error);
      }
    }
  }, [fetcher.state, fetcher.data]);

  const teamName = currentTeam?.team_name || "";
  const memberCount = currentTeam?.member_count ?? currentTeam?.members?.length ?? 0;
  const isValidTeamSize = memberCount >= 2 && memberCount <= 6;
  const teamMembers = currentTeam?.members || [];
  const currentUserId = initialUser.id ?? null;
  const leaderId = currentTeam?.leader_id ?? null;
  const isTeamLeader = leaderId != null && currentUserId != null && leaderId === currentUserId;

  const fullName = initialUser.full_name || [initialUser.first_name, initialUser.last_name].filter(Boolean).join(" ") || initialUser.email;
  const isSaving = fetcher.state !== "idle";
  const avatarUrl = previewAvatarUrl || initialUser.avatar_url || generateAvatarUrl(getInitials(fullName));
  const teamAvatarUrl = previewTeamAvatarUrl || currentTeam?.avatar_url || generateAvatarUrl(getInitials(teamName || "Team"));
  const profileFetcherData = fetcher.data;

  const handleAvatarSave = async (file: File) => {
    if (previewAvatarUrl) URL.revokeObjectURL(previewAvatarUrl);
    setAvatarFile(file);
    setPreviewAvatarUrl(URL.createObjectURL(file));
    setIsAvatarModalOpen(false);
  };

  const handleTeamAvatarSave = async (file: File) => {
    if (previewTeamAvatarUrl) URL.revokeObjectURL(previewTeamAvatarUrl);
    setTeamAvatarFile(file);
    setPreviewTeamAvatarUrl(URL.createObjectURL(file));
    setIsTeamAvatarModalOpen(false);
  };

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!firstName || !lastName || !email) {
      setError("First name, last name, and email are required.");
      return;
    }

    const formData = new FormData();
    formData.append("intent", "update_profile");
    formData.append("app", WATT_THE_HACK_SLUG);
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
    <div className={wattClasses.page}>
      <main className="mx-auto max-w-7xl">
        <div className="md:flex md:items-center md:justify-between md:space-x-5">
          <div className="flex items-center space-x-5">
            <div className="shrink-0">
              <div className="relative">
                <img
                  alt=""
                  src={avatarUrl}
                  className="size-16 rounded-full object-cover ring-2 ring-[#e6efd7]"
                />
                <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                <button
                  type="button"
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-[#121e16]/55 opacity-0 transition-opacity hover:opacity-100"
                  onClick={() => setIsAvatarModalOpen(true)}
                >
                  <span className="sr-only">Update profile image</span>
                  <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div>
              <p className={wattClasses.eyebrow}>Profile & Team</p>
              <h1 className="text-2xl font-black text-[#121e16]">{fullName}</h1>
              <p className="text-sm font-medium text-[#64705f]">
                {teamName ? `Member of ${teamName}` : "No team yet"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <section aria-labelledby="team-management-title" className={wattClasses.panel}>
              <div className="px-4 py-5 sm:px-6">
                <h2 id="team-management-title" className="text-lg font-black leading-6 text-[#121e16]">
                  {teamName ? "Change Team" : "Create or Join a Team"}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-[#64705f]">
                  {teamName
                    ? "Create a new team or switch to an existing one."
                    : "You need a team to participate in the hackathon."}
                </p>
              </div>
              <div className="border-t border-[#e8dfcf] px-4 py-5 sm:px-6">
                {actionData?.error && (
                  <div className={`mb-4 ${wattClasses.errorAlert}`}>{actionData.error}</div>
                )}
                {actionData?.success && !actionData?.profileUpdated && (
                  <div className={`mb-4 ${wattClasses.successAlert}`}>Team operation successful.</div>
                )}

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-sm font-bold text-[#64705f]">Create a new team</h3>
                    <Form method="post">
                      <div>
                        <label htmlFor="team-name" className={wattClasses.label}>
                          Team Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="team-name"
                          required
                          className={wattClasses.input}
                          placeholder="Enter team name"
                        />
                      </div>
                      <div className="mt-4">
                        <button type="submit" name="intent" value="create_team" className={wattClasses.buttonPrimary}>
                          Create Team
                        </button>
                      </div>
                    </Form>
                  </div>

                  <div className="border-t border-[#e8dfcf] pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <h3 className="mb-4 text-sm font-bold text-[#64705f]">Join an existing team</h3>
                    <Form method="post">
                      <div>
                        <label htmlFor="team-code" className={wattClasses.label}>
                          Team Name
                        </label>
                        <div className="mt-2" ref={joinDropdownRef}>
                          <div className="relative">
                            <input
                              type="text"
                              name="code"
                              id="team-code"
                              required
                              value={joinSearch}
                              onChange={(event) => {
                                setJoinSearch(event.target.value);
                                setIsJoinDropdownOpen(true);
                              }}
                              onFocus={() => setIsJoinDropdownOpen(true)}
                              placeholder="Start typing team name..."
                              autoComplete="off"
                              className={wattClasses.inputBare}
                            />
                            {isJoinDropdownOpen && filteredTeams.length > 0 && (
                              <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-[#e8dfcf] bg-[#fffefa] py-1 shadow-[0_18px_42px_rgba(67,54,33,0.14)]">
                                {filteredTeams.map((team) => (
                                  <li
                                    key={team.team_id ?? team.id ?? team.team_name}
                                    onMouseDown={(event) => {
                                      event.preventDefault();
                                      setJoinSearch(team.team_name);
                                      setIsJoinDropdownOpen(false);
                                    }}
                                    className="flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#e6efd7]"
                                  >
                                    <img
                                      src={team.avatar_url || generateAvatarUrl(getInitials(team.team_name))}
                                      alt=""
                                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#c9dbb8]"
                                    />
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-black text-[#121e16]">{team.team_name}</p>
                                      <p className="text-xs text-[#64705f]">
                                        {team.member_count} member{team.member_count !== 1 ? "s" : ""}
                                        {team.member_count >= 6 && " (full)"}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {isJoinDropdownOpen && joinSearch && filteredTeams.length === 0 && (
                              <div className="absolute z-20 mt-1 w-full rounded-2xl border border-[#e8dfcf] bg-[#fffefa] px-3 py-3 shadow-[0_18px_42px_rgba(67,54,33,0.14)]">
                                <p className="text-sm text-[#64705f]">No teams found matching &ldquo;{joinSearch}&rdquo;</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button type="submit" name="intent" value="join_team" className={wattClasses.buttonOutline}>
                          Join Team
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="applicant-information-title" className={wattClasses.panelStrong}>
              <div className="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg font-black leading-6 text-[#121e16]">
                  Profile Information
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-[#64705f]">Personal details and application.</p>
              </div>
              <div className="border-t border-[#e8dfcf] px-4 py-5 sm:px-6">
                <fetcher.Form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className={wattClasses.label}>
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        autoComplete="given-name"
                        className={wattClasses.input}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className={wattClasses.label}>
                        Last name
                      </label>
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        autoComplete="family-name"
                        className={wattClasses.input}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className={wattClasses.label}>
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        className={wattClasses.input}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className={wattClasses.label}>
                        Phone
                      </label>
                      <div className="mt-2 flex rounded-[0.85rem] border border-[#e8dfcf] bg-[#fffefa] shadow-sm transition focus-within:border-[#2f6f2c] focus-within:ring-2 focus-within:ring-[#2f6f2c]/20">
                        <div className="flex select-none items-center rounded-l-[0.85rem] border-r border-[#e8dfcf] bg-[#fbf6e9] px-3 text-[#64705f] sm:text-sm">
                          +61
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          autoComplete="tel"
                          className="block min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-[#121e16] outline-none placeholder:text-[#8a8477] focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="4XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="about" className={wattClasses.label}>
                        About
                      </label>
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        className={wattClasses.input}
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <div className="mb-2 flex items-center gap-2">
                        <label className={wattClasses.label}>My Persona</label>
                        <div className="group relative flex items-center">
                          <InformationCircleIcon className="h-4 w-4 cursor-help text-[#64705f]" />
                          <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 rounded-2xl border border-[#e8dfcf] bg-[#121e16] px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                            {PERSONA_OPTIONS.map((option) => (
                              <p key={option.id} className="mb-1 last:mb-0">
                                <strong>{personaLabel(option.id)}:</strong> {option.description}
                              </p>
                            ))}
                            <div className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#121e16]" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {PERSONA_OPTIONS.map((option) => (
                          <div key={option.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                              <input
                                id={option.id}
                                name="personas"
                                type="checkbox"
                                checked={personas.includes(option.id)}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    setPersonas([...personas, option.id]);
                                  } else {
                                    setPersonas(personas.filter((persona) => persona !== option.id));
                                  }
                                }}
                                className="h-4 w-4 rounded border-[#d8cfbd] bg-[#fffefa] text-[#2f6f2c] focus:ring-[#2f6f2c]"
                              />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                              <label htmlFor={option.id} className="font-bold text-[#121e16]">
                                {option.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-end gap-x-6 gap-y-3">
                    {message && <p className="text-sm font-bold text-[#155420]">{message}</p>}
                    {error && <p className="text-sm font-bold text-[#9f2f28]">{error}</p>}
                    {profileFetcherData?.error && <p className="text-sm font-bold text-[#9f2f28]">{profileFetcherData.error}</p>}
                    <button type="submit" disabled={isSaving} className={`${wattClasses.buttonPrimary} disabled:opacity-50`}>
                      {isSaving ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </fetcher.Form>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
            <div className={wattClasses.panel}>
              {teamName ? (
                <>
                  <div
                    className={`flex items-center justify-between rounded-t-[1.25rem] border-b px-4 py-3 sm:px-6 ${
                      isValidTeamSize ? "border-[#c9dbb8] bg-[#e6efd7]" : "border-[#f0c742]/50 bg-[#fff8dc]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`flex h-2 w-2 rounded-full ${isValidTeamSize ? "bg-[#155420]" : "bg-[#f0c742]"}`} />
                      <span className={`text-sm font-black ${isValidTeamSize ? "text-[#155420]" : "text-[#6f4b08]"}`}>
                        {isValidTeamSize ? "Team Ready" : "Forming Team"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#64705f]">
                      <span>{memberCount}/6</span>
                      <span className="hidden sm:inline">members</span>
                      <div className="group relative flex items-center">
                        <InformationCircleIcon className="h-4 w-4 cursor-help text-[#64705f]" />
                        <div className="absolute bottom-full right-0 z-10 mb-2 hidden w-48 rounded-2xl bg-[#121e16] px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                          Teams must have between 2 and 6 members.
                          <div className="absolute right-1 top-full -mt-1 h-2 w-2 rotate-45 bg-[#121e16]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex flex-col items-center border-b border-[#e8dfcf] pb-6">
                      <div className="relative inline-block">
                        <img
                          className="h-24 w-24 rounded-2xl object-cover ring-1 ring-[#c9dbb8]"
                          src={teamAvatarUrl}
                          alt={teamName}
                        />
                        <button
                          type="button"
                          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-2xl bg-[#121e16]/55 opacity-0 transition-opacity hover:opacity-100"
                          onClick={() => setIsTeamAvatarModalOpen(true)}
                        >
                          <span className="sr-only">Update team logo</span>
                          <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                      <h2 id="timeline-title" className="mt-3 text-center text-xl font-black text-[#121e16]">
                        {teamName}
                      </h2>
                    </div>

                    <h3 className="mt-6 text-sm font-bold text-[#64705f]">Team Members</h3>
                    <div className="mt-4 flow-root">
                      <ul role="list" className="-my-5 divide-y divide-[#e8dfcf]">
                        {teamMembers.length > 0 ? (
                          teamMembers.map((member: GenericHackathonMember & { personas?: string[] }, index: number) => {
                            const memberInitials = getInitials(member.full_name || member.email);
                            const memberAvatarUrl = member.avatar_url || generateAvatarUrl(memberInitials);
                            return (
                              <li key={member.id ?? index} className="py-4">
                                <div className="flex items-center space-x-4">
                                  <div className="shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover ring-1 ring-[#c9dbb8]"
                                      src={memberAvatarUrl}
                                      alt={member.full_name || member.email}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-black text-[#121e16]">
                                      {member.full_name || member.email}
                                      {member.id === leaderId && (
                                        <span className="ml-2 inline-flex items-center rounded-full border border-[#c9dbb8] bg-[#e6efd7] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#155420]">
                                          Leader
                                        </span>
                                      )}
                                    </p>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {member.personas && member.personas.length > 0 ? (
                                        member.personas.map((persona) => (
                                          <span
                                            key={persona}
                                            className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-bold ${personaClass(persona)}`}
                                          >
                                            {personaLabel(persona)}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-xs italic text-[#64705f]">{member.role || "Participant"}</span>
                                      )}
                                    </div>
                                  </div>
                                  {isTeamLeader && member.id !== leaderId && (
                                    <fetcher.Form method="post" className="shrink-0">
                                      <input type="hidden" name="intent" value="transfer_lead" />
                                      <input type="hidden" name="member_id" value={member.id} />
                                      <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="rounded-[0.5rem] border border-[#e8dfcf] bg-[#fffefa] px-2.5 py-1 text-xs font-bold text-[#155420] hover:bg-[#e6efd7] disabled:opacity-50"
                                      >
                                        Make leader
                                      </button>
                                    </fetcher.Form>
                                  )}
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li className="py-4">
                            <p className="text-sm text-[#64705f]">No team members yet.</p>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-[#e8dfcf] pt-4">
                      {isTeamLeader ? (
                        <fetcher.Form
                          method="post"
                          onSubmit={(e) => {
                            if (!window.confirm("Disband this team? Every member will be removed.")) e.preventDefault();
                          }}
                        >
                          <input type="hidden" name="intent" value="disband_team" />
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full rounded-[0.65rem] border border-[#df5047]/40 bg-[#fff1ef] px-3 py-2 text-sm font-bold text-[#9f2f28] hover:bg-[#ffe4e0] disabled:opacity-50"
                          >
                            Disband team
                          </button>
                          <p className="mt-2 text-xs text-[#64705f]">
                            As leader, transfer leadership to a teammate to leave, or disband to remove the whole team.
                          </p>
                        </fetcher.Form>
                      ) : (
                        <fetcher.Form method="post">
                          <input type="hidden" name="intent" value="leave_team" />
                          <button
                            type="submit"
                            disabled={isSaving || memberCount <= 2}
                            className="w-full rounded-[0.65rem] border border-[#e8dfcf] bg-[#fffefa] px-3 py-2 text-sm font-bold text-[#64705f] hover:bg-[#fbf6e9] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Leave team
                          </button>
                          {memberCount <= 2 && (
                            <p className="mt-2 text-xs text-[#64705f]">
                              Your team needs at least 2 members — ask the leader to disband.
                            </p>
                          )}
                        </fetcher.Form>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 py-5 text-center sm:px-6">
                  <div className="mb-3 inline-flex rounded-full bg-[#e6efd7] p-3">
                    <UserGroupIcon className="h-8 w-8 text-[#155420]" aria-hidden="true" />
                  </div>
                  <h2 id="timeline-title" className="text-lg font-black text-[#121e16]">No Team Yet</h2>
                  <p className="mt-2 text-sm text-[#64705f]">
                    Create or join a team using the form on the left to get started.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleAvatarSave}
        initialImage={avatarUrl}
      />
      <AvatarModal
        isOpen={isTeamAvatarModalOpen}
        onClose={() => setIsTeamAvatarModalOpen(false)}
        onSave={handleTeamAvatarSave}
        initialImage={teamAvatarUrl}
        title="Update Team Logo"
      />
    </div>
  );
}
