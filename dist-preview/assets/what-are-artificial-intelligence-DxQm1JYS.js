import { j as jsxRuntimeExports, F as ForwardRef$2 } from "./server-build-DGuowwjZ.js";
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
const TOPIC = "What is Artificial Intelligence (AI)?";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1767c4ce-112a-4466-b4b0-d421beb7e312.jpg?alt=media&token=b3ebd9d9-8bd4-4c62-a5e5-bbf3009e9d99";
const HERO_IMAGE_ALT = "Teal abstract network nodes representing AI connections";
const faqItems = [
  {
    id: 1,
    question: "What is artificial intelligence in simple terms?",
    answer: "Computer systems designed to perform tasks that usually require human intelligence — such as recognising patterns, understanding language, making decisions, or generating content."
  },
  {
    id: 2,
    question: "Is AI the same as machine learning?",
    answer: "No. AI is the broader field of building intelligent systems. Machine learning (ML) is a subset that learns patterns from data; deep learning is a further subset of ML using neural networks."
  },
  {
    id: 3,
    question: "What types of AI are used today?",
    answer: "Most real‑world systems are Narrow AI (task‑specific). Techniques include symbolic/rule‑based systems, traditional ML (supervised/unsupervised/reinforcement), and generative AI (models that create text, images, or code)."
  },
  {
    id: 4,
    question: "Where do I see AI in everyday life?",
    answer: "Spam filters, photo categorisation, voice assistants, predictive text, maps and routing, translation, fraud and anomaly detection, and increasingly, summarisation and drafting tools."
  },
  {
    id: 5,
    question: "Is AI safe and legal to use in Australia?",
    answer: "Yes, with safeguards. Follow your organisation’s policies, the Australian AI Ethics Principles (for responsible use), privacy law obligations (APPs), and secure‑by‑design guidance from cyber.gov.au."
  },
  {
    id: 6,
    question: "How can students or career‑changers get started in Australia?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Begin with a clear goal (e.g., data analysis or prototyping), learn basic Python/ML or prompt design, and build a small portfolio project. Connect with local peers — the MLAI community is a friendly place to start.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "https://mlai.au/contact", className: "font-semibold text-[--brand] underline-offset-4 hover:underline", children: "Say hello →" })
    ] })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).",
  items: [
    {
      label: "What is artificial intelligence in simple terms?",
      description: "Computer systems that perform tasks needing human intelligence—recognising patterns, understanding language, deciding or generating content."
    },
    {
      label: "How is AI different from machine learning?",
      description: "ML is a subset of AI that learns from data; AI is the broader field. Modern AI often uses ML and deep learning to build models."
    },
    {
      label: "Is AI safe and legal to use in Australia?",
      description: "Yes, with safeguards. Follow the Australian AI Ethics Principles, privacy law (APPs), and secure‑by‑design guidance from cyber.gov.au."
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
        "This guide is part of our broader series on the Australian AI ecosystem. Prefer to jump ahead?",
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
          " — In Australia, you’re already surrounded by AI, from spam filters and photo sorting to translation and safer payments. This explainer outlines what AI means in practice, how today’s systems work, the main types you’ll hear about (including generative AI), and the guardrails that matter locally."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageBlock, { src: HERO_IMAGE, alt: HERO_IMAGE_ALT, width: 1200, height: 630 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Artificial intelligence in plain English" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Artificial intelligence is the field of building systems that perform tasks we usually associate with human intelligence — recognising patterns, understanding or generating language, recommending options, or making decisions under uncertainty. Most AI in 2026 is ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "narrow" }),
          ": models are trained to do specific tasks very well (e.g., classify emails, draft a first pass of text) rather than possessing open‑ended general intelligence."
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Tip: start with the problem, not the model", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }), className: "not-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-gray-800", children: "Define the outcome and constraints (accuracy, privacy, latency, cost) before choosing a tool. This avoids chasing hype and helps you evaluate trade‑offs." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How AI works: data, models, training and inference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a60aeb05-b909-416f-840f-b541e8acfb2d.jpg?alt=media&token=80e76b0c-b68e-447e-ac59-f5c08a619336", alt: "People collaborating in a 90s tech startup, surrounded by computers, illustrating AI concepts and innovation.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Modern AI relies on data, algorithms and compute. During ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "training" }),
          ", a model learns patterns from examples (images, text, audio, tabular data). During ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "inference" }),
          ", the trained model applies what it learned to new inputs — classifying, predicting, or generating outputs. For generative models, prompts and safeguards (filters, retrieval, system instructions) shape behaviour."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Training, inference and prompts: a simple pipeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A typical flow: define the task → collect and prepare data (or use a pretrained model) → train or fine‑tune → evaluate on a held‑out set → deploy with monitoring and guardrails (rate limits, content filtering, human review where appropriate). For sensitive data, de‑identify where possible and follow privacy policies." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              { label: "Define the task and success measures (quality, safety, cost)." },
              { label: "Pick a baseline tool/model and trial with a small, de‑identified sample." },
              { label: "Measure results, document risks/safeguards, then iterate or pause." }
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Expert insight", variant: "purple", children: "“Small, well‑measured pilots beat big bang rollouts. Treat models as fallible teammates: verify outputs, log decisions, and keep a human in the loop for high‑impact tasks.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Types of AI you’ll hear about (including generative AI)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-46d58cee-3b92-47d5-8f37-3ca62b92e39a.jpg?alt=media&token=5fee8c5a-317d-4298-9326-628968754b2e", alt: "People collaborating in a retro tech startup setting, showcasing the rise of AI and innovation.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You’ll commonly see three practical buckets:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Symbolic / rule‑based systems:" }),
            " expert rules and knowledge graphs for transparent logic."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Machine learning:" }),
            " models learn from data (supervised, unsupervised, reinforcement). Deep learning uses neural networks for vision, speech and language."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Generative AI:" }),
            " models that produce text, images, audio or code. Useful for drafting, summarising and ideation, but outputs require review."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You may also see ‘narrow vs general AI’. Today’s tools are narrow and task‑specific. Be cautious with oversimplified taxonomies (e.g., “four types of AI” lists); they’re popular but not used by practitioners for system design." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "AI vs machine learning vs deep learning — what’s the difference?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "AI" }),
          " is the goal: systems that demonstrate useful intelligence. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Machine learning" }),
          " is a method for achieving that goal by learning patterns from data. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Deep learning" }),
          " is a subset of ML that stacks many layers (neural networks) to learn complex representations. In practice, when teams say “AI” today, they usually mean ML or deep learning models (including large language models for text)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where you’ll see AI in Australia today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Everyday examples include fraud detection in banking, routing and traffic prediction, assistive accessibility features (speech‑to‑text, captions), translation, document search with semantic retrieval, and drafting/summarisation in productivity tools. In industry, teams use computer vision for inspection, forecasting for supply chains, and chat interfaces for knowledge bases — all with oversight." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Risks, ethics and Australian guidance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Responsible use means understanding limitations, testing for bias, protecting privacy, and building secure systems. In Australia, teams commonly reference the Australian AI Ethics Principles (fairness, privacy, transparency, accountability), privacy obligations under the Australian Privacy Principles (APPs), and secure‑by‑design guidance from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "https://www.cyber.gov.au", target: "_blank", rel: "noreferrer", className: "underline underline-offset-4", children: "cyber.gov.au" }),
          ". For high‑impact use cases, keep humans in the loop and document decisions."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Turn curiosity into a small experiment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Pick one task where AI could remove friction — summarising internal notes, classifying tickets, or improving search. Run a time‑boxed pilot with clear success metrics, apply basic guardrails (privacy, safety checks), and review outcomes with your team. Simple, safe experiments build understanding faster than theory alone." }),
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
            buttonHref: "https://mlai.au/contact",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleReferences,
          {
            heading: "Sources",
            description: "Curated references for further reading (accessed Jan 2026).",
            headingId: "references",
            references: [
              {
                id: 1,
                href: "https://www.ibm.com/think/topics/artificial-intelligence",
                title: "What Is Artificial Intelligence (AI)?",
                publisher: "IBM",
                category: "guide",
                description: "Introductory overview and core concepts."
              },
              {
                id: 2,
                href: "https://en.wikipedia.org/wiki/Artificial_intelligence",
                title: "Artificial intelligence",
                publisher: "Wikipedia",
                category: "analysis",
                description: "Encyclopaedia‑style summary of history, approaches and applications."
              },
              {
                id: 3,
                href: "https://cloud.google.com/learn/what-is-artificial-intelligence",
                title: "What is Artificial Intelligence (AI)?",
                publisher: "Google Cloud",
                category: "guide",
                description: "High‑level explanation with contemporary examples."
              },
              {
                id: 4,
                href: "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/an-introduction-to-artificial-intelligence",
                title: "An introduction to artificial intelligence",
                publisher: "Cyber.gov.au",
                category: "government",
                description: "Australian secure‑by‑design perspective on AI systems."
              },
              {
                id: 5,
                href: "https://www.oaic.gov.au/privacy/the-privacy-act",
                title: "The Privacy Act",
                publisher: "OAIC",
                category: "government",
                description: "Privacy obligations relevant to handling personal information in Australia."
              }
            ]
          }
        )
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
