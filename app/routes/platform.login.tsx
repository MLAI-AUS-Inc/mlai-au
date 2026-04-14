import type { Route } from "./+types/platform.login";
import { Form, Link, redirect, useActionData, useLoaderData, useSearchParams, useSubmit } from "react-router";
import { createUser, getCurrentUser, sendMagicLink, type AuthAppName } from "~/lib/auth";
import { useEffect, useState, type FormEvent } from "react";
import { GradientBackground } from "~/components/GradientBackground";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { getEnv } from "~/lib/env.server";
import {
    createVibeRaisingUnlockCookie,
    hasVibeRaisingUnlock,
} from "~/lib/vibe-raising";
import { isValidVibeRaisingAdminPassword } from "~/lib/vibe-raising-auth.server";

type VibeRaisingLoginStep = "email" | "password" | "sent";

export const meta: Route.MetaFunction = () => [
    { title: "Sign In to the MLAI Platform | MLAI" },
    { name: "description", content: "Sign in to your MLAI account to access the community platform, event dashboards, and tools for Australia's AI and Machine Learning community." },
    { name: "robots", content: "noindex, nofollow" },
];

function getDefaultNext(app: AuthAppName | null | undefined): string {
    if (app === "hospital") return "/hospital/app";
    if (app === "esafety") return "/esafety/dashboard";
    if (app === "innovate-connect-alliance") return "/innovate-connect-alliance";
    if (app === "vibe-raising") return "/vibe-raising";
    return "/hackathons";
}

function parseAuthApp(value: string | null): AuthAppName | null {
    return value === "esafety" || value === "hospital" || value === "innovate-connect-alliance" || value === "vibe-raising"
        ? value
        : null;
}

function parseVibeRaisingStep(value: string | null): VibeRaisingLoginStep | null {
    return value === "password" || value === "sent" || value === "email"
        ? value
        : null;
}

function buildVibeRaisingLoginHref(
    next: string,
    options?: { step?: VibeRaisingLoginStep; email?: string; error?: string; sent?: string },
): string {
    const params = new URLSearchParams({
        app: "vibe-raising",
        next,
    });

    if (options?.step) {
        params.set("step", options.step);
    }
    if (options?.email) {
        params.set("email", options.email);
    }
    if (options?.error) {
        params.set("error", options.error);
    }
    if (options?.sent) {
        params.set("sent", options.sent);
    }

    return `/platform/login?${params.toString()}`;
}

function buildSentTimestamp(): string {
    return String(Date.now());
}

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    const url = new URL(request.url);
    const app = parseAuthApp(url.searchParams.get("app"));
    let next = url.searchParams.get("next");

    if (!next) {
        next = getDefaultNext(app);
    }

    if (app === "vibe-raising") {
        const vibeUnlocked = await hasVibeRaisingUnlock(env, request);

        if (user && vibeUnlocked) {
            return redirect(next);
        }

        const requestedStep = parseVibeRaisingStep(url.searchParams.get("step"));
        const requestedEmail = String(url.searchParams.get("email") || "").trim();
        const email = user?.email || requestedEmail;
        const vibeStep: VibeRaisingLoginStep = user
            ? "password"
            : requestedStep === "sent" && email
                ? "sent"
                : requestedStep === "password" && email && !vibeUnlocked
                  ? "password"
                  : "email";

        return {
            vibeStep,
            email,
            vibeUnlocked,
            isAuthenticated: Boolean(user),
        };
    }

    if (user) {
        return redirect(next);
    }

    return {
        vibeStep: null,
        email: "",
        vibeUnlocked: false,
        isAuthenticated: false,
    };
}

