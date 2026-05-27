import { createApiClient, getBaseUrl } from "~/lib/api";
import type { Announcement } from "~/components/Announcements";
import type { Hackathon } from "~/services/hackathon";

export const WATT_THE_HACK_SLUG = "watt-the-hack";

export interface GenericHackathonMember {
  id: number;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  role: string;
}

export interface GenericHackathonTeam {
  id: number;
  team_id: number;
  code: string;
  team_name: string;
  avatar_url?: string | null;
  member_count: number;
  members: GenericHackathonMember[];
}

export interface GenericHackathonSubmission {
  id: number;
  title: string;
  summary: string;
  repository_url?: string | null;
  demo_url?: string | null;
  slides_url?: string | null;
  attachment_url?: string | null;
  attachment_name?: string;
  attachment_content_type?: string;
  attachment_size?: number | null;
  team: GenericHackathonTeam;
  submitted_by: {
    id: number;
    email: string;
    full_name: string;
    avatar_url?: string | null;
  };
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

export interface GenericHackathonResource {
  id: number;
  title: string;
  summary: string;
  body?: string;
  url?: string | null;
  category?: string;
  order: number;
}

function appPath(slug: string, path: string) {
  return `/api/v1/hackathons/${slug}/app/${path}`;
}

function cookieHeaders(request?: Request) {
  const headers: Record<string, string> = {};
  const cookie = request?.headers.get("Cookie");
  if (cookie) headers.Cookie = cookie;
  return headers;
}

function errorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const detail = record.detail ?? record.error ?? record.message;
    if (typeof detail === "string" && detail.trim()) return detail.trim();
  }
  return fallback;
}

export async function getGenericHackathon(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<Hackathon> {
  const client = createApiClient(env, request);
  const response = await client.get(`/api/v1/hackathons/${slug}/`);
  return response.data;
}

export async function getGenericCurrentTeam(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonTeam | null> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "team/"));
  return response.data ?? null;
}

export async function getGenericTeams(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonTeam[]> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "teams/"));
  return response.data || [];
}

export async function createGenericTeam(env: Env, request: Request, slug: string, teamName: string): Promise<GenericHackathonTeam> {
  const client = createApiClient(env, request);
  const response = await client.post(appPath(slug, "teams/"), { team_name: teamName });
  return response.data.team;
}

export async function joinGenericTeam(env: Env, request: Request, slug: string, code: string): Promise<GenericHackathonTeam> {
  const client = createApiClient(env, request);
  const response = await client.post(appPath(slug, "teams/join/"), { code });
  return response.data;
}

export async function getGenericSubmissions(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonSubmission[]> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "submissions/"));
  return response.data || [];
}

export async function createGenericSubmission(env: Env, request: Request, slug: string, formData: FormData): Promise<GenericHackathonSubmission> {
  const response = await fetch(`${getBaseUrl(env)}${appPath(slug, "submissions/")}`, {
    method: "POST",
    headers: cookieHeaders(request),
    body: formData,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(errorMessage(data, "Submission failed."));
  }
  return data as GenericHackathonSubmission;
}

export async function getGenericAnnouncements(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<Announcement[]> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "announcements/"));
  return response.data || [];
}

export async function getGenericResources(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonResource[]> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "resources/"));
  return response.data || [];
}
