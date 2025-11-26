import { axiosInstance } from "./api";

// Helper to handle axios errors and return a consistent response format
// This mimics the fetch Response interface to keep compatibility with existing code where possible,
// or we can adapt the calling code.
// For now, let's try to return the data directly or a minimal object that mimics what the callers expect.
// However, the callers (like loaders) often expect a Response object or similar.
// Let's see how they are used.
// verifyMagicLink returns a Response-like object in the loader: res.ok, res.json()
// We should probably adapt the callers to use data directly, but to minimize changes,
// let's return a Promise that resolves to the data or throws.

// Actually, looking at the usage:
// verify-email.tsx: const res = await verifyMagicLink(...); if (!res.ok) ... const data = await res.json();
// platform.login.tsx: const res = await sendMagicLink(...); if (!res.ok) ... const data = await res.json();

// We should update the callers to handle axios responses (which throw on error by default)
// OR wrap axios to return { ok: boolean, json: () => Promise<any> }
// The cleaner way is to update callers, but for a quick migration, a wrapper is safer.
// BUT the user asked to "use axios in the way described here", which returns data directly.
// The user's example:
// export const sendMagicLink = async (data: any): Promise<any> => { ... return response.data; }

// So I will update the functions to return data directly, and I will have to update the callers.

export async function sendMagicLink(env: Env, body: {
    email: string;
    fullName?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
    next?: string;
}) {
    // env is not needed for axiosInstance as it uses import.meta.env
    const response = await axiosInstance.post("/api/v1/auth/send-magic-link/", body);
    return response.data;
}

export async function verifyMagicLink(env: Env, token: string) {
    const response = await axiosInstance.get(`/api/v1/auth/verify-magic-link/?token=${token}`);
    return response.data;
}

export async function getCurrentUser(env: Env, request?: Request) {
    const headers: Record<string, string> = {};
    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }

    try {
        const response = await axiosInstance.get("/api/v1/auth/me/", {
            headers
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            return null;
        }
        throw error;
    }
}

export async function logout(env: Env) {
    const response = await axiosInstance.post("/api/v1/auth/logout");
    return response.data;
}

export async function createUser(env: Env, body: {
    email: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    phone?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
}) {
    const response = await axiosInstance.post("/api/v1/auth/create-user/", body);
    return response.data;
}

export async function getTeamNames(env: Env, request?: Request): Promise<string[]> {
    const headers: Record<string, string> = {};
    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }
    const response = await axiosInstance.get("/api/v1/teams/", { headers });
    return response.data.team_names || [];
}

export async function updateUser(env: Env, body: {
    full_name?: string;
    team?: string;
    email?: string;
}, request?: Request) {
    const headers: Record<string, string> = {};
    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }
    const response = await axiosInstance.patch("/api/v1/auth/update-profile/", body, { headers });
    return response.data;
}

export async function getUser(env: Env) {
    return getCurrentUser(env);
}

export async function getLeaderboardSubmissions(env: Env, request?: Request) {
    const headers: Record<string, string> = {};
    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }
    const response = await axiosInstance.get("/api/v1/submissions/leaderboard/", { headers });
    return response.data;
}
