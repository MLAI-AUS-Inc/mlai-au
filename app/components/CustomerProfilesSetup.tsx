import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFetcher } from "react-router";
import EditorialCatalogEditor from "./EditorialCatalogEditor";
import { editorialCatalogHref } from "./EditorialBriefFields";
import type { EditorialCatalogState } from "~/lib/editorial-catalog";
import { parseCustomerSuggestions, type CustomerSuggestions } from "~/lib/customer-profile-suggestions";

type Props = { companyId: string; companyName: string; domain: string; suggestions?: unknown; onSuggest?: () => void; researching?: boolean };
export default function CustomerProfilesSetup(props: Props) { return <ProfileSetup key={props.companyId} {...props} />; }
function ProfileSetup({ companyId, companyName, domain, suggestions, onSuggest, researching }: Props) {
  const fetcher = useFetcher<{companyId: string; state: EditorialCatalogState; suggestions?: CustomerSuggestions | null}>();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [changed, setChanged] = useState(false);
  const suggested = parseCustomerSuggestions(suggestions, domain);
  useEffect(() => { if (open && dialog.current && !dialog.current.open) dialog.current.showModal(); }, [open]);
  const close = () => { if (!changed || window.confirm("Close profile settings? Any unsaved draft changes will be discarded.")) { setOpen(false); setChanged(false); } };
  return <section className="my-6 rounded-xl border border-violet-200 bg-violet-50/40 p-5 space-y-3" aria-label="Ideal customer profiles">
    <h2 className="text-xl font-black text-slate-950">Who do you want to reach?</h2>
    <p className="text-sm text-slate-700">List your ideal customers and the next action you want each to take. Every article uses one profile to shape its examples, depth and call to action.</p>
    {suggested?.profiles.length ? <p className="text-sm font-bold">{suggested.profiles.length} customer profiles suggested from your website, ready for review.</p> : null}
    <div className="flex flex-wrap gap-3"><button type="button" disabled={!companyId} onClick={() => { setOpen(true); fetcher.load(editorialCatalogHref(companyId)); }} className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">Add or review customer profiles</button>{onSuggest ? <button type="button" disabled={researching} onClick={onSuggest} className="rounded-lg border border-violet-300 px-4 py-2 text-sm font-bold">{researching ? "Researching your website…" : "Suggest from my website"}</button> : null}</div>
    {!companyId ? <p className="text-sm">Save your startup details first, then add profiles. You can also return from marketing settings.</p> : null}
    {open && typeof document !== "undefined" ? createPortal(<dialog ref={dialog} onCancel={event => { event.preventDefault(); close(); }} onSubmit={event => event.stopPropagation()} onChange={event => event.stopPropagation()} className="m-auto max-h-[92vh] w-[min(1100px,96vw)] overflow-y-auto rounded-2xl bg-white p-0 backdrop:bg-black/50" aria-label="Customer profiles and desired actions">
      <div className="sticky top-0 z-10 flex justify-end border-b bg-white p-3"><button type="button" className="rounded-lg border px-4 py-2 font-bold" onClick={close}>Close</button></div>
      {fetcher.data?.companyId === companyId ? <EditorialCatalogEditor companyId={companyId} companyName={companyName} state={fetcher.data.state} suggestions={suggested ?? fetcher.data.suggestions} onDirtyChange={setChanged} /> : <p role="status" className="p-6">Loading customer profiles…</p>}
    </dialog>, document.body) : null}
  </section>;
}