export async function action({ request, context }: Route.ActionArgs) {
    const env = getEnv(context);
    const formData = await request.formData();
    const intent = formData.get("intent")?.toString() ?? "check";
    const app = parseAuthApp(formData.get("app")?.toString() ?? null) ?? undefined;
    const next = formData.get("next")?.toString() ?? getDefaultNext(app ?? null);
    const currentUser = await getCurrentUser(env, request);
    const email = String(currentUser?.email || formData.get("email") || "").trim();
    const role = formData.get("role")?.toString() as "participant" | "mentor" | "judge" | "organizer" ?? "participant";

    if (app === "vibe-raising") {
        const redirectToVibeSent = (headers?: Headers) =>
            redirect(
                buildVibeRaisingLoginHref(next, {
                    step: "sent",
                    email,
                    sent: buildSentTimestamp(),
                }),
                headers ? { headers } : undefined,
            );

        const completeVibeRaisingMagicLinkFlow = async (headers?: Headers) => {
            await sendMagicLink(env, { email, next, app });
            return redirectToVibeSent(headers);
        };

        if (!email) {
            return redirect(buildVibeRaisingLoginHref(next, { error: "missing_email" }));
        }

        if (intent === "unlock") {
            const password = formData.get("password")?.toString();
            if (!isValidVibeRaisingAdminPassword(password)) {
                return redirect(
                    buildVibeRaisingLoginHref(next, {
                        step: "password",
                        email,
                        error: "invalid_vibe_password",
                    }),
                );
            }

            const headers = new Headers();

            try {
                headers.append("Set-Cookie", await createVibeRaisingUnlockCookie(env));
            } catch (error) {
                if (error instanceof Error && error.message.includes("VIBE_RAISING_UNLOCK_SECRET")) {
                    console.error(
                        "Failed to create Vibe Raising unlock cookie: VIBE_RAISING_UNLOCK_SECRET is missing in the frontend worker runtime.",
                    );
                } else {
                    console.error("Failed to create Vibe Raising unlock cookie:", error);
                }
                return redirect(
                    buildVibeRaisingLoginHref(next, {
                        step: "password",
                        email,
                        error: "unlock_unavailable",
                    }),
                );
            }

            if (currentUser) {
                return redirect(next, { headers });
            }

            try {
                return await completeVibeRaisingMagicLinkFlow(headers);
            } catch (error) {
                console.error("Failed to continue Vibe Raising magic link flow:", error);
                return redirect(
                    buildVibeRaisingLoginHref(next, {
                        email,
                        error: "magic_link_failed",
                    }),
                    { headers },
                );
            }
        }

        const vibeUnlocked = await hasVibeRaisingUnlock(env, request);
        if (!vibeUnlocked) {
            return redirect(
                buildVibeRaisingLoginHref(next, {
                    step: "password",
                    email,
                    error: "unlock_required",
                }),
            );
        }

        try {
            return await completeVibeRaisingMagicLinkFlow();
        } catch (error) {
            console.error("Failed to continue Vibe Raising magic link flow:", error);
            return redirect(
                buildVibeRaisingLoginHref(next, {
                    step: intent === "resend" ? "sent" : "email",
                    email,
                    error: "magic_link_failed",
                }),
            );
        }
    }

    if (intent === "create") {
        const firstName = formData.get("firstName")?.toString();
        const lastName = formData.get("lastName")?.toString();
        const phone = formData.get("phone")?.toString();

        try {
            await createUser(env, {
                email,
                firstName,
                lastName,
                phone,
                role,
                app
            });
            return { sent: true, email };
        } catch (error) {
            console.error("Failed to create account:", error);
            return { error: "Failed to create account. Please try again." };
        }
    }

    try {
        const data = await sendMagicLink(env, { email, next, app });

        if (data.user_exists) {
            return { sent: true, email };
        }

        return { userExists: false, email };
    } catch (error) {
        console.error("Failed to send magic link:", error);
        return { error: "Failed to send magic link. Please try again." };
    }
}

