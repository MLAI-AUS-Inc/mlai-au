import { useEffect, type ReactNode } from "react";
import {
  Link,
  useNavigate,
  type LinksFunction,
  type MetaFunction,
} from "react-router";
import StudioWorkPreview from "~/components/studio/StudioWorkPreview";
import StudioBuilders from "~/components/studio/StudioBuilders";
import "~/styles/studio-landing.css";

const PAGE_URL = "https://mlai.au/mlai-studio";
const DESCRIPTION =
  "Hand over the busywork to MLAI Studio. Our Australian builders create AI tools, automations and software for your business. Book a free 15-minute chat with Sam.";
const BOOKING_LINK = "https://calendar.app.google/91oVdg4nRaZgEZ9h6";
const SHOW_CLIENT_FEEDBACK = false;
const FAQS = [
  {
    q: "Do I need to know what I want built?",
    a: "No. You can show us a task that takes too long, or describe an idea. We’ll work out with you whether there’s a project worth doing.",
  },
  {
    q: "Why not just use an existing AI tool?",
    a: "You might not need a custom build. We’ll check what your existing tools can do first. New software is an option when those tools can’t do the job or need to work together.",
  },
  {
    q: "Can you work with the software we already use?",
    a: "We’ll check how your software can connect to other systems and what access we’d need. That tells us what’s possible before we quote.",
  },
  {
    q: "What about sensitive data?",
    a: "Tell us what restrictions apply before sending any sensitive data. The proposal will set out who can access it and where it will be processed and stored. If it must stay in Australia, raise that in the first conversation.",
  },
  {
    q: "Who owns the code and accounts?",
    a: "After full payment, you own the work made specifically for you, unless your agreement says otherwise. MLAI keeps ownership of its pre-existing tools, reusable components and other background IP. Third-party software has its own licences. We agree account access, billing and handover in the proposal.",
  },
  {
    q: "What happens after launch?",
    a: "We’ll agree how the software is handed over and whether you need ongoing support. Maintenance and further changes are quoted separately unless your agreement includes them.",
  },
  {
    q: "How long will it take?",
    a: "We can give you a timeline once we’ve looked at the scope and the systems involved. The proposal includes milestones so you know when to expect work to review.",
  },
];
export const meta: MetaFunction = () => [
  { title: "MLAI Studio | AI & software for your business" },
  { name: "description", content: DESCRIPTION },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { tagName: "link", rel: "canonical", href: PAGE_URL },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "MLAI" },
  { property: "og:url", content: PAGE_URL },
  {
    property: "og:title",
    content: "MLAI Studio | AI & software for your business",
  },
  { property: "og:description", content: DESCRIPTION },
  {
    property: "og:image",
    content: "https://mlai.au/mlai-studio/community-working.jpg",
  },
  {
    property: "og:image:alt",
    content:
      "MLAI community participants building together at the Green Battery Hack",
  },
  { property: "og:locale", content: "en_AU" },
  { name: "twitter:card", content: "summary_large_image" },
  {
    name: "twitter:title",
    content: "MLAI Studio | AI & software for your business",
  },
  { name: "twitter:description", content: DESCRIPTION },
  {
    name: "twitter:image",
    content: "https://mlai.au/mlai-studio/community-working.jpg",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${PAGE_URL}#webpage`,
          url: PAGE_URL,
          name: "MLAI Studio",
          description: DESCRIPTION,
          inLanguage: "en-AU",
        },
        {
          "@type": "Service",
          "@id": `${PAGE_URL}#service`,
          name: "MLAI Studio",
          serviceType: "AI automation and custom software development",
          description: DESCRIPTION,
          areaServed: "Australia",
          provider: {
            "@type": "Organization",
            name: "MLAI",
            url: "https://mlai.au",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ],
    },
  },
];
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@1,8..60,400..600&display=swap",
  },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="studio-arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="eyebrow studio-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
