import type { Route } from "./+types/valley";
import { useState } from "react";
import { Outlet, useLoaderData, Link, Form, redirect, useNavigation } from "react-router";
import { getValleyUser, createValleySessionCookie, type ValleyUser } from "~/lib/valley-session";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import { BuildingOffice2Icon, ChartBarIcon, DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { User } from "~/types/user";

type Role = "founder" | "investor";

const FOUNDER_NAVIGATION = [
    { name: 'My Updates', href: '/valley', icon: DocumentTextIcon },
    { name: 'Discover Investors', href: '/valley/discover', icon: MagnifyingGlassIcon },
];

const INVESTOR_NAVIGATION = [
    { name: 'Portfolio Updates', href: '/valley', icon: DocumentTextIcon },
    { name: 'Connections', href: '/valley/discover', icon: MagnifyingGlassIcon },
];

export async function loader({ request }: Route.LoaderArgs) {
    const user = getValleyUser(request);
    return { user };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const role = formData.get("role")?.toString() as Role;
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const companyName = formData.get("companyName")?.toString() || "";

    // Create the user session
    const user: ValleyUser = {
        fullName,
        email,
        companyName,
        role
    };

    // Redirect to same page (will now show dashboard)
    return redirect("/valley", {
        headers: {
            "Set-Cookie": createValleySessionCookie(user)
        }
    });
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
                        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Valley</h1>
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
                                    ? "border-blue-500 bg-blue-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }
                            `}
                        >
                            <BuildingOffice2Icon
                                className={`w-8 h-8 ${selectedRole === "founder" ? "text-blue-600" : "text-gray-400"}`}
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
                                    ? "border-blue-500 bg-blue-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }
                            `}
                        >
                            <ChartBarIcon
                                className={`w-8 h-8 ${selectedRole === "investor" ? "text-blue-600" : "text-gray-400"}`}
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
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
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
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
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
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-blue-500/20 
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"}`}
                        >
                            {isSubmitting ? "Connecting..." : `Continue as ${selectedRole === "founder" ? "Founder" : "Investor"}`}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default function ValleyApp() {
    const { user: valleyUser } = useLoaderData<typeof loader>();

    // Map to Platform User type or Guest
    const platformUser: User = valleyUser ? {
        full_name: valleyUser.fullName,
        email: valleyUser.email,
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

    const nav = valleyUser?.role === 'investor' ? INVESTOR_NAVIGATION : FOUNDER_NAVIGATION;

    return (
        <AuthenticatedLayout user={platformUser} navigation={nav} userNavigation={[]}>
            {valleyUser ? <Outlet /> : <LoginForm />}
        </AuthenticatedLayout>
    );
}
