import type { Route } from "./+types/esafety.profile";
import React, { useState, useEffect } from 'react';
import { redirect, useLoaderData, useNavigate, useRevalidator, useFetcher } from "react-router";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { getTeamNames, updateUser, getCurrentUser } from '~/lib/auth';
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

interface UserData {
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
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (!user) {
        return redirect("/platform/login?next=/esafety/profile");
    }

    // Fetch available team names
    let teams: string[] = [];
    try {
        teams = await getTeamNames(env, request);
    } catch (error) {
        console.error('Error loading teams', error);
    }

    return { user: user as UserData, teams };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const formData = await request.formData();


    try {
        console.log("Profile Action: Received FormData");
        for (const [key, value] of formData.entries()) {
            console.log(`Profile Action: ${key} =`, value);
        }
        await updateUser(env, formData, request);
        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Error updating profile.' };
    }
}

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

const PERSONA_CONFIG: Record<string, { label: string; emoji: string; color: string; ring: string }> = {
    hacker: { label: 'Hacker', emoji: '💻', color: 'bg-slate-50 text-slate-700', ring: 'ring-slate-600/20' },
    hustler: { label: 'Hustler', emoji: '💼', color: 'bg-amber-50 text-amber-700', ring: 'ring-amber-600/20' },
    hipster: { label: 'Hipster', emoji: '🎨', color: 'bg-rose-50 text-rose-700', ring: 'ring-rose-600/20' },
};

