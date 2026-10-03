# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-vcs-value-startups.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-vcs-value-startups.tsx
@@ -7,28 +7,24 @@
 import type { ReactNode } from 'react'
 import { Link } from 'react-router'
 import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'

 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '../../../components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '../../seo-config'
 import AuthorBio from '../../../components/AuthorBio'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
 import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
+import OptionPoolComparison from '../../../components/articles/OptionPoolComparison'
 import { ArticleCallout } from '../../../components/articles/ArticleCallout'
-import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
 import { ArticleReferences } from '../../../components/articles/ArticleReferences'
 import { getDefaultArticleAuthorDetails } from '../../authors'

 /** ========== INPUTS (replace all placeholders) ========== */
 export const useCustomHeader = true

-const TOPIC = 'How VCs value startups'
-const CATEGORY = 'australian-ai-ecosystem'
+const TOPIC = 'How VCs value startups: check price, dilution and option pools'
+const CATEGORY = 'featured'
 const SLUG = 'how-vcs-value-startups'
 const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
 const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
@@ -38,10 +34,10 @@
   AUTHOR_PROFILE.avatarUrl ??
   'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
 const DATE_PUBLISHED = '2026-01-22'
-const DATE_MODIFIED = '2026-01-22'
-const DESCRIPTION = 'How venture capital investors value startups in 2026: methods, metrics, and term‑sheet mechanics with context for Australian founders and AI teams.'
+const DATE_MODIFIED = '2026-09-10'
+const DESCRIPTION = 'Prepare a startup valuation discussion: compare evidence, work through share dilution and test how option-pool timing changes an illustrative funding round.'
 const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-aab7aebb-f326-4ee4-b06c-48702edb6ddf.jpg?alt=media&token=fc7e98eb-7918-4997-a2e0-26a4964b64e6"
-const HERO_IMAGE_ALT = 'Founders reviewing a cap table and metrics on paper and laptop'
+const HERO_IMAGE_ALT = 'Laptop displaying charts beside a calculator, printed graphs and a white robotic head.'
 const FEATURED_FOCUS = 'funding'

 /** ===== FAQ ===== */
@@ -56,67 +52,73 @@
     id: 1,
     question: 'What multiples do VCs use to value startups?',
     answer:
