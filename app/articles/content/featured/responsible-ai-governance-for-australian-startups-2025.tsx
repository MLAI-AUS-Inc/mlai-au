import { Link, useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
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
const TOPIC = 'Responsible AI governance for Australian startups'
const CATEGORY = 'ai' // e.g. 'ai'
const SLUG = 'responsible-ai-governance-australia-2025'
const AUTHOR = 'MLAI Editorial Team'
const AUTHOR_ROLE = 'Editorial Team'
const AUTHOR_BIO = 'Writing clear, evidence-based guidance for Australian founders navigating AI safely.'
const AUTHOR_AVATAR = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80'
const DATE_MODIFIED = '2025-01-15'
const DESCRIPTION = 'A practical 2025 guide to responsible AI governance for Australian startups, covering risk, privacy, and rollout steps.'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1600&q=80'
const HERO_IMAGE_ALT = 'Team collaborating on AI governance with laptops and documents'
const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

const faqs: FAQ[] = [
  { id: 1, question: 'What does responsible AI governance mean for Australian startups in 2025?', answer: 'It means having clear guardrails for how you design, procure, and operate AI systems—covering privacy, security, fairness, transparency, and accountability—aligned to Australian privacy law, OAIC guidance, and emerging global benchmarks like ISO/IEC 42001.' },
  { id: 2, question: 'Do we need a formal AI policy before piloting a model?', answer: 'Yes. A short, plain-language AI use policy sets expectations early, documents permissible use cases, data handling, human oversight, and incident reporting. It reduces downstream rework and is often requested by enterprise customers during security reviews.' },
  { id: 3, question: 'How does the Privacy Act reform affect AI projects?', answer: 'The 2025 reforms expand the definition of personal information and strengthen individual rights (access, correction, erasure-like mechanisms). Startups should map data flows, minimise personal data in prompts/training, and build processes to respond to rights requests quickly.' },
  { id: 4, question: 'Is ISO/IEC 42001 certification mandatory?', answer: 'No, but ISO/IEC 42001 (AI management systems) is a useful reference. Using it as a checklist helps structure risk assessment, controls, monitoring, and continuous improvement, even if you do not pursue certification.' },
  { id: 5, question: 'How can small teams keep governance lightweight?', answer: 'Use a single-page AI register, a standard risk triage (low/medium/high), pre-approved model list, data minimisation defaults, and a monthly 30-minute review to adjust controls. Automate logging and access control where possible.' },
  { id: 6, question: 'What evidence should we keep for customers and investors?', answer: 'Maintain an AI system register, data protection impact assessments for higher-risk uses, model cards or brief system cards, incident logs (even near-misses), vendor DPAs, and change logs for prompts or fine-tuned models. Keep these in a shared, versioned workspace.' },
]

export const meta = ({ data }: { data: Awaited<ReturnType<typeof loader>> }) => {
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
            'Brief, factual overview referencing current Australian context (e.g. 2025 ecosystem norms, official guidance, privacy expectations, or common pathways).',
          items: [
            {
              label: `What is ${TOPIC}?`,
              description:
                'A structured way to design, deploy, and monitor AI systems so they stay lawful, safe, explainable, and fair—aligned to Australian privacy law and customer expectations.',
            },
            {
              label: `Who needs it?`,
              description:
                'Startups, scaleups, and product teams shipping AI-enabled features, especially when handling personal, health, financial, or customer-owned data.',
            },
            {
              label: `Cost & Effort (2025)`,
              description:
                'Expect 1–3 weeks to draft policies, set up an AI register, and run first risk triage; minimal tooling cost if you leverage existing security stack.',
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
               <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84p4.8m7.381-5.84a14.926 14.926 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
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
            Responsible AI governance is the set of lightweight policies, controls, and review practices that keep AI-enabled products lawful, safe, and trustworthy. For Australian startups in 2025, that means aligning with the Privacy Act (including the pending reforms), OAIC guidance on automated decision-making, and customer procurement standards. It spans the full lifecycle: from scoping use cases and vetting vendors to monitoring outputs and handling incidents.
          </p>
          <p>
            Practically, governance is not bureaucracy—it is a repeatable way to answer: What data are we using? Who can access it? How do we detect and address bias or hallucinations? Who is accountable if something goes wrong? Good governance keeps teams moving faster by preventing surprises during enterprise security reviews and investor diligence.
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
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5312df9c-7208-4b2b-bb61-aebb2d1b83fe.jpg?alt=media&token=1b2dc87a-3f68-492e-9902-cfdc705a051f" alt="Abstract illustration symbolizing the importance of technology and innovation in 2025." className="w-full rounded-lg my-8" />

          <p>
            Demand for AI features is rising, but so are expectations around privacy, explainability, and resilience. Australian customers routinely ask for data residency, model transparency, and evidence of human oversight. The Privacy Act reforms and global moves (EU AI Act, NIST AI RMF, ISO/IEC 42001) are shaping procurement checklists. Ignoring governance creates downstream costs: delayed deals, rework for security controls, and reputational damage if outputs are wrong or harmful.
          </p>
          <p>
            Acting now gives you a commercial edge. A concise AI register, a signed-off policy, and a standard risk triage give enterprise buyers confidence. They also help founders prioritise what to automate, where to keep a human in the loop, and how to mitigate hallucinations, bias, and prompt injection.
          </p>

          <div className="my-8 border-l-4 border-indigo-500 bg-indigo-50/50 pl-6 py-4 pr-4 rounded-r-lg">
            <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
              <span className="text-xl">💡</span> Pro Tip
            </h4>
            <p className="mt-1 text-gray-700">
              Start every new AI use case with a 30-minute risk triage: data sensitivity, impact on individuals, and failure modes—then set monitoring and human review accordingly.
            </p>
          </div>

          <h2>Step-by-Step Guide</h2>
<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-35222ac5-bfa6-4bbb-b67d-a5a9e9104aa3.jpg?alt=media&token=3f4c085a-604c-435b-a792-6c3828ad6c6f" alt="Modern abstract illustration depicting a step-by-step guide concept with technical elements and vibrant colors." className="w-full rounded-lg my-8" />

          
          <h3>Step 1: Preparation</h3>
          <p>
            Map your use cases and data flows. Identify personal, health, financial, or customer-owned data that may enter prompts, fine-tuning sets, or model outputs. Draft a two-page AI policy that covers permissible use, approval flow, logging, human oversight, and incident response. Stand up an AI system register (a single spreadsheet or Notion table is fine) capturing owner, purpose, data types, model/vendor, and risk rating. Establish a short approval path: proposer → security/privacy check → product lead sign-off.
          </p>
          <p>
            Pre-select vendors and models with clear DPAs, regional hosting, audit logging, and red-teaming evidence. For any high-risk use (employment, lending, health), plan a Data Protection Impact Assessment (DPIA) and make sure a human remains in control of consequential decisions.
          </p>
          
          <h3>Step 2: Execution</h3>
          <p>
            Build with privacy and safety defaults: minimise PII in prompts, mask identifiers, and avoid feeding customer secrets into shared models. Use role-based access control, short-lived credentials, and logging for all admin actions. Capture evaluation baselines (quality, latency, cost) and add guardrails: input validation, output filtering, and rate limits. Document prompts and fine-tune configurations; treat them as code (versioned, reviewed).
          </p>
          <p>
            Run a red-team sprint: prompt injection attempts, data exfiltration, toxicity, bias on sensitive attributes. For medium/high-risk uses, add human-in-the-loop checkpoints and display clear user notices when AI is assisting. Keep support channels ready for user feedback and errors; log and classify issues in your incident tracker.
          </p>

          <h3>Step 3: Review</h3>
          <p>
            Monitor drift and incidents weekly at first, then monthly once stable. Track quality metrics, false positives/negatives, and any user complaints. Re-run bias checks when data or prompts change. Update your AI register and change log after each release. If a material incident occurs, follow your incident playbook: contain, communicate, correct, and document. Use the lessons to tighten prompts, filters, or human oversight.
          </p>
          <p>
            Prepare evidence for customers and investors: system cards/model cards, DPIA summaries, access logs, and your latest policy. This short bundle speeds procurement and due diligence.
          </p>
          
          <h2>Conclusion</h2>
          <p>
            Responsible AI governance is a speed enabler, not a blocker. By pairing a clear policy, an AI register, targeted risk triage, and simple monitoring, Australian startups can ship AI features faster, win customer trust, and stay ahead of 2025 regulatory expectations.
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
