import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/blocks/ArticleImageBlock'
import { ArticleCallout } from '../../../components/articles/blocks/ArticleCallout'
import { ArticleStepList } from '../../../components/articles/blocks/ArticleStepList'
import { ArticleFooterNav } from '../../../components/articles/blocks/ArticleFooterNav'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'How to get started with AI in Australia'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'how-to-get-started-with-ai-2026'
const AUTHOR = 'Casey Morgan'
const AUTHOR_ROLE = 'Editorial Lead'
const AUTHOR_BIO = 'Casey covers applied AI, policy shifts, and practical tooling for Australian founders and teams.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2025-02-10'
const DATE_MODIFIED = '2025-02-17'
const DESCRIPTION = 'A practical 2026 playbook for Australians starting with AI—covering skills, tools, governance, and fast pilot ideas for teams and individuals.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268"
const HERO_IMAGE_ALT = 'Team collaborating on AI data charts with laptops and whiteboard'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'What skills do Australians need to start with AI in 2026?', answer: 'Start with data literacy, prompt design, and basic Python or no-code automation. Layer in responsible AI awareness (privacy, bias, copyright) and model evaluation basics.' },
  { id: 2, question: 'How do I test AI tools without breaching privacy rules?', answer: 'Use synthetic or de-identified data, turn off model training where offered, and review each tool’s data residency statement. For government or health data, stick to vendors offering Australian or APAC data centres and signed data processing agreements.' },
  { id: 3, question: 'Is fine-tuning required for most use cases?', answer: 'No. For many internal tasks—drafts, summaries, and routing—prompting plus small retrieval sets (RAG) is faster and cheaper than fine-tuning. Fine-tune only when you need domain-specific tone or consistent structured outputs.' },
  { id: 4, question: 'What is a safe first AI project for a small team?', answer: 'Pilot a low-risk workflow such as meeting note drafts or FAQ response drafts, or data cleanup suggestions. Keep a human-in-the-loop and measure time saved vs. error rate before expanding.' },
  {
    id: 5, question: 'Which Australian standards or guidance should I reference?', answer: (
      <span>
        Start with the Australian AI Ethics Principles, the OAIC privacy guidance, and your state-based records management rules. For sector specifics (e.g., health, education), check local regulator advisories and vendor DPA templates.
      </span>
    )
  },
  { id: 6, question: 'How do I budget for AI in 2026?', answer: 'Plan for three buckets: (1) experimentation credits for API calls and pilots, (2) data preparation and evaluation, and (3) governance (policies, training, and vendor reviews). Track cost per successful task, not just cost per token.' },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC} `,
  intro:
    'Fast-start guidance for Australian teams in 2026: skills to prioritise, privacy-safe pilots, and how to measure value before scaling.',
  items: [
    {
      label: 'How do I start learning AI skills in 2026?',
      description: 'Begin with data literacy, prompt design, and basic Python or no-code automation; add responsible AI basics and model evaluation.',
    },
    {
      label: 'What is a safe first AI project for small teams?',
      description: 'Pilot low-risk workflows like meeting note drafts or FAQ replies with human review, clear metrics, and capped spend.',
    },
    {
      label: 'Do I need fine-tuning to use AI at work?',
      description: 'Often no—prompting plus retrieval over your documents is faster and cheaper; fine-tune only for tone or structured output consistency.',
    },
  ],
}

export const useCustomHeader = true

export default function ArticlePage() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: TOPIC, current: true },
  ]

  return (
    <div>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TOPIC}
        headerBgColor="cyan"
        summary={{
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items,
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleCallout title="Quick note" icon={<span className="text-xl">💡</span>} variant="brand">
        This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
        <a href="/articles" className="font-semibold text-[--brand-ink] underline-offset-4 hover:underline">
          Browse related articles →
        </a>
      </ArticleCallout>

      {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
      <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            {/* Icon: Rocket */}
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84v4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For leaders validating ideas, seeking funding, or managing teams.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
            {/* Icon: Graduate */}
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For those building portfolios, learning new skills, or changing careers.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4 h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            {/* Icon: Community */}
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
          </div>
          <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            For workshop facilitators, mentors, and ecosystem supporters.
          </p>
        </div>
      </div>

      {/* 3) Main content starts */}
      <div className="">
        <p>
          <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025–2026 landscape, drawing on local privacy expectations and emerging AI safety guidance.
        </p>

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

        <h2>What is {TOPIC}?</h2>
        <p>
          Getting started with AI means pairing modern language and vision models with your workflows in a way that is safe, measurable, and reversible. In Australia, that includes respecting the Privacy Act (and proposed updates), the Australian AI Ethics Principles, and any sector-specific data handling rules. Practically, you will combine prompting, lightweight retrieval (RAG), and off-the-shelf APIs before committing to deeper integration or fine-tuning.
        </p>
        <p>
          The goal is not to build a research lab on day one. Instead, start with low-risk, high-volume tasks where a human reviewer can quickly correct outputs: meeting notes, summarising long documents, drafting customer replies, and cleaning data. Each pilot should have a clear success metric, a cost ceiling, and an exit plan if the tool or vendor fails your governance checks.
        </p>

        <h2>Why it matters in 2026</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6c812263-ca23-4cc5-8427-906358a3341b.jpg?alt=media&token=67b0bc14-ce62-4d41-b4f0-6a1c3719848f"
          alt="People in a 90s-inspired tech startup setting brainstorm and collaborate over laptops and coffee."
        />

        <p>
          Model quality and cost curves are improving quarterly, and Australian organisations are being asked to prove responsible AI practices. Teams that learn safe prompting, evaluation, and data discipline now will move faster than those waiting for “perfect” regulation. Early pilots also uncover process debt—unclear inputs, missing labels, brittle handoffs—that must be fixed before automation or assistance can deliver value.
        </p>
        <p>
          Ignoring AI in 2026 means higher operational costs and slower response times, especially in customer support, policy analysis, and research-heavy roles. Conversely, responsible adoption improves employee experience (less rote work), increases service consistency, and creates new ways to test products with smaller budgets.
        </p>

        <ArticleCallout title="Pro Tip" icon={<span className="text-xl">💡</span>} variant="brand">
          Start with a 2-week sprint: pick one workflow, define a baseline time/cost, run an AI-assisted version with human review, and compare outcomes before scaling.
        </ArticleCallout>

        <h2>Step-by-Step Guide</h2>
        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1bd24b7a-1be6-4c0e-b079-e63768f9cf34.jpg?alt=media&token=996d3c47-8bbb-4990-86f0-3ef4c119d335"
          alt="Group of diverse professionals collaborating in a tech startup, captured with a nostalgic 90s film aesthetic."
        />

        <h3>Step 1: Preparation</h3>
        <p>
          Map one or two candidate workflows. Good candidates are repetitive, text-heavy, and already have clear acceptance criteria. Gather a small, de-identified sample set (10–30 items) and write what “good” looks like in plain language. Draft a lightweight AI use policy covering data residency, human review, and incident reporting. Confirm whether any data touches sensitive categories (health, financial, student, or customer identifiers) and decide on guardrails, such as redaction or synthetic data.
        </p>
        <p>
          Tooling checklist: a reliable model endpoint (e.g., OpenAI, Anthropic, or an Australian-hosted option), a prompt notebook (Notion, Google Docs, or a Git repo), and an evaluation sheet to log failures. If you work in government or regulated sectors, prefer vendors offering APAC data centres and signed data processing agreements with no model training on your inputs.
        </p>

        <h3>Step 2: Execution</h3>
        <p>
          Prototype your prompt with your sample set. Keep instructions concise, define the audience, and ask for structured output (tables, bullet points, JSON where safe). Run each sample twice: once with a baseline prompt and once with refinements. Track errors such as hallucinated facts, missing citations, or tone mismatches. Where the task depends on local documents (policies, product manuals), add retrieval: store documents in a vector store, chunk sensibly (300–500 tokens), and cite the source titles in responses.
        </p>
        <p>
          Cost-control tactics: cap tokens per request, set a monthly spend threshold, and cache reusable context. For teams, create a simple rubric (accuracy, tone, completeness, citation quality) and have two reviewers score 5–10 outputs. Adjust prompts or switch models if scores stall. Avoid fine-tuning until you know the failure patterns; many issues can be fixed with clearer instructions or cleaner context.
        </p>

        <h3>Step 3: Review</h3>
        <p>
          Compare AI-assisted outputs to your baseline time and quality. If quality meets or exceeds baseline and reduces effort by at least 20–30%, draft an implementation plan: access controls, logging, incident response, and user training. Document known failure modes and when to escalate to a human subject matter expert. If results fall short, record why—poor source data, unclear prompts, or model choice—and decide whether to iterate or exit.
        </p>
        <p>
          Before expanding, brief stakeholders on limitations: AI can draft and suggest but should not make final decisions on customer eligibility, medical advice, or financial outcomes. Add ongoing evaluation every release cycle, and revisit consent and privacy statements when you introduce new data sources or vendors.
        </p>

        <h2>Conclusion</h2>
        <p>
          Starting with AI in 2026 is about disciplined experimentation: pick a contained workflow, measure against a baseline, and keep humans in the loop. By following Australia’s privacy and ethics guidance, teams can ship useful pilots quickly, learn from mistakes safely, and scale only when the value is proven.
        </p>

        <ArticleStepList
          title="Your Next Steps"
          steps={[
            'Download the checklist mentioned above.',
            'Draft your initial goals based on the template.',
            'Discuss with your team or mentor.',
          ]}
          accent="brand"
        />

        <div className="my-12">
          {/* Contextual CTA - Best placement for conversion */}
          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="Get practical recommendations based on your goals, time, and experience level."
            buttonText="Get recommendations"
            buttonHref="#"
            note="You can filter by topic, format (online/in‑person), and experience level."
          />
        </div>
      </div>

      <hr className="my-10 border-gray-100" />

      <AuthorBio authors={[authorDetails]} />

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav />
    </div>
  )
}