-      'There is no single number. Investors triangulate comparable rounds and public comps, revenue quality (recurring vs services), growth and retention, gross margin, and capital efficiency (e.g., burn multiple). Ranges vary by sector and market conditions in Australia (as at 2026).'
+      'This guide does not establish a current market multiple. A comparison needs a date, currency, business model, revenue definition and financing terms; a fundraising headline alone is insufficient.'
   },
   {
     id: 2,
     question: 'How are pre‑revenue startups valued?',
     answer: (
       <>
-        Many use scorecard or Berkus‑style approaches that weight team, market size, product progress, defensibility, and early signals (waitlists, pilots). They anchor to recent seed rounds for similar companies, then adjust for risk.
+        Without revenue, do not invent a revenue multiple. Separate observed product and customer evidence from assumptions about adoption, costs and exits. A qualitative checklist can organise the discussion but does not establish a transaction price.
       </>
     )
   },
   {
     id: 3,
-    question: 'What is the VC method in simple terms?',
-    answer:
-      'Investors work backwards from an expected exit value and target ownership, discount by risk and dilution, and derive a price that meets return goals (e.g., fund‑level targets).'
+    question: 'Does this calculator tell me what my startup is worth?',
+    answer:
+      'No. It takes an assumed pre-money value and new investment as inputs, then compares three simplified allocations. It provides no current market multiple, recommended pool size, minimum acceptable price or investment opinion.'
   },
   {
     id: 4,
     question: 'Pre‑money vs post‑money: what is the difference?',
     answer:
-      'Post‑money = pre‑money + new cash invested. Ownership sold = new cash ÷ post‑money. Some term sheets require an option pool increase “pre‑money”, which effectively reduces the founders’ stake at the headline price.'
+      'In the simplified primary-share example, post-money equals pre-money plus new investment. The option-pool comparison adds one explicit reserve assumption; existing options, convertibles, secondary sales and different rights still require a transaction-specific cap table.'
   },
   {
     id: 5,
     question: 'Do SAFEs or convertible notes set valuation?',
     answer:
-      'They defer valuation to a priced round. A valuation cap and/or discount sets the conversion price later. Be clear whether a SAFE is pre‑money or post‑money; the latter makes dilution easier to model.'
+      'A SAFE cap is a contractual conversion input, not an independent valuation. YC offers cap-only, discount-only and uncapped MFN forms. Its SAFE has no interest or maturity date; a convertible note is debt with its own terms. Check the actual document and conversion triggers with a qualified adviser.'
   },
   {
     id: 6,
     question: 'How do VCs treat AI‑specific factors (models, data, compute)?',
     answer:
-      'Investors test whether you have durable advantage (data rights, distribution, workflow lock‑in), sustainable unit economics at inference scale, and a path to margin improvement (e.g., finetuning, batching, caching). “Model novelty” alone is rarely enough.'
+      'Prepare evidence of data permissions, customer use, delivery costs and technical dependencies. Measure any claimed cost reduction under the actual workload, including review and failures. This guide establishes no valuation premium for AI.'
   },
   {
     id: 7,
     question: 'Are Australian valuation norms different from the US?',
     answer:
-      'Often, yes. Round sizes and prices can be more conservative, and capital efficiency is scrutinised. Global comps still matter, but Australian investors weigh local traction and runway discipline heavily (as at 2026).'
+      'This guide has no matched transaction dataset establishing an Australian discount or premium. Check stage, date, currency, business model and financing terms before using an overseas comparison.'
   }
 ]

 export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
+  heading: 'Price, evidence and dilution',
   intro:
-    "Understand the assumptions behind a valuation, how funding changes ownership and why a negotiated price is different from cash available to the business.",
+    "For founders preparing a valuation discussion: separate the evidence for a business from the assumptions used to price a funding round.",
   items: [
     {
       label: 'How do VCs value pre‑revenue startups?',
-      description: 'Scorecard/Berkus‑style factors (team, market, product progress) and comparable seed rounds; no single formula.'
+      description: 'Separate observed customer and product evidence from assumptions; a checklist is not a market price.'
     },
     {
-      label: 'What multiples do VCs use in 2026 (Australia)?',
-      description: 'Sector‑dependent. SaaS often uses ARR multiples adjusted for growth, retention, margin, and efficiency; check local reports.'
+      label: 'Can I use another startup’s announced valuation?',
+      description: 'Document the comparison’s date, currency, business model, revenue definition and terms; this guide supplies no market multiple.'
     },
     {
       label: 'Do term‑sheet terms change valuation?',
-      description: 'Yes. Option pool expansions, liquidation preferences, and anti‑dilution can materially change effective price and ownership.'
+      description: 'The worked pool comparison changes the allocation despite identical headline funding amounts. Ownership percentages also differ from voting rights and exit proceeds.'
     }
   ]
