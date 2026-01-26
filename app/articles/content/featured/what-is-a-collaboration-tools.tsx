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
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'What are collaboration tools?'
export const CATEGORY = 'featured'
export const SLUG = 'what-is-a-collaboration-tools'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-26'
export const DATE_MODIFIED = '2026-01-26'
export const DESCRIPTION = 'A plain-English guide to collaboration tools: definition, types, benefits, examples, and how to choose for Australian teams.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4"
const HERO_IMAGE_ALT = 'Australian team collaborating with laptops, sticky notes, and a video call on screen'
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
    question: 'What is a collaboration tool?',
    answer: (
      <>A collaboration tool is software that helps people work together by making communication, content, and coordination visible in one place. Common examples include chat (e.g. channels/DMs), shared documents, video meetings, task boards, and whiteboards. Tools can be real-time (synchronous) or asynchronous.</>
    ),
  },
  {
    id: 2,
    question: 'How are collaboration tools different from communication tools?',
    answer: (
      <>
        Communication tools focus on messages (chat, email, video). Collaboration tools include communication plus shared workspaces where files, tasks, notes, and decisions live. Many platforms combine both (e.g. Teams, Slack with apps, Google Workspace).
      </>
    ),
  },
  {
    id: 3,
    question: 'What types of collaboration tools are there?',
    answer: (
      <>
        <ul className="list-disc pl-5">
          <li>Communication: chat, channels, video conferencing</li>
          <li>Content/knowledge: docs, sheets, wikis, shared drives</li>
          <li>Coordination: task boards, roadmaps, issue trackers</li>
          <li>Whiteboarding/ideation: digital canvases</li>
          <li>Workflow/integration: automation and app connectors</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    question: 'Which collaboration tools are commonly used?',
    answer: (
      <>Popular choices include Microsoft Teams and 365, Slack, Google Workspace, Atlassian Confluence/Jira, Trello, Asana, Miro, and Zoom. Choose based on your workflows, existing licences, and security needs rather than brand alone.</>
    ),
  },
  {
    id: 5,
    question: 'How do I choose the right tool for my team?',
    answer: (
      <>
        Start with the work: document your must-do workflows, decide on non-negotiables (SSO, retention, data residency), shortlist options that integrate with your stack, then pilot with a small team and measure adoption (messages, comments, tasks completed, meeting friction).
      </>
    ),
  },
  {
    id: 6,
    question: 'Are collaboration tools secure and compliant in Australia?',
    answer: (
      <>
        Look for SSO/MFA, encryption at rest/in transit, audit logs, retention and export, data residency options, and role-based access. If you’re in the public sector, check Digital NSW and Australian Government guidance for tool selection and record-keeping.
      </>
    ),
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'What is a collaboration tool?', description: 'Software that helps people work together by combining communication, shared content, and task coordination (real-time or async).' },
    { label: 'What types exist?', description: 'Communication (chat/video), content/knowledge (docs/wikis), coordination (tasks/issues), whiteboards, and integrations/automation.' },
    { label: 'How do I choose?', description: 'Start from workflows, require SSO/security, shortlist options that fit your suite, pilot with a small team, and measure adoption.' },
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
    href: 'https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources/digital-collaboration-tools',
    title: 'Digital collaboration tools',
    publisher: 'Digital NSW',
    description: 'Government guidance on selecting and using collaboration tools, including security and record-keeping considerations.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://www.techtarget.com/searchunifiedcommunications/definition/team-collaboration-tools',
    title: 'What are collaboration tools? Definition, types and benefits',
    publisher: 'TechTarget',
    description: 'Overview of collaboration tools, capabilities, and business benefits.',
    category: 'analysis',
  },
  {
    id: 3,
    href: 'https://en.wikipedia.org/wiki/Collaboration_tool',
    title: 'Collaboration tool',
    publisher: 'Wikipedia',
    description: 'General reference on categories, history, and examples of collaboration software.',
    category: 'guide',
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
          <strong>{TOPIC}</strong> — In hybrid and distributed teams, work spreads across chat, docs, meetings, and task boards. Collaboration tools bring these threads together so people can communicate, co‑author content, and coordinate delivery without losing context.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Modern teams collaborate across chat, docs, whiteboards and meetings."
          width={1600}
          height={1067}
        />

        {/* WHO IS THIS FOR - Use AudienceGrid */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'Choose tools that reduce friction and make work visible.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'Understand the landscape and build a job‑ready toolkit.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'Run events and study groups with shared workspaces.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>What counts as a collaboration tool? (Definition)</h2>
        <p>
          At its core, a collaboration tool is software that helps people work together on shared outcomes. Competitor sources define this as a blend of communication (chat/meetings), shared content (docs/wikis/files), and coordination (tasks/boards/calendars). Tools can be synchronous (live meetings, co‑editing) or asynchronous (comments, threads, issues) and often integrate with your wider stack.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          Successful collaboration tools reduce context switching. They keep conversation, content, and coordination close together so decisions are easy to find later.
        </QuoteBlock>

        <h2>Types of collaboration tools (with examples)</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4a08f56-b1e5-4c59-acba-84c06fe7165c.jpg?alt=media&token=e7e0a94c-4746-4872-8bd9-02bfadf4b52d" alt="Diverse team collaborating in a vibrant 90s tech startup setting, surrounded by laptops and creative brainstorming." className="w-full rounded-lg my-8" />

        <p>Top references group tools into a few practical categories. Most teams use a mix:</p>
        <h3>1) Communication and messaging</h3>
        <p>Channels and DMs for quick questions and updates; video for live discussion.</p>
        <ul className="list-disc pl-5">
          <li>Chat: Slack, Microsoft Teams</li>
          <li>Meetings: Zoom, Google Meet, Teams Meetings</li>
        </ul>

        <h3>2) Content and knowledge</h3>
        <p>Shared documents, sheets, slides, and wikis capture decisions and how‑tos.</p>
        <ul className="list-disc pl-5">
          <li>Docs/Drive: Google Workspace, Microsoft 365</li>
          <li>Wikis/notes: Confluence, Notion</li>
        </ul>

        <h3>3) Coordination and delivery</h3>
        <p>Task boards and issue trackers make ownership and progress visible.</p>
        <ul className="list-disc pl-5">
          <li>Boards: Trello, Asana</li>
          <li>Issues/roadmaps: Jira</li>
        </ul>

        <h3>4) Whiteboarding and ideation</h3>
        <p>Visual canvases for workshops, retros, and early product thinking.</p>
        <ul className="list-disc pl-5">
          <li>Miro, FigJam</li>
        </ul>

        <h3>5) Workflow and integration</h3>
        <p>Automations and app connectors reduce copy‑paste and duplicate work.</p>
        <ul className="list-disc pl-5">
          <li>Built‑in connectors (Teams/Slack apps), Zapier/Make</li>
        </ul>

        <h2>Benefits and trade‑offs</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8098eb17-f1af-4ca1-bf97-62c44cdc79c3.jpg?alt=media&token=9ff0bfe4-35b9-4a59-ada8-fcc35bc3ec49" alt="Group of diverse individuals collaborating in a vibrant tech workspace, capturing 90s film nostalgia." className="w-full rounded-lg my-8" />

        <p>Well‑chosen tools improve communication, visibility, and delivery speed. References emphasise these gains, with some caveats:</p>
        <ul className="list-disc pl-5">
          <li><strong>Clarity:</strong> Decisions and files live with the conversation.</li>
          <li><strong>Speed:</strong> Real‑time co‑editing and tighter feedback loops.</li>
          <li><strong>Inclusion:</strong> Async threads help teams across time zones.</li>
          <li><strong>Trade‑offs:</strong> Notification overload, tool sprawl, and weak governance can erode value. Start simple and set norms.</li>
        </ul>

        <h2>Examples you’ll see in Australian teams</h2>
        <p>
          Many local organisations use Microsoft 365/Teams or Google Workspace as a base, then add specialist tools for boards (Trello/Asana), issues (Jira), workshops (Miro), and meetings (Zoom/Meet). Pick the minimum set that fits your workflows and compliance needs.
        </p>
        <ul className="list-disc pl-5">
          <li>Suites: Microsoft 365 + Teams, Google Workspace</li>
          <li>Chat: Slack (with app integrations)</li>
          <li>Boards/Tasks: Trello, Asana</li>
          <li>Issues/Roadmaps: Jira</li>
          <li>Whiteboards: Miro, FigJam</li>
          <li>Meetings: Zoom, Google Meet, Teams</li>
        </ul>

        <ArticleResourceCTA
          eyebrow="Resources"
          title={`Get templates for ${TOPIC}`}
          description="Download checklists and a short pilot plan to evaluate tools with your team."
          buttonLabel="Download now"
          buttonHref="/resources"
          accent="purple"
        />

        <h2>How to choose a collaboration tool (short framework)</h2>
        <p>Use a lightweight, evidence‑based selection process before you commit org‑wide.</p>
        <ArticleStepList
          title="Step‑by‑step actions"
          steps={[
            { label: 'Define top 3 workflows (e.g. triage requests, run stand‑ups, ship docs).' },
            { label: 'List must‑haves (SSO/MFA, retention/export, data residency, cost caps).' },
            { label: 'Shortlist 2–3 options that integrate with your existing suite (365/Workspace).' },
            { label: 'Pilot with a small team for 2–3 weeks; track adoption and friction points.' },
            { label: 'Decide, establish conventions (channels, naming, templates), and roll out.' },
          ]}
          accent="teal"
        />

        <QuoteBlock title="Pro tip" variant="orange">
          Measure behaviour, not opinions: messages posted, comments resolved, tasks completed, meeting time saved. Adoption data beats feature lists.
        </QuoteBlock>

        <MLAITemplateResourceCTA />

        <h2>Security, privacy, and record‑keeping (AU context)</h2>
        <p>
          Australian guidance (e.g. Digital NSW) recommends balancing usability with governance. Before rollout, confirm how the tool handles authentication, data, and records.
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Access:</strong> SSO/MFA, role‑based permissions, guest access controls.</li>
          <li><strong>Data:</strong> Encryption at rest/in transit, retention and export, data residency options.</li>
          <li><strong>Records:</strong> Decide what must be captured for compliance, then set channels/labels and export policies accordingly.</li>
          <li><strong>Audit:</strong> Logs, admin reporting, and incident response processes.</li>
        </ul>

        <h2>Implementation: onboarding that sticks</h2>
        <p>Tools do not replace team agreements. Pair the platform with simple conventions.</p>
        <ul className="list-disc pl-5">
          <li>Agree channel names and when to use chat vs. docs vs. issues.</li>
          <li>Use templates for recurring rituals (stand‑ups, retros, handovers).</li>
          <li>Trim notifications; encourage threads over DMs for findability.</li>
          <li>Review usage monthly and archive stale spaces to avoid sprawl.</li>
        </ul>

        <h2>Closing: start small, learn fast</h2>
        <p>
          Pick one workflow, run a short pilot, and measure adoption. Keep what helps, remove what distracts, and document the convention so new teammates succeed on day one.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA */}
      <ArticleCompanyCTA
        title={`Keen to connect with Australia’s AI community?`}
        body="MLAI is a not‑for‑profit community empowering practitioners and learners. Reach out and we’ll point you to relevant events and resources."
        buttonText="Contact MLAI"
        buttonHref="https://mlai.au/contact"
        note="Friendly, community‑first support."
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
