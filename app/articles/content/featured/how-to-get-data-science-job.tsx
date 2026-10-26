import { Home } from "lucide-react";
import { Link } from "react-router";
import AuthorBio from "~/components/AuthorBio";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { getDefaultArticleAuthorDetails } from "../../authors";
import { DATA_SCIENCE_PORTFOLIO as LAB } from "~/lib/data-science-portfolio";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "how-to-get-data-science-job";
export const DATE_PUBLISHED = "2025-11-19";
export const DATE_MODIFIED = "2026-10-25";
const TITLE = "How to get a data science job in Australia: skills, pathways and applications";
export const DESCRIPTION = "A practical Australian data science career guide: entry pathways, Python and SQL skills, employer examples, portfolio projects, job searches, CVs and interviews.";
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8cebc51f-5bc8-46f4-8676-bd361214e6b3.jpg?alt=media&token=273d8b6c-afd5-411f-89e9-fa04b4413f6d";
const AUTHOR = getDefaultArticleAuthorDetails();
export const PORTFOLIO_TUTORIAL = "/downloads/data-science-portfolio/tutorial.html";
export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Laptop displaying charts on a desk beside an Australian flag" };
export const summaryHighlights = {
  heading: "Your route into data science",
  intro: "Choose a suitable entry point, develop the skills it asks for, and show how you use them to solve a problem.",
  items: [
    { label: "Starting without experience?", description: "Compare graduate, internship and analyst roles as well as data scientist vacancies. Check each role’s eligibility and daily work." },
    { label: "What should you learn?", description: "Build a foundation in SQL, Python, statistics and clear communication, then use target job descriptions to choose your next skill." },
    { label: "What makes an application useful?", description: "Connect each requirement to a real example, a readable project and a result you can explain in an interview." },
  ],
};
export const employerExamples = [
  { employer: "INGRITY", role: "2027 graduate intake", location: "Confirm placement location in the individual advertisement", href: "https://ingrity.com/careers/?jobId=QqhI52JUTFyI", requirements: "The employer describes structured learning and client work across analytics, cloud and AI. Check the linked vacancy for degree, work-rights and intake conditions.", takeaway: "Look for an explicitly graduate pathway when you need supervised experience." },
  { employer: "Amazon", role: "Data Scientist, job 10509589", location: "Sydney", href: "https://www.amazon.jobs/en/jobs/10509589/data-scientist", requirements: "The listing asks for prior data science and querying experience, statistical modelling, and a quantitative master’s or a bachelor’s plus five years of relevant experience. Python is preferred.", takeaway: "A data scientist title can describe an experienced role; check the requirements before treating it as an entry opening." },
  { employer: "Zip", role: "Senior Data Scientist I", location: "Sydney", href: "https://job-boards.greenhouse.io/zipcolimited/jobs/4718273006", requirements: "The listing asks for five or more years in data science, advanced Python and SQL, experimentation, production ML and clear communication.", takeaway: "Use senior advertisements to understand progression, while targeting roles appropriate to your present experience." },
] as const;
export const faqItems = [
  { question: "How do I get a data science job with no experience?", answer: "Look for graduate programs, internships and junior data or analyst roles whose eligibility you meet. Use coursework, a permitted volunteer task or a small personal project to show data cleaning, SQL or Python, evaluation and communication. Explain your own contribution and apply while improving the specific gaps in your target roles." },
  { question: "Do I need a degree to become a data scientist in Australia?", answer: "Requirements vary by employer and level. Some advertisements specify a quantitative degree and experience; others consider different evidence. Read several relevant vacancies before choosing study. A portfolio can demonstrate skills but does not replace a mandatory qualification." },
  { question: "Should I learn Python or SQL first?", answer: "For a reporting or analyst target, start with SQL and explaining a checked result. For a modelling target, develop Python and statistics alongside SQL. Use one small dataset to practise both, then follow the requirements of the roles you want." },
  { question: "How long does it take to become a data scientist?", answer: "Your starting skills and target role determine the work involved. A degree has a formal study duration; a career transition also requires practical evidence and a job search. Set milestones for skills, projects and applications instead of relying on a universal job-ready deadline." },
  { question: "Is data science in demand in Australia?", answer: "The employer examples in this guide show different advertised pathways, but three examples cannot measure national demand or your chance of employment. Review current vacancies in your location and experience range, including analyst and graduate titles, and record which requirements recur." },
  { question: "Can I use AI coding tools in a portfolio or interview?", answer: "For a portfolio, follow the data and project terms, explain the assistance and verify code you can defend. For a hiring assessment, follow the employer’s explicit AI-use rules. Report actual results and identify your own work." },
];

