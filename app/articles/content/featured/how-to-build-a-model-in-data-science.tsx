import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to build a model in data science'
export const CATEGORY = 'ai-careers-australia' // e.g. 'ai'
export const SLUG = 'how-to-build-a-model-in-data-science'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-24'
export const DATE_MODIFIED = '2026-01-24'
export const DESCRIPTION = 'A practical, AU‑focused guide to framing problems, preparing data, selecting algorithms, training, evaluating, deploying and monitoring models — with privacy and governance in mind.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e50e5db0-d45f-42af-bbe1-fa732bdd1ffb.jpg?alt=media&token=cee71a66-a4bf-48d9-81b0-a662965f714a"
const HERO_IMAGE_ALT = 'Abstract graph, code and network lines representing data science model building'
export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'What is the standard workflow to build a data science model?',
    answer:
      'Define the problem and metric → gather/assess data and consent → split data → engineer features → pick a baseline and shortlist models → train/tune with cross‑validation → evaluate against a hold‑out/test set → check fairness/robustness/privacy → package, deploy and monitor.'
  },
  {
    id: 2,
    question: 'How much data do I need?',
    answer:
      'Enough to represent the real‑world variability you expect in production. For tabular classification/regression, hundreds to thousands of rows can work with regularisation; for high‑variance or deep learning problems, you typically need orders of magnitude more. Always measure learning curves to decide empirically.'
  },
  {
    id: 3,
    question: 'What train/validation/test split should I use in practice?',
    answer:
      'Common choices are 60/20/20 or 70/15/15 with stratification for classification. Many teams use 80/20 plus cross‑validation. For time series, avoid random splits: use time‑ordered validation (walk‑forward/rolling windows).'
  },
  {
    id: 4,
    question: 'How do I avoid data leakage?',
    answer: (
      <>
        <ul>
          <li>Perform all preprocessing (imputation, scaling, encoding) inside the CV folds, not before.</li>
          <li>Keep test data completely untouched for final evaluation.</li>
          <li>For time series, never use future information (look‑ahead).</li>
        </ul>
      </>
    )
  },
  {
    id: 5,
    question: 'Can I use overseas cloud services with Australian personal data?',
    answer:
      'Often yes, but you remain responsible under the Privacy Act 1988 (APP 8) for overseas disclosures. Check your organisation’s data governance, OAIC guidance, contract terms (location, sub‑processors), and apply de‑identification where appropriate. This is general information, not legal advice.'
  },
  {
    id: 6,
    question: 'What counts as a “good” model?',
    answer:
      'A model that meets a business‑relevant metric on unseen data, is stable over time, fair across key cohorts, explainable enough for its risk level, and is operable (versioned, monitored, reproducible). Benchmarks and error budgets should be agreed with stakeholders.'
  },
  {
    id: 7,
    question: 'How often should we retrain?',
    answer:
      'Base this on drift and performance thresholds. Many teams check weekly, retrain monthly/quarterly, and hot‑fix when metrics breach agreed SLOs. Time‑sensitive domains (fraud, demand) may need more frequent updates.'
  },
  {
    id: 8,
    question: 'Which tools should I learn in 2026 for tabular ML?',
    answer: (
      <>
        <ul>
          <li>Python with pandas, scikit‑learn, XGBoost/LightGBM for modelling.</li>
          <li>MLflow or Weights & Biases for experiment tracking.</li>
          <li>Docker for packaging; a deployment target (e.g., FastAPI, SageMaker, Vertex, Azure ML).</li>
        </ul>
      </>
    )
  }
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'As at Jan 2026 in Australia: build models with a clear success metric, respect privacy (OAIC APPs), and design for monitoring from day one. Start simple, validate rigorously, and document decisions.',
  items: [
    {
      label: 'What are the steps to build a data science model?',
      description: 'Define the metric, gather and assess data, split and engineer features, baseline and shortlist algorithms, train/tune with CV, evaluate on a hold‑out set, check fairness/privacy, deploy and monitor.'
    },
    {
      label: 'How should I split my data?',
      description: 'Commonly 80/20 with cross‑validation or 70/15/15. Stratify for classification; for time series use time‑ordered (walk‑forward) splits—never random.'
    },
    {
      label: 'Which metric should I use?',
      description: 'Classification: ROC‑AUC/F1 (imbalanced). Regression: MAE/RMSE. Time series: sMAPE/MASE. Match the metric to business cost and risk.'
    }
  ]
}

