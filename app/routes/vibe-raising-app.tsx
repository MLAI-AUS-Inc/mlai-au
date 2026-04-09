import type { Route } from "./+types/vibe-raising-app";
import { useState, useEffect, Fragment } from "react";
import { Outlet, useLoaderData, Form, redirect, useNavigation, Link } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import { getVibeRaisingUser, createVibeRaisingSessionCookie, setActiveCompany, getActiveCompany, type VibeRaisingUser } from "~/lib/vibe-raising-session";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import { BuildingOffice2Icon, ChartBarIcon, ChevronDownIcon, CheckIcon, DocumentTextIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon, UsersIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { User } from "~/types/user";

type Role = "founder" | "investor";

const FOUNDER_NAVIGATION = [
    { name: 'My Updates', href: '/vibe-raising', icon: DocumentTextIcon },
    { name: 'Discover Investors', href: '/vibe-raising/discover', icon: UsersIcon },
    { name: 'Manage Companies', href: '/vibe-raising/companies', icon: BuildingOffice2Icon },
];

const INVESTOR_NAVIGATION = [
    { name: 'Portfolio Updates', href: '/vibe-raising', icon: DocumentTextIcon },
    { name: 'Connections', href: '/vibe-raising/discover', icon: UsersIcon },
];

export async function loader({ request }: Route.LoaderArgs) {
    const user = getVibeRaisingUser(request);
    return { user };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString();

    // Switch active company
    if (intent === "switch-company") {
        const user = getVibeRaisingUser(request);
        if (!user) throw redirect("/vibe-raising");
        const companyId = formData.get("companyId")?.toString() || "";
        const updatedUser = setActiveCompany(user, companyId);
        const returnTo = formData.get("returnTo")?.toString() || "/vibe-raising";
        return redirect(returnTo, {
            headers: { "Set-Cookie": createVibeRaisingSessionCookie(updatedUser) },
        });
    }

    // Login form submission
    const role = formData.get("role")?.toString() as Role;
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const companyName = formData.get("companyName")?.toString() || "";

    const user: VibeRaisingUser = {
        fullName,
        email,
        companyName,
        role
    };

    return redirect("/vibe-raising", {
        headers: {
            "Set-Cookie": createVibeRaisingSessionCookie(user)
        }
    });
}

// Announcement Popup Component
function AnnouncementPopup({ onDismiss, onComplete }: { onDismiss: () => void, onComplete?: () => void }) {
    console.log("AnnouncementPopup: rendering");

    const handleComplete = () => {
        onDismiss();
        if (onComplete) onComplete();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                onClick={onDismiss}
            />

            {/* Modal - side-by-side: video left, content right */}
            <div className="relative z-[110] flex w-full max-w-3xl h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Left: vertical video - fixed size matching 9:16 ratio */}
                <div className="relative flex-shrink-0 w-[315px] h-full bg-black overflow-hidden">
                    <iframe
                        src="https://player.vimeo.com/video/1174236138?autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Vibe Raising Intro"
                    />
                </div>

                {/* Right: header + copy + CTA */}
                <div className="flex flex-col flex-1 min-w-0">

                    {/* Header */}
                    <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-gray-100">
                        <button
                            onClick={onDismiss}
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                            aria-label="Back"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold text-gray-900 flex-1">Welcome to Vibe Raising</h2>
                    </div>

                    {/* Body copy */}
                    <div className="flex-1 px-6 py-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Watch this short intro on how Vibe Raising connects founders with investors through consistent, transparent monthly updates.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 flex flex-col gap-3">
                        <button
                            onClick={handleComplete}
                            className="w-full py-3.5 px-6 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/20"
                        >
                            Get Started →
                        </button>
                        <button
                            onClick={onDismiss}
                            className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}




// Login Form Component
function LoginForm() {
    const [selectedRole, setSelectedRole] = useState<Role>("founder");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-lg">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Vibe Raising</h1>
                        <p className="text-gray-500 text-sm">
                            Connect founders with investors through monthly updates
                        </p>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setSelectedRole("founder")}
                            className={`
                                flex-1 flex flex-col items-center gap-3 py-5 px-6 rounded-2xl border-2 transition-all duration-200
                                ${selectedRole === "founder"
                                    ? "border-violet-500 bg-violet-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }
                            `}
                        >
                            <BuildingOffice2Icon
                                className={`w-8 h-8 ${selectedRole === "founder" ? "text-violet-600" : "text-gray-400"}`}
                            />
                            <span className={`font-bold ${selectedRole === "founder" ? "text-gray-900" : "text-gray-600"}`}>
                                Founder
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedRole("investor")}
                            className={`
                                flex-1 flex flex-col items-center gap-3 py-5 px-6 rounded-2xl border-2 transition-all duration-200
                                ${selectedRole === "investor"
                                    ? "border-violet-500 bg-violet-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }
                            `}
                        >
                            <ChartBarIcon
                                className={`w-8 h-8 ${selectedRole === "investor" ? "text-violet-600" : "text-gray-400"}`}
                            />
                            <span className={`font-bold ${selectedRole === "investor" ? "text-gray-900" : "text-gray-600"}`}>
                                Investor
                            </span>
                        </button>
                    </div>

                    {/* Registration Form */}
                    <Form method="POST" className="space-y-6">
                        <input type="hidden" name="role" value={selectedRole} />

                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@example.com"
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-2">
                                {selectedRole === 'founder' ? 'Startup Name' : 'Venture Firm'}
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                placeholder={selectedRole === 'founder' ? 'Acme Inc.' : 'Alpha Ventures'}
                                required
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 bg-violet-600 text-white font-bold rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-violet-500/20 
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-violet-700 hover:shadow-xl active:scale-[0.98]"}`}
                        >
                            {isSubmitting ? "Connecting..." : `Continue as ${selectedRole === "founder" ? "Founder" : "Investor"}`}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default function VibeRaisingApp() {
    const { user: vibeRaisingUser } = useLoaderData<typeof loader>();
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [onCompleteCallback, setOnCompleteCallback] = useState<(() => void) | undefined>();

    const triggerAnnouncement = (callback?: () => void) => {
        setOnCompleteCallback(() => callback);
        setShowAnnouncement(true);
    };

    // Map to Platform User type or Guest
    const platformUser: User = vibeRaisingUser ? {
        full_name: vibeRaisingUser.fullName,
        email: vibeRaisingUser.email,
        role: 'participant',
        is_superuser: false,
        is_active: true,
        has_team: false,
        avatar_url: null
    } : {
        full_name: 'Guest',
        email: '',
        role: 'participant',
        is_superuser: false,
        is_active: true,
        has_team: false,
        avatar_url: null
    };

    const nav = vibeRaisingUser?.role === 'investor' ? INVESTOR_NAVIGATION : FOUNDER_NAVIGATION;

    return (
        <AuthenticatedLayout user={platformUser} navigation={nav} userNavigation={[]} logoutAction="/vibe-raising/logout">
            {/* Show announcement popup for founders when triggered */}
            {vibeRaisingUser?.role === 'founder' && showAnnouncement && (
                <AnnouncementPopup 
                    onDismiss={() => setShowAnnouncement(false)} 
                    onComplete={onCompleteCallback}
                />
            )}

            {vibeRaisingUser ? <Outlet context={{ triggerAnnouncement }} /> : <LoginForm />}
        </AuthenticatedLayout>
    );
}
