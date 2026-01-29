import { j as jsxRuntimeExports, F as ForwardRef$2, A as ArticleDisclaimer } from "./server-build-DGuowwjZ.js";
import { A as ArticleHeroHeader, a as ArticleTocPlaceholder, b as ArticleImageBlock, Q as QuoteBlock, c as ArticleFAQ, d as AuthorBio, e as ArticleFooterNav } from "./ArticleTocPlaceholder-Do4c2OpE.js";
import { A as ArticleStepList, a as ArticleCompanyCTA } from "./ArticleStepList-BURYQrdD.js";
import { A as AudienceGrid, F as ForwardRef } from "./AudienceGrid-Cv0i5y2N.js";
import { A as ArticleResourceCTA } from "./ArticleResourceCTA-PGgKzCy1.js";
import { A as ArticleCallout, M as MLAITemplateResourceCTA } from "./MLAITemplateResourceCTA-BdznCDV4.js";
import { A as ArticleReferences } from "./ArticleReferences-HQ7rjtnV.js";
import { g as getDefaultArticleAuthorDetails } from "./authors-DzySQTZP.js";
import { H as House } from "./house-C2Qzo5EV.js";
import { F as ForwardRef$1 } from "./AcademicCapIcon-CU_w7ImP.js";
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
const useCustomHeader = true;
const TOPIC = "How does machine learning work?";
const CATEGORY = "learn-ai";
const SLUG = "how-does-machine-learning-work";
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails();
const AUTHOR = AUTHOR_PROFILE.name ?? "Dr Sam Donegan";
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? "Founder";
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? "";
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d0945aa1-ae80-4b0e-80e7-40e1f2141e50.jpg?alt=media&token=2c38a5f5-d083-443b-8b43-c4aa54e1aa95";
const HERO_IMAGE_ALT = "Abstract visual of data flowing through a neural network diagram";
const faqItems = [
  {
    id: 1,
    question: "What does “training a model” actually do?",
    answer: "Training adjusts numeric parameters so the model makes better predictions on examples. An optimiser (often gradient descent) reduces a loss function that measures how wrong the model is. The model is validated on a hold-out set to ensure it generalises."
  },
  {
    id: 2,
    question: "How much data do I need to start?",
    answer: "For tabular problems, hundreds to a few thousand labelled rows can be enough for a useful baseline (quality beats quantity). Deep learning typically needs far more data, but transfer learning can reduce data needs."
  },
  {
    id: 3,
    question: "Is ML the same as AI or deep learning?",
    answer: "AI is the broad field. Machine learning is a subset focused on learning from data. Deep learning is a subset of ML that uses neural networks with many layers."
  },
  {
    id: 4,
    question: "What is overfitting and how do I avoid it?",
    answer: "Overfitting happens when a model memorises training data but fails on new data. Use validation splits, cross-validation, regularisation (e.g., L1/L2, dropout), early stopping, and simpler models as baselines."
  },
  {
    id: 5,
    question: "Do I need a GPU?",
    answer: "Not for most classical ML (logistic regression, trees, ensembles). GPUs help with deep learning and very large models. For many Australian teams, CPU-first baselines are faster and cheaper to start with."
  },
  {
    id: 6,
    question: "What should I know about Australian privacy rules?",
    answer: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "In Australia, the Australian Privacy Principles (APPs) set expectations for collecting, using and storing personal information. Use only what you need, obtain consent where required, and implement safeguards. See the OAIC for current guidance." })
  }
];
const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: "In Australia (2026), most real-world ML starts with a supervised baseline, uses a clear evaluation metric, and keeps a held-out test set. Privacy obligations under the Australian Privacy Principles apply when data includes personal information.",
  items: [
    {
      label: "How do machines learn from data?",
      description: "By adjusting model parameters to minimise a loss on labelled examples, validated on a hold‑out set."
    },
    {
      label: "How much data do I need for machine learning?",
      description: "Hundreds–thousands of rows can start a tabular baseline; deep learning often needs far more. Quality beats quantity."
    },
    {
      label: "What’s the difference between supervised and unsupervised learning?",
      description: "Supervised learns from labelled inputs/outputs; unsupervised finds structure without labels; RL learns via rewards."
    }
  ]
};
const references = [
  {
    id: 1,
    href: "https://mitsloan.mit.edu/ideas-made-to-matter/machine-learning-explained",
    title: "Machine learning, explained",
    publisher: "MIT Sloan",
    description: "Plain-language overview of machine learning, use cases and limitations.",
    category: "guide"
  },
  {
    id: 2,
    href: "https://www.ibm.com/think/topics/machine-learning",
    title: "What is Machine Learning?",
    publisher: "IBM",
    description: "Introductory reference covering core ML concepts and techniques.",
    category: "guide"
  },
  {
    id: 3,
    href: "https://www.oaic.gov.au/privacy/the-privacy-act/australian-privacy-principles",
    title: "Australian Privacy Principles",
    publisher: "OAIC (Office of the Australian Information Commissioner)",
    description: "Foundational privacy obligations in Australia relevant to data use in ML.",
    category: "government"
  },
  {
    id: 4,
    href: "https://www.industry.gov.au/publications/australias-ai-ethics-principles",
    title: "Australia's AI Ethics Principles",
    publisher: "Department of Industry, Science and Resources",
    description: "High-level principles for safe and responsible AI in Australia.",
    category: "government"
  }
];
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
          " — In simple terms, ML finds patterns in data by optimising a model to minimise error on examples. Below is a practical, evidence‑based walkthrough of how the learning loop works, the main learning types, how to evaluate models, and what to watch for in an Australian context."
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "From data to predictions: the training loop in plain English" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every ML project follows a similar rhythm: define a target, collect and prepare data, split it into training/validation/test sets, train a model by minimising a loss function, and check that it generalises. The goal is not to memorise training examples but to make reliable predictions on new data." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A typical flow: (1) frame the problem and choose a metric (e.g., F1 for imbalanced classification), (2) assemble features and labels, (3) split data into train/validation/test (e.g., 70/15/15), (4) pick a simple baseline (logistic regression or a small tree), (5) train by minimising loss, (6) tune hyperparameters against validation performance, (7) lock down a final model, and (8) evaluate once on the unseen test set to estimate real‑world performance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleResourceCTA,
          {
            eyebrow: "Download",
            title: `Get the checklist for ${TOPIC}`,
            description: "Practical template to apply the concepts immediately.",
            buttonLabel: "Download now",
            buttonHref: "#",
            accent: "purple"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCallout, { title: "Choose a metric upfront", variant: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }), children: "Deciding on one primary metric before training prevents “metric shopping”. For class‑imbalanced problems (common in fraud or defect detection), prefer recall, precision, or F1 over raw accuracy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Learning paradigms compared: supervised, unsupervised, reinforcement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e0b765e6-f0cb-460a-b584-9c8168004781.jpg?alt=media&token=8b18c4f6-d9b1-4c24-ad76-3670eb3ce4dc", alt: "Group of diverse individuals brainstorming in a retro tech startup environment, embodying 90s film aesthetic.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Supervised learning uses labelled examples (inputs with known outputs). It includes regression (predicting a number) and classification (predicting a category). Unsupervised learning has no labels and focuses on structure discovery (clustering, dimensionality reduction). Reinforcement learning optimises actions via rewards across time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Related approaches you may encounter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Semi‑supervised learning mixes small amounts of labelled data with large unlabelled sets. Self‑supervised learning generates labels from data itself (popular in deep learning pretraining). Transfer learning reuses knowledge from one task/domain to another." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleStepList,
          {
            title: "Practical steps",
            steps: [
              "Define the outcome and a single success metric",
              "Prepare features/labels and create a robust train/validation/test split",
              "Train a simple baseline and iterate only if it underperforms"
            ],
            accent: "indigo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteBlock, { title: "Evidence or expert insight", variant: "purple", children: "“A strong baseline plus a clean validation split beats a complex model with a leaky evaluation almost every time.”" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Avoiding overfitting: validation, cross‑validation and regularisation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-847fc0de-6d61-40ec-aa2c-403bd460930a.jpg?alt=media&token=2ccf6c36-50cc-4130-8059-3b6ea7df56c4", alt: "People collaborating in a tech startup, surrounded by retro 90s film aesthetic and modern gadgets.", className: "w-full rounded-lg my-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Overfitting appears when a model captures noise instead of signal. Symptoms include excellent training metrics but poor validation/test performance. Remedies: keep a held‑out validation set, use k‑fold cross‑validation when data is scarce, apply regularisation (L1/L2, dropout for neural networks), and stop training when validation loss plateaus (early stopping)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Start with the simplest model that can possibly work. If a complex model beats the baseline, verify the improvement with cross‑validation and an untouched test set. Measure variance across folds to understand stability." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Metrics that matter: classification vs regression" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Choose metrics that reflect your risk profile. Classification: use precision, recall, F1, ROC‑AUC, and confusion matrices. For imbalanced data (e.g., rare failures), threshold selection and Precision‑Recall AUC are more informative than accuracy. Regression: MAE (robust to outliers), RMSE (penalises large errors), and R² (explained variance). Consider calibration if predicted probabilities drive decisions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Data readiness and privacy in Australia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "High‑quality, well‑labelled data consistently outperforms clever modelling on messy data. Standardise definitions, document lineage, handle missing values explicitly, and watch for leakage (features that wouldn’t exist at prediction time). Keep preprocessing steps in code/pipelines so they can be reproduced in deployment." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If personal information is involved, the Australian Privacy Principles (APPs) apply. Collect only what you need, get consent where required, and de‑identify where possible. Ensure secure storage, access controls, and retention policies aligned to the stated purpose. For sensitive data (health, financial), seek formal guidance and approvals before use." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Classic ML vs deep learning: when to use which" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Classical techniques (linear/logistic regression, decision trees, random forests, gradient‑boosted trees, SVMs) often excel on tabular data with modest size and provide faster iteration plus interpretability. Deep learning shines in perception tasks (vision, audio), sequence modelling (NLP, time series), and representation learning at scale, but usually demands more data, compute, and careful training." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In practice, start with classical ML, establish a baseline and data pipeline, then move to deep learning when you have a clear shortfall and sufficient data/compute." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "From notebook to production: deployment, monitoring and drift" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Shipping an ML model means packaging preprocessing and the model together, exposing an interface (batch job or API), and monitoring live performance. Track latencies, error rates, data schema changes, and metric drift. Re‑evaluate periodically with fresh labels; if behaviour shifts (seasonality, new user cohorts), retrain or recalibrate. Maintain versioned artifacts, training code, and a model card describing intended use, data sources, and known limits." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Make it real: start small and iterate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The fastest way to learn ML is to ship a tiny, safe pilot. Solve a narrow problem with measurable value, adopt a simple baseline, and build evaluation into the workflow from day one. Keep ethics and privacy in view, especially when handling Australian personal information." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "Your Next Steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download the checklist mentioned above." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Define one success metric and build a simple baseline." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600", children: "3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Review privacy considerations if data includes personal information (APPs)." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCompanyCTA,
          {
            title: `Need help with ${TOPIC}?`,
            body: "MLAI is a not‑for‑profit community empowering the Australian AI community. Connect with peers, find events, and learn together.",
            buttonText: "Get recommendations",
            buttonHref: "/contact",
            note: "You can filter by topic, format (online/in‑person), and experience level."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudienceGrid,
          {
            heading: "Who this helps",
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
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MLAITemplateResourceCTA, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleDisclaimer, { className: "mt-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleReferences, { references }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFAQ, { items: faqItems }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthorBio, { author: authorDetails }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleFooterNav, { backHref: "/articles", topHref: "#" })
    ] })
  ] });
}
export {
  CATEGORY,
  SLUG,
  ArticlePage as default,
  faqItems,
  summaryHighlights,
  useCustomHeader
};
