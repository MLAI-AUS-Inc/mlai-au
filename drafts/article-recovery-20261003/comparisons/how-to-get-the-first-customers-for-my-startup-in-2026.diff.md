# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-get-the-first-customers-for-my-startup-in-2026.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-get-the-first-customers-for-my-startup-in-2026.tsx
@@ -1,276 +1,122 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
-import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import AudienceGrid from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { ArticleEventPreference } from "~/components/articles/ArticleEventPreference";
+import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import { CUSTOMER_PROVENANCE, CUSTOMER_REVIEW_STATUS, CUSTOMER_INVITATION, CUSTOMER_NOTES, CUSTOMER_EVENTS, CUSTOMER_STAGE_ROWS, CUSTOMER_COMPLETED_FIELDS, CUSTOMER_BLANK_FIELDS, CUSTOMER_WEEKS, CUSTOMER_DECISION } from "~/lib/first-customer-conversation";

-export const useCustomHeader = true
-
-const TOPIC = "How to Get the First Customers for My Startup in 2026"
-export const CATEGORY = "featured"
-export const SLUG = "how-to-get-the-first-customers-for-my-startup-in-2026"
-export const DATE_PUBLISHED = "2026-04-04"
-export const DATE_MODIFIED = "2026-04-04"
-export const DESCRIPTION = "Learn how to get the first customers for my startup 2026 with a focused plan: choose a narrow segment, make a simple offer, use founder-led outreach, and turn early users into proof."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-5115416e-9e23-4ea5-90fd-0bd5b7d4ecc7.jpg?alt=media&token=2976f637-b1db-4612-888e-6ffa8311c597"
-const HERO_IMAGE_ALT = "Startup founder pitching first customers in 2026 during a close-up candid chat with an early user"
-export const FEATURED_FOCUS = "startups"
-
-const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
-const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
-const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL
-
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
-}
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: "What is a beachhead customer for an early startup?", answer: "A beachhead customer is a narrowly defined first segment with a clear problem, urgent need, and reachable buying context. It is the small group most likely to try an early solution and give useful feedback." },
-  { id: 2, question: "Should I use paid ads to get my first startup customers in 2026?", answer: "Usually not at the very start. The article supports founder-led outreach first, because paid channels can scale unclear messaging before you know which problem, buyer, and offer actually convert." },
-  { id: 3, question: "How do I know if my value proposition is too vague?", answer: "If prospects need a long explanation to understand the product, the message is still too broad. A stronger value proposition states who the offer is for, what problem it solves, and the specific outcome a user can expect." },
-  { id: 4, question: "What should I collect from my first customers besides revenue?", answer: "Collect feedback, use cases, testimonials, and simple outcome statements in the customer's own words. These details help sharpen positioning and make the next sales conversations more credible." },
-]
-
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "how-to-get-the-first-customers-for-my-startup-in-2026";
+export const DATE_PUBLISHED = "2026-04-04";
+export const DATE_MODIFIED = "2026-09-11";
+const TITLE = "How to get your first startup customers: from conversation to a scoped offer";
+export const DESCRIPTION = "Run a first-customer learning cycle with an outreach draft, interview questions, a completed evidence record and explicit distinctions between interest, trials and payments.";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-5115416e-9e23-4ea5-90fd-0bd5b7d4ecc7.jpg?alt=media&token=2976f637-b1db-4612-888e-6ffa8311c597";
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Person holding a pen and notebook while another person holds a phone" };
 export const summaryHighlights = {
-  heading: "Key facts: How to Get the First Customers for My Startup in 2026",
-  intro: "Learn how to get the first customers for my startup 2026 with a focused plan: choose a narrow segment, make a simple offer, use founder-led outreach, and turn early users into proof.",
+  heading: "A first-customer learning cycle",
+  intro: "Choose a reachable buyer, learn how they handle a recent problem, then propose an honest next step you can deliver. Record a payment separately from polite interest.",
   items: [
-    { label: "Why first customers matter", description: "First customers do more than bring in revenue. They validate demand, improve positioning, and create the early proof that helps later buyers trust a new startup." },
-    { label: "Where to focus first", description: "Start with a narrow beachhead segment you can clearly describe and realistically reach. Precision helps you learn faster than trying to market to a broad audience too early." },
-    { label: "What usually works best early", description: "Founder-led outreach is the most credible starting point for early traction. Direct conversations help test demand, refine the message, and uncover the proof future prospects need." },
+    { label: "For", description: "Australian early-stage founders preparing their first customer conversations—not a contractor recruitment guide." },
+    { label: "Take away", description: "Six supplied fictional answers, a dated follow-up decision and a matching editable twelve-field record." },
+    { label: "No guarantee", description: "A month is a planning window, not a promise of customers. Refusals and reasons not to build are useful results." },
   ],
-}
-
-export const articleMeta = {
-  title: "How to Get the First Customers for My Startup in 2026",
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
-  featuredFocus: FEATURED_FOCUS,
-}
-
-const faqSchemaItems = [
-  { question: "What is a beachhead customer for an early startup?", answer: "A beachhead customer is a narrowly defined first segment with a clear problem, urgent need, and reachable buying context. It is the small group most likely to try an early solution and give useful feedback." },
-  { question: "Should I use paid ads to get my first startup customers in 2026?", answer: "Usually not at the very start. The article supports founder-led outreach first, because paid channels can scale unclear messaging before you know which problem, buyer, and offer actually convert." },
-  { question: "How do I know if my value proposition is too vague?", answer: "If prospects need a long explanation to understand the product, the message is still too broad. A stronger value proposition states who the offer is for, what problem it solves, and the specific outcome a user can expect." },
-  { question: "What should I collect from my first customers besides revenue?", answer: "Collect feedback, use cases, testimonials, and simple outcome statements in the customer's own words. These details help sharpen positioning and make the next sales conversations more credible." },
-]
-
-const faqStructuredData = faqSchemaItems.length
-  ? JSON.stringify({
-      '@context': 'https://schema.org',
-      '@type': 'FAQPage',
-      mainEntity: faqSchemaItems.map((item) => ({
-        '@type': 'Question',
-        name: item.question,
-        acceptedAnswer: {
-          '@type': 'Answer',
-          text: item.answer,
-        },
-      })),
-    })
-  : null
+};
+export const conversationFields = CUSTOMER_BLANK_FIELDS;
+export const faqItems = [
+  { id: 1, question: "How many conversations are enough?", answer: "There is no universal count that proves demand. Choose a manageable learning cycle, record who was included and what remains uncertain, and seek evidence that could contradict your favourite explanation. A few friendly contacts do not represent the market." },
+  { id: 2, question: "Is a free trial a customer?", answer: "Report it as a free trial. Track people who tried the product, accepted paid terms, paid and completed delivery separately. Never combine those stages into a paid-customer claim." },
+  { id: 3, question: "Should I offer a discount?", answer: "Only if the terms and scope make sense for the work you can deliver. Record the actual price and any special conditions. Acceptance at an introductory price does not establish willingness to pay a higher price later." },
+  { id: 4, question: "Can I publish a prospect’s feedback as proof?", answer: "Do not treat an interview as permission to publish a name, quote, logo or result. Obtain appropriate permission for the proposed use, preserve context and distinguish reported results from measurements. Do not generate testimonials or fill missing evidence with AI." },
+];

 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
