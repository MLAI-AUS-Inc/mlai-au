import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
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
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How small business owners can get started with AI'
export const CATEGORY = 'featured'
export const SLUG = 'how-small-business-owners-can-get-started-with-ai-2026'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-29'
export const DATE_MODIFIED = '2026-01-29'
export const DESCRIPTION = 'Starter plan for Australian small business owners to adopt AI in 2026: practical use cases, a 30‑day pilot, privacy and security basics, and ROI tips.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e8d91d69-4aa4-49a0-b1e4-a8b32d3f54ab.jpg?alt=media&token=3d3573bf-5a7d-416f-a7be-61be2dd87a04"
const HERO_IMAGE_ALT = 'Small business owner using AI tools on a laptop'
export const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Which AI tools are easiest for beginners? (2026)',
    answer: (
      <>
        Start with tools that fit your current stack: Microsoft 365 Copilot or Google Workspace (Gemini) for documents and email; ChatGPT Teams for drafting and Q&A; and vertical tools like help‑desk assistants inside your support platform. Pick one tool, one use case, and run a short pilot first.
      </>
    ),
  },
  {
    id: 2,
    question: 'Do I need my own data to see value?',
    answer: (
      <>
        No. You can get value from generic tasks like drafting emails, FAQs, and product descriptions. Your own data becomes powerful later via connectors to email, docs, spreadsheets or your CRM—after you’ve proven the workflow.
      </>
    ),
  },
  {
    id: 3,
    question: 'How do I avoid privacy risks with customer data?',
    answer: (
      <>
        Use business/enterprise plans that offer data control, opt‑out of model training where possible, avoid pasting sensitive personal information, and set a simple team policy for what’s in/out. Follow Cyber.gov.au guidance for small business security.
      </>
    ),
  },
  {
    id: 4,
    question: 'What skills should my team learn first?',
    answer: (
      <>
        Prompting basics (clear instructions, examples), verifying outputs, handling data safely, and maintaining an audit trail. Create lightweight “house rules” so everyone follows the same approach.
      </>
    ),
  },
  {
    id: 5,
    question: 'How do we measure ROI on an AI pilot?',
    answer: (
      <>
        Track time saved against your baseline, apply your internal hourly rate, and note quality improvements (e.g., fewer revisions, faster response times). Keep pilots under $500 and under 4 weeks to make the decision simple.
      </>
    ),
  },
  {
    id: 6,
    question: 'Are there Australian rules or support I should know about?',
    answer: (
      <>
        Check the Office of the Australian Information Commissioner (OAIC) for privacy obligations and Cyber.gov.au for small business security practices. For potential support programs, refer to Business.gov.au (offerings change—always verify current details).
      </>
    ),
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'What’s a good first AI project for a small business?', description: 'Pick one repeatable task (e.g., customer reply drafts or FAQs) and run a 2–4 week pilot.' },
    { label: 'How much does it cost to start using AI in 2026?', description: '$0–$50 per user/month for mainstream tools; keep pilots under $500 total.' },
    { label: 'Is it safe to use AI with customer data?', description: 'Use business plans with data controls, avoid sensitive info, and follow Cyber.gov.au guidance.' },
  ],
}

/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
export const articleMeta = {
  title: `${TOPIC} (2026)`,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
}

/** ===== References (optional) ===== */
const references = [
  {
    id: 1,
    href: 'https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business',
    title: 'Artificial intelligence for small business',
    publisher: 'Cyber.gov.au',
    description: 'Security and safe adoption guidance for Australian small businesses.',
    category: 'government',
  },
  {
    id: 2,
    href: 'https://www.pwc.com.au/services/artificial-intelligence/2026-ai-business-predictions.html',
    title: '2026 AI Business Predictions',
    publisher: 'PwC Australia',
    description: 'Outlook on AI adoption and impact on business in 2026.',
    category: 'analysis',
  },
  {
    id: 3,
    href: 'https://www.smartcompany.com.au/partner-content/how-are-small-businesses-using-ai-to-get-ahead-in-2026/',
    title: 'How are small businesses using AI to get ahead in 2026?',
    publisher: 'SmartCompany',
    description: 'Examples of practical AI use cases for SMBs.',
    category: 'analysis',
  },
  {
    id: 4,
    href: 'https://vtdigital.com.au/10-profitable-ai-business-ideas-in-australia-for-2026/',
    title: '10 Profitable AI Business Ideas in Australia for 2026',
    publisher: 'VT Digital',
    description: 'Idea starters and opportunities in the Australian context.',
    category: 'industry',
  },
]

/**
 * ARTICLE CONTENT COMPONENT
 *
 * This component is dynamically imported by the route handler and rendered
 * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
 */
