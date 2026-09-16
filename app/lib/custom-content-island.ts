export type IslandFocus = "any" | "informational" | "commercial" | "transactional" | "navigational" | "custom";

export interface CustomIslandBrief {
  subject: string;
  description: string;
  audience: string;
  searchIntent: IslandFocus;
  focus: string;
}

export interface ResearchedIsland {
  id: string;
  name: string;
  description: string;
  pillar_keyword: string;
  metrics: { keyword_count: number; total_volume: number; avg_difficulty: number; opportunity_score: number };
  keywords: { keyword: string; volume: number; difficulty: number }[];
}

export const EMPTY_ISLAND_BRIEF: CustomIslandBrief = { subject: "", description: "", audience: "", searchIntent: "any", focus: "" };

export const ISLAND_FOCUSES = [
  { id: "any", label: "Explore all opportunities", summary: "Find relevant themes across all search intents." },
  { id: "informational", label: "Informational", summary: "Help people learn, answer questions or solve a problem." },
  { id: "commercial", label: "Commercial", summary: "Help people compare options before they decide." },
  { id: "transactional", label: "Transactional", summary: "Reach people ready to buy, book or take action." },
  { id: "navigational", label: "Navigational", summary: "Help people find a specific brand, service or resource." },
  { id: "custom", label: "My own direction", summary: "Describe what you want your content to help people do." },
] as const;

export const ISLAND_BRIEF_EXAMPLES = [
  { label: "A topic", subject: "Growing vegetables on a small balcony", audience: "People with limited outdoor space" },
  { label: "A service", subject: "Home energy assessments and reducing electricity bills", audience: "Homeowners" },
  { label: "A product or feature", subject: "Automated invoice reminders for freelancers", audience: "Freelancers and small teams" },
] as const;

export function researchIsTerminal(status?: string) {
  return ["completed", "failed", "blocked", "cancelled", "canceled", "not_found"].includes(status || "");
}

export function researchedIslands(result?: Record<string, unknown>): ResearchedIsland[] {
  if (!Array.isArray(result?.suggested_islands)) return [];
  return result.suggested_islands.filter((value): value is ResearchedIsland => {
    const item = value as ResearchedIsland;
    return Boolean(item && typeof item.id === "string" && typeof item.name === "string" && item.metrics &&
      Number.isFinite(item.metrics.total_volume) && item.metrics.total_volume > 0 &&
      Number.isFinite(item.metrics.avg_difficulty) && Array.isArray(item.keywords) && item.keywords.length > 0 &&
      item.keywords.every(row => row && typeof row.keyword === "string" && row.keyword.trim() &&
        Number.isFinite(row.volume) && row.volume > 0 && Number.isFinite(row.difficulty) && row.difficulty >= 0 && row.difficulty <= 100));
  });
}
