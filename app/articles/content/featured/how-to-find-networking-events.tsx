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
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { getDefaultArticleAuthorDetails } from '../../authors'

/** ========== INPUTS (replace all placeholders) ========== */
export const useCustomHeader = true

const TOPIC = 'How to find networking events in Australia'
export const CATEGORY = 'featured'
export const SLUG = 'how-to-find-networking-events'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR =
  AUTHOR_PROFILE.avatarUrl ??
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
export const DATE_PUBLISHED = '2026-01-28'
export const DATE_MODIFIED = '2026-01-28'
export const DESCRIPTION = 'Practical ways to find networking events in Australia: where to look, how to filter by industry and city, and tips for online and in‑person meetups.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-12562886-6a00-40c3-bd65-734cd91f9fb4.jpg?alt=media&token=d1df7641-6648-4366-a06e-630ccc6043c7"
const HERO_IMAGE_ALT = 'People networking at an event'
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
    question: 'Where can I find networking events near me?',
    answer: (
      <>
        Start with major platforms: Meetup, Eventbrite (AU), Humanitix, and LinkedIn Events. Filter by your city (e.g., Melbourne, Sydney) and topic (e.g., AI, design). Also check coworking hubs, university calendars, and local council “What’s On” pages.
      </>
    ),
  },
  {
    id: 2,
    question: 'What keywords should I use when searching?',
    answer: (
      <>
        Combine your city + industry + format: “Melbourne AI meetup”, “Sydney product networking”, “Brisbane tech breakfast”. Try synonyms like community, industry night, showcase, unconference, after‑hours, or lunch‑and‑learn.
      </>
    ),
  },
  {
    id: 3,
    question: 'How do I network if I’m introverted or new?',
    answer: (
      <>
        Arrive early before groups form, set a small goal (2–3 conversations), and use an easy opener: “Hi, I’m {AUTHOR.split(' ')[0]}. What brought you along?” Consider volunteering at registration—it’s a natural way to meet people.
      </>
    ),
  },
  {
    id: 4,
    question: 'What should I bring or prepare?',
    answer: (
      <>
        A one‑line intro, your LinkedIn QR code saved on your phone, a notes app to jot follow‑ups, and optional business cards. Skim the agenda and speakers so you have questions ready.
      </>
    ),
  },
  {
    id: 5,
    question: 'How do I judge if an event is worth my time?',
    answer: (
      <>
        Check organiser track record, format (talks vs. networking), attendee signals (RSVPs, past photos), and practicals: time, location, accessibility, and any code of conduct. If it aligns with your goals and you can follow up with 2–3 people, it’s likely worthwhile.
      </>
    ),
  },
  {
    id: 6,
    question: 'How should I follow up after attending?',
    answer: (
      <>
        Connect within 24–48 hours. Reference where you met and one specific topic you discussed. Offer a clear next step (share a resource, book a short call, or meet at the next event).
      </>
    ),
  },
]

