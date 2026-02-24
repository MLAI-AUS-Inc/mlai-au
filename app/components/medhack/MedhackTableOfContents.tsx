import { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import clsx from "clsx";
import { MEDHACK_SECTIONS } from "~/data/medhack-frontiers";

export default function MedhackTableOfContents() {
  const [activeId, setActiveId] = useState<string>(MEDHACK_SECTIONS[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of MEDHACK_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-24" aria-label="Table of contents">
        <ul className="space-y-1">
          {MEDHACK_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollTo(section.id)}
                className={clsx(
                  "block w-full text-left px-3 py-1.5 text-sm transition-colors border-l-2",
                  activeId === section.id
                    ? "text-[#e2a9f1] border-[#e2a9f1] font-medium"
                    : "text-white/50 border-transparent hover:text-white/70"
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible dropdown */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#110822]/90 backdrop-blur-md border-b border-white/10 px-4 py-2">
        <Disclosure>
          {({ open, close }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg bg-[#1a0e2e] px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors">
                <span>Jump to section</span>
                <svg
                  className={clsx(
                    "h-4 w-4 transition-transform",
                    open && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </DisclosureButton>
              <DisclosurePanel className="mt-2 rounded-lg bg-[#1a0e2e] border border-white/10 p-2">
                <ul className="space-y-0.5">
                  {MEDHACK_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => {
                          scrollTo(section.id);
                          close();
                        }}
                        className={clsx(
                          "block w-full text-left rounded-md px-3 py-2 text-sm transition-colors",
                          activeId === section.id
                            ? "text-[#e2a9f1] bg-[#e2a9f1]/10 font-medium"
                            : "text-white/50 hover:text-white/70 hover:bg-white/5"
                        )}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
