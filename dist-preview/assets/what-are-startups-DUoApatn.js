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
const TOPIC = "What are startups?";
const CATEGORY = "featured";
const SLUG = "what-are-startups";
const DEFAULT_AUTHOR_PROFILE = {
  name: "Dr Sam Donegan",
  role: "Founder",
  bio: "",
  avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"
};
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails() ?? DEFAULT_AUTHOR_PROFILE;
const AUTHOR = AUTHOR_PROFILE.name ?? DEFAULT_AUTHOR_PROFILE.name;
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? DEFAULT_AUTHOR_PROFILE.role;
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? DEFAULT_AUTHOR_PROFILE.bio;
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? DEFAULT_AUTHOR_PROFILE.avatarUrl;
const DATE_PUBLISHED = "2026-01-18";
const DATE_MODIFIED = "2026-01-18";
const DESCRIPTION = "Plain-English definition, stages, funding and Australian context for 2026.";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-88cc7bbe-1bd0-4ed3-ada8-d9c991054839.jpg?alt=media&token=db283c71-1516-41c2-b519-fb5675abf5b5";
const HERO_IMAGE_ALT = "Two founders sketching product ideas on a whiteboard in a co-working space";
const FEATURED_FOCUS = "startups";
const faqItems = [
  {
    id: 1,
    question: "What legally counts as a startup in Australia?",
    answer: "There is no specific legal classification. “Startup” describes a stage and model (searching for a repeatable, scalable business) rather than a company type. Legally you will operate as a sole trader, partnership, or company (most venture-backed startups are Pty Ltd)."
  },
  {
    id: 2,
    question: "Do I need to incorporate before raising capital?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Most angel and VC investors require a company structure (Pty Ltd) with a clear cap table before investing. If you are just validating, you can start with an ABN and contracts, then incorporate once you have committed co-founders or funding. Seek independent legal/tax advice." })
  },
  {
    id: 3,
    question: "How is a startup different from a small business?",
    answer: "Small businesses aim for stable, local profitability with known models. Startups are designed to discover a scalable model under uncertainty and aim for rapid growth beyond a single location or owner-operator capacity."
  },
  {
    id: 4,
    question: "What grants or incentives are available in Australia (as at 2026)?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "The federal R&D Tax Incentive may offset eligible R&D expenditure; always check current ATO guidance. States may run programs (e.g., LaunchVic in Victoria, Advance Queensland). See",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://business.gov.au",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "business.gov.au"
        }
      ),
      " ",
      "for current programs, and speak with a registered tax adviser."
    ] })
  },
  {
    id: 5,
    question: "How long is a company considered a startup?",
    answer: "Commonly until it reaches product–market fit and repeatable growth. Practically this is often the first 3–5 years, but the label depends on stage rather than age."
  },
  {
    id: 6,
    question: "Do startups have to be “tech”?",
    answer: "Not strictly, but most venture-scale startups are technology-enabled because software and data allow scalable distribution, automation, and margins that suit rapid growth."
  },
  {
    id: 7,
    question: "Where should I start if I have an idea?",
    answer: "Begin with customer discovery (interviews, problem validation), a small prototype or landing page, and a clear hypothesis about who pays and why. Keep costs low until you see repeated pull from real users."
  },
  {
    id: 8,
    question: "What registrations do I need in Australia (as at 2026)?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Typically: an ABN via the Australian Business Register, and if incorporating, an ACN and company setup via ASIC. Depending on activity you may need GST registration, payroll obligations, and sector-specific compliance. See",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://abr.gov.au/",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "abr.gov.au"
        }
      ),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://asic.gov.au/",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "asic.gov.au"
        }
      ),
      "."
    ] })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What defines a startup?",
      description: "A young company searching for a repeatable, scalable business model under uncertainty."
    },
    {
      label: "How are startups funded?",
      description: "Often founders then angels/VC (pre‑seed to Series B); in Australia, also grants and the R&D Tax Incentive."
    },
    {
      label: "How long is a company a startup?",
      description: "Typically until product–market fit and repeatable growth; often 3–5 years, but it varies."
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
          " — A startup is a young organisation searching for a repeatable, scalable business model under high uncertainty. In Australia in 2026, that usually means working quickly to validate a real problem, proving demand with early customers, and building a tech‑enabled product that can grow beyond a single location or team."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What is a startup? Definition and common traits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A startup combines three elements: uncertainty (you do not yet know the exact product or go‑to‑market), scalability (the model should work in many places with similar unit economics), and speed of learning (rapid cycles to discover what works before capital and energy run out). Many Australian startups are software‑led, but hardware, biotech, climate tech and services can also be “startup‑like” when they pursue scalable models." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Goal: discover a repeatable, scalable model (not just deliver a single project)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Method: rapid experiments, customer discovery, and measurable learning." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Result: evidence of demand (retention, revenue, or usage) that sustains growth." })
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
            title: "Tip: Write the problem in one sentence",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "If you cannot explain the user’s pain, who feels it, and how often it occurs in one sentence, you are not ready to build. Start with 10–15 short interviews and look for repeated phrases." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Startup vs small business: what’s the difference?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-836c1e5c-8037-4179-97f4-35253a8072bb.jpg?alt=media&token=f237f280-6ca5-4fa5-8acf-334301ec3d6f",
            alt: "Group of diverse individuals brainstorming in a retro-tech workspace, capturing the vibrant 90s startup vibe.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Small businesses run proven models for a known local market and prioritise stable profit. Startups are designed to search, change quickly, and scale beyond the founders. Both are valuable; they just optimise for different outcomes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "How they differ in practice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Business model: discovery and iteration vs. execution of a known model." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Funding: external equity and fast reinvestment vs. owner funding or bank finance." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Team: flexible roles and rapid hiring vs. defined roles and steady headcount." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Risk/return: higher variance with potential for outsized impact vs. lower variance and local resilience." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How startups are funded (pre‑seed to Series B)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3495f9de-ee4d-434b-8529-fa8962a6eb10.jpg?alt=media&token=883dfd41-a7a5-4d3e-9d37-4f9aba4fc2d8",
            alt: "People in a tech startup setting, capturing the essence of 90s film aesthetics, discussing funding strategies.",
            className: "w-full rounded-lg my-8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Many Australian startups begin with founders’ savings and customer revenue, then raise external capital when experiments show traction. Typical stages (naming varies):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pre‑seed:" }),
            " Idea and problem validation, tiny prototype or landing page; often angels or small funds."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Seed:" }),
            " Early product in market with signs of retention or revenue; angels/seed funds/accelerators."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Series A/B:" }),
            " Clear product–market fit and repeatable growth; institutional VCs to scale."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In Australia (as at 2026), many teams also use the federal R&D Tax Incentive to offset eligible R&D costs and may apply for state programs (e.g., LaunchVic). Always verify current rules on official sites and seek independent advice." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Lifecycle: from problem–solution fit to scale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Problem–solution fit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You have evidence that a specific group consistently experiences a painful problem and confirms your proposed solution would help (e.g., pre‑orders, letters of intent, or paid pilots)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Product–market fit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Users return without heavy prompting and refer others. Signals include strong retention, high NPS from core users, and improving unit economics." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Repeatable growth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A channel (or two) predictably converts prospects to loyal users at an acceptable customer acquisition cost (CAC) and payback period." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How startups make money: models and metrics that matter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Common models include subscriptions (SaaS), usage‑based pricing, marketplace take rates, enterprise contracts, and ad‑supported freemium. What matters is not the label but whether unit economics improve with scale." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Retention and engagement:" }),
            " Do users keep using it each week/month?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Gross margin:" }),
            " Does margin improve as you grow?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "CAC and payback:" }),
            " How long to recover acquisition costs from gross profit?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "LTV vs CAC:" }),
            " Is lifetime value meaningfully higher than CAC?"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Run 10 short interviews with your target users this week" },
              { label: "Publish a landing page with a clear value proposition and email capture" },
              { label: "Ship a small prototype (or concierge version) and charge at least one customer" }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“The job of an early‑stage startup is to learn faster than the runway runs out. Prioritise the smallest experiments that create the most learning.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Set‑up basics in Australia (as at 2026)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is general information only. Always check official guidance and seek professional advice." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Structure:" }),
            " Sole trader vs Pty Ltd company. Many funded startups use a company for equity and ESOPs."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Registrations:" }),
            " ABN via the Australian Business Register; if incorporating, ACN and company setup via ASIC."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tax & payroll:" }),
            " Consider GST, PAYG, superannuation obligations, and bookkeeping from day one."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "IP & privacy:" }),
            " Protect key IP where sensible; follow Australian privacy law and sector‑specific rules."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Grants & incentives:" }),
            " Review the R&D Tax Incentive and relevant state programs on official sites."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Helpful starting points: ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://business.gov.au", target: "_blank", rel: "noopener noreferrer", children: "business.gov.au" }),
          ", ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://asic.gov.au", target: "_blank", rel: "noopener noreferrer", children: "asic.gov.au" }),
          ", ",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://abr.gov.au", target: "_blank", rel: "noopener noreferrer", children: "abr.gov.au" }),
          ", ",
          " ",
          "and your state’s startup agency (e.g., LaunchVic, Advance Queensland)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How long is a company a “startup”, and common risks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most teams stop calling themselves a startup once they achieve product–market fit and operate a repeatable growth engine. That often happens within 3–5 years, but timelines vary with markets and capital." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Top risks:" }),
            " building a solution without a painful problem; running out of capital; regulatory missteps; co‑founder misalignment; weak retention."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Mitigations:" }),
            " talk to users weekly, instrument the product, keep burn low, document co‑founder agreements with vesting, and set explicit milestones for each raise."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Turn curiosity into a small test" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you are unsure whether the startup path fits, run a one‑week test: speak with real users, draft a value proposition, and measure sign‑ups or pre‑orders. Treat the result as data for your next decision, not a verdict on you." }),
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
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "MLAI is a not‑for‑profit community based in Australia."
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
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
