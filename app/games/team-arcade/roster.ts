export type FighterId = "sam" | "sonia";
export type Difficulty = "easy" | "normal" | "hard";

export const FIGHTERS = {
  sam: {
    id: "sam",
    name: "Sam Donegan",
    shortName: "SAM",
    role: "President",
    portrait: "/press-kit/team-sam-donegan.png",
    sheet: "/games/team-arcade/v1/sam.webp",
    color: "#00e5ff",
    style: "Balanced • strong reach",
    special: "Community Wave",
    speed: 3.6,
    reach: 1.05,
  },
  sonia: {
    id: "sonia",
    name: "Sonia Kaurah",
    shortName: "SONIA",
    role: "Vice President",
    portrait: "/press-kit/team-sonia-kaurah.webp",
    sheet: "/games/team-arcade/v1/sonia.webp",
    color: "#ff5a94",
    style: "Quick • close-range pressure",
    special: "Neural Spark",
    speed: 4.1,
    reach: 0.96,
  },
} as const;
export const FIGHTER_IDS = Object.keys(FIGHTERS) as FighterId[];
export const ASSET_VERSION = "team-arcade-v1";

export interface MatchConfig {
  player: FighterId;
  opponent: FighterId;
  difficulty: Difficulty;
  seed?: number;
}
