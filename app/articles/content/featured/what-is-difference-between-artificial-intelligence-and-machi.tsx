/*
 * ARTICLE TEMPLATE - React Router v7
 *
 * THIS FILE IS PLACED AT: app/articles/content/{category}/{slug}.tsx
 * All relative imports below are calculated from that location.
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router'
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
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'AI vs machine learning: what’s the difference?'
const CATEGORY = 'ai-careers-australia'
const SLUG = 'what-is-difference-between-artificial-intelligence-and-machi'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-20'
const DATE_MODIFIED = '2026-01-20'
const DESCRIPTION = 'Understand the difference between AI and ML (and deep learning), with examples, quick PAA answers, and local career context for Australia in 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1a746f7d-0ce2-4f98-b0d9-16a036119f36.jpg?alt=media&token=cc356090-a73b-4c8d-a5ae-9a4706ca9c05"
const HERO_IMAGE_ALT = 'Abstract network nodes and connections representing AI and machine learning'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Is AI the same as machine learning?', answer: 'No. Machine learning (ML) is a subset of artificial intelligence (AI). AI is the broader goal of building systems that perform tasks we associate with intelligence (reasoning, planning, perception, language). ML is one family of techniques used to achieve that goal by learning patterns from data.' },
  { id: 2, question: 'Is ChatGPT AI or machine learning?', answer: <>ChatGPT is an AI application powered by machine learning—specifically deep learning. It is a large language model (LLM) trained on large text datasets and refined with techniques like reinforcement learning from human feedback (RLHF). It sits in the <em>deep learning</em> subset of ML.</> },
  { id: 3, question: 'Can you build AI without machine learning?', answer: <>Yes. Rule-based systems, search/planning agents, and constraint solvers are <strong>AI without ML</strong>. They use explicit logic and heuristics instead of learned parameters. Modern products often blend rules and ML.</> },
  { id: 4, question: 'Which should I learn first in Australia—AI or ML?', answer: <>Start with ML fundamentals (Python, data handling, statistics, supervised/unsupervised learning). Then add deep learning and LLMs. Complement this with AI concepts (search, planning, prompt engineering, evaluation). Local context: explore CSIRO and the National AI Centre resources, and university short courses. As at 2026, employers value practical projects over theory alone.</> },
  { id: 5, question: 'How much data do I need for ML?', answer: <>It depends on the task and model. For classical ML (e.g., tree-based models), hundreds to thousands of rows can be useful. Deep learning generally needs much more data and compute. If data is limited, consider transfer learning or smaller models. Always run a simple baseline first.</> },
  { id: 6, question: 'Do I need a GPU to learn ML?', answer: <>Not initially. You can learn ML with CPUs on a laptop using small datasets. For deep learning or LLM fine-tuning, consider cloud notebooks (free tiers/credits) or managed platforms without upfront hardware costs.</> },
  { id: 7, question: 'Where can I find trustworthy guidance in Australia?', answer: <>Check: • <a href="https://bioinformatics.csiro.au/blog/difference-between-ai-ml-dl/" target="_blank" rel="noreferrer">CSIRO on AI vs ML vs DL</a> • <a href="https://industry.gov.au/" target="_blank" rel="noreferrer">Australian Government AI guidance (as available)</a> • <a href="https://oaic.gov.au/" target="_blank" rel="noreferrer">OAIC privacy guidance</a>. Also review provider docs (AWS, Microsoft Azure) for clear definitions.</> },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Is machine learning a subset of AI?',
      description: 'Yes. ML is a set of techniques within AI that learn patterns from data; AI also includes rules, search, and planning.',
    },
    {
      label: 'Can you have AI without machine learning?',
      description: 'Yes. Rule-based systems, search and planning agents are AI without ML—often cheaper and easier to govern.',
    },
    {
      label: 'How is deep learning different from ML?',
      description: 'Deep learning uses multi-layer neural networks; it’s a subset of ML that typically needs more data/compute.',
    },
  ],
}

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight="(2026)"
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        {/* Intro alert - Clean, neutral style */}
        <ArticleCallout variant="info">
          <p className="text-sm text-gray-800">
            This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
            <Link to="/articles" className="font-semibold text-[--brand] underline-offset-4 hover:underline">
              Browse related articles →
            </Link>
          </p>
        </ArticleCallout>

        {/* Persona Grid */}
        <AudienceGrid
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating ideas, seeking funding, or managing teams.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building portfolios, learning new skills, or changing careers.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For workshop facilitators, mentors, and ecosystem supporters.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> – If you’re wondering “what is difference between artificial intelligence and machine learning?”, here’s the short version and how it plays out in real projects and careers across Australia.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          {/* SECTION: Relationship summary */}
          <h2>AI and machine learning: the relationship in one sentence</h2>
          <p>
            Machine learning (<strong>ML</strong>) is a subset of artificial intelligence (<strong>AI</strong>). AI is the overall goal—systems that perform tasks requiring intelligence. ML is one way to achieve that goal by learning patterns from data. All ML is AI, but not all AI uses ML.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Quick glossary (30 seconds)"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <ul className="mt-2 list-disc pl-5 text-gray-800">
              <li><strong>AI:</strong> The field and goal: reasoning, planning, perception, language, action.</li>
              <li><strong>ML:</strong> Techniques that learn from data (supervised, unsupervised, reinforcement).</li>
              <li><strong>Deep learning (DL):</strong> ML using multi‑layer neural networks.</li>
              <li><strong>LLMs:</strong> Large language models (a deep learning family) that power chat and code assistants.</li>
            </ul>
          </ArticleCallout>

          {/* SECTION: Stack explanation */}
          <h2>The AI → ML → deep learning stack (and where LLMs sit)</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f5fc57b2-7984-42c6-9b93-d74c1e660f45.jpg?alt=media&token=ab7a7a79-8601-45d9-879a-2c700f4abac5" alt="Group of tech enthusiasts collaborating in a trendy startup space, embodying the 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            A helpful mental model is a set of nested circles: AI (outer), ML (inside AI), and deep learning (inside ML). LLMs such as GPT‑class models are a <em>deep learning</em> technique trained on large corpora; they’re used to build AI applications like chatbots, coding tools, and document assistants.
          </p>
          <p>
            Non‑ML AI still matters: search and planning (e.g., route finding), constraint solvers (rostering), and rule engines (eligibility checks) can be sufficient, cheaper, and easier to govern in many Australian contexts.
          </p>

          {/* SECTION: How they work */}
          <h2>How they work: rules, search and learning</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-26774910-2413-4b85-8ba5-a57ae6a552b2.jpg?alt=media&token=38711d1b-f356-4247-a5f9-94595e4b9132" alt="People collaborating in a retro tech startup environment, capturing a 90s film aesthetic." className="w-full rounded-lg my-8" />

          <ul>
            <li><strong>Rules/symbolic AI:</strong> Human‑written logic (if/then), ontologies, and knowledge bases. Great for clear, stable policies and compliance.</li>
            <li><strong>Search/planning:</strong> Explore possible actions to achieve a goal (e.g., path finding). Useful for logistics and scheduling.</li>
            <li><strong>Machine learning:</strong> Models learn parameters from data; classical ML handles tabular data well, while deep learning excels in images, audio, and language.</li>
          </ul>

          <ArticleStepList
            title="Practical steps: deciding if your problem needs ML"
            steps={[
              { label: 'Write the outcome, constraints, and decision boundary in plain English.' },
              { label: 'Try a rules baseline. If clear, stable logic covers 80% of cases, start there.' },
              { label: 'If the task is pattern‑heavy or ambiguous, shortlist ML options (classical vs deep learning).' },
              { label: 'Estimate data quality/quantity and compute; plan an evaluation metric.' },
              { label: 'Pilot, compare to the baseline, and keep the simpler approach if performance is similar.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Start with the simplest thing that could work. In many teams, a solid rules baseline plus targeted ML where it truly adds value wins on cost, governance, and delivery speed.”
          </QuoteBlock>

          {/* SECTION: Examples */}
          <h2>Examples you’ll recognise in Australia</h2>
          <h3>AI without ML (rules/search/planning)</h3>
          <ul>
            <li>Eligibility checks for concessions (rules aligned to legislation).</li>
            <li>Route optimisation for deliveries in metro areas (search/planning).</li>
            <li>Timetabling/rostering with constraints (constraint solving).</li>
          </ul>
          <h3>ML‑powered systems (learning from data)</h3>
          <ul>
            <li>Document classification and data extraction (invoices, forms).</li>
            <li>Vision models for safety monitoring on worksites.</li>
            <li>Language models supporting customer service triage and drafting.</li>
          </ul>

          {/* SECTION: Careers */}
          <h2>Career pathways in Australia: roles, skills and tools</h2>
          <ul>
            <li><strong>Data analyst → ML practitioner:</strong> Python, SQL, feature engineering, tree‑based models, evaluation.</li>
            <li><strong>ML engineer:</strong> Model training, feature stores, deployment, monitoring; CI/CD and MLOps.</li>
            <li><strong>AI engineer / Applied AI:</strong> Integrates LLMs, retrieval, prompt engineering, guardrails, evaluation.</li>
            <li><strong>Data scientist:</strong> Experiment design, statistics, causal reasoning, communication.</li>
            <li><strong>Product manager (AI):</strong> Problem framing, risk/benefit trade‑offs, measurement, rollout.</li>
            <li><strong>Governance/ethics:</strong> Risk assessment, privacy impact assessments, model documentation.</li>
          </ul>
          <p>
            As at 2026, Australian employers value demonstrable projects, responsible‑AI awareness, and practical evaluation over tool hype. Portfolios showing a simple baseline <em>and</em> an ML upgrade are compelling.
          </p>

          {/* SECTION: PAA quick answers */}
          <h2>PAA quick answers: ChatGPT, “AI without ML”, and what to learn</h2>
          <ul>
            <li><strong>Is ML a subset of AI?</strong> Yes—ML is a set of techniques within AI.</li>
            <li><strong>Can AI exist without ML?</strong> Yes—rules, search, and planning agents are AI without ML.</li>
            <li><strong>How is deep learning different from ML?</strong> Deep learning uses multi‑layer neural networks; it’s a subset of ML and often needs more data/compute. See the CSIRO explainer: <a href="https://bioinformatics.csiro.au/blog/difference-between-ai-ml-dl/" target="_blank" rel="noreferrer">AI vs ML vs DL</a>.</li>
            <li><strong>Which should I learn first?</strong> Start with ML fundamentals, then move into deep learning/LLMs and AI evaluation.</li>
          </ul>

          {/* SECTION: Privacy & responsibility */}
          <h2>Privacy and responsible use in Australia (as at 2026)</h2>
          <ul>
            <li><strong>Privacy:</strong> Follow OAIC guidance under the Privacy Act; conduct privacy impact assessments for sensitive use cases.</li>
            <li><strong>Ethics:</strong> The Australian AI Ethics Principles emphasise fairness, privacy, reliability, transparency, and accountability.</li>
            <li><strong>Governance:</strong> Document data sources, evaluation methods, and limitations; prefer interpretable baselines where risk is high.</li>
          </ul>

          {/* SECTION: Actionable close */}
          <h2>Build momentum: a small project to test your understanding</h2>
          <p>
            Take one problem and implement two versions: a rules baseline and an ML model. Compare outcomes, costs, and governance implications. This clarity helps you choose the right tool for the next project—and builds a strong portfolio piece.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Download the checklist mentioned above.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Draft a simple rules baseline for a real problem you care about.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Train a small ML model and compare results—keep the simpler approach if it wins.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Get practical recommendations based on your goals, time, and experience level."
              buttonText="Get recommendations"
              buttonHref="https://mlai.au/contact"
              note="You can filter by topic, format (online/in‑person), and experience level."
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
