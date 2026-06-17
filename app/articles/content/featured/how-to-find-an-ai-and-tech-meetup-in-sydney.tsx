import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = 'How to Find an AI and Tech Meetup in Sydney'
export const CATEGORY = 'featured'
export const SLUG = 'how-to-find-an-ai-and-tech-meetup-in-sydney'
export const DATE_PUBLISHED = '2026-06-16'
export const DATE_MODIFIED = '2026-06-16'
export const DESCRIPTION = 'Meetup in Sydney for AI, tech and startup networking.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-46210747-b902-4e9d-8ffa-f3df1058658b.jpg?alt=media&token=2ecc04f5-87e3-4795-aba4-d59f1905b8e5'
const HERO_IMAGE_ALT = 'Close-up candid of Sydney tech meetup attendees networking over laptops at an AI startup event'
export const FEATURED_FOCUS = 'startups'

const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

type AuthorDetails = {
  name: string
  role: string
  bio: string
  avatarUrl: string
}

function AuthorBio({ author }: { author: AuthorDetails }) {
  const initials = author.name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <section className='rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div
          role='img'
          aria-label={author.name}
          className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700'
          style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
        >
          {author.avatarUrl ? null : initials}
        </div>
        <div>
          <p className='text-lg font-semibold text-slate-900'>{author.name}</p>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{author.role}</p>
        </div>
      </div>
      {author.bio ? <p className='mt-4 text-base leading-7 text-slate-700'>{author.bio}</p> : null}
    </section>
  )
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'How do I find a useful AI or tech meetup in Sydney?', answer: 'Start with the conversation you want, then search across AI, machine learning, data science, tech startup, IT, UX, web, content strategy, and small-business AI labels. Shortlist a few groups before you RSVP.' },
  { id: 2, question: 'Should I only attend events with AI in the title?', answer: 'No. AI conversations often appear inside startup, business, UX, web, content strategy, and small-business groups. The event purpose and audience matter more than whether the title includes AI.' },
  { id: 3, question: 'What should I check before RSVP?', answer: 'Look for a clear audience, topic, next event date, location, format, regular activity, and practical value. If the page is vague about these details, put it lower on your shortlist.' },
  { id: 4, question: 'How can I turn one event into a stronger local network?', answer: 'Prepare a short introduction and one practical question. After the event, note useful people, topics, and groups, then decide whether to return, try an adjacent meetup, or get more involved.' },
]

export const summaryHighlights = {
  heading: 'Key facts: How to Find an AI and Tech Meetup in Sydney',
  intro: 'Meetup in Sydney for AI, tech and startup networking.',
  items: [
    { label: 'Where to meet singles in Sydney?', description: 'This guide focuses on AI and tech networking, not dating. For professional conversations, search Sydney groups around AI, startups, IT, UX, web, content strategy, and small business.' },
    { label: 'What replaced Meetup?', description: 'The grounded article does not identify a replacement for Meetup. It recommends checking event platforms and organiser websites, because some groups publish dates, locations, sponsors, and formats on their own pages.' },
    { label: 'Is meetup a good way to meet singles?', description: 'This article does not assess meetups for dating. It covers how to find Sydney AI, tech, startup, business, and digital events that support useful professional conversations.' },
  ],
}

export const articleMeta = {
  title: 'How to Find an AI and Tech Meetup in Sydney',
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
}

