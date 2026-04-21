import type { Route } from "./+types/vibe-raising-app";
import { useState, useEffect, useRef, Fragment } from "react";
import { Outlet, useLoaderData, useActionData, Form, redirect, useNavigation, useSubmit } from "react-router";
import { Menu, Transition } from "@headlessui/react";
import {
    getVibeRaisingUser,
    createVibeRaisingSessionCookie,
    setActiveCompany,
    VIBE_RAISING_APP_PATH,
    VIBE_RAISING_COMPANY_SETUP_PATH,
    VIBE_RAISING_LOGOUT_PATH,
    type VibeRaisingUser,
} from "~/lib/vibe-raising-session";
import AuthenticatedLayout from "~/components/AuthenticatedLayout";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import { BuildingOffice2Icon, ChartBarIcon, ChevronDownIcon, CheckIcon, DocumentTextIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import type { User } from "~/types/user";
import { getEnv } from "~/lib/env.server";
import { getGoogleClientId, verifyGoogleIdToken } from "~/lib/google-auth";

type Role = "founder" | "investor";
type LoginActionData = { error?: string } | undefined;

type GoogleCredentialResponse = {
    credential: string;
};

type GoogleButtonConfiguration = {
    theme?: "outline" | "filled_blue" | "filled_black";
    size?: "large" | "medium" | "small";
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
    shape?: "rectangular" | "pill" | "circle" | "square";
    width?: number;
    logo_alignment?: "left" | "center";
};

type GoogleAccountsId = {
    initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        ux_mode?: "popup" | "redirect";
        context?: "signin" | "signup" | "use";
        auto_select?: boolean;
    }) => void;
    renderButton: (element: HTMLElement, options: GoogleButtonConfiguration) => void;
};

declare global {
    interface Window {
        google?: {
            accounts?: {
                id?: GoogleAccountsId;
            };
        };
    }
}

const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const FOUNDER_NAVIGATION = [
    { name: 'My Updates', href: VIBE_RAISING_APP_PATH, icon: DocumentTextIcon },
    { name: 'Discover Investors', href: `${VIBE_RAISING_APP_PATH}/discover`, icon: UsersIcon },
    { name: 'Manage Companies', href: `${VIBE_RAISING_APP_PATH}/companies`, icon: BuildingOffice2Icon },
];

const INVESTOR_NAVIGATION = [
    { name: 'Portfolio Updates', href: VIBE_RAISING_APP_PATH, icon: DocumentTextIcon },
    { name: 'Connections', href: `${VIBE_RAISING_APP_PATH}/discover`, icon: UsersIcon },
];

function normaliseRole(value: FormDataEntryValue | null): Role {
    return value?.toString() === "investor" ? "investor" : "founder";
}

function buildVibeRaisingUser(profile: {
    name?: string;
    email: string;
    given_name?: string;
}, role: Role, companyName: string): VibeRaisingUser {
    const fullName = profile.name?.trim() || profile.given_name?.trim() || profile.email;

    return {
        fullName,
        email: profile.email,
        companyName,
        role,
    };
}

function loadGoogleIdentityScript() {
    if (typeof document === "undefined") {
        return Promise.resolve();
    }

    if (window.google?.accounts?.id) {
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            `script[src="${GOOGLE_IDENTITY_SCRIPT_SRC}"]`,
        );

        if (existingScript) {
            existingScript.addEventListener("load", () => resolve(), { once: true });
            existingScript.addEventListener("error", () => reject(new Error("Failed to load Google")), { once: true });
            return;
        }

        const script = document.createElement("script");
        script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google"));
        document.head.appendChild(script);
    });
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const user = getVibeRaisingUser(request);
    const runtimeEnv = getEnv(context);

    return {
        user,
        googleClientId: getGoogleClientId(runtimeEnv),
    };
}

export async function action({ request, context }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString();

    // Switch active company
    if (intent === "switch-company") {
        const user = getVibeRaisingUser(request);
        if (!user) throw redirect(VIBE_RAISING_APP_PATH);
        const companyId = formData.get("companyId")?.toString() || "";
        const updatedUser = setActiveCompany(user, companyId);
        const returnTo = formData.get("returnTo")?.toString() || VIBE_RAISING_APP_PATH;
        return redirect(returnTo, {
            headers: { "Set-Cookie": createVibeRaisingSessionCookie(updatedUser) },
        });
    }

    if (intent === "google-login") {
        const runtimeEnv = getEnv(context);
        const googleClientId = getGoogleClientId(runtimeEnv);
        const credential = formData.get("credential")?.toString() || "";
        const companyName = formData.get("companyName")?.toString().trim() || "";
        const role = normaliseRole(formData.get("role"));

        if (!googleClientId) {
            return { error: "Google login is not configured yet." } satisfies LoginActionData;
        }

        if (!credential) {
            return { error: "Google sign-in did not return a credential. Please try again." } satisfies LoginActionData;
        }

        if (!companyName) {
            return { error: "Please enter your startup or firm name before using Google sign-in." } satisfies LoginActionData;
        }

        try {
            const profile = await verifyGoogleIdToken(credential, googleClientId);
            const user = buildVibeRaisingUser(profile, role, companyName);
            const redirectPath = role === "founder" ? VIBE_RAISING_COMPANY_SETUP_PATH : VIBE_RAISING_APP_PATH;

            return redirect(redirectPath, {
                headers: {
                    "Set-Cookie": createVibeRaisingSessionCookie(user),
                },
            });
        } catch (error) {
            console.error("Google sign-in failed", error);
            return { error: "Google sign-in failed. Please try again or continue with email." } satisfies LoginActionData;
        }
    }

    // Login form submission
    const role = normaliseRole(formData.get("role"));
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const companyName = formData.get("companyName")?.toString() || "";

    const user = buildVibeRaisingUser({ name: fullName, email }, role, companyName);
    const redirectPath = role === "founder" ? VIBE_RAISING_COMPANY_SETUP_PATH : VIBE_RAISING_APP_PATH;

    return redirect(redirectPath, {
        headers: {
            "Set-Cookie": createVibeRaisingSessionCookie(user)
        }
    });
}

