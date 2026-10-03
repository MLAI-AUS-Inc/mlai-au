# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-constitutes-a-startup-in-practice.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-constitutes-a-startup-in-practice.tsx
@@ -1,288 +1,70 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
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
-
-export const useCustomHeader = true
-
-const TOPIC = "What Constitutes a Startup in Practice"
-export const CATEGORY = "featured"
-export const SLUG = "what-constitutes-a-startup-in-practice"
-export const DATE_PUBLISHED = "2026-04-06"
-export const DATE_MODIFIED = "2026-04-06"
-export const DESCRIPTION = "What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-778189b4-82c7-4e6b-9b96-c21abeb867eb.jpg?alt=media&token=ffccdbe3-bf8b-46f0-8fa6-a8da9fae2a13"
-const HERO_IMAGE_ALT = "Startup founders discussing whether a new venture is built for scalable growth or steady small-business income"
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
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
+import { ArticleEventPreference } from "~/components/articles/ArticleEventPreference";
+import { STARTUP_MODEL_CASES, STARTUP_MODEL_FIELDS, STARTUP_MODEL_PROVENANCE, STARTUP_SETUP_SCENARIOS, compareSetupHours } from "~/lib/startup-model-evidence";
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "what-constitutes-a-startup-in-practice";
+export const DATE_PUBLISHED = "2026-04-06";
+export const DATE_MODIFIED = "2026-09-11";
+const TITLE = "What constitutes a startup? Examine the business, not the label";
+export const DESCRIPTION = "Distinguish startup ambition from a new small business using four fictional cases, setup-hour comparisons and a completed record with a printable decision sheet.";
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-778189b4-82c7-4e6b-9b96-c21abeb867eb.jpg?alt=media&token=ffccdbe3-bf8b-46f0-8fa6-a8da9fae2a13";
+export const articleMeta = {title:TITLE,topic:TITLE,category:CATEGORY,slug:SLUG,description:DESCRIPTION,datePublished:DATE_PUBLISHED,dateModified:DATE_MODIFIED,author:"Dr Sam Donegan",image:HERO,imageAlt:"Two people looking at a laptop, with an open notebook"};
+export const summaryHighlights = {heading:"New, small and startup describe different things",intro:"A useful working distinction is whether a venture is designed for rapid growth through a repeatable offering. That ambition is not proof it can achieve it.",items:[
+ {label:"State your meaning",description:"A startup label can describe an ambition, not a verified growth record."},
+ {label:"Examine the constraint",description:"Ask what must increase to serve another customer: founder hours, staff, infrastructure or a repeatable product."},
+ {label:"Keep uncertainty visible",description:"An idea, a trial, revenue and repeat purchases are different kinds of evidence."},
+]};
+export const faqItems = [
+ {id:1,question:"Does using AI make a business a startup?",answer:"No. AI can support an established business, a service business or a product experiment. Examine the offering, customers and delivery model rather than the technology label."},
+ {id:2,question:"Must a startup raise venture capital?",answer:"Not under the growth-oriented definition discussed here. Funding is a financing choice, not proof that customers want the product or that delivery is repeatable."},
+ {id:3,question:"Is a small business less worthwhile?",answer:"No. A sustainable service or local business may fit its owner's goals better than a rapid-growth venture. This distinction is not a ranking of social value or business quality."},
+];
+export default function ArticleContent() {
+ return <div data-cf-article-body>
+  <ArticleHeroHeader breadcrumbs={[{label:"Home",href:"/",icon:Home},{label:"Articles",href:"/articles"},{label:TITLE,current:true}]} title={TITLE} titleHighlight="not the label" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+  <div className="prose prose-lg prose-slate max-w-none">
+   <p>If you are exploring Australia's startup community, it helps to know what someone means when they call a venture a startup. “Recently opened”, “uses AI” and “has investors” answer different questions. None tells you on its own how the business reaches customers or fulfils its promise.</p>
+   <ArticleTocPlaceholder />
+   <h2 id="definition" className="scroll-mt-28">A working definition, not a universal certification</h2>
+   <p>In his September 2012 essay <a href="https://paulgraham.com/growth.html">Startup = Growth</a>, Paul Graham uses a growth-oriented definition: the company is designed to grow quickly. He distinguishes that intention from merely being new, and does not make technology or venture funding necessary conditions. This is an influential practitioner's framing, not a legal classification, universal age limit or guarantee of success.</p>
+   <p>Steve Blank's <a href="https://steveblank.com/2010/01/25/whats-a-startup-first-principles/">What’s A Startup? First Principles.</a>, published 25 January 2010, instead foregrounds the search for a business model that can be repeated and scaled. It helps distinguish testing a model from executing one already understood. These are related practitioner perspectives, not identical definitions or a certification process.</p>
+   <p>For this discussion, ask whether the venture is trying to develop an offering it can sell and deliver repeatedly to a large enough market for its ambitions. “Trying” matters: it may still be discovering who wants the product. An early venture can have startup intent without yet having evidence of repeatable demand.</p>
+   <h2 id="examples" className="scroll-mt-28">Four fictional examples show the distinction</h2>
+   <p><strong>{STARTUP_MODEL_PROVENANCE}</strong> These are not MLAI companies, investment assessments or reported outcomes. A case's interpretation applies to its stated plan, not permanently to that industry.</p>
+   <dl className="space-y-7">{STARTUP_MODEL_CASES.map(item => <div key={item.id} data-startup-case={item.id}><dt className="font-bold">{item.id}: {item.venture}</dt><dd className="ml-0"><p><strong>Scenario:</strong> {item.facts}</p><p><strong>Interpretation:</strong> {item.interpretation}</p><p><strong>Next question or action:</strong> {item.next}</p></dd></div>)}</dl>
+   <p>Models can change. A consultancy might develop a product from recurring problems, while a product team might discover that customers need substantial services. Describe the current evidence instead of forcing a permanent label.</p>
+   <p>If you want to explore these distinctions with other people, take the question “What is still custom for each customer?” to a relevant <a href="#conversation">MLAI learning event</a>. You do not need to be raising money or seeking contract work to join a startup discussion.</p>
+   <h2 id="repeatability" className="scroll-mt-28">Inspect the setup assumptions, not just the smaller total</h2>
+   <p>For F2, compare the same proposed task: setting up a quote-drafting workflow for each assumed client. Neither option includes automatically sending quotes. <strong>Illustrative arithmetic:</strong> five bespoke setups at 20 hours each require 100 delivery hours in the plan. A common setup of 40 hours plus 4 per client gives 60 hours. Neither figure is a measured result.</p>
+   <p>The table exposes two ways that proposed advantage can disappear. On a small screen, scroll it sideways; keyboard users can focus the table region and use arrow keys. The editable download contains the same calculations in plain text.</p>
+   <div role="region" aria-label="Proposed setup-hour comparison" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[40rem]"><caption>Fictional setup estimates in hours; positive difference means fewer proposed shared hours</caption><thead><tr><th scope="col">Assumption</th><th scope="col">Clients</th><th scope="col">Bespoke per client</th><th scope="col">Common setup</th><th scope="col">Shared per client</th><th scope="col">Bespoke total</th><th scope="col">Shared total</th><th scope="col">Difference</th></tr></thead><tbody>{STARTUP_SETUP_SCENARIOS.map(row => { const total = compareSetupHours(row); return <tr key={row.label} data-startup-scenario={row.label}><th scope="row">{row.label}</th><td>{row.clients}</td><td>{row.bespokeHoursPerClient}</td><td>{row.commonHours}</td><td>{row.sharedHoursPerClient}</td><td>{total.bespoke}</td><td>{total.shared}</td><td>{total.difference}</td></tr>; })}</tbody></table></div>
+   <p>With only one setup, the shared route takes 44 rather than 20 hours. With 80 common hours and 8 per client, five shared setups take 120 rather than 100 hours. Those are alternative assumptions, not follow-up test results. At the original rates, 40 + 4n becomes less than 20n only above 2.5 setups: three whole setups. This is an arithmetic threshold, not evidence that three customers exist or that a product is profitable.</p>
+   <p><strong>The missing work matters:</strong> sales, support, maintenance, security and infrastructure remain unestimated, not zero. A different accounting integration or approval requirement could make the proposed tasks incomparable. Lower estimated setup effort alone does not prove demand, safe delivery or a scalable business. The example is not a margin forecast, cash-savings claim or recommendation to change business models.</p>
+   <h2 id="evidence" className="scroll-mt-28">Keep an evidence record, not a startup score</h2>
+   <p><a href="/downloads/startup-model-decision-sheet.pdf" download="startup-model-decision-sheet.pdf">Download the one-page printable decision sheet</a> for handwriting, or <a href="/downloads/startup-model-evidence.txt" download="startup-model-evidence.txt">download the editable record and completed example</a>. Both are real files with no signup. The PDF is a blank print sheet, not a fillable form; the text file includes all four cases, three calculations and the completed eight-field F2 record.</p>
+   <nav aria-label="Startup model record sections"><ul className="flex list-none flex-wrap gap-x-6 gap-y-2 pl-0"><li><a href="#completed-record">Completed record</a></li><li><a href="#eligibility">Programme boundaries</a></li><li><a href="#conversation">Discuss one question</a></li></ul></nav>
+   <pre className="whitespace-pre-wrap" aria-label="Startup model evidence record">{STARTUP_MODEL_FIELDS.map((field, index) => `${index + 1}. ${field.label}`).join("\n")}</pre>
+   <details className="my-6 rounded-xl border border-gray-300 p-4"><summary id="completed-record" className="cursor-pointer font-semibold scroll-mt-28">Completed eight-field record: F2's product hypothesis</summary><dl className="space-y-5">{STARTUP_MODEL_FIELDS.map((field, index) => <div key={field.label} data-startup-field={index + 1}><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl></details>
+   <p>The contradictory request changes the next step: investigate differences before repeating a scalability claim. It does not prove the product idea has failed. Replace fiction with permission-cleared notes when you have them, keep unknowns explicit, and revisit the interpretation when the offering changes.</p>
+   <h2 id="eligibility" className="scroll-mt-28">A programme decides eligibility under its own rules</h2>
+   <p>Do not add the eight answers into an invented eligibility score. As a dated example, the Australian Government's <a href="https://business.gov.au/grants-and-programs/industry-growth-program">Industry Growth Program page</a>, checked 11 September 2026, says the programme is paused to new applications. Its published Advisory Service rules include entity requirements, turnover conditions and an eligible commercialisation or growth project in specified priority areas. Calling F2 a startup would not establish any of those facts.</p>
+   <p>The same page distinguishes an Advisory Service report from eligibility for a grant and from a successful merit assessment. This is an example of why the actual programme and applicant matter, not a recommendation to apply or a full eligibility checklist. Check the current official rules and application status before acting; an accelerator, grant and tax scheme are different decisions. Seek appropriate professional advice for legal or tax questions.</p>
+   <h2 id="conversation" className="scroll-mt-28">Turn the definition into a useful conversation</h2>
+   <p>At an event, “What have you learned about who uses this?” usually invites more substance than “Are you a real startup?” Share your own uncertainty and ask before giving advice. A person who wants a steady small business does not need to adopt a venture-growth ambition to belong in a discussion about AI.</p>
+   <p>Bring one question from the record to an MLAI event whose topic and experience level fit. Attendance does not promise investors, cofounders or customers. If you are already testing an idea, the <Link to="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026">first-customer conversation guide</Link> helps distinguish interest from stronger evidence.</p>
+   <ArticleEventPreference articlePath={"/articles/" + CATEGORY + "/" + SLUG} idPrefix="startup-model" description="Choose a preferred MLAI event format. This does not upload your business record, assess eligibility, book advice or reserve a pitch slot." />
+   <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + CATEGORY + "/" + SLUG].conversion!} events={[]} placement="article-inline" />
+   <h2 id="sources" className="scroll-mt-28">Sources and limits of this exercise</h2>
+   <p>The linked Graham, Blank and Industry Growth Program pages were checked on 11 September 2026. The first two are historical practitioner definitions; the programme page supplies a specific administrative counterexample, not a universal meaning of startup. The cases, comparisons and worksheet are MLAI editorial teaching material, not research findings or third-party certification.</p>
+   <p>This revision adds a completed example and working downloads while preserving the original publication date. Independent founder and source review remain outstanding. No customer validation, legal classification, programme admission or event outcome has been established by this exercise.</p>
+  </div>
+  <ArticleFAQ items={faqItems} />
+ </div>;
 }
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: "What qualifies as a startup business?", answer: "A startup business is usually a new venture trying to find, test, and validate a scalable business model. It is typically marked by uncertainty, growth ambition, and a model designed to expand beyond the founder's direct labour." },
-  { id: 2, question: "Is every new business a startup?", answer: "No. A business can be new, profitable, and well run without being a startup if it is built for steady owner-led income or a limited local market rather than scalable growth." },
-  { id: 3, question: "How is a startup different from a small business?", answer: "The main difference is growth logic. Startups usually aim to prove a repeatable model that can scale quickly, while small businesses often focus on dependable revenue, controlled operations, and sustainable local demand." },
-  { id: 4, question: "Do startups always need investors?", answer: "No. External funding is common because startups often spend early on validation, users, and systems, but raising capital is not required for a business to fit the startup pattern." },
-  { id: 5, question: "Does a startup have to be a tech company?", answer: "No. Tech-enabled businesses are often associated with startups because software can support repeatable scale, but the defining issue is the growth model, not the industry." },
-  { id: 6, question: "Is there one official definition of a startup in Australia?", answer: "No single government definition is used in every context in Australia. Founders, investors, media, and policymakers may use the term differently, which is why practical traits matter more than labels alone." },
-]
-
-export const summaryHighlights = {
-  heading: "Key facts: What Constitutes a Startup in Practice",
-  intro: "What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses.",
-  items: [
-    { label: "What is the 50-100-500 rule startup?", description: "This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead." },
-    { label: "What are the 4 P's of startup?", description: "There is no single four-part framework used across all startup definitions in the source material. A practical reading is product-market uncertainty, scalable model, repeatable growth, and founder intent to expand." },
-    { label: "What are the 5 key elements of a startup?", description: "The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses." },
-  ],
-}
-
-export const articleMeta = {
-  title: "What Constitutes a Startup in Practice",
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
-  { question: "What is the 50-100-500 rule startup?", answer: "This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead." },
-  { question: "What are the 4 P's of startup?", answer: "There is no single four-part framework used across all startup definitions in the source material. A practical reading is product-market uncertainty, scalable model, repeatable growth, and founder intent to expand." },
-  { question: "What are the 5 key elements of a startup?", answer: "The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses." },
-  { question: "What qualifies as a startup business?", answer: "A startup business is usually a new venture trying to find, test, and validate a scalable business model. It is typically marked by uncertainty, growth ambition, and a model designed to expand beyond the founder's direct labour." },
-  { question: "Is every new business a startup?", answer: "No. A business can be new, profitable, and well run without being a startup if it is built for steady owner-led income or a limited local market rather than scalable growth." },
-  { question: "How is a startup different from a small business?", answer: "The main difference is growth logic. Startups usually aim to prove a repeatable model that can scale quickly, while small businesses often focus on dependable revenue, controlled operations, and sustainable local demand." },
-  { question: "Do startups always need investors?", answer: "No. External funding is common because startups often spend early on validation, users, and systems, but raising capital is not required for a business to fit the startup pattern." },
-  { question: "Does a startup have to be a tech company?", answer: "No. Tech-enabled businesses are often associated with startups because software can support repeatable scale, but the defining issue is the growth model, not the industry." },
-  { question: "Is there one official definition of a startup in Australia?", answer: "No single government definition is used in every context in Australia. Founders, investors, media, and policymakers may use the term differently, which is why practical traits matter more than labels alone." },
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
-
-export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
-  return (
-    <>
-
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
-
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"A startup is usually understood as a new company or project that is trying to find, test, and validate a scalable business model. The key idea is not simply that the business is new. It is that the founders are working in conditions of uncertainty and are aiming to build something that can grow beyond a single owner or a small local operation. In that sense, a startup is defined as much by its growth path and search process as by its age."}</p>
-        <p>{"That is also why not every new business is a startup. A new caf\u00e9, consultancy, or trades business can be a strong business without fitting the usual startup label if it is built for steady owner-led income rather than repeatable scale. In Australia, the term is also debated because there is no single government definition used in every context. Different people use the word differently, including founders, investors, media, and policymakers, so the practical meaning often depends on who is speaking and why."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="What constitutes a startup? Learn the practical traits that usually define one, including scalability, uncertainty, growth intent, and how startups differ from small businesses."
-          width={1600}
-          height={1067}
-        />
-
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
-
-        <QuoteBlock title="Key insight" variant="purple">
-          {"This article does not use a universal 50-100-500 rule because startup definitions vary by source. The grounded test here focuses on scalability, uncertainty, repeatability, and growth intent instead."}
-        </QuoteBlock>
-          <h2>{"The core traits that usually make a business a startup"}</h2>
-          <p>{"The most consistent trait in startup definitions is scalability. A startup is usually built to find and prove a business model that can grow well beyond the founder or a single local operation. It means the business is designed with expansion in mind from the start. In the sources, this is the clearest line between a startup and a typical small business, which may be profitable and new but is not necessarily built for rapid or wide growth."}</p>
-          <p>{"Another core trait is uncertainty. A startup is still working out product, market, and model fit, so experimentation is part of the business rather than a side issue. Early-stage startups are trying to validate what customers want, how the company will deliver it, and whether the economics can work at scale. This is why startups are often described as high-risk: they are not just operating a known formula, they are testing one."}</p>
-          <p>{"Repeatability also matters. A startup usually aims to grow through systems, software, or processes that can be used again and again without hiring in a strictly one-to-one way for every new customer. That is why tech-enabled businesses are often associated with startups in practice. The point is not that every startup must be a software company, but that the model is meant to expand more efficiently than a business that depends mainly on the owner's time."}</p>
-          <p>{"Founder intent helps complete the picture. If the goal is to build a stable business that supports the owner and stays at a manageable size, that is often better described as a small business. If the goal is to build something that can expand significantly, reach a larger market, and grow beyond the founder's direct labour, it fits the startup pattern more closely. Put simply, what constitutes a startup is usually a mix of ambition, uncertainty, and a model designed to scale."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ca205a72-ff9f-4356-9dc1-f06cd9953e0d.jpg?alt=media&token=80e3fa5c-c5fc-4534-af0c-3a9092638f4c"
-            alt="The core traits that usually make a business a startup"
-            caption="The core traits that usually make a business a startup"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Startup versus small business"}</h2>
-          <p>{"A small business can be new, profitable, and professionally run without being a startup. The key difference is not age or effort. It is the kind of business model the founders are trying to build. A startup is usually aimed at finding and proving a model that can scale well beyond the founder or a single local market, while a small business is often built to deliver a dependable product or service within a more manageable operating scope."}</p>
-          <p>{"That means the word startup should not be used as a synonym for any new business. A new cafe, consultancy, trade service, or local shop may be an excellent business, but that does not automatically make it a startup. Sources describing startups consistently centre on scalable growth and high uncertainty. By contrast, small business guidance tends to focus on practical setup, day-to-day operations, and steady income."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-63a7bff6-1c5f-4057-b07b-508d4a869d64.jpg?alt=media&token=eeaeaf47-f75c-4ec6-8b5a-a05184c2f921"
-            alt="Startup versus small business"
-            caption="Startup versus small business"
-            width={1200}
-            height={800}
-          />
-          <h3>{"Different growth logic"}</h3>
-          <p>{"Startups usually optimise for rapid growth. They are trying to build systems, products, or processes that can expand quickly if the model works. Source material on startup definitions and startup-versus-small-business comparisons both point to scalability as a core idea."}</p>
-          <p>{"Small businesses often optimise for something different: dependable revenue, controlled costs, and sustainable operations. Their growth may still be healthy, but it is usually more gradual and tied to the limits of staff time, service capacity, location, or local demand. That does not make them less valuable. It just reflects a different business goal."}</p>
-          <h3>{"Different funding patterns"}</h3>
-          <p>{"Funding usually follows that growth logic. Because startups often want to move faster and capture a larger market, they are more likely to look for external capital to accelerate expansion. The higher uncertainty of a startup model also fits with the idea that founders are still validating how the business will scale."}</p>
-          <p>{"Small businesses are more likely to rely on owner investment, loans, or cash generated by the business itself. So when deciding whether a venture is a startup, it helps to ask: is the business mainly designed to operate well and earn reliably, or is it designed to prove a scalable model and grow far beyond its initial size?"}</p>
-
-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Are you still testing and validating a scalable business model?",
-            "Is growth meant to extend beyond the founder's direct labour or one local market?",
-            "Is uncertainty about product-market fit still a core part of the business?",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Why growth, funding, and risk change the definition"}</h2>
-          <p>{"Growth changes the definition because startups are usually built around a business model that can scale, not just provide a steady income for the owner. The core idea is not simply to open a new business, but to find, test, and validate a model that can grow well beyond the founding team. That is why startup discussions often focus on speed, repeatability, and the ability to reach a much larger market. By contrast, a traditional small business may aim for stable demand in a local or limited market, without needing to expand quickly. This difference in ambition matters in practice, because it shapes hiring, product decisions, and how success is measured in the early stage."}</p>
-          <p>{"That growth goal also brings more uncertainty and more risk. Early-stage startups are still proving that customers want the product, that the business model works, and that growth can continue without breaking the system. Sources on startup characteristics repeatedly link this stage to significant uncertainty and high failure rates. Funding fits into that picture. Because many startups try to build quickly, acquire users, and put systems in place before profits are reliable, external capital is common. This does not mean every startup raises investment, but it helps explain why investors, accelerators, and startup programs treat startups differently from ordinary business formation. In short, faster growth, higher uncertainty, and more frequent use of outside funding are practical signals that a company is operating like a startup rather than just being a newly registered business."}</p>
-          <h2>{"A simple test founders can use"}</h2>
-          <p>{"A practical way to test the label is to ask what kind of business you are actually building. A startup is usually still searching for, developing, or validating a scalable business model, not just opening for trade and serving a steady local customer base. That means uncertainty is still central: the team is working out product-market fit, testing whether demand is real, and seeing if the model can grow beyond the founder. This also helps explain why people disagree on definitions. Even in Australia, there is no single official definition used in every context, so scalability and uncertainty are more useful tests than hype or branding."}</p>
-          <p>{"The next question is whether the business is designed to grow materially beyond the founder's direct labour or one market. If the model depends mainly on the owner doing the work, or aims for stable owner-managed income, it may be a good new business without being a startup. If the venture is making choices for faster expansion instead, such as planning for scale, raising capital for growth, or building systems that can support a much larger customer base, the startup label fits more closely. A simple rule of thumb is this: if most answers on scalability, growth intent, and product-market uncertainty are no, call it a new business rather than forcing the startup label."}</p>
-          <p>{"That distinction matters because the path is different. A general new business still needs planning, registration, finance, and customers, but it may not need the same growth model or investor mindset often associated with startups. Founders can use the test to choose clearer expectations early, instead of measuring themselves against startup mythology that may not match the business they actually want to build."}</p>
-          <ul>
-            <li>{"Are you still testing and validating a scalable business model?"}</li>
-            <li>{"Is growth meant to extend beyond the founder's direct labour or one local market?"}</li>
-            <li>{"Is uncertainty about product-market fit still a core part of the business?"}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-fa01e49e-522f-45c4-8bce-b9e65feab0f0.jpg?alt=media&token=cd26c6d4-072c-4379-9e68-eac4fb034cb6"
-            alt="A simple test founders can use"
-            caption="A simple test founders can use"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Use the label carefully and focus on the business model"}</h2>
-          <p>{"So, what constitutes a startup? The clearest answer is that it is not just a new business. A startup is usually a venture trying to find, prove, and grow a scalable business model while working through real uncertainty. That is why the label fits some young companies and not others. A local business using a proven model can still be an excellent business, but it is usually solving a different problem from a startup built for faster scaling, outside capital, or a broader market."}</p>
-          <p>{"In practice, founders should use the word startup only when it helps them make better decisions. Ask a simple question: are you still validating a repeatable path to growth, or are you already operating a model that is well understood? That distinction can shape how you think about funding, hiring, risk, and growth expectations. The goal is to be honest about the kind of business you are building, so your strategy matches the reality of the venture."}</p>
-          <ul>
-            <li>{"New alone does not make a business a startup."}</li>
-            <li>{"A startup is typically built around scalable growth and uncertainty."}</li>
-            <li>{"A practical test is whether the venture is still validating a repeatable growth model."}</li>
-            <li>{"Use the label when it clarifies strategy, funding needs, and operating assumptions."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7b06e8b2-f838-4619-92dd-c5b098f77431.jpg?alt=media&token=42f21f2a-f90c-4dd0-92e0-df83ec794921"
-            alt="Use the label carefully and focus on the business model"
-            caption="Use the label carefully and focus on the business model"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"The article points to five recurring elements: scalability, uncertainty, repeatability, growth ambition, and operating choices made for expansion. These traits help separate startups from ordinary new or small businesses."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://en.wikipedia.org/wiki/Startup_company", title: "Startup company - Wikipedia", publisher: "en.wikipedia.org", description: "", category: "guide"},
-          {id: 2, href: "https://legalvision.com.au/3-differences-between-a-startup-and-small-business/", title: "3 Differences Between a Startup and Small Business", publisher: "legalvision.com.au", description: "", category: "guide"},
-          {id: 3, href: "https://www.liveplan.com/blog/managing/startup-growth-strategies?srsltid=AfmBOopeWKUrJugs7O8AtJxFAleifVMdInqE2iLHB-imsBYTKKuEbjJ7", title: "6 Tried and True Startup Growth Strategies | LivePlan", publisher: "liveplan.com", description: "", category: "guide"},
-          {id: 4, href: "https://www.fundable.com/learn/resources/guides/startup", title: "Startup Guide - Everything you need to know to start and grow", publisher: "fundable.com", description: "", category: "guide"},
-          {id: 5, href: "https://enosta.com/insights/how-to-structure-a-startup-in-australia", title: "How to Structure a Startup in Australia: A Practical Guide for Founders | Enosta", publisher: "enosta.com", description: "", category: "guide"},
-          {id: 6, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "", category: "guide"},
-          {id: 7, href: "https://www.smartcompany.com.au/startupsmart/definition-startup/", title: "When is a startup not a startup, and why can't we agree? - SmartCompany", publisher: "smartcompany.com.au", description: "", category: "guide"},
-          {id: 8, href: "https://eu.36kr.com/en/p/3488461729864581", title: "Startup Strategy Guide: Answering Two Questions, Exploring Four Paths", publisher: "eu.36kr.com", description: "", category: "guide"},
-          {id: 9, href: "https://stripe.com/au/resources/more/strategy-for-startups-a-guide-to-creating-a-winning-business-plan", title: "Strategy for startups: Creating a winning startup strategy | Stripe", publisher: "stripe.com", description: "", category: "guide"},
-          {id: 10, href: "https://www.jpmorgan.com/insights/business-planning/10-step-guide-to-starting-your-startup-business", title: "10-Step Guide to Starting Your Startup Business", publisher: "jpmorgan.com", description: "", category: "guide"},
-          {id: 11, href: "https://www.smallbusiness.nsw.gov.au/help/common-questions/the-basics-of-starting-a-business", title: "The basics of starting a business | NSW Small Business Commissioner", publisher: "smallbusiness.nsw.gov.au", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Need a clearer way to assess your venture?"
-            body="Use the startup test in this article to check whether your idea is built for scalable growth, still facing product-market uncertainty, or better described as a small business."
-            buttonText="Explore founder resources"
-            buttonHref="/articles"
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
-}
```
