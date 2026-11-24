import { Home } from "lucide-react";
import { Link } from "react-router";
import AuthorBio from "~/components/AuthorBio";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ARTICLE_FALLBACK_IMAGE } from "../../registry";
import { getDefaultArticleAuthorDetails } from "../../authors";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "ai-jobs-australia-how-to-get-hired";
export const DATE_PUBLISHED = "2026-11-24";
export const DATE_MODIFIED = "2026-11-24";
const TITLE = "How to Get an AI Job in Australia: Skills, Roles and Where to Meet People";
export const DESCRIPTION = "How to get an AI job in Australia: which roles are hiring, the skills employers want, and a step-by-step plan using projects, hackathons and community.";
const HERO = ARTICLE_FALLBACK_IMAGE;
const HERO_ALT = "Illustrative image for a guide to getting an AI job in Australia";
const AUTHOR = getDefaultArticleAuthorDetails();
const f = (slug: string) => `/articles/featured/${slug}`;

export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: HERO_ALT };

export const roles = [
  { role: "AI / LLM engineer", work: "Build products on top of models: prompts, retrieval, agents, evaluation, deployment", start: "Already write software" },
  { role: "Machine learning engineer", work: "Train, ship and monitor models in production", start: "Have software plus some maths/stats" },
  { role: "Data scientist / analyst", work: "Turn data into decisions; increasingly uses AI tools", start: "Come from analytics, science or research" },
  { role: "AI automation / operations specialist", work: "Connect AI tools to business workflows, often with low-code tools", start: "Know a business domain well" },
  { role: "AI product manager", work: "Decide what to build, measure quality and risk", start: "Have product, design or consulting experience" },
  { role: "Research scientist", work: "Advance methods, usually in universities, CSIRO or larger labs", start: "Hold, or are completing, a research degree" },
] as const;

export const faqItems = [
  { question: "Do I need a degree to get an AI job in Australia?", answer: "Not always. Research roles usually expect a postgraduate degree. Many engineering, automation and product roles care more about shipped work and relevant experience." },
  { question: "Is AI engineering in demand in Australia?", answer: "Yes. LinkedIn's Jobs on the Rise 2026 ranked AI engineering first in Australia, and PwC found AI-skill job ads more than doubled in a year." },
  { question: "What's the fastest way to meet AI employers?", answer: "Go to local meetups and hackathons regularly and share what you're building. Repeated, useful contact builds referrals." },
];

const checklist = [
  "One target role chosen",
  "20 job ads reviewed and skills ranked",
  "Two or three finished, documented projects",
  "One hackathon or public demo",
  "Attending at least one AI event a month",
  "CV tailored to each role, with numbers",
];

