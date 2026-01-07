import { Link, useLoaderData } from '@remix-run/react'
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import type { ReactNode } from 'react'
import { canonical } from '../../seo-config'
import { applyArticleRegistryDefaults } from '../../registry'
import { ArticleLayout } from '../../../components/articles/ArticleLayout'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ImageWithFallback } from '../../../components/ImageWithFallback'
import type { FeaturedPersonProfile } from '../../../data/types'

// New Components
import { AuthorBio } from '../../../components/AuthorBio'

/** ========== INPUTS (replace all placeholders) ========== */
const TOPIC = 'Responsible AI Guidelines for Australian Startups'
const CATEGORY = 'featured'
const SLUG = 'responsible-ai-guidelines-australia'
const AUTHOR = 'Jordan Lee'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO = 'Jordan is a technology policy writer focused on practical AI governance for Australian startups and scaleups.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
const DATE_MODIFIED = '2025-01-10T00:00:00.000Z'
const DESCRIPTION = 'A 2025, Australia-specific guide to responsible AI for startups: governance, privacy, model risk controls, and practical steps to comply with local expectations.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1508387024700-9fe5c0b37f52?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Team collaborating in front of a large screen with AI diagrams'
const FEATURED_FOCUS = 'ai'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Do Australian startups need a formal AI governance policy in 2025?',
    answer: 'Yes. While there is no single AI Act, regulators expect written policies covering data handling, model usage, and accountability. It also helps meet the Privacy Act and ACCC misleading conduct requirements.'
  },
  {
    id: 2,
    question: 'How do we handle personal data under the Australian Privacy Act when using AI?',
    answer: 'Minimise collection, document lawful bases, apply de-identification where possible, and avoid exporting identifiable data to offshore services without appropriate safeguards and vendor DPAs.'
  },
  {
    id: 3,
    question: 'What evidence should founders keep to show responsible AI practice?',
    answer: 'Keep data lineage notes, model cards, decision logs, DPIAs (data protection impact assessments), prompt logs for high-risk use cases, and user-facing disclosures. Store them in a shared drive with versioning.'
  },
  {
    id: 4,
    question: 'Are open-source AI models acceptable for production in Australia?',
    answer: 'Yes, if you validate licenses, security patches, and apply fine-tune/change logs. Combine this with monitoring for drift and vulnerability disclosures (e.g., prompt injection patterns).'
  },
  {
    id: 5,
    question: 'How often should we review AI systems?',
    answer: 'Run lightweight monthly checks on outputs, abuse risks, and uptime. Do quarterly deeper reviews covering fairness, privacy, and security. Reassess after major model updates or new data sources.'
  },
  {
    id: 6,
    question: 'What disclosures are needed for AI features in customer products?',
    answer: 'Provide clear in-product labels that an AI system is used, describe limitations, offer a human support channel, and state how data is handled. Avoid overstating accuracy to comply with ACCC rules.'
  }
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
           name: 'MLAI',
           logo: {
             '@type': 'ImageObject',
             url: 'https://mlai.au/logo.png'
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
  const { article } = useLoaderData<typeof loader>()

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
            'Plain-English snapshot for 2025: Australian startups are expected to document AI governance, disclose AI usage to customers, and manage privacy risks across suppliers.',
          items: [
            {
              label: `What is ${TOPIC}?`,
              description:
                'A practical set of policies, controls, and reviews to ensure AI systems are lawful, transparent, fair, and safe for Australian customers.',
            },
            {
              label: 'Who needs it?',
              description:
                'Founders, product managers, and engineering leads building AI features that touch customer data, automate decisions, or influence pricing/eligibility.',
            },
            {
              label: 'Cost & Effort (2025)',
              description:
                'Expect 2–4 weeks to stand up policies, check vendors, and add disclosures; ~$3k–$8k if you engage legal review; keep light monthly reviews thereafter.',
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
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Founders & Teams</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For leaders validating AI ideas, preparing for procurement, or pitching to enterprise buyers.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="mb-4 h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
               {/* Icon: Graduate */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Students & Switchers</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For those building AI portfolios, exploring governance roles, or adding compliance literacy.
            </p>
          </div>
          
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
               {/* Icon: Community */}
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">Community Builders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
               For mentors, accelerators, and meetup hosts guiding teams on safe AI adoption.
            </p>
          </div>
        </div>

        {/* 3) Main content starts */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 prose-headings:text-gray-900 hover:prose-a:text-indigo-500">
          <p>
            <strong>{TOPIC}</strong> helps Australian founders and teams avoid compliance, security, and reputational pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2025 landscape.
          </p>

          <div className="my-8 w-full">
            <ImageWithFallback src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} className="w-full rounded-2xl shadow-sm" />
          </div>

          <h2>What is {TOPIC}?</h2>
          <p>
            Responsible AI is the practice of designing, deploying, and monitoring AI systems so they are lawful, fair, transparent, and safe for users. In Australia, it means aligning with the Privacy Act, ACCC guidance on misleading claims, cybersecurity expectations, and emerging voluntary codes like the Safe and Responsible AI in Australia consultation findings. Startups that operationalise these principles early reduce rework, build trust, and move faster through procurement.
          </p>

          {/* 4) Resource / Checklist CTA (Fixed Image Bug) */}
          <div className="my-12 rounded-2xl bg-gray-50 p-8 sm:p-12 relative overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 relative z-10">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Free download</span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">
                   {TOPIC} <br className="hidden sm:inline"/> Checklist & Notes
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Capture goals, data sensitivity, use cases, risks, and pilot results. Includes prompts for decision logs and a one-page summary for stakeholders.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 items-center">
                   <a href="#" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-indigo-700 transition-colors">
                     Download Checklist (PDF)
                   </a>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
             <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />
             <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
          </div>


          <h2>Why it matters in 2025</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b77187f1-212c-47af-98a8-0e87ed28dff5.jpg?alt=media&token=bf63c84a-1842-484c-9957-13acfa779948" alt="Abstract technical illustration symbolizing the importance of emerging trends in 2025." className="w-full rounded-lg my-8" />

          <p>
            Enterprises now ask founders for proof of AI governance before pilots. Regulators are sharpening privacy reforms and dark pattern enforcement. Consumers expect clear AI disclosure and human support options. Teams that embed responsible AI now avoid costly rebuilds, lower model risk, and unlock larger customers who require evidence of controls.
          </p>

          <div className="my-8 border-l-4 border-indigo-500 bg-indigo-50/50 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">
              Pair every AI feature ticket with a short risk note (data, bias, security) so engineers and product stay aligned without slowing delivery.
            </p>
          </div>

          <h2>Step-by-Step Guide</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-06d099e6-22df-4a8f-9e42-f191f6f50fb7.jpg?alt=media&token=b7f3fcad-8897-44f2-ae77-47be0a39a7ef" alt="Modern abstract illustration showcasing a step-by-step guide concept with technical elements and diagrams." className="w-full rounded-lg my-8" />

          
          <h3>Step 1: Preparation</h3>
          <p>
            Map your AI use cases and data flows. Identify which datasets contain personal or sensitive information and whether they leave Australia. Create a simple AI system register listing purpose, users, models/providers, prompts, and downstream decisions. Draft an AI policy that covers: acceptable use, human oversight points, data retention, security, and incident handling. Assign an owner (often product or engineering lead) and a deputy to keep momentum.
          </p>
          <ul>
            <li>Run a Data Protection Impact Assessment (DPIA) for high-risk use cases (e.g., eligibility, pricing, safety-critical tooling).</li>
            <li>Confirm vendor contracts include data handling terms, breach notification, and model update notices.</li>
            <li>Create user-facing disclosure language and a support pathway for opt-outs or corrections.</li>
          </ul>
          
          <h3>Step 2: Execution</h3>
          <p>
            Build small and test often. For each AI feature, log prompts, edge cases, and evaluation results (accuracy, harmful outputs, latency). Implement guardrails: input validation, content filters, rate limits, and red-teaming on jailbreaks. Add a human-in-the-loop for decisions that materially affect customers. Instrument monitoring to detect drift and abuse. If fine-tuning or RAG, document sources, versioning, and retraining triggers.
          </p>
          <ul>
            <li>Use model cards and data sheets to record provenance, assumptions, and known limitations.</li>
            <li>Apply least-privilege access to prompt and key stores; rotate secrets regularly.</li>
            <li>Provide customers with clear AI labels, limitations, and a way to reach human help.</li>
          </ul>

          <h3>Step 3: Review</h3>
          <p>
            Schedule monthly light-touch checks and quarterly deeper reviews. Track metrics such as false positives/negatives, abuse attempts, latency, and customer complaints. Refresh DPIAs after major model updates or new data sources. Update disclosures if capabilities change. Run tabletop exercises for incident response (prompt injection, data leakage, hallucinated instructions) so the team knows who acts and how to communicate.
          </p>
          <ul>
            <li>Archive decision logs and evaluations with dates to evidence good faith governance.</li>
            <li>Re-check supplier compliance annually or when SLAs change.</li>
            <li>Include responsible AI outcomes in board or founder updates to keep accountability visible.</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>
            Responsible AI is not overhead—it is the fastest path to trust with Australian customers, enterprises, and regulators. By documenting intent, testing rigorously, and keeping humans in the loop, startups can ship faster, reduce rework, and open bigger markets.
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
              buttonHref="/?mode=recommend"
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
