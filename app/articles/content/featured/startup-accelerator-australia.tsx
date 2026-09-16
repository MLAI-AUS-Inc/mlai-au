import { Home } from "lucide-react";
import { Link } from "react-router";
import AcceleratorFitScorecard from "~/components/articles/AcceleratorFitScorecard";
import AcceleratorIntakeNotice from "~/components/articles/AcceleratorIntakeNotice";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import { ACCELERATOR_DATASET_OWNER, ACCELERATOR_DATASET_REVIEW_CADENCE, ACCELERATOR_DATASET_VERIFIED_AT, AUSTRALIAN_ACCELERATOR_PROGRAMS } from "~/lib/australian-accelerator-programs";
import { ACCELERATOR_FICTIONAL_RECORD, ACCELERATOR_FIT_CRITERIA, ACCELERATOR_FIT_LABELS, emptyAcceleratorFit, formatAcceleratorFit } from "~/lib/accelerator-fit";

export const useCustomHeader = true;
const TOPIC = "Australian startup accelerators: eligibility, intakes and terms";
export const CATEGORY = "featured";
export const SLUG = "startup-accelerator-australia";
export const DATE_PUBLISHED = "2026-01-10";
export const DATE_MODIFIED = "2026-09-15";
export const DESCRIPTION = "Compare seven Australian accelerator source records, distinguish applications from expressions of interest, and record eligibility, terms and founder-time trade-offs before deciding.";
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b4a9a55e-4254-4bb3-9eed-5b80dfbc4432.jpg?alt=media&token=54ee6558-bb42-4528-812c-7377691e9f9f";
const HERO_IMAGE_ALT = "Hands using a laptop at a shared table (illustrative image)";
export const articleMeta = { title: TOPIC, topic: TOPIC, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, image: HERO_IMAGE, imageAlt: HERO_IMAGE_ALT, featuredFocus: "startups" };
export const summaryHighlights = {
  heading: "Shortlist support for a constraint you can name",
  intro: "Seven selected programme records checked 15 September 2026, with source-access limits and unanswered questions retained.",
  items: [
    { label: "An EOI is not an application", description: "A date, link or programme already running does not establish that you can join." },
    { label: "A failed requirement stays a failed requirement", description: "The evidence worksheet has no points-based recommendation that can outweigh eligibility or capacity." },
    { label: "Keep the decision in your hands", description: "Use the completed fictional choice and editable record before choosing a community event or contacting a provider." },
  ],
};
export const faqItems = [
  { id: 1, question: "Which Australian accelerator is best for my startup?", answer: "There is no universal best programme. Compare your current constraint with its support, complete eligibility rules, terms and attendance commitment. This is a selected source directory, not a national census, quality ranking or independently evaluated outcome study." },
  { id: 2, question: "Does an expression of interest mean applications are open?", answer: "No. An EOI may only register interest in a future or unspecified intake. A published opening date or Apply link also does not confirm a place, eligibility or acceptance. Check the specific current cohort and actual application route." },
  { id: 3, question: "Do accelerators take equity?", answer: "Offers differ: some provide equity-free support; others publish an investment instrument. Cash, credits, fees, rights, ownership and founder time are different things. Use actual offer documents and appropriate independent advice, not a headline amount or this worksheet, to assess legal and financial consequences." },
  { id: 4, question: "Can a solo or pre-revenue founder participate?", answer: "Check programme-specific criteria. Joining a residency solo is different from receiving investment as a solo founder. A pre-revenue company is not automatically eligible or ineligible everywhere; affiliation, stage, team and commitment requirements can still rule it out." },
  { id: 5, question: "Does a complete worksheet predict acceptance or success?", answer: "No. The checks are MLAI editorial prompts. Your evidence notes are not independently verified, and the count of completed items is not a probability or recommendation to invest. An unmet requirement or material unknown remains visible even when other items are supported." },
  { id: 6, question: "How current are the programme records?", answer: "Each has a source-check and recheck date. The page compares calendar dates using Sydney time, not an assumed provider closing hour. Overdue evidence is marked for review; historical dates remain historical and a later cohort is never inferred from recurring cadence." },
];
const REFERENCES = AUSTRALIAN_ACCELERATOR_PROGRAMS.flatMap((p, index) => [
  { id: index * 2 + 1, href: p.sourceUrl, title: p.sourceLabel, publisher: p.name, description: `Programme and intake source snapshot checked ${p.lastVerified}. ${p.sourceLimit ?? "See the record for scope and unverified details."}`, category: "industry" },
  ...(p.termsSourceUrl ? [{ id: index * 2 + 2, href: p.termsSourceUrl, title: "Startmate investment terms guide", publisher: "Startmate", description: "Public guide dated 28 August 2025, read 15 September 2026; not the offer documents for your company.", category: "industry" }] : []),
]);

