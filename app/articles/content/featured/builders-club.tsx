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

const TOPIC = 'Builders Club Wollongong visitor guide'
const CATEGORY = 'featured'
const SLUG = 'builders-club'
const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? 'Founder'
const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE.avatarUrl ?? 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_PUBLISHED = '2026-01-15'
const DATE_MODIFIED = '2026-01-15'
const DESCRIPTION = 'Plan your 2026 visit to The Builders Club in Wollongong with clear guidance on access, parking, dining, events, and booking options.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-3a16db4a-9a7c-4f5d-bbed-ac0d93db5321.jpg?alt=media&token=970dcc1b-dae8-4004-9d23-61c8f22c5d05"
const HERO_IMAGE_ALT = 'Exterior entrance of a modern Australian club at dusk'
const FEATURED_FOCUS = 'product'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'Do I need membership to enter the Builders Club in Wollongong?', answer: 'Visitors can enter as guests when signed in under NSW club rules; bring government-issued photo ID for sign-in, and consider membership if you visit regularly for dining or events.' },
  { id: 2, question: 'What is the dress code at the Builders Club?', answer: 'Smart-casual is generally expected: tidy footwear, no work hi-vis after certain hours, and venue staff may refuse entry for clothing deemed unsafe or inappropriate. Check the club’s latest notice before visiting.' },
  { id: 3, question: 'Is parking available at the Builders Club?', answer: 'On-site parking is commonly available; arrive earlier on weekends or major event nights. If driving, plan for a safe trip home and avoid peak exit times when shows finish.' },
  { id: 4, question: 'Can I book a space for a meetup or community event?', answer: 'Most clubs offer private or semi-private rooms; contact the venue’s events team with your group size, AV needs, and preferred dates. Ask about community rates if you are a not-for-profit group.' },
  { id: 5, question: 'What dining options are there at the Builders Club?', answer: 'Expect a bistro with family-friendly menus, rotating specials, and coffee areas; menus and hours can change seasonally, so confirm online before you go.' },
  { id: 6, question: 'Is there responsible gambling support on-site?', answer: 'Yes. NSW clubs must display responsible gambling information and provide self-exclusion support. Seek staff assistance if you or someone in your party needs help.' },
]

