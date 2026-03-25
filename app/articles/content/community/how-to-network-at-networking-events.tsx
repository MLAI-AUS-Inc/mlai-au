import type { ReactNode } from 'react'
import { Link } from 'react-router'
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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to network at networking events'
const CATEGORY = 'community-professional-development' // e.g. 'ai'
const SLUG = 'how-to-network-at-networking-events'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-22'
const DATE_MODIFIED = '2026-01-22'
const DESCRIPTION = 'Practical, AU-focused tips to introduce yourself, start conversations, add value and follow up after networking events—templates included.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ff43afe8-537f-4a5b-8796-c64d4545eec0.jpg?alt=media&token=0a60df5b-c2e8-4925-8ed0-abedc264838b"
const HERO_IMAGE_ALT = 'People chatting at an evening tech meetup with name badges'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'What do I say if I\'m between roles?', answer: <>Keep it short and positive: “I\'m between roles after working on MLOps at <em>Acme</em>. I\'m exploring applied AI roles in health. What brings you to tonight\'s event?” This frames your direction and invites a response without oversharing.</> },
  { id: 2, question: 'Are business cards still used in Australia (2026)?', answer: <>Optional. Most attendees swap LinkedIn via QR or a short follow‑up message. If you use cards, add a QR to your LinkedIn or portfolio. Prioritise a warm, specific follow‑up within 48 hours.</> },
  { id: 3, question: 'How many people should I aim to meet at one event?', answer: 'Three to five meaningful conversations beat a dozen quick pitches. Depth makes follow‑up easier and more genuine.' },
  { id: 4, question: 'How do I follow up if I forgot to exchange details?', answer: (<><p>Try one or more of these:</p><ul><li>Check the event page or attendee list for names and socials.</li><li>Search LinkedIn with the person’s first name + company + event name.</li><li>Message the organiser: “Could you pass my details to [Name] from [Company] I spoke with by the demo table?”</li></ul></>) },
  { id: 5, question: 'What if I don\'t drink alcohol?', answer: 'Completely fine. Order a zero‑alcohol option or water—social norms at AU tech events are inclusive. Focus on conversations, not drinks.' },
  { id: 6, question: 'What should I avoid doing at networking events?', answer: (<><ul><li>Leading with a hard pitch or request.</li><li>Monopolising one person’s time—aim for 5–10 minutes unless it’s flowing.</li><li>Hovering in closed groups; look for open circles.</li><li>Sharing someone’s details or photos without consent.</li></ul></>) },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'What do you say when networking at an event?',
      description: 'Use a 10‑second intro: name, role/focus, what you’re exploring, then ask an easy question.',
    },
    {
      label: 'How do you follow up after a networking event?',
      description: 'Send a short note within 24–48 hours with context, a helpful link, and one clear next step.',
    },
    {
      label: 'How can shy people network effectively?',
      description: 'Join open groups, use simple questions, aim for 2–3 quality chats, and volunteer next time.',
    },
  ],
}

