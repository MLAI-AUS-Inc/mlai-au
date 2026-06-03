import { redirect } from "react-router";
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
  leader_id?: number | null;
}

export interface GenericHackathonJoinRequest {
  id: number;
  user: { id: number; full_name: string; email: string; avatar_url?: string | null };
  team_id: number;
  team_name: string;
  created_at: string;
}

export interface GenericHackathonRequests {
  incoming: GenericHackathonJoinRequest[];
  outgoing: GenericHackathonJoinRequest[];
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

export interface WattUnitySession {
  stream_url: string;
  household_id: string;
  expires_at: string;
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

function asGenericTeam(data: unknown): GenericHackathonTeam | null {
  if (!data || Array.isArray(data) || typeof data !== "object") return null;
  const record = data as Partial<GenericHackathonTeam>;
  if (!Array.isArray(record.members)) return null;
  return record as GenericHackathonTeam;
}

export async function getGenericHackathon(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<Hackathon> {
  const client = createApiClient(env, request);
  const response = await client.get(`/api/v1/hackathons/${slug}/`);
  if (!response.data || Array.isArray(response.data) || typeof response.data.name !== "string") {
    throw new Error("Invalid hackathon response.");
  }
  return response.data;
}

export async function getGenericCurrentTeam(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonTeam | null> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "team/"));
  return asGenericTeam(response.data);
}

/** A Watt team may enter the streamed game only with 2..6 members (matches the backend gate). */
export const WATT_MIN_TEAM_MEMBERS = 2;
export const WATT_MAX_TEAM_MEMBERS = 6;

export function isValidWattTeam(team: GenericHackathonTeam | null): boolean {
  if (!team) return false;
  const count = team.member_count ?? team.members?.length ?? 0;
  return count >= WATT_MIN_TEAM_MEMBERS && count <= WATT_MAX_TEAM_MEMBERS;
}

/**
 * Loader guard: the smart-home game (stream + controller + shop) is only reachable by a team of
 * 2..6 members. Redirects to the profile/team page otherwise, and returns the team when valid.
 */
export async function requireValidWattTeam(env: Env, request: Request): Promise<GenericHackathonTeam> {
  const team = await getGenericCurrentTeam(env, request);
  if (!isValidWattTeam(team)) {
    // Carry a reason so the profile page can explain why they landed there
    // instead of dumping them on the team page with no context.
    throw redirect("/watt-the-hack/profile?reason=team-size");
  }
  return team as GenericHackathonTeam;
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

export async function joinGenericTeam(
  env: Env,
  request: Request,
  slug: string,
  code: string,
): Promise<{ pending?: boolean; team_name?: string; request_id?: number }> {
  // Now creates a *join request* the team leader must accept — no longer an instant join.
  const client = createApiClient(env, request);
  const response = await client.post(appPath(slug, "teams/join/"), { code });
  return response.data || {};
}

export async function leaveGenericTeam(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(appPath(slug, "team/leave/"), {});
}

export async function transferTeamLead(env: Env, request: Request, slug: string, memberId: number): Promise<GenericHackathonTeam> {
  const client = createApiClient(env, request);
  const response = await client.post(appPath(slug, "team/transfer-lead/"), { member_id: memberId });
  return response.data;
}

export async function disbandGenericTeam(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(appPath(slug, "team/disband/"), {});
}

export async function getJoinRequests(env: Env, request: Request, slug = WATT_THE_HACK_SLUG): Promise<GenericHackathonRequests> {
  const client = createApiClient(env, request);
  const response = await client.get(appPath(slug, "team/requests/"));
  const data = (response.data || {}) as Partial<GenericHackathonRequests>;
  return { incoming: data.incoming || [], outgoing: data.outgoing || [] };
}

export async function acceptJoinRequest(env: Env, request: Request, slug: string, requestId: number): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(appPath(slug, `team/requests/${requestId}/accept/`), {});
}

export async function rejectJoinRequest(env: Env, request: Request, slug: string, requestId: number): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(appPath(slug, `team/requests/${requestId}/reject/`), {});
}

