import { useState } from "react";

import {
  getStoredArticleAttribution,
  trackAttributedConversion,
} from "~/lib/article-conversions";
import { API_URL } from "~/lib/api";
import {
  buildStudioProjectPayload,
  EMPTY_STUDIO_PROJECT_BRIEF,
  type StudioProjectBrief,
} from "~/lib/mlai-studio-project";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b1bd1] focus:ring-4 focus:ring-[#4b1bd1]/10";
const labelClass = "block text-sm font-black text-gray-950";

export default function MlaiStudioProjectForm() {
  const [brief, setBrief] = useState<StudioProjectBrief>(EMPTY_STUDIO_PROJECT_BRIEF);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof StudioProjectBrief>(key: K, value: StudioProjectBrief[K]) => {
    setBrief((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (brief.website) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setError("");

    const payload = buildStudioProjectPayload(brief, {
      attribution: getStoredArticleAttribution(),
    });

    try {
      const response = await fetch(`${API_URL}/api/v1/mlai-studio/applications/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Project brief submission failed: ${response.status}`);
      }
      trackAttributedConversion("studio_project_brief_submitted");
      setSubmitted(true);
      setBrief(EMPTY_STUDIO_PROJECT_BRIEF);
    } catch {
      setError(
        "We could not submit your brief right now. Please try again, or email the same details to hi@mlai.au.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        aria-live="polite"
        className="rounded-[32px] border border-emerald-300 bg-emerald-50 p-7 text-emerald-950 sm:p-10"
      >
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
          Brief received
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">
          Your project is ready for MLAI review.
        </h2>
        <p className="mt-4 max-w-2xl leading-7">
          The Studio team will review the outcome, constraints and systems you described,
          then contact you by email with questions or a proposed next step. Submitting a
          brief does not create a project agreement or commit you to spend.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-emerald-950 px-5 py-3 text-sm font-black text-white"
        >
          Submit another brief
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Your name <span className="text-red-600">*</span>
          <input
            required
            autoComplete="name"
            value={brief.fullName}
            onChange={(event) => set("fullName", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Work email <span className="text-red-600">*</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={brief.email}
            onChange={(event) => set("email", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Phone
          <input
            type="tel"
            autoComplete="tel"
            value={brief.phone}
            onChange={(event) => set("phone", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Organisation
          <input
            autoComplete="organization"
            value={brief.organisation}
            onChange={(event) => set("organisation", event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        What outcome do you need? <span className="text-red-600">*</span>
        <span className="mt-1 block font-normal text-gray-600">
          Describe the result, not just the technology you think you need.
        </span>
        <textarea
          required
          rows={5}
          value={brief.outcome}
          onChange={(event) => set("outcome", event.target.value)}
          className={fieldClass}
          placeholder="For example: cut the weekly support-triage process from four hours to 30 minutes while keeping a human approval step."
        />
      </label>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className={labelClass}>
          Current workflow <span className="text-red-600">*</span>
          <textarea
            required
            rows={4}
            value={brief.currentWorkflow}
            onChange={(event) => set("currentWorkflow", event.target.value)}
            className={fieldClass}
            placeholder="Who does what today, how often, and where does it slow down?"
          />
        </label>
        <label className={labelClass}>
          Systems, data and integrations <span className="text-red-600">*</span>
          <textarea
            required
            rows={4}
            value={brief.systemsAndData}
            onChange={(event) => set("systemsAndData", event.target.value)}
            className={fieldClass}
            placeholder="CRM, email, documents, APIs, databases, permissions or model providers."
          />
        </label>
        <label className={labelClass}>
          Privacy and security constraints <span className="text-red-600">*</span>
          <textarea
            required
            rows={4}
            value={brief.privacyAndSecurity}
            onChange={(event) => set("privacyAndSecurity", event.target.value)}
            className={fieldClass}
            placeholder="Personal data, regulated information, data residency, access controls or internal policies."
          />
        </label>
        <label className={labelClass}>
          What have you already tried?
          <textarea
            rows={4}
            value={brief.previousAttempts}
            onChange={(event) => set("previousAttempts", event.target.value)}
            className={fieldClass}
            placeholder="Existing tools, prototypes, prompts, vendors or internal attempts."
          />
        </label>
      </div>

      <label className={labelClass}>
        How will you know it worked? <span className="text-red-600">*</span>
        <textarea
          required
          rows={3}
          value={brief.successMeasure}
          onChange={(event) => set("successMeasure", event.target.value)}
          className={fieldClass}
          placeholder="A measurable quality, time, cost, adoption or risk outcome."
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Preferred timeline <span className="text-red-600">*</span>
          <select
            required
            value={brief.timeline}
            onChange={(event) => set("timeline", event.target.value)}
            className={fieldClass}
          >
            <option value="">Choose one</option>
            <option>Within 2 weeks</option>
            <option>Within 1 month</option>
            <option>Within 3 months</option>
            <option>Exploring — no fixed date</option>
          </select>
        </label>
        <label className={labelClass}>
          Indicative project budget <span className="text-red-600">*</span>
          <select
            required
            value={brief.budget}
            onChange={(event) => set("budget", event.target.value)}
            className={fieldClass}
          >
            <option value="">Choose one</option>
            <option>Under A$5,000</option>
            <option>A$5,000–A$15,000</option>
            <option>A$15,000–A$50,000</option>
            <option>More than A$50,000</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="hidden" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={brief.website}
          onChange={(event) => set("website", event.target.value)}
        />
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-gray-300 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
        <input
          required
          type="checkbox"
          checked={brief.consent}
          onChange={(event) => set("consent", event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#4b1bd1]"
        />
        <span>
          I consent to MLAI storing this information to assess and respond to my
          project enquiry. MLAI will not share it with a proposed builder without
          permission. See the <a href="/privacy" className="font-black underline">privacy policy</a>.
        </span>
      </label>

      {error ? (
        <p role="alert" className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-bold text-red-800">
          {error} <a href="mailto:hi@mlai.au" className="underline">Email MLAI</a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#4b1bd1] px-7 py-3 text-base font-black text-white transition hover:bg-[#371096] disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Submitting brief…" : "Send project brief →"}
      </button>
    </form>
  );
}