export default function ArticlePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Articles', href: '/articles' },
    { label: TOPIC, current: true },
  ]

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <div className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={`${TOPIC} (2026)`}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ArticleTocPlaceholder />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> is less about collecting contacts and more about starting useful conversations you can continue later. The approach below is tailored to AU tech/AI meetups in 2026—short intros, question‑led chats, and privacy‑aware follow‑ups.
            {' '}
            Prefer a deeper dive? Explore more in the{' '}
            <Link to="/articles" className="underline underline-offset-4">Community & Professional Development</Link>{' '}pillar.
          </p>

          <ArticleImageBlock
            src={HERO_IMAGE}
            alt={HERO_IMAGE_ALT}
            width={1200}
            height={630}
            containerClassName="my-10"
          />

          <h2>How to introduce yourself at a networking event</h2>
          <p>
            Use a clear 10‑second intro that ends with a question. Formula: name + role (or focus) + what you\'re exploring + an easy question. For example: “I\'m Priya—product designer moving into AI safety. I\'m exploring evaluation tools for small teams. What brings you to this meetup?” This keeps things human and opens the floor.
          </p>

          <ArticleResourceCTA
            eyebrow="Download"
            title={`Get the checklist for ${TOPIC}`}
            description="Practical template to apply the concepts immediately."
            buttonLabel="Download now"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Lead with a question, not a pitch"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
          >
            Make your last sentence a low‑pressure question (e.g., “What are you building?”, “Which talk are you here for?”). Questions lower nerves and invite natural conversation.
          </ArticleCallout>

          <h2>Conversation starters that work at tech and AI meetups</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8777a4e0-86e6-4bc0-a7bb-a6bb87bab79a.jpg?alt=media&token=624d4812-c501-4b3a-b08c-68eee2c149f1" alt="Diverse group of professionals networking at a tech meetup with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            Keep openers short, specific, and kind. Five that travel well in AU events:
          </p>
          <ul>
            <li>“What\'s the most interesting thing you\'ve heard tonight?”</li>
            <li>“I\'m new to this group—how do people usually use the break time?”</li>
            <li>“I noticed your badge says <em>Geelong</em>; do you work with any local startups?”</li>
            <li>“If someone\'s new to LLMs at work, what\'s a safe first project?”</li>
            <li>“What problem are you hoping to solve with AI this year?”</li>
          </ul>

          <h3>Reading the room: open vs closed circles</h3>
          <p>
            Join groups that have a physical “gap” (open triangle) and make brief eye contact before stepping in. Avoid tight, closed circles or 1‑on‑1s that look intense. If you\'re stuck, queue for a drink or snacks—queues create easy micro‑chats.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              'Draft your 10‑second intro and 3 event‑specific openers',
              'Aim for 3–5 quality chats (5–10 minutes each)',
              'Swap details or agree on a follow‑up topic',
              'Send follow‑ups within 48 hours',
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Evidence or expert insight" variant="purple">
            “People go to networking events to meet new people. A clear intro plus a genuine question beats a polished pitch almost every time.”
          </QuoteBlock>

          <h2>If you\'re shy or new: low‑pressure ways to join</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-be9809ab-ca93-4437-ac14-3ed94fec8f43.jpg?alt=media&token=308e9e75-f2c3-493f-b1eb-5ad8a03d79fe" alt="Diverse individuals in a 90s tech workspace, fostering connection in a relaxed, friendly atmosphere." className="w-full rounded-lg my-8" />

          <p>
            Start with open groups, speaker lines, or tables with spare seats. Ask practical questions (“Is there a Slack for this group?”, “Where do project posts go?”). Consider volunteering on the door for a future event—you\'ll meet everyone naturally.
          </p>

          <h2>Add value in the moment (without selling)</h2>
          <p>
            Share a pointer or perspective, not a pitch. Examples: “There\'s an AU‑focused repo for that—happy to DM it,” or “We tried something similar; our lesson was to start with a tiny pilot.” Offer to send a link later rather than fishing through your phone on the spot.
          </p>

          <h2>Follow‑up that actually gets replies</h2>
          <p>
            Follow up within 24–48 hours while the chat is fresh. Keep it short, include context, and suggest a tiny next step. Two simple templates:
          </p>
          <ul>
            <li>
              LinkedIn DM: “Great to meet at {TOPIC.toLowerCase()} last night—loved your take on evaluation. Here\'s the repo I mentioned. If useful, happy to swap notes on small‑team testing next week.”
            </li>
            <li>
              Email: “Hi [Name]—Sam from the AI meetup at [Venue]. We discussed data labelling. This 3‑step guide helped us avoid scope creep. If you\'re exploring pilots, a 15‑minute call next week could save you time—no pressure.”
            </li>
          </ul>

          <AudienceGrid
            heading="Who this helps"
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
          />

          <MLAITemplateResourceCTA />

          <h2>Do\'s and don\'ts (AU context)</h2>
          <ul>
            <li>Do keep intros short; don\'t hard‑pitch strangers.</li>
            <li>Do ask consent before sharing photos or tagging people.</li>
            <li>Do respect venue and organiser codes of conduct.</li>
            <li>Don\'t dominate a conversation—offer others space to join.</li>
            <li>Do close politely: “Great chatting—shall we connect on LinkedIn and pick this up?”</li>
          </ul>

          <h2>Take this plan to your next event</h2>
          <p>
            Prepare your 10‑second intro, arrive with three openers, focus on 3–5 quality chats, and send concise follow‑ups within 48 hours. That\'s it—repeatable, respectful, and effective for Australian AI/tech communities.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Draft your 10‑second intro and three openers.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Aim for 3–5 quality chats; exchange details intentionally.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Send follow‑ups within 48 hours with one clear next step.</span>
              </li>
            </ul>
          </div>

          <ArticleCompanyCTA
            title={`Need help with ${TOPIC}?`}
            body="MLAI is a not‑for‑profit community empowering the Australian AI community. Join in and connect with peers across Australia."
            buttonText="Join the MLAI community"
            buttonHref="/contact"
            note="Community‑first, no hard sell—just people helping people."
          />
        </div>
        <ArticleFAQ items={faqItems} />

        <AuthorBio author={authorDetails} />

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </div>
  )
}
