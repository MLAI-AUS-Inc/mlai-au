// Adapted from user provided code for React Router v7
import type { MetaDescriptor } from "react-router";

export const ARTICLE_FALLBACK_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504";

export type ArticleWithSlug = {
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  author: string;
  /** Optional array of author keys from authors.ts for multi-author articles */
  authors?: string[];
  slug: string;
  image: string;
  imageAlt: string;
  professionalsPersona?: string;
  dateModified?: string;
  lastUpdated?: string;
  downloads?: Array<{ name: string; url: string }>;
  /** If true, this article has a content component at app/articles/content/{slug}.tsx */
  hasContent?: boolean;
};

// Route Categories for MLAI
export type ArticleRouteCategory =
  | "featured"
  | "careers"
  | "technology"
  | "ai-ml"
  | "startups"
  | "community"
  | "workshops"
  | "tutorials";

const CATEGORY_SEGMENTS: ArticleRouteCategory[] = [
  "featured",
  "careers",
  "technology",
  "ai-ml",
  "startups",
  "community",
  "workshops",
  "tutorials",
];

const DEFAULT_ARTICLE_ROUTE_CATEGORY: ArticleRouteCategory = "technology";

// Overrides for specific slugs or sub-paths
const CATEGORY_OVERRIDES: Record<string, ArticleRouteCategory> = {
  // Add category overrides as needed
};

// Legacy mapping if needed
const LEGACY_REGISTRY_TO_ROUTE_ALIASES: Record<string, string> = {
  // Add mappings here if you have specific legacy redirects/aliases
};