export default function PlatformLogin() {
    const loaderData = useLoaderData<typeof loader>();
    const data = useActionData<typeof action>();
    const [searchParams] = useSearchParams();
    const app = parseAuthApp(searchParams.get("app"));
    const isVibeRaising = app === "vibe-raising";
    const next = searchParams.get("next") || getDefaultNext(app);
    const error = searchParams.get("error");
    const sentToken = searchParams.get("sent");
    const submit = useSubmit();

    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState(loaderData.email || data?.email || "");
    const [vibeStep, setVibeStep] = useState<VibeRaisingLoginStep>(loaderData.vibeStep || "email");

    useEffect(() => {
        if (isVibeRaising) {
            setEmail(loaderData.email || "");
            setVibeStep(loaderData.vibeStep || "email");
            return;
        }

        if (data?.email) {
            setEmail(data.email);
        }
    }, [data?.email, isVibeRaising, loaderData.email, loaderData.vibeStep]);

    const errorMessages: Record<string, string> = {
        invalid_link: "The verification link is invalid or missing. Please try logging in again.",
        verification_failed: "Email verification failed. The link may have expired. Please try logging in again.",
        missing_email: "Enter your email to continue.",
        invalid_vibe_password: "That admin password is incorrect.",
        unlock_required: "Enter the Vibe Raising admin password to continue.",
        unlock_unavailable: "Vibe Raising unlock is unavailable right now. Please try again later.",
        magic_link_failed: "Failed to send the magic link. Please try again.",
        create_failed: "Failed to create account. Please try again.",
    };

    useEffect(() => {
        if ((isVibeRaising && vibeStep === "sent" && sentToken) || (!isVibeRaising && data?.sent)) {
            setTimeLeft(30);
        }
    }, [data?.sent, isVibeRaising, sentToken, vibeStep]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleResend = () => {
        if (!email) return;

        const formData = new FormData();
        formData.append("email", email);
        formData.append("next", next);
        if (app) formData.append("app", app);
        formData.append("intent", isVibeRaising ? "resend" : "check");
        submit(formData, { method: "post" });
    };

    const handleVibeEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!isVibeRaising || loaderData.vibeUnlocked) {
            return;
        }

        event.preventDefault();
        if (event.currentTarget.reportValidity()) {
            setVibeStep("password");
        }
    };

    const getWelcomeText = () => {
        if (app === "esafety") return "Sign in to eSafety Hackathon";
        if (app === "hospital") return "Sign in to Medhack: Frontiers";
        if (app === "innovate-connect-alliance") return "Sign in to Innovate Connect Alliance";
        if (app === "vibe-raising") return "Sign in to Vibe Raising";
        return "Welcome!";
    };

    const getSupportText = () => {
        if (app === "vibe-raising") {
            return "Use your email to access Vibe Raising. You will need the admin password before the magic link flow continues.";
        }

        if (app === "innovate-connect-alliance") {
            return "Provide your email to create your account and access Innovate Connect Alliance.";
        }

        return "Provide your email to create your account";
    };

    const renderSentState = () => (
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
                    className={`mt-2 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ${timeLeft > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {timeLeft > 0 ? `Please wait ${timeLeft}s` : "Resend Magic Link"}
                </button>
            </div>
        </div>
    );

    const currentError = data?.error || (error ? errorMessages[error] : null);

    return (
        <main
            className={clsx(
                "relative min-h-screen overflow-hidden",
                isVibeRaising
                    ? "bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,#f7f2e8_100%)]"
                    : "bg-gray-50"
            )}
        >
            {isVibeRaising ? (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-[8%] top-[14%] h-36 w-36 rounded-full bg-[var(--brutalist-mint)]/10 blur-3xl" />
                    <div className="absolute right-[10%] top-[24%] h-40 w-40 rounded-full bg-[var(--brutalist-orange)]/10 blur-3xl" />
                    <div className="absolute bottom-[14%] left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[var(--brutalist-blue)]/10 blur-3xl" />
                </div>
            ) : (
                <GradientBackground />
            )}
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
                            {getSupportText()}
                        </p>

                        {currentError && (
                            <div className="mt-4 p-4 rounded-md bg-red-100 text-red-700">
                                <p>{currentError || "An error occurred. Please try again."}</p>
                            </div>
                        )}

                        {isVibeRaising ? (
                            vibeStep === "sent" ? renderSentState() : (
                                <>
                                    {vibeStep === "password" ? (
                                        <Form method="POST" className="mt-8">
                                            <Field className="space-y-3">
                                                <Label className="text-sm/5 font-medium">Email</Label>
                                                <Input
                                                    required
                                                    readOnly
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    className={clsx(
                                                        "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                                        "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black bg-gray-50"
                                                    )}
                                                />
                                            </Field>

                                            <Field className="mt-6 space-y-3">
                                                <Label className="text-sm/5 font-medium">Admin Password</Label>
                                                <Input
                                                    required
                                                    autoFocus
                                                    type="password"
                                                    name="password"
                                                    className={clsx(
                                                        "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                                        "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black"
                                                    )}
                                                />
                                            </Field>

                                            <input type="hidden" name="next" value={next} />
                                            <input type="hidden" name="app" value="vibe-raising" />

                                            <div className="mt-8 flex gap-3">
                                                {!loaderData.isAuthenticated && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setVibeStep("email")}
                                                        className="flex flex-1 items-center justify-center rounded-md border border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Back
                                                    </button>
                                                )}
                                                <button
                                                    type="submit"
                                                    name="intent"
                                                    value="unlock"
                                                    className="flex flex-1 justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </Form>
                                    ) : (
                                        <Form method="POST" className="mt-8" onSubmit={handleVibeEmailSubmit}>
                                            <Field className="space-y-3">
                                                <Label className="text-sm/5 font-medium">Email</Label>
                                                <Input
                                                    required
                                                    autoFocus
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                    className={clsx(
                                                        "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                                        "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black"
                                                    )}
                                                />
                                            </Field>

                                            <input type="hidden" name="next" value={next} />
                                            <input type="hidden" name="app" value="vibe-raising" />

                                            <div className="mt-8">
                                                <button
                                                    type="submit"
                                                    name="intent"
                                                    value="check"
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </>
                            )
                        ) : data?.sent ? renderSentState() : (
                            <Form method="POST" className="mt-8">
                                {data?.userExists === false && (
                                    <div className="mb-6 rounded-md bg-blue-50 p-4">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-blue-800">
                                                    User does not exist
                                                </h3>
                                                <div className="mt-2 text-sm text-blue-700">
                                                    <p>We couldn&apos;t find an account with that email. Please provide additional details to create your account.</p>
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
                                        onChange={(event) => setEmail(event.target.value)}
                                        className={clsx(
                                            "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                            "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black"
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
                                                    "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                                    "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black"
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
                                                    "block w-full rounded-lg border border-transparent ring-1 shadow-sm ring-black/10",
                                                    "px-4 py-3 text-gray-900 text-base sm:text-sm focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-black"
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
