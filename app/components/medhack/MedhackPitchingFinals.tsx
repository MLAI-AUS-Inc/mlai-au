import { Link } from "react-router";

export default function MedhackPitchingFinals() {
  return (
    <section id="pitching-finals" className="scroll-mt-24 space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">
          Sunday, 19 July
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white">
          Large Tract: Semifinals &amp; Finals
        </h2>
        <p className="mt-3 max-w-3xl text-white/70 leading-relaxed">
          Large Tract teams will pitch in the semifinals from 4:00 PM. The top
          six teams will be announced at 6:05 PM and invited to pitch again in
          the Grand Finals from 6:15 PM.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-indigo-400/25 bg-indigo-950/45 p-6">
          <p className="font-mono text-sm font-bold text-indigo-300">
            4:00–5:45 PM
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">Semifinals</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Pitch your healthcare solution to a semifinal judging panel while
            Small Tract submissions complete technical verification.
          </p>
        </div>
        <div className="rounded-2xl border border-indigo-300/35 bg-gradient-to-br from-indigo-600/35 to-indigo-950/55 p-6 shadow-[0_18px_50px_rgba(49,46,129,0.25)]">
          <p className="font-mono text-sm font-bold text-indigo-200">
            6:15 PM
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">Grand Finals</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            The top six pitching teams return to the stage for the Grand
            Finals, followed by judging and the awards ceremony.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-indigo-300/35 bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-950 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
              Featured pitching resource
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              Learn How to Pitch Your Idea
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
              Shape a clear story, explain the value of your solution, and get
              ready for both the semifinal and final judging panels.
            </p>
          </div>
          <Link
            to="/articles/featured/how-to-pitch-your-idea"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-indigo-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
          >
            Read the pitching guide
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
