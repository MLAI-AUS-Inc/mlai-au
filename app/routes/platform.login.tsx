import type { Route } from "./+types/platform.login";
import { Form, useActionData, useSearchParams, useSubmit, Link, redirect } from "react-router";

export const meta: Route.MetaFunction = () => [
    { title: "Sign In to the MLAI Platform | MLAI" },
    { name: "description", content: "Sign in to your MLAI account to access the community platform, event dashboards, and tools for Australia's AI and Machine Learning community." },
];
import { createUser, sendMagicLink, getCurrentUser } from "~/lib/auth";
import { useEffect, useState } from "react";
import { GradientBackground } from "~/components/GradientBackground";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);

    if (user) {
        const url = new URL(request.url);
        const app = url.searchParams.get("app");
        let next = url.searchParams.get("next");

        if (!next) {
            next = (app === "esafety") ? "/esafety/dashboard" : "/platform/dashboard";
        }

        return redirect(next);
    }
    return null;
}

export async function action({ request, context }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString() ?? "check";
    const email = formData.get("email")?.toString() ?? "";
    const role = formData.get("role")?.toString() as "participant" | "mentor" | "judge" | "organizer" ?? "participant";
    const app = formData.get("app")?.toString() as "esafety" | "hospital" | undefined;
    const next = formData.get("next")?.toString() ?? (app === "esafety" ? "/esafety/dashboard" : "/platform/dashboard");

    if (intent === "create") {
        const firstName = formData.get("firstName")?.toString();
        const lastName = formData.get("lastName")?.toString();
        const phone = formData.get("phone")?.toString();

        try {
            await createUser(getEnv(context), {
                email,
                firstName,
                lastName,
                phone,
                role,
                app
            });
            return { sent: true, email };
        } catch (error) {
            return { error: "Failed to create account. Please try again." };
        }
    }

    try {
        const data = await sendMagicLink(getEnv(context), { email, next, app });

        if (data.user_exists) {
            return { sent: true, email };
        }

        return { userExists: false, email };
    } catch (error) {
        return { error: "Failed to send magic link. Please try again." };
    }
}

export default function PlatformLogin() {
    const data = useActionData<typeof action>();
    const [searchParams] = useSearchParams();
    const app = searchParams.get("app");
    const next = searchParams.get("next") || (app === "esafety" ? "/esafety/dashboard" : "/platform/dashboard");
    const error = searchParams.get("error");
    const submit = useSubmit();

    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState(data?.email || "");

    // Update email state if data.email changes (e.g. returned from server)
    useEffect(() => {
        if (data?.email) {
            setEmail(data.email);
        }
    }, [data?.email]);

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
        invalid_link: "The verification link is invalid or missing. Please try logging in again.",
        verification_failed: "Email verification failed. The link may have expired. Please try logging in again.",
    };

    useEffect(() => {
        if (data?.sent) {
            setTimeLeft(30);
        }
    }, [data?.sent]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleResend = () => {
        if (email) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("next", next);
            if (app) formData.append("app", app);
            // We use 'check' intent for resending magic link
            formData.append("intent", "check");
            submit(formData, { method: "post" });
        }
    };

    const getWelcomeText = () => {
        if (app === "esafety") return "Sign in to eSafety Hackathon";
        if (app === "hospital") return "Sign in to AI Hospital Hackathon";
        return "Welcome!";
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gray-50">
            <GradientBackground />
            <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md rounded-xl bg-white ring-1 shadow-md ring-black/5">
                    <div className="p-7 sm:p-11">
                        <div className="flex items-start">
                            <Link to="/" title="Home">
                                <span className="sr-only">MLAI</span>
                                <img
                                    alt="MLAI Logo"
                                    src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Ftext_logo.png?alt=media&token=0857f467-d3f9-4dbe-aad0-7a7331295100"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <h1 className="mt-8 text-base/6 font-medium">{getWelcomeText()}</h1>
                        <p className="mt-1 text-sm/5 text-gray-600">
                            Provide your email to create your account
                        </p>

                        {(data?.error || error) && (
                            <div className="mt-4 p-4 rounded-md bg-red-100 text-red-700">
                                <p>{data?.error || (error && errorMessages[error]) || "An error occurred. Please try again."}</p>
                            </div>
                        )}

                        {data?.sent ? (
                            <div className="mt-8">
                                <div className="p-4 rounded-md bg-green-100 text-green-700">
                                    <p>Please click the link sent to your email: {email}.</p>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-500">Didn&apos;t get the email?</p>
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={timeLeft > 0}
                                        className={`mt-2 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ${timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {timeLeft > 0 ? `Please wait ${timeLeft}s` : 'Resend Magic Link'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Form method="POST" className="mt-8">
                                {data?.userExists === false && (
                                    <div className="mb-6 rounded-md bg-blue-50 p-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-blue-800">
                                                    User does not exist
                                                </h3>
                                                <div className="mt-2 text-sm text-blue-700">
                                                    <p>We couldn't find an account with that email. Please provide additional details to create your account.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Field className="space-y-3">
                                    <Label className="text-sm/5 font-medium">Email</Label>
                                    <Input
                                        required
                                        autoFocus
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={clsx(
                                            'block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10',
                                            'px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
                                        )}
                                    />
                                </Field>

                                {data?.userExists === false && (
                                    <>
                                        <Field className="mt-6 space-y-3">
                                            <Label className="text-sm/5 font-medium">First Name</Label>
                                            <Input
                                                required
                                                type="text"
                                                name="firstName"
                                                className={clsx(
                                                    'block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10',
                                                    'px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
                                                )}
                                            />
                                        </Field>

                                        <Field className="mt-6 space-y-3">
                                            <Label className="text-sm/5 font-medium">Last Name</Label>
                                            <Input
                                                required
                                                type="text"
                                                name="lastName"
                                                className={clsx(
                                                    'block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10',
                                                    'px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black'
                                                )}
                                            />
                                        </Field>

                                        <div className="mt-6 space-y-3">
                                            <label htmlFor="phone" className="block text-sm/5 font-medium text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="flex rounded-lg border border-transparent ring-1 shadow-sm ring-black/10 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:-outline-offset-1 has-[input:focus]:outline-black">
                                                <div className="flex items-center px-3 text-gray-500 bg-gray-50 border-r border-gray-200">
                                                    <span className="text-base sm:text-sm">+61</span>
                                                </div>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    placeholder="4XX XXX XXX"
                                                    className="block min-w-0 grow rounded-r-lg bg-white py-3 pl-3 pr-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <input type="hidden" name="next" value={next} />
                                {app && <input type="hidden" name="app" value={app} />}

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        name="intent"
                                        value={data?.userExists === false ? "create" : "check"}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {data?.userExists === false ? "Create new account" : "Send Email Link"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
