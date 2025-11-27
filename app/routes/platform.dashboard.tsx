import type { Route } from "./+types/platform.dashboard";
import { redirect, useLoaderData } from "react-router";
import axios from "axios";
import { axiosInstance } from "~/lib/api";
export async function loader({ request, context }: Route.LoaderArgs) {
    // 1. Get cookies from the incoming browser request
    const cookieHeader = request.headers.get("Cookie");

    // 2. Pass them to the backend using axios
    const authResponse = await axios.get("http://esafety.localhost/api/v1/auth/me/", {
        headers: {
            // CRITICAL: Forward the cookies so Django knows who we are
            Cookie: cookieHeader || "",
        },
        // Ensure axios doesn't throw on 401 so we can handle it manually
        validateStatus: (status) => status < 500,
    });

    if (authResponse.status === 401) {
        throw redirect("/platform/login");
    }

    const user = authResponse.data;

    // Check for esafety subdomain and redirect to app dashboard
    const url = new URL(request.url);
    if (url.hostname.startsWith("esafety.")) {
        return redirect("/esafety/app");
    }

    let hackathons = [];
    try {
        const cookieHeader = request.headers.get("Cookie");
        const headers: Record<string, string> = {};
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
        const response = await axiosInstance.get("/api/v1/hackathons/", { headers });
        hackathons = response.data;
    } catch (error) {
        console.error("Failed to fetch hackathons:", error);
        // Fallback to mock data
        hackathons = [
            {
                name: "eSafety Hackathon",
                slug: "esafety",
                description: "Develop AI solutions for online safety."
            },
            {
                name: "AI Hospital Hackathon",
                slug: "ai-hospital",
                description: "AI in healthcare."
            }
        ];
    }

    return { user, hackathons };
}

export default function PlatformDashboard() {
    const { user, hackathons } = useLoaderData<typeof loader>();

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Welcome, {user.full_name ?? user.email}
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <a
                        href="/platform/logout"
                        className="ml-3 inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                    >
                        Logout
                    </a>
                </div>
            </div>

            <section className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-white">
                    Available Hackathons
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {hackathons.map((h: any) => (
                        <div
                            key={h.slug}
                            className="relative flex items-center space-x-3 rounded-lg border border-white/10 bg-white/5 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:border-white/20"
                        >
                            <div className="min-w-0 flex-1">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-white">{h.name}</p>
                                    <p className="truncate text-sm text-gray-400">{h.description}</p>
                                </a>
                            </div>
                            <div className="flex-shrink-0">
                                {h.slug === "esafety" && (
                                    <a
                                        href="/esafety/app"
                                        className="relative inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 z-10"
                                    >
                                        Open App
                                    </a>
                                )}
                                {h.slug === "ai-hospital" && (
                                    <a
                                        href="/ai-hospital/app" // Assuming this route will exist or redirects
                                        className="relative inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 z-10"
                                    >
                                        Open App
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