function WorkIllustration({ kind }: { kind: "paper" | "knowledge" | "idea" }) {
  return (
    <div
      className={`studio-drawing studio-drawing--${kind}`}
      aria-hidden="true"
    >
      {kind === "paper" && (
        <>
          <div className="studio-paper-back" />
          <div className="studio-paper">
            <small>THINGS TO CHASE</small>
            <span className="studio-crossed">The attachment</span>
            <span className="studio-crossed">The follow-up</span>
            <span className="studio-crossed">The other attachment</span>
            <strong>Documents received.</strong>
          </div>
          <span className="studio-drawing-stamp">DONE ✓</span>
        </>
      )}
      {kind === "knowledge" && (
        <>
          <div className="studio-file-tabs">
            <span>Proposals</span>
            <span>Policies</span>
            <span>Team handbook</span>
          </div>
          <div className="studio-answer">
            <small>DOCUMENT SEARCH</small>
            <strong>
              Answer found in
              <br />
              Team handbook
            </strong>
            <span>↳ Open the document</span>
          </div>
        </>
      )}
      {kind === "idea" && (
        <>
          <div className="studio-notebook">
            <small>PORTAL SKETCH</small>
            <div />
            <div />
            <div />
            <span>Customer portal</span>
          </div>
          <span className="studio-sketch-arrow">↗</span>
          <div className="studio-mini-app">
            <span>YOUR FIRST VERSION</span>
            <div className="studio-mini-app-lines">
              <i />
              <i />
              <i />
            </div>
            <strong>Ready to try ↗</strong>
          </div>
        </>
      )}
    </div>
  );
}
const STEPS = [
  {
    title: "Talk it through.",
    body: "Tell us what happens now and what you’d like to change. You can share your screen if that’s easier than explaining it.",
  },
  {
    title: "Agree on the work.",
    body: "We’ll write down what we’re building, what it should do and the price. You can check the proposal before committing.",
  },
  {
    title: "Try it as we build.",
    body: "You’ll see work in progress and have a chance to test it. Your project lead handles the planning and keeps you updated.",
  },
  {
    title: "Handover.",
    body: "We show your team how to use the software and agree who’ll look after it. Any ongoing support is set out in the proposal.",
  },
];