export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {/* Hero header (custom) */}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      {/* Table of contents placeholder */}
      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> – In 2026, Australian small businesses are using AI to draft customer emails and social posts, answer common enquiries, summarise notes, and tidy up bookkeeping. The safest way to start is a short, low‑risk pilot on one task your team already does every day.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Exploring AI tools and planning a short pilot."
        />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'Owners and managers looking for quick wins without big budgets.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'Helping out in family businesses or side‑hustles with AI skills.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'Advisors and mentors supporting Australian small businesses.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>What small businesses are actually doing with AI in 2026</h2>
        <p>
          Themes from current Australian coverage show clear early wins: marketing copy and product descriptions, inbox triage and replies, website and help‑desk FAQs, transcription and content summaries, basic forecasting, and receipt categorisation. These are repeatable workflows, easy to measure, and typically low‑risk.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Start where benefits are immediate and measurable: automate parts of workflows you already do daily, not whole jobs.
        </QuoteBlock>

        <h2>Start with a safe, narrow pilot (2–4 weeks)</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dfd47926-b1a6-469c-b2c4-bf43654e2805.jpg?alt=media&token=72bfaff8-3714-47fd-98e7-947caa5e5a2a" alt="Tech team brainstorming in a 90s film aesthetic during a focused pilot project session." className="w-full rounded-lg my-8" />

        <p>
          A short pilot lets you test value without big spend. Keep it to one business process, under $500, and track time and quality improvements against a baseline.
        </p>

        <h3>Pick one task, not a department</h3>
        <p>
          Good candidates include drafting reply emails to common enquiries, generating product descriptions from a checklist, turning call notes into a follow‑up plan, or tagging and summarising support tickets.
        </p>

        <QuoteBlock title="Practical checklist" variant="purple">
          Define one outcome and success metric; set a weekly time baseline; choose one tool; write simple prompts and examples; agree on what data is allowed; and decide in advance how you will measure quality.
        </QuoteBlock>

        <ArticleStepList
          title="30‑day pilot plan"
          steps={[
            { label: 'Week 0: Choose one workflow and capture a 1‑week baseline (time/quality). ' },
            { label: 'Week 1: Select a tool that fits your stack (e.g., Microsoft/Google/ChatGPT Teams). ' },
            { label: 'Week 1: Configure access and guardrails (no sensitive data; opt‑out of training). ' },
            { label: 'Weeks 2–3: Run the pilot with 3–5 real examples; log time, outputs, corrections.' },
            { label: 'Week 3: Review security and privacy against Cyber.gov.au guidance.' },
            { label: 'Week 4: Compare to baseline; decide: scale, tweak, or stop.' },
          ]}
          accent="teal"
        />

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download a pilot plan, risk checklist, and prompt examples to get moving faster."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <h2>Choosing tools that fit how you already work</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-457d6857-02d1-4d48-b737-7db763113054.jpg?alt=media&token=7261b560-3a15-4cbe-a28f-62b1ce79ba7a" alt="A vibrant 90s film-inspired scene showcasing a diverse team collaborating in a tech startup environment." className="w-full rounded-lg my-8" />

        <p>
          Pick tools that plug into your daily systems. If your team lives in Microsoft 365, start with Copilot; if you use Google Workspace, try Gemini. If you need a general assistant for drafting, ChatGPT Teams or similar can work. Vertical add‑ons inside your help‑desk, accounting, or e‑commerce suite often reduce setup effort and risk.
        </p>
        <p>
          Check data controls (can you opt‑out of model training?), permissioning (who can see what?), and pricing (keep the pilot under $500 total). Prefer Australian or compliant data handling where possible, and keep sensitive information out of prompts.
        </p>

        <h2>Protect customer and business data from day one</h2>
        <p>
          Follow small‑business security basics from Cyber.gov.au: least‑privilege access, strong authentication, and a clear rule on what data can be used in prompts. Keep an audit trail of prompts and outputs during pilots, and never paste payment details or sensitive personal information. If in doubt, leave it out.
        </p>

        <QuoteBlock title="Pro tip" variant="orange">
          Treat AI like a junior assistant: it drafts quickly, you verify. Keep humans in the loop for anything customer‑facing or legally sensitive.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Estimate ROI with simple numbers</h2>
        <p>
          A basic model is time saved × hourly cost, plus any quality uplift. Example: if drafting a product description drops from 20 to 8 minutes across 60 items a month, that’s 12 minutes × 60 = 12 hours saved. At $45/hour, that’s ~$540/month before quality benefits. Compare against tool costs and keep only what pays back.
        </p>

        <h2>What to do next</h2>
        <p>
          Choose one workflow, run a 2–4 week pilot, and measure results. If it works, document the prompt, data rules, and QA checks so anyone on the team can repeat it. Expand to one more workflow, then stop and reassess. Sustainable progress beats a big‑bang project.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Need help with ${TOPIC}?`}
        body="MLAI is a not‑for‑profit community empowering the Australian AI community. Connect for practical pointers and community resources."
        buttonText="Get recommendations"
        buttonHref="/contact"
        note="We’ll point you to community resources and upcoming sessions."
      />

      {/* Author Bio */}
      <AuthorBio author={authorDetails} />

      {/* FAQ */}
      <ArticleFAQ items={faqItems} />

      {/* Navigation */}
      <ArticleFooterNav />
    </>
  )
}