// Helper utils
function normalizeSlug(slug?: string): string {
  if (!slug) return "";
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

function hasCategoryPrefix(slug: string): boolean {
  return CATEGORY_SEGMENTS.some((segment) => slug.startsWith(`${segment}/`));
}

export function removeCategoryPrefix(slug: string): string {
  if (!hasCategoryPrefix(slug)) return slug;
  return slug.split("/").slice(1).join("/");
}

// Registry Data
export const ARTICLE_REGISTRY: Record<string, ArticleWithSlug> = {
  "featured/how-technology-affects-education-negatively": {
    title: "How technology affects education negatively",
    date: "2025-12-30",
    description:
      "Evidence-based risks of classroom tech—distraction, screen time, equity, privacy, and AI misuse—plus practical steps for Australian schools.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-affects-education-negatively",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad2b9095-7c58-48cb-93a0-796ec711627f.jpg?alt=media&token=aedd5035-940a-46bd-a249-0b171a8bc35c",
    imageAlt:
      "People in a tech startup environment, reflecting 90s film aesthetic, showcasing technology's negative impact on education.",
  },
  "featured/learn-ai-melbourne": {
    title: "Learn AI Melbourne: courses, meetups, and pathways",
    date: "2026-01-28",
    description:
      "A practical 2026 guide to learning AI in Melbourne—compare university/TAFE options, online vs on-campus delivery, time and costs, plus local meetups and portfolio tips.",
    author: "Dr Sam Donegan",
    slug: "featured/learn-ai-melbourne",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4",
    imageAlt:
      "Tech enthusiasts collaborate in a vibrant 90s film aesthetic, showcasing AI learning and community in Melbourne.",
    hasContent: true,
  },
  "featured/how-small-business-owners-can-get-started-with-ai-2026": {
    title: "How small business owners can get started with AI (2026)",
    date: "2026-01-22",
    description:
      "Starter plan for Australian small business owners to adopt AI in 2026: practical use cases, a 30-day pilot, privacy and security basics, and ROI tips.",
    author: "Dr Sam Donegan",
    slug: "featured/how-small-business-owners-can-get-started-with-ai-2026",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e8d91d69-4aa4-49a0-b1e4-a8b32d3f54ab.jpg?alt=media&token=3d3573bf-5a7d-416f-a7be-61be2dd87a04",
    imageAlt:
      "Retro 90s tech startup scene with diverse individuals brainstorming and collaborating in a creative workspace.",
  },
  "featured/how-to-foster-community-engagement": {
    title: "How to foster community engagement (2026)",
    date: "2026-01-14",
    description:
      "Practical, Australian-focused guide to foster community engagement: set purpose, include diverse voices, pick methods, close the loop, and measure what matters.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-foster-community-engagement",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf106b26-0a88-42db-9c1f-6ac3e8d53a9f.jpg?alt=media&token=633f122e-d0b9-4188-aac7-8f1da80c0a63",
    imageAlt: "People collaborating in a tech startup environment with a nostalgic 90s film aesthetic.",
  },
  "featured/startup-accelerator-australia": {
    title: "Startup accelerators in Australia (2026)",
    date: "2026-01-10",
    description:
      "A practical 2026 guide to Australian startup accelerators: key programs (Startmate, Google for Startups, UNSW 10x), typical terms, and how AI teams can apply.",
    author: "Dr Sam Donegan",
    slug: "featured/startup-accelerator-australia",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b4a9a55e-4254-4bb3-9eed-5b80dfbc4432.jpg?alt=media&token=54ee6558-bb42-4528-812c-7377691e9f9f",
    imageAlt: "Group of diverse entrepreneurs collaborating in a vibrant tech workspace, with a nostalgic 90s film aesthetic.",
  },
  "featured/how-to-find-networking-events": {
    title: "How to find networking events in Australia (2026)",
    date: "2026-01-03",
    description:
      "Practical ways to find networking events in Australia: where to look, how to filter by industry and city, and tips for online and in-person meetups.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-find-networking-events",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-12562886-6a00-40c3-bd65-734cd91f9fb4.jpg?alt=media&token=d1df7641-6648-4366-a06e-630ccc6043c7",
    imageAlt:
      "Group of diverse professionals networking in a vibrant tech startup setting, evoking a nostalgic 90s film aesthetic.",
  },
  "featured/how-modern-technology-affects-education-today-and-in-the-fut": {
    title: "How modern technology affects education today and in the future (2026)",
    date: "2025-12-26",
    description:
      "A practical Australian view: benefits, risks and what’s next for AI, privacy and inclusion—plus steps to pilot edtech responsibly.",
    author: "Dr Sam Donegan",
    slug: "featured/how-modern-technology-affects-education-today-and-in-the-fut",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c64e3c6c-e429-49ad-acb9-ed1a06156751.jpg?alt=media&token=d82a401d-a58e-47e5-ba8d-76025cf5b37b",
    imageAlt:
      "People collaborating in a retro tech startup setting, reflecting modern education's evolution and future impact.",
    hasContent: true,
  },
  "featured/how-technology-has-changed-education": {
    title: "How technology has changed education (2026)",
    date: "2025-12-21",
    description:
      "A practical Australian look at how technology reshaped learning, teaching and assessment—covering access, personalisation, collaboration, risks, and next steps.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-has-changed-education",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0536c018-0450-4ef6-bc45-46686799945c.jpg?alt=media&token=f79f1f9d-f5b6-41ca-8df5-35f1dce4af2f",
    imageAlt:
      "Diverse team collaborating in a tech startup, showcasing retro 90s film aesthetic in an innovative education setting.",
  },
  "featured/how-much-venture-capital-was-invested-in-2023": {
    title: "How much venture capital was invested in 2023?",
    date: "2025-12-17",
    description:
      "Global VC funding in 2023 ranged between ~US$248B and ~US$285B depending on source. Why estimates differ, sector trends (AI), and what it means for Australia.",
    author: "Dr Sam Donegan",
    slug: "featured/how-much-venture-capital-was-invested-in-2023",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c930b949-7cad-4fe3-b144-e118eca0cfd1.jpg?alt=media&token=d69d7730-2e33-4055-b69e-b2cc47e40ad4",
    imageAlt: "Colorful 90s aesthetic photo of diverse tech professionals collaborating in a startup environment.",
  },
  "featured/what-are-collaboration-tools": {
    title: "What are collaboration tools",
    date: "2025-12-13",
    description:
      "A plain-English guide to collaboration tools: definition, types, benefits, examples, and how to choose for Australian teams.",
    author: "Dr Sam Donegan",
    slug: "featured/what-are-collaboration-tools",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4",
    imageAlt:
      "Team brainstorming in a vibrant tech startup, showcasing collaboration tools in a retro 90s film aesthetic.",
  },
  "featured/how-technology-is-shaping-learning-in-higher-education": {
    title: "How technology is shaping learning in higher education (2026)",
    date: "2025-12-09",
    description:
      "How hybrid learning, AI, analytics and micro-credentials are reshaping Australian higher education in 2026, with practical steps for students and educators.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-is-shaping-learning-in-higher-education",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6d1a2d84-8b4e-4540-969a-efedb4ed79d0.jpg?alt=media&token=40754573-bde6-4fe3-991d-f9b37be9cb08",
    imageAlt:
      "A retro-inspired scene showcasing diverse individuals collaborating in a tech startup environment.",
  },
  "featured/venture-capital-how-does-it-work": {
    title: "Venture capital: how it works (2026)",
    date: "2025-12-05",
    description:
      "Plain-English guide to how venture capital works in 2026: fund mechanics, rounds, dilution, term sheets, and Australian considerations. For founders and learners.",
    author: "Dr Sam Donegan",
    slug: "featured/venture-capital-how-does-it-work",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9dce8514-cb13-4930-b27d-d1f5dbefd41e.jpg?alt=media&token=10c631f0-44c2-4421-9a86-a5505a3d0383",
    imageAlt: "Team collaborating in a retro 90s tech startup office amidst brainstorming and innovation.",
    hasContent: true,
  },
  "featured/how-many-startup-accelerators-and-incubators-are-there-in-si": {
    title: "How many startup accelerators and incubators are there in Singapore? (2026)",
    date: "2025-12-01",
    description:
      "Short answer: about 60–80 active accelerators/incubators in Singapore in 2026, depending on definitions. Learn how counts are built and how to verify programmes.",
    author: "Dr Sam Donegan",
    slug: "featured/how-many-startup-accelerators-and-incubators-are-there-in-si",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-765a4937-d602-4779-9250-982df5058a4b.jpg?alt=media&token=cae4b2b5-76fd-48f2-bb4d-c018c943c150",
    imageAlt: "Diverse group of entrepreneurs discussing ideas in a vibrant 90s film-inspired tech workspace.",
    hasContent: true,
  },
  "featured/how-does-a-venture-capital-firm-work": {
    title: "How Does a Venture Capital Firm Work? (2026 Guide)",
    date: "2025-11-27",
    description:
      "Understand VC firm structure, LPs vs GPs, fund lifecycle, how VCs make money, the investment process, and what founders in Australia should know in 2026.",
    author: "Dr Sam Donegan",
    slug: "featured/how-does-a-venture-capital-firm-work",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6",
    imageAlt: "How Does a Venture Capital Firm Work? (2026 Guide)",
    hasContent: true,
  },
  "featured/the-best-startup-pitch-deck-ever": {
    title: "The Best Startup Pitch Deck Ever (2026): An Australian Founder's Guide",
    date: "2025-11-23",
    description:
      "Investors’ 2026 expectations, the 12-slide structure, AU-specific tips, timing, examples, and the most common mistakes—plus a downloadable checklist.",
    author: "Dr Sam Donegan",
    slug: "featured/the-best-startup-pitch-deck-ever",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e50e5db0-d45f-42af-bbe1-fa732bdd1ffb.jpg?alt=media&token=cee71a66-a4bf-48d9-81b0-a662965f714a",
    imageAlt: "The Best Startup Pitch Deck Ever (2026): An Australian Founder’s Guide",
    hasContent: true,
  },
  "featured/how-to-get-data-science-job": {
    title: "How to get a data science job in Australia (2026)",
    date: "2025-11-19",
    description:
      "AU-focused guide to landing a data science role: skills, portfolio, interviews, where to find jobs, and practical steps for grads, switchers and engineers.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-get-data-science-job",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "How to get a data science job in Australia (2026)",
    hasContent: true,
  },
  "featured/how-much-do-data-scientists-make": {
    title: "How Much Do Data Scientists Make?'",
    date: "2025-11-15",
    description:
      "Salary ranges for data scientists in Australia in 2026—entry, mid, senior and lead. City and industry differences, skills that lift pay, and negotiation tips.",
    author: "Dr Sam Donegan",
    slug: "featured/how-much-do-data-scientists-make",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-efc07de1-b4f1-46b2-8245-211ce8e1dd64.jpg?alt=media&token=ad15ab6a-efa7-4176-ba33-9908ed9a2d2e",
    imageAlt: "How Much Do Data Scientists Make?'",
  },

  // NOTE: Your pasted snippet continues with MANY more entries.
  // I am returning the full module structure + fixes you asked for.
  // Keep the rest of your ARTICLE_REGISTRY entries unchanged below this point,
  // and add them here (or paste your full registry content here).

  // Newsletter pillar + issues (merge conflict resolved)
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates": {
    title: "Weekly Deep Dive into AI and ML Advancements & Updates",
    date: "2026-01-08",
    description:
      "Issue #1: Journal paper breakdowns, new AI tools (MiniMax, Nemotron 3), book recommendations, and thoughts on valid Turing Tests.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_40_55%20PM%20(1).png?alt=media&token=dc0a3df1-837b-4549-be70-bc59ba215777",
    imageAlt: "Abstract data visualisation representing AI and machine learning signals",
    hasContent: true,
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2": {
  title: "AI Bits for Techies | Issue #2 | 19 Jan 2026",
  date: "2026-01-19",
  description: "Issue #2: Weekly deep dive into AI and ML advancements and updates.",
  author: "MLAI Editorial Team",
  authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
  slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2",
  image: ARTICLE_FALLBACK_IMAGE,
  imageAlt: "AI Bits for Techies newsletter banner",
  hasContent: true,
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3": {
    title: "AI Bits for Techies | Issue #3 | 26 Jan 2026",
    date: "2026-01-26",
    description: "Issue #3: Weekly deep dive into AI and ML advancements and updates.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "AI Bits for Techies newsletter banner",
    hasContent: true,
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4": {
    title: "AI Bits for Techies | Issue #4 | 5 Feb 2026",
    date: "2026-02-05",
    description: "Issue #4: Weekly deep dive into AI and ML advancements and updates.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "AI Bits for Techies newsletter banner",
    hasContent: true,
  },

};


