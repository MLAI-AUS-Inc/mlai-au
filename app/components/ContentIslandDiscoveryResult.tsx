import { Link } from "react-router";

export default function ContentIslandDiscoveryResult({
  status,
  runId,
  onRefresh,
}: {
  status: string;
  runId: string;
  onRefresh: () => void;
}) {
  const reviewPath = `/founder-tools/marketing/runs/${encodeURIComponent(runId)}`;
  if (status === "awaiting_confirmation") {
    return (
      <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm" role="status">
        <p className="font-bold text-violet-950">Your article ideas are ready to review.</p>
        <p className="mt-1 text-violet-800">Choose an idea from the research result to start a draft.</p>
        <Link className="mt-3 inline-flex rounded-lg bg-violet-700 px-4 py-2 font-bold text-white hover:bg-violet-800" to={reviewPath}>Review article ideas</Link>
      </div>
    );
  }
  if (status === "completed") {
    return (
      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm" role="status">
        <p className="font-bold text-amber-950">Research finished, but no new eligible idea is in the topic picker.</p>
        <p className="mt-1 text-amber-800">Review the research result or check the picker again.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="inline-flex rounded-lg bg-amber-900 px-4 py-2 font-bold text-white hover:bg-amber-950" to={reviewPath}>Review research result</Link>
          <button type="button" className="rounded-lg border border-amber-300 px-4 py-2 font-bold text-amber-950 hover:bg-amber-100" onClick={onRefresh}>Check for ideas again</button>
        </div>
      </div>
    );
  }
  return null;
}