const faqSchemaItems = [
  { question: 'Where to meet singles in Sydney?', answer: 'This guide focuses on AI and tech networking, not dating. For professional conversations, search Sydney groups around AI, startups, IT, UX, web, content strategy, and small business.' },
  { question: 'What replaced Meetup?', answer: 'The grounded article does not identify a replacement for Meetup. It recommends checking event platforms and organiser websites, because some groups publish dates, locations, sponsors, and formats on their own pages.' },
  { question: 'Is meetup a good way to meet singles?', answer: 'This article does not assess meetups for dating. It covers how to find Sydney AI, tech, startup, business, and digital events that support useful professional conversations.' },
  { question: 'How do I find a useful AI or tech meetup in Sydney?', answer: 'Start with the conversation you want, then search across AI, machine learning, data science, tech startup, IT, UX, web, content strategy, and small-business AI labels. Shortlist a few groups before you RSVP.' },
  { question: 'Should I only attend events with AI in the title?', answer: 'No. AI conversations often appear inside startup, business, UX, web, content strategy, and small-business groups. The event purpose and audience matter more than whether the title includes AI.' },
  { question: 'What should I check before RSVP?', answer: 'Look for a clear audience, topic, next event date, location, format, regular activity, and practical value. If the page is vague about these details, put it lower on your shortlist.' },
  { question: 'How can I turn one event into a stronger local network?', answer: 'Prepare a short introduction and one practical question. After the event, note useful people, topics, and groups, then decide whether to return, try an adjacent meetup, or get more involved.' },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  : null

export default function ArticleContent() {
  const authorDetails: AuthorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {faqStructuredData ? (
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}

      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className='bg-transparent' />

      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
        <div id='intro' data-cf-component-id='section:intro' data-cf-component-type='section' data-cf-component-label='Find the right Sydney meetup before you RSVP' data-cf-source-section-id='intro'>
          <p><strong>{TOPIC}</strong> — A useful meetup in Sydney is not always listed under the exact label you expect. If you are looking for AI, machine learning, startups, or digital work, also check nearby labels such as tech startup, IT, web, new media, content strategy, UX, small business, and AI assistants.</p>
          <p>Start with the conversation you need. You might want to learn a topic, meet collaborators, find customers, test an idea, hire talent, or get advice from people who have faced similar problems. This guide uses a practical filter method, rather than a fixed directory, because event names, dates, and formats change.</p>
        </div>

        <div id='choose-your-room' data-cf-component-id='section:choose-your-room' data-cf-component-type='section' data-cf-component-label='Choose the room that matches your goal' data-cf-source-section-id='choose-your-room'>
          <h2>Choose the room that matches your goal</h2>
          <p>A good meetup in Sydney is not always the one with the most obvious AI label. Start with the conversation you want to have. If you are building a product, looking for customers, or trying to avoid common business mistakes, a startup or business group may be more useful than a general tech talk.</p>
          <p>Content strategy, UX, web, new media, marketing, and digital producer groups can be relevant because AI work often shows up in content systems, user journeys, websites, and digital strategy. For small-business owners, a more structured informal meeting can also help.</p>
          <div data-cf-component-id='image:choose-your-room' data-cf-component-type='image' data-cf-component-label='Image: Choose the room that matches your goal' data-cf-source-section-id='choose-your-room'>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9ae45c0d-e7e4-48f2-8839-f26897ad4846.jpg?alt=media&token=c0d566e1-bf0b-4bf1-af7d-35284969dc68'
              alt='Hands sorting meetup notes beside coffee and laptop, choosing the right Sydney room for startup goals'
              caption='Choose the room that matches your goal'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlock title='Choose by conversation' variant='purple'>
            Pick a meetup based on the discussion you want to have, not just whether the event name includes AI.
          </QuoteBlock>
          <h3>Founders and operators</h3>
          <p>Choose business and startup meetups when you want practical feedback, customer insight, or a clearer view of how other people have handled growth, mistakes, and decisions. These rooms are useful when your AI question is really a business question.</p>
          <h3>Digital and small-business practitioners</h3>
          <p>Choose digital, content, UX, web, or small-business rooms when your goal is to improve how work gets done. These groups can give you applied conversations about strategy, users, systems, and day-to-day operations.</p>
        </div>

        <div id='search-beyond-ai' data-cf-component-id='section:search-beyond-ai' data-cf-component-type='section' data-cf-component-label='Search beyond events that call themselves AI' data-cf-source-section-id='search-beyond-ai'>
          <h2>Search beyond events that call themselves AI</h2>
          <p>A good meetup in Sydney may not use the word AI in its title. Sydney sources point to active groups around tech startups, information technology, the web industry, new media, content strategy, UX, and small business support. These can still be useful if you want to meet builders, founders, product people, or business owners who are testing AI in real work.</p>
          <p>Do not stop at the first event listing you find. Check the organiser’s own website where possible, because some groups publish their next meetup, location, sponsors, and format on their own pages. Build a short list of candidate groups, then compare the agenda, audience, timing, and level of structure before you book.</p>
          <ul>
            <li>Search across adjacent fields, not only AI-branded events.</li>
            <li>Check organiser pages as well as event platforms.</li>
            <li>Shortlist a few groups before committing to one.</li>
            <li>Read the agenda before assuming the event will be technical.</li>
          </ul>
          <div data-cf-component-id='image:search-beyond-ai' data-cf-component-type='image' data-cf-component-label='Image: Search beyond events that call themselves AI' data-cf-source-section-id='search-beyond-ai'>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bc6141f4-5c7f-4ca1-bc5e-7c31637aeee6.jpg?alt=media&token=a3692106-4c55-476a-8810-f5470e02d2f9'
              alt='Sydney coworking meetup board with startup, UX, web, and small business event flyers pinned on a wall'
              caption='Search beyond events that call themselves AI'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlock title='Check the agenda first' variant='purple'>
            Validate the actual event agenda before assuming a meetup will be technical.
          </QuoteBlock>
          <h3>Useful search labels</h3>
          <p>Try combinations such as AI, machine learning, data science, tech startup, IT, web industry, new media, content strategy, UX, and small-business AI support.</p>
        </div>

        <div id='vet-the-meetup' data-cf-component-id='section:vet-the-meetup' data-cf-component-type='section' data-cf-component-label='Check the signals of a worthwhile meetup' data-cf-source-section-id='vet-the-meetup'>
          <h2>Check the signals of a worthwhile meetup</h2>
          <p>Before you spend an evening at a meetup in Sydney, look for signs that the event has a clear purpose. A useful page should tell you who the group is for, what people will discuss, when the next event is, and where it happens.</p>
          <p>Regularity is another useful signal. A long-running group, or one that shows a history of meetings, suggests there is a community behind the event. A small business meetup can still be casual and friendly while being structured enough to support honest discussion, idea sharing, and experienced opinions.</p>
          <h3>Quality signals to look for</h3>
          <p>Look for a defined audience, a clear topic, the next event date, the location, the format, and a practical reason to attend. For example, the value might be advice from people in your field, a workshop, or a focused discussion with others facing similar problems.</p>
          <ul>
            <li>Clear audience, such as founders, content designers, small business owners, or people in a defined field.</li>
            <li>Next event date, location, and format.</li>
            <li>Signs of regular activity or a long-running community.</li>
            <li>Practical value, such as discussion, advice, ideas, or a workshop.</li>
          </ul>
        </div>

        <div data-cf-component-id='resource-cta:meetup-shortlist-resource' data-cf-component-type='resource-cta' data-cf-component-label='Get the resource'>
          <ArticleResourceCTA
            eyebrow='Free checklist'
            title='Sydney AI and Tech Meetup Finder Checklist'
            description='Use this checklist to search beyond AI-labelled events, compare meetup signals, and choose one Sydney event that matches your current networking goal.'
            buttonLabel='Download the PDF'
            buttonHref='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-find-an-ai-and-tech-meetup-in-sydney-checklist-e18bfca9.pdf?alt=media&token=a8a65696-e553-4fdd-996e-c907a23989f3'
            accent='purple'
            previewCards={[
              {
                title: 'RSVP filter',
                subtitle: 'PDF',
                color: 'bg-[#ff3d00]',
                textColor: 'text-white',
                rotationClass: 'rotate-[-6deg]',
              },
              {
                title: 'Quality signals',
                subtitle: 'PDF',
                color: 'bg-[#00ffd7]',
                textColor: 'text-black',
                rotationClass: 'rotate-[7deg]',
              },
            ]}
          />
        </div>

        <div id='use-adjacent-communities' data-cf-component-id='section:use-adjacent-communities' data-cf-component-type='section' data-cf-component-label='Use business and startup events to meet AI people' data-cf-source-section-id='use-adjacent-communities'>
          <h2>Use business and startup events to meet AI people</h2>
          <p>A meetup in Sydney does not need to have “AI” in the title to be useful for AI networking. Business groups can put you in the same room as founders, marketers, operators, and small-business owners who are trying to solve real problems.</p>
          <p>Startup and digital-industry events can be especially useful for AI founders and builders. A tech startup meetup may help you test an idea, meet potential collaborators, or hear how other founders explain their product. Small-business meetings can offer a more practical setting, where people share honest opinions and experienced advice.</p>
          <p>Go in with a simple plan.</p>
          <div data-cf-component-id='image:use-adjacent-communities' data-cf-component-type='image' data-cf-component-label='Image: Use business and startup events to meet AI people' data-cf-source-section-id='use-adjacent-communities'>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5e2c5237-0611-49a5-ba65-a0efe23f4885.jpg?alt=media&token=72eadcc4-1b4f-4415-91c8-14b59f831ff8'
              alt='Close-up of founders swapping business cards at a Sydney startup meetup for AI networking'
              caption='Use business and startup events to meet AI people'
              width={1200}
              height={800}
            />
          </div>
          <QuoteBlock title='Contribute before you pitch' variant='purple'>
            Business events are most useful when you add to the room instead of treating every conversation as a sales opportunity.
          </QuoteBlock>
        </div>

        <div id='turn-rsvp-into-network' data-cf-component-id='section:turn-rsvp-into-network' data-cf-component-type='section' data-cf-component-label='Turn one RSVP into a Sydney AI network' data-cf-source-section-id='turn-rsvp-into-network'>
          <h2>Turn one RSVP into a Sydney AI network</h2>
          <p>Do not try to attend every meetup in Sydney at once. Shortlist two or three groups that fit your current goal, then RSVP to one event you can attend properly. A tech startup meetup may suit a founder or builder. A small business meeting may suit someone who wants practical advice.</p>
          <p>Good meetups work because people share ideas, opinions, experience, and useful contacts in a setting that makes conversation easier.</p>
          <p>After the event, write down the people, topics, and groups that were useful. Then decide your next step: return to the same group, try an adjacent meetup, or get more involved. The right meetup in Sydney is not the busiest one.</p>
          <ul>
            <li>Shortlist two or three high-fit groups.</li>
            <li>Attend one event that matches your immediate goal.</li>
          </ul>
          <div data-cf-component-id='image:turn-rsvp-into-network' data-cf-component-type='image' data-cf-component-label='Image: Turn one RSVP into a Sydney AI network' data-cf-source-section-id='turn-rsvp-into-network'>
            <ArticleImageBlock
              src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-698b84e6-c16b-4dfe-b9a6-464dc0a01b59.jpg?alt=media&token=658c6e4f-e4a1-4e8f-9bae-7bdd062ab3f2'
              alt='Sydney AI meetup attendees chatting after one RSVP at a casual tech networking event'
              caption='Turn one RSVP into a Sydney AI network'
              width={1200}
              height={800}
            />
          </div>
        </div>

        <ArticleReferences
          references={[
            { id: 1, href: 'https://maxmyprofit.com.au/sydney-business-meetup-groups/', title: '6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit', publisher: 'maxmyprofit.com.au', description: 'Authoritative reference supporting 6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit.', category: 'guide' },
            { id: 2, href: 'https://www.australiansmallbusiness.com.au/services/small-business-sydney-meetups/', title: 'Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business', publisher: 'australiansmallbusiness.com.au', description: 'Authoritative reference supporting Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business.', category: 'guide' },
            { id: 3, href: 'https://localsaucetours.com.au/unique-ways-to-meet-people-in-sydney/', title: 'Unique Ways to Meet People in Sydney - Local Sauce Tours', publisher: 'localsaucetours.com.au', description: 'Authoritative reference supporting Unique Ways to Meet People in Sydney - Local Sauce Tours.', category: 'guide' },
            { id: 4, href: 'https://hannahdemilta.com/2013/01/24/5-tips-for-planning-a-sydney-meetup/', title: '5 Tips for Planning a Sydney Meetup – Hannah DeMilta', publisher: 'hannahdemilta.com', description: 'Authoritative reference supporting 5 Tips for Planning a Sydney Meetup – Hannah DeMilta.', category: 'guide' },
            { id: 5, href: 'https://au.linkedin.com/company/sydney-content-strategy-meetup', title: 'Sydney Content Strategy Meetup | LinkedIn', publisher: 'au.linkedin.com', description: 'Authoritative reference supporting Sydney Content Strategy Meetup | LinkedIn.', category: 'guide' },
            { id: 6, href: 'https://events.humanitix.com/good-things-sydney-meetup', title: 'Good Things Sydney Meetup', publisher: 'events.humanitix.com', description: 'Authoritative reference supporting Good Things Sydney Meetup.', category: 'guide' },
            { id: 7, href: 'https://publicrelationssydney.com.au/networking-groups-in-sydney/', title: 'Networking groups in Sydney', publisher: 'publicrelationssydney.com.au', description: 'Authoritative reference supporting Networking groups in Sydney.', category: 'guide' },
            { id: 8, href: 'https://www.sydneycontentstrategy.com/', title: 'Sydney content strategy meetup', publisher: 'sydneycontentstrategy.com', description: 'Authoritative reference supporting Sydney content strategy meetup.', category: 'guide' },
          ]}
          heading='Sources & further reading'
        />

        <ArticleDisclaimer />

        <div className='my-12 not-prose' data-cf-component-id='cta' data-cf-component-type='company-cta' data-cf-component-label='Company CTA'>
          <ArticleCompanyCTA
            title='Build your Sydney AI network with purpose'
            body='Shortlist the groups that match your goal, check the agenda and format, then attend one event ready to ask a useful question.'
            buttonText='Explore AI community guides'
            buttonHref='/articles'
          />
        </div>
      </div>

      <div data-cf-component-id='author-bio' data-cf-component-type='author-bio' data-cf-component-label='About the Author'>
        <AuthorBio author={authorDetails} />
      </div>

      <div className='mt-12' data-cf-component-id='faq' data-cf-component-type='faq' data-cf-component-label='FAQ'>
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav backHref='/articles' topHref='#' />
    </>
  )
}
