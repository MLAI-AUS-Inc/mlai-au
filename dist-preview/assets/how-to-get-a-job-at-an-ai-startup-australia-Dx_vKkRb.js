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
const TOPIC = "How to get a job at an AI startup in Australia";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-08abda89-03c4-4ea8-92b6-74a950332e2c.jpg?alt=media&token=a583a613-e277-4865-b0bb-c9eecc3be872";
const HERO_IMAGE_ALT = "Team collaborating in a startup office with laptops";
const faqItems = [
  {
    id: 1,
    question: "Are AI startup jobs in Australia growing in 2026?",
    answer: "Yes. Hiring remains concentrated in Sydney and Melbourne, with remote-friendly roles expanding. Growth is strongest in applied ML/LLM product roles, safety/data governance, and full-stack engineers who can ship AI features."
  },
  {
    id: 2,
    question: "Do I need a computer science degree to get hired?",
    answer: "Not necessarily. Startups prioritise demonstrable impact: shipped features, open-source contributions, or portfolio projects showing model integration, evals, and responsible data handling."
  },
  {
    id: 3,
    question: "Where do founders typically post AI roles?",
    answer: "Aside from Seek and LinkedIn, founders often post in Australian Slack/Discord communities, university labs, and at meetups. Follow founders on LinkedIn and check Wellfound/YC’s Work at a Startup for remote-friendly roles."
  },
  {
    id: 4,
    question: "What interview formats should I expect?",
    answer: "A short founder screen, a practical take-home (e.g., prompt/tooling task), and a pairing session. Some teams add a data/privacy scenario to test judgment under Australian Privacy Act expectations."
  },
  {
    id: 5,
    question: "Will AI startups sponsor visas in Australia?",
    answer: "Early-stage teams rarely sponsor. Later-stage scaleups sometimes do, but most expect full work rights (citizen, PR, or suitable visa) and availability in AEST-friendly hours."
  },
  {
    id: 6,
    question: "How do I show “AI safety” awareness as a candidate?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Reference concrete practices: red-teaming prompts, adding guardrails, basic evals, and handling personal information under the Australian Privacy Act. Link to a repo or short write-up demonstrating this." })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "How competitive are AI startup roles in Australia right now?",
      description: "Highly competitive; clustered in Sydney/Melbourne with growing remote AEST roles and emphasis on applied ML/LLM builders."
    },
    {
      label: "Do AI startups hire without prior AI job titles?",
      description: "Yes, if you show shipped portfolio work, clear impact, and basic safety/privacy practices aligned to Australian expectations."
    },
    {
      label: "Where should I look for AI startup jobs in Australia?",
      description: "Combine Seek/LinkedIn with Wellfound, YC’s Work at a Startup, founder LinkedIn posts, and local meetups/Slack for hidden roles."
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
          " – In 2026, Australian AI startups are hiring selectively for impact-ready roles: applied ML/LLM engineers, full-stack product builders, and people who can evidence safe, privacy-aware delivery. Use this guide to map the hiring channels, build proof fast, and approach founders with credibility."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where Australian AI startups are hiring and what they value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hiring is clustered around Sydney, Melbourne, and remote-friendly teams that work on AEST hours. Early-stage founders prioritise broad builders who can ship end-to-end (frontend, backend, model integration, evals). Later-stage teams add specialists: ML infra, data governance, and applied research. Expect lean salary bands with equity; junior roles often ask for demonstrable output over years of experience." }),
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
            title: "Show momentum, not just interest",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Add links to live demos, short Loom videos, and a one-page README on risks/mitigations. Founders skim; make it easy to see that you build, ship, and think about safety." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Building a portfolio Australian founders will actually open" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-59e45ba9-2370-449d-8a8b-10ba37c721bb.jpg?alt=media&token=ea204bd7-a580-4103-9614-3f8a11028b7d",
            alt: "90s film aesthetic captures a diverse group brainstorming in a vibrant tech startup office.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Prioritise applied work: a small product that uses an API model, a custom prompt router, or lightweight retrieval with evals. Keep repos lean with setup instructions, a short video, and a note on how you handled personal data under the Australian Privacy Act. Two strong projects beat eight half-finished notebooks." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Proof points that land interviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Include: (1) before/after metrics or user feedback, (2) how you evaluated prompts or models, (3) safeguards (rate limits, PII filtering), and (4) decisions you made on hosting costs. If you lack production access, use synthetic data and explain your assumptions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Ship one end-to-end demo with a short Loom walkthrough" },
              { label: "Document evals and a privacy note in your README" },
              { label: "Publish a concise LinkedIn post tagging the stack you used" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Founders skim for signal: a link that works, a README that shows judgment, and evidence you can deliver in a week—not a promise you’ll learn it later.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Finding live roles and hidden opportunities in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fd2794f7-667d-43b9-bd44-9d398b5a16d9.jpg?alt=media&token=7d160914-e5e0-4a5a-8a30-f6efedede4a2",
            alt: "Diverse team collaborating in a trendy tech workspace, showcasing 90s film aesthetics and innovation.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Combine public boards with founder-led channels. Check Seek (filter “AI/ML”), LinkedIn, Wellfound, and YC’s Work at a Startup. Watch university lab newsletters (e.g., UNSW/UTS/UniMelb AI groups), and follow Australian AI founders on LinkedIn. Hidden roles surface in Slack/Discord communities and at meetups—turn up, ask what’s shipping, and offer a small contribution." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Fast signal outreach", variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Send a 5–7 line note with one relevant link: “I built this prompt-eval harness last week; here’s a Loom. Keen to contribute to your safety backlog—can we pair for 30 minutes?”" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Application strategy: CV, cover note, and timing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Keep CVs to one page with a “Shipped AI work” section up top. Lead with outcomes (e.g., “Reduced manual review time by 30% via RAG prototype”). Use a short cover note tailored to the product, mention availability in AEST, and flag work rights. Apply early in the week; many teams triage on Mondays." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Create a one-page CV with a top “Shipped AI work” section" },
              { label: "Draft a 7-line cover note tailored to the product and market" },
              { label: "Apply Sunday night or Monday morning; set reminders to follow up in 5 days" }
            ],
            accent: "brand"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Interview formats, take-homes, and safety expectations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Expect: a founder or hiring manager screen (15–20 minutes), a practical take-home (prompt design, lightweight RAG, or UI wiring), and a pairing session. Some teams include a privacy or red-teaming scenario. Be ready to explain trade-offs: cost vs latency, evals vs release speed, and how you’d handle PII for Australian users." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Prepare concise examples" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bring two stories: (1) when you added safeguards after a failure, and (2) when you shipped a scrappy experiment in days. Keep answers structured (situation, action, result, what you’d change)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Safety & compliance checkpoint", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🛡️" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Mention how you would minimise personal data, log access, and align with the Australian Privacy Act. If unsure, propose a lightweight data handling checklist and a post-release eval pass." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Work rights, remote-first norms, and pay expectations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most early-stage teams need candidates with existing Australian work rights. Remote roles often require AEST overlap. Pay bands vary: early-stage may offer lower cash with equity; later-stage scaleups pay closer to market for engineers and product builders, with premiums for ML infra and security talent. Always confirm superannuation and equity terms in writing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "60-day plan to reach your first AI startup interviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Sequence your effort: build proof, show up where founders are, and send targeted outreach with one strong link. Track applications in a simple spreadsheet and adjust weekly based on replies." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Draft your initial goals based on the template." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discuss with your team or mentor." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-12 not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Get practical recommendations based on your goals, time, and experience level.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
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