export default function MlaiStudio() {
  const navigate = useNavigate();
  useEffect(() => {
    const routeLegacyApply = () => {
      if (window.location.hash === "#apply")
        navigate("/mlai-studio/build-with-us#apply", { replace: true });
    };
    routeLegacyApply();
    window.addEventListener("hashchange", routeLegacyApply);
    return () => window.removeEventListener("hashchange", routeLegacyApply);
  }, [navigate]);
  function BookingButton({
    dark = false,
  }: {
    dark?: boolean;
  }) {
    return (
      <a
        href={BOOKING_LINK}
        className={`btn ${dark ? "btn--ink" : "btn--hot"} studio-book`}
      >
        Book a Free chat with Sam
        <Arrow />
      </a>
    );
  }
  return (
    <div className="pk-scope studio-page">
      <div className="studio-shell">
        <a className="studio-skip" href="#studio-content">
          Skip to content
        </a>
        <header className="studio-nav">
          <Link
            to="/mlai-studio"
            className="studio-wordmark"
            aria-label="MLAI Studio home"
          >
            <img src="/press-kit/roo-icon.png" alt="" width="44" height="44" />
            <span>
              MLAI <b>STUDIO</b>
            </span>
          </Link>
          <nav aria-label="Studio">
            <a href="#work">Work</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#people">About</a>
          </nav>
          <BookingButton dark />
        </header>
        <main id="studio-content">
          <section
            className="studio-hero pk-hero-box band-ink"
            aria-labelledby="studio-title"
          >
            <div className="studio-hero-grid">
              <div className="studio-hero-copy">
                <h1 id="studio-title" className="disp">
                  Hand us the hard stuff.
                  <span>We'll sort it out.</span>
                </h1>
                <p className="studio-hero-summary">
                  The admin. The disconnected systems. The AI workflow. The app
                  you've been meaning to build. Whatever's slowing your business
                  down, our Australian AI and software builders will take it from here.
                </p>
                <div className="studio-actions">
                  <BookingButton />
                </div>
                <p className="studio-reassurance">
                  15 minutes. No brief needed. No commitment.
                </p>
              </div>
            </div>
            <StudioBuilders />
          </section>
          {SHOW_CLIENT_FEEDBACK && (
          <section id="client-feedback" className="studio-client-proof studio-section"
            aria-labelledby="client-feedback-title">
            <div className="studio-client-proof-intro">
              <p className="eyebrow">TRUSTED TO TAKE IT FROM HERE</p>
              <h2 id="client-feedback-title" className="disp">Your to-do list.<br /><span>In good hands.</span></h2>
              <p>A team you can hand work to, with a clear scope, a project lead and work you can review along the way.</p>
            </div>
            <article className="studio-client-story" aria-label="Client feedback from Mark Ghiasy">
              <span className="studio-client-story-label">CLIENT FEEDBACK</span>
              {/* Summary supplied by the client team; not a verbatim quotation. */}
              <p className="studio-client-feedback">Mark Ghiasy feels confident handing projects over to MLAI Studio.</p>
              <div className="studio-client-attribution">
                <span className="studio-client-monogram" aria-hidden="true">MG</span>
                <div><strong>Mark Ghiasy</strong><span>MLAI Studio client</span></div>
                <span className="studio-client-mark" aria-hidden="true">↗</span>
              </div>
            </article>
          </section>
          )}
          <section
            id="help"
            className="studio-services studio-section"
            aria-labelledby="help-title"
          >
            <SectionLabel number="01">What we do</SectionLabel>
            <div className="studio-section-intro">
              <h2 id="help-title" className="disp">
                Jobs you can
                <br />
                hand over.
              </h2>
              <p>
                Show us the process you’d like to change. We’ll check whether
                your current software can do the job before suggesting a custom
                build.
              </p>
            </div>
            <article className="studio-service-row">
              <WorkIllustration kind="paper" />
              <div>
                <span className="studio-service-index">A / AUTOMATION</span>
                <h3 className="disp">
                  Stop copying it
                  <br />
                  between systems.
                </h3>
                <p>
                  An enquiry arrives by email, someone adds it to the CRM, then
                  chases the missing paperwork. We can connect those steps and
                  leave anything that needs judgement with your team.
                </p>
                <span className="studio-examples">
                  Enquiries · Document collection · CRM updates
                </span>
              </div>
            </article>
            <article className="studio-service-row">
              <WorkIllustration kind="knowledge" />
              <div>
                <span className="studio-service-index">
                  B / SEARCH & KNOWLEDGE
                </span>
                <h3 className="disp">
                  Find the answer
                  <br />
                  in your own files.
                </h3>
                <p>
                  When the answer is buried in an old proposal, searching for it
                  can take longer than the job itself. We build search tools and
                  assistants that draw on your company’s documents and show
                  their sources.
                </p>
                <span className="studio-examples">
                  Knowledge assistants · Document search · Sourced drafts
                </span>
              </div>
            </article>
            <article className="studio-service-row">
              <WorkIllustration kind="idea" />
              <div>
                <span className="studio-service-index">
                  C / APP DEVELOPMENT
                </span>
                <h3 className="disp">
                  Build the app
                  <br />
                  you have in mind.
                </h3>
                <p>
                  You might have a sketch for a customer portal or a spreadsheet
                  that’s become hard to manage. We can help decide what the
                  first version needs, then build it for people to try.
                </p>
                <span className="studio-examples">
                  Prototypes · Web & mobile apps · Internal tools
                </span>
              </div>
            </article>
          </section>
          <section
            id="work"
            className="pk-section band-ink studio-section studio-work"
            aria-labelledby="work-title"
          >
            <SectionLabel number="02">Built for our own community</SectionLabel>
            <div className="studio-section-intro">
              <h2 id="work-title" className="disp">
                Software
                <br />
                we’ve built.
              </h2>
              <p>
                These are MLAI’s own tools. See the work below, starting
                with how Vibe Raising helps a founder prepare an investor
                update.
              </p>
            </div>
            <div className="studio-featured-work">
              <div className="studio-featured-copy">
                <span className="pill pill--teal">Built for MLAI</span>
                <p className="studio-project-name">VIBE RAISING</p>
                <h3 className="disp">
                  Writing the
                  <br />
                  monthly
                  <br />
                  investor update.
                </h3>
                <dl>
                  <div>
                    <dt>The problem</dt>
                    <dd>
                      Before sending an investor update, a founder has to pull
                      figures and notes from several tools.
                    </dd>
                  </div>
                  <div>
                    <dt>What we built</dt>
                    <dd>
                      Vibe Raising brings that material into a draft the founder
                      can edit.
                    </dd>
                  </div>
                  <div>
                    <dt>Before sending</dt>
                    <dd>
                      The founder checks the numbers and adds missing context.
                      The example shows why that review matters.
                    </dd>
                  </div>
                </dl>
              </div>
              <StudioWorkPreview />
            </div>
            <div className="studio-other-work">
              <article>
                <span className="studio-service-index">
                  BUILT FOR MLAI / 02
                </span>
                <h3 className="disp">
                  Vibe Marketing
                </h3>
                <p>
                  Helps founders research article topics and review drafts
                  before publishing.
                </p>
                <span className="studio-project-detail">
                  Content workflows · Founder Tools
                </span>
              </article>
              <article>
                <span className="studio-service-index">
                  BUILT FOR MLAI / 03
                </span>
                <h3 className="disp">
                  Watt the Hack
                </h3>
                <p>
                  Hackathon teams can find their challenge, use the energy
                  sandbox and submit their project.
                </p>
                <span className="studio-project-detail">
                  Team tools · Submissions · Energy sandbox
                </span>
              </article>
            </div>
          </section>
          <section
            id="how-it-works"
            className="studio-section studio-process"
            aria-labelledby="process-title"
          >
            <SectionLabel number="03">How it works</SectionLabel>
            <h2 id="process-title" className="disp">
              How we get
              <br />
              a project
              <br />
              underway.
            </h2>
            <ol className="studio-steps">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <span className="studio-step-number">
                    0{i + 1}
                    <span aria-hidden="true">{i < 3 ? "→" : "✓"}</span>
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <aside className="studio-update-example">
              <div>
                <span className="studio-service-index">
                  EXAMPLE PROJECT EMAIL
                </span>
                <h3 className="disp">
                  Here’s what
                  <br />
                  an update
                  <br />
                  might look like.
                </h3>
                <span className="studio-example-label">
                  During a document-upload project
                </span>
              </div>
              <dl>
                <div>
                  <dt>This week</dt>
                  <dd>You can now upload a document in the test version.</dd>
                </div>
                <div>
                  <dt>We need from you</dt>
                  <dd>Please send two sample files for us to test.</dd>
                </div>
                <div>
                  <dt>Next</dt>
                  <dd>We’ll review the first draft with you.</dd>
                </div>
              </dl>
            </aside>
          </section>
          <section
            id="people"
            className="pk-section studio-section studio-people"
            aria-labelledby="people-title"
          >
            <SectionLabel number="04">Who you’ll work with</SectionLabel>
            <div className="studio-people-grid">
              <div>
                <h2 id="people-title" className="disp">
                  Meet your
                  <br />
                  project team.
                  <br />
                  <span>
                    It starts
                    <br />
                    with Sam.
                  </span>
                </h2>
                <p>
                  Sam will talk through the project with you and help choose a
                  builder with the experience it needs.
                </p>
                <p>
                  A project lead coordinates the work. You’ll know who to
                  contact when you have a question or need to change something.
                </p>
              </div>
              <div className="studio-person">
                <img
                  src="/press-kit/team-sam-donegan.png"
                  alt="Sam Donegan"
                  width="340"
                  height="348"
                  loading="lazy"
                />
                <div className="studio-person-copy">
                  <span className="studio-service-index">
                    TECHNICAL OVERSIGHT
                  </span>
                  <h3 className="disp">Sam Donegan</h3>
                  <p>
                    Sam helps decide what to build and reviews the technical
                    work. He’s also the person you’ll speak to about getting
                    started.
                  </p>
                  <BookingButton dark />
                </div>
              </div>
            </div>
            <div className="studio-community-line">
              <img
                src="/press-kit/mascot-teal.png"
                alt=""
                width="64"
                height="64"
                loading="lazy"
              />
              <p>
                <strong>Studio is part of MLAI.</strong>
                <br />
                We’re an Australian not-for-profit AI community. Studio’s
                project work is a paid service.
              </p>
            </div>
          </section>
          <section
            id="pricing"
            className="studio-section studio-pricing"
            aria-labelledby="pricing-title"
          >
            <div>
              <SectionLabel number="05">Pricing</SectionLabel>
              <h2 id="pricing-title" className="disp">
                A month
                <br />
                with Studio.
              </h2>
              <p>
                You’ll get a proposal showing what we’ll work on and how the
                hours will be used.
              </p>
              <div className="studio-defined-build">
                <h3>Need a quote for one project?</h3>
                <p>Talk it through with Sam. We’ll agree the scope and put together a proposal before any paid work begins.</p>
              </div>
            </div>
            <div className="studio-price-card">
              <span className="studio-service-index">
                MONTHLY STUDIO PACKAGE
              </span>
              <div className="studio-price">
                <span>A$</span>7,640
              </div>
              <p className="studio-price-tax">per month + GST</p>
              <h3>40 builder hours per month</h3>
              <p>
                The package includes a builder, project coordination and
                technical review.
              </p>
              <BookingButton dark />
              <div className="studio-price-notes">
                <p>
                  Scoping, meetings, testing and coordination may count towards
                  the 40 hours. Your proposal sets out the allocation.
                </p>
                <p>
                  Hosting, AI usage and paid software are extra unless your
                  proposal includes them.
                </p>
                <Link to="/terms#studio-builder-hours">
                  Studio terms <Arrow diagonal />
                </Link>
              </div>
            </div>
          </section>
          <section
            id="questions"
            className="pk-section studio-section studio-faq"
            aria-labelledby="faq-title"
          >
            <div>
              <SectionLabel number="06">Before we start</SectionLabel>
              <h2 id="faq-title" className="disp">
                Common
                <br />
                questions.
              </h2>
              <p>Bring your questions to your free 15-minute chat with Sam.</p>
            </div>
            <div className="studio-questions">
              {FAQS.map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section
            id="contact"
            className="studio-section studio-final band-ink"
            aria-labelledby="contact-title"
          >
            <div>
              <SectionLabel number="07">Contact</SectionLabel>
              <h2 id="contact-title" className="disp">
                Tell us
                <br />
                what needs
                <br />
                <span>sorting out.</span>
              </h2>
              <p>
                Pick a time for a free 15-minute chat with Sam. Bring the task
                you want off your plate; we’ll talk through where to start.
              </p>
              <BookingButton />
              <p className="studio-reassurance">
                There’s no charge for the call and no commitment to a project.
              </p>
            </div>
            <img
              src="/press-kit/mascot-teal.png"
              alt="Roo, the MLAI mascot"
              width="260"
              height="260"
              loading="lazy"
            />
          </section>
        </main>
        <div className="studio-signoff">
          <span>MLAI STUDIO · AUSTRALIA</span>
          <span>AI and software development</span>
        </div>
      </div>
    </div>
  );
}
