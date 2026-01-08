import { useLoaderData } from 'react-router'
import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

import { canonical } from '../../seo-config'
import { applyArticleRegistryDefaults } from '../../registry'

import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../data/types'
import { AuthorBio } from '../../../components/AuthorBio'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'AI hackathons and events in Melbourne'
const CATEGORY = 'featured'
const SLUG = 'ai-hackathons-and-events-melbourne'
const AUTHOR = 'Alex Nguyen'
const AUTHOR_ROLE = 'Programs & Community'
const AUTHOR_BIO = 'Alex coordinates AI meetups across Victoria and mentors teams on rapid prototyping and responsible AI.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
const DATE_MODIFIED = '2025-01-15'
const DESCRIPTION = 'A practical 2025 guide to AI hackathons and community events in Melbourne: formats, venues, costs, judging, and how to prepare.'
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-15a64fe7-880f-4170-80a8-2c3569c3e951.jpg?alt=media&token=0e40531f-09c8-41b6-9956-b5449ca38836"
const HERO_IMAGE_ALT = 'Participants collaborating at an AI hackathon in Melbourne'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  { id: 1, question: 'What types of AI hackathons run in Melbourne in 2025?', answer: 'Most 2025 hackathons mix generative AI, data-for-good, and civic tech themes. Expect 24–48 hour sprints, with a few week-long online build phases for teams outside the CBD.' },
  { id: 2, question: 'How much do Melbourne AI hackathons cost to join?', answer: 'Student and community events are often free or <$50. Corporate-run hackathons may charge $50–$120 to cover space, catering, and cloud credits. Always check inclusions (meals, Wi‑Fi, GPU credits).' },
  { id: 3, question: 'Do I need to be an experienced developer to participate?', answer: 'No. Teams usually welcome designers, data analysts, product managers, and subject-matter experts. Many events offer beginner workshops on day one covering APIs, model safety, and pitching.' },
  { id: 4, question: 'What should I bring to an in-person hackathon in Melbourne?', answer: 'Bring your laptop, chargers, ID for venue access, reusable water bottle, and any adapters. Some venues require closed-toe shoes and have 11 pm building exits—check the event brief.' },
  { id: 5, question: 'How are AI projects judged?', answer: 'Common criteria: problem clarity, working prototype, responsible AI approach (data sources, bias mitigation, safety), user validation, and pitch clarity. Panels often include industry engineers and domain experts.' },
  { id: 6, question: 'Are there Melbourne-specific considerations for data and privacy?', answer: (
    <span>
      Yes. Follow the Privacy Act 1988 (Cth) and the Victorian Protective Data Security Standards when handling personal or government data. Use synthetic or de-identified datasets unless explicit consent and approvals exist.
    </span>
  ) },
  { id: 7, question: 'Where can I find upcoming AI events in Melbourne?', answer: 'Check platforms like Meetup, Eventbrite, university innovation hubs (RMIT, Monash, University of Melbourne), and local communities such as Melbourne AI, Hackathons Australia, and GovHack channels.' },
]

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { article } = data || {}
  const title = article?.title || `${TOPIC} (2025)`
  const description = article?.description || DESCRIPTION
  const image = article?.image || HERO_IMAGE

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: canonical(`/articles/${CATEGORY}/${SLUG}`) },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    // Structured Data (Schema.org)
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: image,
        author: {
           '@type': 'Person',
           name: AUTHOR
        },
        publisher: {
           '@type': 'Organization',
           name: 'Company',
           logo: {
             '@type': 'ImageObject',
             url: '/logo.png'
           }
        },
        datePublished: DATE_MODIFIED,
        dateModified: DATE_MODIFIED,
        description: description
      }
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: typeof faq.answer === 'string' ? faq.answer : 'Refer to article content for details.'
          }
        }))
      }
    }
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const article = applyArticleRegistryDefaults({
    title: `${TOPIC} (2025)`,
    dateModified: DATE_MODIFIED,
    description: DESCRIPTION,
    author: AUTHOR,
    slug: SLUG,
    image: HERO_IMAGE,
    imageAlt: HERO_IMAGE_ALT,
  })

  const featuredPeople: FeaturedPersonProfile[] = []
  return { article, featuredPeople }
}

