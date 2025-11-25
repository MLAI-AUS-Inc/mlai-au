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
