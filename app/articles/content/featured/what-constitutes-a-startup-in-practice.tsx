import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "What Constitutes a Startup in Practice"
export const CATEGORY = "featured"
export const SLUG = "what-constitutes-a-startup-in-practice"
export const DATE_PUBLISHED = "2026-04-06"
export const DATE_MODIFIED = "2026-04-06"
export const DESCRIPTION = "What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-778189b4-82c7-4e6b-9b96-c21abeb867eb.jpg?alt=media&token=ffccdbe3-bf8b-46f0-8fa6-a8da9fae2a13"
const HERO_IMAGE_ALT = "Startup founders h"
export const FEATURED_FOCUS = "startups"

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

export const faqItems: FAQ[] = [
  { id: 1, question: "What qualifies as a startup business?", answer: "A startup business is usually a new venture trying to find, test, and validate a scalable business model. It is typically marked by uncertainty, growth ambition, and a model designed to expand beyond the founder's direct labour." },
  { id: 2, question: "Is every new business a startup?", answer: "No. A business can be new, profitable, and well run without being a startup if it is built for steady owner-led income or a limited local market rather than scalable growth." },
  { id: 3, question: "How is a startup different from a small business?", answer: "The main difference is growth logic. Startups usually aim to prove a repeatable model that can scale quickly, while small businesses often focus on dependable revenue, controlled operations, and sustainable local demand." },
  { id: 4, question: "Do startups always need investors?", answer: "No. External funding is common because startups often spend early on validation, users, and systems, but raising capital is not required for a business to fit the startup pattern." },
  { id: 5, question: "Does a startup have to be a tech company?", answer: "No. Tech-enabled businesses are often associated with startups because software can support repeatable scale, but the defining issue is the growth model, not the industry." },
  { id: 6, question: "Is there one official definition of a startup in Australia?", answer: "No single government definition is used in every context in Australia. Founders, investors, media, and policymakers may use the term differently, which is why practical traits matter more than labels alone." },
]

export const summaryHighlights = {
  heading: "Key facts: What Constitutes a Startup in Practice",
  intro: "What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses.",
  items: [
    { label: "What is the 50-100-500 rule startup?", description: "This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead." },
    { label: "What are the 4 P's of startup?", description: "There is no single four-part framework used across all startup definitions in the source material. A practical reading is product-market uncertainty, scalable model, repeatable growth, and founder intent to expand." },
    { label: "What are the 5 key elements of a startup?", description: "The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses." },
  ],
}

