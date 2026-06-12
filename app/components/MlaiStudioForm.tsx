import { useEffect, useRef, useState } from "react";

import { API_URL } from "~/lib/api";

/* ============================================================
   MLAI STUDIO — multi-step application form
   Ported from the Claude Design handoff (form.jsx). All behaviour
   is reproduced — 6 steps, per-step validation, draft restore,
   progressive lead capture, review + consent, success screen.

   Applications POST to the mlai-backend StudioApplication table
   (`sendLead`): a partial lead is captured after step 1 and the
   full record on submit, upserted by the browser-generated lead
   id. localStorage (`persistLead`) stays as an offline fallback.

   Styles live in app/styles/mlai-studio.css (scoped under
   `.ms-scope`); this renders inside the .ms-scope landing page.
   ============================================================ */

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  legalWork: string;
  visa: string;
  linkedin: string;
  github: string;
  portfolio: string;
  skills: string[];
  aiTools: string[];
  availability: string;
  startDate: string;
  rate: string;
  skillsOther: string[];
  aiToolsOther: string[];
  availabilityOther: string;
  startDateOther: string;
  interestsOther: string[];
  projects: string;
  interests: string[];
  anything: string;
  consent: boolean;
};

const EMPTY: FormData = {
  fullName: "", email: "", phone: "", location: "", legalWork: "", visa: "",
  linkedin: "", github: "", portfolio: "",
  skills: [], aiTools: [], availability: "", startDate: "", rate: "",
  skillsOther: [], aiToolsOther: [], availabilityOther: "", startDateOther: "", interestsOther: [],
  projects: "", interests: [], anything: "", consent: false,
};

const SKILL_OPTIONS = ["Full-stack dev", "Frontend", "Backend", "AI / ML engineering", "LLM / agents",
  "Automation", "Data engineering", "DevOps", "Product design / UX", "Mobile", "Integrations / APIs", "Prompt engineering", "Other"];
const TOOL_OPTIONS = ["Claude", "ChatGPT / OpenAI", "Cursor", "GitHub Copilot", "v0", "LangChain",
  "n8n / Zapier", "Supabase", "Vercel", "Replit", "Other"];
const AVAIL_OPTIONS = ["< 10 hrs", "10–20 hrs", "20–30 hrs", "30–40 hrs", "Other"];
const START_OPTIONS = ["Right now", "Within 2 weeks", "Within a month", "Just exploring", "Other"];
const INTEREST_OPTIONS = ["AI products", "Automation / ops", "MVPs from scratch", "Internal tools", "Data / integrations", "Design / UX", "Other"];

const STEP_META = [
  { key: "start", title: "Get started" },
  { key: "about", title: "About you" },
  { key: "links", title: "Your links" },
  { key: "skills", title: "Skills & availability" },
  { key: "work", title: "Your work" },
  { key: "review", title: "Review & submit" },
];
const LAST = STEP_META.length - 1;

const DRAFT_KEY = "mlai_studio_draft";
const LEAD_KEY = "mlai_studio_leads";

type Draft = { data?: Partial<FormData>; step?: number; leadId?: string; leadSaved?: boolean; maxStep?: number };

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (!d || typeof d !== "object") return null;
    return d as Draft;
  } catch {
    return null;
  }
}

