import { clsx } from "clsx";

export default function VibeRaisingFounderOverview({ firstName, heading, showEyebrow = true, bleedToShell = true, onCreateFirstUpdate }: {
  firstName: string; heading?: string; showEyebrow?: boolean; useNumberedSectionHeadings?: boolean; bleedToShell?: boolean; onCreateFirstUpdate: () => void;
}) {
  return <div className={clsx("vr-scope bg-white", bleedToShell && "-m-6 sm:-m-8 lg:-m-10")}>
    <section className="mx-auto max-w-5xl px-6 py-20">
      {showEyebrow && <p className="font-bold text-teal-700">Monthly updates for your startup</p>}
      <h1 className="mt-4 max-w-3xl text-4xl font-bold text-gray-950 sm:text-5xl">{heading || `${firstName ? `${firstName}, understand` : "Understand"} your business. Share what you’re building.`}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">Connect your sources, assess recorded progress privately, and review a succinct monthly update before sharing it with your community.</p>
      <button onClick={onCreateFirstUpdate} className="mt-8 rounded-xl bg-teal-700 px-6 py-3 font-bold text-white">Create your first update</button>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {[ ["Connect your sources", "Use Stripe, Xero, Gmail, Notion and your own notes to assemble the evidence for your reporting period."],
           ["Review the evidence", "See where each recorded metric came from. Missing evidence stays visible as a gap."],
           ["Approve what you share", "Keep the update private or select the community. Your approval applies to the exact saved revision you reviewed."] ].map(([title, body]) => <section key={title} className="rounded-2xl border border-gray-200 p-6"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-gray-600">{body}</p></section>)}
      </div>
    </section>
  </div>;
}
