import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
import "util";
import "stream";
import "path";
import "node:net";
import "node:stream";
import "node:events";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
import "node:path";
import "node:url";
const useCustomHeader = true;
const TOPIC = "What is an AI Agent Orchestrator and How Can I Become One (2026)?";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf8dfb39-2fe4-44a3-836a-b7ca593d40af.jpg?alt=media&token=aca34ccb-4071-4fd8-87dd-65abebf13916";
const HERO_IMAGE_ALT = "Person coordinating multiple AI agent workflows on a screen";
const faqItems = [
  { id: 1, question: "What does an AI agent orchestrator do day to day?", answer: "They design, configure, and monitor multi-agent workflows, including prompt chains, tool routing, evaluation checks, and rollback paths to keep outputs safe and useful." },
  { id: 2, question: "Which skills are essential in 2026 for this role?", answer: "LLM pipeline design, Python/TypeScript, vector search, observability, safety/evaluation frameworks, and the ability to translate business goals into agent tasks." },
  { id: 3, question: "Is there demand for AI agent orchestrators in Australia?", answer: "Yes. Financial services, health, education, and gov-tech teams are piloting AI agents and need orchestration for reliability and compliance (as at Jan 2026)." },
  { id: 4, question: "Do I need a machine learning degree?", answer: "Not necessarily. A background in software engineering, data, or product with hands-on LLM pipeline experience is often sufficient, provided you can evidence safety and evaluation practice." },
  { id: 5, question: "Which tools should I learn first?", answer: "Start with one orchestration framework (e.g., LangGraph or Airflow with LLM operators), an evaluation toolkit (RAGAS, DeepEval), and basic observability (Arize/Weights & Biases), then layer in vector stores and function-calling APIs." },
  { id: 6, question: "How do I show capability to employers?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Ship a public mini-portfolio: a repo with a multi-agent flow, eval scripts, latency/cost dashboards, and a short README on governance choices. Add a demo video and link it on your CV." }) }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What does an AI agent orchestrator do?",
      description: "Coordinates multi-agent workflows, tool routing, evaluations, and guardrails to deliver reliable outcomes."
    },
    {
      label: "Which skills matter most in 2026?",
      description: "LLM tool use, graph orchestration, retrieval, evaluations, observability, and governance awareness."
    },
    {
      label: "How do I become job-ready in Australia?",
      description: "Build a portfolio with instrumented multi-agent flows, documented safeguards, and demos showing privacy-aware design."
    }
  ]
};
function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs: [
          { label: "Home", href: "/", icon: House },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true }
        ],
        title: TOPIC,
        titleHighlight: "(2026)",
        headerBgColor: "cyan",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-800", children: [
        "This guide is part of our broader series on ",
        TOPIC,
        ". Prefer to jump ahead?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "Browse related articles →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudienceGrid,
        {
          cards: [
            {
              title: "Founders & Teams",
              description: "For leaders validating AI use cases, scoping governance, or planning hiring.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
              variant: "orange"
            },
            {
              title: "Students & Switchers",
              description: "For those building AI portfolios, learning orchestration tools, or changing roles.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
              variant: "purple"
            },
            {
              title: "Community Builders",
              description: "For mentors, facilitators, and meet-up organisers supporting AI capability.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
              variant: "yellow"
            }
          ],
          className: "my-10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " – The role blends software engineering, LLM product thinking, and governance. In 2026 Australia, teams want multi-agent workflows that are observable, cost-aware, and compliant with local privacy expectations. This guide maps the role, skills, and a practical pathway to get job-ready."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Defining the AI agent orchestrator: scope, not hype" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "An AI agent orchestrator designs and maintains the system that coordinates multiple AI agents, tools, and guards. Unlike a prompt engineer, this role owns routing logic, memory strategy, evaluation gates, cost/latency targets, and rollback behaviours. In regulated sectors common in Australia (financial services, health, education, gov-tech), orchestration ensures audits and safeguards are baked into the workflow." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Core responsibilities include: selecting an orchestration framework, designing task graphs, integrating APIs and tools, defining evaluation checks, and monitoring production behaviour with telemetry. The orchestrator is accountable for reliability and safety, even when individual agents are probabilistic." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            title: `Download the ${TOPIC} checklist`,
            description: "Access a structured template to apply the steps in this guide.",
            buttonLabel: "Get the checklist",
            buttonHref: "#",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Match orchestration scope to risk",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "In low-risk pilots, start with a single-agent flow plus evaluations. Add multi-agent routing only when the value is clear and the guardrails (tests, evals, cost caps) are in place." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Key skills for 2026: pipelines, evaluations, and safety" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-61002287-5ff2-404c-87d0-9494abf40e98.jpg?alt=media&token=2c9353ae-f700-49c0-8cd5-87ba2d39217d", alt: "Tech-savvy professionals collaborate in a vintage 90s film aesthetic, focusing on pipelines, evaluations, and safety.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Employers expect orchestrators to blend software craft with AI safety. Priority skills include: LLM function-calling and tool use; graph-based orchestration (e.g., LangGraph, Airflow + LLM operators); retrieval design (vector search, reranking); evaluation frameworks (RAGAS, DeepEval, custom golden sets); observability and tracing; and familiarity with Australian privacy expectations and data-handling standards." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Proof points hiring managers look for" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Demonstrate: a repository with reproducible runs; automated evaluations; cost and latency dashboards; red-teaming notes; and a short ADR (architecture decision record) explaining why routing and safeguards were chosen. Public demos and concise READMEs help non-technical stakeholders assess your approach." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Ship a minimal multi-agent flow with evaluation gates" },
              { label: "Instrument tracing, latency, and cost limits" },
              { label: "Document governance choices and rollback paths" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Orchestration is less about more agents and more about predictable outcomes: guardrails, evals, and observability make the role valuable.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Australian demand and pathways into the role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4b0d87ec-3ad3-488d-986b-cd47c72e4fe2.jpg?alt=media&token=bb97dc1f-b2fd-4c0d-8455-0cedadc38c58", alt: "Team collaborating in a vibrant 90s tech startup, reflecting Australian demand for innovative roles.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "As at January 2026, Australian teams in banking, health, tertiary education, and gov-tech are piloting agentic workflows for customer support, compliance summarisation, and document routing. Demand sits within platform teams, applied AI squads, and innovation labs. Because the role is emergent, hiring managers often rebadge it as ‘AI platform engineer’, ‘LLM engineer’, or ‘AI solutions engineer’—keep your CV keywords broad." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Typical entry routes include software engineering (backend or data), MLOps, or product engineering roles that have absorbed LLM responsibilities. Contract roles appear in consultancies and system integrators delivering proof-of-concepts for public sector and enterprise clients." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Tooling stack that employers expect familiarity with" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Expect to work with: orchestration frameworks (LangGraph, Airflow, Temporal); LLM providers (OpenAI, Anthropic, open-source models via vLLM); vector databases (Pinecone, Weaviate, pgvector); evaluation suites (RAGAS, DeepEval, custom harnesses); observability (Arize, W&B, OpenTelemetry traces); and policy/guardrails layers (Outlines, Guardrails, or custom validators). Focus on one stack, then map concepts across others." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Portfolio and hiring signals that stand out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hiring teams value evidence of safe, measurable delivery. Create a public repo that shows: task graph design; prompts with function-calling; synthetic and golden test sets; evaluation scripts; a cost/latency dashboard; and a one-page ADR describing trade-offs. Add a short Loom or YouTube demo. For Australian context, note how you handle data residency and privacy constraints." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Learning path: from foundations to production readiness" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Move in deliberate stages: foundations (Python/TypeScript, HTTP APIs, basic LLM calls); structured prompting and tool use; retrieval design; orchestration graphs; evaluations and red-teaming; observability; and deployment on cloud with cost controls. Apply each stage to a small project rather than reading only." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft a mini project plan: use-case, agents, tools, evals, and observability." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Share your demo and README with a mentor or local community for feedback." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "MLAI is a not-for-profit community empowering the Australian AI community—connect to learn with peers and mentors.",
            buttonText: "Join the MLAI community",
            buttonHref: "https://mlai.au/contact",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, { backHref: "/articles", topHref: "#" })
    ] })
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
