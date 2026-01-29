import { j as jsxRuntimeExports, c as clsx } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
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
const BADGE_VARIANTS = {
  // Reference badge colors only (AI, ML, Community, Australia)
  red: "bg-red-600 text-white",
  // AI
  purple: "bg-purple-600 text-white",
  // ML
  black: "bg-gray-900 text-white",
  // Community
  yellow: "bg-yellow-400 text-gray-900",
  // Australia
  // Legacy mappings for compatibility
  slate: "bg-gray-900 text-white",
  emerald: "bg-purple-600 text-white",
  sky: "bg-purple-600 text-white",
  blue: "bg-purple-600 text-white",
  indigo: "bg-purple-600 text-white",
  amber: "bg-yellow-400 text-gray-900",
  rose: "bg-red-600 text-white",
  orange: "bg-red-600 text-white",
  teal: "bg-purple-600 text-white"
};
function Badge({ variant = "slate", children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        BADGE_VARIANTS[variant],
        className
      ),
      children
    }
  );
}
const TONE_TO_VARIANT = {
  slate: "black",
  // gray → black
  emerald: "purple",
  // emerald → purple
  sky: "purple",
  // sky → purple
  blue: "purple",
  // blue → purple
  indigo: "purple",
  // indigo → purple
  amber: "yellow",
  // amber → yellow
  rose: "red",
  // rose → red
  purple: "purple"
  // purple → purple
};
const DEFAULT_TYPE_TONE = "yellow";
const DEFAULT_STATUS_TONE = "purple";
function normaliseBadge(badge, fallbackTone) {
  if (!badge) {
    return null;
  }
  if (typeof badge === "string") {
    return { label: badge, tone: fallbackTone };
  }
  return {
    label: badge.label,
    tone: badge.tone ?? fallbackTone
  };
}
function ArticleResourceList({
  items,
  className,
  itemClassName,
  defaultCtaLabel = "Open"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: clsx(
        "not-prose mt-3 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-300 bg-transparent",
        className
      ),
      children: items.map((item) => {
        const typeBadge = normaliseBadge(item.type, DEFAULT_TYPE_TONE);
        const statusBadge = normaliseBadge(item.status, DEFAULT_STATUS_TONE);
        const extraBadges = item.badges?.map(
          (badge) => normaliseBadge(badge, DEFAULT_TYPE_TONE)
        );
        const badges = [typeBadge, statusBadge, ...extraBadges ?? []].filter(
          (badge) => Boolean(badge?.label)
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: clsx(
              "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
              itemClassName
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 font-medium text-slate-900", children: item.label }),
                item.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-1 text-sm text-slate-700", children: item.description }) : null,
                badges.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: badges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: TONE_TO_VARIANT[badge.tone] || badge.tone,
                    children: badge.label
                  },
                  `${badge.label}-${badge.tone}`
                )) }) : null
              ] }),
              item.href ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: item.href,
                  target: item.openInNewTab === false ? void 0 : "_blank",
                  rel: item.openInNewTab === false ? void 0 : "noopener",
                  className: "inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700 sm:self-auto",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.ctaLabel ?? defaultCtaLabel }),
                    item.ctaIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", children: item.ctaIcon }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center self-start rounded-full border border-dashed border-slate-300 px-6 py-2 text-sm font-medium text-slate-500 sm:self-auto", children: item.ctaLabel ?? "Coming soon" })
            ]
          },
          item.href ?? item.label
        );
      })
    }
  );
}
const TOPIC = "How to price your product in Australia";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name;
const AUTHOR_ROLE = AUTHOR_PROFILE.role || "Lead Editor";
const AUTHOR_BIO = AUTHOR_PROFILE.bio || "Writer and operator focused on practical guidance for Australian teams.";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff729998-0ce9-4822-89af-11bca3c17257.jpg?alt=media&token=7ab776b3-d45c-4ff5-9679-b9b169949d94";
const HERO_IMAGE_ALT = "Team reviewing pricing scenarios on laptops and whiteboard";
const useCustomHeader = true;
const faqItems = [
  {
    id: 1,
    question: "What pricing methods work best for a new product in Australia?",
    answer: "Most teams blend cost-plus to set a floor, competitor benchmarks to stay market-relevant, and value-based pricing to capture willingness-to-pay. For regulated sectors, check ACCC guidance and any industry-specific price disclosure rules."
  },
  {
    id: 2,
    question: "How do I factor in GST when setting prices?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "If you are registered for GST, list prices as GST-inclusive for consumer products. For B2B, clearly state whether prices are GST exclusive or inclusive. Confirm obligations via the ATO and keep tax invoices compliant." })
  },
  {
    id: 3,
    question: "How can I test willingness-to-pay quickly?",
    answer: "Run 5–10 moderated interviews with live price cards, pair with a landing page smoke test offering 2–3 tiers, and track click-to-intent (e.g., waitlist or checkout starts). Use Van Westendorp or Gabor-Granger surveys for directional ranges."
  },
  {
    id: 4,
    question: "What are common mistakes first-time founders make with pricing?",
    answer: "Underpricing to chase adoption, ignoring unit economics, copying competitors without understanding their bundle, hiding fees that erode trust, and failing to revisit prices after costs or positioning change."
  },
  {
    id: 5,
    question: "How often should I review prices after launch?",
    answer: "Set a quarterly review to compare actual margins, churn drivers, and competitor moves. For subscription products, communicate changes at least 30 days ahead with clear rationale and alternatives."
  },
  {
    id: 6,
    question: "Does Australia have rules against misleading pricing?",
    answer: "Yes. ACCC enforces rules against drip pricing, fake discounts, and unfair contract terms. Display total prices clearly, avoid “was/now” claims without substantiation, and ensure any surcharges are disclosed upfront."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "How do I calculate a price floor from my costs?",
      description: "Add COGS, fulfilment, fees, GST position, and a target margin to avoid selling below contribution."
    },
    {
      label: "What do competitors charge for similar offers?",
      description: "Benchmark inclusions, contract terms, and surcharges to understand credible price bands."
    },
    {
      label: "How can I test willingness-to-pay quickly?",
      description: "Run price card interviews and a landing page A/B with two tiers, measuring conversion and churn risk."
    }
  ]
};
const resources = [
  {
    label: "ACCC pricing and advertising basics",
    description: "Official guidance on avoiding misleading pricing practices in Australia.",
    href: "https://www.accc.gov.au/business/pricing/price-displays",
    type: "Guide",
    status: "Official"
  },
  {
    label: "ATO GST overview for small business",
    description: "How GST applies to pricing, invoicing, and receipts.",
    href: "https://www.ato.gov.au/Business/GST",
    type: "Guide",
    status: "Official"
  }
];
function ArticlePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "article-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArticleHeroHeader,
      {
        breadcrumbs: [
          { label: "Home", href: "/", icon: House },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true }
        ],
        title: `${TOPIC} (2025)`,
        headerBgColor: "purple",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:text-gray-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
        " – Australian founders in 2025 are dealing with higher input costs, tighter capital, and sharper competition. Pricing is now a core product decision: it shapes margin, signals quality, and affects trust under ACCC scrutiny."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleImageBlock,
        {
          src: HERO_IMAGE,
          alt: HERO_IMAGE_ALT,
          width: 1200,
          height: 630,
          containerClassName: "my-8",
          imageClassName: "rounded-3xl"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Align unit economics before picking a price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with a clean unit economics model: cost of goods sold (COGS), payment fees, fulfilment, support time, and marketing cost to acquire a customer. Set a price floor that preserves contribution margin after discounts and taxes. For subscriptions, model churn and payback period; for physical goods, include returns and warranty provisions typical in Australia." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { variant: "orange", title: "Keep GST clarity", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💡" }), className: "my-6", children: "List consumer prices as GST-inclusive; for B2B, clearly mark if GST is excluded. Mislabelled pricing can breach ACCC guidance and frustrate customers." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Blend three signals: cost, value, and competition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1fc252f7-7e31-4949-b82f-a769e8a38b0e.jpg?alt=media&token=5035d3f2-0f1e-4a7a-b4cc-aeaa1c23b6cb",
          alt: "Nineties film-style scene of diverse individuals collaborating in a tech startup environment, blending strategy and innovation.",
          className: "w-full rounded-lg my-8"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use cost-plus to set the floor, competitor benchmarks to stay credible, and value-based pricing to capture willingness-to-pay. Map your value drivers (time saved, revenue gained, risk reduced) and translate them into outcomes that justify tiers. For competitors, note what is bundled, contract terms, and any surcharges to avoid underpricing." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Practical ways to test willingness-to-pay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Run live price card interviews (3–4 price points), set up a landing page A/B test with two tiers, and measure click-to-checkout starts. Supplement with Van Westendorp or Gabor-Granger surveys for range finding. Ensure each test has clear success metrics, like target conversion at a sustainable margin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleStepList,
        {
          title: "Rapid pricing validation sprint (7–10 days)",
          steps: [
            "Map costs and margin floor; define a “good, better, best” tier hypothesis.",
            "Interview 8–10 target customers with live price cards and capture objection themes.",
            "Run a landing page or in-product prompt with two price variants; track conversion and churn signals."
          ],
          accent: "indigo"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { variant: "purple", title: "Price is part of the product", children: "“A clear, honest price builds trust faster than a discount. Make the value story as deliberate as the feature roadmap.”" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleResourceCTA,
        {
          eyebrow: "Resources",
          title: "Get templates and checklists",
          description: "Download practical tools tailored to this topic.",
          buttonLabel: "Access resources",
          buttonHref: "#",
          accent: "purple"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleResourceList, { items: resources, className: "my-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Avoid ACCC red flags and build trust" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7b684cb0-5db8-4fea-a30b-3fb293c8f7d9.jpg?alt=media&token=3b298fff-9e6b-444a-adfe-f792464e6f1f",
          alt: "Tech professionals collaborate in a vibrant 90s startup office, embodying innovation and trust-building strategies.",
          className: "w-full rounded-lg my-8"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Australian consumers expect transparent pricing. Avoid drip pricing (hidden fees revealed late), misleading “was/now” comparisons, and unfair contract terms. If you surcharge for payment methods or shipping, disclose them upfront. For subscriptions, provide clear renewal terms and easy cancellation paths that work on mobile." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "When and how to adjust prices after launch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Review pricing quarterly against margin, churn, and competitor moves. If you raise prices, give at least 30 days’ notice, explain the value delivered, and offer options (grandfathering, annual discounts, or feature-limited plans). For physical products, consider price locks for pre-orders and communicate currency or freight volatility transparently." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleCompanyCTA,
        {
          title: `Need help with ${TOPIC}?`,
          body: "Get practical recommendations based on your goals, time, and experience level.",
          buttonText: "Get recommendations",
          buttonHref: "#",
          note: "You can filter by topic, format (online/in‑person), and experience level."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AuthorBio,
        {
          author: {
            name: AUTHOR,
            role: AUTHOR_ROLE,
            bio: AUTHOR_BIO,
            avatarUrl: AUTHOR_AVATAR
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, {})
    ] }) })
  ] });
}
export {
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