/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro: 'Brief, factual overview referencing current Australian context.',
  items: [
    { label: 'Where can I find networking events near me?', description: 'Start with Meetup, Eventbrite, Humanitix and LinkedIn Events; filter by your city and industry.' },
    { label: 'How do I find events relevant to my field?', description: 'Use keywords (e.g., AI, design, product), follow organisers, and check coworking and university calendars.' },
    { label: 'What if there are no events nearby?', description: 'Search for virtual meetups, widen your radius, join Slack/Discord groups, or host a small coffee meetup.' },
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
    href: 'https://www.meetup.com/',
    title: 'Meetup — Find your next event',
    publisher: 'Meetup',
    description: 'Global community platform to discover local groups and events by topic and city.',
    category: 'guide',
  },
  {
    id: 2,
    href: 'https://www.eventbrite.com.au/d/australia/networking/',
    title: 'Eventbrite Australia — Networking events',
    publisher: 'Eventbrite',
    description: 'Search and filter networking events across Australian cities and industries.',
    category: 'guide',
  },
  {
    id: 3,
    href: 'https://humanitix.com/au',
    title: 'Humanitix — Find networking events in Australia',
    publisher: 'Humanitix',
    description: 'Ticketing platform with Australian focus and charity model; search by keyword and city.',
    category: 'guide',
  },
  {
    id: 4,
    href: 'https://www.linkedin.com/help/linkedin/answer/a507663/create-and-manage-events-on-linkedin',
    title: 'Create and manage events on LinkedIn',
    publisher: 'LinkedIn Help',
    description: 'How LinkedIn Events work, including discovery and notifications.',
    category: 'analysis',
  },
  {
    id: 5,
    href: 'https://www.acs.org.au/industry-insights/events.html',
    title: 'ACS — Events',
    publisher: 'Australian Computer Society',
    description: 'Industry association listing for technology events across Australia.',
    category: 'industry',
  },
  {
    id: 6,
    href: 'https://whatson.melbourne.vic.gov.au/',
    title: 'City of Melbourne — What’s On',
    publisher: 'City of Melbourne',
    description: 'Official city guide featuring community and professional events (example of local council listings).',
    category: 'government',
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

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        {/* Opening paragraph */}
        <p>
          <strong>{TOPIC}</strong> — If you’re new to a city, changing roles, or building an Australian network, the quickest wins come from searching where organisers actually post, following a handful of reliable hosts, and setting a simple weekly routine so good events come to you.
        </p>

        {/* Hero Image - Use ArticleImageBlock, not raw img */}
        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} caption="Networking in Australia spans meetups, industry associations, coworking hubs, and university communities." />

        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Teams',
              description: 'For leaders validating ideas, seeking collaborators, or hiring.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For people building a local network and portfolio in Australia.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For organisers, mentors, and hubs curating events and meetups.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        {/* RESEARCH-DERIVED SECTIONS */}
        <h2>Use the big discovery platforms (and how to search them)</h2>
        <p>
          Most Australian networking events are published on a few platforms. Start here and save your searches:
        </p>
        <ul>
          <li>
            <strong>Meetup</strong>: Filter by city and topic. Follow groups so new events appear in your feed and email digest.
          </li>
          <li>
            <strong>Eventbrite (AU)</strong>: Use category = Business/Science & Tech and keywords like “networking”, “community”, “showcase”, or “demo”.
          </li>
          <li>
            <strong>Humanitix</strong>: Popular with Australian organisers; the search bar plus city filter surfaces hidden gems.
          </li>
          <li>
            <strong>LinkedIn Events</strong>: Search a topic, then switch the results tab to Events and set a location radius. Follow organisers to get notifications.
          </li>
        </ul>
        <p>
          Quick Google helpers: <em>site:eventbrite.com.au networking “Sydney”</em>, <em>site:meetup.com “Melbourne” AI</em>, or <em>“Brisbane” tech meetup this week</em>. Adjust the city and topic to suit.
        </p>

        <QuoteBlock title="Key insight" variant="purple">
          In most cities, 10–20 organisers run the majority of quality events. Follow organisers you like rather than chasing every listing.
        </QuoteBlock>

        <h2>Find events through your local ecosystem</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-55c8642a-31c5-4501-8ed9-eee553a50b18.jpg?alt=media&token=06cb06e5-c3dc-4e10-ba11-005d42f0e954" alt="People collaborating in a vibrant tech startup setting, captured with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

        <p>
          Beyond platforms, tap the institutions that host communities:
        </p>
        <ul>
          <li>
            <strong>Coworking and innovation hubs</strong>: Many publish public calendars or newsletters. Search “[your city] coworking events”.
          </li>
          <li>
            <strong>Universities and student societies</strong>: Public lectures, hack nights, and industry mixers often welcome non‑students.
          </li>
          <li>
            <strong>Industry associations</strong>: For tech, check bodies like ACS and similar groups; they run talks and networking nights across states.
          </li>
          <li>
            <strong>Local councils</strong>: “What’s On” guides list business and community events (good for small‑format meetups and workshops).
          </li>
          <li>
            <strong>Slack/Discord communities</strong>: Many local groups maintain shared calendars or pin event threads—search “{new Date().getFullYear()} {new Intl.DateTimeFormat('en-AU', { month: 'long' }).format(new Date())} Melbourne AI Discord/Slack”.
          </li>
        </ul>

        <h3>Search patterns that work (copy/paste and adapt)</h3>
        <ul>
          <li>
            Meetup/Eventbrite/Humanitix: “{new Date().getFullYear()} {new Intl.DateTimeFormat('en-AU', { month: 'long' }).format(new Date())} [City] [topic] networking/meetup”.
          </li>
          <li>
            Google: <em>site:eventbrite.com.au</em> OR <em>site:humanitix.com</em> “networking” “[City]”.
          </li>
          <li>
            LinkedIn: Search topic → Events tab → Location = your city → Date = This week/This month.
          </li>
        </ul>

        <h2>Online‑first options if you can’t travel</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-051f2bc1-6d32-41f9-bade-6b727db59e43.jpg?alt=media&token=d75ef467-609a-43df-9124-1a1b01134703" alt="Group of professionals collaborating in a trendy tech workspace with a retro 90s film aesthetic." className="w-full rounded-lg my-8" />

        <p>
          Virtual meetups and webinars can be just as useful for starting conversations:
        </p>
        <ul>
          <li>
            Many Meetup and Eventbrite listings include an online stream—filter for Online.
          </li>
          <li>
            LinkedIn Live and YouTube premieres often have active chats; connect with speakers and attendees afterward.
          </li>
          <li>
            Join community Slack/Discord spaces and attend their virtual office hours or demo days.
          </li>
        </ul>

        <QuoteBlock title="Pro tip" variant="orange">
          Arrive 10–15 minutes early. You’ll meet the organiser and early arrivals—often the people most open to chatting and making introductions.
        </QuoteBlock>

        <ArticleStepList
          title="Set up a 20‑minute weekly routine that surfaces the best events"
          steps={[
            { label: 'Save platform searches (city + topic) on Meetup, Eventbrite, and Humanitix; follow 10 organisers you like.' },
            { label: 'On LinkedIn, follow organisers and join 2–3 groups; subscribe to 3–5 hub/university newsletters.' },
            { label: 'Each Friday, review your feeds for 20 minutes; shortlist up to two events, RSVP, and block your calendar.' },
          ]}
          accent="teal"
        />

        <h2>How to quickly assess an event’s value</h2>
        <p>
          Before you RSVP, scan the listing for:
        </p>
        <ul>
          <li>
            <strong>Fit</strong>: Agenda, audience, and host—do they match your goals?
          </li>
          <li>
            <strong>Signals</strong>: Past photos, repeat attendees, or partner organisations suggest reliability.
          </li>
          <li>
            <strong>Practicalities</strong>: Location, start/finish time, accessibility info, and code of conduct.
          </li>
        </ul>

        <h2>Closing: make it sustainable</h2>
        <p>
          Networking works when it’s consistent, not intense. Keep a light routine, pick one in‑person and one online event per month, and always follow up with a short, specific message. That rhythm compounds into a strong Australian network.
        </p>
      </div>

      {/* References */}
      <ArticleReferences references={references} heading="Sources & further reading" />

      {/* Disclaimer */}
      <ArticleDisclaimer />

      {/* Company CTA (single, community‑focused) */}
      <ArticleCompanyCTA
        title="Join the MLAI community"
        body="Connect with practitioners and enthusiasts across Australia—share events, find collaborators, and get practical support."
        buttonText="Get in touch"
        buttonHref="/contact"
        note="Not‑for‑profit, community‑first."
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
