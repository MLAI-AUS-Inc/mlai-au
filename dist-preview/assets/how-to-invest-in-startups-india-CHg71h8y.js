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
const TOPIC = "How to invest in startups in India";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d9db90bd-d13c-4341-8e0f-63edaee6e06b.jpg?alt=media&token=016de48a-97df-47bf-aba5-e09e564b9cfe";
const HERO_IMAGE_ALT = "Team collaborating on laptops with an India–Australia connection motif";
const faqItems = [
  {
    id: 1,
    question: "Can Australians legally invest in Indian startups?",
    answer: "Yes. Foreign investment into most tech/services startups is generally permitted under India’s FDI policy (automatic route), subject to sector-specific rules. Use compliant channels (SEBI-registered funds, reputable syndicates) and ensure the Indian company files required RBI/FEMA paperwork. This is general information, not financial advice."
  },
  {
    id: 2,
    question: "Do I need an Indian PAN or bank account to invest?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Not always. Many funds/syndicates onboard foreign investors with passport KYC and source-of-funds checks, and accept international transfers. Some AIFs or administrators may request a PAN for tax reporting. Confirm onboarding requirements with the platform. See the ATO for Australian tax obligations:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.ato.gov.au/individuals/investments-and-assets/capital-gains-tax", target: "_blank", rel: "noreferrer noopener", children: "ATO CGT guidance" }),
      "."
    ] })
  },
  {
    id: 3,
    question: "What is the usual minimum cheque size?",
    answer: "It varies by route. Syndicates often allow smaller cheques than funds. SEBI-registered AIFs typically require higher minimum commitments. Ask each platform/fund for current minimums and fees."
  },
  {
    id: 4,
    question: "Are SAFEs used in India?",
    answer: "You may see iSAFE notes (an India-adapted SAFE), convertible notes for DPIIT-recognised startups, or CCPS (preferred shares). Terms differ from US/AU. Read the instrument, ask how and when it converts, and confirm investor protections."
  },
  {
    id: 5,
    question: "Will I pay tax in both Australia and India?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Potentially. Australia generally taxes capital gains on your worldwide assets. Indian taxes may apply depending on the instrument and exit. The India–Australia tax treaty may allow credits. Seek registered tax advice. References:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.ato.gov.au/individuals/international-tax-for-individuals/foreign-income", target: "_blank", rel: "noreferrer noopener", children: "ATO: Foreign income" }),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.incometaxindia.gov.in/", target: "_blank", rel: "noreferrer noopener", children: "Income Tax India" }),
      "."
    ] })
  },
  {
    id: 6,
    question: "Which sectors are restricted for foreign investment?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "India’s FDI policy lists sectors with caps or approval requirements (e.g., certain defence, telecom, media). Most software/services startups are under the automatic route, but always check the latest policy. See DPIIT’s FDI resources:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://dpiit.gov.in/foreign-direct-investment", target: "_blank", rel: "noreferrer noopener", children: "DPIIT FDI policy" }),
      "."
    ] })
  },
  {
    id: 7,
    question: "Is this financial advice?",
    answer: "No. This article provides general information only (as at Jan 2026). It is not financial, legal, or tax advice. Speak with licensed advisers in Australia and India for your situation."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "Can foreigners invest in Indian startups?",
      description: "Yes. Most tech/services sectors allow FDI via the automatic route; invest through SEBI‑registered funds or compliant direct rounds and check FEMA/sector rules."
    },
    {
      label: "How can I invest from Australia?",
      description: "Common routes: join a syndicate (SPV), commit to a SEBI‑registered AIF, or invest directly in a priced/convertible round. Complete KYC and follow platform instructions."
    },
    {
      label: "Do Australians pay tax on exits?",
      description: "Usually yes in Australia (CGT on global assets). Indian taxes may apply too; the India–Australia treaty may provide credits. Get licensed advice."
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
          " — If you are an Australian angel, operator, or learner exploring India, this evidence-forward overview covers the main routes, onboarding, documents, and risks you will encounter. As at Jan 2026. General information only."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Can foreigners invest in Indian startups?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yes—subject to sector rules. Under India’s foreign investment framework (FEMA) and FDI policy, most software and services startups can take foreign investment via the automatic route. Practically, you will complete KYC and fund a bank transfer, and the Indian company (or fund/SPV) handles regulatory filings (e.g., post-allotment reporting through its authorised dealer bank). Avoid restricted sectors and confirm the route is compliant before wiring funds." }),
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
            title: "Start where compliance is handled",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            className: "not-prose",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "For a first cheque, use a reputable syndicate or SEBI-registered fund that manages KYC, custody, FX, and filings. You get diversification and fewer admin surprises." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Syndicates, AIFs, or direct — which route suits you?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7945cbb4-d987-4203-8bde-a6686cd6974c.jpg?alt=media&token=fe34313b-85af-45a5-9cf5-5007505a8655", alt: "Tech-savvy entrepreneurs collaborate in a retro 90s film aesthetic, exploring investment routes for startups.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australians typically choose between three pathways. The right option depends on cheque size, time commitment, and your comfort with India-specific paperwork." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Syndicates (platform-led SPVs)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Good for smaller, opportunistic cheques. Platforms like AngelList India coordinate KYC, carry, and allocations via SPVs/vehicles. Expect deal-by-deal access and lightweight admin; your diligence relies on the lead’s thesis and track record." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "SEBI-registered AIFs (funds)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Better for portfolio construction and professional governance. Minimum commitments are usually higher and calls occur over time. Review the fund’s strategy, fee stack, compliance, and audit history." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Direct rounds (priced or convertible)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Highest control, highest admin. You will negotiate terms, review company filings, and coordinate bank remittance details. Ensure the company’s counsel confirms the instrument and filings are FEMA-compliant." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "KYC, PAN, and bank accounts — what Australians need" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-586beed3-c329-4afe-92f6-21f6ad0243bc.jpg?alt=media&token=543b0255-4a1a-482a-a09f-ce8626f92df8", alt: "People in a tech startup setting, discussing KYC, PAN, and banking essentials for Australians, 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Onboarding is similar to other private-market platforms, with India-specific nuances:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification: passport and address documents; sometimes a short investor questionnaire and source-of-funds proof." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "PAN: some fund administrators request a PAN for tax reporting; others can onboard foreign investors without it. Confirm before you start." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bank: you typically do not need an Indian bank account; international transfers via your Australian bank are common for funds/SPVs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Documentation: be prepared for notarised/attested copies depending on the platform’s compliance policy." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Term sheets and instruments you will see in India" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Early-stage rounds commonly use iSAFE notes (an India-adapted SAFE), convertible notes (especially for DPIIT-recognised startups), and CCPS (compulsorily convertible preference shares) for priced rounds. Key questions to ask:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "When and how does the instrument convert? What triggers (next round, time, milestones)?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "What investor protections apply (pro-rata, MFN, information rights)?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Who pays stamp duty or other local costs? How is FX handled at conversion or exit?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Pick your route (syndicate, AIF, or direct) and shortlist one platform/fund." },
              { label: "Complete KYC early; ask about PAN needs, wiring, and expected timelines." },
              { label: "Start with a small cheque, then review portfolio reporting and cadence." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "‘In cross-border angel deals, structure and process matter more than headline valuation. Fewer surprises beats perfect pricing.’" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Tax and currency — high-level notes for Australians (not advice)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australia generally taxes capital gains on worldwide assets; India may also levy tax depending on the instrument and exit. The India–Australia tax treaty may allow credits. FX adds another layer of risk and timing considerations (remittance cut-offs, bank fees). As at Jan 2026, confirm details with registered tax advisers in both countries and review the latest from regulators (ATO, RBI, SEBI)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Due diligence checklist for India early-stage deals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Lead and co-investor quality: track record, ownership after round, and alignment." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Regulatory fit: sector under automatic route; company counsel confirms FEMA/FDI compliance." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Cap table hygiene: ESOP pool, prior instruments, and any outstanding filings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Runway and use of funds: months of runway post-close and key milestones." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reporting cadence: frequency, metrics shared, and access to management." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Exit pathways: follow-on appetite, local/global acquirers, and governance." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Make a micro‑commitment, then learn and scale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Treat your first allocation as a learning loop: start small, verify the back-office experience, and tighten your thesis with real portfolio data. If you prefer community learning, connect with local builders and investors through MLAI." }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleReferences,
        {
          heading: "Sources",
          description: "Curated references for further reading (as at Jan 2026).",
          headingId: "references",
          references: [
            {
              id: 1,
              href: "https://dpiit.gov.in/foreign-direct-investment",
              title: "Foreign Direct Investment policy",
              publisher: "DPIIT (Government of India)",
              category: "government",
              description: "Official FDI policy, including sector caps and approval routes."
            },
            {
              id: 2,
              href: "https://www.sebi.gov.in/legal/regulations/jun-2012/sebi-alternative-investment-funds-regulations-2012-last-amended-on-january-23-2024-_77238.html",
              title: "SEBI Alternative Investment Funds Regulations, 2012 (as amended)",
              publisher: "SEBI",
              category: "government",
              description: "Regulatory framework for AIFs in India."
            },
            {
              id: 3,
              href: "https://www.rbi.org.in/",
              title: "Reserve Bank of India (RBI) – FEMA and foreign investment resources",
              publisher: "RBI",
              category: "government",
              description: "Rules and FAQs on foreign exchange and investment filings."
            },
            {
              id: 4,
              href: "https://www.ato.gov.au/individuals/investments-and-assets/capital-gains-tax",
              title: "Capital gains tax (CGT)",
              publisher: "Australian Taxation Office",
              category: "government",
              description: "Australian guidance on CGT for investments and assets."
            },
            {
              id: 5,
              href: "https://www.angellistindia.com/",
              title: "AngelList India",
              publisher: "AngelList India",
              category: "industry",
              description: "Platform overview for startup investing in India."
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
