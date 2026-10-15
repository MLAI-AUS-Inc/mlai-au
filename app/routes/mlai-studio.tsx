import { useEffect, type ReactNode } from "react";
import {
  Link,
  useNavigate,
  type LinksFunction,
  type MetaFunction,
} from "react-router";
import StudioBuilders from "~/components/studio/StudioBuilders";
import "~/styles/studio-landing.css";

const PAGE_URL = "https://mlai.au/mlai-studio";
const DESCRIPTION =
  "Hand over the busywork to MLAI Studio. Our Australian builders create AI tools, automations and software for your business. Book a free 15-minute chat with Dr Sam.";
const BOOKING_LINK = "https://calendar.app.google/91oVdg4nRaZgEZ9h6";
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
function ProductScreenshot({
  src,
  alt,
  title,
  caption,
  width = 1918,
  height = 1078,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="studio-product-screen">
      <div className="studio-screen-bar" aria-hidden="true">
        <span className="studio-screen-dots"><i /><i /><i /></span>
        <span>MLAI / Vibe Raising</span>
        <span>✳</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
const STEPS = [
  {
    stage: "Kickoff",
    theme: "kickoff",
    title: "Talk it through.",
    body: "Tell us what happens now and what you’d like to change. You can share your screen if that’s easier than explaining it.",
  },
  {
    stage: "Scope",
    theme: "scope",
    title: "Agree on the work.",
    body: "We’ll write down what we’re building, what it should do and the price. You can check the proposal before committing.",
  },
  {
    stage: "Build",
    theme: "build",
    title: "Try it as we build.",
    body: "You’ll see work in progress and have a chance to test it. Your project lead handles the planning and keeps you updated.",
  },
  {
    stage: "Launch",
    theme: "launch",
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
    label = "Book a Free chat with Dr Sam",
  }: {
    dark?: boolean;
    label?: string;
  }) {
    return (
      <a
        href={BOOKING_LINK}
        className={`btn ${dark ? "btn--ink" : "btn--hot"} studio-book`}
      >
        {label}
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
            <img
              src="/mlai-studio/studio-logo.png"
              alt="MLAI Studio"
              width="2172"
              height="724"
            />
          </Link>
          <nav aria-label="Studio">
            <a href="#work">Work</a>
            <a href="#how-it-works">How it works</a>
            <a href="#people">Team</a>
            <a href="#pricing">Pricing</a>
          </nav>
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
              </div>
            </div>
            <StudioBuilders />
          </section>
          <section
            id="work"
            className="pk-section band-ink studio-section studio-work"
            aria-labelledby="work-title"
          >
            <SectionLabel number="01">Testimonial &amp; work</SectionLabel>
            <div className="studio-section-intro">
              <h2 id="work-title" className="disp studio-heading-fit studio-heading-fit--long">
                <span className="studio-heading-line">People you can trust.</span>
                <span className="studio-heading-line">Work you can see.</span>
              </h2>
              <p>
                Read a client’s feedback, then see examples of software we’ve
                built for the MLAI community. The projects below are MLAI’s own
                tools.
              </p>
            </div>
            <article
              id="client-feedback"
              className="studio-client-story"
              aria-labelledby="client-feedback-title"
            >
              <div className="studio-client-attribution">
                <span className="studio-client-portrait">
                  <img
                    src="/mlai-studio/clients/mark-ghiasy.jpg"
                    alt="Mark Ghiasy"
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div className="studio-client-name">
                  <strong>Mark Ghiasy</strong>
                  <span>MLAI Studio client</span>
                </div>
              </div>
              <div className="studio-client-story-copy">
                <span className="studio-client-story-label">CLIENT FEEDBACK SUMMARY</span>
                <h3 id="client-feedback-title" className="studio-client-feedback">
                  Confidence to hand it over.
                </h3>
                {/* Client-team summary, not a direct quote or confidential project account. */}
                <p className="studio-client-summary">
                  Mark feels confident putting his projects in MLAI Studio’s
                  hands. We take that trust seriously.
                </p>
                <div className="studio-client-assurance">
                  <h4>What you can count on from Studio</h4>
                  <ul>
                    <li>The scope and price agreed before we begin.</li>
                    <li>A project lead you can turn to with questions.</li>
                    <li>Work you can review and test as we build.</li>
                  </ul>
                </div>
              </div>
            </article>
            <Link to="/vibe-raising" className="studio-project-link" aria-label="Explore Vibe Raising">
              <article className="studio-project-showcase" aria-labelledby="vibe-raising-project-title">
                <div className="studio-showcase-meta">
                  <span className="studio-project-number" aria-hidden="true">01</span>
                  <p className="studio-project-name">VIBE RAISING</p>
                  <span className="pill pill--teal">Built for MLAI</span>
                </div>
                <header className="studio-project-header">
                  <h3 id="vibe-raising-project-title" className="disp studio-heading-fit studio-heading-fit--long">
                    <span className="studio-heading-line">Writing the monthly</span>
                    <span className="studio-heading-line">investor update.</span>
                  </h3>
                  <p>
                    A place for founders to turn scattered figures and notes into
                    an update they can check before sharing.
                  </p>
                </header>
                <div className="studio-product-gallery" aria-label="Vibe Raising project screenshots">
                  <ProductScreenshot
                    src="/mlai-studio/work/vibe-raising-landing.webp"
                    alt="Vibe Raising public landing page with a founder photograph, investor-update introduction and illustrative monthly update"
                    title="Vibe Raising · Landing page"
                    caption="The first impression, with an illustrative investor update."
                    width={2557}
                    height={1438}
                  />
                  <ProductScreenshot
                    src="/mlai-studio/work/vibe-raising-dashboard.webp"
                    alt="MLAI's Vibe Raising monthly-update dashboard showing update creation, key figures and the current monthly update"
                    title="Vibe Raising · Monthly updates"
                    caption="The dashboard for preparing and reviewing monthly updates."
                  />
                  <ProductScreenshot
                    src="/mlai-studio/work/vibe-raising-process.webp"
                    alt="Vibe Raising landing page showing its investor connection pathway and draft, connect and review steps"
                    title="Vibe Raising · How it works"
                    caption="The product’s investor connection pathway and update steps."
                    width={2557}
                    height={1438}
                  />
                </div>
                <dl className="studio-project-story">
                  <div>
                    <dt><span aria-hidden="true">01</span> The problem</dt>
                    <dd>
                      Before sending an investor update, a founder has to pull
                      figures and notes from several tools.
                    </dd>
                  </div>
                  <div>
                    <dt><span aria-hidden="true">02</span> What we built</dt>
                    <dd>
                      Vibe Raising brings that material into a draft the founder
                      can edit.
                    </dd>
                  </div>
                  <div>
                    <dt><span aria-hidden="true">03</span> Before sending</dt>
                    <dd>
                      The founder checks the numbers and adds missing context
                      before publishing.
                    </dd>
                  </div>
                </dl>
              </article>
            </Link>
            <div className="studio-other-work">
              <Link to="/founder-tools/marketing" className="studio-project-link" aria-label="Explore Vibe Marketing">
                <article className="studio-project-card studio-project-card--marketing">
                  <span className="studio-project-number" aria-hidden="true">02</span>
                  <span className="studio-service-index">
                    BUILT FOR MLAI
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
              </Link>
              <Link to="/watt-the-hack" className="studio-project-link" aria-label="Explore Watt the Hack">
                <article className="studio-project-card studio-project-card--hack">
                  <span className="studio-project-number" aria-hidden="true">03</span>
                  <span className="studio-service-index">
                    BUILT FOR MLAI
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
              </Link>
            </div>
          </section>
          <section
            id="how-it-works"
            className="studio-section studio-process"
            aria-labelledby="process-title"
          >
            <SectionLabel number="02">How it works</SectionLabel>
            <h2 id="process-title" className="disp studio-heading-fit">
              <span className="studio-heading-line">How we get a</span>
              <span className="studio-heading-line">project underway.</span>
            </h2>
            <p className="studio-process-intro">
              A clear process from the first conversation to delivery, with work
              you can review along the way.
            </p>
            <ol className="studio-steps">
              {STEPS.map((step) => (
                <li key={step.title} data-phase={step.theme}>
                  <h3 className="studio-step-stage">{step.stage}</h3>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
          <section
            id="people"
            className="pk-section studio-section studio-people"
            aria-labelledby="people-title"
          >
            <SectionLabel number="03">Project team</SectionLabel>
            <div className="studio-people-grid">
              <div>
                <h2 id="people-title" className="disp studio-heading-fit">
                  <span className="studio-heading-line">Meet your</span>
                  <span className="studio-heading-line">project team.</span>
                </h2>
                <p>
                  A typical team is a project manager and two builders: a UX
                  designer and an AI engineer. We’ll find the best fit for your
                  project.
                </p>
                <dl className="studio-team-roles">
                  <div>
                    <dt>Project manager</dt>
                    <dd>
                      Dr Sam plans the work, keeps you updated and is your point of
                      contact for questions or changes.
                    </dd>
                  </div>
                  <div>
                    <dt>UX designer</dt>
                    <dd>
                      Designs the experience and screens so the software is
                      clear and easy to use.
                    </dd>
                  </div>
                  <div>
                    <dt>AI engineer</dt>
                    <dd>
                      Builds the AI features, connects your tools and helps you
                      test the software.
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="studio-person">
                <img
                  src="/press-kit/team-sam-donegan.png"
                  alt="Dr Sam Donegan"
                  width="128"
                  height="128"
                  loading="lazy"
                />
                <div className="studio-person-copy">
                  <span className="studio-service-index">
                    MLAI PRESIDENT · YOUR PROJECT MANAGER
                  </span>
                  <h3 className="disp">Dr Sam Donegan</h3>
                  <p>
                    Dr Sam brings together the right builders for your project and
                    keeps the work on track. He’s the person you’ll speak to
                    about getting started.
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
            <div className="studio-pricing-intro">
              <SectionLabel number="04">Pricing</SectionLabel>
              <h2 id="pricing-title" className="disp studio-heading-fit">
                <span className="studio-heading-line">A month</span>
                <span className="studio-heading-line">with Studio.</span>
              </h2>
              <p>
                You’ll get a proposal showing what we’ll work on and how the
                hours will be used.
              </p>
            </div>
            <div className="studio-pricing-grid">
              <article className="studio-price-card studio-price-card--standard" aria-labelledby="studio-standard-title">
                <h3 id="studio-standard-title" className="studio-price-plan">Standard</h3>
                <div className="studio-price"><span>A$</span>7,640</div>
                <p className="studio-price-tax">per month + GST</p>
                <h4 className="studio-price-hours">40 builder hours per month</h4>
                <p className="studio-price-summary">
                  For a defined project or steady monthly progress.
                </p>
                <ul className="studio-price-features">
                  <li>Design and AI engineering</li>
                  <li>Project management with Dr Sam</li>
                  <li>Work to review as we build</li>
                </ul>
                <BookingButton dark label="Discuss the Standard plan" />
              </article>
              <article className="studio-price-card studio-price-card--plus" aria-labelledby="studio-plus-title">
                <h3 id="studio-plus-title" className="studio-price-plan">Larger projects</h3>
                <div className="studio-price"><span>A$</span>14,780</div>
                <p className="studio-price-tax">per month + GST</p>
                <h4 className="studio-price-hours">80 builder hours per month</h4>
                <p className="studio-price-summary">
                  For more demanding projects that need more building time.
                </p>
                <ul className="studio-price-features">
                  <li>Twice the builder hours</li>
                  <li>Design and AI engineering</li>
                  <li>Project management with Dr Sam</li>
                </ul>
                <BookingButton dark label="Discuss a larger project" />
              </article>
              <article className="studio-price-card studio-price-card--free" aria-labelledby="studio-free-title">
                <h3 id="studio-free-title" className="studio-price-plan">Let’s talk</h3>
                <div className="studio-price">Free</div>
                <p className="studio-price-tax">No cost. No commitment.</p>
                <h4 className="studio-price-hours">15 minutes with Dr Sam</h4>
                <p className="studio-price-summary">
                  Bring your idea, questions or a project that needs a clearer plan.
                </p>
                <ul className="studio-price-features">
                  <li>Talk through your project</li>
                  <li>Find the right team and scope</li>
                  <li>Agree on the next steps</li>
                </ul>
                <BookingButton dark label="Talk to Dr Sam" />
              </article>
            </div>
            <div className="studio-price-notes">
              <p>
                Scoping, meetings, testing and coordination may count towards
                the builder hours. Your proposal sets out the allocation.
              </p>
              <p>
                Hosting, AI usage and paid software are extra unless your
                proposal includes them.
              </p>
              <Link to="/terms#studio-builder-hours">
                Studio terms
              </Link>
            </div>
          </section>
          <section
            id="questions"
            className="pk-section studio-section studio-faq"
            aria-labelledby="faq-title"
          >
            <div>
              <SectionLabel number="05">FAQ</SectionLabel>
              <h2 id="faq-title" className="disp studio-heading-fit">
                <span className="studio-heading-line">Common</span>
                <span className="studio-heading-line">questions.</span>
              </h2>
              <p>Bring your questions to your free 15-minute chat with Dr Sam.</p>
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
              <h2 id="contact-title" className="disp studio-heading-fit">
                <span className="studio-heading-line">Tell us what needs</span>
                <span className="studio-heading-line">sorting out.</span>
              </h2>
              <p>
                Pick a time for a free 15-minute chat with Dr Sam. Bring the task
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
