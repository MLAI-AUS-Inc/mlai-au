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

const TOPIC = 'Builders Club Wollongong: visitor and locals’ guide'
const CATEGORY = 'featured' // e.g. 'ai'
const SLUG = 'builders-club'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-02-15'
const DATE_MODIFIED = '2026-02-15'
const DESCRIPTION = 'What to know before visiting the Builders Club in Wollongong—hours, facilities, costs, parking, and booking tips for 2026.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-3a55c106-d3f9-4e7a-affd-dbf0d00c4cfe.jpg?alt=media&token=db6e67ad-2959-4702-af33-bd00400739b6"
const HERO_IMAGE_ALT = 'Modern club venue with bar seating and ambient lighting'
const FEATURED_FOCUS = 'product' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Is the Builders Club in Wollongong members-only?', answer: 'No. Visitors are welcome. Membership mainly provides discounts and member pricing on food, drinks, and selected events.' },
  { id: 2, question: 'Do I need to book a table for weekends or live sport?', answer: 'Bookings are recommended for peak times (Friday–Sunday evenings and major live sport broadcasts). Walk-ins are usually accepted in the sports bar outside peak hours.' },
  { id: 3, question: 'What is the typical dress code?', answer: 'Smart casual is expected. Avoid worksite gear, singlets, and thongs after 5pm. Club management can refuse entry if attire is unsafe or inappropriate.' },
  { id: 4, question: 'Is there parking at the Builders Club?', answer: 'Yes. Onsite parking is available. Arrive early on event nights to secure a spot; street parking can fill quickly in central Wollongong.' },
  { id: 5, question: 'Can families visit the club?', answer: 'Yes. Dining areas are family-friendly. Minors must be accompanied by a responsible adult and remain in permitted zones according to NSW club regulations.' },
  { id: 6, question: 'What payment options are common?', answer: 'Most visitors use cards or digital wallets. Carry a physical ID and a card for membership-linked discounts and any age checks under NSW liquor rules.' },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Is the Builders Club open to visitors or members only?',
      description: 'Visitors are welcome; membership mainly adds dining and drink discounts.',
    },
    {
      label: 'What facilities does the Builders Club in Wollongong offer?',
      description: 'Sports bar screens, casual dining, and bookable function rooms with catering.',
    },
    {
      label: 'Do I need to book for weekends or major live sport nights?',
      description: 'Bookings are recommended for Friday–Sunday evenings and marquee matches.',
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
    <div className="bg-white">
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
              title: 'Local visitors & families',
              description: 'Planning a first visit, looking for dining and live sport nights.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & new residents',
              description: 'Exploring Wollongong venues, comparing costs and transport.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community organisers',
              description: 'Scouting function spaces and accessibility for local meetups.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> – The Builders Club in Wollongong is a popular community venue that mixes a sports bar, dining, and function spaces. If you are planning a visit in 2026, here is what to know about access, costs, parking, and how to book, drawn from current NSW club norms and on-the-ground visitor expectations.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>Is the Builders Club members-only or open to visitors?</h2>
          <p>
            The club welcomes visitors. Membership is optional and typically offers discounted food and beverage pricing and occasional member promotions. Bring a valid photo ID; NSW liquor laws require proof of age checks, especially after 5pm. If you live within the local government area, some clubs request you sign in or join—staff will guide you on arrival.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="#"
            accent="purple"
          />

          <ArticleCallout
            title="Quick check on arrival"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Keep your ID handy at entry and ask staff whether a visitor sign-in or day membership is required—this speeds up access and ensures you receive any available pricing benefits.
            </p>
          </ArticleCallout>

          <h2>Core facilities: dining, sports bar, and functions</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7b029893-f307-4fcd-b565-86e174b72862.jpg?alt=media&token=508fd912-b71b-4b31-8fdf-676e031e40c3" alt="Vibrant 90s film aesthetic showcasing a lively tech startup space with people enjoying food and drinks." className="w-full rounded-lg my-8" />

          <p>
            The Builders Club is known for its sports bar screens, casual dining, and flexible function rooms. Most visitors split their time between the lounge, bistro, and live sport areas. If you are organising a meetup or family event, function rooms usually need advance booking, and catering packages may have minimum spends—confirm current rates directly with the venue.
          </p>

          <h3>When to book vs walk in</h3>
          <p>
            Weeknight dining is often available for walk-ins. For weekend dinners, large groups, or major matches (State of Origin, finals), bookings reduce wait times. Ask about any cover charges tied to special events; these are uncommon but can appear on headline nights.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Call ahead for weekend or live-sport bookings' },
              { label: 'Check function room minimum spends if hosting a group' },
              { label: 'Arrive 20–30 minutes early on major event nights to secure seating' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “For live sport nights, prioritise seating with a clear view and ask staff which screens will carry commentary—audio zones can differ across the floor.”
          </QuoteBlock>

          <h2>Costs, dress code, and entry expectations</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-818a8534-059c-4df4-ad3d-0321ece21b7e.jpg?alt=media&token=bf3b1046-bc35-4e4b-9aeb-5578d11d5853" alt="People in 90s tech attire collaborate in a vibrant startup office setting, embodying a retro film vibe." className="w-full rounded-lg my-8" />

          <p>
            Pricing is typical for NSW clubs: member and non-member rates differ slightly, with meals in the mid-range for Wollongong. Smart casual attire is expected; avoid high-vis workwear after hours, singlets, and thongs in the evening. If you are coming straight from site work, pack a spare shirt and enclosed shoes to avoid being turned away.
          </p>

          <h2>Getting there: parking, accessibility, and late-night options</h2>
          <p>
            The venue sits close to central Wollongong, with onsite parking that can fill during peak events. Plan for street parking overflow and check local signage for time limits. Public transport connections include nearby bus stops; late-night options thin after 11pm, so rideshare is common for returns. Ask staff about accessibility entrances and lift access if needed—most modern NSW clubs maintain step-free routes.
          </p>

          <h2>When to go: live sport, weekends, and public holidays</h2>
          <p>
            Live sport schedules drive crowd levels. Friday and Saturday evenings are busiest, followed by marquee match days. Public holidays can include adjusted hours; check the club’s site or call ahead in 2026 to confirm opening times and any surcharge or holiday menus.
          </p>

          <h2>Alternatives and community-friendly options nearby</h2>
          <p>
            If the Builders Club is at capacity, Wollongong offers other community venues and pubs with screens and bistro dining. Compare parking, accessibility, and noise levels if you are bringing family or running a meetup. For community groups, ask about weekday afternoon slots when rooms are quieter and rates may be more flexible.
          </p>

          <h2>Plan your visit and enjoy the venue responsibly</h2>
          <p>
            A smooth visit comes down to timing, attire, and a quick call ahead for busy nights. Bring ID, consider a membership if you are local, and align your arrival with the event schedule to secure seats. Supporting local clubs keeps community venues vibrant—enjoy responsibly and plan your transport before the night begins.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Call ahead to confirm opening hours and any event bookings.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Plan transport: onsite parking plus a rideshare backup for late finishes.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>Pack smart casual attire to meet dress expectations after 5pm.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="Join the MLAI community to collaborate with fellow AI practitioners and enthusiasts in Australia."
              buttonText="Connect with MLAI"
              buttonHref="https://mlai.au/contact"
              note="We are a not-for-profit community based in North Melbourne."
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