/**
 * Deterministic ordering:
 * - Sort by date ASC (oldest -> newest) so "next" means newer
 * - Stable tie-break with slug
 */
export const ORDERED_ARTICLE_ROUTE_SLUGS: string[] = Object.values(ARTICLE_REGISTRY)
  .slice()
  .sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);

    if (!Number.isNaN(ta) && !Number.isNaN(tb) && ta !== tb) return ta - tb;
    if (!Number.isNaN(ta) && Number.isNaN(tb)) return -1;
    if (Number.isNaN(ta) && !Number.isNaN(tb)) return 1;

    return a.slug.localeCompare(b.slug);
  })
  .map((a) => a.slug);

export function getNextArticleSlug(currentSlug: string): string | undefined {
  const normalized = normalizeSlug(currentSlug);

  // Try direct match in the ordered list
  let index = ORDERED_ARTICLE_ROUTE_SLUGS.indexOf(normalized);

  // If passed only leaf slug, try suffix match
  if (index === -1) {
    index = ORDERED_ARTICLE_ROUTE_SLUGS.findIndex(
      (s) => s === normalized || s.endsWith(`/${normalized}`)
    );
  }

  if (index === -1 || index === ORDERED_ARTICLE_ROUTE_SLUGS.length - 1) {
    return undefined;
  }
  return ORDERED_ARTICLE_ROUTE_SLUGS[index + 1];
}

