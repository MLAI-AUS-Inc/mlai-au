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

const TOPIC = "How to Assess Cofounder Values Match Before You Commit"
export const CATEGORY = "featured"
export const SLUG = "how-to-assess-cofounder-values-match-before-you-commit"
export const DATE_PUBLISHED = "2026-03-30"
export const DATE_MODIFIED = "2026-03-30"
export const DESCRIPTION = "How to assess cofounder values match before building together."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-61741a72-5e72-4a5d-aa77-2b18a2d80edd.jpg?alt=media&token=9365304c-09a2-4986-914d-af4699a65f17"
const HERO_IMAGE_ALT = "Two startup cofounders in"
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
  { id: 1, question: "What is the difference between cofounder values fit and skills fit?", answer: "Skills fit is about whether your roles complement each other. Values fit is about whether you make tough decisions using similar principles when tradeoffs, pressure, or conflict appear." },
  { id: 2, question: "Can cofounders succeed if they share a vision but not the same values?", answer: "They may agree on the destination but still clash on how to get there. The grounded sections show that shared direction alone does not prevent conflict over trust, pace, transparency, or decision-making." },
  { id: 3, question: "What should you ask a potential cofounder to assess values alignment?", answer: "Ask about mission, long-term ambition, time commitment, pace, risk tolerance, money, feedback style, and conflict handling. The goal is to compare real expectations, not just broad statements about working well together." },
  { id: 4, question: "How long should a cofounder trial project be?", answer: "The source material supports a short, bounded trial rather than an immediate formal commitment. It should be long enough to include real deadlines, shared ownership, and at least one meaningful decision." },
  { id: 5, question: "What are signs to pause or walk away from a cofounder partnership?", answer: "Pause when important expectations still feel vague after several discussions. Walk away when repeated conversations reveal deep differences on trust, priorities, commitment, or how the company should be built." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Assess Cofounder Values Match Before You Commit",
  intro: "How to assess cofounder values match before building together.",
  items: [
    { label: "What a values match really means", description: "A cofounder values match is about shared principles behind hard decisions, not similar personalities. It is separate from both shared vision and complementary skills." },
    { label: "How to test alignment early", description: "Use structured conversations about mission, commitment, risk, money, communication, and conflict. Direct questions reveal where agreement is real and where assumptions differ." },
    { label: "Why a short trial matters", description: "A bounded project with deadlines and shared ownership shows how each person behaves under pressure. Consistent actions are a better signal than verbal agreement alone." },
  ],
}

