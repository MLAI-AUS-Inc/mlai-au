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
const TOPIC = "AI startup companies in Australia";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c0a9272c-7c60-45ff-9716-9be16e76ffae.jpg?alt=media&token=a7c9bdfc-25b5-4dfa-8be2-01be5488c168";
const HERO_IMAGE_ALT = "Team collaborating around a laptop with AI diagrams";
const faqItems = [
  { id: 1, question: "Which Australian cities have the most AI startup companies in 2026?", answer: "Sydney and Melbourne lead, with growing clusters in Brisbane and Perth. Sydney has a concentration of enterprise AI and healthcare startups, while Melbourne has strong research spin-outs and product-led teams." },
  { id: 2, question: "How can I check if an AI startup handles data responsibly?", answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Look for a published privacy policy referencing the Privacy Act 1988 (Cth), clear data retention limits, model provenance notes, and security disclosures (e.g., SOC 2 in progress). Absence of these is a red flag." }) },
  { id: 3, question: "Are there grants for Australian AI startups in 2026?", answer: "Check the National Reconstruction Fund priorities, state-based innovation vouchers (e.g., LaunchVic), and university commercialisation partnerships. Most require matched funding and a clear use case." },
  { id: 4, question: "What roles are AI startups hiring for now?", answer: "Common roles: ML engineers with MLOps skills, data engineers, product managers comfortable with AI safety constraints, and designers experienced in human-in-the-loop workflows." },
  { id: 5, question: "How do I validate an AI startup’s traction?", answer: "Ask for paying customer logos or sectors (even if anonymised), active user metrics, churn, pilot-to-paid conversion, and proof of repeatable deployment (not just demos)." },
  { id: 6, question: "What are sensible pilot terms when partnering with an AI startup?", answer: "Use a short, time-boxed pilot (6–12 weeks), clear KPIs, data-sharing boundaries, IP clauses for outputs, and rollback plans. Keep production access gated until controls are proven." }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Which cities lead AI startup growth in Australia?",
      description: "Sydney and Melbourne remain the densest hubs, with Brisbane and Perth growing in applied AI niches."
    },
    {
      label: "How do I evaluate an AI startup’s readiness?",
      description: "Check deployed use cases, data/privacy practices under the Privacy Act, pilot-to-paid conversion, and monitoring/rollback processes."
    },
    {
      label: "What funding options exist for AI startups in 2026?",
      description: "National Reconstruction Fund priorities, state innovation vouchers like LaunchVic, university commercialisation, and early-stage angels/syndicates."
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
          " – Australia’s AI startup scene has matured into city-based clusters with different flavours: enterprise and health AI in Sydney, research spin-outs and product-led teams in Melbourne, and applied AI niches emerging in Brisbane and Perth. This guide maps the hubs, shows how to assess startups, and summarises the 2026 funding and safety signals to check before you partner, invest, or join."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where Australia’s AI startup hubs are growing in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Built-in style directories spotlight Sydney and Melbourne as the densest AI hubs. Sydney teams often target enterprise productivity, fintech risk, and health diagnostics; Melbourne startups skew to research-led computer vision, language models, and product-led B2B AI. Brisbane and Perth are rising with mining tech, climate analytics, and defence-adjacent applications. For jobseekers and partners, this means your shortlist should start with the city whose sector strengths match your domain, then filter by customer type (enterprise vs SME) and deployment maturity." }),
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
            title: "Fast scan: pick the right hub",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "If you need regulated deployment (health/finance), prioritise Sydney teams with compliance partners. For research-heavy co-development, Melbourne’s university spin-outs and product studios are more common. Remote-first teams are growing; verify how they handle customer data residency in Australia." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How to assess an AI startup before you join or partner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-284d87a1-900a-4697-b3ea-6378ee6a5296.jpg?alt=media&token=26059916-534b-45fd-9c26-3875da1624e6", alt: "Diverse team discussing AI startup ideas in a retro 90s film aesthetic, capturing innovation and collaboration.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Top-ranking lists rarely explain evaluation signals. Go deeper: ask for deployed use cases (not just demos), data provenance, and model update cadence. Check if the team can separate experiments from production, and whether they run offline evaluations plus live monitoring. For career moves, look for transparent equity terms, salary bands aligned to Australian market rates, and evidence of inclusive hiring. For partnerships, prioritise clarity on who owns outputs, how they handle rollback, and whether SLAs exist after the pilot." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Traction, revenue, and product fit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Request pilot-to-paid conversion rates, churn, and typical deployment timelines. A credible early-stage AI startup will show at least a few paying customers, not just proof-of-concepts. If they serve regulated industries, ask how they satisfy privacy impact assessments and what third-party audits are planned." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Map your risk appetite: regulated vs low-risk use cases" },
              { label: "Request a 6–12 week pilot scope with KPIs and rollback terms" },
              { label: "Review data handling, privacy impact assessment, and incident playbook" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“If a startup cannot show how experiments are separated from production data and models, pause. Safety and observability discipline predicts reliability more than demo quality.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Funding routes and grants for AI startups in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0a260243-f82d-4947-99ce-b34e62d7750e.jpg?alt=media&token=cc068293-5bc9-44f9-89e9-7f55b4d1f230", alt: "Tech entrepreneurs collaborate in a vibrant 90s film aesthetic, exploring funding routes for AI startups in 2026.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Beyond VC, Australian founders are using the National Reconstruction Fund priority areas, state innovation vouchers (e.g., LaunchVic), and university commercialisation pathways. Many require matched funding and evidence of industry need. Angel and syndicate rounds remain active for applied AI, especially B2B productivity and climate tech. Ensure cap tables leave room for future raises; avoid over-indexing on SAFEs without clarity on valuation caps." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Hiring signals and skills AI startups expect now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Teams are prioritising ML engineers with MLOps and evaluation tooling experience, data engineers for reliable pipelines, and designers comfortable with human-in-the-loop flows. For jobseekers, showcase shipped work (not just notebooks), monitoring practices, and examples where you mitigated model bias or drift. Startups favour generalists who can instrument analytics, write product specs, and collaborate with security early." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Privacy, security, and responsible AI expectations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Expect references to the Privacy Act 1988 (Cth), OAIC guidance, and internal red-teaming for harmful outputs. Production-grade startups disclose retention limits, data residency (often AU or AU+NZ), and security controls such as encryption in transit/at rest. If a product uses third-party foundation models, ask how prompts, logs, and training data are isolated. Include a simple refusal policy for sensitive or high-risk queries, plus human escalation paths." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Partnering and piloting with AI startups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "When co-developing, start with a contained pilot: define metrics (time saved, accuracy delta, risk reduction), bound the dataset, and agree on a rollback plan. Clarify IP ownership for outputs, avoid unrestricted data rights, and add a sunset clause for any data copies. For community support, connect with local groups such as MLAI to compare notes on vendors and hiring signals." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Move from research to action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The strongest AI startup companies combine sector focus, measurable traction, and responsible AI practices. Shortlist by city strengths, validate data safeguards, and run a time-boxed pilot with clear KPIs. For talent moves, prioritise teams that ship safely and share equity and salary transparently." }),
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
            body: "MLAI is a not-for-profit community empowering the Australian AI community. Get practical recommendations based on your goals, time, and experience level.",
            buttonText: "Get recommendations",
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
