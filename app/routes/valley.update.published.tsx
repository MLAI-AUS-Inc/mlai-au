import { Link } from "react-router";
import { ValleyFrame } from "~/components/valley/ValleyFrame";
import { useValleyState, verifiedStatus } from "~/lib/valley-state";

export const meta = () => [
  { title: "Valley — Update published" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function ValleyPublished() {
  const { state } = useValleyState();
  const { publishedCount, verified } = verifiedStatus(state);
  const justUnlocked = verified && publishedCount === 3;

  return (
    <ValleyFrame title="Published" hideNav>
      <div className="flex flex-col items-center pt-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#008080] text-white shadow-[0_8px_30px_-10px_rgba(0,128,128,0.5)]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-[#0b0b0b]">
          {justUnlocked ? "You're a verified founder" : "Update published"}
        </h1>
        <p className="mt-2 max-w-xs text-sm text-[#727171]">
          {justUnlocked
            ? "Three months of real metrics — your profile is now live in the investor directory and eligible for VIC Gov grants."
            : `That's ${publishedCount} of 3 monthly updates. ${
                3 - publishedCount
              } more and the verified badge unlocks.`}
        </p>

        {justUnlocked ? (
          <div className="mt-6 w-full rounded-2xl border-2 border-[#008080] bg-white p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008080] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0b0b0b]">Verified badge unlocked</div>
                <div className="text-[11px] text-[#727171]">
                  {state.founder.company} · {state.founder.location}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 w-full">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#727171]">
              <span>Verification progress</span>
              <span>{publishedCount}/3</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#ece5d4]">
              <div
                className="h-full rounded-full bg-[#008080] transition-all"
                style={{ width: `${(Math.min(publishedCount, 3) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex w-full flex-col gap-3">
          <Link
            to="/valley/profile"
            className="w-full rounded-full bg-[#0b0b0b] py-3 text-sm font-semibold text-[#f9f7f2]"
          >
            View investor profile
          </Link>
          <Link
            to="/valley"
            className="w-full rounded-full border border-[#0b0b0b] bg-white py-3 text-sm font-semibold text-[#0b0b0b]"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </ValleyFrame>
  );
}
