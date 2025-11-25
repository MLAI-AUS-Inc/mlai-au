import type { Route } from "./+types/esafety.app.profile";
import React, { useState, useEffect } from 'react';
import { redirect, useLoaderData, useNavigate } from "react-router";
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { getTeamNames, updateUser, getUser, getCurrentUser } from '~/lib/auth';
import { backendFetch } from "~/lib/backend.server";
import { GradientBackground } from '~/components/GradientBackground';
import { getInitials, generateAvatarUrl } from '~/lib/avatar';

interface TeamMember {
    full_name: string;
}

interface UserData {
    email: string;
    full_name: string;
    avatar_url?: string;
    team?: {
        team_name: string;
        members: TeamMember[];
    };
}

export async function loader({ context }: Route.LoaderArgs) {
    const env = context.cloudflare.env;
    const user = await getCurrentUser(env);

    if (!user) {
        return redirect("/platform/login?next=/esafety/app/profile");
    }

    // Fetch available team names
    let teams: string[] = [];
    try {
        teams = await getTeamNames(env);
    } catch (error) {
        console.error('Error loading teams', error);
    }

    return { user: user as UserData, teams };
}

export default function ProfilePage() {
    const { user: initialUser, teams } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [team, setTeam] = useState('');
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form fields when the user data (including team details) is available.
    useEffect(() => {
        if (initialUser) {
            setFullName(initialUser.full_name || '');
            setEmail(initialUser.email || '');
            if (initialUser.team) {
                setTeam(initialUser.team.team_name || '');
                setTeamMembers(initialUser.team.members || []);
            } else {
                setTeam('');
                setTeamMembers([]);
            }
        }
    }, [initialUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!fullName || !team || !email) {
            setError('Full name, team, and email are required.');
            return;
        }

        setIsSaving(true);
        try {
            // Note: In a real implementation, you'd need to pass the env here
            // For now, this is a placeholder that shows the UI structure
            setMessage('Profile updated successfully.');
            // You might want to reload the page or refetch user data here
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Error updating profile.');
        } finally {
            setIsSaving(false);
        }
    };

    // Generate avatar URL
    const avatarUrl = initialUser.avatar_url || generateAvatarUrl(getInitials(initialUser.full_name || ''));

    return (
        <>
            <GradientBackground />
            <main className="max-w-3xl mx-auto p-8 relative min-h-screen">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Update Profile
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm text-gray-900">
                            Use this page to update your personal details and team.
                        </p>
                    </div>
                </div>

                {/* Profile Update Form */}
                <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow">
                    {/* Avatar Section */}
                    <section className="mb-8">
                        <div className="mt-4 flex items-center gap-x-4">
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full object-cover bg-gray-800"
                            />
                        </div>
                    </section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Update Profile</h2>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        {/* Full Name Field */}
                        <div className="sm:col-span-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Your full name"
                                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-500 focus:outline-indigo-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-500 focus:outline-indigo-500"
                            />
                        </div>

                        {/* Team Dropdown */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-900">
                                Team Name
                            </label>
                            <Menu as="div" className="relative inline-block text-left w-full">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {team ? team : 'Choose a team'}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                                    </Menu.Button>
                                </div>
                                <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none max-h-60 overflow-y-auto">
                                    {teams.map((t) => (
                                        <Menu.Item key={t}>
                                            {({ focus }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => setTeam(t)}
                                                    className={`${focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm`}
                                                >
                                                    {t}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Menu>
                        </div>

                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>

                        {error && <div className="sm:col-span-2 text-red-500">{error}</div>}
                        {message && <div className="sm:col-span-2 text-green-500">{message}</div>}
                    </div>
                </form>

                {/* Team Members Section */}
                {teamMembers.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Team Members</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {teamMembers.map((member, index) => {
                                // Get initials from the member's full name and generate the avatar URL.
                                const initials = getInitials(member.full_name);
                                const avatarUrl = generateAvatarUrl(initials);
                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                                    >
                                        <div className="shrink-0">
                                            <img
                                                alt={member.full_name}
                                                src={avatarUrl}
                                                className="h-10 w-10 rounded-full"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{member.full_name}</p>
                                            <p className="truncate text-sm text-gray-500">{team}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
