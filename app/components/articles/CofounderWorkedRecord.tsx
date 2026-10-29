/** A native disclosure keeps the complete teaching record available without JS. */
export function CofounderWorkedRecord({ id, title, label, fields, values }: { id: string; title: string; label: string; fields: readonly string[]; values: readonly string[] }) {
  if (fields.length !== values.length) throw new Error("A cofounder record needs a value for every field");
  return <details id={id} className="my-6 rounded-xl border border-slate-300 bg-slate-50 p-5">
    <summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">{title}</summary>
    <dl aria-label={label}>{fields.map((field, index) => <div key={field} className="my-5"><dt className="font-semibold">{field}</dt><dd className="ml-0 mt-1">{values[index]}</dd></div>)}</dl>
  </details>;
}