// Login Form Component
function GoogleLogoIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function LoginForm({
    googleClientId,
    actionData,
}: {
    googleClientId: string | null;
    actionData: LoginActionData;
}) {
    const [selectedRole, setSelectedRole] = useState<Role>("founder");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [googleUiError, setGoogleUiError] = useState<string | null>(null);
    const googleButtonRef = useRef<HTMLDivElement>(null);
    const latestRoleRef = useRef<Role>(selectedRole);
    const latestCompanyNameRef = useRef(companyName);
    const navigation = useNavigation();
    const submit = useSubmit();
    const isSubmitting = navigation.state === "submitting";
    const isGoogleSubmitting =
        isSubmitting && navigation.formData?.get("intent")?.toString() === "google-login";
    const isManualSubmitting = isSubmitting && !isGoogleSubmitting;

    useEffect(() => {
        latestRoleRef.current = selectedRole;
    }, [selectedRole]);

    useEffect(() => {
        latestCompanyNameRef.current = companyName;
    }, [companyName]);

    useEffect(() => {
        if (!googleClientId || !googleButtonRef.current) {
            return;
        }

        let cancelled = false;

        const initialiseGoogle = async () => {
            try {
                await loadGoogleIdentityScript();

                if (cancelled || !googleButtonRef.current || !window.google?.accounts?.id) {
                    return;
                }

                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: ({ credential }) => {
                        const trimmedCompanyName = latestCompanyNameRef.current.trim();

                        if (!trimmedCompanyName) {
                            setGoogleUiError("Please enter your startup or firm name before using Google sign-in.");
                            return;
                        }

                        setGoogleUiError(null);

                        const formData = new FormData();
                        formData.append("intent", "google-login");
                        formData.append("credential", credential);
                        formData.append("companyName", trimmedCompanyName);
                        formData.append("role", latestRoleRef.current);
                        submit(formData, { method: "post" });
                    },
                    ux_mode: "popup",
                    context: "signin",
                    auto_select: false,
                });

                googleButtonRef.current.innerHTML = "";
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    text: "continue_with",
                    shape: "pill",
                    width: 360,
                    logo_alignment: "left",
                });
            } catch (error) {
                console.error("Failed to initialise Google sign-in", error);
                if (!cancelled) {
                    setGoogleUiError("Google sign-in is unavailable right now. Please continue with email.");
                }
            }
        };

        initialiseGoogle();

        return () => {
            cancelled = true;
        };
    }, [googleClientId, submit]);

    return (
        <div className="min-h-[80vh] px-4 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mx-auto mb-8 w-full max-w-lg">
                    {/* Card Container */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Vibe Raising</h1>
                            <p className="text-gray-500 text-sm">
                                Sign up to build your company profile and send your first monthly update
                            </p>
                        </div>

                        {(actionData?.error || googleUiError) && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {actionData?.error || googleUiError}
                            </div>
                        )}

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
                                    value={fullName}
                                    onChange={(event) => setFullName(event.target.value)}
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
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
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
                                    value={companyName}
                                    onChange={(event) => {
                                        setCompanyName(event.target.value);
                                        if (googleUiError) {
                                            setGoogleUiError(null);
                                        }
                                    }}
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400 font-medium"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute inset-x-0 h-px bg-gray-200" />
                                    <span className="relative bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                        Or
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    {googleClientId ? (
                                        <div ref={googleButtonRef} className={isGoogleSubmitting ? "pointer-events-none opacity-70" : ""} />
                                    ) : (
                                        <button
                                            type="button"
                                            disabled
                                            className="flex h-11 w-full max-w-[360px] items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-400 shadow-sm"
                                        >
                                            <GoogleLogoIcon />
                                            Continue with Google
                                        </button>
                                    )}
                                    <p className="text-center text-xs leading-5 text-gray-500">
                                        {googleClientId
                                            ? `Use Google to sign up with the ${selectedRole === "founder" ? "startup" : "firm"} name above.`
                                            : "Add VITE_GOOGLE_CLIENT_ID to enable Google login."}
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 bg-violet-600 text-white font-bold rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-violet-500/20 
                                ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-violet-700 hover:shadow-xl active:scale-[0.98]"}`}
                            >
                                {isManualSubmitting ? "Connecting..." : `Sign up as ${selectedRole === "founder" ? "Founder" : "Investor"}`}
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VibeRaisingApp() {
    const { user: vibeRaisingUser, googleClientId } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>() as LoginActionData;
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
        <AuthenticatedLayout user={platformUser} navigation={nav} userNavigation={[]} logoutAction={VIBE_RAISING_LOGOUT_PATH}>
            {/* Show announcement popup for founders when triggered */}
            {vibeRaisingUser?.role === 'founder' && showAnnouncement && (
                <VibeRaisingIntroPopup
                    onDismiss={() => setShowAnnouncement(false)} 
                    onComplete={onCompleteCallback}
                />
            )}

            {vibeRaisingUser ? <Outlet context={{ triggerAnnouncement }} /> : <LoginForm googleClientId={googleClientId} actionData={actionData} />}
        </AuthenticatedLayout>
    );
}