export const summaryHighlights = {
  heading: `Key facts: ${TOPIC}`,
  intro:
    'Brief, factual overview referencing current Australian context (e.g. 2026 ecosystem norms, official guidance, privacy expectations, or common pathways).',
  items: [
    {
      label: 'Is the Builders Club in Wollongong open to visitors?',
      description: 'Yes. Guests can sign in under NSW club rules with valid photo ID; membership is optional but speeds repeat visits.',
    },
    {
      label: 'Does the Builders Club have parking?',
      description: 'On-site parking is typically available; arrive early on weekends or event nights to secure a spot.',
    },
    {
      label: 'What should I wear to the Builders Club?',
      description: 'Smart-casual attire is expected—clean footwear and no offensive clothing; check venue notices for updates.',
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
    <div
      className="bg-white"
      data-category={CATEGORY}
      data-slug={SLUG}
      data-featured-focus={FEATURED_FOCUS}
      data-published={DATE_PUBLISHED}
      data-modified={DATE_MODIFIED}
      data-description={DESCRIPTION}
    >
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
              title: 'Local visitors',
              description: 'Planning a family meal, show night, or weekend catch-up.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Meetup organisers',
              description: 'Scouting an accessible venue with AV, food, and parking.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Travellers',
              description: 'Looking for relaxed dining near Wollongong CBD with clear entry rules.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
          className="my-10"
        />

        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand]">
          <p>
            <strong>{TOPIC}</strong> – The Builders Club (61 Church Street, Wollongong) is a popular Illawarra venue for dining, live entertainment, and functions. This 2026 guide keeps things simple: how to get in, what to wear, where to park, and how to book spaces for a meetup or family night without surprises.
          </p>

          <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />

          <h2>What to know before you arrive: sign-in, ID, and dress</h2>
          <p>
            NSW Registered Clubs require sign-in. Bring government-issued photo ID (driver licence or passport). Expect a smart-casual dress standard: clean footwear, no offensive logos, and limits on hi-vis or workwear after certain hours. If in doubt, call ahead—polite, brief confirmation avoids entry delays.
          </p>

          <ArticleResourceCTA
            title={`Download the ${TOPIC} checklist`}
            description="Access a structured template to apply the steps in this guide."
            buttonLabel="Get the checklist"
            buttonHref="/resources"
            accent="purple"
          />

          <ArticleCallout
            title="Quick ID check"
            variant="brand"
            icon={<span className="text-xl">💡</span>}
            className="not-prose"
          >
            <p className="mt-1 text-gray-800">
              Keep your ID handy at entry and when re-entering after stepping outside. Guests must be signed in; frequent visitors may save time by applying for membership.
            </p>
          </ArticleCallout>

          <h2>Getting there: parking, public transport, accessibility</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0b786f22-e32e-4089-be9b-b19018f39727.jpg?alt=media&token=f6d082b0-c422-4c7a-a9d9-73791a76403d" alt="People discussing ideas in a tech startup setting with a nostalgic 90s film aesthetic, showcasing collaboration and innovation." className="w-full rounded-lg my-8" />

          <p>
            The club sits near Wollongong CBD, a short walk from Crown Street. On-site parking is common, but spaces tighten during Friday and Saturday evenings or show nights. If you prefer public transport, Wollongong Station is nearby with local buses along Church Street. Ask staff about step-free access points and lift locations—most modern areas support mobility devices.
          </p>

          <h3>Arrival timing to avoid queues</h3>
          <p>
            Arrive 30–45 minutes before headliner shows or major sport broadcasts. This window makes sign-in smoother, lets you choose seating, and gives time to order before kitchens peak.
          </p>

          <ArticleStepList
            title="Practical steps"
            steps={[
              { label: 'Check event times and kitchen hours the morning of your visit.' },
              { label: 'Carry photo ID; allow extra time on live-show nights.' },
              { label: 'If driving, plan a safe trip home or set up a rideshare pickup spot.' },
            ]}
            accent="indigo"
          />

          <QuoteBlock title="Expert insight" variant="purple">
            “Early arrival reduces wait times for meals and keeps your group together—especially if you need accessible seating near exits or lifts.”
          </QuoteBlock>

          <h2>Dining and bar options: menus, specials, and family groups</h2>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-da8fd050-ce12-4f5f-8221-3cd80f62911f.jpg?alt=media&token=a86f000a-9ac5-481b-908b-ed7b6708879f" alt="Friends enjoying drinks and food in a vibrant tech startup environment with a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

          <p>
            Expect a bistro-style menu with rotating weeknight specials, kids’ meals, and coffee/bar service. Menus can change seasonally, so check the venue site for current pricing and hours. For families, ask about highchairs and kids’ activity packs; for groups, preorder platters when available to minimise wait times.
          </p>

          <ArticleCallout title="Budget-friendly tips" variant="info">
            <p className="text-gray-800">
              Weeknight specials (e.g., pasta or schnitzel nights) are usually better value than peak Saturday slots. Confirm any member pricing—joining can offset costs if you visit regularly.
            </p>
          </ArticleCallout>

          <h2>Live entertainment and sport: what’s on and how to book</h2>
          <p>
            The Builders Club regularly hosts tribute acts, comedy, and sport screenings. Check the club’s “What’s On” page for ticketing links and seating notes. For big matches, arrive early to secure a clear view of screens and avoid standing in walkways (a common reason staff may redirect you).
          </p>

          <h3>Noise and seating considerations</h3>
          <p>
            If you prefer conversation-friendly areas, ask staff for sections away from speaker stacks. Families often sit near bistro edges; meetups might choose quieter corners with nearby power outlets for laptops or small AV setups.
          </p>

          <h2>Booking spaces for meetups or community gatherings</h2>
          <p>
            Function rooms and semi-private areas can typically be reserved. When you contact the events team, share your group size, desired layout, AV needs (projector, microphones), catering preferences, and whether you are a not-for-profit—many venues offer community-friendly rates. Confirm bump-in times and Wi-Fi details if you plan demos or hybrid calls.
          </p>

          <ArticleStepList
            title="Checklist for organisers"
            steps={[
              { label: 'Send dates, headcount range, and seating style (theatre, cabaret, classroom).' },
              { label: 'List AV needs and test HDMI/USB-C compatibility on arrival.' },
              { label: 'Confirm catering cutoff times and any minimum spend requirements.' },
            ]}
            accent="teal"
          />

          <h2>Responsible gambling and safe visits</h2>
          <p>
            As a NSW club, the venue must display responsible gambling materials and provide self-exclusion support. If gaming areas are part of your visit, set personal limits, avoid cash advances, and take regular breaks. Staff can direct you to assistance services if you or someone in your group needs help.
          </p>

          <h2>Plan your night: a simple run sheet</h2>
          <p>
            Keep plans light but structured: confirm the event time, arrive early, order before peak, and set a clear home trip plan. The outline below keeps everyone aligned and reduces last-minute stress.
          </p>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 not-prose">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">1</span>
                <span>Check the club site for tonight’s events, dining hours, and any dress updates.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">2</span>
                <span>Pack photo ID and decide on parking or a safe rideshare pickup spot.</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[--soft] text-xs font-bold text-[--brand]">3</span>
                <span>For meetups, email the events team with headcount, AV needs, and preferred times.</span>
              </li>
            </ul>
          </div>

          <MLAITemplateResourceCTA />

          <div className="my-12 not-prose">
            {/* Contextual CTA - Best placement for conversion */}
            <ArticleCompanyCTA
              title={`Need help with ${TOPIC}?`}
              body="MLAI is a not-for-profit community empowering the Australian AI community. If you’re hosting an AI meetup or want to connect with local practitioners, we can point you to venues and peers."
              buttonText="Join the MLAI community"
              buttonHref="https://mlai.au/contact"
              note="Community-first support, based in North Melbourne."
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