export async function cancelJoinRequest(env: Env, request: Request, slug: string, requestId: number): Promise<void> {
  const client = createApiClient(env, request);
  await client.post(appPath(slug, `team/requests/${requestId}/cancel/`), {});
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

export async function createWattUnitySession(env: Env, request: Request): Promise<WattUnitySession> {
  const client = createApiClient(env, request);
  const response = await client.post("/api/v1/hackathons/watt/unity-sessions/current/", {});
  const data = response.data as Partial<WattUnitySession>;
  if (!data || typeof data.stream_url !== "string" || typeof data.expires_at !== "string") {
    throw new Error("Invalid Unity stream session response.");
  }
  return data as WattUnitySession;
}

// --- Smart Home (Beginner) coding-blocks challenge ---

export interface SmartHomeBlock {
  block_id: string;
  group: string;
  label: string;
  blurb: string;
}

export interface SmartHomeCatalog {
  groups: string[];
  blocks: SmartHomeBlock[];
}

export interface SmartHomeDeployCommand {
  command_id: string;
  block_id: string | null;
  action: string;
  target_id: string;
}

export interface SmartHomeDeployResult {
  household_id: string;
  tick_seen: number;
  deployed_count: number;
  commands: SmartHomeDeployCommand[];
  decisions: string[];
  brain?: string | null;
}

export interface SmartHomePipeline {
  inputs: string[];
  schedule: string[];
  brain: string[];
  actions: string[];
  outputs: string[];
  safety: string[];
}

export interface SmartHomeState {
  live: boolean;
  household_id?: string;
  day?: number | null;
  tick?: number | null;
  game_time?: string | null;
  wallet?: number | null;
  cost?: number | null;
  energy_kwh?: number | null;
  comfort?: number | null;
  score?: number | null;
  tariff_period?: string | null;
  weather_condition?: string | null;
  // Why the house is/ isn't live (from the backend's observation_liveness):
  // "live" | "stale" | "no_observation" | "missing_timestamp".
  live_reason?: string | null;
  published_age_ms?: number | null;
}

export async function getSmartHomeBlocks(env: Env, request: Request): Promise<SmartHomeCatalog> {
  const client = createApiClient(env, request);
  const response = await client.get("/api/v1/hackathons/watt/smart-home/blocks/");
  const data = (response.data ?? {}) as Partial<SmartHomeCatalog>;
  return {
    groups: Array.isArray(data.groups) ? data.groups.map((group) => String(group)) : [],
    blocks: Array.isArray(data.blocks) ? (data.blocks as SmartHomeBlock[]) : [],
  };
}

export async function deploySmartHome(
  env: Env,
  request: Request,
  pipeline: SmartHomePipeline,
): Promise<SmartHomeDeployResult> {
  const client = createApiClient(env, request);
  const response = await client.post("/api/v1/hackathons/watt/smart-home/deploy/", { pipeline });
  return response.data as SmartHomeDeployResult;
}

export async function getSmartHomeState(env: Env, request: Request): Promise<SmartHomeState> {
  const client = createApiClient(env, request);
  const response = await client.get("/api/v1/hackathons/watt/smart-home/state/");
  const data = (response.data ?? {}) as Partial<SmartHomeState>;
  return { ...data, live: Boolean(data.live) } as SmartHomeState;
}

export interface SmartHomeShopItem {
  item_id: string;
  name: string;
  summary: string;
  category: string;
  cost: number;
  visible_from_day: number;
  owned: boolean;
  can_buy: boolean;
}

export interface SmartHomeShopState {
  available: boolean;
  day?: number | null;
  wallet?: number | null;
  items: SmartHomeShopItem[];
}

export interface SmartHomeBuyResult {
  ok: boolean;
  item_id: string;
  reason?: string | null;
  message?: string | null;
  pending?: boolean;
  command_id?: string;
}

export async function getSmartHomeShop(env: Env, request: Request): Promise<SmartHomeShopState> {
  const client = createApiClient(env, request);
  const response = await client.get("/api/v1/hackathons/watt/smart-home/shop/");
  const data = (response.data ?? {}) as Partial<SmartHomeShopState>;
  return {
    available: Boolean(data.available),
    day: data.day ?? null,
    wallet: data.wallet ?? null,
    items: Array.isArray(data.items) ? (data.items as SmartHomeShopItem[]) : [],
  };
}

export async function buySmartHomeUpgrade(
  env: Env,
  request: Request,
  itemId: string,
): Promise<SmartHomeBuyResult> {
  const client = createApiClient(env, request);
  const response = await client.post("/api/v1/hackathons/watt/smart-home/buy/", { item_id: itemId });
  return response.data as SmartHomeBuyResult;
}
