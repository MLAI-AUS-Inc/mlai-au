import rosterData from "./team-roster.json";

/** IDs are permanent: never regenerate them from display names or array positions. */
export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly imageUrl: string;
  readonly pixelImageUrl: string;
  readonly linkedIn: string;
  readonly twitter: string;
}

export const teamRoster: readonly TeamMember[] = rosterData;

// JSON imports infer string IDs; validate the identity contract when loading.
if (!teamRoster.length || teamRoster.some(member => !member.id.trim()) ||
    new Set(teamRoster.map(member => member.id)).size !== teamRoster.length) {
  throw new Error("Team roster must contain distinct, nonempty permanent IDs");
}

export type FighterId = (typeof teamRoster)[number]["id"];
export const DEFAULT_FIGHTER_ID: FighterId = "callum-holt";

export function resolveTeamMember(id: unknown, roster: readonly TeamMember[] = teamRoster): TeamMember {
  const member = typeof id === "string" ? roster.find(person => person.id === id) : undefined;
  const fallback = roster.find(person => person.id === DEFAULT_FIGHTER_ID) ?? roster[0];
  if (!fallback) throw new Error("Team roster must contain at least one member");
  return member ?? fallback;
}

export function adjacentFighterId(id: unknown, direction: -1 | 1, roster: readonly TeamMember[] = teamRoster): string {
  const member = resolveTeamMember(id, roster);
  const index = roster.findIndex(person => person.id === member.id);
  return roster[(index + direction + roster.length) % roster.length].id;
}