function genId() {
  return "lead_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* Progressive lead capture. Saves to localStorage so a drop-off after step 1
   is never lost. `stage:"lead"` = name/email/phone; `stage:"complete"` = full submit. */
function persistLead(id: string, fields: Partial<FormData>, stage: "lead" | "complete") {
  const rec = { id, stage, savedAt: new Date().toISOString(), ...fields };
  try {
    const all = JSON.parse(localStorage.getItem(LEAD_KEY) || "[]");
    const idx = all.findIndex((r: { id: string }) => r.id === id);
    if (idx >= 0) all[idx] = { ...all[idx], ...rec };
    else all.push(rec);
    localStorage.setItem(LEAD_KEY, JSON.stringify(all));
  } catch {
    /* storage unavailable — ignore */
  }
  return rec;
}

/* Backend field names for the StudioApplication table (snake_case). */
const FIELD_TO_API: Record<keyof FormData, string> = {
  fullName: "full_name", email: "email", phone: "phone", location: "location",
  legalWork: "legal_work", visa: "visa", linkedin: "linkedin", github: "github",
  portfolio: "portfolio", skills: "skills", aiTools: "ai_tools",
  availability: "availability", startDate: "start_date", rate: "rate",
  skillsOther: "skills_other", aiToolsOther: "ai_tools_other",
  availabilityOther: "availability_other", startDateOther: "start_date_other",
  interestsOther: "interests_other", projects: "projects", interests: "interests",
  anything: "anything_else", consent: "consent",
};

/* POST a lead/application to the backend, upserting on the lead id. Rejects
   on network failure or a non-2xx response — callers decide whether that is
   fatal (final submit) or best-effort (step-1 lead capture). */
function sendLead(id: string, fields: Partial<FormData>, stage: "lead" | "complete") {
  const payload: Record<string, unknown> = { client_ref: id, stage };
  for (const [key, value] of Object.entries(fields)) {
    const apiKey = FIELD_TO_API[key as keyof FormData];
    if (apiKey) payload[apiKey] = value;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  return fetch(`${API_URL}/api/v1/mlai-studio/applications/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Let a step-1 lead survive the user immediately navigating away.
    keepalive: stage === "lead",
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);
      return res;
    })
    .finally(() => clearTimeout(timer));
}

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span className="req">*</span>}
        {hint && <span className="hint">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

/* Tag entry: type a value, Enter to add it as a removable chip. */
function TagInput({
  value, onChange, placeholder,
}: {
  value: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) {
  const [text, setText] = useState("");
  const tags = Array.isArray(value) ? value : [];
  const addTag = () => {
    const t = text.trim();
    if (!t) return;
    if (!tags.some((x) => x.toLowerCase() === t.toLowerCase())) onChange([...tags, t]);
    setText("");
  };
  const removeTag = (i: number) => onChange(tags.filter((_, idx) => idx !== i));
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(); }
    else if (e.key === "Backspace" && !text && tags.length) removeTag(tags.length - 1);
  };
  return (
    <div className="taginput" style={{ marginTop: 10 }}>
      {tags.length > 0 && (
        <div className="tag-chips">
          {tags.map((t, i) => (
            <span className="tag-chip" key={t + i}>
              {t}
              <button type="button" className="tag-x" onClick={() => removeTag(i)} aria-label={`Remove ${t}`}>×</button>
            </span>
          ))}
        </div>
      )}
      <input
        className="input"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKey}
        onBlur={addTag}
      />
    </div>
  );
}

export default function ApplicationForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [restored, setRestored] = useState(false);
  // Furthest step the user has reached — lets them jump forward (not just back)
  // to any step they've already visited via the step dots.
  const [maxStep, setMaxStep] = useState(0);
  const hydrated = useRef(false);

  // Restore a draft after mount (SSR-safe — never touch localStorage during render).
  useEffect(() => {
    const d = loadDraft();
    if (d && d.data) {
      setData({ ...EMPTY, ...d.data });
      if (Number.isInteger(d.step)) setStep(d.step as number);
      setMaxStep(Number.isInteger(d.maxStep) ? (d.maxStep as number) : (d.step as number) || 0);
      setLeadSaved(!!d.leadSaved);
      setRestored(!!d.data.fullName);
      setLeadId(d.leadId || genId());
    } else {
      setLeadId(genId());
    }
    hydrated.current = true;
  }, []);

  // Save a draft on every change so a refresh never loses progress.
  useEffect(() => {
    if (!hydrated.current || done || !leadId) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step, leadId, leadSaved, maxStep }));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [data, step, leadId, leadSaved, maxStep, done]);

  // When the success screen appears, bring the apply section back into view.
  useEffect(() => {
    if (!done) return;
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggle = (k: "skills" | "aiTools" | "interests", v: string) =>
    setData((d) => {
      const arr = d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v];
      return { ...d, [k]: arr };
    });

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (s === 0) {
      if (!data.fullName.trim()) e.fullName = "Tell us your name.";
      if (!data.email.trim()) e.email = "We need an email to reach you.";
      else if (!emailRe.test(data.email)) e.email = "That email doesn't look right.";
    }
    if (s === 1) {
      if (!data.location.trim()) e.location = "Where are you based?";
      if (!data.legalWork) e.legalWork = "Pick one.";
    }
    if (s === 2) {
      const anyLink = [data.linkedin, data.github, data.portfolio].some((x) => x.trim());
      if (!anyLink) e.linkedin = "Add at least one link so we can see your work.";
    }
    if (s === 3) {
      if (data.skills.length === 0) e.skills = "Pick at least one skill.";
      if (data.skills.includes("Other") && data.skillsOther.length === 0)
        e.skillsOther = "Add your 'Other' skill, then press Enter.";
      if (data.aiTools.includes("Other") && data.aiToolsOther.length === 0)
        e.aiToolsOther = "Add your 'Other' tool, then press Enter.";
      if (!data.availability) e.availability = "How much can you take on?";
      else if (data.availability === "Other" && !data.availabilityOther.trim())
        e.availabilityOther = "Tell us your availability.";
      if (data.startDate === "Other" && !data.startDateOther.trim())
        e.startDateOther = "Tell us your earliest start date.";
    }
    if (s === 4) {
      if (!data.projects.trim()) e.projects = "Show us something you've shipped.";
      if (data.interests.includes("Other") && data.interestsOther.length === 0)
        e.interestsOther = "Add your 'Other' interest, then press Enter.";
    }
    if (s === 5) {
      if (!data.consent) e.consent = "Please agree before submitting.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    // Save the lead the moment name/email/phone are captured — before drop-off.
    if (step === 0) {
      const lead = { fullName: data.fullName, email: data.email, phone: data.phone };
      persistLead(leadId, lead, "lead");
      void sendLead(leadId, lead, "lead").catch(() => {
        /* best-effort — the localStorage copy and the full submit cover it */
      });
      setLeadSaved(true);
    }
    const target = Math.min(step + 1, LAST);
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
    document.getElementById("apply")?.scrollIntoView({ block: "start" });
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  // Step dots: jump freely backward, and forward to any already-reached step —
  // but re-validate every step in between so we never land past an invalid one.
  const jump = (i: number) => {
    if (i === step) return;
    if (i < step) { setStep(i); return; }
    if (i > maxStep) return; // can't skip ahead to a step never reached
    for (let s = 0; s < i; s++) {
      const e = validateStep(s);
      if (Object.keys(e).length) { setStep(s); setErrors(e); return; }
    }
    setStep(i);
  };

  const submit = async () => {
    for (let i = 0; i <= LAST; i++) {
      const e = validateStep(i);
      if (Object.keys(e).length) { setStep(i); setErrors(e); return; }
    }
    setSubmitting(true);
    setSubmitError("");
    persistLead(leadId, data, "complete");
    try {
      await sendLead(leadId, data, "complete");
    } catch {
      setSubmitting(false);
      setSubmitError("We couldn't reach the server — your answers are saved in this browser. Please try again in a moment.");
      return;
    }
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <SuccessScreen
        name={data.fullName}
        onReset={() => {
          setData(EMPTY); setStep(0); setMaxStep(0); setDone(false); setRestored(false); setLeadSaved(false);
          setLeadId(genId());
        }}
      />
    );
  }

  const pct = ((step + 1) / STEP_META.length) * 100;

  return (
    <div className="form-shell">
      {restored && (
        <div className="draft-restored">
          <span>↩ Welcome back — we saved your progress.</span>
          <button
            type="button"
            onClick={() => {
              try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
              setData(EMPTY); setStep(0); setMaxStep(0); setErrors({}); setLeadSaved(false); setRestored(false);
            }}
          >
            Start over
          </button>
        </div>
      )}

      {step > 0 && (
        <div className="form-progress">
          <div className="fp-top">
            <span className="fp-step">Step <b>{step + 1}</b> / {STEP_META.length}</span>
            <span className="fp-title">{STEP_META[step].title}</span>
          </div>
          <div className="fp-track"><div className="fp-fill" style={{ width: `${pct}%` }} /></div>
          {leadSaved && step < LAST && (
            <div className="lead-saved">✓ Details saved — you can pick up where you left off anytime.</div>
          )}
          <div className="fp-dots">
            {STEP_META.map((m, i) => (
              <button
                key={m.key}
                className={`fp-dot ${i === step ? "active" : ""} ${i < step ? "done" : ""} ${i > maxStep ? "locked" : ""}`}
                onClick={() => jump(i)}
                type="button"
                aria-disabled={i > maxStep}
              >
                <span className="d">{i < step ? "✓" : i + 1}</span>
                <span className="lbl">{m.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 0 && <StepStart data={data} set={set} errors={errors} />}
      {step === 1 && <StepAbout data={data} set={set} errors={errors} />}
      {step === 2 && <StepLinks data={data} set={set} errors={errors} />}
      {step === 3 && <StepSkills data={data} set={set} toggle={toggle} errors={errors} />}
      {step === 4 && <StepWork data={data} set={set} toggle={toggle} errors={errors} />}
      {step === 5 && <StepReview data={data} set={set} errors={errors} />}

      {submitError && (
        <div className="err-msg" role="alert" style={{ marginTop: 18, fontSize: 14 }}>
          {submitError}
        </div>
      )}

      <div className="form-nav">
        {step > 0 ? <button className="btn btn-outline" onClick={back} type="button">← Back</button> : <span />}
        <span className="spacer" />
        {step < LAST && <button className="btn btn-orange" onClick={next} type="button">Continue →</button>}
        {step === LAST && (
          <button
            className="btn btn-orange btn-lg"
            onClick={submit}
            type="button"
            disabled={submitting}
            style={{ opacity: submitting ? 0.8 : 1 }}
          >
            {submitting ? <><span className="spinner" /> Submitting…</> : "Submit application →"}
          </button>
        )}
      </div>
    </div>
  );
}

type StepProps = {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string | undefined>;
};
type StepToggleProps = StepProps & { toggle: (k: "skills" | "aiTools" | "interests", v: string) => void };

function StepStart({ data, set, errors }: StepProps) {
  return (
    <div>
      <p className="lead" style={{ fontSize: 16, marginBottom: 26 }}>Start with the basics.</p>
      <Field label="Full name" required>
        <input className={`input ${errors.fullName ? "err" : ""}`} value={data.fullName}
          onChange={(e) => set("fullName", e.target.value)} placeholder="Jordan Taylor" />
        {errors.fullName && <div className="err-msg">{errors.fullName}</div>}
      </Field>
      <div className="field-row">
        <Field label="Email" required>
          <input className={`input ${errors.email ? "err" : ""}`} value={data.email} type="email"
            onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
          {errors.email && <div className="err-msg">{errors.email}</div>}
        </Field>
        <Field label="Phone">
          <input className={`input ${errors.phone ? "err" : ""}`} value={data.phone} type="tel"
            onChange={(e) => set("phone", e.target.value)} placeholder="+61 4XX XXX XXX" />
          {errors.phone && <div className="err-msg">{errors.phone}</div>}
        </Field>
      </div>
    </div>
  );
}

function StepAbout({ data, set, errors }: StepProps) {
  return (
    <div>
      <Field label="Location" required hint="City / state">
        <input className={`input ${errors.location ? "err" : ""}`} value={data.location}
          onChange={(e) => set("location", e.target.value)} placeholder="Melbourne, VIC" />
        {errors.location && <div className="err-msg">{errors.location}</div>}
      </Field>
      <Field label="Are you legally able to work as a contractor in Australia?" required>
        <div className="choice-row">
          {["Yes", "No", "On a visa with conditions"].map((o) => (
            <button key={o} type="button" className={`choice ${data.legalWork === o ? "sel" : ""}`}
              onClick={() => set("legalWork", o)}>{o}</button>
          ))}
        </div>
        {errors.legalWork && <div className="err-msg">{errors.legalWork}</div>}
      </Field>
      <Field label="Visa type / work restrictions" hint="if applicable">
        <input className="input" value={data.visa} onChange={(e) => set("visa", e.target.value)}
          placeholder="e.g. 482, student visa — 48 hrs/fortnight, none" />
      </Field>
    </div>
  );
}

function StepLinks({ data, set, errors }: StepProps) {
  return (
    <div>
      <p className="lead" style={{ fontSize: 16, marginBottom: 26 }}>
        Show us how you build. At least one link is required — GitHub and a portfolio carry the most weight.
      </p>
      <Field label="LinkedIn URL">
        <input className={`input ${errors.linkedin ? "err" : ""}`} value={data.linkedin}
          onChange={(e) => set("linkedin", e.target.value)} placeholder="linkedin.com/in/you" />
        {errors.linkedin && <div className="err-msg">{errors.linkedin}</div>}
      </Field>
      <Field label="GitHub URL">
        <input className="input" value={data.github} onChange={(e) => set("github", e.target.value)}
          placeholder="github.com/you" />
      </Field>
      <Field label="Personal website / portfolio">
        <input className="input" value={data.portfolio} onChange={(e) => set("portfolio", e.target.value)}
          placeholder="yoursite.com" />
      </Field>
    </div>
  );
}

function StepSkills({ data, set, toggle, errors }: StepToggleProps) {
  return (
    <div>
      <Field label="Main skills" required hint="pick all that apply">
        <div className="choice-row">
          {SKILL_OPTIONS.map((s) => (
            <button key={s} type="button" className={`chip-pick ${data.skills.includes(s) ? "sel" : ""}`}
              onClick={() => toggle("skills", s)}>{s}</button>
          ))}
        </div>
        {data.skills.includes("Other") && (
          <>
            <TagInput value={data.skillsOther} onChange={(v) => set("skillsOther", v)}
              placeholder="Type a skill and press Enter" />
            {errors.skillsOther && <div className="err-msg">{errors.skillsOther}</div>}
          </>
        )}
        {errors.skills && <div className="err-msg">{errors.skills}</div>}
      </Field>
      <Field label="AI tools you use">
        <div className="choice-row">
          {TOOL_OPTIONS.map((s) => (
            <button key={s} type="button" className={`chip-pick ${data.aiTools.includes(s) ? "sel" : ""}`}
              onClick={() => toggle("aiTools", s)}>{s}</button>
          ))}
        </div>
        {data.aiTools.includes("Other") && (
          <>
            <TagInput value={data.aiToolsOther} onChange={(v) => set("aiToolsOther", v)}
              placeholder="Type a tool and press Enter" />
            {errors.aiToolsOther && <div className="err-msg">{errors.aiToolsOther}</div>}
          </>
        )}
      </Field>
      <Field label="Availability per week" required>
        <div className="choice-row">
          {AVAIL_OPTIONS.map((o) => (
            <button key={o} type="button" className={`choice ${data.availability === o ? "sel" : ""}`}
              onClick={() => set("availability", o)}>{o}</button>
          ))}
        </div>
        {data.availability === "Other" && (
          <>
            <input className={`input ${errors.availabilityOther ? "err" : ""}`} style={{ marginTop: 10 }} value={data.availabilityOther}
              onChange={(e) => set("availabilityOther", e.target.value)} placeholder="Your availability per week" />
            {errors.availabilityOther && <div className="err-msg">{errors.availabilityOther}</div>}
          </>
        )}
        {errors.availability && <div className="err-msg">{errors.availability}</div>}
      </Field>
      <div className="field-row">
        <Field label="Earliest start date">
          <div className="choice-row">
            {START_OPTIONS.map((o) => (
              <button key={o} type="button" className={`choice ${data.startDate === o ? "sel" : ""}`}
                onClick={() => set("startDate", o)}>{o}</button>
            ))}
          </div>
          {data.startDate === "Other" && (
            <>
              <input className={`input ${errors.startDateOther ? "err" : ""}`} style={{ marginTop: 10 }} value={data.startDateOther}
                onChange={(e) => set("startDateOther", e.target.value)} placeholder="Your earliest start date" />
              {errors.startDateOther && <div className="err-msg">{errors.startDateOther}</div>}
            </>
          )}
        </Field>
        <Field label="Hourly rate expectation" hint="AUD">
          <input className="input" value={data.rate} onChange={(e) => set("rate", e.target.value)}
            placeholder="e.g. $90–120 / hr" />
        </Field>
      </div>
    </div>
  );
}

function StepWork({ data, set, toggle, errors }: StepToggleProps) {
  return (
    <div>
      <Field label="Examples of projects you have shipped" required hint="links welcome">
        <textarea className={`textarea ${errors.projects ? "err" : ""}`} value={data.projects}
          onChange={(e) => set("projects", e.target.value)} rows={4}
          placeholder="What did you build, your role, the stack, and the outcome. Drop links where you can." />
        {errors.projects && <div className="err-msg">{errors.projects}</div>}
      </Field>
      <Field label="What kind of startup work are you most interested in?">
        <div className="choice-row">
          {INTEREST_OPTIONS.map((o) => (
            <button key={o} type="button" className={`chip-pick ${data.interests.includes(o) ? "sel" : ""}`}
              onClick={() => toggle("interests", o)}>{o}</button>
          ))}
        </div>
        {data.interests.includes("Other") && (
          <>
            <TagInput value={data.interestsOther} onChange={(v) => set("interestsOther", v)}
              placeholder="Type an interest and press Enter" />
            {errors.interestsOther && <div className="err-msg">{errors.interestsOther}</div>}
          </>
        )}
      </Field>
      <Field label="Anything else we should know?">
        <textarea className="textarea" value={data.anything} onChange={(e) => set("anything", e.target.value)}
          rows={3} placeholder="Optional — the floor is yours." />
      </Field>
    </div>
  );
}

function StepReview({ data, set, errors }: StepProps) {
  const withOther = (arr: string[], other: string[] | string) => {
    const extras = Array.isArray(other) ? other : other ? [other] : [];
    return arr.flatMap((s) => (s === "Other" ? extras : [s])).join(", ");
  };
  const oneOther = (val: string, other: string) => (val === "Other" && other ? other : val);
  const rows: [string, string][] = [
    ["Full name", data.fullName], ["Email", data.email], ["Phone", data.phone], ["Location", data.location],
    ["Legal to work in AU", data.legalWork], ["Visa / restrictions", data.visa],
    ["LinkedIn", data.linkedin], ["GitHub", data.github], ["Portfolio", data.portfolio],
    ["Main skills", withOther(data.skills, data.skillsOther)], ["AI tools", withOther(data.aiTools, data.aiToolsOther)],
    ["Availability", oneOther(data.availability, data.availabilityOther)],
    ["Earliest start", oneOther(data.startDate, data.startDateOther)], ["Rate", data.rate],
    ["Projects shipped", data.projects], ["Interested in", withOther(data.interests, data.interestsOther)],
    ["Anything else", data.anything],
  ];
  return (
    <div>
      <p className="lead" style={{ fontSize: 16, marginBottom: 22 }}>
        Quick once-over. Tap any earlier step to fix something.
      </p>
      <div className="review-list">
        {rows.map(([k, v]) => (
          <div className="review-item" key={k}>
            <div className="k">{k}</div>
            <div className={`v ${v ? "" : "empty"}`}>{v || "—"}</div>
          </div>
        ))}
      </div>
      <label className={`consent ${errors.consent ? "err" : ""}`}>
        <input type="checkbox" checked={data.consent} onChange={(e) => set("consent", e.target.checked)} />
        <span className="consent-box" aria-hidden="true">{data.consent ? "✓" : ""}</span>
        <span className="consent-text">
          By submitting this application, you consent to MLAI collecting and storing the personal
          information you provide (including contact and work-eligibility details) for the purpose of
          vetting and matching you to startup projects. Your information is accessible only to the
          MLAI Studio review team and is shared with potential clients only with your consent. You may
          request access to, or deletion of, your data at any time by emailing{" "}
          <a href="mailto:hi@mlai.au">hi@mlai.au</a>. See our{" "}
          <a href="https://mlai.au/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
        </span>
      </label>
      {errors.consent && <div className="err-msg" style={{ marginTop: 4 }}>{errors.consent}</div>}
    </div>
  );
}

function SuccessScreen({ name, onReset }: { name: string; onReset: () => void }) {
  const first = (name || "").trim().split(" ")[0];
  return (
    <div className="form-shell">
      <div className="success">
        <div className="success-badge">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2>{first ? `You're in the queue, ${first}.` : "You're in the queue."}</h2>
        <p>Your application is with the MLAI Studio team. We review work, communication and technical fit — and we'll be in touch when there's a project match.</p>
        <div className="success-card">
          <img src="/mlai-studio/mascot-teal.png" alt="" style={{ width: 56, flexShrink: 0 }} />
          <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--mlai-ink-3)" }}>
            <b style={{ color: "var(--mlai-ink)" }}>What's next?</b> Keep your GitHub fresh. We match builders to scoped, paid startup work as it comes through.
          </div>
        </div>
        <button className="btn btn-outline" style={{ marginTop: 28 }} onClick={onReset} type="button">Submit another →</button>
      </div>
    </div>
  );
}
