// Simple Valley session management using cookies
// This is a lightweight approach for the Valley app

import { redirect } from "react-router";

export interface ValleyUser {
    fullName: string;
    email: string;
    companyName: string;
    role: "founder" | "investor";
}

const COOKIE_NAME = "valley_session";

// Parse the valley session cookie from request headers
export function getValleyUser(request: Request): ValleyUser | null {
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
        return JSON.parse(decodeURIComponent(sessionData)) as ValleyUser;
    } catch {
        return null;
    }
}

// Create a Set-Cookie header value for the valley session
export function createValleySessionCookie(user: ValleyUser): string {
    const encoded = encodeURIComponent(JSON.stringify(user));
    // Cookie expires in 7 days
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    return `${COOKIE_NAME}=${encoded}; Path=/; Expires=${expires}; SameSite=Lax`;
}

// Create a cookie that clears the session
export function clearValleySessionCookie(): string {
    return `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// Require valley auth - redirects to login if not authenticated
export function requireValleyAuth(request: Request): ValleyUser {
    const user = getValleyUser(request);
    if (!user) {
        throw redirect("/valley");
    }
    return user;
}

// Require specific role
export function requireFounder(request: Request): ValleyUser {
    const user = requireValleyAuth(request);
    if (user.role !== "founder") {
        throw redirect("/valley");
    }
    return user;
}

export function requireInvestor(request: Request): ValleyUser {
    const user = requireValleyAuth(request);
    if (user.role !== "investor") {
        throw redirect("/valley");
    }
    return user;
}
