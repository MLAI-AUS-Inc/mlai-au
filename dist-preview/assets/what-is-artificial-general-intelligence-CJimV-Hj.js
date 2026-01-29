import { j as jsxRuntimeExports, F as ForwardRef$2, A as ArticleDisclaimer } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, d as AuthorBio, c as ArticleFAQ, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { A as ArticleReferences } from "./ArticleReferences-HQ7rjtnV.js";
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
const TOPIC = "What is Artificial General Intelligence";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-3107979b-03f2-423c-b960-ae4b26850b72.jpg?alt=media&token=2817e525-d314-4127-852d-f609133af31c";
const HERO_IMAGE_ALT = "Abstract neural network lines representing general intelligence across domains";
const faqItems = [
  { id: 1, question: "Is AGI real today?", answer: "No. As at 2026, there is no peer‑reviewed consensus that any system has achieved artificial general intelligence. Frontier models demonstrate strong capabilities across many benchmarks, but remain brittle, inconsistent off‑distribution, and dependent on human scaffolding or tools." },
  { id: 2, question: "Is GPT‑4 an AGI?", answer: "No. GPT‑4‑class systems are impressive at language, coding, and reasoning tasks under constraints, but they do not reliably exhibit robust open‑world autonomy, long‑horizon planning, grounded causal understanding, or self‑directed goal pursuit with verifiable alignment." },
  { id: 3, question: "How would we measure AGI?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "There is no single test. Researchers propose multi‑domain evaluations that combine reasoning (e.g., MMLU/Math), abstract problem‑solving (e.g., ARC), long‑horizon tasks, embodied control or simulated environments, tool use, and safe operation under uncertainty. Independent replication and adversarial testing are essential." }) },
  { id: 4, question: "When might AGI arrive?", answer: "Forecasts vary widely, from “in the next decade” to “many decades or never.” Treat timelines as uncertain and scenario‑based; focus on practical skills, governance literacy, and responsible deployment that are valuable regardless of timeline." },
  { id: 5, question: "What would AGI mean for jobs in Australia?", answer: "Likely more task automation and augmentation, plus growth in roles across AI safety, governance, data, model evaluation, human‑computer interaction, and AI product integration. Impacts will depend on industry, regulation, and organisational adoption choices." },
  { id: 6, question: "Who regulates AI in Australia?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "As at 2024–25, privacy is overseen by the OAIC, online harms by the eSafety Commissioner, and the Australian Government has proposed guardrails for higher‑risk AI under its Safe and Responsible AI agenda. Always check the latest official guidance." }) }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Is AGI real today?",
      description: "No—there’s no consensus that any system has reached AGI as at 2026; current models are powerful but narrow and unreliable off‑distribution."
    },
    {
      label: "How is AGI different from today’s AI?",
      description: "AGI would generalise across tasks, learn efficiently, plan over long horizons and operate autonomously; today’s systems excel mainly in narrow domains."
    },
    {
      label: "How would we know we’ve built AGI?",
      description: "No single test; researchers propose multi‑domain evals combining reasoning, transfer, real‑world autonomy and safety alignment with independent replication."
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [
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
        ". For a career‑oriented overview, see our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles/ai-careers-australia", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "AI careers in Australia guide" }),
        ". Prefer to browse?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "Explore more articles →" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudienceGrid,
        {
          cards: [
            {
              title: "Founders & Teams",
              description: "For leaders validating ideas, seeking funding, or managing teams.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
              variant: "orange"
            },
            {
              title: "Students & Switchers",
              description: "For those building portfolios, learning new skills, or changing careers.",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
              variant: "purple"
            },
            {
              title: "Community Builders",
              description: "For workshop facilitators, mentors, and ecosystem supporters.",
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
          " describes a hypothetical class of AI systems that can learn, reason and adapt across a wide range of tasks—more like a capable generalist than a single‑skill specialist. Top explainers from encyclopaedic and industry sources converge on three ideas: breadth (many domains), transfer (learning that carries over), and autonomy (goal‑directed behaviour with reliable control and safety)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "AGI versus today’s AI: scope, autonomy and transfer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most deployed systems are “narrow AI” built to excel at specific tasks (e.g., recognising images, drafting text, or recommending content). By contrast, AGI would generalise: it would learn new tasks with limited data, transfer prior knowledge, plan over long horizons, and operate with a degree of autonomy—while remaining aligned with human goals and safety constraints. Modern foundation models blur lines by performing well on diverse benchmarks, but they still rely on scaffolding, frequent human oversight, and careful prompting; performance degrades in unfamiliar or open‑ended settings." }),
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
            title: "Tip: separate capability claims from system behaviour",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-gray-800", children: [
              "Ask what the model can do ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "reliably" }),
              " without hidden human help, how it behaves under adversarial tests, and whether independent evaluations reproduce the result."
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What capabilities would qualify as AGI?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cc18daf3-4852-4ca4-9190-74f7a03c26f4.jpg?alt=media&token=69c2054f-2e4a-4181-baa2-8f8327ab6777", alt: "People in a 90s tech startup setting, brainstorming ideas for artificial general intelligence (AGI) capabilities.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "There is no universally agreed checklist, but common proposals emphasise:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Generalisation and transfer:" }),
            " learning and applying concepts across domains, not just pattern‑matching within benchmarks."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sample‑efficient learning:" }),
            " improving quickly from few examples, including from interaction."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Robust reasoning and planning:" }),
            " handling long‑horizon, multi‑step goals under uncertainty."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Grounding and causality:" }),
            " modelling cause‑and‑effect, not only correlations."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tool use and embodiment:" }),
            " using tools or actuators to achieve goals safely."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Alignment and oversight:" }),
            " predictable, controllable behaviour aligned with human intent and law."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Generalisation and transfer across domains" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "True generality shows up when systems succeed on new tasks ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "without" }),
          " extensive task‑specific fine‑tuning, maintain performance under distribution shift, and can explain ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "why" }),
          " a solution works. Today’s strongest models push in this direction, but often rely on tool‑calling, retrieval, or human‑written scaffolds to reach high reliability."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps for evaluating AGI claims",
            steps: [
              { label: "Check the definition: does the claim mean broad generalisation, autonomy, and alignment—or just a benchmark win?" },
              { label: "Look for independent, multi‑domain evaluations (reasoning, transfer, long‑horizon tasks, safety) with reproducible protocols." },
              { label: "Assess real‑world constraints: data access, guardrails, oversight, and failure modes under stress tests." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“AGI isn’t a single score—it’s a moving frontier across capability, reliability, and alignment. Treat bold claims as hypotheses that need careful evaluation.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How would we know we’ve reached AGI? Proposed evaluations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-60ebb893-d745-4b9f-bddc-844dbf045ea6.jpg?alt=media&token=c045e78b-8679-4691-939b-0cda6faf78dd", alt: "Tech professionals brainstorm in a retro 90s film aesthetic, contemplating evaluations for achieving AGI.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Classic ideas like the Turing Test are too coarse for modern systems. Contemporary proposals combine multiple lenses: knowledge and reasoning (e.g., broad academic tests), abstract problem‑solving (e.g., ARC‑style), coding and maths, grounded or simulated tasks that require planning, and safe autonomy under uncertainty. Crucially, safety‑relevant evaluations—like honesty under pressure, resistance to jailbreaks, and robustness to adversarial prompts—must sit alongside capability metrics. No single benchmark suffices; the standard will evolve as systems improve." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where are we now in 2026? Frontier systems, strengths and gaps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Today’s large models demonstrate impressive versatility: drafting, coding, analysis, translation, and tool use. Yet they still show hallucinations, inconsistent reasoning, and brittleness when tasks deviate from training distributions. Autonomy remains narrow and heavily scaffolded by humans or orchestrators. In short: we see ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "general‑looking" }),
          " behaviour in many contexts, but not the reliable, aligned competence across open‑ended tasks that most researchers would call AGI."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Timelines and debate: uncertainty is the headline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Surveys of researchers have reported wide ranges for when AGI‑like capability might emerge—spanning the next decade to several decades or more. Methodologies and definitions differ, and selection effects can distort results. A pragmatic approach is to plan for multiple scenarios: accelerate capability‑neutral skills, strengthen safety and governance capacity, and invest in evaluation infrastructure that benefits Australia regardless of timing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Careers and skills in Australia if AGI emerges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For students, practitioners, and decision‑makers, the most durable moves are capability‑neutral: focus on fundamentals, verifiable practice, and community. Roles likely to grow include model evaluation, AI safety and governance, data engineering, MLOps, human‑AI interaction, and domain‑specific AI product work. Cross‑functional literacy—policy, privacy, security, and ethics—will matter." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Strengthen fundamentals:" }),
            " statistics, optimisation, software engineering, data practices."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Build evaluation skills:" }),
            " design and run robust tests; interpret uncertainty; communicate limits."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Focus on governance:" }),
            " privacy by design, risk assessment, documentation, and incident response."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Engage locally:" }),
            " Australian context, standards, and networks matter. See our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles/ai-careers-australia", children: "AI careers in Australia guide" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Responsible development and governance in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australian organisations should track official guidance on safe and responsible AI, privacy, and online harms. As at 2024–25, the Office of the Australian Information Commissioner (OAIC) leads privacy oversight, the eSafety Commissioner addresses online harms, and the Federal Government has proposed targeted guardrails for higher‑risk AI. For teams experimenting with frontier models, embed risk assessments, human oversight, red‑teaming, and documentation from the start." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Make it practical: your action plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You don’t need a settled AGI definition to make progress. Prioritise durable skills, responsible practices, and community support that hold across scenarios." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above and map your current evaluation and governance gaps." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Build a small, documented pilot with clear success criteria and safety tests." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Connect with a local community or mentor to review results and iterate." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia and get practical, peer‑tested guidance.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "We’re a not‑for‑profit community based in Australia."
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleReferences,
        {
          heading: "Sources",
          description: "Curated references for further reading (as at 2024–25).",
          headingId: "references",
          references: [
            {
              id: 1,
              href: "https://en.wikipedia.org/wiki/Artificial_general_intelligence",
              title: "Artificial general intelligence",
              publisher: "Wikipedia",
              category: "guide",
              description: "Neutral overview with history, definitions, and debates."
            },
            {
              id: 2,
              href: "https://www.ibm.com/think/topics/artificial-general-intelligence",
              title: "What is Artificial General Intelligence (AGI)?",
              publisher: "IBM",
              category: "guide",
              description: "Industry explainer covering definitions and differences from narrow AI."
            },
            {
              id: 3,
              href: "https://cloud.google.com/discover/what-is-artificial-general-intelligence",
              title: "What is Artificial General Intelligence?",
              publisher: "Google Cloud",
              category: "guide",
              description: "High‑level overview of concepts, challenges, and outlook."
            },
            {
              id: 4,
              href: "https://industry.gov.au/guidance-for-ai-adoption",
              title: "Guidance for AI Adoption",
              publisher: "Australian Government",
              category: "government",
              description: "Official Australian guidance on responsible AI adoption."
            },
            {
              id: 5,
              href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations/artificial-intelligence",
              title: "Artificial intelligence and privacy",
              publisher: "OAIC",
              category: "government",
              description: "Privacy considerations for organisations using AI in Australia."
            }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDisclaimer, {}),
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