export const articleMeta = {
  title: "How to Assess Cofounder Values Match Before You Commit",
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
  { question: "What is the difference between cofounder values fit and skills fit?", answer: "Skills fit is about whether your roles complement each other. Values fit is about whether you make tough decisions using similar principles when tradeoffs, pressure, or conflict appear." },
  { question: "Can cofounders succeed if they share a vision but not the same values?", answer: "They may agree on the destination but still clash on how to get there. The grounded sections show that shared direction alone does not prevent conflict over trust, pace, transparency, or decision-making." },
  { question: "What should you ask a potential cofounder to assess values alignment?", answer: "Ask about mission, long-term ambition, time commitment, pace, risk tolerance, money, feedback style, and conflict handling. The goal is to compare real expectations, not just broad statements about working well together." },
  { question: "How long should a cofounder trial project be?", answer: "The source material supports a short, bounded trial rather than an immediate formal commitment. It should be long enough to include real deadlines, shared ownership, and at least one meaningful decision." },
  { question: "What are signs to pause or walk away from a cofounder partnership?", answer: "Pause when important expectations still feel vague after several discussions. Walk away when repeated conversations reveal deep differences on trust, priorities, commitment, or how the company should be built." },
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
        <p><strong>{TOPIC}</strong> — {"Choosing a cofounder is one of the highest-stakes decisions in a startup. Several of the sources frame it as a choice that can matter as much as, or even more than, the original idea because the relationship shapes how the company makes decisions, handles pressure, and keeps moving when things get hard. Strong early chemistry can feel convincing, but it does not tell you enough about how two people will respond when priorities clash, trade-offs get painful, or the work becomes less exciting and more repetitive."}</p>
        <p>{"That is why values match deserves explicit assessment, not just a good gut feeling. The source material consistently points to shared vision, values, commitment expectations, trust, and working style as core parts of cofounder fit, while also warning against overvaluing skills alone. In practice, a promising cofounder is not just someone talented or easy to talk to. It is someone whose underlying principles line up with yours well enough to support better decisions over time."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="How to assess cofounder values match before building together."
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
          {"A cofounder values match is about shared principles behind hard decisions, not similar personalities. It is separate from both shared vision and complementary skills."}
        </QuoteBlock>
          <h2>{"Define what a cofounder values match actually means"}</h2>
          <p>{"A cofounder values match is not about having the same personality, background, or working quirks. It is about sharing the core principles that guide choices when things get hard. Sources consistently frame values as the hidden force behind decision-making, especially under pressure. In practice, that means asking whether both founders judge tradeoffs in similar ways: how transparent to be, how to treat commitments, what kind of culture to build, and what lines they will not cross to grow faster."}</p>
          <p>{"That is different from shared vision. Vision is about where the company is going and how big or fast both people want to build it. Values are about how the team gets there. Two founders can agree on the product and market direction, but still clash if one cares most about speed while the other cares most about process or trust. A strong match usually needs both: enough alignment on direction to move together, and enough alignment on principles to make consistent choices."}</p>
          <p>{"It is also different from complementary skills. Many cofounder searches start with role gaps such as product plus engineering or technical plus sales. That mix can be useful, and several sources explicitly recommend complementary rather than identical skills."}</p>
          <p>{"So when you assess values match, the goal is not to ask, \"Are we the same?\" The better question is, \"Will we make the same kind of tough calls for the same reasons?\" If the answer is unclear, you may have skill fit or idea fit without true cofounder compatibility."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-da2cef24-2019-422a-bc89-ec425bfeae4b.jpg?alt=media&token=8e7bc4f1-355a-4f28-b7c1-7ae13c87cb3f"
            alt="Define what a cofounder values match actually means"
            caption="Define what a cofounder values match actually means"
            width={1200}
            height={800}
          />
          <h2>{"Use four conversations to surface core values early"}</h2>
          <p>{"A values match is easier to assess when you break the discussion into a few focused conversations instead of one vague chemistry check. The strongest pattern across the sources is simple: shared vision and core values matter more than just finding someone with useful skills. Early talks should help you learn how a potential cofounder thinks about the company\u2019s future, how they want to work, and what happens when pressure forces tradeoffs."}</p>
          <p>{"These conversations work best when you ask direct questions and compare real expectations, not just broad statements like \u201cwe both care about impact\u201d or \u201cwe both move fast.\u201d Sources on cofounder fit repeatedly point to alignment on vision, commitment, working style, communication, and conflict handling. It is to find out where agreement is essential and where differences will create friction later."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3931f2d5-daf5-480d-b55f-2eb5e6c502c5.jpg?alt=media&token=21b79492-98b8-4c21-a09b-6640c9b7df51"
            alt="Use four conversations to surface core values early"
            caption="Use four conversations to surface core values early"
            width={1200}
            height={800}
          />
          <h3>{"1. Mission and commitment"}</h3>
          <p>{"Start with the big picture: what kind of company do you both want to build, and why does it matter to each of you? A shared vision is a recurring theme in the priority sources, because people can have complementary skills but still pull in different directions if they want different outcomes. Ask what success looks like in a few years, what kind of problem feels worth the effort, and what choices each person would protect if growth and values ever came into tension."}</p>
          <p>{"Discuss availability, expected pace, and how much time each person can realistically give. This helps reveal values in action. Standardising these expectations early gives you a clearer picture of whether the partnership can work in real life, not just in theory."}</p>
          <h3>{"2. Risk, priorities, and conflict"}</h3>
          <p>{"Talk through how each of you thinks about uncertainty, financial pressure, and the tradeoffs between startup demands and life outside work."}</p>
          <p>{"The fourth conversation is about communication, feedback, and conflict resolution. The sources emphasise that values show up most clearly when people disagree. Ask how they like to give feedback, how they prefer to handle tension, and what they do when trust takes a hit. A healthy cofounder match is not one with no conflict. It is one where both people can handle disagreement in a way that protects the relationship and the company."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to assess cofounder values match checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Move forward when your vision, values, commitment level, and conflict norms are clear enough to state in writing.",
            "Slow down when alignment seems promising but important expectations are still not defined.",
            "End the process when repeated conversations expose deep differences on trust, priorities, or how the company should be built.",
          ]}
          accent="indigo"
        />
          <h2>{"Look for evidence in behaviour, not just agreement"}</h2>
          <p>{"Early conversations can make two people sound more aligned than they really are. Most potential co-founders can say they care about trust, ambition, or a shared mission. The better test is to ask for real examples from past work: how they made hard decisions, how they handled pressure, and whether they followed through when plans became messy. The source material consistently frames compatibility as more than a good first impression. It points to shared values as something that shows up in decisions, not just in polished answers."}</p>
          <p>{"Reliability and trust are observable. Can they explain a time when values shaped a trade-off, not just name a value they like? Sources on co-founder vetting also suggest testing compatibility through real-life scenarios."}</p>
          <p>{"That keeps the focus on evidence."}</p>
          <p>{"In practice, founders should treat values alignment as something to verify over time. A co-founder relationship is built on repeated decisions under pressure, so the best assessment method is one that watches for patterns. Agreement is a starting point. Consistent action is the proof."}</p>
          <h2>{"Run a short trial before making the partnership official"}</h2>
          <p>{"A short working trial is often safer than jumping straight into a formal cofounder commitment. The core idea is simple: do real work together before you tie equity, titles, and long-term expectations to the relationship. The sources consistently point to the same risk areas to test early: vision and values alignment, working style compatibility, and commitment expectations."}</p>
          <p>{"Keep the trial bounded and meaningful. Choose a small project with a deadline, shared ownership, and at least one decision that matters. That is where values become real."}</p>
          <p>{"Compare what each person expected on pace, ownership, availability, and decision-making."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e569619a-5b7a-44e1-8a54-89dd3bcd7377.jpg?alt=media&token=25467d74-0b7d-4157-977a-3350d015eb41"
            alt="Run a short trial before making the partnership official"
            caption="Run a short trial before making the partnership official"
            width={1200}
            height={800}
          />
          <h2>{"Decide with clarity and document the partnership"}</h2>
          <p>{"Once you have assessed values match, make the decision explicit. A strong fit should not end with a vague sense that you get along well. It should lead to clear agreement on the big issues that shape day-to-day work: your shared vision, how much time each person will commit, how you will make decisions, and how you will handle disagreement. The sources consistently point to values alignment, commitment expectations, working style, communication, and conflict handling as the foundations of a durable cofounder relationship."}</p>
          <p>{"Compatibility matters most when the startup is under pressure, not when conversations are easy. The goal is not simply to find a cofounder. It is to build a working relationship that can hold up through uncertainty, hard trade-offs, and conflict."}</p>
          <ul>
            <li>{"Move forward when your vision, values, commitment level, and conflict norms are clear enough to state in writing."}</li>
            <li>{"Slow down when alignment seems promising but important expectations are still not defined."}</li>
            <li>{"End the process when repeated conversations expose deep differences on trust, priorities, or how the company should be built."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2f1421db-cdd8-49d6-8899-53a5ef5f1773.jpg?alt=media&token=a5c93846-8420-406b-91a1-4c075b71a3c4"
            alt="Decide with clarity and document the partnership"
            caption="Decide with clarity and document the partnership"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A bounded project with deadlines and shared ownership shows how each person behaves under pressure. Consistent actions are a better signal than verbal agreement alone."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.mentessa.com/7-best-practices-for-a-cofounder-matching-service-online/", title: "7 Best Practices for a Cofounder Matching Service Online", publisher: "mentessa.com", description: "Authoritative reference supporting 7 Best Practices for a Cofounder Matching Service Online.", category: "guide"},
          {id: 2, href: "https://foundingjourney.com/p/cofounder-mistakes", title: "8 Common Mistakes When Choosing a Co-Founder", publisher: "foundingjourney.com", description: "Authoritative reference supporting 8 Common Mistakes When Choosing a Co-Founder.", category: "guide"},
          {id: 3, href: "https://www.ycombinator.com/blog/10-questions-to-discuss-with-a-potential-co-founder", title: "10 Questions to Discuss with a Potential Co-founder | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting 10 Questions to Discuss with a Potential Co-founder | Y Combinator.", category: "guide"},
          {id: 4, href: "https://onlyfounders.app/all-blogs/cofounder-compatibility-testing-your-cofounder-s-compatibility", title: "Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App", publisher: "onlyfounders.app", description: "Authoritative reference supporting Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App.", category: "guide"},
          {id: 5, href: "https://www.nfx.com/post/the-pyramid-of-cofounder-success", title: "The Pyramid of Co-Founder Success", publisher: "nfx.com", description: "Authoritative reference supporting The Pyramid of Co-Founder Success.", category: "guide"},
          {id: 6, href: "https://www.linkedin.com/posts/the-startup-pod_the-ultimate-co-founder-vetting-checklist-activity-7268049878226714624-xUKx", title: "The Ultimate Co-Founder Vetting Checklist | The Startup Podcast", publisher: "linkedin.com", description: "Authoritative reference supporting The Ultimate Co-Founder Vetting Checklist | The Startup Podcast.", category: "guide"},
          {id: 7, href: "https://blog.foundersbase.com/how-can-i-vet-or-evaluate-a-potential-co-founders-compatibility/", title: "How can I vet or evaluate a potential co-founder\u2019s compatibility?", publisher: "blog.foundersbase.com", description: "Authoritative reference supporting How can I vet or evaluate a potential co-founder\u2019s compatibility?.", category: "guide"},
          {id: 8, href: "https://www.nascent.live/post/why-finding-the-right-co-founder-match-is-critical-for-your-startup", title: "Why finding the right co-founder match is critical for your startup", publisher: "nascent.live", description: "Authoritative reference supporting Why finding the right co-founder match is critical for your startup.", category: "guide"},
          {id: 9, href: "https://www.startuplinkx.com/post/find-startup-cofounder-guide", title: "How to Find the Perfect Cofounder: Matchmaking Guide for Startups| Blog | StartupLinkX", publisher: "startuplinkx.com", description: "Authoritative reference supporting How to Find the Perfect Cofounder: Matchmaking Guide for Startups| Blog | StartupLinkX.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Go deeper on cofounder alignment"
            body="Compare short trials, hard questions, and decision checkpoints before you formalise the partnership with a cofounder."
            buttonText="Read the follow-up guide"
            buttonHref="/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit"
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