export default function ArticleContent() {
  return <>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TOPIC, current: true }]} title={TOPIC} titleHighlight="eligibility, intakes and terms" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT} />
    <ArticleTocPlaceholder className="bg-transparent" />
    <div data-cf-article-body className="prose prose-lg prose-slate mx-auto min-w-0 max-w-5xl px-4 py-8 [&_h2]:scroll-mt-28 [&_section]:scroll-mt-28">
      <section id="choose-support">
        <p><strong>Choose a programme that addresses your next company constraint—not the most impressive investment headline.</strong> This guide is for Australian founders comparing named programmes. If you have not decided whether a programme is useful at all, start with the <Link to="/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup">accelerator decision explainer</Link>.</p>
        <p>The directory covers generalist, AI, university, research, climate and inception-stage pathways. It is not exhaustive, a recommendation to invest, or evidence that every listed programme accepts your company. A provider's stated benefit is not a measured return on participation.</p>
        <aside className="not-prose my-6 rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-950"><h2 className="text-xl font-bold">Source checks and intake status are different facts</h2><p className="mt-2">Sources were reviewed on <time dateTime={ACCELERATOR_DATASET_VERIFIED_AT}>15 September 2026</time>. Recheck is due <time dateTime="2026-09-22">22 September</time> at 00:00 Sydney time, or sooner if details change. Date comparisons use Australia/Sydney; provider deadline hours/timezones remain unverified unless explicitly stated. No application, private portal, alumni interview or investment document was submitted or accepted.</p></aside>
      </section>

      <section id="programme-directory">
        <h2>Seven programme source records</h2>
        <p>Compare eligibility first, then the relevant support, costs and calendar. “Within published programme dates” means a schedule comparison—not independently confirmed activity or permission to join late. The former July snapshot is retained in the change history; it does not renew current details.</p>
        <div className="not-prose my-8 space-y-5">{AUSTRALIAN_ACCELERATOR_PROGRAMS.map(program => <section key={program.id} id={`programme-${program.id}`} data-accelerator-program={program.id} className="min-w-0 rounded-2xl border border-gray-300 bg-white p-5 text-gray-950 sm:p-6">
          <p className="text-sm font-semibold text-purple-800">{program.kind}</p><h3 className="mt-2 text-2xl font-bold">{program.name}</h3>
          <p className="mt-2 text-sm">Source checked <time dateTime={program.lastVerified}>{program.lastVerified}</time>; previous full snapshot <time dateTime={program.previousFullCheck}>{program.previousFullCheck}</time>.</p>
          <dl className="mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2">{[
            ["Potential reader fit", program.bestFor], ["Location and format", program.locationFormat], ["Published duration", program.duration], ["Published cash/equity position", program.publishedTerms], ["Eligibility signals — not the full rules", program.eligibilitySignal], ["Dated intake and programme schedule", program.currentIntake],
          ].map(([label, value]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="mt-1">{value}</dd></div>)}</dl>
          <AcceleratorIntakeNotice program={program} />
          {program.sourceLimit && <p className="mt-3 text-sm"><strong>Source limitation:</strong> {program.sourceLimit}</p>}
          <a href={program.sourceUrl} className="mt-4 inline-flex min-h-11 items-center font-bold text-purple-800 underline">Check {program.sourceLabel}</a>
          {program.termsSourceUrl && <p className="mt-2 text-sm"><a href={program.termsSourceUrl} className="font-semibold text-purple-800 underline">Read the separate public investment-terms guide</a>; request current documents before relying on it.</p>}
        </section>)}</div>
        <p><strong>Some details remain unavailable.</strong> MAP's programme text was retrievable, but a direct browser check received a challenge and its Key Dates banner was not verified. Its former five-month duration is not retained as a current fact. Antler's eight-week overview and an older ten-week cohort news card should not be combined into a made-up next schedule. A generic UNSW EOI link is not relabelled “2027 applications”.</p>
      </section>

      <section id="terms-and-costs">
        <h2>Compare cash, ownership and founder time separately</h2>
        <p>The <a href="https://www.startmate.com/writing/startmate-accelerator-investment-terms-101">Startmate public terms guide</a> specifies a post-money SAFE cap, not merely an agreed priced-round valuation. The simple ratio A$120,000 ÷ A$1.5 million = 8% is arithmetic for asking a question, not a complete ownership forecast. Other securities, financing and actual instrument terms matter.</p>
        <p>UNSW's published uncapped discounted pre-money SAFE cannot produce a final ownership percentage from the cash and discount alone. Equity-free support is also not the same as unrestricted cash: product credits have separate eligibility and usage conditions. Programme support, investment selection and follow-on funding must not be collapsed into a guaranteed cheque.</p>
        <ul><li><strong>Cash:</strong> application/participation fees, travel, accommodation and expenses. Unknown amounts stay unknown.</li><li><strong>Founder time:</strong> application work, sessions, travel, preparation and displaced customer/product work. Hours are not automatically a cash expense.</li><li><strong>Rights and obligations:</strong> the full instrument, future rights, IP, attendance and any conditions. Ask suitably qualified advisers to review the actual offer.</li></ul>
        <p>This is general educational information, not legal, tax, financial or investment advice. Provider materials are not an independent assessment of what is appropriate for your company.</p>
      </section>

      <AcceleratorFitScorecard />

      <section id="worked-shortlist">
        <h2>Worked choice: why this team defers</h2>
        <p><strong>Fictional teaching case, not an MLAI client, applicant or interview.</strong> HarbourBrief is a Sydney AI quoting-workflow prototype. Both founders intend to retain full-time outside jobs. Their next question is whether a target buyer can provide suitable data; no buyer commitment, dataset permission or test outcome is invented.</p>
        <p>At the dated source check, Startmate's full-time-founder requirement and three in-person weeks conflict with these assumptions. That is a reason to defer, even if its generalist support and investment headline look attractive. Submitting an EOI would not cure the mismatch. The team could investigate buyer/data access within its existing capacity and revisit programme selection if its commitment changes.</p>
        <p><strong>Illustrative planning arithmetic:</strong> two founders × four hours × twelve weeks = 96 founder-hours; adding eight application hours and 24 travel hours gives 128. These are hypothetical inputs, not a Startmate workload estimate, a measured result or a complete cost. Cash expenses and actual required hours are unknown.</p>
        <div role="region" aria-label="Fictional accelerator evidence comparison; scroll horizontally if needed" tabIndex={0} className="not-prose my-6 max-w-full overflow-x-auto rounded-xl border border-gray-300 focus:outline-2 focus:outline-purple-700"><table className="w-full min-w-[40rem] text-left text-sm"><caption className="bg-gray-950 p-4 text-left font-bold text-white">Completed fictional evidence record — not independently verified</caption><thead className="bg-gray-100"><tr><th scope="col" className="p-4">Check</th><th scope="col" className="p-4">Status</th><th scope="col" className="p-4">Recorded evidence and uncertainty</th></tr></thead><tbody>{ACCELERATOR_FIT_CRITERIA.map(c => <tr key={c.id} className="border-t border-gray-300 align-top"><th scope="row" className="p-4 font-semibold">{c.label}</th><td className="p-4">{ACCELERATOR_FIT_LABELS[ACCELERATOR_FICTIONAL_RECORD.criteria[c.id].status]}</td><td className="break-words p-4">{ACCELERATOR_FICTIONAL_RECORD.criteria[c.id].evidence}</td></tr>)}</tbody></table></div>
        <p><a href="/downloads/accelerator-decision/evidence-worksheet.txt" download>Download the completed example and blank evidence worksheet (TXT)</a>. Open it in a text editor. It is a dated planning aid, not a saved application or a promise of current intake availability.</p>
        <details className="my-5 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Copy a blank record without JavaScript</summary><pre className="whitespace-pre-wrap break-words">{formatAcceleratorFit(emptyAcceleratorFit())}</pre></details>
      </section>

      <section id="alumni-evidence">
        <h2>Ask for experience without inventing proof of impact</h2>
        <p>Ask willing alumni at a comparable stage what support they actually used, what was missing, what work was displaced, and which terms they misunderstood. Record how they were recruited and any connection to the provider. Seek a range of experiences where available; do not assume a testimonial is typical or that a fixed number of interviews proves a return.</p>
        <p>A portfolio logo shows participation, not causation. Ask what changed and what other explanations are plausible; an alumnus cannot establish with certainty what would have happened without the programme. Obtain permission before identifying people or sharing quotations/private terms. This guide contains no newly conducted alumni interviews.</p>
      </section>

      <section id="decision-sequence">
        <h2>A decision sequence, paced around the evidence</h2>
        <ol><li>Name the company constraint and check whether a programme is the appropriate kind of support.</li><li>Eliminate known mismatches in eligibility, sector, commitment or timing; keep unknowns separate.</li><li>Request current terms, attendance and the specific support you need.</li><li>Seek relevant provider/alumni clarification when it could change the decision. Do not invent responses to fill a schedule.</li><li>Compare one realistic alternative using the same time and resources.</li><li>Record apply, clarify, defer or decline, with a reason and review trigger.</li></ol>
        <p>You might organise this over a week, but seven days is not an evidence-based deadline. Replies, advisers and founder availability determine the actual pace. Bring one non-confidential unresolved question to a relevant community conversation; event attendance does not guarantee alumni access, funding or admission.</p>
      </section>
    <p><Link to="/events">Explore upcoming MLAI events</Link> and check the listing for its topic, format and participation requirements.</p>

      <section id="method-and-changes">
        <h2>Method, changelog, limitations and disclosure</h2>
        <p><strong>Scope:</strong> seven selected provider-owned records connecting structured founder/research support to Australia. They are source leads, not endorsements, a complete census or an audited comparison of outcomes. Antler is retained as a distinct residency pathway, not relabelled a conventional accelerator.</p>
        <p><strong>Maintenance:</strong> {ACCELERATOR_DATASET_OWNER}. {ACCELERATOR_DATASET_REVIEW_CADENCE}. Source status uses the reader's calendar date on server render and updates in an open scripted tab. Invalid dates/clocks cannot certify a recent check. A review deadline does not perform a new check automatically.</p>
        <p><strong>10 September changes:</strong> refreshed seven records, retained MAP's access limit, separated EOI/closing/start/phase facts, corrected the undated UNSW EOI and removed unverified duration/attendance assumptions. The July 29 baseline and September 9 Startmate/CSIRO intake corrections are historical snapshots; the previous CSIRO 31 August deadline is not reused as a new round.</p>
        <p><strong>Worksheet change:</strong> the previous 0–16 tally and “strong shortlist” threshold could outweigh missing eligibility. The replacement records evidence and unresolved requirements without an additive recommendation. Its worked case is fictional and its maths uses stated assumptions.</p>
        <p><strong>Review and assistance:</strong> AI tools assisted source discovery, drafting and implementation. No independent named programme/financial reviewer, private offer review, alumni interviews or causal outcome study is claimed. The illustration is not programme-attendance evidence. Send a <Link to="/contact">source-backed correction</Link> if a provider detail has changed; use the provider for application questions.</p>
      </section>
      <ArticleReferences references={REFERENCES} heading="First-party programme sources" description="Dated source checks from 15 September 2026; read the adjacent record for unresolved details and access limits." previewCount={5} />
      <ArticleFAQ items={faqItems} heading="Australian accelerator questions" />
    </div>
  </>;
}
