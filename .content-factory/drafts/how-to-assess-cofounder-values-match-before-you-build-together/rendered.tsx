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

const TOPIC = "How to Assess Cofounder Values Match Before You Build Together"
export const CATEGORY = "featured"
export const SLUG = "how-to-assess-cofounder-values-match-before-you-build-together"
export const DATE_PUBLISHED = "2026-03-30"
export const DATE_MODIFIED = "2026-03-30"
export const DESCRIPTION = "Learn how to assess cofounder values match through shared vision, decision-making tests, and short working trials before you commit."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9b914193-05a7-4404-bf90-bc944fff8c3f.jpg?alt=media&token=3d7c9adc-8538-4299-a794-6a6c52b0bd74"
const HERO_IMAGE_ALT = "Two cofounders in close-up comparing notes during a trial work session to test values match and decisions"
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
  { id: 1, question: "What is the clearest sign that two cofounders share the right values?", answer: "The clearest sign is consistent alignment across vision, decision standards, and commitment level. It is stronger when both people respond similarly in real trade-off discussions and small working tests." },
  { id: 2, question: "Can cofounders have very different skills and still be a strong match?", answer: "Yes. Different skills can strengthen a founding team if core values, trust, communication, and company direction are aligned. Skill gaps are usually easier to manage than mismatched standards or priorities." },
  { id: 3, question: "How long should a cofounder trial project last?", answer: "The article supports a short, limited sprint rather than a full startup simulation. It should be long enough to reveal availability, follow-through, feedback handling, and how each person works under real constraints." },
  { id: 4, question: "When should you walk away from a potential cofounder match?", answer: "Walk away when the same conflicts keep returning, or when you want a different company, pace, or level of commitment. Repeated vagueness about decisions, standards, or responsibilities is also a warning sign." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Assess Cofounder Values Match Before You Build Together",
  intro: "Learn how to assess cofounder values match through shared vision, decision-making tests, and short working trials before you commit.",
  items: [
    { label: "Why values match matters", description: "Values alignment affects decisions, conflict handling, trust, and company direction. Early chemistry can help, but it is a weaker signal than shared vision, principles, and working norms." },
    { label: "What to test first", description: "Start with the future, not operating details. Compare your goals, mission, risk appetite, time horizon, and commitment expectations to see whether you want to build the same kind of company." },
    { label: "How to gather real evidence", description: "Use scenario conversations and a short working trial to observe trade-offs, communication, follow-through, and decision processes. This shows whether stated values hold up once the work becomes real." },
  ],
}