export default function ArticlePage() {
  const { article, featuredPeople } = useLoaderData<typeof loader>()

  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR
  }

  return (
    <div className="bg-white">
      <ArticleLayout
        article={article}
        // Sticky Sidebar Components
        toc={<ArticleTocPlaceholder />}
        
        summaryHighlights={{
          heading: `Key facts: ${TOPIC}`,
          intro:
            'Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).',
          items: [
            {
              label: 'How do Melbourne AI hackathon judging criteria work?',
              description: 'Most events score problem clarity, working prototype, responsible AI approach, user validation, and pitch quality.',
            },
            {
              label: 'What does it cost to join an AI hackathon in Melbourne?',
              description: 'Community events are often free or under $50, while corporate hackathons typically range from $50–$120 with catering and credits.',
            },
            {
              label: 'Do I need prior AI experience for Melbourne hackathons?',
              description: 'No—teams welcome designers, product leads, and domain experts; many events offer beginner workshops and mentor support.',
            },
          ],
        }}
        breadcrumb={
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/articles" className="hover:text-gray-900 transition-colors">Articles</Link>
              </li>
              <li>/</li>
              <li>
                <span className="font-medium text-gray-900">{TOPIC}</span>
              </li>
            </ol>
          </nav>
        }
      >
        {/* 1) Intro alert - Clean, neutral style */}
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700 flex gap-2">
            <span className="text-xl">💡</span>
            <span>
              This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
              <Link to="/articles" className="font-semibold text-indigo-600 hover:underline">
                Browse related articles →
              </Link>
            </span>
          </p>
        </div>

        {/* 2) Persona Grid - Clean Cards, No Heavy Colors */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
               {/* Icon: Rocket */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84v4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01-.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
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
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-indigo-500">
          <p>
            <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025 landscape.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>What is {TOPIC}?</h2>
          <p>
            AI hackathons are short, intensive build events where teams prototype AI-powered solutions—often using generative models, vector search, or computer vision—against a defined brief. In Melbourne, they commonly run at universities (RMIT Storey Hall, Monash Clayton), innovation hubs (Melbourne Connect), and coworking spaces (The Commons, Stone & Chalk). Formats range from 24-hour sprints to week-long hybrids that start online and finish with in-person demos.
          </p>
          <p>
            Events are typically open to multidisciplinary teams. Organisers provide problem statements, datasets, and cloud credits (AWS, Azure, or GCP) along with mentor hours on data ethics, prompt engineering, and product validation. Most operate under a code of conduct aligned to the Australian Privacy Act 1988 and local venue safety rules.
          </p>

          <h2>Why it matters in 2025</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9e2a2cc2-a4e5-40fb-952c-863d2c2455eb.jpg?alt=media&token=01dfdfd7-da95-4140-82e1-4e7e9a69bdcc" alt="People collaborating in a retro tech startup setting, embodying the spirit of innovation in 2025." className="w-full rounded-lg my-8" />

          <p>
            Melbourne’s AI ecosystem is expanding with new university research centres, state-backed innovation grants, and an influx of applied AI roles in health, fintech, and logistics. Hackathons are a practical way to pressure-test ideas, meet collaborators, and gain feedback from engineers and domain experts. Ignoring these events can mean missing partnership opportunities, datasets, and early user validation.
          </p>
          <p>
            In 2025, organisers increasingly emphasise responsible AI: teams are asked to document data provenance, bias considerations, and evaluation steps. Events that surface well-documented, safety-aware prototypes tend to perform better with judges and potential partners.
          </p>

          <div className="my-8 border-l-4 border-indigo-500 bg-indigo-50/50 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">
              Arrive with a sketched user flow and pre-tested API keys so your team spends the first hour building, not debugging access.
            </p>
          </div>

          <h2>Step-by-Step Guide</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e4e95bde-f9ee-41ea-918d-0a36a2f87325.jpg?alt=media&token=99c9450a-725d-48f6-b577-160176dccfe4" alt="People collaborating in a vibrant tech startup, captured in a nostalgic 90s film aesthetic." className="w-full rounded-lg my-8" />

          
          <h3>Step 1: Preparation</h3>
          <p>
            Confirm the brief, judging criteria, and IP rules (many Melbourne events use open-source-friendly terms; corporate ones may retain showcase rights). Form a balanced team: at least one builder (backend or ML), one frontend or UX, and one person focused on user validation and pitch. Preload starter kits for common stacks (Next.js + serverless functions, Python + FastAPI) and ensure you have access to vector databases or embeddings APIs if needed.
          </p>
          <p>
            Check venue logistics—Wi‑Fi reliability, power outlets, late-night access, and quiet rooms. Pack headphones, adapters, and consider offloading heavy training to managed endpoints or hosted notebooks to avoid local GPU constraints.
          </p>
          
          <h3>Step 2: Execution</h3>
          <p>
            Spend the first 60–90 minutes refining the problem statement and who benefits. Build a thin vertical slice: data ingestion, minimal prompt/endpoint, evaluation loop, and a UI that proves the workflow. Use synthetic or de-identified data unless consented sources are provided. Keep a changelog and note model settings, safety filters, and fallback behaviour for downtime.
          </p>
          <p>
            Book mentor slots early; Melbourne events often have limited AI safety and product mentors. Run quick user tests with nearby teams or mentors to validate the core interaction. If your solution handles personal data, include consent flow copy and explain storage locations (e.g., AU regions for compliance).
          </p>

          <h3>Step 3: Review</h3>
          <p>
            With 2–3 hours left, freeze scope. Prioritise reliability over extra features: add input validation, guardrails, and simple analytics. Prepare a concise demo: problem, what you built, why AI is essential, evidence of user value, and how you mitigated risks. Rehearse a 3–5 minute pitch and a 1-minute backup version. Provide a short README with setup steps, dataset notes, and licensing.
          </p>
          <p>
            After the event, follow up within 48 hours with teammates, organisers, and judges. Share a link to the demo, source (if open), and next steps. Many Melbourne hackathons feed into accelerator intakes—being proactive keeps momentum.
          </p>
          
          <h2>Conclusion</h2>
          <p>
            AI hackathons and events in Melbourne offer fast feedback, credible mentors, and community connections. Prepare a balanced team, build a narrow but reliable slice, and foreground responsible AI choices. Doing so improves your odds of a strong demo and meaningful post-event opportunities.
          </p>
          
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Next Steps</h3>
            <ul className="space-y-3">
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                 <span>Download the checklist mentioned above.</span>
               </li>
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                 <span>Draft your initial goals based on the template.</span>
               </li>
               <li className="flex gap-3 text-gray-700">
                 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                 <span>Discuss with your team or mentor.</span>
               </li>
            </ul>
          </div>
          
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
        
        {/* Author Bio & Footer */}
        <hr className="my-10 border-gray-100" />
        
        <AuthorBio author={authorDetails} />
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <ArticleFAQ items={faqs} />
        </div>
        
        {/* Final Breadcrumb/Nav */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
           <Link to="/articles" className="hover:text-indigo-600 transition-colors">← Back to Articles</Link>
           <a href="#" className="hover:text-indigo-600 transition-colors">Top of page ↑</a>
        </div>
        
      </ArticleLayout>
    </div>
  )
}