export default function ArticlePage() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "AI jobs in Australia", current: true }]} title={TITLE} headerBgColor="cyan" heroImage={HERO} heroImageAlt={HERO_ALT} />
    <div className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_[role=region]]:scroll-mt-20" data-cf-article-body>
      <section aria-labelledby="short-answer" className="not-prose my-6 rounded-2xl border border-slate-300 bg-slate-50 p-5">
        <h2 id="short-answer" className="text-xl font-bold">Short answer</h2>
        <p className="mt-3">To get an AI job in Australia, pick one target role (for example AI engineer, data scientist, ML engineer or AI product/automation specialist), build two or three small public projects that solve real problems for that role, and put yourself in rooms where Australian AI teams hire. That means meetups, hackathons and community channels as well as job boards. Employers increasingly want people who pair technical skill with communication and judgement, so show both.</p>
      </section>
      <p>Demand is real. <a href="https://www.pwc.com.au/media/2026/2026-AI-Jobs-Barometer.html">PwC Australia&apos;s 2026 AI Jobs Barometer</a> reports that job ads seeking AI skills more than doubled in a year. LinkedIn&apos;s Jobs on the Rise 2026 list ranked AI engineering as the fastest-growing job in Australia, as reported by <a href="https://ia.acs.org.au/article/2026/ai-jobs-are-the-fastest-growing-in-australia.html">ACS Information Age</a>. But &ldquo;AI jobs Australia&rdquo; covers a wide range of work. This guide helps you choose a lane and get noticed.</p>

      <h2 id="ai-jobs-in-australia">What AI jobs exist in Australia?</h2>
      <p>Most AI job ads fall into a few groups. Choose the one closest to the skills you already have.</p>
      <div className="overflow-x-auto" role="region" aria-label="AI roles in Australia" tabIndex={0}><table className="min-w-[640px]">
        <thead><tr><th scope="col">Role</th><th scope="col">What you&apos;d do</th><th scope="col">Good starting point if you…</th></tr></thead>
        <tbody>{roles.map(item => <tr key={item.role}><th scope="row">{item.role}</th><td>{item.work}</td><td>{item.start}</td></tr>)}</tbody>
      </table></div>
      <p>Not every AI role needs deep coding. A July 2026 snapshot of Seek listings by 13Labs found most demand at mid-to-senior engineering level. It also found some of the fastest-emerging roles needed no coding at all.</p>

      <h2 id="skills">Which skills do Australian employers want?</h2>
      <p>Look for these three layers in job ads:</p>
      <ul>
        <li><strong>Core technical skills for your role.</strong> Engineering roles usually ask for Python, APIs, cloud (AWS, Google Cloud or Azure), Git and SQL. ML roles add statistics, model evaluation and MLOps.</li>
        <li><strong>Applied AI skills.</strong> These include working with large language models, retrieval (RAG), evaluating outputs, handling cost and latency, and spotting privacy or safety risks.</li>
        <li><strong>Human skills.</strong> These include explaining trade-offs, scoping problems and working with non-technical people. <a href="https://www.jobsandskills.gov.au/studies/generative-artificial-intelligence-capacity-study">Jobs and Skills Australia&apos;s Gen AI study</a> finds AI is more likely to augment work than replace it. It points to rising demand for digital literacy alongside critical thinking, communication and adaptability.</li>
      </ul>
      <p>If you&apos;re new to AI, the National AI Centre offers <a href="https://www.industry.gov.au/national-artificial-intelligence-centre/ai-skills-business">free introductory learning modules</a>. They&apos;re aimed at business use, which is helpful context for automation and product roles.</p>

      <h2 id="no-experience">How do you get an AI job with no AI experience?</h2>
      <p>You need evidence, not just certificates. Here&apos;s a practical path.</p>
      <h3 id="read-job-ads">1. Pick one role and read 20 job ads</h3>
      <p>Copy the requirements into a spreadsheet and count which skills appear most. That&apos;s your study list. It reflects real demand, not trending topics.</p>
      <h3 id="proof-projects">2. Build two or three &ldquo;proof&rdquo; projects</h3>
      <p>Make each project small, real and finished. A strong project:</p>
      <ul>
        <li>solves a problem someone actually has</li>
        <li>shows how you checked quality, such as a small test set or before-and-after comparison</li>
        <li>has a short README that explains your decisions and limits.</li>
      </ul>
      <p><strong>Example:</strong> Say you&apos;re an accountant moving into AI automation. You build an assistant that sorts receipts for a two-person business and test it on 30 fictional receipts. You record its accuracy, the time saved and every mistake it made. That beats a generic chatbot demo, because it shows judgement. MLAI&apos;s guide to <Link to={f("build-an-ai-personal-assistant-for-one-small-business-task")}>building an AI assistant for one small business task</Link> walks through this kind of pilot.</p>
      <h3 id="hackathon">3. Do a hackathon</h3>
      <p>Hackathons give you a team, a deadline and a demo, which is exactly what hiring managers want to see. They also put you beside working engineers and founders. See <Link to="/hackathons">current and upcoming MLAI hackathons</Link>, such as <Link to="/healthhack">HealthHack</Link>.</p>
      <h3 id="meet-people">4. Meet the people who hire</h3>
      <p>Many AI roles at Australian startups get filled through referrals before they&apos;re advertised. Go to meetups regularly, say what you&apos;re working on, and help others. MLAI&apos;s guide to <Link to={f("where-to-find-ai-events-in-melbourne")}>AI events in Melbourne</Link> and its <Link to={f("best-meetup-websites-for-ai-and-startup-communities-in-australia")}>comparison of meetup websites for Australian AI events</Link> are good places to start. You can also check the <Link to="/events">MLAI events calendar</Link>.</p>
      <h3 id="contribute">5. Contribute to a community</h3>
      <p>Answering questions, volunteering or giving a short demo builds a public track record. MLAI&apos;s article on <Link to={f("what-community-is-in-ai-and-why-it-is-more-than-a-group")}>what an AI community is and how to make your first contribution</Link> explains how. You can also <Link to="/volunteers">apply to volunteer</Link> or <Link to="/community">join MLAI Chat</Link>.</p>
      <h3 id="cv">6. Apply with a tailored, evidence-led CV</h3>
      <p>For each application, lead with the project closest to the role. Use numbers where you have them, such as &ldquo;cut manual triage from 2 hours to 20 minutes on test data&rdquo;.</p>

      <h2 id="where-to-find-ai-jobs">Where to find AI jobs in Australia</h2>
      <ul>
        <li><strong>Job boards:</strong> Seek, LinkedIn and Indeed. Search role titles (&ldquo;ML engineer&rdquo;, &ldquo;AI engineer&rdquo;) as well as &ldquo;AI&rdquo;.</li>
        <li><strong>Startup job boards and founder networks:</strong> Early-stage companies often hire through communities first.</li>
        <li><strong>Community channels and events:</strong> Meetups, hackathons and Slack groups like MLAI&apos;s.</li>
        <li><strong>Universities and CSIRO:</strong> These suit research roles and industry PhDs.</li>
      </ul>

      <h2 id="start-your-own">Should you start your own AI project instead?</h2>
      <p>Some people find the fastest way into AI is building something of their own. If that&apos;s you, read MLAI&apos;s guides to <Link to={f("a-practical-guide-for-australian-founders-building-an-ai-startup")}>validating an AI startup idea</Link> and <Link to={f("startups-in-melbourne-for-ai-builders-and-new-founders")}>starting an AI startup in Melbourne</Link>. Even if you later take a job, the experience counts.</p>

      <h2 id="checklist">Quick checklist</h2>
      <ul className="list-none pl-0">
        {checklist.map(item => <li key={item} className="pl-0"><span aria-hidden="true">☐ </span>{item}</li>)}
      </ul>

      <ArticleFAQ items={faqItems} heading="FAQ" />

      <p><strong>Ready to start?</strong> Check the <Link to="/events">MLAI events calendar</Link> and come say hello.</p>
      <AuthorBio author={{ name: AUTHOR.name, role: AUTHOR.role ?? AUTHOR.credentials, bio: AUTHOR.bio, avatarUrl: AUTHOR.avatarUrl }} />
    </div>
  </div>;
}