+}
+
+export const articleMeta = {
+  title: TOPIC, topic: TOPIC, category: CATEGORY, slug: SLUG,
+  description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
+  author: AUTHOR, image: HERO_IMAGE, imageAlt: HERO_IMAGE_ALT,
 }

 export default function ArticlePage() {
@@ -137,7 +139,7 @@
     <div className='bg-white'>
       <ArticleHeroHeader
         breadcrumbs={breadcrumbs}
-        title={`${TOPIC} (2026)`}
+        title={TOPIC}
         titleHighlight={TOPIC}
         headerBgColor='purple'
         summary={summaryHighlights}
@@ -150,210 +152,134 @@
           <ArticleTocPlaceholder />
         </div>

-        <div className='prose prose-lg prose-indigo max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]'>
-          <p>
-            <strong>{TOPIC}</strong> — If you are preparing a round in Australia, valuation is best understood as ownership math anchored by risk and traction. This guide covers the methods investors use in 2026, the metrics that move your multiple, and the term‑sheet mechanics that change the effective price. For broader context on local trends, browse <Link to='/articles' className='underline underline-offset-4'>our articles</Link>.
-          </p>
-
-          <ArticleImageBlock
-            src={HERO_IMAGE}
-            alt={HERO_IMAGE_ALT}
-            width={1200}
-            height={630}
-            containerClassName='my-10'
-          />
-
-          <h2>Valuation is ownership math, not an abstract number</h2>
-          <p>
-            Investors almost always start from target ownership and a risk‑adjusted view of outcomes. Post‑money equals pre‑money plus new capital; ownership sold equals new capital divided by post‑money. Pool expansions and preferences change the <em>effective</em> price you are accepting. Model valuation as a range, then check whether the round delivers enough runway and leaves founders with sufficient ownership for later stages.
-          </p>
-
+        <div className='prose prose-lg prose-indigo prose-headings:scroll-mt-24 max-w-3xl px-4 py-10 sm:px-6 lg:px-8 text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]'>
+          <p>
+            For Australian founders preparing an educational funding discussion, separate a negotiated price from evidence about the business. Use the share-count example and discussion record below to identify assumptions and questions for an adviser. This is not a current valuation benchmark, legal advice or a recommendation to raise capital.
+          </p>
+
+          <p>This guide focuses on translating price into share allocation. For the earlier question of whether venture funding fits a business, use the <Link to="/articles/featured/venture-capital-how-does-it-work">venture-capital introduction</Link>; for how a fund is organised, use the <Link to="/articles/featured/how-does-a-venture-capital-firm-work">VC firm guide</Link>.</p>
+
+          <h2>Start with the price-to-share calculation</h2>
+          <p>
+            For a simple primary-share issue, the negotiated price determines how many new shares an investment buys. The example below states the assumptions needed for pre/post-money arithmetic. A real transaction can include other instruments and rights; review fully diluted ownership and distribution scenarios separately.
+          </p>


           <ArticleCallout
-            title='Quick definitions VCs assume you know'
+            title='Definitions for the simplified example'
             variant='brand'
             icon={<span className='text-xl'>💡</span>}
           >
             <ul className='m-0 pl-5 list-disc'>
               <li>Pre‑money: company value <em>before</em> new cash.</li>
               <li>Post‑money: pre‑money plus new cash (basis for ownership).</li>
-              <li>Option pool shuffle: increasing ESOP pre‑money dilutes founders, not new investors.</li>
-              <li>Liquidation preference: investors get their money back first; participation terms can materially alter outcomes.</li>
+              <li>Option pool: check who bears dilution when an increase is included in pre-money capitalisation; existing holders can include more than founders.</li>
+              <li>Liquidation preference: contractual priority can affect distributions, but it does not guarantee repayment; available proceeds and the actual terms matter.</li>
             </ul>
           </ArticleCallout>

-          <h2>The methods investors actually use</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f8f462e1-6a49-41eb-be0c-b37af381e970.jpg?alt=media&token=a20b6cfd-fb9d-4f79-beb0-58b6fb53c899" alt="Team collaborating in a retro tech startup, showcasing 90s film aesthetics and innovative investment strategies." className="w-full rounded-lg my-8" />
-
-          <p>
-            No single model decides the price. Most rounds are triangulated across comparables, a VC‑method back‑solve, and qualitative risk adjustments. Here is how each lens is applied.
+          <h2>Valuation lenses and their assumptions</h2>
+
+          <p>
+            A proposed price needs an explanation you can inspect. Start by separating comparable transaction evidence from untested assumptions about the business. This guide does not establish which method a particular investor uses or the price your company should accept.
           </p>

           <h3>Comparable rounds and revenue multiples</h3>
           <p>
-            For revenue‑stage companies—especially SaaS—investors benchmark against private rounds and public peers. They normalise for growth rate, net revenue retention, gross margin, and revenue quality (recurring vs services). Australian deals track global sentiment but typically give extra weight to capital efficiency.
-          </p>
-
-          <h3>The VC method (target ownership and return math)</h3>
-          <p>
-            Funds back‑solve from plausible exits within their time horizon. They apply a target ownership percentage, consider dilution in future rounds, and ensure the entry price supports fund return goals. If the numbers do not work under conservative assumptions, price is revised—or the deal is passed.
-          </p>
-
-          <h3>Scorecard and Berkus for pre‑revenue</h3>
-          <p>
-            Where financial signals are thin, investors weight factors such as team, market, product progress, defensibility, evidence of pull (pilots, waitlists), and route to market. These frameworks provide a disciplined way to compare early opportunities rather than a precise formula.
-          </p>
-
-          <h3>DCF and hybrid models at later stages</h3>
-          <p>
-            Discounted cash flow is uncommon at seed, but later‑stage investors may use it alongside comps to sanity‑check assumptions about margins, customer lifetime, and cash generation.
-          </p>
-
-          <h2>Metrics that move the multiple in 2026</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ec1009d5-85f4-47eb-928a-31991f34a593.jpg?alt=media&token=e63fb825-b804-4671-90d5-f8820cb31e2a" alt="Tech-savvy team collaborating in a vibrant 90s aesthetic, exploring metrics for startup growth in 2026." className="w-full rounded-lg my-8" />
-
-          <p>
-            The same headline ARR can command very different prices. Investors examine the health of growth and unit economics:
+            When comparing revenue-stage companies, record differences in revenue definition, growth, retention, costs and business model. A comparison needs a date, currency, stage and business-model match; a public headline may omit terms that affect the economics.
+          </p>
+
+          <h3>Which headline would you use? A fictional comparison exercise</h3>
+          <p>Suppose your company sells annual software subscriptions in AUD and also charges implementation fees. None of these fictional announcements establishes its value:</p>
+          <div role="region" aria-label="Fictional financing headline comparison" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700">
+          <table className="min-w-[580px]"><caption>Three fictional announcements and the evidence each lacks.</caption><thead><tr><th scope="col">Announcement</th><th scope="col">Missing or mismatched input</th><th scope="col">Next question</th></tr></thead><tbody>
+            <tr><td>A US software company raised $5 million.</td><td>Amount raised is not valuation; currency and ownership sold are unspecified.</td><td>Is there a disclosed pre/post-money equity value and an identifiable currency?</td></tr>
+            <tr><td>An Australian consultancy sold at a revenue multiple.</td><td>Services revenue may not match subscription economics; the revenue period is missing.</td><td>What revenue is included, over which period, and what work produces it?</td></tr>
+            <tr><td>A similar subscription company announced a valuation.</td><td>The date, option pool, convertible instruments and share rights may differ.</td><td>Which transaction terms are disclosed and which remain unknown?</td></tr>
+          </tbody></table></div>
+          <p>Record “insufficient information” where appropriate. The useful output is a comparison with stated limits, not an average of incompatible headlines.</p>
+
+          <h3>Qualitative evidence before revenue</h3>
+          <p>
+            List what has been built, what customers actually did, what was paid and what remains untested. Distinguish a waitlist from repeated use or a paid contract. Do not turn a self-assigned score into a purported market valuation.
+          </p>
+
+          <h2>Evidence to examine before comparing valuations</h2>
+
+          <p>
+            Before comparing a metric, document its numerator, denominator, period, currency and exclusions. These are preparation questions, not investor acceptance thresholds:
           </p>
           <ul>
-            <li>Growth durability: consistent net‑new revenue, not one‑off spikes.</li>
-            <li>Retention quality: strong logo retention and net revenue retention (expansion beats heavy discounting).</li>
-            <li>Gross margin: especially cloud and inference costs for AI; a plan to improve margins matters.</li>
-            <li>Sales efficiency: payback period, sales cycle length, and a realistic pipeline.</li>
-            <li>Burn multiple: dollars burned to add a dollar of net‑new ARR; lower is better post‑PMF.</li>
-            <li>Revenue mix: higher recurring share and low services dependence earn better comps.</li>
+            <li>Growth: state the period and distinguish recurring changes from one-off payments.</li>
+            <li>Retention: identify the starting customer cohort and treatment of expansion, contraction and cancellations.</li>
+            <li>Delivery costs: identify what cloud, inference, support and human-review costs are included in a margin claim.</li>
+            <li>Sales measures: separate completed sales, pipeline assumptions, acquisition costs and the period being compared.</li>
+            <li>Burn multiple: document the burn definition, measurement period and change in ARR; a lower or negative number is not automatically an improvement.</li>
+            <li>Revenue mix: separate recurring subscriptions, services and one-off payments before comparing businesses.</li>
           </ul>

-          <ArticleStepList
-            title='Practical steps'
-            steps={[
-              'Map comps and set a valuation range (low, base, stretch).',
-              'Assemble an investor‑grade metrics pack: cohorts, NRR, burn multiple, gross margin, and a simple funnel.',
-              'Model ownership with terms: pool expansion, preferences, and future dilution; pick the minimum price you can accept.'
-            ]}
-            accent='indigo'
-          />
-
-          <QuoteBlock title='Evidence or expert insight' variant='purple'>
-            ‘Valuation is a negotiation bounded by ownership targets and risk. The cleanest data wins the debate.’
-          </QuoteBlock>
-
-          <h2>Australia‑specific context founders ask about</h2>
-          <p>
-            While global comps influence pricing, the local market in 2026 remains disciplined. Rounds often prioritise efficient growth and clear unit economics. For AI and data‑heavy products, Australian investors weigh privacy and data governance (e.g., obligations under the Privacy Act, overseen by the OAIC) alongside traction.
-          </p>
-
-          <AudienceGrid
-            heading='Who this helps'
-            cards={[
-              {
-                title: 'Founders & Teams',
-                description: 'Understand how pricing, terms, and runway interact before you negotiate.',
-                icon: <RocketLaunchIcon className='h-6 w-6' />,
-                variant: 'orange'
-              },
-              {
-                title: 'Students & Switchers',
-                description: 'Learn how investors think: ownership math, comparables, and key metrics.',
-                icon: <AcademicCapIcon className='h-6 w-6' />,
-                variant: 'purple'
-              },
-              {
-                title: 'Community Builders',
-                description: 'Bring clarity to workshops on funding, valuation, and responsible AI.',
-                icon: <UsersIcon className='h-6 w-6' />,
-                variant: 'yellow'
-              }
-            ]}
-          />
-
-          <MLAITemplateResourceCTA />
-
-          <h2>Term‑sheet levers that change the effective valuation</h2>
-          <p>
-            The headline price is only part of the story. Option pool expansions done pre‑money shift dilution to founders. Liquidation preferences (1x non‑participating vs participating) and anti‑dilution clauses change risk/return. Milestone tranches and pay‑to‑play provisions can reshape a round. Always model proceeds under downside and mid outcomes—not just the up case.
-          </p>
-
-          <h2>Turn valuation theory into a round you can close</h2>
-          <p>
-            Price within a justified range, prove the metrics, and keep the term sheet clean. A data‑tight narrative makes negotiation faster and builds trust. If you are early, emphasise the evidence you <em>do</em> have (engaged pilots, fast cycles, or distribution advantages) and be explicit about how new capital converts into risk reduction.
-          </p>
-
-          <div className='mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100'>
-            <h3 className='text-lg font-bold text-gray-900 mb-4'>Your Next Steps</h3>
-            <ul className='space-y-3'>
-              <li className='flex gap-3 text-gray-700'>
-                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>1</span>
-                <span>Create a comps table with 5–10 relevant peers and a low/base/stretch range.</span>
-              </li>
-              <li className='flex gap-3 text-gray-700'>
-                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>2</span>
-                <span>Build an investor‑grade metrics pack (NRR, cohorts, burn multiple, gross margin).</span>
-              </li>
-              <li className='flex gap-3 text-gray-700'>
-                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600'>3</span>
-                <span>Model ownership and key terms; pressure‑test with 2–3 trusted mentors.</span>
-              </li>
-            </ul>
-          </div>
-
-          <ArticleCompanyCTA
-            title={`Need help with ${TOPIC}?`}
-            body='Join the MLAI community to collaborate with fellow AI practitioners in Australia.'
-            buttonText='Connect with MLAI'
-            buttonHref='https://mlai.au/contact'
-            note='Community‑run; we aim to reply within 2 business days.'
-          />
+          <h3>A denominator check before sharing an efficiency ratio</h3>
+          <p><a href="https://www.scalevp.com/blog/benchmarking-saas-growth-and-burn">Scale Venture Partners’ July 2022 methodology</a> uses operating income as a proxy for cash burn and groups software companies by size. This is historical methodology, not a current Australian benchmark. Matching a metric label does not make two datasets comparable.</p>
+          <p><strong>Fictional example, AUD:</strong> for one quarter, define net cash burn as operating cash outflows minus operating cash inflows, excluding financing flows. If that is $120,000 and ARR rises from $400,000 to $460,000 over the same quarter, the increase is $60,000 and the cash-based ratio is 2.0. ARR is annualised here, not the quarter’s collected revenue. This is not Scale’s operating-income proxy and establishes neither a good/bad threshold nor a valuation.</p>
+          <p>If ARR is unchanged, the denominator is zero and the ratio is undefined. If ARR falls, a negative ratio must not be described as improved efficiency. If recurring revenue is not meaningful for the business, do not force this measure onto it.</p>
+          <h2>A SAFE cap is not a priced-round valuation</h2>
+          <p>In YC’s post-money SAFE terminology, “post-money” is after SAFE money, not after the new priced-round investment. Later financing can dilute ownership. Its published non-US forms cover Canada, the Cayman Islands and Singapore, not Australia. Use the <a href="https://www.ycombinator.com/safe">creator’s forms and explanation</a> to frame questions; ask an Australian-qualified lawyer about your actual document, conversion triggers and outcomes if no financing occurs. Do not reuse the priced-round example below as a SAFE calculation.</p>
+
+          <h2>A share-count example you can check</h2>
+          <p><strong>Fictional priced-round example, all figures in AUD:</strong> assume 1,000,000 existing shares, an agreed $8,000,000 pre-money equity valuation and $2,000,000 of new primary investment. Assume no options, warrants, convertible instruments, secondary sales, fees or different economic rights. This is arithmetic, not a proposed valuation.</p>
+          <div role="region" aria-label="Fictional priced-round share calculations" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700">
+          <table className="min-w-[440px]"><caption>A$8m pre-money plus A$2m new cash, with no other instruments.</caption><thead><tr><th scope="col">Calculation</th><th scope="col">Result</th></tr></thead><tbody>
+            <tr><td>Price per share: $8,000,000 ÷ 1,000,000</td><td>$8</td></tr>
+            <tr><td>New shares: $2,000,000 ÷ $8</td><td>250,000</td></tr>
+            <tr><td>Total shares after the issue</td><td>1,250,000</td></tr>
+            <tr><td>New investor ownership: 250,000 ÷ 1,250,000</td><td>20%</td></tr>
+            <tr><td>Existing holders' combined ownership</td><td>80%</td></tr>
+            <tr><td>Post-money: $8,000,000 + $2,000,000</td><td>$10,000,000</td></tr>
+          </tbody></table></div>
+          <p>The existing holders still have 1,000,000 shares; the denominator increased. Their 80% is not $8,000,000 they can withdraw, and the new cash belongs to the company in this example. A headline valuation is not cash proceeds or a guaranteed exit value.</p>
+          <p><a href="https://www.cooleygo.com/glossary/pre-money-valuation/">Cooley GO's pre-money definition</a> and <a href="https://www.cooleygo.com/glossary/post-money-valuation/">post-money definition</a> explain the vocabulary. Its materials include US legal concepts; use them for terminology, not as Australian transaction documents.</p>
+          <h2 id="option-pool-meaning">What does a 10% option pool mean?</h2>
+          <p>Ask two different questions: 10% of which total, and who bears the dilution? <a href="https://www.cooleygo.com/negotiating-option-pool/">Cooley's option-pool explanation</a>, reviewed by its publisher in March 2023, illustrates a final available reserve included in the pre-money pricing denominator. It is US-context guidance, not evidence of a standard Australian pool size.</p>
+          <p><a href="https://www.cooleygo.com/glossary/fully-diluted-shares/">Cooley's fully diluted definition</a> also explains that treatment of unallocated reserves depends on context. An ungranted pool is not already owned by employees. Check whether a proposal means unused reserve or the entire plan, and whether existing grants or other instruments are included.</p>
+          <OptionPoolComparison />
+          <h3>Check the default result without trusting the calculator</h3>
+          <ol>
+            <li>With A$8m pre-money and A$2m new cash, the no-pool investor fraction is 2 ÷ (8 + 2) = 20%; existing holders retain 80%.</li>
+            <li>If the final 10% reserve is included in pre-money pricing, keep the new investor at 20% and allocate 10% to the reserve: existing holders have 70%.</li>
+            <li>If the reserve is instead created afterward and dilutes everyone proportionally, multiply both original fractions by 90%: existing holders have 72%, the new investor 18%, and the reserve 10%.</li>
+          </ol>
+          <p>The 72% versus 70% difference is two <em>percentage points</em>, not a two-percent relative increase. These are alternative assumed terms, not choices an investor has offered. The downloadable calculation shows the underlying share-equivalent algebra, including why fractional results are not instructions to issue shares.</p>
+          <p><a href="/downloads/valuation-learning/option-pool-worked-example.md" download>Download the worked calculations and discussion record (.md)</a>. This editable text file contains all three examples, formulas, assumptions, source links and questions; it is not an automated spreadsheet or a legal cap table.</p>
+          <h2>What the ownership table does not tell you</h2>
+          <p>Do not read the percentages as voting power, a promised distribution or a price recommendation. Ask a qualified adviser to model your actual documents, including any existing grants, convertibles, capitalisation definitions and rounding. For possible distributions, ask what proceeds exist and what priority or participation rules apply. The calculation above does not model those rights or approve the transaction.</p>
+
+          <h2>Prepare evidence without promising a closing outcome</h2>
+          <p>
+            Record the evidence and uncertainty behind each proposed range. Clear documentation does not guarantee an agreement, a faster negotiation or funding. Describe actual customer behaviour, what new cash would fund and which assumption you would test next. Do not describe a planned experiment as a risk already resolved.
+          </p>
+
+          <section id="funding-discussion-record" className="prose prose-lg prose-slate max-w-none">
+          <h2>Separate valuation evidence from negotiation assumptions</h2>
+          <p>For an educational conversation, bring an anonymised question rather than a number you want someone to endorse. Record where an input came from and what it actually measures. A public financing announcement is not automatically a comparable transaction for your company.</p>
+          <pre className="whitespace-pre-wrap break-words text-sm" aria-label="Funding discussion record">{["Claim or valuation input being discussed:","Source, date, currency and measurement period:","Verified fact, assumption or unknown:","Why the comparison is relevant and where it differs:","Terms or missing information that may change interpretation:","Question for a qualified adviser before any decision:"].join('\n')}</pre>
+          <p>Do not label a hypothetical valuation as market evidence or turn peer feedback into professional advice. If your separate task is communicating progress to existing stakeholders, you can explore Vibe Raising below; it prepares updates, not a valuation opinion or an investor endorsement.</p>
+          <p><a href="/vibe-raising">Explore investor progress updates with Vibe Raising</a>. Use actual metrics and clearly label estimates; the tool does not verify those claims for you.</p>
+          <p>If you want to explore the concepts with other founders, choose an MLAI event with a relevant topic and experience level. Bring a general or fictional question rather than confidential deal terms; check whether discussion fits the session.</p>
+        </section>
+        <ArticleConversionCTA articleSlug={'featured/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/featured/' + SLUG].conversion!} events={[]} placement="article-inline" />
         </div>
       </div>

       <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
         <ArticleReferences
           heading='Sources'
