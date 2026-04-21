// Simple Vibe Raising session management using cookies
// This is a lightweight approach for the Vibe Raising app

import { redirect } from "react-router";

export const VIBE_RAISING_LANDING_PATH = "/vibe-raising";
export const VIBE_RAISING_APP_PATH = "/vibe-raising/app";
export const VIBE_RAISING_COMPANY_SETUP_PATH = `${VIBE_RAISING_APP_PATH}/company-setup`;
export const VIBE_RAISING_CREATE_UPDATE_PATH = `${VIBE_RAISING_APP_PATH}/create-update`;
export const VIBE_RAISING_LOGOUT_PATH = `${VIBE_RAISING_APP_PATH}/logout`;

export interface Company {
    id: string;
    name: string;
    domain?: string;
    abn?: string;
    location?: string;
    registered: boolean;
}

export interface VibeRaisingUser {
    fullName: string;
    email: string;
    companyName: string;
    role: "founder" | "investor";
    domain?: string;
    abn?: string;
    location?: string;
    companyRegistered?: boolean;
    // Multi-company support
    companies?: Company[];
    activeCompanyId?: string;
}

export interface PublishedVibeRaisingUpdate {
    id: string;
    month: string;
    date: string;
    score: string;
    summary?: string;
    sourceUrl?: string;
    videoUrl?: string;
    metrics: Record<string, string>;
    highlights: string;
    challenges: string;
    asks: string;
    likes: number;
    comments: number;
    investorsSentTo: number;
    investorsViewed: number;
    isCurrent: boolean;
}

// Get the active company from a user (backward-compatible with single-company sessions)
export function getActiveCompany(user: VibeRaisingUser): Company {
    if (user.companies?.length) {
        const active = user.companies.find(c => c.id === user.activeCompanyId);
        if (active) return active;
        return user.companies[0];
    }
    return {
        id: "company-1",
        name: user.companyName,
        domain: user.domain,
        abn: user.abn,
        location: user.location,
        registered: user.companyRegistered ?? false,
    };
}

// Switch active company — updates both activeCompanyId and top-level fields for backward compat
export function setActiveCompany(user: VibeRaisingUser, companyId: string): VibeRaisingUser {
    const company = user.companies?.find(c => c.id === companyId);
    if (!company) return user;
    return {
        ...user,
        activeCompanyId: companyId,
        companyName: company.name,
        domain: company.domain,
        abn: company.abn,
        location: company.location,
        companyRegistered: company.registered,
    };
}

// Add a new company to the user and set it as active
export function addCompany(user: VibeRaisingUser, company: Company): VibeRaisingUser {
    const existing = user.companies ?? [];
    return {
        ...user,
        companies: [...existing, company],
        activeCompanyId: company.id,
        companyName: company.name,
        domain: company.domain,
        abn: company.abn,
        location: company.location,
        companyRegistered: company.registered,
    };
}

const COOKIE_NAME = "vibe_raising_session";
const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

function parseCookies(cookieHeader: string | null): Record<string, string> {
    if (!cookieHeader) return {};

    return Object.fromEntries(
        cookieHeader.split("; ").map((cookie) => {
            const [key, ...valueParts] = cookie.split("=");
            return [key, valueParts.join("=")];
        }),
    );
}

function createCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE_SECONDS): string {
    return `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

function clearCookie(name: string): string {
    return `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function getVibeRaisingSubmittedCookieName(companyId: string): string {
    return `vibe_submitted_${companyId}`;
}

export function getVibeRaisingPublishedUpdateCookieName(companyId: string): string {
    return `vibe_published_update_${companyId}`;
}

// Parse the vibe raising session cookie from request headers
export function getVibeRaisingUser(request: Request): VibeRaisingUser | null {
    const cookies = parseCookies(request.headers.get("Cookie"));
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
    return createCookie(COOKIE_NAME, encoded);
}

// Create a cookie that clears the session
export function clearVibeRaisingSessionCookie(): string {
    return clearCookie(COOKIE_NAME);
}

export function createVibeRaisingSubmittedCookie(companyId: string): string {
    return createCookie(getVibeRaisingSubmittedCookieName(companyId), "true");
}

export function clearVibeRaisingSubmittedCookie(companyId: string): string {
    return clearCookie(getVibeRaisingSubmittedCookieName(companyId));
}

export function createVibeRaisingPublishedUpdateCookie(companyId: string, update: PublishedVibeRaisingUpdate): string {
    return createCookie(
        getVibeRaisingPublishedUpdateCookieName(companyId),
        encodeURIComponent(JSON.stringify(update)),
    );
}

export function clearVibeRaisingPublishedUpdateCookie(companyId: string): string {
    return clearCookie(getVibeRaisingPublishedUpdateCookieName(companyId));
}

export function getVibeRaisingPublishedUpdate(request: Request, companyId: string): PublishedVibeRaisingUpdate | null {
    const cookies = parseCookies(request.headers.get("Cookie"));
    const cookieValue = cookies[getVibeRaisingPublishedUpdateCookieName(companyId)];

    if (!cookieValue) return null;

    try {
        return JSON.parse(decodeURIComponent(cookieValue)) as PublishedVibeRaisingUpdate;
    } catch {
        return null;
    }
}

export function hasSubmittedVibeRaisingUpdate(request: Request, user: VibeRaisingUser, companyId = getActiveCompany(user).id): boolean {
    const cookies = parseCookies(request.headers.get("Cookie"));
    return cookies[getVibeRaisingSubmittedCookieName(companyId)] === "true" || Boolean(getVibeRaisingPublishedUpdate(request, companyId));
}

// Require vibe raising auth - redirects to login if not authenticated
export function requireVibeRaisingAuth(request: Request): VibeRaisingUser {
    const user = getVibeRaisingUser(request);
    if (!user) {
        throw redirect(VIBE_RAISING_APP_PATH);
    }
    return user;
}

// Require specific role
export function requireFounder(request: Request): VibeRaisingUser {
    const user = requireVibeRaisingAuth(request);
    if (user.role !== "founder") {
        throw redirect(VIBE_RAISING_APP_PATH);
    }
    return user;
}

export function requireInvestor(request: Request): VibeRaisingUser {
    const user = requireVibeRaisingAuth(request);
    if (user.role !== "investor") {
        throw redirect(VIBE_RAISING_APP_PATH);
    }
    return user;
}
