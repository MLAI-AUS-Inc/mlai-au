import { backendFetch } from "./backend.server";

export async function sendMagicLink(env: Env, body: {
    email: string;
    fullName?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
    next?: string;
}) {
    return backendFetch(env, "/api/v1/auth/send-magic-link/", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function verifyMagicLink(env: Env, token: string) {
    return backendFetch(env, `/api/v1/auth/verify-magic-link/?token=${token}`, {
        method: "GET",
    });
}

export async function getCurrentUser(env: Env) {
    const res = await backendFetch(env, "/api/v1/auth/me/", {
        method: "GET",
    });
    if (res.status === 401) return null;
    return res.json();
}

export async function logout(env: Env) {
    return backendFetch(env, "/api/v1/auth/logout", { method: "POST" });
}

export async function createUser(env: Env, body: {
    email: string;
    fullName?: string;
    role?: "participant" | "mentor" | "judge" | "organizer";
}) {
    return backendFetch(env, "/api/v1/auth/create-user/", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function getTeamNames(env: Env): Promise<string[]> {
    const res = await backendFetch(env, "/api/v1/teams/", {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch team names");
    }
    const data = await res.json() as { team_names?: string[] };
    return data.team_names || [];
}

export async function updateUser(env: Env, body: {
    full_name?: string;
    team?: string;
    email?: string;
}) {
    return backendFetch(env, "/api/v1/auth/update-profile/", {
        method: "PATCH",
        body: JSON.stringify(body),
    });
}

export async function getUser(env: Env) {
    return getCurrentUser(env);
}

export async function getLeaderboardSubmissions(env: Env) {
    const res = await backendFetch(env, "/api/v1/submissions/leaderboard/", {
        method: "GET",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch leaderboard submissions");
    }
    return res.json();
}
