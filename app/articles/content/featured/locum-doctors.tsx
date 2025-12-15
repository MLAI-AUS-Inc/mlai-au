// app/articles/content/featured/locum-doctors.tsx
import { Link } from 'react-router'
import type { ArticleFAQItem } from '~/components/articles/ArticleFAQ'
import type { ArticleSummaryConfig } from '~/components/articles/ArticleSummaryCard'
import { ImageWithFallback } from '~/components/ImageWithFallback'

export const summaryHighlights: ArticleSummaryConfig = {
  heading: 'Key facts: Locum doctors',
  intro: 'Locum doctors provide short‑term medical cover across Australia, helping services maintain safe staffing during leave, surges, and rural shortages.',
  items: [
    {
      label: 'What is a locum doctor?',
      description:
        'A fully qualified doctor who fills temporary shifts or contracts to cover leave, vacancies, or demand spikes across hospitals and clinics.'
    },
    {
      label: 'How are locum rates set?',
      description:
        'Rates vary by specialty, location, shift type, urgency, and seniority. Confirm inclusions like travel, accommodation, and on‑call.'
    },
    {
      label: 'What checks are required?',
      description:
        'AHPRA registration, identity, right to work, references, indemnity insurance, mandatory immunisations, police and Working With Children checks as applicable.'
    }
  ]
}

export const faqs: ArticleFAQItem[] = [
  { q: 'What does a locum doctor do?', a: 'Covers short‑term shifts or contracts to maintain service capacity and patient safety when permanent staff are unavailable.' },
  { q: 'Are locum doctors employees or contractors in Australia?', a: 'Both occur. Engagement depends on the facility and arrangement. Seek tax and legal advice on PAYG vs contractor (ABN) status.' },
  { q: 'How are locum rates determined?', a: 'By specialty, seniority, location (metro vs rural/remote), shift type (day, evening, night, on‑call), duration, and urgency.' },
  { q: 'What documents are needed to hire a locum?', a: 'AHPRA registration, identity and work rights, CV and references, police and WWCC checks, immunisations, indemnity insurance, and site‑specific training.' },
  { q: 'Do locum doctors get superannuation?', a: 'It depends on engagement type and relevant tests. Facilities and doctors should obtain professional tax advice for compliance.' },
  { q: 'How quickly can a hospital book a locum?', a: 'Often within days if credentialing is ready. Rural and urgent shifts may fill faster via agency networks or internal pools.' },
  { q: 'Is medical indemnity required for locum work?', a: 'Yes. Doctors must maintain appropriate indemnity for the scope of work and setting. Confirm coverage before accepting shifts.' },
  { q: 'Where can doctors find locum shifts?', a: 'Through agencies, hospital pools, rural workforce programs, peer networks, and professional job boards.' },
  { q: 'Who pays for travel and accommodation?', a: 'Varies by contract. Many rural placements include travel and accommodation; terms must be confirmed in writing before booking.' },
  { q: 'Can international doctors work as locums in Australia?', a: 'Only if they hold valid work rights and AHPRA registration suitable for the role and location.' }
]

