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

const TOPIC = 'What is an AI Agent Orchestrator and How Can I Become One (2026)?'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'what-is-an-ai-agent-orchestrator-and-how-can-i-become-one-20'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-15'
const DATE_MODIFIED = '2026-01-15'
const DESCRIPTION = 'Understand the AI agent orchestrator role, 2026 skills, Australian demand, and a practical path to become one.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-bf8dfb39-2fe4-44a3-836a-b7ca593d40af.jpg?alt=media&token=aca34ccb-4071-4fd8-87dd-65abebf13916"
const HERO_IMAGE_ALT = 'Person coordinating multiple AI agent workflows on a screen'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'What does an AI agent orchestrator do day to day?', answer: 'They design, configure, and monitor multi-agent workflows, including prompt chains, tool routing, evaluation checks, and rollback paths to keep outputs safe and useful.' },
  { id: 2, question: 'Which skills are essential in 2026 for this role?', answer: 'LLM pipeline design, Python/TypeScript, vector search, observability, safety/evaluation frameworks, and the ability to translate business goals into agent tasks.' },
  { id: 3, question: 'Is there demand for AI agent orchestrators in Australia?', answer: 'Yes. Financial services, health, education, and gov-tech teams are piloting AI agents and need orchestration for reliability and compliance (as at Jan 2026).' },
  { id: 4, question: 'Do I need a machine learning degree?', answer: 'Not necessarily. A background in software engineering, data, or product with hands-on LLM pipeline experience is often sufficient, provided you can evidence safety and evaluation practice.' },
  { id: 5, question: 'Which tools should I learn first?', answer: 'Start with one orchestration framework (e.g., LangGraph or Airflow with LLM operators), an evaluation toolkit (RAGAS, DeepEval), and basic observability (Arize/Weights & Biases), then layer in vector stores and function-calling APIs.' },
  { id: 6, question: 'How do I show capability to employers?', answer: <>Ship a public mini-portfolio: a repo with a multi-agent flow, eval scripts, latency/cost dashboards, and a short README on governance choices. Add a demo video and link it on your CV.</> },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What does an AI agent orchestrator do?',
      description: 'Coordinates multi-agent workflows, tool routing, evaluations, and guardrails to deliver reliable outcomes.',
    },
    {
      label: 'Which skills matter most in 2026?',
      description: 'LLM tool use, graph orchestration, retrieval, evaluations, observability, and governance awareness.',
    },
    {
      label: 'How do I become job-ready in Australia?',
      description: 'Build a portfolio with instrumented multi-agent flows, documented safeguards, and demos showing privacy-aware design.',
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
              description: 'For leaders validating AI use cases, scoping governance, or planning hiring.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For those building AI portfolios, learning orchestration tools, or changing roles.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For mentors, facilitators, and meet-up organisers supporting AI capability.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> – The role blends software engineering, LLM product thinking, and governance. In 2026 Australia, teams want multi-agent workflows that are observable, cost-aware, and compliant with local privacy expectations. This guide maps the role, skills, and a practical pathway to get job-ready.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>Defining the AI agent orchestrator: scope, not hype</h2>
          <p>
            An AI agent orchestrator designs and maintains the system that coordinates multiple AI agents, tools, and guards. Unlike a prompt engineer, this role owns routing logic, memory strategy, evaluation gates, cost/latency targets, and rollback behaviours. In regulated sectors common in Australia (financial services, health, education, gov-tech), orchestration ensures audits and safeguards are baked into the workflow.
          </p>
          <p>
            Core responsibilities include: selecting an orchestration framework, designing task graphs, integrating APIs and tools, defining evaluation checks, and monitoring production behaviour with telemetry. The orchestrator is accountable for reliability and safety, even when individual agents are probabilistic.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Match orchestration scope to risk"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              In low-risk pilots, start with a single-agent flow plus evaluations. Add multi-agent routing only when the value is clear and the guardrails (tests, evals, cost caps) are in place.
            </p>
          </ArticleCallout>

          <h2>Key skills for 2026: pipelines, evaluations, and safety</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-61002287-5ff2-404c-87d0-9494abf40e98.jpg?alt=media&token=2c9353ae-f700-49c0-8cd5-87ba2d39217d" alt="Tech-savvy professionals collaborate in a vintage 90s film aesthetic, focusing on pipelines, evaluations, and safety." className="w-full rounded-lg my-8" />

          <p>
            Employers expect orchestrators to blend software craft with AI safety. Priority skills include: LLM function-calling and tool use; graph-based orchestration (e.g., LangGraph, Airflow + LLM operators); retrieval design (vector search, reranking); evaluation frameworks (RAGAS, DeepEval, custom golden sets); observability and tracing; and familiarity with Australian privacy expectations and data-handling standards.
          </p>
          <h3>Proof points hiring managers look for</h3>
          <p>
            Demonstrate: a repository with reproducible runs; automated evaluations; cost and latency dashboards; red-teaming notes; and a short ADR (architecture decision record) explaining why routing and safeguards were chosen. Public demos and concise READMEs help non-technical stakeholders assess your approach.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Ship a minimal multi-agent flow with evaluation gates' },
              { label: 'Instrument tracing, latency, and cost limits' },
              { label: 'Document governance choices and rollback paths' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Orchestration is less about more agents and more about predictable outcomes: guardrails, evals, and observability make the role valuable.”
          </QuoteBlock>

          <h2>Australian demand and pathways into the role</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4b0d87ec-3ad3-488d-986b-cd47c72e4fe2.jpg?alt=media&token=bb97dc1f-b2fd-4c0d-8455-0cedadc38c58" alt="Team collaborating in a vibrant 90s tech startup, reflecting Australian demand for innovative roles." className="w-full rounded-lg my-8" />

          <p>
            As at January 2026, Australian teams in banking, health, tertiary education, and gov-tech are piloting agentic workflows for customer support, compliance summarisation, and document routing. Demand sits within platform teams, applied AI squads, and innovation labs. Because the role is emergent, hiring managers often rebadge it as ‘AI platform engineer’, ‘LLM engineer’, or ‘AI solutions engineer’—keep your CV keywords broad.
          </p>
          <p>
            Typical entry routes include software engineering (backend or data), MLOps, or product engineering roles that have absorbed LLM responsibilities. Contract roles appear in consultancies and system integrators delivering proof-of-concepts for public sector and enterprise clients.
          </p>

          <h2>Tooling stack that employers expect familiarity with</h2>
          <p>
            Expect to work with: orchestration frameworks (LangGraph, Airflow, Temporal); LLM providers (OpenAI, Anthropic, open-source models via vLLM); vector databases (Pinecone, Weaviate, pgvector); evaluation suites (RAGAS, DeepEval, custom harnesses); observability (Arize, W&B, OpenTelemetry traces); and policy/guardrails layers (Outlines, Guardrails, or custom validators). Focus on one stack, then map concepts across others.
          </p>

          <h2>Portfolio and hiring signals that stand out</h2>
          <p>
            Hiring teams value evidence of safe, measurable delivery. Create a public repo that shows: task graph design; prompts with function-calling; synthetic and golden test sets; evaluation scripts; a cost/latency dashboard; and a one-page ADR describing trade-offs. Add a short Loom or YouTube demo. For Australian context, note how you handle data residency and privacy constraints.
          </p>

          <h2>Learning path: from foundations to production readiness</h2>
          <p>
            Move in deliberate stages: foundations (Python/TypeScript, HTTP APIs, basic LLM calls); structured prompting and tool use; retrieval design; orchestration graphs; evaluations and red-teaming; observability; and deployment on cloud with cost controls. Apply each stage to a small project rather than reading only.
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
                <span>Draft a mini project plan: use-case, agents, tools, evals, and observability.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Share your demo and README with a mentor or local community for feedback.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="MLAI is a not-for-profit community empowering the Australian AI community—connect to learn with peers and mentors."
              buttonText="Join the MLAI community"
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