export default function ProfilePage() {
    const { user: initialUser, teams } = useLoaderData<typeof loader>();
    const revalidator = useRevalidator();
    const fetcher = useFetcher();

    // Split full name into first and last name for the form
    // const splitName = (name: string) => {
    //     const parts = name.split(' ');
    //     return {
    //         firstName: parts[0] || '',
    //         lastName: parts.slice(1).join(' ') || ''
    //     };
    // };

    // const initialNames = splitName(initialUser.full_name || '');

    const [firstName, setFirstName] = useState(initialUser.first_name || '');
    const [lastName, setLastName] = useState(initialUser.last_name || '');
    const [email, setEmail] = useState(initialUser.email || '');
    const [phone, setPhone] = useState(initialUser.phone || '');
    const [about, setAbout] = useState(initialUser.about || '');
    const [personas, setPersonas] = useState<string[]>(initialUser.personas || []);

    // Team state
    const [selectedTeam, setSelectedTeam] = useState(initialUser.team?.team_name || '');
    const [query, setQuery] = useState('');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
        (initialUser.team?.members || []).map(m => {
            if (m.full_name === initialUser.full_name) {
                return { ...m, personas: initialUser.personas };
            }
            return m;
        })
    );

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // const [isSaving, setIsSaving] = useState(false); // Managed by fetcher.state
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);

    const [teamAvatarFile, setTeamAvatarFile] = useState<File | null>(null);
    const [previewTeamAvatarUrl, setPreviewTeamAvatarUrl] = useState<string | null>(null);
    const [isTeamAvatarModalOpen, setIsTeamAvatarModalOpen] = useState(false);

    const handleAvatarSave = async (file: File) => {
        setAvatarFile(file);
        // Create a local URL for preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewAvatarUrl(objectUrl);
        setIsAvatarModalOpen(false);
    };

    const handleTeamAvatarSave = async (file: File) => {
        setTeamAvatarFile(file);
        // Create a local URL for preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewTeamAvatarUrl(objectUrl);
        setIsTeamAvatarModalOpen(false);
    };

    // Filter teams for combobox
    const filteredTeams =
        query === ''
            ? teams
            : teams.filter((team) => {
                return team.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        if (initialUser) {
            // const names = splitName(initialUser.full_name || '');
            setFirstName(initialUser.first_name || '');
            setLastName(initialUser.last_name || '');
            setEmail(initialUser.email || '');
            setPhone(initialUser.phone || '');
            setAbout(initialUser.about || '');
            setPersonas(initialUser.personas || []);

            if (initialUser.team) {
                setSelectedTeam(initialUser.team.team_name || '');
                setTeamMembers((initialUser.team.members || []).map(m => {
                    if (m.full_name === initialUser.full_name) {
                        return { ...m, personas: initialUser.personas };
                    }
                    return m;
                }));
            } else {
                setSelectedTeam('');
                setTeamMembers([]);
            }
        }
    }, [initialUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!firstName || !lastName || !email) {
            setError('First name, last name, and email are required.');
            return;
        }

        const fullName = `${firstName} ${lastName}`.trim();

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        if (selectedTeam) formData.append('team', selectedTeam);
        if (phone) formData.append('phone', phone);
        if (about) formData.append('about', about);
        personas.forEach(p => formData.append('personas', p));
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }
        if (teamAvatarFile) {
            formData.append('team_avatar', teamAvatarFile);
        }

        fetcher.submit(formData, {
            method: "patch",
            encType: "multipart/form-data",
        });
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success) {
                setMessage('Profile updated successfully.');
                setAvatarFile(null);
                setTeamAvatarFile(null);
                // Revalidator is called automatically by Remix after action
            } else if (fetcher.data.error) {
                setError(fetcher.data.error);
            }
        }
    }, [fetcher.state, fetcher.data]);

    const isSaving = fetcher.state !== "idle";

    const avatarUrl = previewAvatarUrl || initialUser.avatar_url || generateAvatarUrl(getInitials(initialUser.full_name || ''));
    const teamAvatarUrl = previewTeamAvatarUrl || initialUser.team?.avatar_url || generateAvatarUrl(getInitials(selectedTeam || 'Team'));
    const coverImageUrl = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

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
                                {initialUser.team?.team_name ? `Member of ${initialUser.team.team_name}` : 'No team selected'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                        {/* Actions could go here if needed */}
                    </div>
                </div>

                <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                        {/* Description list / Form */}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                        Applicant Information
                                    </h2>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <form onSubmit={handleSubmit}>
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
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
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
                                                        className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                            <p><strong>Hipster:</strong> You design things. You care about UX, UI, and aesthetics.</p>
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    {[
                                                        { id: 'hacker', label: 'I am a Hacker', emoji: '💻' },
                                                        { id: 'hustler', label: 'I am a Hustler', emoji: '💼' },
                                                        { id: 'hipster', label: 'I am a Hipster', emoji: '🎨' }
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
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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

                                            <div className="sm:col-span-6">
                                                <div className="flex items-start gap-x-6">
                                                    <div className="shrink-0 flex flex-col items-center">
                                                        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">Team Avatar</label>
                                                        <div className="relative size-16">
                                                            <img
                                                                alt=""
                                                                src={teamAvatarUrl}
                                                                className="size-16 rounded-lg object-cover"
                                                            />
                                                            <span aria-hidden="true" className="absolute inset-0 rounded-lg shadow-inner" />
                                                            <button
                                                                type="button"
                                                                className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                                                onClick={() => setIsTeamAvatarModalOpen(true)}
                                                            >
                                                                <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="block text-sm font-medium leading-6 text-gray-900">Team Name</label>
                                                        <div className="mt-2">
                                                            <Combobox value={selectedTeam} onChange={(val) => setSelectedTeam(val || '')}>
                                                                <div className="relative mt-1">
                                                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                                        <Combobox.Input
                                                                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                                            displayValue={(team: string) => team}
                                                                            onChange={(event) => setQuery(event.target.value)}
                                                                            placeholder="Select or create a team"
                                                                        />
                                                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                            <ChevronUpDownIcon
                                                                                className="h-5 w-5 text-gray-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </Combobox.Button>
                                                                    </div>
                                                                    <Transition
                                                                        as={React.Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                        afterLeave={() => setQuery('')}
                                                                    >
                                                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                                                                            {query.length > 0 && (
                                                                                <Combobox.Option
                                                                                    value={query}
                                                                                    className={({ active }) =>
                                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                                        }`
                                                                                    }
                                                                                >
                                                                                    Create "{query}"
                                                                                </Combobox.Option>
                                                                            )}
                                                                            {filteredTeams.length === 0 && query !== '' ? (
                                                                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                                    Nothing found.
                                                                                </div>
                                                                            ) : (
                                                                                filteredTeams.map((team) => (
                                                                                    <Combobox.Option
                                                                                        key={team}
                                                                                        className={({ active }) =>
                                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                                            }`
                                                                                        }
                                                                                        value={team}
                                                                                    >
                                                                                        {({ selected, active }) => (
                                                                                            <>
                                                                                                <span
                                                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                        }`}
                                                                                                >
                                                                                                    {team}
                                                                                                </span>
                                                                                                {selected ? (
                                                                                                    <span
                                                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'
                                                                                                            }`}
                                                                                                    >
                                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                    </span>
                                                                                                ) : null}
                                                                                            </>
                                                                                        )}
                                                                                    </Combobox.Option>
                                                                                ))
                                                                            )}
                                                                        </Combobox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </Combobox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            {message && <p className="text-sm text-green-600">{message}</p>}
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                                            >
                                                {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                        <div className="bg-white shadow sm:rounded-lg">
                            {(() => {
                                const size = teamMembers.length;
                                const isValid = size >= 2 && size <= 5;
                                return (
                                    <div className={`px-4 py-3 sm:px-6 rounded-t-lg border-b flex items-center justify-between ${isValid
                                        ? 'bg-green-50 border-green-100'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            {isValid ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-2 w-2 rounded-full bg-green-600" />
                                                    <span className="text-sm font-semibold text-green-900">Team Ready</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-2 w-2 rounded-full bg-yellow-500" />
                                                    <span className="text-sm font-semibold text-gray-700">Forming Team</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <span>{size}/5</span>
                                            <span className="hidden sm:inline">members</span>
                                            <div className="group relative flex items-center">
                                                <InformationCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                                                <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block z-10">
                                                    Teams must have between 2 and 5 members.
                                                    <div className="absolute top-full right-1 -mt-1 h-2 w-2 rotate-45 bg-gray-900"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                                    <img
                                        className="h-24 w-24 rounded-lg object-cover mb-4"
                                        src={teamAvatarUrl}
                                        alt={selectedTeam || 'Team'}
                                    />
                                    <h2 id="timeline-title" className="text-xl font-bold text-gray-900 text-center">
                                        {selectedTeam || 'No Team Selected'}
                                    </h2>
                                </div>

                                <h3 className="mt-6 text-sm font-medium text-gray-500">Team Members</h3>

                                {/* Team member list */}
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
                                                                            const config = PERSONA_CONFIG[p.toLowerCase()] || { label: p, emoji: '👤', color: 'bg-gray-50 text-gray-600', ring: 'ring-gray-500/10' };
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
