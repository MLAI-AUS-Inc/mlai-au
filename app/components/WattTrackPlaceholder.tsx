import { wattClasses } from "~/lib/watt-theme";

export default function WattTrackPlaceholder() {
  return (
    <div className={wattClasses.page}>
      <div className="mx-auto max-w-7xl">
        <section
          aria-label="Track placeholder"
          className={`${wattClasses.panelStrong} flex min-h-[420px] items-center justify-center p-6 sm:p-10`}
        >
          <p className="text-lg font-black text-[#121e16]">add content here</p>
        </section>
      </div>
    </div>
  );
}
