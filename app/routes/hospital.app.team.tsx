import type { Route } from "./+types/hospital.app.team";
import React, { useState, useEffect } from 'react';
import { Form, redirect, useLoaderData, useRevalidator, useFetcher, useActionData } from "react-router";
import { axiosInstance } from "~/lib/api";
import { updateUser, getCurrentUser } from '~/lib/auth';
import { getInitials, generateAvatarUrl } from '~/lib/avatar';
import { getEnv } from "~/lib/env.server";
import AvatarModal from "~/components/AvatarModal";
import { PencilIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface TeamMember {
    full_name: string;
    avatar_url?: string;
    role?: string;
    personas?: string[];
}

interface HospitalTeam {
    id?: number;
    name: string;
    team_name?: string;
    members: TeamMember[];
}

interface UserData {
    id: number;
    email: string;
    full_name: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    about?: string;
    personas?: string[];
    avatar_url?: string;
    team?: {
        team_name: string;
        avatar_url?: string;
        members: TeamMember[];
    };
    hospital_team?: {
        team_name: string;
        avatar_url?: string;
        members: TeamMember[];
    };
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?app=hospital&next=/hospital/app/team");
    }

    // Fetch user's hospital team via hackathon API
    let hospitalTeam: HospitalTeam | null = null;
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get(
            `/api/v1/hackathons/hospital/teams/?member_id=${(user as any).id}`,
            { headers }
        );
        const teams = response.data;
        if (Array.isArray(teams) && teams.length > 0) {
            hospitalTeam = teams[0];
        }
    } catch (error) {
        console.error("Failed to fetch hospital team:", error);
    }

    return { user: user as UserData, hospitalTeam };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const formData = await request.formData();
    const intent = formData.get("intent");

    const cookieHeader = request.headers.get("Cookie");
    const headers: Record<string, string> = {};
    if (cookieHeader) {
        headers["Cookie"] = cookieHeader;
    }

    // Team create/join intents go to hospital hackathon API
    if (intent === "create_team") {
        const name = formData.get("name")?.toString();
        if (!name) return { error: "Team name is required" };

        try {
            await axiosInstance.post(
                "/api/v1/hackathons/hospital/teams/",
                { name },
                { headers }
            );
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
            await axiosInstance.post(
                "/api/v1/hackathons/hospital/teams/join/",
                { code },
                { headers }
            );
            return { success: true };
        } catch (error: any) {
            const errDetail = error.response?.data?.detail || "Failed to join team";
            return { error: errDetail };
        }
    }

    // Profile update intent (existing behavior)
    if (intent === "update_profile") {
        try {
            // Remove the intent field before sending
            formData.delete("intent");
            await updateUser(env, formData, request);
            return { success: true, profileUpdated: true };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { error: 'Error updating profile.' };
        }
    }

    return null;
}

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

const PERSONA_CONFIG: Record<string, { label: string; emoji: string; color: string; ring: string }> = {
    hacker: { label: 'Hacker', emoji: '\u{1F4BB}', color: 'bg-slate-50 text-slate-700', ring: 'ring-slate-600/20' },
    hustler: { label: 'Hustler', emoji: '\u{1F4BC}', color: 'bg-amber-50 text-amber-700', ring: 'ring-amber-600/20' },
    hipster: { label: 'Hipster', emoji: '\u{1F3A8}', color: 'bg-rose-50 text-rose-700', ring: 'ring-rose-600/20' },
    healer: { label: 'Healer', emoji: '\u{2695}\u{FE0F}', color: 'bg-emerald-50 text-emerald-700', ring: 'ring-emerald-600/20' },
};

