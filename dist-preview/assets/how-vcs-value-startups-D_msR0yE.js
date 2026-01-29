import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
import { f as Link } from "./worker-entry-BTvr0DWh.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
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
const TOPIC = "How VCs value startups";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6";
const HERO_IMAGE_ALT = "Founders reviewing a cap table and metrics on paper and laptop";
const faqItems = [
  {
    id: 1,
    question: "What multiples do VCs use to value startups?",
    answer: "There is no single number. Investors triangulate comparable rounds and public comps, revenue quality (recurring vs services), growth and retention, gross margin, and capital efficiency (e.g., burn multiple). Ranges vary by sector and market conditions in Australia (as at 2026)."
  },
  {
    id: 2,
    question: "How are pre‑revenue startups valued?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Many use scorecard or Berkus‑style approaches that weight team, market size, product progress, defensibility, and early signals (waitlists, pilots). They anchor to recent seed rounds for similar companies, then adjust for risk." })
  },
  {
    id: 3,
    question: "What is the VC method in simple terms?",
    answer: "Investors work backwards from an expected exit value and target ownership, discount by risk and dilution, and derive a price that meets return goals (e.g., fund‑level targets)."
  },
  {
    id: 4,
    question: "Pre‑money vs post‑money: what is the difference?",
    answer: "Post‑money = pre‑money + new cash invested. Ownership sold = new cash ÷ post‑money. Some term sheets require an option pool increase “pre‑money”, which effectively reduces the founders’ stake at the headline price."
  },
  {
    id: 5,
    question: "Do SAFEs or convertible notes set valuation?",
    answer: "They defer valuation to a priced round. A valuation cap and/or discount sets the conversion price later. Be clear whether a SAFE is pre‑money or post‑money; the latter makes dilution easier to model."
  },
  {
    id: 6,
    question: "How do VCs treat AI‑specific factors (models, data, compute)?",
    answer: "Investors test whether you have durable advantage (data rights, distribution, workflow lock‑in), sustainable unit economics at inference scale, and a path to margin improvement (e.g., finetuning, batching, caching). “Model novelty” alone is rarely enough."
  },
  {
    id: 7,
    question: "Are Australian valuation norms different from the US?",
    answer: "Often, yes. Round sizes and prices can be more conservative, and capital efficiency is scrutinised. Global comps still matter, but Australian investors weigh local traction and runway discipline heavily (as at 2026)."
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "How do VCs value pre‑revenue startups?",
      description: "Scorecard/Berkus‑style factors (team, market, product progress) and comparable seed rounds; no single formula."
    },
    {
      label: "What multiples do VCs use in 2026 (Australia)?",
      description: "Sector‑dependent. SaaS often uses ARR multiples adjusted for growth, retention, margin, and efficiency; check local reports."
    },
    {
      label: "Do term‑sheet terms change valuation?",
      description: "Yes. Option pool expansions, liquidation preferences, and anti‑dilution can materially change effective price and ownership."
    }
  ]
};
function ArticlePage() {
  const breadcrumbs = [
    { label: "Home", href: "/", icon: House },
    { label: "Articles", href: "/articles" },
    { label: TOPIC, current: true }
  ];
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
        breadcrumbs,
        title: `${TOPIC} (2026)`,
        titleHighlight: TOPIC,
        headerBgColor: "purple",
        summary: summaryHighlights,
        heroImage: HERO_IMAGE,
        heroImageAlt: HERO_IMAGE_ALT
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:absolute lg:right-0 lg:top-0 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleTocPlaceholder, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: TOPIC }),
          " — If you are preparing a round in Australia, valuation is best understood as ownership math anchored by risk and traction. This guide covers the methods investors use in 2026, the metrics that move your multiple, and the term‑sheet mechanics that change the effective price. For broader context on local trends, browse ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", className: "underline underline-offset-4", children: "our articles" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleImageBlock,
          {
            src: HERO_IMAGE,
            alt: HERO_IMAGE_ALT,
            width: 1200,
            height: 630,
            containerClassName: "my-10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Valuation is ownership math, not an abstract number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Investors almost always start from target ownership and a risk‑adjusted view of outcomes. Post‑money equals pre‑money plus new capital; ownership sold equals new capital divided by post‑money. Pool expansions and preferences change the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "effective" }),
          " price you are accepting. Model valuation as a range, then check whether the round delivers enough runway and leaves founders with sufficient ownership for later stages."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            eyebrow: "Download",
            title: `Get the checklist for ${TOPIC}`,
            description: "Practical template to apply the concepts immediately.",
            buttonLabel: "Download now",
            buttonHref: "/resources",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCallout,
          {
            title: "Quick definitions VCs assume you know",
            variant: "brand",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "m-0 pl-5 list-disc", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                "Pre‑money: company value ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "before" }),
                " new cash."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Post‑money: pre‑money plus new cash (basis for ownership)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Option pool shuffle: increasing ESOP pre‑money dilutes founders, not new investors." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Liquidation preference: investors get their money back first; participation terms can materially alter outcomes." })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "The methods investors actually use" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f8f462e1-6a49-41eb-be0c-b37af381e970.jpg?alt=media&token=a20b6cfd-fb9d-4f79-beb0-58b6fb53c899", alt: "Team collaborating in a retro tech startup, showcasing 90s film aesthetics and innovative investment strategies.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No single model decides the price. Most rounds are triangulated across comparables, a VC‑method back‑solve, and qualitative risk adjustments. Here is how each lens is applied." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Comparable rounds and revenue multiples" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "For revenue‑stage companies—especially SaaS—investors benchmark against private rounds and public peers. They normalise for growth rate, net revenue retention, gross margin, and revenue quality (recurring vs services). Australian deals track global sentiment but typically give extra weight to capital efficiency." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "The VC method (target ownership and return math)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Funds back‑solve from plausible exits within their time horizon. They apply a target ownership percentage, consider dilution in future rounds, and ensure the entry price supports fund return goals. If the numbers do not work under conservative assumptions, price is revised—or the deal is passed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Scorecard and Berkus for pre‑revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Where financial signals are thin, investors weight factors such as team, market, product progress, defensibility, evidence of pull (pilots, waitlists), and route to market. These frameworks provide a disciplined way to compare early opportunities rather than a precise formula." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "DCF and hybrid models at later stages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Discounted cash flow is uncommon at seed, but later‑stage investors may use it alongside comps to sanity‑check assumptions about margins, customer lifetime, and cash generation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Metrics that move the multiple in 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ec1009d5-85f4-47eb-928a-31991f34a593.jpg?alt=media&token=e63fb825-b804-4671-90d5-f8820cb31e2a", alt: "Tech-savvy team collaborating in a vibrant 90s aesthetic, exploring metrics for startup growth in 2026.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The same headline ARR can command very different prices. Investors examine the health of growth and unit economics:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Growth durability: consistent net‑new revenue, not one‑off spikes." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Retention quality: strong logo retention and net revenue retention (expansion beats heavy discounting)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Gross margin: especially cloud and inference costs for AI; a plan to improve margins matters." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sales efficiency: payback period, sales cycle length, and a realistic pipeline." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Burn multiple: dollars burned to add a dollar of net‑new ARR; lower is better post‑PMF." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Revenue mix: higher recurring share and low services dependence earn better comps." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              "Map comps and set a valuation range (low, base, stretch).",
              "Assemble an investor‑grade metrics pack: cohorts, NRR, burn multiple, gross margin, and a simple funnel.",
              "Model ownership with terms: pool expansion, preferences, and future dilution; pick the minimum price you can accept."
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Evidence or expert insight", variant: "purple", children: "‘Valuation is a negotiation bounded by ownership targets and risk. The cleanest data wins the debate.’" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Australia‑specific context founders ask about" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "While global comps influence pricing, the local market in 2026 remains disciplined. Rounds often prioritise efficient growth and clear unit economics. For AI and data‑heavy products, Australian investors weigh privacy and data governance (e.g., obligations under the Privacy Act, overseen by the OAIC) alongside traction." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudienceGrid,
          {
            heading: "Who this helps",
            cards: [
              {
                title: "Founders & Teams",
                description: "Understand how pricing, terms, and runway interact before you negotiate.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6" }),
                variant: "orange"
              },
              {
                title: "Students & Switchers",
                description: "Learn how investors think: ownership math, comparables, and key metrics.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6" }),
                variant: "purple"
              },
              {
                title: "Community Builders",
                description: "Bring clarity to workshops on funding, valuation, and responsible AI.",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-6 w-6" }),
                variant: "yellow"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Term‑sheet levers that change the effective valuation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The headline price is only part of the story. Option pool expansions done pre‑money shift dilution to founders. Liquidation preferences (1x non‑participating vs participating) and anti‑dilution clauses change risk/return. Milestone tranches and pay‑to‑play provisions can reshape a round. Always model proceeds under downside and mid outcomes—not just the up case." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Turn valuation theory into a round you can close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Price within a justified range, prove the metrics, and keep the term sheet clean. A data‑tight narrative makes negotiation faster and builds trust. If you are early, emphasise the evidence you ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "do" }),
          " have (engaged pilots, fast cycles, or distribution advantages) and be explicit about how new capital converts into risk reduction."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create a comps table with 5–10 relevant peers and a low/base/stretch range." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Build an investor‑grade metrics pack (NRR, cohorts, burn multiple, gross margin)." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Model ownership and key terms; pressure‑test with 2–3 trusted mentors." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "Join the MLAI community to collaborate with fellow AI practitioners in Australia.",
            buttonText: "Connect with MLAI",
            buttonHref: "https://mlai.au/contact",
            note: "Community‑run; we aim to reply within 2 business days."
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArticleReferences,
        {
          heading: "Sources",
          description: "Selected resources to sanity‑check methods, metrics, and local context (as at 2026).",
          headingId: "references",
          references: [
            {
              id: 1,
              href: "https://www.scalevp.com/blog/the-burn-multiple",
              title: "The Burn Multiple",
              publisher: "Scale Venture Partners",
              category: "analysis",
              description: "A simple efficiency metric used widely to evaluate growth relative to cash burn."
            },
            {
              id: 2,
              href: "https://www.airtree.vc/open-source/metrics-that-matter",
              title: "Metrics that matter",
              publisher: "AirTree",
              category: "industry",
              description: "Operator‑friendly guide to core SaaS metrics used in fundraising."
            },
            {
              id: 3,
              href: "https://www.oaic.gov.au/privacy/the-privacy-act",
              title: "The Privacy Act (overview)",
              publisher: "OAIC",
              category: "government",
              description: "Australian privacy obligations relevant to data‑rich and AI startups."
            },
            {
              id: 4,
              href: "https://www.cutthrough.vc",
              title: "Australian Startup Funding (reports)",
              publisher: "Cut Through Venture",
              category: "analysis",
              description: "Independent reporting on Australian funding activity and round trends."
            },
            {
              id: 5,
              href: "https://gust.com/blog/berkus-method",
              title: "Berkus Method explained",
              publisher: "Gust",
              category: "guide",
              description: "Heuristic for valuing very early startups when revenue signals are limited."
            }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
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
