import { useId } from "react";

export function StartupOverview({ value }: { value?: string | null }) {
  if (!value?.trim()) return null;
  return <section aria-label="About this startup">
    <h3 className="mb-2 text-base font-bold text-gray-950">What we do</h3>
    <p className="whitespace-pre-line text-base leading-7 text-gray-800">{value}</p>
  </section>;
}

export function StartupOverviewField({ value, edited = false, onChange }: { value: string; edited?: boolean; onChange: (value: string) => void }) {
  const id = useId();
  return <div className="space-y-2">
    {(edited || value.trim()) ? <input type="hidden" name="startupOverview" value={value} /> : null}
    <label htmlFor={id} className="block text-base font-bold text-gray-950">What we do</label>
    <p id={`${id}-hint`} className="text-sm leading-6 text-gray-600">Introduce your startup in one or two sentences: what you do, who you help, and the problem you solve. Use everyday words and check that this saved description is still right.</p>
    <textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} rows={3} maxLength={2000}
      aria-describedby={`${id}-hint`} placeholder="We help … by …"
      className="w-full rounded-xl border border-gray-300 bg-white p-3 text-base leading-6 text-gray-900 focus:border-[var(--vr-color-primary)] focus:outline-none" />
    <p className="text-sm leading-6 text-gray-600">For each update below, say what changed and why it matters. Keep 1–2 summary points and up to 4 points per section. Explain specialist terms, keep names and useful details, and make each request clear about who can help and how.</p>
  </div>;
}
