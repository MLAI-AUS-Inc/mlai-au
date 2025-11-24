import type { Route } from "./+types/platform.login";
import { Form, useActionData } from "react-router";
import { sendMagicLink } from "~/lib/auth";

export async function action({ request, context }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email")?.toString() ?? "";
    const role = formData.get("role")?.toString() as "participant" | "mentor" | "judge" | "organizer" ?? "participant";
    const next = formData.get("next")?.toString() ?? "/platform/dashboard";

    await sendMagicLink(context.cloudflare.env, { email, role, next });

    return { sent: true, email };
}

export default function PlatformLogin() {
    const data = useActionData<typeof action>();

    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="mb-10">
                        <img
                            className="h-10 w-auto"
                            src="/text_logo.png"
                            alt="MLAI"
                        />
                        <h2 className="mt-6 text-base font-semibold text-gray-900">
                            Welcome!
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Provide your email to create your account
                        </p>
                    </div>

                    {data?.sent ? (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">
                                        Magic link sent
                                    </h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>
                                            Check your email ({data.email}) for a link to sign in.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Form className="space-y-6" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <input type="hidden" name="next" value="/platform/dashboard" />

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Send Email Link
                                </button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}