export default function ArticlePage() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "Data science careers", current: true }]} title={TITLE} headerBgColor="purple" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
    <div className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_[role=region]]:scroll-mt-20" data-cf-article-body>
      <p>To get a data science job in Australia, start with roles that match your experience, learn the skills those roles require, build evidence of your work and practise explaining it. Qualifications, practical experience and communication all matter; their weight depends on the employer and the work.</p>
      <p>This guide covers the whole application journey. The employer examples were checked on <time dateTime={DATE_MODIFIED}>25 October 2026</time>. Our suggested exercises and application steps are editorial guidance, with sources beside the factual claims.</p>
      <h2 id="choose-role">1. Choose an entry pathway that fits your starting point</h2>
      <h3>If you are a student or recent graduate</h3>
      <p>Check graduate programs, internships, university placements and research projects alongside junior vacancies. Record graduation-year eligibility, location, work-rights requirements, application deadlines and requested documents. A capstone can provide evidence if you can explain your own work and have permission to share it.</p>
      <h3>If you are changing careers</h3>
      <p>Start with a problem you understand from your current field. An operations professional might analyse service delays; a finance analyst might test a forecast. Compare data analyst, BI analyst, analytics engineer and data scientist duties, then choose a role where your existing knowledge helps. An internal analytics project can also make your contribution easier to demonstrate.</p>
      <h3>If you have no professional data experience</h3>
      <p>Choose a small project you can finish and explain. Combine it with relevant coursework, an eligible internship or a clearly scoped volunteer task. Label each experience accurately. You can apply for suitable entry roles while developing your skills; you do not need to wait until you know every tool in a senior advertisement.</p>
      <p>For formal study, <a href="https://www.rmit.edu.au/study-with-us/information-technology/data-science/how-to-become-a-data-scientist">RMIT describes undergraduate and postgraduate pathways into data science</a>. Compare admission rules, curriculum and workload with your skill gaps. If you need a smaller learning step, use our <Link to="/articles/featured/learn-ai-melbourne">Melbourne AI course comparison</Link>.</p>
      <h2 id="employer-examples">2. Read Australian employer requirements at the right level</h2>
      <p>These three employer pages illustrate a graduate pathway, an experienced role and a senior role. They are a small editorial sample checked on 25 October 2026, not a representative survey or a live vacancy feed. Availability and requirements can change; use the linked employer page before applying.</p>
      <p className="text-sm">On a small screen, scroll the tables sideways to compare all columns.</p>
      <div className="overflow-x-auto" role="region" aria-label="Dated Australian employer examples" tabIndex={0}><table className="min-w-[640px]">
        <caption>Employer requirements and what they mean for your search</caption>
        <thead><tr><th scope="col">Employer and role</th><th scope="col">What the source says</th><th scope="col">How to use it</th></tr></thead>
        <tbody>{employerExamples.map(example => <tr key={example.employer}><th scope="row"><a href={example.href}>{example.employer}: {example.role}</a><br /><span className="font-normal">{example.location}</span></th><td>{example.requirements}</td><td>{example.takeaway}</td></tr>)}</tbody>
      </table></div>
      <p>For your own shortlist, save the employer, source URL, date checked, seniority, location, required versus preferred skills, qualifications, eligibility and closing date. Compare a manageable set of roles you could actually accept. A mandatory degree or clearance needs a different response from a preferred tool you could learn.</p>
      <h2 id="skills">3. Develop the skills your target roles ask for</h2>
      <p>Use this practice map to turn a skill name into something you can show. SQL, Python, modelling and communication appear in the employer examples above; the exercises below are MLAI’s suggestions for demonstrating them.</p>
      <div className="overflow-x-auto" role="region" aria-label="Data science skills and practice evidence" tabIndex={0}><table className="min-w-[640px]">
        <thead><tr><th scope="col">Skill</th><th scope="col">What to practise</th><th scope="col">Evidence to show</th></tr></thead>
        <tbody>
          <tr><th scope="row">SQL and data quality</th><td>Joins, aggregation, window functions, missing values and duplicate records.</td><td>A query with a small test fixture and reconciled totals; explain how you avoided counting a row twice.</td></tr>
          <tr><th scope="row">Python and reproducibility</th><td>Load, clean and explore data; organise functions and record dependencies.</td><td>A readable notebook or script another person can run from its README.</td></tr>
          <tr><th scope="row">Statistics and experimentation</th><td>Sampling, uncertainty, confounding and the distinction between association and causation.</td><td>A short analysis explaining what the data supports and what further evidence a decision needs.</td></tr>
          <tr><th scope="row">Machine learning and evaluation</th><td>Choose a baseline, metric and appropriate split; investigate errors and leakage.</td><td>Baseline and model results on the same evaluation cases, including a failure.</td></tr>
          <tr><th scope="row">Communication and domain knowledge</th><td>Define the decision, explain a chart and recommend a next step.</td><td>A one-page memo understandable to someone outside the project.</td></tr>
          <tr><th scope="row">Role-specific delivery</th><td>Use the cloud, dashboard or deployment tools named in your target roles.</td><td>For production roles, add tests, logging and a handover; for reporting roles, show a checked dashboard.</td></tr>
        </tbody>
      </table></div>
      <p>Study one gap at a time and apply it to the same small project. If preprocessing or model evaluation is new to you, the <a href="https://scikit-learn.org/stable/common_pitfalls.html">scikit-learn guide to common pitfalls</a> explains inconsistent preprocessing and data leakage.</p>
      <h2 id="portfolio-brief">4. Build a portfolio that explains your decisions</h2>
      <p>Give the reader a clear problem, permitted data, a reproducible method, a checked result and a limitation. A reporting project could reconcile totals and explain an operational trend. A modelling project should compare a simple baseline with a candidate model on the same held-out cases.</p>
      <p><strong>Worked example:</strong> MLAI’s synthetic workload exercise forecasts a fictional service team’s next fortnight. On its 14 evaluation days, the baseline MAE is <strong>{LAB.baselineMae.toFixed(1)} requests/day</strong> and the candidate MAE is <strong>{LAB.candidateMae.toFixed(1)} requests/day</strong>. The useful conclusion is that the more elaborate model loses on these cases. This demonstrates evaluation, not a saving achieved for a customer.</p>
      <p><a href={PORTFOLIO_TUTORIAL}>Open the full forecasting tutorial, runnable files and acceptance checklist</a>. The separate tutorial keeps the commands, recorded results and failure analysis together. It uses JavaScript to keep setup small; that choice is not a data science hiring requirement.</p>
      <ul>
        <li><strong>Explain the input:</strong> source, permission, units, missing values and exclusions.</li>
        <li><strong>Explain the evaluation:</strong> split, metric, baseline and a failure you investigated.</li>
        <li><strong>Make it reproducible:</strong> setup, versions, a permitted fixture and expected output.</li>
        <li><strong>Show your contribution:</strong> identify AI assistance, your changes and decisions you can defend.</li>
      </ul>
      <p>Ask a peer to follow the README and record feedback if that review occurs. Obtain permission before publishing client work. Add another project when it demonstrates a missing skill, rather than aiming for an arbitrary project count.</p>
      <h2 id="find-roles">5. Find suitable jobs and organise your applications</h2>
      <p>Search employer careers pages, <a href="https://www.seek.com.au/data-scientist-jobs">SEEK’s data scientist listings</a>, <a href="https://www.linkedin.com/jobs/">LinkedIn Jobs</a> and <a href="https://www.apsjobs.gov.au/">APS Jobs</a>. Students should also check their university careers service. Try adjacent titles such as graduate data analyst, BI analyst and analytics engineer, then read the duties rather than relying on the title.</p>
      <p>Track the role URL, closing date, mandatory conditions, evidence needed, application date, interview stage and feedback. Keep a copy of the advertisement so you can prepare if it disappears. Compare salary advertisements on the same basis: base pay, superannuation, hours and seniority. Ask whether quoted pay includes superannuation and which part of a range applies to your experience level.</p>
      <p>For local conversations, bring a specific project question to a relevant <Link to="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne AI event</Link> or <Link to="/events">MLAI session</Link>. A useful conversation can help you learn about the work; participation does not guarantee a referral or vacancy.</p>
      <h2 id="application">6. Write a CV and application around evidence</h2>
      <p>Follow the employer’s requested format and length. Put relevant skills, recent work or study and accessible project links where a reviewer can find them. For each selection criterion, connect a real example to the action you took, the result and your contribution. The <a href="https://www.apsc.gov.au/working-aps/joining-aps/cracking-code">Australian Public Service Commission’s application guide</a> is a useful starting point for APS recruitment.</p>
      <p><strong>Annotated example using the supplied synthetic lab:</strong></p>
      <blockquote>Evaluated a workload forecast on 14 synthetic daily observations; compared a seasonal baseline with a trend model, measured MAE of 1.5 versus 6.0 requests/day, and documented why the candidate should not be selected.</blockquote>
      <p>The sentence names the task, data type, comparison, metric and decision. It does not claim employment or commercial impact. Use this wording only after doing and understanding the work, and add what you personally changed. A real workplace example should use its actual result and permitted evidence.</p>
      <p>Before submitting, open your project links in a signed-out browser, check the requested attachments, and proofread employer and role names. Remove confidential data and credentials from repositories.</p>
      <h2 id="interviews">7. Prepare for technical and stakeholder interviews</h2>
      <p>Ask the recruiter about the assessment format, tools, time limit and permitted AI assistance. Prepare these exercises against the role description; individual employers use different selection processes.</p>
      <ul>
        <li><strong>SQL exercise:</strong> explain the table grain, join keys, duplicates and checks before presenting a total.</li>
        <li><strong>Data investigation:</strong> describe missingness, outliers and assumptions before choosing a model.</li>
        <li><strong>Modelling discussion:</strong> justify the metric and split, compare a baseline, and explain one failure.</li>
        <li><strong>Project walkthrough:</strong> practise a concise account of the question, your work, result, limitations and next step.</li>
        <li><strong>Stakeholder discussion:</strong> explain what decision the evidence supports and when you would gather more information.</li>
      </ul>
      <p>For a take-home, agree the scope and expected time commitment. Keep notes on assumptions and finish with reproducible instructions. Follow the employer’s AI-use rules and be ready to change or explain your solution without relying on generated explanations.</p>
      <h2 id="next-step">Your next steps</h2>
      <ol>
        <li>Shortlist suitable roles and identify the requirement for which you have the weakest evidence.</li>
        <li>Complete one bounded piece of work addressing that gap, with a README and a clear limitation.</li>
        <li>Practise explaining it, submit a tailored application and record what happens.</li>
        <li>Use actual feedback to decide whether to improve your evidence, broaden your search or pursue more study.</li>
      </ol>
      <h3 id="paid-projects">Already able to deliver a scoped project?</h3>
      <p><Link to="/mlai-studio/build-with-us">MLAI Studio accepts builder applications</Link> for assessment and potential matching. This is not an offer of an available contract. Paid work requires agreement on scope, acceptance tests, availability, payment and ownership; it is a separate commitment from completing a learning exercise.</p>

      <h2 id="method">Sources and editorial method</h2>
      <p>Updated 25 October 2026. We checked the linked INGRITY, Amazon and Zip employer pages to illustrate differences in level and requirements; we did not survey the Australian market or interview hiring managers. RMIT supports the study-pathway discussion, APSC supports the application guidance, and scikit-learn supports the evaluation advice. The synthetic lab’s original execution record remains dated 10 September 2026 in its tutorial.</p>
      <ArticleFAQ items={faqItems} />
      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
    </div>
  </div>;
}