+  return <div data-cf-article-body>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="first startup customers" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div className="prose prose-lg prose-slate max-w-none">
+      <p>You have an idea or prototype and need to learn whether someone will buy it. Start with a specific person’s recent problem, not a campaign promising that AI will transform everything. This guide helps an early-stage founder conduct and document the conversation, then offer an appropriate demonstration or paid pilot.</p>
+      <p>For channel selection, spending limits and funnel arithmetic, use the <Link to="/articles/featured/go-to-market-for-startups">GTM channel-test guide</Link>. Here the task is narrower: what to say, what evidence to record and how to avoid reporting more traction than actually happened.</p>
+      <ArticleTocPlaceholder />

-  return (
-    <>
+      <h2 id="pick-person" className="scroll-mt-28">1. Identify a person who experiences the problem</h2>
+      <p><a href="https://entrepreneur.nyu.edu/blog/2025/01/13/choosing-your-initial-target-customer/">NYU Entrepreneurship’s initial-customer guidance</a> recommends testing a focused segment and considering problem intensity, access and decision-making ability. It is practical guidance, not evidence of demand for your startup.</p>
+      <p><strong>Fictional example used throughout:</strong> a Melbourne founder is exploring a review-only quote-follow-up assistant for small commercial maintenance firms. The proposed buyer is the owner who approves follow-ups. The founder suspects manual drafting is a problem but has not established its frequency, cost or priority. An office administrator may use the workflow without being able to buy software.</p>
+      <p>Write a fit rule before recruiting: “handles or approves quote follow-up and can describe a recent instance.” Ask how purchases are evaluated instead of assuming a job title means spending authority. Include people who prefer their existing process; they can reveal why your offer is unnecessary.</p>

-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: "/articles" },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
+      <h2 id="invitation" className="scroll-mt-28">2. Ask for a conversation without disguising a sale</h2>
+      <p>Use an appropriate, permitted route, such as an introduction the recipient has agreed to or an invitation made under a group’s rules. The example below is for a person who has agreed to hear from you; it does not establish permission for unsolicited email or other marketing. Check the requirements for your actual channel and jurisdiction before contacting people.</p>
+      <blockquote><p>{CUSTOMER_INVITATION}</p></blockquote>
+      <p>Replace the description with what you are actually building. Do not imply a mutual connection, customer result or finished product you do not have. Do not bulk-message event attendees, scrape contact lists or describe community membership as consent.</p>
+      <p>Agree any follow-up during the conversation: “Would you like the demonstration outline on Thursday, or should we leave it here?” Record the answer. A refusal ends that proposed follow-up; silence is not agreement to an escalating sequence.</p>