export const articleMeta = {
  title: "What Constitutes a Startup in Practice",
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
  { question: "What is the 50-100-500 rule startup?", answer: "This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead." },
  { question: "What are the 4 P's of startup?", answer: "There is no single four-part framework used across all startup definitions in the source material. A practical reading is product-market uncertainty, scalable model, repeatable growth, and founder intent to expand." },
  { question: "What are the 5 key elements of a startup?", answer: "The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses." },
  { question: "What qualifies as a startup business?", answer: "A startup business is usually a new venture trying to find, test, and validate a scalable business model. It is typically marked by uncertainty, growth ambition, and a model designed to expand beyond the founder's direct labour." },
  { question: "Is every new business a startup?", answer: "No. A business can be new, profitable, and well run without being a startup if it is built for steady owner-led income or a limited local market rather than scalable growth." },
  { question: "How is a startup different from a small business?", answer: "The main difference is growth logic. Startups usually aim to prove a repeatable model that can scale quickly, while small businesses often focus on dependable revenue, controlled operations, and sustainable local demand." },
  { question: "Do startups always need investors?", answer: "No. External funding is common because startups often spend early on validation, users, and systems, but raising capital is not required for a business to fit the startup pattern." },
  { question: "Does a startup have to be a tech company?", answer: "No. Tech-enabled businesses are often associated with startups because software can support repeatable scale, but the defining issue is the growth model, not the industry." },
  { question: "Is there one official definition of a startup in Australia?", answer: "No single government definition is used in every context in Australia. Founders, investors, media, and policymakers may use the term differently, which is why practical traits matter more than labels alone." },
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
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      {faqStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <p><strong>{TOPIC}</strong> — {"A startup is usually understood as a new company or project that is trying to find, test, and validate a scalable business model. The key idea is not simply that the business is new. It is that the founders are working in conditions of uncertainty and are aiming to build something that can grow beyond a single owner or a small local operation. In that sense, a startup is defined as much by its growth path and search process as by its age."}</p>
        <p>{"That is also why not every new business is a startup. A new caf\u00e9, consultancy, or trades business can be a strong business without fitting the usual startup label if it is built for steady owner-led income rather than repeatable scale. In Australia, the term is also debated because there is no single government definition used in every context. Different people use the word differently, including founders, investors, media, and policymakers, so the practical meaning often depends on who is speaking and why."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses."
          width={1600}
          height={1067}
        />

        <AudienceGrid
          heading="Who is this guide for?"
          cards={[
            {
              title: 'Founders & Builders',
              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
          ]}
        />

        <QuoteBlock title="Key insight" variant="purple">
          {"This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead."}
        </QuoteBlock>
          <h2>{"The core traits that usually make a business a startup"}</h2>
          <p>{"The most consistent trait in startup definitions is scalability. A startup is usually built to find and prove a business model that can grow well beyond the founder or a single local operation. It means the business is designed with expansion in mind from the start. In the sources, this is the clearest line between a startup and a typical small business, which may be profitable and new but is not necessarily built for rapid or wide growth."}</p>
          <p>{"Another core trait is uncertainty. A startup is still working out product, market, and model fit, so experimentation is part of the business rather than a side issue. Early-stage startups are trying to validate what customers want, how the company will deliver it, and whether the economics can work at scale. This is why startups are often described as high-risk: they are not just operating a known formula, they are testing one."}</p>
          <p>{"Repeatability also matters. A startup usually aims to grow through systems, software, or processes that can be used again and again without hiring in a strictly one-to-one way for every new customer. That is why tech-enabled businesses are often associated with startups in practice. The point is not that every startup must be a software company, but that the model is meant to expand more efficiently than a business that depends mainly on the owner's time."}</p>
          <p>{"Founder intent helps complete the picture. If the goal is to build a stable business that supports the owner and stays at a manageable size, that is often better described as a small business. If the goal is to build something that can expand significantly, reach a larger market, and grow beyond the founder's direct labour, it fits the startup pattern more closely. Put simply, what constitutes a startup is usually a mix of ambition, uncertainty, and a model designed to scale."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ca205a72-ff9f-4356-9dc1-f06cd9953e0d.jpg?alt=media&token=80e3fa5c-c5fc-4534-af0c-3a9092638f4c"
            alt="The core traits that usually make a business a startup"
            caption="The core traits that usually make a business a startup"
            width={1200}
            height={800}
          />
          <h2>{"Startup versus small business"}</h2>
          <p>{"A small business can be new, profitable, and professionally run without being a startup. The key difference is not age or effort. It is the kind of business model the founders are trying to build. A startup is usually aimed at finding and proving a model that can scale well beyond the founder or a single local market, while a small business is often built to deliver a dependable product or service within a more manageable operating scope."}</p>
          <p>{"That means the word startup should not be used as a synonym for any new business. A new cafe, consultancy, trade service, or local shop may be an excellent business, but that does not automatically make it a startup. Sources describing startups consistently centre on scalable growth and high uncertainty. By contrast, small business guidance tends to focus on practical setup, day-to-day operations, and steady income."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-63a7bff6-1c5f-4057-b07b-508d4a869d64.jpg?alt=media&token=eeaeaf47-f75c-4ec6-8b5a-a05184c2f921"
            alt="Startup versus small business"
            caption="Startup versus small business"
            width={1200}
            height={800}
          />
          <h3>{"Different growth logic"}</h3>
          <p>{"Startups usually optimise for rapid growth. They are trying to build systems, products, or processes that can expand quickly if the model works. Source material on startup definitions and startup-versus-small-business comparisons both point to scalability as a core idea."}</p>
          <p>{"Small businesses often optimise for something different: dependable revenue, controlled costs, and sustainable operations. Their growth may still be healthy, but it is usually more gradual and tied to the limits of staff time, service capacity, location, or local demand. That does not make them less valuable. It just reflects a different business goal."}</p>
          <h3>{"Different funding patterns"}</h3>
          <p>{"Funding usually follows that growth logic. Because startups often want to move faster and capture a larger market, they are more likely to look for external capital to accelerate expansion. The higher uncertainty of a startup model also fits with the idea that founders are still validating how the business will scale."}</p>
          <p>{"Small businesses are more likely to rely on owner investment, loans, or cash generated by the business itself. So when deciding whether a venture is a startup, it helps to ask: is the business mainly designed to operate well and earn reliably, or is it designed to prove a scalable model and grow far beyond its initial size?"}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what constitutes a startup checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Are you still testing and validating a scalable business model?",
            "Is growth meant to extend beyond the founder's direct labour or one local market?",
            "Is uncertainty about product-market fit still a core part of the business?",
          ]}
          accent="indigo"
        />
          <h2>{"Why growth, funding, and risk change the definition"}</h2>
          <p>{"Growth changes the definition because startups are usually built around a business model that can scale, not just provide a steady income for the owner. The core idea is not simply to open a new business, but to find, test, and validate a model that can grow well beyond the founding team. That is why startup discussions often focus on speed, repeatability, and the ability to reach a much larger market. By contrast, a traditional small business may aim for stable demand in a local or limited market, without needing to expand quickly. This difference in ambition matters in practice, because it shapes hiring, product decisions, and how success is measured in the early stage."}</p>
          <p>{"That growth goal also brings more uncertainty and more risk. Early-stage startups are still proving that customers want the product, that the business model works, and that growth can continue without breaking the system. Sources on startup characteristics repeatedly link this stage to significant uncertainty and high failure rates. Funding fits into that picture. Because many startups try to build quickly, acquire users, and put systems in place before profits are reliable, external capital is common. This does not mean every startup raises investment, but it helps explain why investors, accelerators, and startup programs treat startups differently from ordinary business formation. In short, faster growth, higher uncertainty, and more frequent use of outside funding are practical signals that a company is operating like a startup rather than just being a newly registered business."}</p>
          <h2>{"A simple test founders can use"}</h2>
          <p>{"A practical way to test the label is to ask what kind of business you are actually building. A startup is usually still searching for, developing, or validating a scalable business model, not just opening for trade and serving a steady local customer base. That means uncertainty is still central: the team is working out product-market fit, testing whether demand is real, and seeing if the model can grow beyond the founder. This also helps explain why people disagree on definitions. Even in Australia, there is no single official definition used in every context, so scalability and uncertainty are more useful tests than hype or branding."}</p>
          <p>{"The next question is whether the business is designed to grow materially beyond the founder's direct labour or one market. If the model depends mainly on the owner doing the work, or aims for stable owner-managed income, it may be a good new business without being a startup. If the venture is making choices for faster expansion instead, such as planning for scale, raising capital for growth, or building systems that can support a much larger customer base, the startup label fits more closely. A simple rule of thumb is this: if most answers on scalability, growth intent, and product-market uncertainty are no, call it a new business rather than forcing the startup label."}</p>
          <p>{"That distinction matters because the path is different. A general new business still needs planning, registration, finance, and customers, but it may not need the same growth model or investor mindset often associated with startups. Founders can use the test to choose clearer expectations early, instead of measuring themselves against startup mythology that may not match the business they actually want to build."}</p>
          <ul>
            <li>{"Are you still testing and validating a scalable business model?"}</li>
            <li>{"Is growth meant to extend beyond the founder's direct labour or one local market?"}</li>
            <li>{"Is uncertainty about product-market fit still a core part of the business?"}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fa01e49e-522f-45c4-8bce-b9e65feab0f0.jpg?alt=media&token=cd26c6d4-072c-4379-9e68-eac4fb034cb6"
            alt="A simple test founders can use"
            caption="A simple test founders can use"
            width={1200}
            height={800}
          />
          <h2>{"Use the label carefully and focus on the business model"}</h2>
          <p>{"So, what constitutes a startup? The clearest answer is that it is not just a new business. A startup is usually a venture trying to find, prove, and grow a scalable business model while working through real uncertainty. That is why the label fits some young companies and not others. A local business using a proven model can still be an excellent business, but it is usually solving a different problem from a startup built for faster scaling, outside capital, or a broader market."}</p>
          <p>{"In practice, founders should use the word startup only when it helps them make better decisions. Ask a simple question: are you still validating a repeatable path to growth, or are you already operating a model that is well understood? That distinction can shape how you think about funding, hiring, risk, and growth expectations. It is to be honest about the kind of business you are building, so your strategy matches the reality of the venture."}</p>
          <ul>
            <li>{"New alone does not make a business a startup."}</li>
            <li>{"A startup is typically built around scalable growth and uncertainty."}</li>
            <li>{"A practical test is whether the venture is still validating a repeatable growth model."}</li>
            <li>{"Use the label when it clarifies strategy, funding needs, and operating assumptions."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7b06e8b2-f838-4619-92dd-c5b098f77431.jpg?alt=media&token=42f21f2a-f90c-4dd0-92e0-df83ec794921"
            alt="Use the label carefully and focus on the business model"
            caption="Use the label carefully and focus on the business model"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://en.wikipedia.org/wiki/Startup_company", title: "Startup company - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Startup company - Wikipedia.", category: "guide"},
          {id: 2, href: "https://legalvision.com.au/3-differences-between-a-startup-and-small-business/", title: "3 Differences Between a Startup and Small Business", publisher: "legalvision.com.au", description: "Authoritative reference supporting 3 Differences Between a Startup and Small Business.", category: "guide"},
          {id: 3, href: "https://www.liveplan.com/blog/managing/startup-growth-strategies?srsltid=AfmBOopeWKUrJugs7O8AtJxFAleifVMdInqE2iLHB-imsBYTKKuEbjJ7", title: "6 Tried and True Startup Growth Strategies | LivePlan", publisher: "liveplan.com", description: "Authoritative reference supporting 6 Tried and True Startup Growth Strategies | LivePlan.", category: "guide"},
          {id: 4, href: "https://www.fundable.com/learn/resources/guides/startup", title: "Startup Guide - Everything you need to know to start and grow", publisher: "fundable.com", description: "Authoritative reference supporting Startup Guide - Everything you need to know to start and grow.", category: "guide"},
          {id: 5, href: "https://enosta.com/insights/how-to-structure-a-startup-in-australia", title: "How to Structure a Startup in Australia: A Practical Guide for Founders | Enosta", publisher: "enosta.com", description: "Authoritative reference supporting How to Structure a Startup in Australia: A Practical Guide for Founders | Enosta.", category: "guide"},
          {id: 6, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
          {id: 7, href: "https://www.smartcompany.com.au/startupsmart/definition-startup/", title: "When is a startup not a startup, and why can't we agree? - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting When is a startup not a startup, and why can't we agree? - SmartCompany.", category: "guide"},
          {id: 8, href: "https://eu.36kr.com/en/p/3488461729864581", title: "Startup Strategy Guide: Answering Two Questions, Exploring Four Paths", publisher: "eu.36kr.com", description: "Authoritative reference supporting Startup Strategy Guide: Answering Two Questions, Exploring Four Paths.", category: "guide"},
          {id: 9, href: "https://stripe.com/au/resources/more/strategy-for-startups-a-guide-to-creating-a-winning-business-plan", title: "Strategy for startups: Creating a winning startup strategy | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Strategy for startups: Creating a winning startup strategy | Stripe.", category: "guide"},
          {id: 10, href: "https://www.jpmorgan.com/insights/business-planning/10-step-guide-to-starting-your-startup-business", title: "10-Step Guide to Starting Your Startup Business", publisher: "jpmorgan.com", description: "Authoritative reference supporting 10-Step Guide to Starting Your Startup Business.", category: "guide"},
          {id: 11, href: "https://www.smallbusiness.nsw.gov.au/help/common-questions/the-basics-of-starting-a-business", title: "The basics of starting a business | NSW Small Business Commissioner", publisher: "smallbusiness.nsw.gov.au", description: "Authoritative reference supporting The basics of starting a business | NSW Small Business Commissioner.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need a clearer way to assess your venture?"
            body="Use the startup test in this article to check whether your idea is built for scalable growth, still facing product-market uncertainty, or better described as a small business."
            buttonText="Explore founder resources"
            buttonHref="/ai-founder-community-pitching-ideas"
          />
        </div>
      </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