-          description='Selected resources to sanity‑check methods, metrics, and local context (as at 2026).'
+          description='Sources checked 10 September 2026; historical and jurisdictional limits apply. The worked examples are MLAI teaching aids, not independently reviewed transactions.'
           headingId='references'
           references={[
-            {
-              id: 1,
-              href: 'https://www.scalevp.com/blog/the-burn-multiple',
-              title: 'The Burn Multiple',
-              publisher: 'Scale Venture Partners',
-              category: 'analysis',
-              description: 'A simple efficiency metric used widely to evaluate growth relative to cash burn.'
-            },
-            {
-              id: 2,
-              href: 'https://www.airtree.vc/open-source/metrics-that-matter',
-              title: 'Metrics that matter',
-              publisher: 'AirTree',
-              category: 'industry',
-              description: 'Operator‑friendly guide to core SaaS metrics used in fundraising.'
-            },
-            {
-              id: 3,
-              href: 'https://www.oaic.gov.au/privacy/the-privacy-act',
-              title: 'The Privacy Act (overview)',
-              publisher: 'OAIC',
-              category: 'government',
-              description: 'Australian privacy obligations relevant to data‑rich and AI startups.'
-            },
-            {
-              id: 4,
-              href: 'https://www.cutthrough.vc',
-              title: 'Australian Startup Funding (reports)',
-              publisher: 'Cut Through Venture',
-              category: 'analysis',
-              description: 'Independent reporting on Australian funding activity and round trends.'
-            },
-            {
-              id: 5,
-              href: 'https://gust.com/blog/berkus-method',
-              title: 'Berkus Method explained',
-              publisher: 'Gust',
-              category: 'guide',
-              description: 'Heuristic for valuing very early startups when revenue signals are limited.'
-            }
+            { id: 1, href: 'https://www.scalevp.com/blog/benchmarking-saas-growth-and-burn', title: 'Benchmarking startup growth and burn (11 July 2022)', publisher: 'Scale Venture Partners', category: 'analysis', description: 'Historical software-company methodology, not current Australian pricing evidence.' },
+            { id: 2, href: 'https://www.ycombinator.com/safe', title: 'SAFE forms and explanation', publisher: 'Y Combinator', category: 'guide', description: 'Instrument variants and post-money terminology; not Australian legal advice.' },
+            { id: 3, href: 'https://www.cooleygo.com/glossary/', title: 'Startup financing glossary', publisher: 'Cooley GO', category: 'guide', description: 'Financing terminology with US legal context.' },
+            { id: 4, href: 'https://www.cooleygo.com/negotiating-option-pool/', title: 'Negotiating the option pool', publisher: 'Cooley GO', category: 'guide', description: 'Why pool treatment matters; inspect actual transaction documents.' }
           ]}
         />

```
