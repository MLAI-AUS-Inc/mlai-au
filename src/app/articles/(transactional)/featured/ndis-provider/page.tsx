import React from 'react';

export default function NdisProviderArticle() {
  const updated = '2025-12-09';

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an NDIS provider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An NDIS provider is an individual or organisation that delivers supports funded by the National Disability Insurance Scheme (NDIS). Providers can be registered with the NDIS Quality and Safeguards Commission or operate unregistered, depending on the supports provided and how a participant manages their plan.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I have to use a registered NDIS provider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Participants with NDIA-managed plans must use registered providers. Participants who are plan-managed or self-managed can use unregistered providers (with some exceptions like certain high-risk supports).'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I become a registered NDIS provider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Decide the registration groups you will deliver, create a PRODA account, apply via the NDIS Commission portal, complete a self-assessment, engage an approved quality auditor (verification or certification), implement policies and systems, complete the audit, and maintain ongoing compliance.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can NDIS providers charge above price limits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, for supports covered by the NDIS Pricing Arrangements and Price Limits, registered providers cannot charge above the price limits. Some supports have quotes or flexible pricing rules—always check the latest Pricing Arrangements.'
        }
      },
      {
        '@type': 'Question',
        name: 'What should be in an NDIS service agreement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Scope of supports, rates and billing rules, cancellation terms, travel charging approach, start/end dates, responsibilities of both parties, how to change or end services, complaints and incident processes, and participant consent for sharing information as required.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a service booking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A service booking is a reservation of NDIS funding for an NDIA-managed participant created in the myplace provider portal, so a registered provider can deliver and claim for specific supports.'
        }
      },
      {
        '@type': 'Question',
        name: 'How are cancellations billed under the NDIS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Short-notice cancellation rules allow providers to claim a portion (often up to 100%) of the agreed fee when a participant cancels within a defined window. Exact rules vary by support type and are updated periodically—check the current Pricing Arrangements.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are reportable incidents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Death, serious injury, abuse or neglect, unlawful sexual or physical contact or assault, sexual misconduct, and unauthorised restrictive practices. Certain incidents must be notified to the NDIS Commission within mandatory timeframes.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between verification and certification audits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verification is for lower risk supports (e.g., some therapeutic or professional services) and focuses on credentials and insurances. Certification is for higher risk supports (e.g., daily personal activities, behaviour support) and involves checking systems against NDIS Practice Standards modules.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I switch NDIS providers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Review your service agreement notice periods and any service booking obligations. You can end or transition supports and choose a different provider that better meets your goals.'
        }
      }
    ]
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'NDIS Provider Guide: Registration, Pricing, Compliance and Best Practice',
    datePublished: updated,
    dateModified: updated,
    author: { '@type': 'Organization', name: 'Your Company' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': '/articles/ndis-provider' }
  };

  return (
    <article>
      <header>
        <p style={{ margin: 0, color: '#667085' }}>Updated: {updated}</p>
        <h1>NDIS Provider Guide: Registration, Pricing, Compliance and Best Practice</h1>
        <p>
          Whether you are choosing an NDIS provider or becoming one, this end-to-end guide explains registration, quality and safeguards, pricing and claiming, operations, and practical checklists. It is based on publicly available guidance and is general information only.
        </p>
        <ul>
          <li>For participants: learn how to choose the right NDIS provider, compare options, and protect your rights.</li>
          <li>For providers: learn how to register, comply with the NDIS Practice Standards, and run a high-quality service.</li>
        </ul>
      </header>

      <nav aria-label='Table of contents'>
        <h2>Contents</h2>
        <ul>
          <li><a href='#introduction'>Introduction</a></li>
          <li><a href='#main-content'>Main Content</a>
            <ul>
              <li><a href='#what-is-ndis-provider'>What is an NDIS provider?</a></li>
              <li><a href='#registered-vs-unregistered'>Registered vs unregistered providers</a></li>
              <li><a href='#choose-provider'>How to choose an NDIS provider (participants)</a></li>
              <li><a href='#become-provider'>How to become a registered NDIS provider (businesses)</a></li>
              <li><a href='#pricing-and-claiming'>Pricing and claiming rules</a></li>
              <li><a href='#quality-and-safeguards'>Quality, safeguards, and compliance</a></li>
              <li><a href='#operations-and-quality'>Operations and service delivery</a></li>
              <li><a href='#specialist-topics'>Specialist topics</a></li>
              <li><a href='#pitfalls'>Common pitfalls and how to avoid them</a></li>
              <li><a href='#whats-changing'>What is changing in 2024–2025?</a></li>
              <li><a href='#checklists'>Checklists and templates</a></li>
              <li><a href='#faqs'>FAQs</a></li>
              <li><a href='#glossary'>Glossary</a></li>
            </ul>
          </li>
          <li><a href='#conclusion'>Conclusion</a></li>
        </ul>
      </nav>

      <section id='introduction'>
        <h2>Introduction</h2>
        <p>
          The National Disability Insurance Scheme (NDIS) funds reasonable and necessary supports so people with disability can pursue their goals. An NDIS provider is the person or organisation that delivers those supports. This guide brings together the key rules, steps, and best practices so you can make informed decisions and avoid costly mistakes.
        </p>
      </section>

      <section id='main-content'>
        <h2>Main Content</h2>

        <section id='what-is-ndis-provider'>
          <h3>What is an NDIS provider?</h3>
          <p>
            An NDIS provider offers funded supports such as core assistance (daily living, community access), capacity building (therapy, employment, training), capital items (assistive technology, home modifications), and coordination or plan management. Providers range from sole traders and allied health clinics to large community organisations.
          </p>
          <ul>
            <li>Core supports: assistance with daily life, social and community participation, consumables.</li>
            <li>Capacity building: therapy (e.g., OT, physio, speech), employment support, improved daily living, behaviour support.</li>
            <li>Capital: assistive technology (AT), home modifications, vehicle modifications.</li>
            <li>Other: support coordination, specialist support coordination, plan management.</li>
          </ul>
        </section>

        <section id='registered-vs-unregistered'>
          <h3>Registered vs unregistered providers</h3>
          <p>
            Providers can operate either registered with the NDIS Quality and Safeguards Commission (the Commission) or unregistered. Registration is mandatory for certain higher-risk supports and to deliver to NDIA-managed participants.
          </p>
          <ul>
            <li>NDIA-managed participants must use registered providers (service bookings are required).</li>
            <li>Plan-managed and self-managed participants can use unregistered providers (subject to some specific supports and local requirements).</li>
            <li>Registration demonstrates audited compliance with the NDIS Practice Standards and enables access to the myplace provider portal.</li>
          </ul>
        </section>

        <section id='choose-provider'>
          <h3>How to choose an NDIS provider (participants)</h3>
          <ol>
            <li>Define your goals and supports: what outcomes do you want in the next 3–12 months?</li>
            <li>Check management type: NDIA-managed requires registered providers; plan/self-managed gives broader choice.</li>
            <li>Compare capability: experience with your needs (e.g., autism, psychosocial, complex health), qualifications, cultural safety.</li>
            <li>Ask about availability and continuity: wait times, staffing model, backup plans, after-hours.</li>
            <li>Understand pricing: confirm line items, travel charging, non-face-to-face work, cancellation terms.</li>
            <li>Review service agreement: scope, responsibilities, how to change or exit, complaints process.</li>
            <li>Check safeguards: worker screening, supervision, incident management, privacy practices.</li>
            <li>Evaluate fit: communication style, language access, accessibility and inclusion.</li>
          </ol>
          <p>Tip: Search the NDIS provider finder, ask peers, and request a trial period or staged onboarding.</p>
        </section>

        <section id='become-provider'>
          <h3>How to become a registered NDIS provider (businesses)</h3>
          <ol>
            <li>Choose your scope: registration groups and states/territories where you will operate.</li>
            <li>Set up your business: ABN, legal structure, required insurances (public liability, professional indemnity, workers compensation).</li>
            <li>Create PRODA and apply via the NDIS Commission portal: complete the online application and self-assessment against relevant Practice Standards.</li>
            <li>Engage an approved auditor: verification versus certification depends on risk profile and supports.</li>
            <li>Implement systems and policies: incident management, complaints, risk, HR, worker screening, privacy, clinical governance, restrictive practices (if applicable).</li>
            <li>Complete the audit: provide evidence; address any nonconformities; receive audit report.</li>
            <li>Registration decision and conditions: if approved, comply with conditions, display details, and renew on cycle.</li>
          </ol>
          <p>
            Workers delivering NDIS supports generally require an NDIS Worker Screening Check and the NDIS Worker Orientation Module. Verify clearances in the Worker Screening Database and maintain records.
          </p>
          <h4>Verification vs certification (at a glance)</h4>
          <ul>
            <li>Verification: lower risk supports; focus on professional qualifications, registrations, insurance, and core policies.</li>
            <li>Certification: higher risk supports; assessment against relevant Practice Standards modules (e.g., core, high-intensity daily personal activities, behaviour support).</li>
          </ul>
        </section>

        <section id='pricing-and-claiming'>
          <h3>Pricing and claiming rules</h3>
          <p>
            The NDIS Pricing Arrangements and Price Limits set maximum prices and claiming rules for many supports. Always check the latest version, because rates and rules are updated periodically.
          </p>
          <ul>
            <li>Price limits: registered providers must not charge above limits where they apply.</li>
            <li>Claiming channels: myplace provider portal for NDIA-managed; invoice the plan manager for plan-managed; invoice or payment request from participants for self-managed.</li>
            <li>Service bookings: required for NDIA-managed participants; ensure the correct registration group and available funds.</li>
            <li>Invoices: include participant details, ABN, line item codes, dates, hours/units, location, GST status, and total.</li>
            <li>Travel and non-face-to-face: permitted in defined circumstances with caps and documentation; justify the benefit to the participant.</li>
            <li>Cancellations: short-notice cancellation rules allow partial or full claiming within specific windows depending on support type.</li>
            <li>Reports and quotes: some items require quotes (e.g., AT) or written reports; keep evidence.</li>
            <li>GST: most NDIS supports are GST-free when supplied to a participant with a valid plan under the scheme; check ATO guidance.</li>
          </ul>
          <p>
            Maintain accurate service records, timesheets, and progress notes. The Payment Assurance Program may request evidence of delivered supports. Keep records for the required retention period.
          </p>
        </section>

        <section id='quality-and-safeguards'>
          <h3>Quality, safeguards, and compliance</h3>
          <ul>
            <li>NDIS Practice Standards: core and relevant modules define outcomes for rights, governance, provision of supports, and environment.</li>
            <li>Code of Conduct: applies to all workers and providers, registered or not.</li>
            <li>Worker screening: hold and verify clearances; maintain a workforce register.</li>
            <li>Incident management and reportable incidents: have a system; notify the Commission within mandatory timeframes where required.</li>
            <li>Restrictive practices: seclusion, chemical, mechanical, physical, or environmental restraint require authorisation and a behaviour support plan; record and report use.</li>
            <li>Complaints: provide accessible channels; respond, record, and learn; participants can also complain to the NDIS Commission.</li>
            <li>Privacy and security: collect only necessary data; secure storage; breach response aligned with privacy laws.</li>
            <li>Audits and renewal: address nonconformities, conduct internal audits, and monitor continuous improvement.</li>
          </ul>
        </section>

        <section id='operations-and-quality'>
          <h3>Operations and service delivery</h3>
          <h4>Service agreements</h4>
          <ul>
            <li>Supports and outcomes: what you will deliver and how it aligns to goals.</li>
            <li>Rates and charges: line items, travel and non-face-to-face, cancellation terms.</li>
            <li>Schedule and availability: start/end dates, review points.</li>
            <li>Responsibilities: participant and provider roles, safety and consent.</li>
            <li>Ending or changing services: notice periods and transition planning.</li>
            <li>Complaints and incidents: how to raise issues and expected response times.</li>
          </ul>
          <h4>Onboarding and accessibility</h4>
          <ul>
            <li>Plain language information; interpreters if needed.</li>
            <li>Culturally safe practice for Aboriginal and Torres Strait Islander peoples and CALD communities.</li>
            <li>Reasonable adjustments and accessible communication formats.</li>
          </ul>
          <h4>Clinical governance and risk</h4>
          <ul>
            <li>Scope of practice, supervision, escalation pathways, and emergency response.</li>
            <li>Medication, mealtime, and high-intensity supports delivered by trained staff with competency checks.</li>
            <li>Hazard identification, incident trend analysis, and continuous improvement.</li>
          </ul>
          <h4>Records and outcomes</h4>
          <ul>
            <li>Progress notes and shift records that are factual, timely, and person-centred.</li>
            <li>Outcome tracking aligned to participant goals; use recognised measures where suitable.</li>
            <li>Data retention and secure archival within required timeframes.</li>
          </ul>
          <h4>Workforce</h4>
          <ul>
            <li>Fair employment practices, appropriate awards, and safe workloads.</li>
            <li>Training in safeguarding, rights, communication, trauma-informed and recovery-oriented practice.</li>
            <li>Supervision and reflective practice to maintain quality.</li>
          </ul>
          <h4>Technology</h4>
          <ul>
            <li>Scheduling and timesheet systems with audit trails.</li>
            <li>Case and document management with access controls and MFA.</li>
            <li>Secure communication and consent capture.</li>
          </ul>
        </section>

        <section id='specialist-topics'>
          <h3>Specialist topics</h3>
          <ul>
            <li>Psychosocial disability: recovery-oriented practice, coordination with mental health services.</li>
            <li>Behaviour support: functional assessment, positive behaviour support plans, restrictive practice authorisation and reporting.</li>
            <li>Assistive technology and home modifications: assessments, quotes, trials, training, maintenance, and risk.</li>
            <li>Group and community supports: staffing ratios, program design, and outcome measurement.</li>
            <li>Remote and very remote delivery: travel, telepractice, and local partnerships.</li>
          </ul>
        </section>

        <section id='pitfalls'>
          <h3>Common pitfalls and how to avoid them</h3>
          <ul>
            <li>Unclear agreements: use plain language; specify scope and rates; gain informed consent.</li>
            <li>Poor documentation: standardise notes; link supports to goals; keep evidence for claims.</li>
            <li>Billing errors: confirm price limits, line items, and service bookings before delivery.</li>
            <li>Scope creep: confirm changes in writing; update goals and plans as needed.</li>
            <li>Workforce gaps: plan coverage, supervision, and handover to maintain continuity.</li>
            <li>Security lapses: implement least-privilege access and breach response plans.</li>
          </ul>
        </section>

        <section id='whats-changing'>
          <h3>What is changing in 2024–2025?</h3>
          <ul>
            <li>Implementation of NDIS Review recommendations is underway, focusing on participant safety, payment integrity, foundational supports, and better pathways.</li>
            <li>Pricing Arrangements are periodically updated; monitor travel, cancellation, and group support rules.</li>
            <li>Ongoing compliance and payment assurance activities mean keeping thorough records is essential.</li>
          </ul>
          <p>Always rely on the latest official guidance when making decisions.</p>
        </section>

        <section id='checklists'>
          <h3>Checklists and templates</h3>
          <h4>New provider setup checklist</h4>
          <ul>
            <li>ABN, structure, and insurances confirmed.</li>
            <li>PRODA account and Commission portal access.</li>
            <li>Scope and registration groups defined.</li>
            <li>Policies: incident, complaints, risk, privacy, HR, clinical governance.</li>
            <li>Worker screening, orientation, induction, and training matrix.</li>
            <li>Service agreement template and consent forms.</li>
            <li>Recordkeeping, case management, scheduling, and security controls.</li>
            <li>Auditor engaged and evidence prepared.</li>
          </ul>
          <h4>Participant provider-selection checklist</h4>
          <ul>
            <li>Does the provider understand your goals and communicate clearly?</li>
            <li>Are they registered (if you are NDIA-managed) and appropriately qualified?</li>
            <li>Do they have reasonable availability and a continuity plan?</li>
            <li>Are pricing, travel, and cancellation rules transparent?</li>
            <li>Is the service agreement fair and easy to end or change?</li>
            <li>How will progress be measured and shared with you?</li>
          </ul>
          <h4>Service agreement essentials (template outline)</h4>
          <ul>
            <li>Parties, supports, and outcomes</li>
            <li>Schedule, location, and contact methods</li>
            <li>Rates, travel, non-face-to-face, and cancellations</li>
            <li>Responsibilities and safety</li>
            <li>Consent and information sharing</li>
            <li>Changes, exit, and transition</li>
            <li>Complaints and feedback</li>
          </ul>
        </section>

        <section id='faqs'>
          <h3>FAQs</h3>
          <p>See common questions and answers above. If your situation is unique, contact the NDIS or the Commission for official guidance.</p>
        </section>

        <section id='glossary'>
          <h3>Glossary</h3>
          <ul>
            <li>NDIA: National Disability Insurance Agency (administers plans and payments).</li>
            <li>NDIS Commission: Regulates provider quality and safeguards.</li>
            <li>Pricing Arrangements: document setting price limits and claiming rules.</li>
            <li>PRODA: digital identity to access government portals including the Commission and myplace.</li>
            <li>Myplace provider portal: claims, service bookings, and payments for NDIA-managed participants.</li>
            <li>Service booking: reservation of funds for specific supports (NDIA-managed).</li>
          </ul>
        </section>
      </section>

      <section id='conclusion'>
        <h2>Conclusion</h2>
        <p>
          Choosing or becoming an NDIS provider is simpler when you understand registration pathways, price limits, and the quality and safeguard requirements. Use the checklists here, keep up with official updates, and focus on person-centred, culturally safe practice. That combination delivers better outcomes and reduces risk for everyone.
        </p>
      </section>

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </article>
  );
}