-      <ArticleTocPlaceholder className="bg-transparent" />
+      <h2 id="interview" className="scroll-mt-28">3. Ask about the last occurrence before showing your solution</h2>
+      <ol>{CUSTOMER_NOTES.map(note => <li key={note.id}>{note.question}</li>)}</ol>
+      <p>Avoid leading questions such as “Would saving hours with AI be valuable?” They introduce an unproven benefit and invite agreement. If the participant estimates time or lost revenue, label it as their estimate; do not turn it into a measured saving. Ask to see a redacted or synthetic walkthrough only where appropriate, without requesting unnecessary confidential records.</p>
+      <p>Explain note-taking and intended use; obtain appropriate permission before recording or using a transcription service. Keep the minimum information needed in approved systems. Review AI summaries against the actual notes and retain uncertainty rather than having the tool invent a coherent success story.</p>
+      <h3 id="supplied-notes" className="scroll-mt-28">Read the answers before deciding what they mean</h3>
+      <p>{CUSTOMER_PROVENANCE} The future dates describe a story, not a forecast. SYNTHETIC-01 is a separate example, not one of the companion GTM guide’s 28 records.</p>
+      <details className="my-6 rounded-xl border border-gray-300 p-4">
+        <summary className="cursor-pointer font-semibold">Inspect all six scripted interview answers</summary>
+        <p>These are supplied fictional answers and editorial interpretations, not a transcript or an anonymised real interview. N1–N6 are source labels within this exercise.</p>
+        <dl className="space-y-6">{CUSTOMER_NOTES.map(note => <div key={note.id} data-customer-note={note.id}>
+          <dt className="font-bold">{note.id}: {note.question}</dt>
+          <dd className="ml-0 mt-2"><p><strong>Scripted answer:</strong> {note.answer}</p><p><strong>Interpretation:</strong> {note.interpretation}</p><p><strong>Still unknown:</strong> {note.unknown}</p></dd>
+        </div>)}</dl>
+      </details>
+      <p>N3 changes the problem: missing information about a phone agreement will not be fixed merely by drafting faster. N4 supplies contrary evidence—the existing template may already be enough. A useful interview can lead away from building AI.</p>

