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
const TOPIC = "What is venture capital?";
const CATEGORY = "featured";
const SLUG = "what-is-venture-capital";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const DATE_PUBLISHED = "2026-01-18";
const DATE_MODIFIED = "2026-01-18";
const DESCRIPTION = "Plain-English guide to venture capital for Australia in 2026: how VC works, stages, pros and cons, and local options.";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-cad437d2-165c-47de-974e-19eb7c0b1faf.jpg?alt=media&token=d9b29cfb-e4b8-42ad-bc5b-291a7d5dedd6";
const HERO_IMAGE_ALT = "Two people reviewing a term sheet in a modern office";
const FEATURED_FOCUS = "funding";
const faqItems = [
  {
    id: 1,
    question: "How does venture capital work in Australia?",
    answer: "VC funds are managed by General Partners (GPs) who raise capital from Limited Partners (LPs) such as super funds, family offices, and high-net-worth individuals. GPs invest in early-stage companies aiming for outsized outcomes (exits via acquisition or IPO). Australia supports VC through regimes like VCLP and ESVCLP; always check current guidance (as at 2026)."
  },
  {
    id: 2,
    question: "What are the typical funding stages and cheque sizes?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Stages and ranges vary with market conditions, but a rough, non-binding guide in AU (as at 2026):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pre-seed: ~A$250k–A$1.5m (often notes/SAFEs)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Seed: ~A$1m–A$4m." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Series A: ~A$5m–A$15m+." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Series B+: growth rounds based on traction and capital intensity." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use these only as directional ranges; actual round sizes depend on sector, traction, and investor appetite." })
    ] })
  },
  {
    id: 3,
    question: "Do I need revenue to raise VC?",
    answer: "Not always. At pre-seed/seed, strong teams, clear problem/solution fit, and early signals (prototypes, waitlists, pilots) can be enough. Later rounds typically expect measurable traction and growth efficiency (e.g., retention, sales velocity)."
  },
  {
    id: 4,
    question: "How do VCs make money?",
    answer: "VCs charge an annual management fee (commonly ~2%) to run the fund and earn “carry” (commonly ~20%) on profits above returning invested capital to LPs. This pushes VCs to seek high-upside outcomes."
  },
  {
    id: 5,
    question: "Which AU programs or tax settings should I know about?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Review official sources (as at 2026):",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://business.gov.au/grants-and-programs/venture-capital", className: "underline", rel: "nofollow", children: "business.gov.au – Venture capital overview" }),
      ",",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.ato.gov.au/Business/R-and-D-Tax-Incentive", className: "underline", rel: "nofollow", children: "ATO – R&D Tax Incentive" }),
      ", and the",
      " ",
      "ESVCLP/VCLP frameworks referenced on business.gov.au. Seek independent legal/tax advice for your situation."
    ] }) })
  },
  {
    id: 6,
    question: "What documents will investors expect?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pitch deck (problem, solution, traction, market, business model, plan)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Data room: cap table, company docs, financial model or budget, key metrics, customer/market evidence." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Draft instrument: SAFE/convertible note/equity terms (get local legal advice)." })
    ] }) })
  },
  {
    id: 7,
    question: "Is venture capital right for my startup?",
    answer: "VC suits ventures chasing hyper-growth in large markets with potential for significant exits. If your growth is steady or capital-light, consider grants, revenue finance, or bootstrapping instead."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Short, factual overview of VC in Australia (as at 2026). Refer to business.gov.au and trusted legal/tax sources for up-to-date guidance.",
  items: [
    {
      label: "How does venture capital work?",
      description: "Funds (GPs) invest LP money into startups, aiming for exits that return the fund plus profit (carry)."
    },
    {
      label: "What are the stages of VC funding?",
      description: "Pre‑seed, Seed, Series A–C+. Instruments include SAFEs/notes and priced equity; round sizes grow with traction."
    },
    {
      label: "Is VC right for my startup?",
      description: "Best for hyper‑growth, large markets; consider grants or bootstrapping if growth is steadier or capital‑light."
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
        "This guide explains venture capital in practical terms for an Australian audience (general information only, as at 2026). Prefer to browse related funding topics?",
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
          " — Venture capital (VC) is private funding for high-growth companies. In Australia, VC funds back early-stage teams in large markets, aiming for outsized exits. Official guidance is available via",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://business.gov.au/grants-and-programs/venture-capital", className: "underline", rel: "nofollow", children: "business.gov.au" }),
          "; treat this article as general information (not financial, legal, or tax advice)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How venture capital works: funds, LPs and GPs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "VC funds are structured vehicles managed by General Partners (GPs) who raise capital from Limited Partners (LPs) like super funds, family offices, and high-net-worth individuals. Funds typically run 10–12 years: an investment period (~3–5 years) followed by years focused on supporting portfolio companies and realising exits. Because only a few investments may return the fund, VCs prioritise opportunities with large markets and potential for defensible advantage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "In Australia, frameworks such as Venture Capital Limited Partnerships (VCLP) and Early Stage Venture Capital Limited Partnerships (ESVCLP) exist to encourage investment. Always verify current settings on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://business.gov.au/grants-and-programs/venture-capital", className: "underline", rel: "nofollow", children: "business.gov.au" }),
          " (as at 2026)."
        ] }),
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
            title: "Tip: anchor your story in evidence",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Investors respond to crisp signals: a tight problem statement, clear target customer, early traction, and a plan tied to milestones. Define the next 12–18 months in measurable terms, not just a large total addressable market (TAM)." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Funding stages and instruments: pre-seed to Series C" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5a097628-e492-4f35-a14d-5b40936ff308.jpg?alt=media&token=5d3504a8-47f1-4c24-843a-59e5d4d98d7a", alt: "People collaborating in a tech startup workspace, captured in a vibrant 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Rounds generally progress from pre-seed/seed (finding fit) to Series A/B (scaling) and beyond (growth). Instruments include SAFEs or convertible notes (deferring price discovery) and priced equity rounds. Later stages often use priced equity with investor protections aligned to risk." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Convertible notes, SAFEs and equity — what’s different?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "SAFEs and notes convert into equity in a future priced round, typically using a valuation cap and/or discount. They trade simplicity for uncertainty about final dilution. Priced equity sets ownership now, often with a lead investor, negotiated valuation, and governance terms. Seek local legal advice on structures in Australia (as at 2026)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "VC vs angels, private equity and crowdfunding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ad173a5e-95fd-46ef-a998-13575a6833ea.jpg?alt=media&token=7541cc12-e4be-4d5f-babd-2fba91d8b981", alt: "Tech entrepreneurs collaborate in a vibrant 90s film aesthetic, highlighting VC vs. angel investing and crowdfunding.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Angels invest earlier with smaller cheques and may move faster. VC brings larger capital and a portfolio of support but has higher growth expectations. Private equity usually targets later-stage, profitable businesses with different control terms. Crowdfunding can validate demand but adds investor management overhead. Choose the path that fits risk, speed, and governance preferences." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What investors look for (and how to show it)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Common signals include: exceptional team–market fit; credible wedge into a large market; clear business model and unit economics; defensibility (data, network, IP, regulation); traction quality (retention, activation, sales cycle); and a plan that aligns capital to milestones. For AI ventures, be explicit about data rights, privacy, model risks, and evaluation practice." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "The raise process in Australia: from intros to term sheets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Typical flow: refine deck → warm introductions → first meetings → partner meetings → diligence (metrics, customer calls, legal) → term sheet → legals → close. Warm intros via community groups, mentors, or alumni networks often lift response rates. Keep a lightweight investor CRM and send concise updates during the process." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Map 12–18 month milestones and capital required (uses of funds, hiring, R&D, GTM)." },
              { label: "Assemble deck and data room (cap table, metrics definitions, budget, risks)." },
              { label: "Target a focused investor list; secure warm intros through community connectors." },
              { label: "Run a tight process: timebox the raise, cluster meetings, share consistent updates." },
              { label: "Negotiate terms you understand; get independent legal/tax advice (AU context)." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Great fundraises are disciplined projects: sharp story, clean data room, and a plan that translates dollars into de-risked milestones.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Economics 101: management fees, carry and dilution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most VC funds charge an annual management fee (commonly ~2%) and earn carry (often ~20%) after returning invested capital to LPs. For founders, the key lens is dilution: how much ownership you trade for capital and support. Model scenarios for future rounds and exits so the team understands outcomes across success bands." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Is VC a fit? Grants, bootstrapping, and other options" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "VC is a tool for speed and scale, not a goal. If your path is capital-light or steady, consider grants, revenue, or project finance. In Australia, review programs on",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://business.gov.au", className: "underline", rel: "nofollow", children: "business.gov.au" }),
          " (including the R&D Tax Incentive via the ATO) and community or industry partnerships. Match the capital to the job to be done."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Choose your path and timebox your raise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Decide whether VC matches your milestones and market size. If it does, run a focused process with clear criteria and a time limit. If not, channel energy into alternatives that compound momentum without unnecessary dilution." }),
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
  CATEGORY,
  DATE_MODIFIED,
  DATE_PUBLISHED,
  DESCRIPTION,
  FEATURED_FOCUS,
  SLUG,
  TOPIC,
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
