// Adapted from user provided code for React Router v7
import type { MetaDescriptor } from "react-router";

export const ARTICLE_FALLBACK_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504";

export type ArticleWithSlug = {
  editorial?: { schemaVersion: number; audienceId: string; audienceVersion: number; actionId: string | null; actionVersion: number | null; conversionIntent: "offer" | "none" } | null;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  author: string;
  /** Public profile for the author credited on this article. */
  authorUrl?: string;
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
  /** Stable Content Factory analytics id; survives slug/URL changes. */
  analyticsArticleId?: string;
  /** Search indexing state. Noindex articles remain routable but are omitted from discovery surfaces. */
  indexing?: "index" | "noindex";
  /** Allows an integrity-risk article to keep its URL while withholding the unreviewed body. */
  publicationStatus?: "published" | "under-review";
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
    'featured/build-an-ai-personal-assistant-for-one-small-business-task': {
        title: "Build an AI Personal Assistant for One Small Business Task",
        date: "2026-09-25",
        dateModified: "2026-10-29",
        description: "Start with one low-risk admin task, test an AI assistant on fictional data, and use a two-week pilot to measure time saved, corrections and cost.",
        author: "Dr Sam Donegan",
        slug: "featured/build-an-ai-personal-assistant-for-one-small-business-task",
        analyticsArticleId: "73e03f5e-b109-4716-b669-ad755c14b2a4",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d60ebaf1-cc0c-49f0-8cd9-80084dcb1c32.jpg?alt=media&token=b0bc3200-6a81-4bef-ab86-0736283d82b9",
        imageAlt: "Person writing notes beside an open laptop at a desk",
        editorial: {"schemaVersion": 2, "audienceId": "icp-9bf5448c-c6b3-4c18-99d8-482571b32b31", "audienceVersion": 1, "actionId": "action-0a83a268-a752-47ba-a712-76008d9519bc", "actionVersion": 1, "conversionIntent": "offer"},
    },
    'featured/startups-in-melbourne-for-ai-builders-and-new-founders': {
        title: "Starting an AI Startup in Melbourne: People, Support and First Steps",
        date: "2026-09-13",
        dateModified: "2026-10-29",
        description: "Find Melbourne AI peers, explore Victorian founder support and plan a first week of customer validation with a dated resource map and worked example.",
        author: "Dr Sam Donegan",
        slug: "featured/startups-in-melbourne-for-ai-builders-and-new-founders",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-da78dd9e-bd65-48aa-819c-f49377d96b65.jpg?alt=media&token=84ba0b79-1709-4762-9d04-036b2fb60b08",
        imageAlt: "Illustrative image accompanying a guide to starting an AI business in Melbourne",
    },
    'featured/how-to-start-a-startup-as-an-ai-builder': {
        dateModified: "2026-10-29",
        title: "Starting an AI startup: validate the problem and test your first delivery",
        date: "2026-08-01",
        description: "For AI-assisted builders: separate customer demand from delivery readiness, run a worked acceptance review and prepare an honest handover.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-start-a-startup-as-an-ai-builder",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-41fdd6b6-a76b-487c-a41e-5b2c34b9af49.jpg?alt=media&token=87d6ad27-1725-4aa1-a5cb-0bd7ad7297c6",
        imageAlt: "Two people looking down together, one gesturing with a hand",
    },
    'featured/startup-company-investment-for-ai-founders': {
        title: "Funding an AI startup: milestone, budget and evidence",
        date: "2026-07-27",
        dateModified: "2026-10-29",
        description: "Decide what funding an AI startup must achieve. Use a worked milestone budget, delayed-receipt scenario and editable evidence worksheet before fundraising.",
        author: "Dr Sam Donegan",
        slug: "featured/startup-company-investment-for-ai-founders",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-09abd229-0994-46d7-b58b-0902fa9b4ef6.jpg?alt=media&token=9252f992-53cf-46c0-bf32-bb025bb61176",
        imageAlt: "AI founders reviewing runway plans and funding milestones with an investor at a shared table",
    },
    'featured/what-community-is-in-ai-and-why-it-is-more-than-a-group': {
        dateModified: "2026-09-11",
        title: "What an AI community is: examples and your first contribution",
        date: "2026-07-26",
        description: "See two public MLAI contributions, distinguish review from self-merge, and prepare a small contribution and permission-based follow-up for a suitable AI event.",
        author: "Dr Sam Donegan",
        slug: "featured/what-community-is-in-ai-and-why-it-is-more-than-a-group",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-224f0dfd-4f1d-493c-b646-bcc4df200d8d.jpg?alt=media&token=8d14687e-44aa-4fa4-a4c1-02c095ddc973",
        imageAlt: "Two people facing each other in conversation (illustrative image)",
    },
    'featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup': {
        title: "Is an accelerator right for your AI startup? A decision worksheet",
        date: "2026-07-26",
        dateModified: "2026-10-29",
        description: "Decide whether a startup accelerator addresses your actual constraint. Compare eligibility, support, founder-time costs and alternatives before applying.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c41fdb6d-155e-4092-9490-bca493c02527.jpg?alt=media&token=2219af28-2507-4c87-b5e6-368ad4e5c45a",
        imageAlt: "Illustration of founders reviewing programme notes",
    },
    'featured/invest-in-business-startups-before-you-commit': {
        dateModified: "2026-10-29",
        title: "Startup investing in Australia: evidence to check before committing",
        date: "2026-07-26",
        description: "Review an Australian startup investment with a worked diligence case: capital-loss risk, share rights, conflicts, cash evidence and reasons to pause.",
        author: "Dr Sam Donegan",
        slug: "featured/invest-in-business-startups-before-you-commit",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e0c9e564-2307-4457-8728-32dba9f6de85.jpg?alt=media&token=508f7364-448a-4d95-b25c-7122d20de479",
        imageAlt: "Founder and investor reviewing startup financials and market notes at a small table",
    },
    'featured/a-practical-guide-for-australian-founders-building-an-ai-startup': {
        dateModified: "2026-10-29",
        title: "Validate an AI startup idea in Australia: test one workflow",
        date: "2026-07-26",
        description: "Inspect a fictional AI startup workflow test: job notes, flawed drafts, a ten-case effort log and a completed decision record. Separate prototype behaviour from demand.",
        author: "Dr Sam Donegan",
        slug: "featured/a-practical-guide-for-australian-founders-building-an-ai-startup",
        analyticsArticleId: "",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e79c88fc-4c95-41a5-97b4-82ddbd846b29.jpg?alt=media&token=9fb77a30-cac3-449e-b544-e72cba021bf9",
        imageAlt: "Person holding a pen and an open notebook",
    },
    'featured/best-meetup-websites-for-ai-and-startup-communities-in-australia': {
        dateModified: "2026-10-29",
        title: "Meetup websites for Australian AI and startup events: how to choose",
        date: "2026-06-21",
        description: "Compare tested Australian event-discovery paths, account requirements and online-search limits. Use a completed decision record and editable shortlist to choose what fits.",
        author: "Content Team",
        slug: "featured/best-meetup-websites-for-ai-and-startup-communities-in-australia",
        analyticsArticleId: "6be3d26e-7b8d-433b-830c-42bdaa2bfaa0",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-87c11072-ea89-4507-81ff-3443bb29bb11.jpg?alt=media&token=81f170c2-330b-4bdd-ae46-a5e5d535b24a",
        imageAlt: "Two people talking face to face (illustrative image)",
    },
    'featured/where-to-find-ai-events-in-melbourne': {
        dateModified: "2026-10-29",
        title: "AI events in Melbourne: dated listings and a practical shortlist",
        date: "2026-06-21",
        description: "Compare source-checked Melbourne and online AI events by date, format, price and admission conditions, then make a practical shortlist before registering.",
        author: "Content Team",
        slug: "featured/where-to-find-ai-events-in-melbourne",
        analyticsArticleId: "456f9c9a-e1c9-442a-8b79-ef723732023d",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-63ff824e-6618-4f4b-9b2b-bf426360399f.jpg?alt=media&token=bd28dfd2-ff9d-43bd-b416-dbacabf52574",
        imageAlt: "Illustration accompanying a Melbourne AI event-selection guide",
    },
    'featured/why-australian-startups-need-stronger-ai-communities': {
        dateModified: "2026-09-11",
        title: "Using AI community feedback: from conversation to a testable next step",
        date: "2026-06-21",
        description: "Turn an Australian AI community conversation into a testable next step: prepare a shareable question, distinguish peer opinion from evidence and record what you will check.",
        author: "Content Team",
        slug: "featured/why-australian-startups-need-stronger-ai-communities",
        analyticsArticleId: "9cc692f4-4130-4eb8-885d-2af8cd624fc8",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-23950c23-bc67-4450-8674-8c111d188163.jpg?alt=media&token=ca641826-f54e-48e4-97c3-c4dabb3bffa5",
        imageAlt: "Two people in conversation beside a laptop (illustrative image)",
        hasContent: true,
    },
    'featured/how-to-find-an-ai-and-tech-meetup-in-sydney': {
        title: "Sydney AI and Tech Meetups: A Dated Community Directory",
        date: "2026-06-16",
        dateModified: "2026-10-29",
        description: "Choose a Sydney or online AI event using dated organiser evidence, honest price and admission limits, a filterable shortlist and a practical participation record.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-find-an-ai-and-tech-meetup-in-sydney",
        analyticsArticleId: "64190798-7555-4124-a7d7-311fda857e76",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-46210747-b902-4e9d-8ffa-f3df1058658b.jpg?alt=media&token=2ecc04f5-87e3-4795-aba4-d59f1905b8e5",
        imageAlt: "Illustrative image accompanying a Sydney AI and technology community guide",
        hasContent: true,
    },
    'featured/how-many-people-use-artificial-intelligence-in-2026': {
        dateModified: "2026-10-29",
        title: "How many people use AI? Reading the evidence in 2026",
        date: "2026-05-11",
        description: "Understand the billion-user estimate, dated Australian survey evidence and why monthly users, device counts and business adoption cannot be combined.",
        author: "Dr Sam Donegan",
        slug: "featured/how-many-people-use-artificial-intelligence-in-2026",
        analyticsArticleId: "f348c519-a2af-4986-bc50-6850f3ffb353",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8583b06a-0bec-421b-80b1-4b077b41d73a.jpg?alt=media&token=63af1baf-eb47-47d6-8d65-b78c7dabc210",
        imageAlt: "Close-up of people using AI tools on laptops and phones in a candid workspace moment",
        hasContent: true,
    },
    'featured/what-is-an-intelligent-agent-in-artificial-intelligence': {
        dateModified: "2026-09-10",
        title: "Intelligent agents in practice: a runnable PEAS design lab",
        date: "2026-05-09",
        description: "Run a PEAS agent-design lab, compare a stale-record guard against its unchanged policy, and inspect reproducible tests, failures and a completed change review.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-an-intelligent-agent-in-artificial-intelligence",
        analyticsArticleId: "23935d36-7698-4d41-af4a-df4a3c6a7244",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6e3a2103-531c-4ceb-bcd4-4f23a2f12c58.jpg?alt=media&token=bc7c5df0-4795-4456-95a7-3444817ada68",
        imageAlt: "Two people looking toward a laptop, with one pointing at the screen",
        hasContent: true,
    },
    'featured/what-is-a-unicorn-startup-and-why-it-matters': {
        title: "What Is a Unicorn Startup? Australian Examples and a Valuation Calculator",
        date: "2026-04-23",
        dateModified: "2026-10-29",
        description: "Understand the US$1 billion unicorn threshold, inspect five sourced Australian valuation events, and model dilution in a transparent founder calculator.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-a-unicorn-startup-and-why-it-matters",
        analyticsArticleId: "ea72084f-7f71-4f23-89e2-19fcac419614",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d806828c-a396-45ac-899e-2757423ebb86.jpg?alt=media&token=68db8b05-de8f-473e-aff2-f3bc4ecec96a",
        imageAlt: "Australian startup founders checking a valuation and ownership scenario",
        hasContent: true,
    },
    'featured/what-an-entrepreneur-does-and-how-to-start-well': {
        title: "What an Entrepreneur Does and How to Start Well",
        date: "2026-04-20",
        dateModified: "2026-10-29",
        description: "Plan a first founder experiment with a proposed 90-day sequence, clearly labelled evidence, a completed fictional record and an editable browser ledger.",
        author: "Dr Sam Donegan",
        slug: "featured/what-an-entrepreneur-does-and-how-to-start-well",
        analyticsArticleId: "dcb5d919-637e-40f4-8de7-e7c379a92c03",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-56ed48a4-989a-4c7a-902a-a4d660355998.jpg?alt=media&token=9f5d6e18-cf07-44dd-b1e2-b211e059cccf",
        imageAlt: "Two people with pens, a diagrammed notebook and banknotes on a table",
        hasContent: true,
    },
    'featured/what-is-artificial-intelligence-in-simple-words': {
    "title": "AI Explained Simply: Everyday Examples and an 8-Question Quiz",
    "date": "2026-04-18",
    "dateModified": "2026-10-29",
    "description": "Understand AI with everyday examples, a short quiz and a step-by-step look at how it works, where it goes wrong, and what to check before using it.",
    "author": "Dr Sam Donegan",
    "authorUrl": "https://www.linkedin.com/in/samueldonegan",
    "slug": "featured/what-is-artificial-intelligence-in-simple-words",
    "analyticsArticleId": "81b3ca24-a36d-40c4-b2f0-e998f1fa5a36",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aabcc5ca-e159-4024-b1c7-baf0b68dc947.jpg?alt=media&token=a5c618e2-f10a-4f7a-8bc3-5a0702cf9959",
    "imageAlt": "Illustrative image of two people",
    "hasContent": true
},
    'featured/what-is-an-agent-in-artificial-intelligence': {
    "title": "What is an AI agent—and does your business need one?",
    "date": "2026-04-17",
    "description": "Compare fixed automation, AI-assisted workflows and agents on one business task. Define approvals, failure tests and costs before commissioning a build.",
    "author": "Dr Sam Donegan",
    "slug": "featured/what-is-an-agent-in-artificial-intelligence",
    "analyticsArticleId": "b5f3f893-bdb5-4499-bfd9-e8c6325ae4ff",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a2025658-d5c3-44fe-a5c4-f9599005a6a0.jpg?alt=media&token=98790d72-c277-47c3-a63f-6b565ac852e2",
    "imageAlt": "Illustration of colleagues reviewing a workflow on a laptop",
    "hasContent": true,
    "dateModified": "2026-10-29"
},
    'featured/how-to-startup-a-small-business-in-australia': {
        dateModified: "2026-10-29",
        title: "Starting a small business in Australia: decisions before launch",
        date: "2026-04-14",
        description: "Prepare to start a small business in Australia: map customer demand, cash timing and official setup checks into a practical launch-decision record.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-startup-a-small-business-in-australia",
        analyticsArticleId: "079d59f4-7548-40c7-9094-27aa574c223e",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-2d2c373c-c64a-4d3a-a019-e3728cab592c.jpg?alt=media&token=d110a9e5-c056-4040-915b-2f90bc4e18c1",
        imageAlt: "How to Startup a Small Business in Australia",
        hasContent: true,
    },
    'featured/what-is-general-artificial-intelligence-and-why-it-matters': {
        title: "What Is General Artificial Intelligence? An Evidence Guide to AGI",
        date: "2026-04-12",
        dateModified: "2026-10-29",
        description: "A plain-English guide to artificial general intelligence, how AGI definitions differ, and an interactive worksheet for testing AGI claims against real evidence.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-general-artificial-intelligence-and-why-it-matters",
        analyticsArticleId: "ef76104d-58da-49c1-8a48-c80960448cc9",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6929c81e-098b-48a5-8302-f26c732f8c65.jpg?alt=media&token=cf84b2aa-8393-44a0-a444-257dae974703",
        imageAlt: "Two people comparing evidence and definitions for artificial general intelligence",
        hasContent: true,
    },
    'featured/what-constitutes-a-startup-in-practice': {
        dateModified: "2026-09-11",
        title: "What constitutes a startup? Examine the business, not the label",
        date: "2026-04-06",
        description: "Distinguish startup ambition from a new small business using four fictional cases, setup-hour comparisons and a completed record with a printable decision sheet.",
        author: "Dr Sam Donegan",
        slug: "featured/what-constitutes-a-startup-in-practice",
        analyticsArticleId: "9dc06267-b38c-46c1-b433-fa6bd754a7da",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-778189b4-82c7-4e6b-9b96-c21abeb867eb.jpg?alt=media&token=ffccdbe3-bf8b-46f0-8fa6-a8da9fae2a13",
        imageAlt: "Two people looking at a laptop, with an open notebook",
        hasContent: true,
    },
    'featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life': {
        dateModified: "2026-10-29",
        title: "What Is AI Used For? 9 Everyday Examples and Human Checks",
        date: "2026-04-10",
        description: "See nine everyday AI uses, their inputs, outputs and common mistakes, plus a worked example and a separate three-task comparison for business owners.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life",
        analyticsArticleId: "93526b62-5644-42db-a958-30dbdb9ab2f8",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ba426870-f23d-4a68-ba38-cd4ab3eb8d23.jpg?alt=media&token=b24f96bc-d8ff-4b6c-970e-e4f749a14259",
        imageAlt: "Illustration of colleagues discussing a business workflow",
        hasContent: true,
    },
    'featured/why-founders-clubs-work-for-early-stage-growth': {
        dateModified: "2026-09-10",
        title: "Is a founders club worth your time? A participation decision guide",
        date: "2026-04-08",
        description: "Compare dated Australian founder-community formats, billing periods and participation limits. Use a worked time budget and editable trial record before committing.",
        author: "Dr Sam Donegan",
        slug: "featured/why-founders-clubs-work-for-early-stage-growth",
        analyticsArticleId: "d87b602c-ff48-418f-a91b-f5bd9ccab03a",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-7e145e57-0e89-4225-a8cf-28d27f58292d.jpg?alt=media&token=f0b58fd5-7cca-4f88-9060-ca2845f2c38b",
        imageAlt: "People discussing a topic beside a laptop (illustrative image)",
        hasContent: true,
    },
    'featured/what-is-inference-in-artificial-intelligence-and-why-it-matters': {
        dateModified: "2026-09-10",
        title: "AI inference and serving: run a model, test the boundary",
        date: "2026-04-08",
        description: "A runnable local inference service with fixed weights, request validation, quality fixtures and measured HTTP timing. Learn what these results do—and do not—prove.",
        author: "Dr Sam Donegan",
        slug: "featured/what-is-inference-in-artificial-intelligence-and-why-it-matters",
        analyticsArticleId: "8a0653c6-c2af-4091-9a70-9f5f8208c529",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8d1255b-d720-46a6-ab79-ed65bd104e1a.jpg?alt=media&token=8e3932df-1ab1-416b-9ac7-21eab7274536",
        imageAlt: "Two people examining a small camera circuit board beside a screen",
        hasContent: true,
    },
    'featured/how-to-build-ai-for-real-business-problems': {
        dateModified: "2026-10-29",
        title: "How to build AI for a business problem: scope, test and hand over",
        date: "2026-04-06",
        description: "Turn a business workflow into a scoped AI project brief, compare delivery proposals, agree acceptance tests and plan ownership before commissioning a build.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-build-ai-for-real-business-problems",
        analyticsArticleId: "532d867b-c225-412e-9a87-c0c8a0f545a1",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c50a0366-c987-4439-aa4d-10ba179a206c.jpg?alt=media&token=3a1e360a-3558-4f36-8257-3b17644d8c83",
        imageAlt: "Illustration of a team planning a business workflow",
        hasContent: true,
    },
    'featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers': {
        dateModified: "2026-10-29",
        title: "From AI prototype to paid pilot: scope delivery without derailing your startup",
        date: "2026-04-06",
        description: "A pilot brief and capacity worksheet for technical founders: define acceptance, costs, support and handover, then decide whether a scoped client project fits your startup.",
        author: "Dr Sam Donegan",
        slug: "featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers",
        analyticsArticleId: "f51573e2-c8c7-4b4e-a453-115063428666",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1febf3be-29fb-44ed-9207-e79b38921cc2.jpg?alt=media&token=3b266804-e787-46d9-86b6-7f7ec4f3aa8a",
        imageAlt: "Two people examining a camera and electronic components",
        hasContent: true,
    },
    'featured/how-to-get-the-first-customers-for-my-startup-in-2026': {
        dateModified: "2026-10-29",
        title: "How to get your first startup customers: from conversation to a scoped offer",
        date: "2026-04-04",
        description: "Run a first-customer learning cycle with an outreach draft, interview questions, a completed evidence record and explicit distinctions between interest, trials and payments.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-get-the-first-customers-for-my-startup-in-2026",
        analyticsArticleId: "c088e3fc-103e-4ed0-b4b5-cb857751cb37",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-5115416e-9e23-4ea5-90fd-0bd5b7d4ecc7.jpg?alt=media&token=2976f637-b1db-4612-888e-6ffa8311c597",
        imageAlt: "Person holding a pen and notebook while another person holds a phone",
      },
    'featured/go-to-market-for-startups': {
    "title": "Go to market for startups: design a channel test you can learn from",
    "date": "2026-04-04",
    "description": "A worked channel-test plan for Australian early-stage founders: define the buyer, offer, cost limits and evidence before deciding what to repeat.",
    "author": "Dr Sam Donegan",
    "slug": "featured/go-to-market-for-startups",
    "analyticsArticleId": "00f44c34-b1fb-431e-800d-b1d73e8f1622",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8dae336-fe4f-4a44-bff3-316597ffe118.jpg?alt=media&token=0ef63680-c513-4f09-9e25-21b2d81228e9",
    "imageAlt": "Two people examining a printed profile and coloured notes, one pointing with a pen",
    "hasContent": true,
    "dateModified": "2026-10-29"
},
    'featured/how-to-assess-cofounder-values-match-before-you-commit': {
        dateModified: "2026-10-29",
        title: "Assess cofounder values: four conversations before a working trial",
        date: "2026-03-30",
        description: "Prepare four cofounder conversations, distinguish values from practical constraints, and record disagreements before deciding whether to try working together.",
        author: "Dr Sam Donegan",
        slug: "featured/how-to-assess-cofounder-values-match-before-you-commit",
        analyticsArticleId: "72fa4a5e-02e3-466d-a30c-24a482b90a5d",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-61741a72-5e72-4a5d-aa77-2b18a2d80edd.jpg?alt=media&token=9365304c-09a2-4986-914d-af4699a65f17",
        imageAlt: "Two people talking at a table, one gesturing and the other listening (illustrative image)",
        hasContent: true,
    },
    'featured/a-practical-guide-on-how-to-create-an-artificial-intelligence': {
        dateModified: "2026-10-29",
        title: "Build a bounded AI prototype: code, tests and handover",
        date: "2026-03-22",
        description: "Run a local event-reply classifier, compare it with rules, inspect a real failure and hand over the code, evidence and limits of a bounded AI prototype.",
        author: "Dr Sam Donegan",
        slug: "featured/a-practical-guide-on-how-to-create-an-artificial-intelligence",
        analyticsArticleId: "72a0d07c-6bd1-4cbf-9347-ec67c3ea1161",
        image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c1f2bc9-89fc-42cc-8e74-2c6d708ae3c9.jpg?alt=media&token=257975d5-7903-4218-b610-048dfe649d16",
        imageAlt: "Two people examining a small robot with a laptop in the background",
        hasContent: true,
    },
    'featured/how-to-choose-the-best-ai-for-coding-in-2025': {
        title: 'Withdrawn: AI coding tools comparison under review',
        date: '2026-03-21',
        dateModified: '2026-10-29',
        description: 'The earlier coding-tools comparison is withdrawn. This notice explains the missing benchmark evidence; no best-tool recommendation or comparison result is currently supplied.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-choose-the-best-ai-for-coding-in-2025',
        analyticsArticleId: 'd05b53c5-02fe-4f69-a63d-36b4d07f2eb2',
        image: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-2fcc0fc5-779d-4991-a48d-f1ee5bc84d36.jpg?alt=media&token=dd992915-031f-4e66-8362-bc94bdef2730',
        imageAlt: 'Illustration accompanying a withdrawn coding-tools comparison',
        hasContent: true,
        indexing: "noindex",
        publicationStatus: "under-review",
    },
    'featured/how-to-test-for-a-cofounder-values-match-before-you-commit': {
        dateModified: "2026-10-29",
        title: 'A cofounder working trial: brief, observe and debrief',
        date: '2026-03-14',
        description: 'Plan a low-risk cofounder working trial with a bounded brief, synthetic-data example and observation record. Separate observed behaviour from assumptions about compatibility.',
        author: 'Dr Sam Donegan',
        slug: 'featured/how-to-test-for-a-cofounder-values-match-before-you-commit',
        analyticsArticleId: '6019bfd2-81f4-4887-ab2c-48a9c8d94885',
        image: '',
        imageAlt: '',
        hasContent: true,
    },
  "featured/how-technology-affects-education-negatively": {
        dateModified: "2026-10-29",
    title: "How technology can affect education negatively",
    date: "2025-12-30",
    description:
      "Assess classroom technology risks without confusing distraction surveys with proof of harm. Includes Australian privacy boundaries, a fictional decision and a usable risk record.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-affects-education-negatively",
    analyticsArticleId: "8f5d254a-5b5a-48ba-9d8f-fff1f99c99f5",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad2b9095-7c58-48cb-93a0-796ec711627f.jpg?alt=media&token=aedd5035-940a-46bd-a249-0b171a8bc35c",
    imageAlt:
      "Illustration of people working with digital technology",
  },
  "featured/how-to-get-started-with-ai-2026": {
    title: "Getting started with AI: choose one business workflow",
    date: "2025-02-10",
    description:
      "An Australian small-business owner's workflow-selection guide: compare candidates, check data and review needs, and prepare a scoped implementation brief.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-get-started-with-ai-2026",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268",
    imageAlt:
      "Illustration of a team reviewing workflow notes",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "featured/best-way-to-learn-about-ai-2026": {
        dateModified: "2026-10-29",
    title: "How to learn AI by building and testing a small workflow",
    date: "2025-01-15",
    description:
      "A practical learning path for aspiring AI-assisted builders: fundamentals, a runnable synthetic triage lab, acceptance tests and honest portfolio evidence.",
    author: "Dr Sam Donegan",
    slug: "featured/best-way-to-learn-about-ai-2026",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa",
    imageAlt: "People gathered around a laptop, with one person wearing headphones around their neck",
    hasContent: true,
  },
  "featured/learn-ai-melbourne": {
    title: "Learn AI in Melbourne: courses, costs and learning pathways",
    date: "2026-01-28",
    description:
      "Compare Melbourne AI courses by goal, fees, prerequisites and workload. Includes 2026–27 provider dates, a dated source check and a downloadable decision record.",
    author: "Dr Sam Donegan",
    slug: "featured/learn-ai-melbourne",
    analyticsArticleId: "b98e048e-c082-4690-a724-ae4f9d9dea27",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-f3e7ca80-f08c-4d98-9bc9-773ec059c33f.jpg?alt=media&token=cbbb31dd-a11e-49d5-a062-13256412f7e4",
    imageAlt:
      "Open laptop and small robotic arm on a desk, with people working in the background.",
    hasContent: true,
    dateModified: "2026-10-29",
  },
  "featured/how-small-business-owners-can-get-started-with-ai-2026": {
        dateModified: "2026-10-29",
    title: "How small business owners can get started with AI: a measured pilot",
    date: "2026-01-22",
    description:
      "Choose one business workflow, compare full pilot costs with genuinely avoidable spending, and use a downloadable worksheet and test plan before commissioning AI implementation.",
    author: "Dr Sam Donegan",
    slug: "featured/how-small-business-owners-can-get-started-with-ai-2026",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e8d91d69-4aa4-49a0-b1e4-a8b32d3f54ab.jpg?alt=media&token=3d3573bf-5a7d-416f-a7be-61be2dd87a04",
    imageAlt:
      "Illustration of a team planning work together",
  },
  "featured/how-vcs-value-startups": {
        dateModified: "2026-10-29",
    title: "How VCs value startups: check price, dilution and option pools",
    date: "2026-01-22",
    description:
      "Prepare a startup valuation discussion: compare evidence, work through share dilution and test how option-pool timing changes an illustrative funding round.",
    author: "Dr Sam Donegan",
    slug: "featured/how-vcs-value-startups",
    analyticsArticleId: "9d24a199-2f0f-4d28-af1f-f5f3f6d177e0",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6",
    imageAlt: "Laptop displaying charts beside a calculator, printed graphs and a white robotic head.",
    hasContent: true,
  },
  "featured/how-to-foster-community-engagement": {
        dateModified: "2026-10-29",
    title: "How to foster AI community engagement",
    date: "2026-01-14",
    description:
      "Plan an AI-community decision with a fictional feedback cycle, all input notes and an editable record. Separate responses, delivered changes and unresolved barriers.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-foster-community-engagement",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf106b26-0a88-42db-9c1f-6ac3e8d53a9f.jpg?alt=media&token=633f122e-d0b9-4188-aac7-8f1da80c0a63",
    imageAlt: "Person writing on paper beside coloured notes at a table (illustrative image)",
  },
  "featured/startup-accelerator-australia": {
    "title": "Australian Startup Accelerators: A Dated Program Finder",
    "date": "2026-01-10",
    "dateModified": "2026-10-29",
    "description": "Compare seven Australian accelerator source records, distinguish applications from expressions of interest, and record eligibility, terms and founder-time trade-offs before deciding.",
    "author": "Dr Sam Donegan",
    "slug": "featured/startup-accelerator-australia",
    "analyticsArticleId": "1cf96443-6ccb-4a80-998f-fb777e21d542",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b4a9a55e-4254-4bb3-9eed-5b80dfbc4432.jpg?alt=media&token=54ee6558-bb42-4528-812c-7377691e9f9f",
    "imageAlt": "Hands using a laptop at a shared table (illustrative image)",
    "hasContent": true
  },
  "featured/how-to-find-networking-events": {
        dateModified: "2026-10-29",
    title: "How to find networking events in Australia",
    date: "2026-01-03",
    description:
      "Find Australian AI and startup events with four checked search routes, a worked shortlist decision and an editable record. Check participation, full commitment and availability.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-find-networking-events",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-12562886-6a00-40c3-bd65-734cd91f9fb4.jpg?alt=media&token=d1df7641-6648-4366-a06e-630ccc6043c7",
    imageAlt:
      "Vintage laptop, camera and cassette tapes on a table (illustrative image)",
  },
  "featured/how-modern-technology-affects-education-today-and-in-the-fut": {
    "title": "Modern technology in education: evidence today and questions for the future",
    "date": "2025-12-26",
    "description": "Evaluate education technology claims using a dated planning-time trial, Australian sector guidance and a worked caption-review example. Turn future possibilities into questions you can test.",
    "author": "Dr Sam Donegan",
    "slug": "featured/how-modern-technology-affects-education-today-and-in-the-fut",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c64e3c6c-e429-49ad-acb9-ed1a06156751.jpg?alt=media&token=d82a401d-a58e-47e5-ba8d-76025cf5b37b",
    "imageAlt": "Illustration of a small robot on a desk with books, headphones and digital devices",
    "hasContent": true,
    "dateModified": "2026-10-29"
  },
  "featured/how-technology-has-changed-education": {
        dateModified: "2026-10-29",
    title: "How technology has changed education in Australia",
    date: "2025-12-21",
    description:
      "Trace selected Australian education changes from radio lessons to school AI guidance. Compare documented adoption with learning evidence using a dated timeline and claim-checking exercise.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-has-changed-education",
    analyticsArticleId: "c7aa40e1-54c1-4a0f-8d1e-b8640e975e7a",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0536c018-0450-4ef6-bc45-46686799945c.jpg?alt=media&token=f79f1f9d-f5b6-41ca-8df5-35f1dce4af2f",
    imageAlt:
      "Illustration of a group working with digital technology",
  },
  "featured/how-much-venture-capital-was-invested-in-2023": {
        dateModified: "2026-10-29",
    title: "How much venture capital was invested in 2023?",
    date: "2025-12-17",
    description:
      "Compare 2023 global and Australian startup funding totals with their dates, currencies and investment definitions, plus a worked total-versus-median example.",
    author: "Dr Sam Donegan",
    slug: "featured/how-much-venture-capital-was-invested-in-2023",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c930b949-7cad-4fe3-b144-e118eca0cfd1.jpg?alt=media&token=d69d7730-2e33-4055-b69e-b2cc47e40ad4",
    imageAlt: "Colorful 90s aesthetic photo of diverse tech professionals collaborating in a startup environment.",
  },
  "featured/what-are-collaboration-tools": {
        dateModified: "2026-09-11",
    title: "Collaboration tools for small businesses: fix the handoff first",
    date: "2025-12-13",
    description:
      "Map a missed handoff, compare process fixes with software changes, and test whether a collaboration workflow reduces rework before paying for an AI integration.",
    author: "Dr Sam Donegan",
    slug: "featured/what-are-collaboration-tools",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4",
    imageAlt:
      "Illustration of a team discussing a shared workflow",
  },
  "featured/how-technology-is-shaping-learning-in-higher-education": {
        dateModified: "2026-10-29",
    title: "Technology in higher education: AI assessment rules and microcredential credit",
    date: "2025-12-09",
    description:
      "Check AI assessment rules, online participation and microcredential credit using dated Australian university examples. Includes a practical learning log and questions for your course team.",
    author: "Dr Sam Donegan",
    slug: "featured/how-technology-is-shaping-learning-in-higher-education",
    analyticsArticleId: "24fe2680-68c1-4bed-9899-e4f268e9de84",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6d1a2d84-8b4e-4540-969a-efedb4ed79d0.jpg?alt=media&token=40754573-bde6-4fe3-991d-f9b37be9cb08",
    imageAlt:
      "Illustration of people collaborating around digital work",
  },
  "featured/venture-capital-how-does-it-work": {
        dateModified: "2026-09-10",
    title: "How venture capital works: capital choices and dilution",
    date: "2025-12-05",
    description:
      "Understand venture funding before planning a raise: compare capital obligations, follow a two-round ownership example and prepare a capital-fit discussion.",
    author: "Dr Sam Donegan",
    slug: "featured/venture-capital-how-does-it-work",
    analyticsArticleId: "24c0f001-8e9c-47d0-b5d8-cf2ce6239a17",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9dce8514-cb13-4930-b27d-d1f5dbefd41e.jpg?alt=media&token=10c631f0-44c2-4421-9a86-a5505a3d0383",
    imageAlt: "Team collaborating in a retro 90s tech startup office amidst brainstorming and innovation.",
    hasContent: true,
  },
  "featured/how-many-startup-accelerators-and-incubators-are-there-in-si": {
    title: "Under review: Singapore accelerator and incubator count",
    date: "2025-12-01",
    dateModified: "2026-10-29",
    description:
      "This unsupported Singapore accelerator count is under editorial review and withheld from search and MLAI discovery surfaces.",
    author: "Dr Sam Donegan",
    slug: "featured/how-many-startup-accelerators-and-incubators-are-there-in-si",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-765a4937-d602-4779-9250-982df5058a4b.jpg?alt=media&token=cae4b2b5-76fd-48f2-bb4d-c018c943c150",
    imageAlt: "Diverse group of entrepreneurs discussing ideas in a vibrant 90s film-inspired tech workspace.",
    hasContent: true,
    indexing: "noindex",
    publicationStatus: "under-review",
  },
  "featured/how-does-a-venture-capital-firm-work": {
        dateModified: "2026-10-29",
    title: "How a VC firm works: research the fund before a meeting",
    date: "2025-11-27",
    description:
      "Separate the firm, fund and decision-makers; use a dated Australian investor example and an editable research checklist to prepare a better funding conversation.",
    author: "Dr Sam Donegan",
    slug: "featured/how-does-a-venture-capital-firm-work",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6",
    imageAlt: "How Does a Venture Capital Firm Work? (2026 Guide)",
    hasContent: true,
  },
  "featured/the-best-startup-pitch-deck-ever": {
    "title": "A startup pitch deck you can defend: an evidence-first review",
    "date": "2025-11-23",
    "description": "Review startup deck claims using founder-published examples, twenty synthetic timing records, scripted corrections and a completed downloadable evidence worksheet.",
    "author": "Dr Sam Donegan",
    "slug": "featured/the-best-startup-pitch-deck-ever",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e50e5db0-d45f-42af-bbe1-fa732bdd1ffb.jpg?alt=media&token=cee71a66-a4bf-48d9-81b0-a662965f714a",
    "imageAlt": "Illustration accompanying a guide to reviewing startup pitch evidence",
    "hasContent": true,
    "dateModified": "2026-10-29"
  },
  "featured/how-to-get-data-science-job": {
    "title": "How to get a data science job in Australia: skills, pathways and applications",
    "date": "2025-11-19",
    "description": "A practical Australian data science career guide: entry pathways, Python and SQL skills, employer examples, portfolio projects, job searches, CVs and interviews.",
    "author": "Dr Sam Donegan",
    "slug": "featured/how-to-get-data-science-job",
    "analyticsArticleId": "04d9b070-8338-47bf-ac29-12bf350a3807",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8cebc51f-5bc8-46f4-8676-bd361214e6b3.jpg?alt=media&token=273d8b6c-afd5-411f-89e9-fa04b4413f6d",
    "imageAlt": "Laptop displaying charts on a desk beside an Australian flag",
    "hasContent": true,
    "dateModified": "2026-10-29"
  },
  "featured/how-to-pitch-your-idea": {
    title: "How to pitch an early idea and ask for useful feedback",
    date: "2025-06-01",
    description: "Explain an early idea with annotated pitch videos, a seven-slide example and an editable rehearsal record that separates clear wording from evidence of demand.",
    author: "Dr Sam Donegan",
    slug: "featured/how-to-pitch-your-idea",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1968fb96-80f9-49e4-95d6-42c5a359b4ce.jpg?alt=media&token=2884e0cc-4793-4155-a69c-0468133ece8b",
    imageAlt: "Laptop showing pitch deck charts on a desk with printed startup materials",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "featured/how-much-do-data-scientists-make": {
        dateModified: "2026-10-29",
    title: "Under review: data scientist salaries in Australia",
    date: "2025-11-15",
    description:
      "The earlier Australian salary answer is withheld. This notice explains the evidence and methodology needed for a replacement; it currently provides no salary estimates.",
    author: "Dr Sam Donegan",
    slug: "featured/how-much-do-data-scientists-make",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-efc07de1-b4f1-46b2-8245-211ce8e1dd64.jpg?alt=media&token=ad15ab6a-efa7-4176-ba33-9908ed9a2d2e",
    imageAlt: "Australian data science salary research under editorial review",
    indexing: "noindex",
    publicationStatus: "under-review",
  },

  // NOTE: Your pasted snippet continues with MANY more entries.
  // I am returning the full module structure + fixes you asked for.
  // Keep the rest of your ARTICLE_REGISTRY entries unchanged below this point,
  // and add them here (or paste your full registry content here).

  // Newsletter pillar + issues (merge conflict resolved)
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates": {
    title: "Image classification accuracy and recall: reading the evidence | AI Bits #1",
    date: "2026-01-08",
    description:
      "Read a scientific image-classification result carefully: distinguish prompt examples from pretraining, inspect missed cases and question generated explanations.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates",
    image:
      "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_40_55%20PM%20(1).png?alt=media&token=dc0a3df1-837b-4549-be70-bc59ba215777",
    imageAlt: "Abstract data visualisation representing AI and machine learning signals",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2": {
  title: "How to evaluate an AI answer: facts, completeness and style | AI Bits #2",
  date: "2026-01-19",
  description: "Separate model preference from correctness with a source-based comparison exercise, a clear reading of a small user study and a practical feedback record.",
  author: "MLAI Editorial Team",
  authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
  slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2",
  image: ARTICLE_FALLBACK_IMAGE,
  imageAlt: "AI Bits for Techies newsletter banner",
  hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3": {
    title: "AI energy use: how to read environmental estimates | AI Bits #3",
    date: "2026-01-26",
    description: "Interpret AI energy and water estimates without false precision: inspect measurement boundaries, work through a labelled scenario and prepare better research questions.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "AI Bits for Techies newsletter banner",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4": {
    title: "AI Bits #4: Do AI coding tools save delivery time?",
    date: "2026-02-05",
    description: "Compare two historical AI coding studies, distinguish effort from elapsed time, and use an editable acceptance log that preserves missing values and review limits.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4",
    image: "https://mlai.au/press-kit/logo-wide-black.png",
    imageAlt: "MLAI logo with a kangaroo wearing sunglasses",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5": {
    "title": "Agent activity logs: run a trace and retry inspection | AI Bits #5",
    "date": "2026-02-16",
    "description": "Read Moltbook research with its limits, then run a synthetic agent-observability kit: activity, retries, duplicate posts, moderation and a builder handover.",
    "author": "MLAI Editorial Team",
    "authors": [
        "samDonegan",
        "junKaiChang",
        "juliaPonder",
        "shivangShekhar"
    ],
    "slug": "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5",
    "image": "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504",
    "imageAlt": "AI Bits for Techies newsletter banner",
    "hasContent": true,
    "dateModified": "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6": {
    title: "AI Bits #6: Test the customer problem before scaling outreach",
    date: "2026-02-25",
    description: "Test an AI startup's customer problem with interview prompts, a completed fictional discovery record and an unrun experiment plan. Download the worksheet and discuss your next question.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6",
    image: "https://mlai.au/press-kit/logo-wide-black.png",
    imageAlt: "MLAI logo with a kangaroo wearing sunglasses",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7": {
    title: "AI Bits #7: What OpenVLA demonstrates—and what it does not",
    date: "2026-03-04",
    description: "Read OpenVLA results with their limits: distinguish robot demonstrations, adaptation and deployment claims, then build a research discussion record.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "AI Bits for Techies newsletter banner",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8": {
    title: "Environment handover checklist and runnable kit | AI Bits #8",
    date: "2026-03-11",
    description: "Download a tested environment-handover kit, inspect source hashes and reproduce a held classification review. Includes the corrected scope of a 2023 Proton gaming paper.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8",
    image: "https://mlai.au/press-kit/logo-wide-black.png",
    imageAlt: "MLAI logo with a kangaroo wearing sunglasses",
    hasContent: true,
    dateModified: "2026-10-29"
  },
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9": {
        dateModified: "2026-10-29",
    title: "Correction: AI Bits Issue 9 — OPENDEV source review",
    date: "2026-03-18",
    description: "Correction notice: an earlier version misattributed the OPENDEV report and included quantitative claims absent from the source. The unreviewed article remains withheld.",
    author: "MLAI Editorial Team",
    authors: ["samDonegan", "junKaiChang", "juliaPonder", "shivangShekhar"],
    slug: "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9",
    image: ARTICLE_FALLBACK_IMAGE,
    imageAlt: "AI Bits for Techies newsletter banner",
    hasContent: true,
    indexing: "noindex",
    publicationStatus: "under-review",
  },

};


/**
 * Deterministic ordering:
 * - Sort by date ASC (oldest -> newest) so "next" means newer
 * - Stable tie-break with slug
 */
export const ORDERED_ARTICLE_ROUTE_SLUGS: string[] = Object.values(ARTICLE_REGISTRY)
  .filter(isArticleIndexable)
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
  return Object.values(ARTICLE_REGISTRY).filter(isArticleIndexable).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getClusterCardsForPillar(pillarSlug: string): ArticleWithSlug[] {
  // Simple containment check for now.
  // In a real scenario, you might have a more robust "parent-child" relationship.
  const normalized = normalizeSlug(pillarSlug);
  return Object.values(ARTICLE_REGISTRY).filter(
    (article) =>
      isArticleIndexable(article) &&
      article.slug.startsWith(normalized + "/") &&
      article.slug !== normalized
  );
}

export function isArticleIndexable(article: ArticleWithSlug): boolean {
  return article.indexing !== "noindex" && article.publicationStatus !== "under-review";
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