export default function HospitalAppTeam() {
    const { user: initialUser, hospitalTeam } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const revalidator = useRevalidator();
    const fetcher = useFetcher();

    const [firstName, setFirstName] = useState(initialUser.first_name || '');
    const [lastName, setLastName] = useState(initialUser.last_name || '');
    const [email, setEmail] = useState(initialUser.email || '');
    const [phone, setPhone] = useState(initialUser.phone || '');
    const [about, setAbout] = useState(initialUser.about || '');
    const [personas, setPersonas] = useState<string[]>(initialUser.personas || []);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);

    // Derive team data from hospitalTeam (from hackathon API) or fallback to user profile
    const teamData = hospitalTeam || initialUser.hospital_team || initialUser.team;
    const teamName = hospitalTeam?.name || hospitalTeam?.team_name || teamData?.team_name || '';
    const teamMembers = (teamData?.members || []).map(m => {
        if (m.full_name === initialUser.full_name) {
            return { ...m, personas: initialUser.personas };
        }
        return m;
    });

    const handleAvatarSave = async (file: File) => {
        setAvatarFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewAvatarUrl(objectUrl);
        setIsAvatarModalOpen(false);
    };

    useEffect(() => {
        if (initialUser) {
            setFirstName(initialUser.first_name || '');
            setLastName(initialUser.last_name || '');
            setEmail(initialUser.email || '');
            setPhone(initialUser.phone || '');
            setAbout(initialUser.about || '');
            setPersonas(initialUser.personas || []);
        }
    }, [initialUser]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!firstName || !lastName || !email) {
            setError('First name, last name, and email are required.');
            return;
        }

        const formData = new FormData();
        formData.append('intent', 'update_profile');
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        if (phone) formData.append('phone', phone);
        if (about) formData.append('about', about);
        personas.forEach(p => formData.append('personas', p));
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        fetcher.submit(formData, {
            method: "post",
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success && fetcher.data.profileUpdated) {
                setMessage('Profile updated successfully.');
                setAvatarFile(null);
            } else if (fetcher.data.error) {
                setError(fetcher.data.error);
            }
        }
    }, [fetcher.state, fetcher.data]);

    const isSaving = fetcher.state !== "idle";
    const avatarUrl = previewAvatarUrl || initialUser.avatar_url || generateAvatarUrl(getInitials(initialUser.full_name || ''));

    return (
        <div className="min-h-full bg-gray-50">
            <main className="py-10">
                {/* Profile header */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center space-x-5">
                        <div className="shrink-0">
                            <div className="relative">
                                <img
                                    alt=""
                                    src={avatarUrl}
                                    className="size-16 rounded-full object-cover"
                                />
                                <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                                <button
                                    type="button"
                                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                    onClick={() => setIsAvatarModalOpen(true)}
                                >
                                    <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{initialUser.full_name}</h1>
                            <p className="text-sm font-medium text-gray-500">
                                {teamName ? `Member of ${teamName}` : 'No team yet'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2 lg:col-start-1">

                        {/* Team Create / Join — only shown when user has no team */}
                        {!teamName && (
                            <section aria-labelledby="team-management-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="team-management-title" className="text-lg font-medium leading-6 text-gray-900">
                                            Create or Join a Team
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            You need a team to participate in the hackathon.
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        {actionData?.error && (
                                            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                                                {actionData.error}
                                            </div>
                                        )}
                                        {actionData?.success && !actionData?.profileUpdated && (
                                            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
                                                Team operation successful!
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* Create Team */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700 mb-4">Create a new team</h3>
                                                <Form method="POST">
                                                    <div>
                                                        <label htmlFor="team-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Team Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="team-name"
                                                                required
                                                                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
                                                                placeholder="Enter team name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button
                                                            type="submit"
                                                            name="intent"
                                                            value="create_team"
                                                            className="rounded-md bg-[#783f8e] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#8f52a5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#783f8e]"
                                                        >
                                                            Create Team
                                                        </button>
                                                    </div>
                                                </Form>
                                            </div>

                                            {/* Join Team */}
                                            <div className="border-t border-gray-200 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                                <h3 className="text-sm font-medium text-gray-700 mb-4">Join an existing team</h3>
                                                <Form method="POST">
                                                    <div>
                                                        <label htmlFor="team-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Team Code / Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="code"
                                                                id="team-code"
                                                                required
                                                                placeholder="Enter team name to join"
                                                                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
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
                            </section>
                        )}

                        {/* Profile editing form */}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                        Profile Information
                                    </h2>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <form onSubmit={handleProfileSubmit}>
                                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    First name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="first-name"
                                                        name="first-name"
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        autoComplete="given-name"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Last name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="last-name"
                                                        name="last-name"
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        autoComplete="family-name"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Email address
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        autoComplete="email"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#e2a9f1]">
                                                    <div className="flex select-none items-center rounded-l-md bg-gray-50 px-3 text-gray-500 border-r border-gray-300 sm:text-sm">
                                                        +61
                                                    </div>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        autoComplete="tel"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="4XX XXX XXX"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                    About
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        value={about}
                                                        onChange={(e) => setAbout(e.target.value)}
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e2a9f1] sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                                        My Persona
                                                    </label>
                                                    <div className="group relative flex items-center">
                                                        <InformationCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-64 rounded bg-gray-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block z-10">
                                                            <p className="mb-1"><strong>Hacker:</strong> You build things. You love code and technical challenges.</p>
                                                            <p className="mb-1"><strong>Hustler:</strong> You sell things. You focus on business, marketing, and growth.</p>
                                                            <p className="mb-1"><strong>Hipster:</strong> You design things. You care about UX, UI, and aesthetics.</p>
                                                            <p><strong>Healer:</strong> You heal people. You bring clinical or health domain expertise.</p>
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        { id: 'hacker', label: 'I am a Hacker', emoji: '\u{1F4BB}' },
                                                        { id: 'hustler', label: 'I am a Hustler', emoji: '\u{1F4BC}' },
                                                        { id: 'hipster', label: 'I am a Hipster', emoji: '\u{1F3A8}' },
                                                        { id: 'healer', label: 'I am a Healer', emoji: '\u{2695}\u{FE0F}' }
                                                    ].map((option) => (
                                                        <div key={option.id} className="relative flex items-start">
                                                            <div className="flex h-6 items-center">
                                                                <input
                                                                    id={option.id}
                                                                    name="personas"
                                                                    type="checkbox"
                                                                    checked={personas.includes(option.id)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setPersonas([...personas, option.id]);
                                                                        } else {
                                                                            setPersonas(personas.filter(p => p !== option.id));
                                                                        }
                                                                    }}
                                                                    className="h-4 w-4 rounded border-gray-300 text-[#783f8e] focus:ring-[#783f8e]"
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm leading-6">
                                                                <label htmlFor={option.id} className="font-medium text-gray-900">
                                                                    {option.emoji} {option.label}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            {message && <p className="text-sm text-[#783f8e]">{message}</p>}
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className="rounded-md bg-[#783f8e] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#8f52a5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#783f8e] disabled:opacity-50"
                                            >
                                                {isSaving ? 'Saving...' : 'Save Profile'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Team sidebar */}
                    <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                        <div className="bg-white shadow sm:rounded-lg">
                            {teamName ? (
                                <>
                                    {(() => {
                                        const size = teamMembers.length;
                                        const isValid = size >= 2 && size <= 6;
                                        return (
                                            <div className={`px-4 py-3 sm:px-6 rounded-t-lg border-b flex items-center justify-between ${isValid
                                                ? 'bg-[#e2a9f1]/10 border-[#e2a9f1]/30'
                                                : 'bg-gray-50 border-gray-200'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    {isValid ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex h-2 w-2 rounded-full bg-[#783f8e]" />
                                                            <span className="text-sm font-semibold text-[#783f8e]">Team Ready</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
                                                            <span className="text-sm font-semibold text-gray-700">Forming Team</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <span>{size}/6</span>
                                                    <span className="hidden sm:inline">members</span>
                                                    <div className="group relative flex items-center">
                                                        <InformationCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                                                        <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block z-10">
                                                            Teams must have between 2 and 6 members.
                                                            <div className="absolute top-full right-1 -mt-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="px-4 py-5 sm:px-6">
                                        <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                                            <h2 id="timeline-title" className="text-xl font-bold text-gray-900 text-center">
                                                {teamName}
                                            </h2>
                                        </div>

                                        <h3 className="mt-6 text-sm font-medium text-gray-500">Team Members</h3>

                                        <div className="mt-4 flow-root">
                                            <ul role="list" className="-my-5 divide-y divide-gray-200">
                                                {teamMembers.length > 0 ? (
                                                    teamMembers.map((member, index) => {
                                                        const memberInitials = getInitials(member.full_name);
                                                        const memberAvatarUrl = member.avatar_url || generateAvatarUrl(memberInitials);
                                                        return (
                                                            <li key={index} className="py-4">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="shrink-0">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full object-cover"
                                                                            src={memberAvatarUrl}
                                                                            alt={member.full_name}
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="truncate text-sm font-medium text-gray-900">{member.full_name}</p>
                                                                        <div className="mt-1 flex flex-wrap gap-1">
                                                                            {member.personas && member.personas.length > 0 ? (
                                                                                member.personas.map(p => {
                                                                                    const config = PERSONA_CONFIG[p.toLowerCase()] || { label: p, emoji: '\u{1F464}', color: 'bg-gray-50 text-gray-600', ring: 'ring-gray-500/10' };
                                                                                    return (
                                                                                        <span key={p} className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.color} ${config.ring}`}>
                                                                                            <span className="mr-1">{config.emoji}</span>
                                                                                            {config.label}
                                                                                        </span>
                                                                                    );
                                                                                })
                                                                            ) : (
                                                                                <span className="text-xs text-gray-500 italic">
                                                                                    {member.role || 'Participant'}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                ) : (
                                                    <li className="py-4">
                                                        <p className="text-sm text-gray-500">No team members yet.</p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="px-4 py-5 sm:px-6 text-center">
                                    <div className="rounded-full bg-[#e2a9f1]/10 p-3 inline-block mb-3">
                                        <svg className="h-8 w-8 text-[#783f8e]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                    </div>
                                    <h2 id="timeline-title" className="text-lg font-semibold text-gray-900">No Team Yet</h2>
                                    <p className="mt-2 text-sm text-gray-500">
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
        </div>
    );
}