-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"Getting the first customers still feels hard because launching a product does not create demand on its own. Early founders often hit a frustrating loop: you need customers to prove the product works, but many buyers want proof before they commit. That makes the first sales more than a revenue problem. They are a trust problem. In 2026, that pressure is even more obvious because founders have many channels available, but not much room for vague outreach or broad messaging."}</p>
-        <p>{"Those first customers matter because they help shape what the startup actually becomes. They give direct feedback, show whether your positioning makes sense, and create the first layer of social proof that later customers look for. A better path is to choose a clear target segment, explain a specific problem you solve, and actively reach out instead of waiting for inbound interest."}</p>
-        <p>{"Start by naming the customer, the problem and the existing alternative. Use conversations to test those assumptions before treating a channel or message as proven."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Learn how to get the first customers for my startup 2026 with a focused plan: choose a narrow segment, make a simple offer, use founder-led outreach, and turn early users into proof."
-          width={1600}
-          height={1067}
-        />
+      <h2 id="record" className="scroll-mt-28">4. Keep an evidence record, not a persuasion score</h2>
+      <p>Copy these fields, or <a href="/downloads/first-customer-conversation.txt" download="first-customer-conversation.txt">save the editable record and fictional completed example</a>. The file includes the same twelve blank and completed fields, all six answers, the five-event sequence, stage checks and four-week plan. This is a working aid, not a validated interview instrument.</p>
+      <nav aria-label="Conversation record sections"><ul className="flex list-none flex-wrap gap-x-6 gap-y-2 pl-0">
+        <li><a href="#follow-up-sequence">Follow-up sequence</a></li>
+        <li><a href="#completed-record">Completed record</a></li>
+        <li><a href="#stage-check">Stage evidence</a></li>
+      </ul></nav>
+      <pre className="whitespace-pre-wrap" aria-label="First customer conversation record">{conversationFields.join("\n")}</pre>
+      <h3 id="follow-up-sequence" className="scroll-mt-28">Follow one permission change through the record</h3>
+      <p>This fictional case ends before a demonstration. Read the actual outline and refusal in E3–E4, rather than inferring what they said from a status label.</p>
+      <ol className="list-none pl-0 space-y-5">{CUSTOMER_EVENTS.map(event => <li key={event.id} data-customer-event={event.id}>
+        <p><strong>{event.id} — <time dateTime={event.date}>{event.date}</time>: {event.action}</strong></p>
+        <p><strong>Source material:</strong> {event.source}</p><p><strong>State:</strong> {event.status}</p>
+      </li>)}</ol>
+      <h3 id="completed-record" className="scroll-mt-28">Completed twelve-field record after the refusal</h3>
+      <dl className="space-y-5" data-customer-completed-record>{CUSTOMER_COMPLETED_FIELDS.map((field, index) => <div key={field.label} data-customer-record-field={index + 1}><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl>
+      <h3 id="stage-check" className="scroll-mt-28">What can this record support?</h3>
+      <p>Wide tables scroll sideways; focus a table region and use arrow keys, or read the same rows in the text download.</p>
+      <div role="region" aria-label="First customer stage evidence" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[42rem]">
+        <caption>State at the fictional 21 September review</caption>
+        <thead><tr><th scope="col">Stage</th><th scope="col">Recorded state</th><th scope="col">Evidence boundary</th></tr></thead>
+        <tbody>{CUSTOMER_STAGE_ROWS.map(row => <tr key={row.stage}><th scope="row">{row.stage}</th><td>{row.state}</td><td>{row.evidence}</td></tr>)}</tbody>
+      </table></div>
+      <p><strong>Decision:</strong> {CUSTOMER_DECISION} The refusal is not a failed pricing experiment: no price was shown. It is also not proof that no other buyer has the problem.</p>

-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Builders',
-              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
+      <h2 id="offer" className="scroll-mt-28">5. Make a small offer only when the next step is appropriate</h2>
+      <p><a href="https://www.stoneandchalk.com.au/articles/how-to-get-your-first-startup-customers">Stone &amp; Chalk’s first-customer guide</a> describes early acquisition as learning whether a specific group needs what you are building. Its advice does not guarantee a sale or justify making a benefit claim before testing it.</p>
+      <p>For a different, continuing case—not a new message to this participant—the founder could prepare a fixed AUD 600 total pilot proposal for one review-only workflow, ten synthetic records and one review session. Exclude live integrations, sending messages, ongoing support and sales guarantees. This invented price matches the companion GTM example; it is not an MLAI offer, market benchmark or proof of profitability. It was not shown in SYNTHETIC-01, so willingness to pay remains untested.</p>
+      <p>Before anyone commits, agree the actual deliverable, price and payment conditions, scope exclusions, review criteria, responsibilities, completion date and what happens if the test fails. Clarify access, data handling and handover. If you cannot safely deliver the requested workflow, narrow it or decline rather than selling an undefined “agent”. Use the <Link to="/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers">scoped pilot guide</Link> for the delivery decision.</p>
+      <p>Keep the stages separate: a reply is a response; attending a demonstration is engagement; using a free trial is usage; accepting paid terms is an agreement; receiving payment is a payment; completing the promised work is delivery. Continued use and repeat purchasing are further evidence, not implied by any earlier stage.</p>

-        <QuoteBlock title="Key insight" variant="purple">
-          {"First customers do more than bring in revenue. They validate demand, improve positioning, and create the early proof that helps later buyers trust a new startup."}
-        </QuoteBlock>
-          <h2>{"Choose a beachhead customer you can actually reach"}</h2>
-          <p>{"A common early mistake is trying to sell to a broad market too soon. The stronger move is to pick a narrow beachhead segment: a small group of customers with a specific problem they already feel and care enough to solve. That focus gives you clearer feedback, faster learning, and a better chance of finding the people who will really love the product instead of merely liking the idea. As the NYU entrepreneurship source puts it, early success comes from serving a well-defined segment with urgent need, not from casting the widest possible net."}</p>
-          <p>{"Good first customers usually have obvious pain, a clear user or decision-maker, and a real reason to try something new now. They are often the innovators in a market: people more willing to test an unproven solution if it helps with a pressing workflow or business problem. Stone & Chalk's guidance also supports this practical view of early customer acquisition: founders break through faster when they stop waiting for \"the market\" and start with people who clearly need what they built."}</p>
-          <p>{"Reach matters as much as pain. Your best first customers are often concentrated in a community, industry pocket, workplace pattern, or founder-accessible network where you can start direct conversations. That might mean people you already know through previous work, a local startup ecosystem, or a tightly connected user group where referrals travel quickly. The source material from The Delta supports this idea of concentrated founder networks: being close to the right people can accelerate progress because access is easier and feedback loops are shorter."}</p>
-          <p>{"A simple test is to describe your first customer in one sentence without using vague labels like \"small businesses\" or \"busy professionals.\" If you can name the role, the problem, and where you can realistically meet them, the segment is probably focused enough to pursue. If you cannot, the target is still too broad. For first customers, precision beats scale."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-8e97408a-c4ec-45d0-a9a3-830e0ec9313d.jpg?alt=media&token=9619437d-144a-4efa-b642-244fbdb7a134"
-            alt="Founder notes a narrow target customer segment on a whiteboard beside coffee and market research notes"
-            caption="Choose a beachhead customer you can actually reach"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Turn your value proposition into an offer people will test"}</h2>
-          <p>{"Early customers do not buy a wall of features. The first step is to turn your value proposition into one plain-English offer: who it is for, what problem it helps fix, and what useful outcome they should expect. This is the practical bridge between building something and getting someone to test it. Both startup-focused guides stress that early users help refine positioning, and that founders need to explain the product in a way people can quickly understand rather than assuming the product will sell itself."}</p>
-          <p>{"A simple offer is easier to test than a big vision statement. Rather than listing everything the product might do, lead with the most urgent use case for the first group of customers you want to reach. If your wording is specific, people can quickly decide whether it is relevant to them. This matches the advice to build something people want and to define a unique selling proposition and value proposition before pushing harder on outreach."}</p>
-          <p>{"Once the promise is clear, make the offer easy to try even if the product is still evolving. The point is not to pretend the product is finished. It is to give people a low-friction way to test whether the outcome is real. That approach fits the early-user guidance in the sources, which frames first users as partners in refinement and proof, not as buyers of a polished final system."}</p>
-          <p>{"A good first-customer offer also gives a reason to act now without sounding pushy. The strongest reason is usually practical: you are solving a current problem, you are working closely with a small number of early users, and their feedback will directly shape the product. That makes the offer feel concrete and timely. If people still seem confused, simplify again. Keep the message anchored to one problem, one outcome, and one easy next step. Broad claims are harder to trust, but a focused offer is much easier for an early customer to test."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-96e01b2d-0e9e-4d0d-b74f-c8d02d6aa993.jpg?alt=media&token=91488fc3-cd00-4056-8d0a-ab2b9c37789e"
-            alt="Turn your value proposition into an offer people will test"
-            caption="Turn your value proposition into an offer people will test"
-            width={1200}
-            height={800}
-          />
+      <h2 id="four-weeks" className="scroll-mt-28">6. Use a four-week plan without forcing a sale</h2>
+      <p>The weeks organise work, not promise a customer by day 30. Choose your own time/cash limits and review date before starting. A refusal or lack of safe delivery capacity stops the relevant next step immediately; spare time or a calendar deadline cannot override it.</p>
+      <div role="region" aria-label="First customer four-week plan" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[48rem]">
+        <thead><tr><th scope="col">Window</th><th scope="col">Do</th><th scope="col">Keep as evidence</th><th scope="col">Decision</th></tr></thead>
+        <tbody>{CUSTOMER_WEEKS.map(week => <tr key={week.window}><th scope="row">{week.window}</th><td>{week.work}</td><td>{week.evidence}</td><td>{week.decision}</td></tr>)}</tbody>
+      </table></div>
+      <p>No replies may indicate an unsuitable access route rather than no market demand. No urgency in relevant conversations may indicate a weak problem. Accepted terms followed by non-payment require clarification, not a fabricated conversion. Write alternative explanations before choosing the next experiment.</p>
+      <p>The download has separate actual-case slots for the current permission or refusal, dated evidence, owner, next allowed action, costs/limits and retention review. Keep private notes out of public URLs, unapproved AI tools and analytics. Do not copy fictional answers into a real evidence log.</p>

-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Choose a beachhead customer you can actually reach",
-            "Turn your value proposition into an offer people will test",
-            "Use founder-led outreach before you invest in scale channels",
-            "Turn early users into proof, referrals, and a repeatable motion",
-            "Your next 30 days to get the first customers",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Use founder-led outreach before you invest in scale channels"}</h2>
-          <p>{"For most early startups, founder-led outreach is the fastest way to get from interest to real customer conversations. The source material consistently frames first users and first customers as a learning stage, not just a growth stage. Direct outreach gives you something broader channels cannot give as quickly: honest reactions to your value proposition, your positioning, and the problem you claim to solve. That matters more in the beginning than trying to force volume before the message is clear."}</p>
-          <p>{"If people still need a long explanation before they understand the product, paid acquisition or automation will usually amplify confusion rather than demand. Early conversations help founders hear objections, spot the words prospects already use, and refine the pitch before trying to widen reach. In that sense, founder-led selling is not separate from product and marketing work."}</p>
-          <h3>{"Start with warm paths and trusted communities"}</h3>
-          <p>{"A practical first move is to begin where some trust already exists. The same logic applies to startup communities, founder networks, and curated ecosystems."}</p>
-          <p>{"The important part is to use these channels actively, not passively. Instead of just joining groups and waiting, ask for introductions to a specific type of buyer and look for communities where your target users already talk about the problem. Keep the message plain: who the product is for, what issue it helps with, and why the conversation is worth having now. That approach fits the source emphasis on first users helping refine market positioning and build early social proof."}</p>
-          <h3>{"Use each conversation to test demand and messaging"}</h3>
-          <p>{"Early outreach should do two jobs at once. Yes, you want to win customers, but you also want to learn what makes the right people respond. In the first-customer stage, that feedback loop is often more valuable than chasing large numbers."}</p>
-          <p>{"A simple rhythm is enough. Until then, direct founder-led conversations are usually the more credible starting point."}</p>
-          <h2>{"Turn early users into proof, referrals, and a repeatable motion"}</h2>
-          <p>{"Your first customers should do more than generate revenue. They should help you sharpen who the product is really for, what problem feels most urgent, and which message makes people say yes fastest. The source material consistently frames early users as a feedback loop, not just a sales win."}</p>
-          <p>{"As soon as one customer gets a useful result, capture it in simple language. Write down who they are, why they bought, what changed after using the product, and the exact words they use to describe the value. Those details become social proof for the next conversation and help turn a vague pitch into a credible one. Even a short testimonial, a clear use case, or a before-and-after outcome can make the next sale easier because it shows the product works for a specific kind of buyer."}</p>
-          <p>{"Over time, a repeatable motion starts to appear. That is also when referrals become more useful, because happy early customers can point you toward similar buyers rather than random leads. The goal is not to build a big formal system yet. It is to document the early pattern well enough that each customer teaches you how to find the next one faster."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-654bd5af-2581-495e-ae0c-a85176b8583d.jpg?alt=media&token=6ee56d70-47a8-419d-8170-ead9c78eb84a"
-            alt="Turn early users into proof, referrals, and a repeatable motion"
-            caption="Turn early users into proof, referrals, and a repeatable motion"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Your next 30 days to get the first customers"}</h2>
-          <p>{"Pick one beachhead segment, describe the problem that group urgently wants solved, and turn that into one clear offer. Do not try to appeal to everyone at once. Early traction usually comes from a small group of people who strongly need the solution, not from a broad market that only finds it mildly useful. That focus makes your message easier to test and helps you learn faster from each conversation."}</p>
-          <p>{"Then spend your time on direct outreach and real customer conversations before you spread effort across bigger acquisition channels. The goal is not polished scale yet. The goal is to recruit a few early customers who can show you what is working, where your pitch is weak, and what proof future prospects need to see. If you do that well, you finish the month with more than a few customers."}</p>
-          <p>{"For your next test, write down whom you will approach, the question you want answered and the evidence that would make you continue, change direction or stop. Record non-responses and refusals alongside positive replies."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-72fcc631-5883-4b4a-b94c-1b56800267b7.jpg?alt=media&token=7308b531-24be-4b37-9f16-a4342a3bae74"
-            alt="Startup"
-            caption="Your next 30 days to get the first customers"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"Founder-led outreach is the most credible starting point for early traction. Direct conversations help test demand, refine the message, and uncover the proof future prospects need."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://stripe.com/guides/atlas/starting-sales", title: "Your first 10 customers", publisher: "stripe.com", description: "", category: "guide"},
-          {id: 2, href: "https://www.stoneandchalk.com.au/articles/how-to-get-your-first-startup-customers", title: "How to get your first startup customers | Stone & Chalk", publisher: "stoneandchalk.com.au", description: "", category: "guide"},
-          {id: 3, href: "https://www.creworklabs.com/blog/how-to-get-your-first-users-in-2025", title: "How to Get Your First Users in 2026 A Practical Guide for Early Stage Founders", publisher: "creworklabs.com", description: "", category: "guide"},
-          {id: 4, href: "https://www.linkedin.com/posts/jasoncalacanis_startups-founders-gotomarket-activity-7316618962618781696-rdQu", title: "How to land your first customer as a startup founder | Jason Calacanis posted on the topic | LinkedIn", publisher: "linkedin.com", description: "", category: "guide"},
-          {id: 5, href: "https://entrepreneur.nyu.edu/blog/2025/01/13/choosing-your-initial-target-customer/", title: "The Secret to Startup Success: How to Select the Right First Customers - NYU Entrepreneurship Choosing Your Initial Target Customer: A Beachhead Strategy", publisher: "entrepreneur.nyu.edu", description: "", category: "guide"},
-          {id: 6, href: "https://www.hubspot.com/startups/sales-and-marketing/customer-acquisition-for-startups/", title: "Customer Acquisition for Startups: Growth Tactics for the First 1000 Customers", publisher: "hubspot.com", description: "", category: "guide"},
-          {id: 7, href: "https://thedelta.io/blog/early-go-to-market-for-startups-how-to-get-your-first-2050-customers-without-wasting-time", title: "About The Delta \u00e2\u0080\u0094 Berlin's Startup Campus & Founder Launchpad", publisher: "thedelta.io", description: "", category: "guide"},
-          {id: 8, href: "https://www.cleanlist.ai/blog/2026-03-23-how-to-get-your-first-100-customers", title: "Get Your First 100 Customers (2026) | Cleanlist", publisher: "cleanlist.ai", description: "", category: "guide"},
-          {id: 9, href: "https://hivemediagroup.com.au/your-2026-marketing-kickstart-a-no-fluff-checklist-for-small-business-owners/", title: "Your 2026 Marketing Kickstart: A Practical Checklist for Small Business Owners", publisher: "hivemediagroup.com.au", description: "", category: "guide"},
-          {id: 10, href: "https://entrepreneurloop.com/how-to-get-first-100-customers-new-startup/", title: "How to Get First 100 Customers for Your New Startup", publisher: "entrepreneurloop.com", description: "", category: "guide"},
-          {id: 11, href: "https://whitekeymarketing.com.au/marketing-strategies-for-startups/", title: "Marketing Strategies For Growing Australian Startups", publisher: "whitekeymarketing.com.au", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Keep building your traction plan"
-            body="Use the go-to-market guide to narrow your segment, sharpen your offer, and turn early customer signals into a repeatable motion."
-            buttonText="Read the go-to-market guide"
-            buttonHref="/articles/featured/go-to-market-for-startups"
-          />
-        </div>
-      </div>
-
-        <AuthorBio author={authorDetails} />
-
-        <div className="mt-12">
-          <ArticleFAQ items={faqItems} />
-        </div>
-
-        <ArticleFooterNav backHref="/articles" topHref="#" />
-    </>
-  )
+      <h2 id="peer-next-step" className="scroll-mt-28">Discuss the question you still cannot answer</h2>
+      <p>Bring one anonymised offer and one unresolved customer question to an appropriate MLAI event. Read its topic, format and experience level first. Participate to learn and contribute; attendance is not a promise of leads, buyers or an individual sales review.</p>
+      <ArticleEventPreference articlePath={PATH} idPrefix="first-customer" description="Only your event-format preference travels to the calendar. Your interview notes and worksheet are not uploaded or attached. Check the actual listing; this does not book a place or arrange a customer interview or sales review." />
+      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
+      <p>After actual delivery, request permission for any public quote or case study and retain the context, baseline, measurement period and limits. Do not turn an illustrative pilot into “our customers saved” copy. If you need to organise actual company evidence for an update or content plan, <Link to="/founder-tools/start">Founder Tools</Link> is a supporting option—not a replacement for gathering evidence. Opening a workspace requires an account; your record is not automatically imported.</p>
+      <p><small>Sources checked 11 September 2026. The invitation, questions, worksheet and fictional scenario are editorial aids, not original interviews or endorsements by the source organisations. {CUSTOMER_REVIEW_STATUS} The stable article URL is retained; the advice does not depend on an unsupported claim that acquisition changed in 2026.</small></p>
+      <ArticleFAQ items={faqItems} />
+    </div>
+  </div>;
 }
```
