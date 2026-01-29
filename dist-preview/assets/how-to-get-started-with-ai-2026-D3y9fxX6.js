import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, Q as QuoteBlock, a as ArticleTocPlaceholder, b as ArticleImageBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
import "./worker-entry-BTvr0DWh.js";
import "node:events";
import "node:stream";
import "util";
import "stream";
import "path";
import "node:net";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const TOPIC = "How to get started with AI in Australia";
const AUTHOR = "Dr Sam Donegan";
const AUTHOR_ROLE = "Medical Doctor, AI Startup Founder & Lead Editor";
const AUTHOR_BIO = "Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.";
const AUTHOR_AVATAR = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268";
const HERO_IMAGE_ALT = "Team collaborating on AI data charts with laptops and whiteboard";
const faqItems = [
  { id: 1, question: "What skills do Australians need to start with AI in 2026?", answer: "Start with data literacy, prompt design, and basic Python or no-code automation. Layer in responsible AI awareness (privacy, bias, copyright) and model evaluation basics." },
  { id: 2, question: "How do I test AI tools without breaching privacy rules?", answer: "Use synthetic or de-identified data, turn off model training where offered, and review each tool’s data residency statement. For government or health data, stick to vendors offering Australian or APAC data centres and signed data processing agreements." },
  { id: 3, question: "Is fine-tuning required for most use cases?", answer: "No. For many internal tasks—drafts, summaries, and routing—prompting plus small retrieval sets (RAG) is faster and cheaper than fine-tuning. Fine-tune only when you need domain-specific tone or consistent structured outputs." },
  { id: 4, question: "What is a safe first AI project for a small team?", answer: "Pilot a low-risk workflow such as meeting note drafts or FAQ response drafts, or data cleanup suggestions. Keep a human-in-the-loop and measure time saved vs. error rate before expanding." },
  {
    id: 5,
    question: "Which Australian standards or guidance should I reference?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start with the Australian AI Ethics Principles, the OAIC privacy guidance, and your state-based records management rules. For sector specifics (e.g., health, education), check local regulator advisories and vendor DPA templates." })
  },
  { id: 6, question: "How do I budget for AI in 2026?", answer: "Plan for three buckets: (1) experimentation credits for API calls and pilots, (2) data preparation and evaluation, and (3) governance (policies, training, and vendor reviews). Track cost per successful task, not just cost per token." }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC} `,
  intro: "Fast-start guidance for Australian teams in 2026: skills to prioritise, privacy-safe pilots, and how to measure value before scaling.",
  items: [
    {
      label: "How do I start learning AI skills in 2026?",
      description: "Begin with data literacy, prompt design, and basic Python or no-code automation; add responsible AI basics and model evaluation."
    },
    {
      label: "What is a safe first AI project for small teams?",
      description: "Pilot low-risk workflows like meeting note drafts or FAQ replies with human review, clear metrics, and capped spend."
    },
    {
      label: "Do I need fine-tuning to use AI at work?",
      description: "Often no—prompting plus retrieval over your documents is faster and cheaper; fine-tune only for tone or structured output consistency."
    }
  ]
};
const useCustomHeader = true;
function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  };
  const breadcrumbs = [
    { label: "Home", href: "/articles", icon: House },
    { label: TOPIC, current: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs,
        title: TOPIC,
        headerBgColor: "cyan",
        summary: {
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items
        },
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      QuoteBlock,
      {
        variant: "purple",
        title: "Quick note",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
        className: "my-6",
        children: [
          "This guide is part of our broader series on ",
          TOPIC,
          ". Prefer to jump ahead?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/articles", className: "font-semibold text-white underline-offset-4 hover:underline", children: "Browse related articles →" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, { className: "mb-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AudienceGrid,
      {
        heading: "Read this if you are:",
        cards: [
          {
            title: "Founders & Teams",
            description: "For leaders validating ideas, seeking funding, or managing teams.",
            variant: "orange",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "w-5 h-5 text-white", strokeWidth: 1.8 })
          },
          {
            title: "Students & Switchers",
            description: "For those building portfolios, learning new skills, or changing careers.",
            variant: "purple",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "w-5 h-5 text-white", strokeWidth: 1.8 })
          },
          {
            title: "Community Builders",
            description: "For workshop facilitators, mentors, and ecosystem supporters.",
            variant: "yellow",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "w-5 h-5 text-black", strokeWidth: 1.8 })
          }
        ],
        className: "my-10"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
        " helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025–2026 landscape, drawing on local privacy expectations and emerging AI safety guidance."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "What is ",
        TOPIC,
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Getting started with AI means pairing modern language and vision models with your workflows in a way that is safe, measurable, and reversible. In Australia, that includes respecting the Privacy Act (and proposed updates), the Australian AI Ethics Principles, and any sector-specific data handling rules. Practically, you will combine prompting, lightweight retrieval (RAG), and off-the-shelf APIs before committing to deeper integration or fine-tuning." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The goal is not to build a research lab on day one. Instead, start with low-risk, high-volume tasks where a human reviewer can quickly correct outputs: meeting notes, summarising long documents, drafting customer replies, and cleaning data. Each pilot should have a clear success metric, a cost ceiling, and an exit plan if the tool or vendor fails your governance checks." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Why it matters in 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleImageBlock,
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9e2a2cc2-a4e5-40fb-952c-863d2c2455eb.jpg?alt=media&token=01dfdfd7-da95-4140-82e1-4e7e9a69bdcc",
          alt: "People in a 90s-inspired tech startup setting brainstorm and collaborate over laptops and coffee."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Model quality and cost curves are improving quarterly, and Australian organisations are being asked to prove responsible AI practices. Teams that learn safe prompting, evaluation, and data discipline now will move faster than those waiting for “perfect” regulation. Early pilots also uncover process debt—unclear inputs, missing labels, brittle handoffs—that must be fixed before automation or assistance can deliver value." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ignoring AI in 2026 means higher operational costs and slower response times, especially in customer support, policy analysis, and research-heavy roles. Conversely, responsible adoption improves employee experience (less rote work), increases service consistency, and creates new ways to test products with smaller budgets." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuoteBlock,
        {
          variant: "purple",
          title: "Pro Tip",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
          className: "my-8",
          children: "Start with a 2-week sprint: pick one workflow, define a baseline time/cost, run an AI-assisted version with human review, and compare outcomes before scaling."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Step-by-Step Guide" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleImageBlock,
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1bd24b7a-1be6-4c0e-b079-e63768f9cf34.jpg?alt=media&token=996d3c47-8bbb-4990-86f0-3ef4c119d335",
          alt: "Group of diverse professionals collaborating in a tech startup, captured with a nostalgic 90s film aesthetic."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 1: Preparation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Map one or two candidate workflows. Good candidates are repetitive, text-heavy, and already have clear acceptance criteria. Gather a small, de-identified sample set (10–30 items) and write what “good” looks like in plain language. Draft a lightweight AI use policy covering data residency, human review, and incident reporting. Confirm whether any data touches sensitive categories (health, financial, student, or customer identifiers) and decide on guardrails, such as redaction or synthetic data." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tooling checklist: a reliable model endpoint (e.g., OpenAI, Anthropic, or an Australian-hosted option), a prompt notebook (Notion, Google Docs, or a Git repo), and an evaluation sheet to log failures. If you work in government or regulated sectors, prefer vendors offering APAC data centres and signed data processing agreements with no model training on your inputs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 2: Execution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Prototype your prompt with your sample set. Keep instructions concise, define the audience, and ask for structured output (tables, bullet points, JSON where safe). Run each sample twice: once with a baseline prompt and once with refinements. Track errors such as hallucinated facts, missing citations, or tone mismatches. Where the task depends on local documents (policies, product manuals), add retrieval: store documents in a vector store, chunk sensibly (300–500 tokens), and cite the source titles in responses." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cost-control tactics: cap tokens per request, set a monthly spend threshold, and cache reusable context. For teams, create a simple rubric (accuracy, tone, completeness, citation quality) and have two reviewers score 5–10 outputs. Adjust prompts or switch models if scores stall. Avoid fine-tuning until you know the failure patterns; many issues can be fixed with clearer instructions or cleaner context." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Step 3: Review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Compare AI-assisted outputs to your baseline time and quality. If quality meets or exceeds baseline and reduces effort by at least 20–30%, draft an implementation plan: access controls, logging, incident response, and user training. Document known failure modes and when to escalate to a human subject matter expert. If results fall short, record why—poor source data, unclear prompts, or model choice—and decide whether to iterate or exit." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Before expanding, brief stakeholders on limitations: AI can draft and suggest but should not make final decisions on customer eligibility, medical advice, or financial outcomes. Add ongoing evaluation every release cycle, and revisit consent and privacy statements when you introduce new data sources or vendors." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Conclusion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Starting with AI in 2026 is about disciplined experimentation: pick a contained workflow, measure against a baseline, and keep humans in the loop. By following Australia’s privacy and ethics guidance, teams can ship useful pilots quickly, learn from mistakes safely, and scale only when the value is proven." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(QuoteBlock, { variant: "purple", className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-4", children: "Your Next Steps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Map one workflow where AI could help (meeting notes, FAQ drafts, data cleanup)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Run a 2-week pilot with clear metrics (time saved, error rate, cost per task)." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Review with your team, document lessons, and decide whether to scale or iterate." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-10 border-gray-100" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { authors: [authorDetails] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, {})
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
