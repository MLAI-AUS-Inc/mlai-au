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
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'What is Artificial General Intelligence'
const CATEGORY = 'ai-careers-australia'
const SLUG = 'what-is-artificial-general-intelligence'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-20'
const DATE_MODIFIED = '2026-01-20'
const DESCRIPTION = 'A clear, evidence-based explainer of artificial general intelligence (AGI), how it differs from today’s AI, proposed evaluations, timelines, risks, and what it could mean for AI careers in Australia.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-3107979b-03f2-423c-b960-ae4b26850b72.jpg?alt=media&token=2817e525-d314-4127-852d-f609133af31c"
const HERO_IMAGE_ALT = 'Abstract neural network lines representing general intelligence across domains'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Is AGI real today?', answer: 'No. As at 2026, there is no peer‑reviewed consensus that any system has achieved artificial general intelligence. Frontier models demonstrate strong capabilities across many benchmarks, but remain brittle, inconsistent off‑distribution, and dependent on human scaffolding or tools.' },
  { id: 2, question: 'Is GPT‑4 an AGI?', answer: 'No. GPT‑4‑class systems are impressive at language, coding, and reasoning tasks under constraints, but they do not reliably exhibit robust open‑world autonomy, long‑horizon planning, grounded causal understanding, or self‑directed goal pursuit with verifiable alignment.' },
  { id: 3, question: 'How would we measure AGI?', answer: <>There is no single test. Researchers propose multi‑domain evaluations that combine reasoning (e.g., MMLU/Math), abstract problem‑solving (e.g., ARC), long‑horizon tasks, embodied control or simulated environments, tool use, and safe operation under uncertainty. Independent replication and adversarial testing are essential.</> },
  { id: 4, question: 'When might AGI arrive?', answer: 'Forecasts vary widely, from “in the next decade” to “many decades or never.” Treat timelines as uncertain and scenario‑based; focus on practical skills, governance literacy, and responsible deployment that are valuable regardless of timeline.' },
  { id: 5, question: 'What would AGI mean for jobs in Australia?', answer: 'Likely more task automation and augmentation, plus growth in roles across AI safety, governance, data, model evaluation, human‑computer interaction, and AI product integration. Impacts will depend on industry, regulation, and organisational adoption choices.' },
  { id: 6, question: 'Who regulates AI in Australia?', answer: <>As at 2024–25, privacy is overseen by the OAIC, online harms by the eSafety Commissioner, and the Australian Government has proposed guardrails for higher‑risk AI under its Safe and Responsible AI agenda. Always check the latest official guidance.</> },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Is AGI real today?',
      description: 'No—there’s no consensus that any system has reached AGI as at 2026; current models are powerful but narrow and unreliable off‑distribution.',
    },
    {
      label: 'How is AGI different from today’s AI?',
      description: 'AGI would generalise across tasks, learn efficiently, plan over long horizons and operate autonomously; today’s systems excel mainly in narrow domains.',
    },
    {
      label: 'How would we know we’ve built AGI?',
      description: 'No single test; researchers propose multi‑domain evals combining reasoning, transfer, real‑world autonomy and safety alignment with independent replication.',
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
        <QuoteBlock variant='purple' icon={<span className='text-xl'>💡</span>}>
          <p className='text-sm text-white'>
            
            This guide is part of our broader series on {TOPIC}. For a career‑oriented overview, see our{' '}
            <Link to="/articles/ai-careers-australia" className="font-semibold text-white underline-offset-4 hover:underline">
              AI careers in Australia guide
            </Link>
            . Prefer to browse?{' '}
            <Link to="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
              Explore more articles →
            </Link>
          
          </p>
        </QuoteBlock>

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
            <strong>{TOPIC}</strong> describes a hypothetical class of AI systems that can learn, reason and adapt across a wide range of tasks—more like a capable generalist than a single‑skill specialist. Top explainers from encyclopaedic and industry sources converge on three ideas: breadth (many domains), transfer (learning that carries over), and autonomy (goal‑directed behaviour with reliable control and safety).
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>AGI versus today’s AI: scope, autonomy and transfer</h2>
          <p>
            Most deployed systems are “narrow AI” built to excel at specific tasks (e.g., recognising images, drafting text, or recommending content). By contrast, AGI would generalise: it would learn new tasks with limited data, transfer prior knowledge, plan over long horizons, and operate with a degree of autonomy—while remaining aligned with human goals and safety constraints. Modern foundation models blur lines by performing well on diverse benchmarks, but they still rely on scaffolding, frequent human oversight, and careful prompting; performance degrades in unfamiliar or open‑ended settings.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Tip: separate capability claims from system behaviour"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Ask what the model can do <em>reliably</em> without hidden human help, how it behaves under adversarial tests, and whether independent evaluations reproduce the result.
            </p>
          </ArticleCallout>

          <h2>What capabilities would qualify as AGI?</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cc18daf3-4852-4ca4-9190-74f7a03c26f4.jpg?alt=media&token=69c2054f-2e4a-4181-baa2-8f8327ab6777" alt="People in a 90s tech startup setting, brainstorming ideas for artificial general intelligence (AGI) capabilities." className="w-full rounded-lg my-8" />

          <p>
            There is no universally agreed checklist, but common proposals emphasise:
          </p>
          <ul>
            <li><strong>Generalisation and transfer:</strong> learning and applying concepts across domains, not just pattern‑matching within benchmarks.</li>
            <li><strong>Sample‑efficient learning:</strong> improving quickly from few examples, including from interaction.</li>
            <li><strong>Robust reasoning and planning:</strong> handling long‑horizon, multi‑step goals under uncertainty.</li>
            <li><strong>Grounding and causality:</strong> modelling cause‑and‑effect, not only correlations.</li>
            <li><strong>Tool use and embodiment:</strong> using tools or actuators to achieve goals safely.</li>
            <li><strong>Alignment and oversight:</strong> predictable, controllable behaviour aligned with human intent and law.</li>
          </ul>

          <h3>Generalisation and transfer across domains</h3>
          <p>
            True generality shows up when systems succeed on new tasks <em>without</em> extensive task‑specific fine‑tuning, maintain performance under distribution shift, and can explain <em>why</em> a solution works. Today’s strongest models push in this direction, but often rely on tool‑calling, retrieval, or human‑written scaffolds to reach high reliability.
          </p>

          <ArticleStepList
            title="Practical steps for evaluating AGI claims"
            steps={[
              { label: 'Check the definition: does the claim mean broad generalisation, autonomy, and alignment—or just a benchmark win?' },
              { label: 'Look for independent, multi‑domain evaluations (reasoning, transfer, long‑horizon tasks, safety) with reproducible protocols.' },
              { label: 'Assess real‑world constraints: data access, guardrails, oversight, and failure modes under stress tests.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “AGI isn’t a single score—it’s a moving frontier across capability, reliability, and alignment. Treat bold claims as hypotheses that need careful evaluation.”
          </QuoteBlock>

          <h2>How would we know we’ve reached AGI? Proposed evaluations</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-60ebb893-d745-4b9f-bddc-844dbf045ea6.jpg?alt=media&token=c045e78b-8679-4691-939b-0cda6faf78dd" alt="Tech professionals brainstorm in a retro 90s film aesthetic, contemplating evaluations for achieving AGI." className="w-full rounded-lg my-8" />

          <p>
            Classic ideas like the Turing Test are too coarse for modern systems. Contemporary proposals combine multiple lenses: knowledge and reasoning (e.g., broad academic tests), abstract problem‑solving (e.g., ARC‑style), coding and maths, grounded or simulated tasks that require planning, and safe autonomy under uncertainty. Crucially, safety‑relevant evaluations—like honesty under pressure, resistance to jailbreaks, and robustness to adversarial prompts—must sit alongside capability metrics. No single benchmark suffices; the standard will evolve as systems improve.
          </p>

          <h2>Where are we now in 2026? Frontier systems, strengths and gaps</h2>
          <p>
            Today’s large models demonstrate impressive versatility: drafting, coding, analysis, translation, and tool use. Yet they still show hallucinations, inconsistent reasoning, and brittleness when tasks deviate from training distributions. Autonomy remains narrow and heavily scaffolded by humans or orchestrators. In short: we see <em>general‑looking</em> behaviour in many contexts, but not the reliable, aligned competence across open‑ended tasks that most researchers would call AGI.
          </p>

          <h2>Timelines and debate: uncertainty is the headline</h2>
          <p>
            Surveys of researchers have reported wide ranges for when AGI‑like capability might emerge—spanning the next decade to several decades or more. Methodologies and definitions differ, and selection effects can distort results. A pragmatic approach is to plan for multiple scenarios: accelerate capability‑neutral skills, strengthen safety and governance capacity, and invest in evaluation infrastructure that benefits Australia regardless of timing.
          </p>

          <h2>Careers and skills in Australia if AGI emerges</h2>
          <p>
            For students, practitioners, and decision‑makers, the most durable moves are capability‑neutral: focus on fundamentals, verifiable practice, and community. Roles likely to grow include model evaluation, AI safety and governance, data engineering, MLOps, human‑AI interaction, and domain‑specific AI product work. Cross‑functional literacy—policy, privacy, security, and ethics—will matter.
          </p>
          <ul>
            <li><strong>Strengthen fundamentals:</strong> statistics, optimisation, software engineering, data practices.</li>
            <li><strong>Build evaluation skills:</strong> design and run robust tests; interpret uncertainty; communicate limits.</li>
            <li><strong>Focus on governance:</strong> privacy by design, risk assessment, documentation, and incident response.</li>
            <li><strong>Engage locally:</strong> Australian context, standards, and networks matter. See our{' '}<Link to="/articles/ai-careers-australia">AI careers in Australia guide</Link>.</li>
          </ul>

          <h2>Responsible development and governance in Australia</h2>
          <p>
            Australian organisations should track official guidance on safe and responsible AI, privacy, and online harms. As at 2024–25, the Office of the Australian Information Commissioner (OAIC) leads privacy oversight, the eSafety Commissioner addresses online harms, and the Federal Government has proposed targeted guardrails for higher‑risk AI. For teams experimenting with frontier models, embed risk assessments, human oversight, red‑teaming, and documentation from the start.
          </p>

          <h2>Make it practical: your action plan</h2>
          <p>
            You don’t need a settled AGI definition to make progress. Prioritise durable skills, responsible practices, and community support that hold across scenarios.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Download the checklist mentioned above and map your current evaluation and governance gaps.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Build a small, documented pilot with clear success criteria and safety tests.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Connect with a local community or mentor to review results and iterate.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Join the MLAI community to collaborate with fellow AI practitioners in Australia and get practical, peer‑tested guidance."
              buttonText="Get recommendations"
              buttonHref="/contact"
              note="We’re a not‑for‑profit community based in Australia."
            />
          </div>
        </div>

        <AuthorBio author={authorDetails} />

        <ArticleReferences
          heading="Sources"
          description="Curated references for further reading (as at 2024–25)."
          headingId="references"
          references={[
            {
              id: 1,
              href: 'https://en.wikipedia.org/wiki/Artificial_general_intelligence',
              title: 'Artificial general intelligence',
              publisher: 'Wikipedia',
              category: 'guide',
              description: 'Neutral overview with history, definitions, and debates.'
            },
            {
              id: 2,
              href: 'https://www.ibm.com/think/topics/artificial-general-intelligence',
              title: 'What is Artificial General Intelligence (AGI)?',
              publisher: 'IBM',
              category: 'guide',
              description: 'Industry explainer covering definitions and differences from narrow AI.'
            },
            {
              id: 3,
              href: 'https://cloud.google.com/discover/what-is-artificial-general-intelligence',
              title: 'What is Artificial General Intelligence?',
              publisher: 'Google Cloud',
              category: 'guide',
              description: 'High‑level overview of concepts, challenges, and outlook.'
            },
            {
              id: 4,
              href: 'https://industry.gov.au/guidance-for-ai-adoption',
              title: 'Guidance for AI Adoption',
              publisher: 'Australian Government',
              category: 'government',
              description: 'Official Australian guidance on responsible AI adoption.'
            },
            {
              id: 5,
              href: 'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations/artificial-intelligence',
              title: 'Artificial intelligence and privacy',
              publisher: 'OAIC',
              category: 'government',
              description: 'Privacy considerations for organisations using AI in Australia.'
            }
          ]}
        />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleDisclaimer />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
