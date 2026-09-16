import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { DATA_SCIENCE_PORTFOLIO as LAB, DATA_SCIENCE_PORTFOLIO_FILES } from "~/lib/data-science-portfolio";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "how-to-get-data-science-job";
export const DATE_PUBLISHED = "2025-11-19";
export const DATE_MODIFIED = "2026-09-15";
const TITLE = "How to get a data science job in Australia: build evidence of delivery";
export const DESCRIPTION = "Choose a target data role, build a reproducible portfolio with leakage and failure checks, and turn real evidence into applications or a scoped builder brief.";
const PATH = "/articles/featured/how-to-get-data-science-job";
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8cebc51f-5bc8-46f4-8676-bd361214e6b3.jpg?alt=media&token=273d8b6c-afd5-411f-89e9-fa04b4413f6d";
export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Laptop displaying charts on a desk beside an Australian flag" };
export const summaryHighlights = {
  heading: "Make your next application inspectable",
  intro: "For early-career Australian builders using AI coding tools—not a promise of employment or a survey of hiring demand.",
  items: [
    { label: "Choose a role", description: "Use current position descriptions to separate analysis, modelling and production delivery." },
    { label: "Show your checks", description: "Include a baseline, unseen evaluation data, failure tests and reproducible setup." },
    { label: "Explain your contribution", description: "Separate AI assistance, your decisions and measured results from hypothetical business value." },
  ],
};
export const faqItems = [
  { question: "Do I need a degree?", answer: "Check the actual position description. Do not assume a portfolio replaces a mandatory qualification, or that every role requires the same credential. Compare requirements before paying for a course." },
  { question: "Can I use AI coding tools in a portfolio?", answer: "Yes, if the project and data terms permit it. Explain what the tool assisted with, inspect the changes and demonstrate tests and decisions you understand. For hiring assessments, follow the employer's explicit AI-use rules." },
  { question: "Does a portfolio guarantee paid work?", answer: "No. It provides evidence for an employer or client to assess. Work depends on suitability, eligibility, demand and the selection process; a Studio application does not guarantee an assignment." },
  { question: "Should I claim a model improved business revenue?", answer: "Only with evidence supporting that outcome. Offline predictive performance is not proof of revenue, savings or causal impact. Label demonstrations and illustrative scenarios clearly." },
];

