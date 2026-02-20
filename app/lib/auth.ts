import { axiosInstance, API_URL } from "./api";
import axios from "axios";

// Helper to get the base URL from the environment or fall back to the static config
function getBaseUrl(env: Env): string {
    return env.BACKEND_BASE_URL || API_URL;
}

// Helper to create an axios instance for a specific request
function getAxios(env: Env, request?: Request) {
    const baseURL = getBaseUrl(env);
    const headers: Record<string, string> = {};

    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }

    return axios.create({
        baseURL,
        withCredentials: true,
        headers
    });
}

export async function sendMagicLink(env: Env, body: {
    email: string;
    fullName?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
    next?: string;
    app?: "esafety" | "hospital";
}) {
    // Derive app from next if not provided
    const app = body.app || (body.next?.startsWith("/esafety") ? "esafety" : "hospital");

    const client = getAxios(env);
    const response = await client.post("/api/v1/auth/send-magic-link/", { ...body, app });
    return response.data;
}

export async function verifyMagicLink(env: Env, token: string) {
    const client = getAxios(env);
    const response = await client.get(`/api/v1/auth/verify-magic-link/?token=${token}`);
    return response.data;
}

export async function verifyMagicLinkWithCookies(env: Env, token: string) {
    const client = getAxios(env);
    const response = await client.get(`/api/v1/auth/verify-magic-link/?token=${token}`);
    const setCookieHeaders = response.headers["set-cookie"] || [];
    return { data: response.data, setCookieHeaders };
}

export async function getCurrentUser(env: Env, request?: Request) {
    try {
        const client = getAxios(env, request);
        const response = await client.get("/api/v1/auth/me/");
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            return null;
        }
        // Log the error for debugging
        console.error("getCurrentUser error:", error.message, error.response?.status, error.response?.data);
        throw error;
    }
}

export async function logout(env: Env, request?: Request) {
    const client = getAxios(env, request);
    const response = await client.post("/api/v1/auth/logout/");
    return response;
}

export async function createUser(env: Env, body: {
    email: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
    app?: "esafety" | "hospital";
}) {
    const client = getAxios(env);
    const response = await client.post("/api/v1/auth/create-user/", body);
    return response.data;
}

export async function getTeamNames(env: Env, request?: Request, slug: string = "hospital"): Promise<string[]> {
    const client = getAxios(env, request);
    const response = await client.get(`/api/v1/hackathons/${slug}/get_team_names/`);
    return response.data.team_names || [];
}

export async function getHospitalTeams(env: Env, request: Request) {
    try {
        const client = getAxios(env, request);
        const response = await client.get("/api/v1/hackathons/hospital/teams/");
        return response.data || [];
    } catch (error) {
        console.error("Failed to fetch hospital teams:", error);
        return [];
    }
}

export async function getHospitalTeam(env: Env, request: Request, userId: number | undefined) {
    if (userId == null || !Number.isFinite(userId)) return null;
    try {
        const client = getAxios(env, request);
        const response = await client.get(`/api/v1/hackathons/hospital/teams/?member_id=${userId}`);
        const teams = response.data;
        if (Array.isArray(teams) && teams.length > 0) {
            return teams[0];
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch hospital team:", error);
        return null;
    }
}

export async function updateUser(env: Env, body: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    about?: string;
} | FormData, request?: Request) {
    const client = getAxios(env, request);

    // Use dynamic import for form-data to avoid client-side bundling issues
    // and to ensure we use the Node.js compatible FormData implementation for Axios
    if (body instanceof FormData) {
        console.log("updateUser: Body is FormData");
        try {
            const { default: NodeFormData } = await import('form-data' /* @vite-ignore */);
            const form = new NodeFormData();

            // Convert standard FormData to NodeFormData
            for (const [key, value] of body.entries()) {
                if (value instanceof File) {
                    const buffer = Buffer.from(await value.arrayBuffer());
                    form.append(key, buffer, {
                        filename: value.name,
                        contentType: value.type,
                    });
                } else {
                    form.append(key, value);
                }
            }

            const formHeaders = form.getHeaders();
            console.log("updateUser: Form headers", formHeaders);

            // Convert form stream to buffer to avoid Axios/Bun stream issues
            const buffer = await new Promise<Buffer>((resolve, reject) => {
                const chunks: Buffer[] = [];
                form.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
                form.on('end', () => resolve(Buffer.concat(chunks)));
                form.on('error', reject);
                form.resume();
            });

            console.log(`updateUser: Sending buffer of size ${buffer.length}`);

            const response = await client.patch("/api/v1/auth/update-profile/", buffer, {
                headers: {
                    ...client.defaults.headers.common,
                    ...client.defaults.headers.post, // or patch if axios separates them
                    ...formHeaders
                }
            });
            return response.data;
        } catch (e) {
            console.warn("Failed to load form-data or convert body, falling back to standard FormData", e);
        }
    } else {
        console.log("updateUser: Body is NOT FormData", body);
    }

    const response = await client.patch("/api/v1/auth/update-profile/", body);
    return response.data;
}

export async function getUser(env: Env) {
    return getCurrentUser(env);
}

export async function getLeaderboardSubmissions(env?: Env, request?: Request) {
    if (env) {
        const client = getAxios(env, request);
        const response = await client.get("/api/v1/hackathons/esafety/leaderboard/");
        return response.data;
    }
    const response = await axiosInstance.get("/api/v1/hackathons/esafety/leaderboard/");
    return response.data;
}

export async function getTeamSubmissions(env?: Env, request?: Request) {
    if (env) {
        const client = getAxios(env, request);
        const response = await client.get("/api/v1/hackathons/esafety/submissions/");
        return response.data;
    }
    const response = await axiosInstance.get("/api/v1/hackathons/esafety/submissions/");
    return response.data;
}

export async function submission(formData: FormData) {
    return axiosInstance.post("/api/v1/hackathons/esafety/submissions/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function getLatestSubmission() {
    const response = await axiosInstance.get("/api/v1/hackathons/esafety/submission/");
    return response.data;
}

// ─── Hospital hackathon helpers ────────────────────────────────────────────

export async function hospitalSubmission(formData: FormData) {
    return axiosInstance.post("/api/v1/hackathons/hospital/submissions/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function getHospitalRecentSubmissions(env?: Env, request?: Request) {
    if (env) {
        const client = getAxios(env, request);
        const response = await client.get("/api/v1/hackathons/hospital/get_recent_submissions/");
        return response.data;
    }
    const response = await axiosInstance.get("/api/v1/hackathons/hospital/get_recent_submissions/");
    return response.data;
}

export async function getHospitalLatestSubmission() {
    const response = await axiosInstance.get("/api/v1/hackathons/hospital/get_submission/");
    return response.data;
}