export default function ArticleBody() {
  return (
    <>
      <p>
        <strong>Locum doctors</strong> are fully qualified clinicians who provide temporary cover for hospitals and
        clinics across Australia. They help services maintain safe care during leave, vacancies, peak demand, and in
        rural and remote settings.
      </p>

      <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold text-zinc-900 dark:text-zinc-100">What you’ll learn</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>How locum work operates in Australia and when to use it</li>
          <li>Rates, inclusions, and compliance essentials</li>
          <li>Practical onboarding checklists for facilities and doctors</li>
          <li>Common mistakes to avoid when booking or working locum</li>
        </ul>
      </div>

      <h2>What is a locum doctor?</h2>
      <p>
        A locum (from the Latin locum tenens, “to hold the place”) is a doctor who fills short‑term shifts or contracts
        to sustain service capacity. In Australia, locums work across emergency departments, wards, outpatient clinics,
        general practice, and rural hospitals. Engagement can be as an employee (PAYG) or contractor (ABN), depending on
        the facility and arrangement.
      </p>

      <h2>When and why organisations book locums</h2>
      <ul>
        <li>Covering annual leave, parental leave, or unplanned absence</li>
        <li>Bridging recruitment gaps during hiring</li>
        <li>Handling seasonal surges, elective backlogs, or service expansions</li>
        <li>Providing access to specialists in rural and remote communities</li>
      </ul>

      <h2>Rates, inclusions, and terms</h2>
      <p>
        Locum rates vary by specialty, seniority, location (metro vs rural/remote), shift type (day, evening, night,
        on‑call), urgency, and duration. As of 2025, facilities commonly confirm in writing whether rates include
        superannuation, allowances, overtime/on‑call, travel, and accommodation. Doctors should clarify cancellation
        terms, rostered hours, documentation expectations, and handover.
      </p>
      <div className="not-prose my-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
        <h3 className="m-0 text-base font-semibold">Rate checklist (confirm in writing)</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          <li>Base rate and whether it is hourly, daily, or sessional</li>
          <li>Superannuation treatment and payroll vs ABN contractor status</li>
          <li>Travel, accommodation, meals, and car hire inclusions</li>
          <li>On‑call arrangements, call‑backs, overtime, and penalty rates</li>
          <li>Cancellation and sick leave terms; minimum guaranteed hours</li>
        </ul>
      </div>

      <h2>Credentialing and compliance essentials</h2>
      <p>
        To work safely and legally, locums and facilities complete credentialing before shifts. Typical requirements
        include: AHPRA registration, identity and right‑to‑work checks, CV and references, police and Working With
        Children checks where relevant, mandatory immunisations, medical indemnity insurance, and completion of site‑
        specific policies and training.
      </p>

      <h2>How to find locum work (for doctors)</h2>
      <ul>
        <li>Register with reputable agencies and keep documents current</li>
        <li>Join hospital pools and rural workforce programs</li>
        <li>Network via colleagues and professional associations</li>
        <li>Optimise your CV: scope, procedures, systems (EMR), and availability</li>
      </ul>

      <h2>How to book locums (for facilities)</h2>
      <p>
        Build a small, reliable supplier panel and an internal pool. Standardise request forms, rate cards, and
        credentialing packs. Keep lead times realistic; urgent requests fill faster when documents are ready and
        accommodation is pre‑arranged.
      </p>

      <h2>Rapid onboarding checklist for practices</h2>
      <ol className="list-decimal pl-5">
        <li>Confirm signed terms, rate inclusions, and rostered hours</li>
        <li>Verify credentialing: AHPRA, identity, checks, references, indemnity</li>
        <li>Issue facility orientation: EMR access, codes, parking, contacts</li>
        <li>Prepare accommodation and travel details where applicable</li>
        <li>Share clinical policies, escalation pathways, and handover templates</li>
        <li>Nominate a local buddy for the locum’s first shift</li>
      </ol>

      <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Common mistake</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Assuming inclusions like travel or on‑call are “standard”. Unstated assumptions lead to disputes on arrival
            or invoice.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
          <h3 className="m-0 text-base font-semibold">Quick fix</h3>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            Use a one‑page confirmation covering rate, hours, on‑call, travel, accommodation, EMR, and a named contact.
            Send it before bookings are finalised.
          </p>
        </div>
      </div>

      <h2>Tips for doctors working locum</h2>
      <ul>
        <li>Carry a digital pack: ID, AHPRA, immunisations, indemnity, checks, referees</li>
        <li>Clarify scope, supervision, and escalation lines before your shift</li>
        <li>Arrive early for EMR access and local orientation</li>
        <li>Document clearly and hand over using site‑preferred templates</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>
          Browse more guides: <Link className="text-teal-600 underline hover:text-teal-700" to="/articles">Articles</Link>
        </li>
        <li>
          Learn about MLAI and our work: <Link className="text-teal-600 underline hover:text-teal-700" to="/about">About</Link>
        </li>
        <li>
          Have a question? <Link className="text-teal-600 underline hover:text-teal-700" to="/contact">Contact</Link> our team
        </li>
        <li>
          Get updates on new healthcare ops guides: <Link className="text-teal-600 underline hover:text-teal-700" to="/subscribe">Subscribe</Link>
        </li>
      </ul>

      <div className="not-prose my-8">
        <ImageWithFallback
          src="/images/articles/featured/locum-doctors-hero.jpg"
          alt="Locum doctor reviewing shift schedule in an Australian hospital"
          width={1200}
          height={630}
          className="w-full rounded-2xl"
        />
      </div>
    </>
  )
}