export default function ArticlePage() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="build evidence of delivery" headerBgColor="purple" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
    <div className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_[role=region]]:scroll-mt-20" data-cf-article-body>
      <p><strong>Start with one target role and a project another person can inspect and rerun.</strong> A notebook screenshot or list of AI tools does not show how you handle bad inputs, validate a result or hand work over. This guide helps early-career builders turn those decisions into evidence for Australian applications and scoped project work.</p>
      <p>It is an editorial delivery framework, not a hiring-market study. There is no promised job-ready timeline, salary or required number of portfolio projects. AI-assisted building is useful only when you can explain and check what you ship.</p>

      <h2 id="choose-role">1. Choose the work before choosing another course</h2>
      <p>Read a small sample of current position descriptions from employers you could realistically work for. Save the URL and date, location, work-rights conditions, mandatory qualifications, daily tasks and requested evidence. A handful of advertisements helps you target an application; it does not establish national demand.</p>
      <div className="overflow-x-auto" role="region" aria-label="Role-to-evidence comparison" tabIndex={0}><table className="min-w-[640px]">
        <caption>A role-to-evidence planning aid, not a universal employer specification</caption>
        <thead><tr><th>Work emphasis</th><th>Evidence to prepare</th><th>Question to ask</th></tr></thead>
        <tbody>
          <tr><td>Analysis and reporting</td><td>Validated SQL, reconciled totals, a clear decision memo</td><td>Can someone trace the recommendation back to the data?</td></tr>
          <tr><td>Statistical modelling</td><td>A baseline, justified split and metric, uncertainty and error analysis</td><td>Would the evaluation hold on genuinely unseen cases?</td></tr>
          <tr><td>Production ML or data delivery</td><td>Repeatable pipeline, input checks, tests, logging and handover</td><td>What happens when the input or dependency fails?</td></tr>
        </tbody>
      </table></div>
      <p>Job titles overlap. Use the actual duties rather than assuming every “data scientist” position needs the same stack. If a qualification is mandatory, a portfolio is not a substitute. If you already have operations or domain experience, show how it informs a concrete data decision instead of discarding it.</p>

      <h2 id="portfolio-brief">2. Build a bounded portfolio, not an invented case study</h2>
      <p>Here is an illustrative brief you can adapt: forecast the next fortnight's daily workload for a fictional service team, using a permitted public dataset or explicitly synthetic records. A synthetic exercise demonstrates engineering and reasoning, not real customer demand or savings. The runnable example below uses only invented records.</p>
      <ol>
        <li><strong>Decision:</strong> what action would a forecast inform, and who would check it? Keep automatic staffing or customer actions outside the demonstration.</li>
        <li><strong>Data:</strong> document origin, licence, collection period, units, missing values and permitted redistribution. Publicly accessible does not mean unrestricted use.</li>
        <li><strong>Baseline:</strong> compare with a simple previous-period or seasonal estimate. Explain why that baseline matches the decision.</li>
        <li><strong>Evaluation:</strong> reserve later observations for a time-dependent forecast, and explain whether repeated customers or other groups can leak across the split.</li>
        <li><strong>Result:</strong> report the metric, units, evaluation period and failures. If the model loses to the baseline, report that—it is still a useful result.</li>
        <li><strong>Handover:</strong> include setup commands, pinned dependencies, a small permitted fixture and expected outputs. Do not require private credentials to inspect the core demonstration.</li>
      </ol>
      <p>Fit preprocessing only on training data and apply the learned transformations consistently to evaluation data. Do not tune on the final test set. Pipelines help enforce the sequence, but cannot repair a badly chosen split or features unavailable at prediction time. See the <a href="https://scikit-learn.org/stable/common_pitfalls.html">scikit-learn guide to leakage and preprocessing</a>.</p>

      <h3 id="run-portfolio-project">Run the portfolio example: when the baseline wins</h3>
      <p><strong>This is a completed local teaching exercise, not a client case or blind benchmark.</strong> You need to be comfortable reading JavaScript, using a terminal and checking arithmetic. Node is used to keep this example dependency-free; it is not an employer requirement. There is no provider account, installation of packages, customer data or automated staffing action.</p>
      <p>Save <code>forecast.mjs</code>, <code>synthetic-workload.json</code> and <code>forecast.test.mjs</code> in one folder. The README contains the editable checklist and the result file lets you compare every output. Read the files before running them; if your browser adds <code>.txt</code> to a code filename, restore the displayed name.</p>
      <ul>{DATA_SCIENCE_PORTFOLIO_FILES.map(file => <li key={file.name}><a href={file.href} download>{file.name}</a> — {file.purpose}.</li>)}</ul>
      <pre className="whitespace-pre-wrap break-words"><code>{"node --test forecast.test.mjs\nnode forecast.mjs"}</code></pre>
      <p>Recorded locally on 10 September 2026 using {LAB.runtime}: <strong>11 tests passed</strong>. The script prints its full JSON report; it does not contact a service or save a file. These are automated checks of this version, not independent human review or a guarantee that a different runtime works.</p>

      <h3 id="forecast-comparison">Compare the same future dates, not a flattering screenshot</h3>
      <p>The 42 synthetic records contain a deliberately changing workload pattern. Fit on <strong>5 January–1 February 2026</strong> ({LAB.trainingDays} days), then forecast <strong>2–15 February</strong> ({LAB.evaluationDays} days) from the end of 1 February. Both methods keep that same forecast origin; neither updates with observations from the forecast period.</p>
      <ul>
        <li><strong>Baseline:</strong> repeat the last training week's count for the matching weekday. The second forecast week still uses training data.</li>
        <li><strong>Candidate:</strong> fit a line to four training weekly means, then add each weekday's average training deviation. It estimates a simple trend and weekday pattern, not a language model. Negative estimates would be flagged and clipped to zero; none were clipped here.</li>
        <li><strong>Metric:</strong> mean absolute error (MAE)—add the absolute daily errors and divide by the number of evaluated days. It has units of requests/day, not percent accuracy or money saved.</li>
      </ul>
      <p>For the method background, see Hyndman and Athanasopoulos on <a href="https://otexts.com/fpp3/simple-methods.html">seasonal naive baselines</a> and <a href="https://otexts.com/fpp3/accuracy.html">out-of-sample error and MAE</a>. Those sources explain the methods; they did not test this original fixture or validate its result.</p>
      <div className="overflow-x-auto" role="region" aria-label="Recorded synthetic forecast results" tabIndex={0}><table className="min-w-[640px]">
        <caption>Actual local output on invented data; lower MAE is better on these dates</caption>
        <thead><tr><th>Evaluation period</th><th>Baseline MAE</th><th>Candidate MAE</th><th>What it shows</th></tr></thead>
        <tbody>
          <tr><td>2–8 February, 7 days</td><td>{LAB.firstWeek.baselineMae.toFixed(1)} requests/day</td><td>{LAB.firstWeek.candidateMae.toFixed(1)} requests/day</td><td>The extrapolated trend already overpredicts.</td></tr>
          <tr><td>9–15 February, 7 days</td><td>{LAB.secondWeek.baselineMae.toFixed(1)} requests/day</td><td>{LAB.secondWeek.candidateMae.toFixed(1)} requests/day</td><td>The candidate's error grows in the second week.</td></tr>
          <tr><td>All 14 days</td><td>{LAB.baselineMae.toFixed(1)} requests/day</td><td>{LAB.candidateMae.toFixed(1)} requests/day</td><td>{LAB.baselineAbsoluteError} ÷ 14 versus {LAB.candidateAbsoluteError} ÷ 14 absolute errors.</td></tr>
        </tbody>
      </table></div>
      <p>Trace one failure: on <strong>9 February</strong>, the invented observed count is {LAB.example.actual}; the baseline predicts {LAB.example.baseline} (absolute error {LAB.example.baselineError}) and the candidate predicts {LAB.example.candidate} (error {LAB.example.candidateError}). The training pattern grows, but the constructed evaluation levels decline. A good training fit did not make extrapolation appropriate.</p>
      <p><strong>Decision: do not recommend this candidate on this result.</strong> Retain the baseline for the exercise and explain the failure. Neither method is approved for a real staffing decision: there are no prediction intervals, representative customer observations, holiday effects, business costs or operational acceptance. Reproducing the files alone is not a job-ready portfolio.</p>
      <p>“Held out” here means excluded from fitting, not unknown to the lesson's designer. The full fixture and result are visible. If you change the model after inspecting them, these dates are development evidence—not a fresh test. Plan a training-only validation process and an untouched evaluation period before making a new performance claim.</p>
      <p>The supplied tests check a hand-solvable trend, independent error arithmetic, invalid/missing fields, duplicate/gapped dates, forecast overlap, fixed-origin predictions and missing input files. They also prove that altering future counts cannot change fitted values or predictions in this implementation. They do not establish that your replacement dataset or features are free from every kind of leakage.</p>

      <h2 id="acceptance-checklist">3. Use this portfolio acceptance checklist</h2>
      <p>Copy the following checks into your repository issue tracker. Record pass/fail, the command or evidence link, and an unresolved limitation for each. This is a practical review aid, not an employer certification.</p>
      <div className="overflow-x-auto" role="region" aria-label="Portfolio acceptance checklist" tabIndex={0}><table className="min-w-[640px]">
        <thead><tr><th>Check</th><th>Evidence to attach</th><th>Failure to investigate</th></tr></thead>
        <tbody>
          <tr><td>Clean setup</td><td>A fresh-environment run with documented commands and versions</td><td>Hidden local files or undeclared packages</td></tr>
          <tr><td>Input contract</td><td>Tests for missing columns, invalid values and duplicate records</td><td>Silent coercion or plausible-looking incorrect output</td></tr>
          <tr><td>Evaluation integrity</td><td>Split rationale, leakage review and unchanged held-out cases</td><td>Future information or test-set tuning</td></tr>
          <tr><td>Baseline comparison</td><td>Same cases and metric for baseline and model</td><td>Comparing different periods or units</td></tr>
          <tr><td>Failure behaviour</td><td>A broken dependency/input test and explicit error or fallback</td><td>A crash without useful diagnostics</td></tr>
          <tr><td>Ownership</td><td>README, limitations, AI-assistance note and permitted data fixture</td><td>Code you cannot explain or data you cannot share</td></tr>
        </tbody>
      </table></div>
      <p>Ask another person to rerun the documented setup and identify one confusing decision. Record feedback only if the review actually occurs; do not label a self-check an independent review. Remove secrets and confidential records before sharing a repository or sending material to an AI service.</p>
      <p>The <a href="/downloads/data-science-portfolio/README.md" download>downloadable portfolio checklist and handover notes</a> include fields for your role evidence, data permissions, source version, results, AI assistance and actual reviewer feedback. For a separate software-delivery task after this evaluation exercise, use the <Link to="/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence">bounded AI-assisted prototype guide</Link>. Do not describe either learning lab as paid client experience.</p>

      <h2 id="ai-tools">4. Show judgment when using AI coding tools</h2>
      <p>Use assistance for a bounded change: drafting a parser, proposing edge cases or explaining an error. Review the diff before execution, verify dependencies and run tests you understand. Keep a short note of the tool/version, task, accepted changes, rejected suggestions and your checks. Do not publish confidential prompts or raw client inputs.</p>
      <p>For an interview or take-home, ask what assistance is permitted before using it. Be ready to explain a failure, alter a test and defend the metric without treating generated text as authority. A polished explanation unsupported by the repository is not delivery evidence.</p>
      <p><strong>This reference lab's provenance:</strong> an AI assistant drafted its code, synthetic fixture and tests; those tests and the command-line report were run locally. No hiring manager, client or independent delivery reviewer has approved it. When adapting it, identify your own changes, rejected suggestions and checks rather than presenting the unchanged starter as entirely your work.</p>
    <p><Link to="/events">Explore upcoming MLAI events</Link> and check the listing for its topic, format and participation requirements.</p>

      <h2 id="application">5. Translate evidence into an honest application</h2>
      <p>Connect each selection criterion to a real example. Use the employer's requested format, rather than a universal résumé length or keyword target. For public-service applications, consult the <a href="https://www.apsc.gov.au/working-aps/joining-aps/cracking-code">Australian Public Service Commission's application guide</a> and the specific vacancy instructions.</p>
      <p>A safe project statement template is: “Built [artifact] using [permitted data]; compared [method] with [baseline] on [held-out period]; measured [actual result and unit]; documented [limitation].” Replace brackets only with your evidence. Do not turn an offline accuracy gain into “reduced churn” or claim commercial impact without a real outcome study.</p>
      <p>Search employer career pages, <a href="https://www.apsjobs.gov.au/">APS Jobs</a> and your university's careers service where relevant. Check closing dates and eligibility in each listing. Track applications by role, evidence supplied, stage and feedback; distinguish no response from a stated reason for rejection.</p>

      <h2 id="paid-projects">6. Treat paid projects as a separate delivery commitment</h2>
      <p>If you can already deliver a bounded feature with AI coding tools, scoped project work may provide relevant experience. It is not a guaranteed route to employment. Before accepting work, agree deliverables, acceptance tests, availability, payment terms, support boundaries and ownership. Obtain permission before publishing client work in a portfolio.</p>
      <p>MLAI Studio's builder application is for assessment and potential matching, not an offer of an available contract. The current intake is Australia-focused; do not assume a New Zealand pathway is supported without checking eligibility with the team. If you are still exploring rather than ready to deliver, <Link to="/events">find an MLAI event</Link> and bring a specific project question.</p>

      <h2 id="next-step">Your next step</h2>
      <p>Choose one suitable position description, identify your weakest evidence gap and improve one repository against the checklist. Then submit an application with claims someone can verify. Add further projects when they demonstrate a missing capability—not to meet an arbitrary quota.</p>
      <h2 id="method">Sources and limits</h2>
      <p>Substantively revised 15 September 2026. The scikit-learn, forecasting and APS pages were rechecked on that date for their respective guidance; they do not validate national hiring demand, our synthetic example or this framework's effect on job outcomes. The lab has actual local execution evidence but is not a completed customer project, recruiter survey or independently tested hiring programme.</p>
      <ArticleFAQ items={faqItems} />
    </div>
  </div>;
}