export const articleMeta = {
  title: "How to Assess Cofounder Values Match Before You Build Together",
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
  { question: "What is the clearest sign that two cofounders share the right values?", answer: "The clearest sign is consistent alignment across vision, decision standards, and commitment level. It is stronger when both people respond similarly in real trade-off discussions and small working tests." },
  { question: "Can cofounders have very different skills and still be a strong match?", answer: "Yes. Different skills can strengthen a founding team if core values, trust, communication, and company direction are aligned. Skill gaps are usually easier to manage than mismatched standards or priorities." },
  { question: "How long should a cofounder trial project last?", answer: "The article supports a short, limited sprint rather than a full startup simulation. It should be long enough to reveal availability, follow-through, feedback handling, and how each person works under real constraints." },
  { question: "When should you walk away from a potential cofounder match?", answer: "Walk away when the same conflicts keep returning, or when you want a different company, pace, or level of commitment. Repeated vagueness about decisions, standards, or responsibilities is also a warning sign." },
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
        <p><strong>{TOPIC}</strong> — {"A cofounder relationship affects almost every important choice a startup makes. It shapes how people set priorities, handle disagreement, divide responsibility, and decide what kind of company they want to build. Several cofounder-matching and compatibility sources frame founder fit as one of the most important decisions in a startup, and they consistently put shared vision and values near the top of that fit. That matters because a cofounder is not just a skilled helper. They are a long-term decision partner."}</p>
        <p>{"Early chemistry can still be useful, but it is not enough on its own. It is easy to confuse energy, similar backgrounds, or a good first conversation with deeper alignment. The sources here repeatedly warn that strong partnerships depend on shared vision, values, trust, communication, and compatible ways of working, not just enthusiasm or overlapping talent. When that alignment is weak, tension tends to show up later around commitment, conflict, and company direction. That is why it makes sense to test values match early, before equity, titles, and product pressure make a poor fit much harder and more expensive to unwind."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to assess cofounder values match through shared vision, decision-making tests, and short working trials before you commit."
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
          {"Values alignment affects decisions, conflict handling, trust, and company direction. Early chemistry can help, but it is a weaker signal than shared vision, principles, and working norms."}
        </QuoteBlock>
          <h2>{"Start with shared vision before debating operating details"}</h2>
          <p>{"A strong values match usually starts with a shared picture of where the company is going. Before you spend too much time debating tools, titles, or weekly habits, ask a potential cofounder what success looks like in three to five years. Listen for whether you both describe the same kind of company, not just the same first product. The sources consistently frame cofounder fit around shared vision and values, rather than skills alone, because those deeper beliefs shape later decisions when the business gets harder."}</p>
          <p>{"Once the high-level vision is on the table, compare the assumptions underneath it. Sources on cofounder matching repeatedly connect fit with aligned expectations around commitment and long-term direction. That means values assessment is not only about ethics or personality."}</p>
          <p>{"A simple way to assess cofounder values match is to notice whether your future-facing answers pull in the same direction. If you both want to solve the same problem, at a similar scale, over a similar time horizon, you have a foundation for deeper testing. If one person wants a mission-led company and the other mainly wants a quick exit, or one expects a full commitment while the other imagines a side project, you have learned something important early. Clarity here helps you avoid mistaking excitement about starting for true alignment about building."}</p>
          <ul>
            <li>{"Useful prompts"}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3a829214-79a1-40cb-a38c-f1f2000d0fd6.jpg?alt=media&token=34331ee4-7784-453a-a392-d27f6c0aaa29"
            alt="Start with shared vision before debating operating details"
            caption="Start with shared vision before debating operating details"
            width={1200}
            height={800}
          />
          <h2>{"Use values conversations to surface decision-making patterns"}</h2>
          <p>{"A values match is easier to see in hard trade-offs than in broad statements like \u201cwe care about culture\u201d or \u201cwe move fast.\u201d Several cofounder-fit sources stress that shared vision and core values shape day-to-day decisions, while skills alone do not prevent conflict. A practical way to test this is to talk through realistic startup choices and ask why each person would choose that path. The goal is not to hear the most polished answer."}</p>
          <p>{"Use a few concrete scenarios that founders are likely to face early: who to hire first, how much to promise a customer before the product is ready, when to choose speed over quality, and how carefully to spend limited capital. It becomes risky when neither founder can explain their trade-offs clearly, or when their logic changes from one scenario to the next."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d00b6ce6-39bb-4bc6-806b-adab96920ac8.jpg?alt=media&token=f2912617-43c3-4e0a-8c26-cbfde8bbef1c"
            alt="Use values conversations to surface decision-making patterns"
            caption="Use values conversations to surface decision-making patterns"
            width={1200}
            height={800}
          />
          <h3>{"Test disagreement before you commit"}</h3>
          <p>{"A strong values conversation should also cover what happens when the two of you disagree. Multiple cofounder-matching guides emphasise compatibility in working style, commitment, and communication, not just shared ambition. So ask each other to walk through a likely conflict: for example, a key customer wants a feature that will slow the roadmap, or cash is tight and one founder wants to keep hiring while the other wants to extend runway. Then ask how the final decision would be made."}</p>
          <p>{"Look for a decision process that both founders can accept. What matters most is that both people can describe a fair way to resolve tension before it becomes personal. If the conversation keeps slipping back to vague promises like \u201cwe\u2019ll figure it out,\u201d you probably have not yet tested values deeply enough."}</p>

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
            "Values alignment influences decisions, conflict handling, and long-term direction.",
          ]}
          accent="indigo"
        />
          <h2>{"Separate complementary skills from non-negotiable values"}</h2>
          <p>{"A strong cofounder match does not mean you need the same background, personality, or job history. In many cases, the partnership is better when skills are complementary. One person may be stronger in product or engineering, while the other is better at sales, operations, or community building. Several sources make the same point: different capabilities can widen what the founding team can do, spread the workload, and improve decision-making. The key is that skill differences should add coverage, not create constant friction."}</p>
          <p>{"Values sit in a different category. Sources in this section repeatedly tie durable cofounder relationships to shared vision, trust, and open communication. If one founder is flexible about promises, deadlines, or transparency and the other is not, the problem is usually deeper than a simple skills gap. The same is true when founders disagree on commitment level, decision standards, or what kind of company they want to build."}</p>
          <ul>
            <li>{"Hard-to-fix differences: honesty standards, trust, communication habits, and founder commitment."}</li>
          </ul>
          <h2>{"Check commitment and working style with a short real-world trial"}</h2>
          <p>{"The goal is not to simulate an entire startup. It is to see what happens when the work becomes real and both people have to make trade-offs. Sources on cofounder fit consistently point to commitment, availability, and working style as core tests, so a limited sprint gives you clearer evidence than another long conversation alone."}</p>
          <p>{"This helps turn abstract claims like \"I am committed\" or \"I work well under pressure\" into behaviour you can actually observe."}</p>
          <p>{"One founder may want fast decisions and quick experiments, while the other prefers more time and structure. Neither style is automatically wrong, but the gap matters if you will be building together every day."}</p>
          <p>{"Ask whether the time commitment felt sustainable, whether communication felt easy, and whether both people want to keep working together under the same level of responsibility. If the answer is unclear, that is useful information too."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-66eaa301-e0b3-4b03-aef0-d1746fcc45f1.jpg?alt=media&token=716fc1db-5af2-4a26-94ff-7612876ce04a"
            alt="Check commitment and working style with a short real-world trial"
            caption="Check commitment and working style with a short real-world trial"
            width={1200}
            height={800}
          />
          <h2>{"Decide deliberately and document what you learn"}</h2>
          <p>{"By this point, the goal is not to find a perfect match. It is to make a clear decision based on what repeated conversations and small tests have shown. If you and a potential cofounder share the same long-term vision, hold similar core values, and can commit at a similar level, it can make sense to move forward even when your skills are different. The sources consistently frame that as a healthy pattern: complementary skills can strengthen a team, but misaligned values or vision usually create deeper problems later."}</p>
          <p>{"Walking away is the better choice when the same conflicts keep returning or when one person wants a very different company, pace, or way of working. Before you formally start, write down the expectations you do agree on, including your shared direction, how you want to work together, and what commitment each person is making. That simple record will not guarantee success, but it gives the partnership a clearer and more stable starting point."}</p>
          <ul>
            <li>{"Shared vision, similar values, and matched commitment are all present."}</li>
            <li>{"Important questions about standards, priorities, or working style are still unresolved."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ef24423f-0ac0-43c7-b5cc-26d0ad5c2937.jpg?alt=media&token=1a180c62-ddae-4959-8494-eb2dec7a2007"
            alt="Decide deliberately and document what you learn"
            caption="Decide deliberately and document what you learn"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Use scenario conversations and a short working trial to observe trade-offs, communication, follow-through, and decision processes. This shows whether stated values hold up once the work becomes real."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.mentessa.com/7-best-practices-for-a-cofounder-matching-service-online/", title: "7 Best Practices for a Cofounder Matching Service Online", publisher: "mentessa.com", description: "Authoritative reference supporting 7 Best Practices for a Cofounder Matching Service Online.", category: "guide"},
          {id: 2, href: "https://www.ycombinator.com/blog/10-questions-to-discuss-with-a-potential-co-founder", title: "10 Questions to Discuss with a Potential Co-founder | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting 10 Questions to Discuss with a Potential Co-founder | Y Combinator.", category: "guide"},
          {id: 3, href: "https://foundingjourney.com/p/cofounder-mistakes", title: "8 Common Mistakes When Choosing a Co-Founder", publisher: "foundingjourney.com", description: "Authoritative reference supporting 8 Common Mistakes When Choosing a Co-Founder.", category: "guide"},
          {id: 4, href: "https://www.linkedin.com/posts/the-startup-pod_the-ultimate-co-founder-vetting-checklist-activity-7268049878226714624-xUKx", title: "The Ultimate Co-Founder Vetting Checklist | The Startup Podcast", publisher: "linkedin.com", description: "Authoritative reference supporting The Ultimate Co-Founder Vetting Checklist | The Startup Podcast.", category: "guide"},
          {id: 5, href: "https://joinhampton.com/blog/the-template-that-made-sure-my-co-founder-and-i-were-perfect-partners", title: "The Template That Made Sure My Co-Founder and I Were Perfect Partners", publisher: "joinhampton.com", description: "Authoritative reference supporting The Template That Made Sure My Co-Founder and I Were Perfect Partners.", category: "guide"},
          {id: 6, href: "https://blog.foundersbase.com/how-can-i-vet-or-evaluate-a-potential-co-founders-compatibility/", title: "How can I vet or evaluate a potential co-founder\u2019s compatibility?", publisher: "blog.foundersbase.com", description: "Authoritative reference supporting How can I vet or evaluate a potential co-founder\u2019s compatibility?.", category: "guide"},
          {id: 7, href: "https://www.nascent.live/post/why-finding-the-right-co-founder-match-is-critical-for-your-startup", title: "Why finding the right co-founder match is critical for your startup", publisher: "nascent.live", description: "Authoritative reference supporting Why finding the right co-founder match is critical for your startup.", category: "guide"},
          {id: 8, href: "https://onlyfounders.app/all-blogs/cofounder-compatibility-testing-your-cofounder-s-compatibility", title: "Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App", publisher: "onlyfounders.app", description: "Authoritative reference supporting Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App.", category: "guide"},
          {id: 9, href: "https://www.startuplinkx.com/post/find-startup-cofounder-guide", title: "How to Find the Perfect Cofounder: Matchmaking Guide for Startups| Blog | StartupLinkX", publisher: "startuplinkx.com", description: "Authoritative reference supporting How to Find the Perfect Cofounder: Matchmaking Guide for Startups| Blog | StartupLinkX.", category: "guide"},
          {id: 10, href: "https://www.nfx.com/post/the-pyramid-of-cofounder-success", title: "The Pyramid of Co-Founder Success", publisher: "nfx.com", description: "Authoritative reference supporting The Pyramid of Co-Founder Success.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Use a simple founder-fit checklist"
            body="Document shared vision, decision rules, commitment expectations, and working norms before discussing structure. A written checklist helps turn early conversations into clear evidence."
            buttonText="Get the template"
            buttonHref="/ai-startup-building-pitching"
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