export function getPreviousArticleSlug(currentSlug: string): string | undefined {
  const normalized = normalizeSlug(currentSlug);

  let index = ORDERED_ARTICLE_ROUTE_SLUGS.indexOf(normalized);

  if (index === -1) {
    index = ORDERED_ARTICLE_ROUTE_SLUGS.findIndex(
      (s) => s === normalized || s.endsWith(`/${normalized}`)
    );
  }

  if (index <= 0) return undefined;
  return ORDERED_ARTICLE_ROUTE_SLUGS[index - 1];
}

// Public API Functions

export function getArticleBySlug(slug: string): ArticleWithSlug | undefined {
  const normalized = normalizeSlug(slug);

  // Direct match
  if (ARTICLE_REGISTRY[normalized]) {
    return ARTICLE_REGISTRY[normalized];
  }

  // Try finding by suffix if only the leaf slug is provided
  const foundKey = Object.keys(ARTICLE_REGISTRY).find(
    (key) => key.endsWith(`/${normalized}`) || key === normalized
  );
  if (foundKey) return ARTICLE_REGISTRY[foundKey];

  return undefined;
}

export function getArticlesSortedNewestFirst(): ArticleWithSlug[] {
  return Object.values(ARTICLE_REGISTRY).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getClusterCardsForPillar(pillarSlug: string): ArticleWithSlug[] {
  // Simple containment check for now.
  // In a real scenario, you might have a more robust "parent-child" relationship.
  const normalized = normalizeSlug(pillarSlug);
  return Object.values(ARTICLE_REGISTRY).filter(
    (article) => article.slug.startsWith(normalized + "/") && article.slug !== normalized
  );
}

export function resolveArticleRouteSlug(registrySlug: string): string {
  // This function ensures that we return the full route path for a given registry slug
  return normalizeSlug(registrySlug);
}

export function applyArticleRegistryDefaults(defaults: Partial<ArticleWithSlug>): ArticleWithSlug {
  // Helper to fill in missing details if needed
  return {
    title: "Untitled Article",
    date: new Date().toISOString().split("T")[0],
    description: "",
    author: "MLAI Team",
    slug: "unknown",
    image: "",
    imageAlt: "",
    ...defaults,
  } as ArticleWithSlug;
}

// Optional helper: meta tags builder (keeps MetaDescriptor import useful)
export function buildArticleMeta(article: ArticleWithSlug): MetaDescriptor[] {
  return [
    { title: article.title },
    { name: "description", content: article.description },

    { property: "og:type", content: "article" },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description },
    { property: "og:image", content: article.image },

    { name: "twitter:card", content: "summary_large_image" },
  ];
}

// (kept exported to avoid unused warnings if you reference them elsewhere)
export {
  CATEGORY_SEGMENTS,
  DEFAULT_ARTICLE_ROUTE_CATEGORY,
  CATEGORY_OVERRIDES,
  LEGACY_REGISTRY_TO_ROUTE_ALIASES,
  normalizeSlug,
  hasCategoryPrefix,
};