const references = [
  {
    id: 1,
    href: 'https://www.oaic.gov.au/privacy/australian-privacy-principles',
    title: 'Australian Privacy Principles (APPs)',
    publisher: 'Office of the Australian Information Commissioner (OAIC)',
    description:
      'Legal principles for handling personal information in Australia, including overseas disclosure and security obligations.',
    category: 'government'
  },
  {
    id: 2,
    href: 'https://www.industry.gov.au/publications/australias-ai-ethics-principles',
    title: "Australia's AI Ethics Principles",
    publisher: 'Department of Industry, Science and Resources',
    description:
      'Voluntary principles to guide the design, development and use of AI in Australia (human‑centred values, fairness, privacy, transparency).',
    category: 'government'
  },
  {
    id: 3,
    href: 'https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html',
    title: 'Choosing the right estimator (scikit‑learn map)',
    publisher: 'scikit‑learn',
    description: 'Practical guide to selecting estimators by problem type; includes links to model evaluation docs.',
    category: 'guide'
  },
  {
    id: 4,
    href: 'https://mlflow.org/docs/latest/tracking.html',
    title: 'MLflow Tracking',
    publisher: 'MLflow',
    description: 'Experiment tracking to keep runs, parameters, metrics and artifacts reproducible across environments.',
    category: 'industry'
  },
  {
    id: 5,
    href: 'https://www.nist.gov/itl/ai-risk-management-framework',
    title: 'AI Risk Management Framework (RMF) 1.0',
    publisher: 'NIST',
    description:
      'Risk‑based approach to trustworthy AI, including measurement and governance practices that complement model development.',
    category: 'analysis'
  }
]

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true }
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-white">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="relative">
        <div className="lg:absolute lg:right-0 lg:top-0 lg:w-72">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
          <p>
            <strong>{TOPIC}</strong> — This guide focuses on what actually moves the needle: defining a measurable outcome, structuring your data pipeline, validating choices with evidence, and shipping a model you can monitor. It reflects Australian expectations around privacy and responsible AI as at Jan 2026.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          <h2>From question to metric: agree the success target and constraints</h2>
          <p>
            Start by writing the problem in one sentence: who is affected, what decision is supported, and how success will be measured. Translate that into a model objective (classification, regression, ranking, time series) and a primary metric with an acceptable threshold. Capture constraints: latency, interpretability, fairness requirements, privacy limits, budget, and the rollout path (pilot → production).
          </p>
          <h3>Choose metrics that match the risk and decision</h3>
          <p>
            Classification often uses ROC‑AUC for ranking and F1 for imbalanced decisions; regression uses MAE/RMSE; time series focuses on sMAPE/MASE and stability over horizons. For high‑stakes use cases, prefer calibrated probabilities, cost‑sensitive metrics, and confidence intervals.
          </p>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout title="Set the guardrails early" variant="brand" icon={<span className="text-xl">💡</span>}>
            Write down: the primary metric and target, error budgets, fairness cohorts to monitor, and any hard compliance constraints (e.g., no overseas data transfer or latency &lt; 200ms). These notes become your model card and review artefacts.
          </ArticleCallout>

          <h2>Source, consent and access: data you can legally use in Australia</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8d394a69-02ba-4edd-b74c-93830c2848c8.jpg?alt=media&token=688e9776-b173-4ff3-a2fa-90c9c53699f0" alt="Diverse team collaborating in a tech startup, surrounded by retro 90s decor and modern technology." className="w-full rounded-lg my-8" />

          <p>
            Before modelling, confirm your data rights. Under the Privacy Act 1988 and the Australian Privacy Principles (APPs), organisations must collect, use and disclose personal information lawfully and securely. If data leaves Australia, APP 8 (overseas disclosure) makes you responsible for ensuring equivalent protections. De‑identify where feasible, minimise fields, and document consent or lawful basis.
          </p>
          <p>
            Operationally, set up read‑only access, data dictionaries, and quality checks (missingness, duplicates, drift against prior snapshots). Prefer reproducible extracts or feature stores so training and inference read the same definitions.
          </p>

          <h2>Prepare features and create robust splits</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-61aaf0bc-018e-4cec-94f1-7bb9e918aaa1.jpg?alt=media&token=fa15b645-9f31-477f-87c0-428c7af9cbed" alt="Tech professionals brainstorming in a vibrant 90s film aesthetic, embodying startup culture and innovation." className="w-full rounded-lg my-8" />

          <p>
            Build a pipeline that imputes, encodes and scales within cross‑validation folds to avoid leakage. For classification, stratify splits; for time series, use rolling or walk‑forward validation. Keep a final, untouched test set for a single, honest estimate.
          </p>
          <h3>Typical split patterns</h3>
          <p>
            Many teams use 80/20 with k‑fold CV on the 80%. Alternatives: 70/15/15 (train/val/test) or nested CV for small datasets. For events over time, adopt expanding windows so the model never sees the future.
          </p>

          <h2>Pick a baseline and shortlist algorithms</h2>
          <p>
            Start with a strong baseline: logistic/linear regression with regularisation or a simple tree/naïve predictor. Then shortlist 2–4 families that fit the data and constraints: gradient‑boosted trees (XGBoost/LightGBM/CatBoost), linear models with interactions, random forests, or simple neural nets for specific patterns. Record why each candidate is in or out.
          </p>

          <ArticleCallout title="When in doubt, begin with trees" variant="brand" icon={<span className="text-xl">🌳</span>}>
            On tabular data, gradient‑boosted trees are hard to beat for strong baselines, work with messy features, and offer fast iteration. Pair with careful CV and early stopping.
          </ArticleCallout>

          <h2>Train and tune responsibly: cross‑validation, metrics and leakage checks</h2>
          <p>
            Use cross‑validation that mirrors production. Grid/random/Bayesian search can tune hyperparameters, but set realistic search budgets. Evaluate the full distribution of metrics (median, IQR), not just a single mean, and check cohort performance (e.g., region, segment). Calibrate probabilities when decisions depend on thresholds, and lock the pipeline once selected.
          </p>
          <h3>Evidence to keep</h3>
          <p>
            Save: data snapshot IDs, feature definitions, training code commit, parameters, CV results, model artefacts, and the decision log. Tools like MLflow simplify this.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              'Define the metric, cohorts and acceptable risk',
              'Build a leakage‑safe pipeline and evaluate with CV',
              'Select, calibrate and freeze the winning model with full provenance'
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Key takeaway" variant="purple">
            “Start simple, validate honestly, and monitor relentlessly. The strongest models pair accuracy with operational reliability.”
          </QuoteBlock>

          <h2>Fairness, explainability and privacy checks (AU context)</h2>
          <p>
            Test for disparate performance across meaningful cohorts (e.g., geography, customer segment). Document impacts and mitigations in a model card. Provide appropriate explainability (feature importance, SHAP) proportional to risk. Ensure privacy controls: minimise data, secure storage, and consider de‑identification for analytics. Align practices with Australia’s AI Ethics Principles and OAIC guidance; if in doubt, seek internal privacy advice.
          </p>

          <h2>Ship the model: packaging, deployment and handover</h2>
          <p>
            Package the pipeline (preprocessing + model) as a single artefact. Common patterns: a REST API (FastAPI), batch jobs on a schedule, or platform‑managed endpoints (e.g., SageMaker/Vertex/Azure ML). Version the model and schema, add health probes, and include a rollback plan. Create runbooks for on‑call and a clear ownership model across data, model and platform teams.
          </p>

          <h2>Monitor in production: drift, performance and retraining cadence</h2>
          <p>
            Track input drift, prediction drift, latency, and business outcomes. Define alert thresholds (SLOs) and a retraining schedule informed by drift and error budgets. Keep a shadow test set or periodic human review for sanity checks. As at 2026, most teams use lightweight tracking plus centralised logging; pick the simplest stack that meets your risk profile.
          </p>

          <AudienceGrid
            heading="Who this helps"
            cards={[
              {
                title: 'Founders & Teams',
                description: 'For leaders validating ideas, seeking funding, or managing teams.',
                icon: <RocketLaunchIcon className="h-6 w-6" />,
                variant: 'orange'
              },
              {
                title: 'Students & Switchers',
                description: 'For those building portfolios, learning new skills, or changing careers.',
                icon: <AcademicCapIcon className="h-6 w-6" />,
                variant: 'purple'
              },
              {
                title: 'Community Builders',
                description: 'For workshop facilitators, mentors, and ecosystem supporters.',
                icon: <UsersIcon className="h-6 w-6" />,
                variant: 'yellow'
              }
            ]}
          />

          <MLAITemplateResourceCTA />

          <h2>Plan your pilot: small, measurable and reviewable</h2>
          <p>
            Choose a narrow use case with a clear success metric and an owner who can act on model outputs. Aim to reach a decision review in 2–6 weeks, with documented results, risks and next steps. Keep one CTA: if you want a community to compare notes with, MLAI is a not‑for‑profit, Australia‑based community for practitioners and enthusiasts.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Draft your initial goals based on the template.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Discuss with your team or mentor.</span>
              </li>
            </ul>
          </div>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations"
            buttonHref="/contact"
            note="You can filter by topic, format (online/in-person), and experience level."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleDisclaimer className="mt-8" />

        <ArticleReferences references={references} />

        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
