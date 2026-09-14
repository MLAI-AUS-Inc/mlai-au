import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Compass, Loader2, Plus, Sparkles, X } from "lucide-react";
import { clsx } from "clsx";
import { ISLAND_BRIEF_EXAMPLES, ISLAND_FOCUSES, islandExampleAngles, islandFocusBrief, suggestIslandName } from "~/lib/custom-content-island";
import type { CustomIslandBrief, IslandFocus } from "~/lib/custom-content-island";
import { VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS } from "~/lib/vibe-marketing-billing";
import type { VibeMarketingTopicPillar } from "~/types/vibe-marketing";

const inputClass = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";
const primaryClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (brief: CustomIslandBrief) => void;
  saving: boolean;
  error?: string | null;
  savedIsland?: VibeMarketingTopicPillar | null;
  onGenerate: (island: VibeMarketingTopicPillar) => void;
  researchBusy?: boolean;
}

export default function CustomContentIslandBuilder({ open, onClose, onSave, saving, error, savedIsland, onGenerate, researchBusy }: Props) {
  const [step, setStep] = useState(0);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [focus, setFocus] = useState<IslandFocus>("start");
  const [customDirection, setCustomDirection] = useState("");
  const [theme, setTheme] = useState("");
  const [name, setName] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastSuggestedName = useRef("");
  const focusOption = ISLAND_FOCUSES.find((option) => option.id === focus)!;
  const contentFocus = islandFocusBrief(focus, customDirection);
  const cost = VIBE_MARKETING_CONTENT_ISLAND_TOPIC_COST_POINTS;
  useEffect(() => { if (open) titleRef.current?.focus(); }, [open, step, savedIsland]);

  const title = savedIsland ? "Your new island is ready" : ["What is your island about?", "Find your content direction", "Make this island yours"][step];
  function advance() {
    if (step === 0) {
      if (!theme) setTheme(subject);
      setStep(1);
    } else if (step === 1) {
      const suggestion = suggestIslandName(theme, focus);
      if (!name || name === lastSuggestedName.current) setName(suggestion);
      lastSuggestedName.current = suggestion;
      setStep(2);
    } else {
      onSave({ subject: subject.trim(), description: description.trim(), audience: audience.trim(),
        focus: contentFocus, name: name.trim(), keyword: theme.trim() });
    }
  }

  return (
    <Dialog open={open} onClose={() => { if (!saving) onClose(); }} className="relative z-[70]">
      <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-8">
          <DialogPanel className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-slate-100 px-5 pb-6 pt-7 sm:px-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-violet-700"><Compass className="h-4 w-4" /> New content island</span>
                <button type="button" disabled={saving} onClick={onClose} aria-label="Close island builder" className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-violet-100 disabled:opacity-40"><X className="h-5 w-5" /></button>
              </div>
              {!savedIsland && <ol aria-label="Your progress" className="mb-6 flex items-center gap-3 text-xs font-bold text-slate-500">
                {["Describe", "Explore", "Create"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined} className={clsx("flex items-center gap-2", index <= step && "text-violet-700")}><span className={clsx("flex h-6 w-6 items-center justify-center rounded-full", index <= step ? "bg-violet-100" : "bg-slate-100")}>{index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>{label}{index < 2 && <span aria-hidden="true" className="ml-1 h-px w-4 bg-slate-200 sm:w-8" />}</li>)}
              </ol>}
              <DialogTitle ref={titleRef} tabIndex={-1} className="text-2xl font-black tracking-tight text-slate-950 outline-none sm:text-3xl">{title}</DialogTitle>
              <p className="mt-2 text-sm leading-6 text-slate-500">{savedIsland ? "A home for content built around your subject and audience." : ["Start with any topic, audience need, service, product or feature. We’ll help you shape it into a content island.", "Choose the kind of help your audience needs. Each direction can support many articles.", "Give your island a clear name and check its brief. You can generate topic ideas as soon as it is saved."][step]}</p>
            </div>

            {savedIsland ? <div className="px-5 py-6 sm:px-8">
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <CheckCircle2 className="mb-3 h-8 w-8 text-violet-700" />
                <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Saved to your content islands</p>
                <h3 className="mt-2 break-words text-xl font-black text-slate-950">{savedIsland.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Your subject, audience and chosen focus will guide topic research every time you use this island.</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">Ready for your first ideas? Research will find and score topics around your brief. Search demand is not researched yet.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                <button type="button" disabled={researchBusy || saving} onClick={() => onGenerate(savedIsland)} className={primaryClass}><Sparkles className="h-4 w-4" />Generate 4 ideas · {cost} Roo Point{cost === 1 ? "" : "s"}</button>
                <button type="button" onClick={onClose} className="min-h-12 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">Explore my island</button>
              </div>
            </div> : <form onSubmit={(event) => { event.preventDefault(); if (!saving) advance(); }}>
              <div className="space-y-5 px-5 py-6 sm:px-8">
                {step === 0 && <>
                  <div><p className="mb-2 text-xs font-semibold text-slate-500">Try an example, or start with your own idea</p><div className="flex flex-wrap gap-2">{ISLAND_BRIEF_EXAMPLES.map((example) => <button key={example.label} type="button" onClick={() => { setSubject(example.subject); setDescription(example.description); setAudience(example.audience); setTheme(example.subject); }} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 hover:bg-violet-100"><Sparkles className="h-3.5 w-3.5" />{example.label}</button>)}</div></div>
                  <label className="block text-sm font-bold text-slate-800">Topic or subject<input required minLength={1} maxLength={120} value={subject} onChange={(event) => setSubject(event.target.value)} className={inputClass} placeholder="e.g. Small-space gardening, team wellbeing, a new service" /></label>
                  <label className="block text-sm font-bold text-slate-800">What should this island cover?<span className="mt-1 block text-xs font-medium leading-5 text-slate-500">Describe the ideas, questions or problems you want to explore. Include any goals or boundaries.</span><textarea required minLength={20} maxLength={2000} rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} placeholder="I want to share practical advice, answer common questions and explore…" /></label>
                  <label className="block text-sm font-bold text-slate-800">Who do you want to reach?<input required minLength={3} maxLength={300} value={audience} onChange={(event) => setAudience(event.target.value)} className={inputClass} placeholder="e.g. Curious beginners, local families, experienced designers" /></label>
                </>}
                {step === 1 && <>
                  <label className="block text-sm font-bold text-slate-800">What would your audience search for?<span className="mt-1 block text-xs font-medium leading-5 text-slate-500">Use the words your audience would use to find this topic. You can keep or refine the subject above.</span><input required minLength={1} maxLength={200} value={theme} onChange={(event) => setTheme(event.target.value)} className={inputClass} /></label>
                  <fieldset><legend className="mb-3 text-sm font-bold text-slate-800">What should your content help them do?</legend><div className="space-y-3">{ISLAND_FOCUSES.map((option) => <label key={option.id} className={clsx("flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-violet-100", focus === option.id ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-violet-300")}><input type="radio" name="content-focus" value={option.id} checked={focus === option.id} onChange={() => setFocus(option.id)} className="sr-only" /><span aria-hidden="true" className={clsx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", focus === option.id ? "border-violet-700 bg-violet-700 text-white" : "border-slate-300 bg-white")}>{focus === option.id && <Check className="h-3 w-3" />}</span><span><span className="block text-sm font-bold text-slate-900">{option.label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{option.summary}</span></span></label>)}</div></fieldset>
                  {focus === "custom" && <label className="block text-sm font-bold text-slate-800">Your content direction<span className="mt-1 block text-xs font-medium leading-5 text-slate-500">Tell us what you want readers to learn, feel or do. Add any angles to include or avoid.</span><textarea required minLength={3} maxLength={500} rows={3} value={customDirection} onChange={(event) => setCustomDirection(event.target.value)} className={inputClass} placeholder="e.g. Share local stories that inspire people to volunteer, with ways to get involved." /></label>}
                  {focus !== "custom" && <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-600">Example article angles · not researched yet</p><ul className="mt-2 space-y-2">{islandExampleAngles(theme, focus).map((angle) => <li key={angle} className="flex gap-2 text-sm leading-5 text-slate-700"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />{angle}</li>)}</ul></div>}
                </>}
                {step === 2 && <>
                  <label className="block text-sm font-bold text-slate-800">Island name<input required minLength={1} maxLength={160} value={name} onChange={(event) => setName(event.target.value)} className={inputClass} /></label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-black uppercase tracking-wider text-violet-700">Your content brief</p><dl className="mt-4 space-y-4 text-sm"><div><dt className="font-bold text-slate-900">What you’re covering</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-6 text-slate-600">{subject} — {description}</dd></div><div><dt className="font-bold text-slate-900">Who you’re helping</dt><dd className="mt-1 break-words leading-6 text-slate-600">{audience}</dd></div><div><dt className="font-bold text-slate-900">Content focus</dt><dd className="mt-1 whitespace-pre-wrap break-words leading-6 text-slate-600">{focus === "custom" ? contentFocus : focusOption.summary}</dd></div><div><dt className="font-bold text-slate-900">Search theme</dt><dd className="mt-1 break-words leading-6 text-slate-600">{theme}</dd></div></dl></div>
                  <p className="flex items-start gap-2 text-xs leading-5 text-slate-500"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />Creating an island is free. Topic research is a separate step and costs {cost} Roo Point{cost === 1 ? "" : "s"}.</p>
                </>}
                {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error} Your brief is still here; you can try saving again.</p>}
              </div>
              <div className="sticky bottom-0 z-10 flex flex-col-reverse gap-3 rounded-b-3xl border-t border-slate-100 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <button type="button" disabled={saving} onClick={() => step ? setStep(step - 1) : onClose()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50">{step > 0 && <ArrowLeft className="h-4 w-4" />}{step ? "Back" : "Finish later"}</button>
                <button type="submit" disabled={saving} className={primaryClass}>{saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving your island…</> : step === 2 ? <><Plus className="h-4 w-4" />Create island · free</> : <>{step === 0 ? "Explore content directions" : "Review my island"}<ArrowRight className="h-4 w-4" /></>}</button>
              </div>
            </form>}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
