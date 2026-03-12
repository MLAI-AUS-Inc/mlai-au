// Simple Vibe Raising session management using cookies
// This is a lightweight approach for the Vibe Raising app

import { redirect } from "react-router";

export interface VibeRaisingUser {
    fullName: string;
    email: string;
    companyName: string;
    role: "founder" | "investor";
}

const COOKIE_NAME = "vibe_raising_session";

// Parse the vibe raising session cookie from request headers
export function getVibeRaisingUser(request: Request): VibeRaisingUser | null {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) return null;

    const cookies = Object.fromEntries(
        cookieHeader.split("; ").map(c => {
            const [key, ...val] = c.split("=");
            return [key, val.join("=")];
        })
    );

    const sessionData = cookies[COOKIE_NAME];
    if (!sessionData) return null;

    try {
        return JSON.parse(decodeURIComponent(sessionData)) as VibeRaisingUser;
    } catch {
        return null;
    }
}

// Create a Set-Cookie header value for the vibe raising session
export function createVibeRaisingSessionCookie(user: VibeRaisingUser): string {
    const encoded = encodeURIComponent(JSON.stringify(user));
    // Cookie expires in 7 days
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    return `${COOKIE_NAME}=${encoded}; Path=/; Expires=${expires}; SameSite=Lax`;
}

// Create a cookie that clears the session
export function clearVibeRaisingSessionCookie(): string {
    return `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// Require vibe raising auth - redirects to login if not authenticated
export function requireVibeRaisingAuth(request: Request): VibeRaisingUser {
    const user = getVibeRaisingUser(request);
    if (!user) {
        throw redirect("/vibe-raising");
    }
    return user;
}

// Require specific role
export function requireFounder(request: Request): VibeRaisingUser {
    const user = requireVibeRaisingAuth(request);
    if (user.role !== "founder") {
        throw redirect("/vibe-raising");
    }
    return user;
}

export function requireInvestor(request: Request): VibeRaisingUser {
    const user = requireVibeRaisingAuth(request);
    if (user.role !== "investor") {
        throw redirect("/vibe-raising");
    }
    return user;
}
