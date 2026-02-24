import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import type { MedhackPerson } from "~/data/medhack-frontiers";

interface MedhackPeopleProps {
  people: MedhackPerson[];
  title: string;
  sectionId: string;
}

export default function MedhackPeople({
  people,
  title,
  sectionId,
}: MedhackPeopleProps) {
  return (
    <section id={sectionId} className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold text-white">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person) => (
          <div
            key={person.name}
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-5"
          >
            <h3 className="text-lg font-semibold text-white">{person.name}</h3>
            <p className="text-sm text-[#e2a9f1]">
              {person.org ? `${person.role}, ${person.org}` : person.role}
            </p>

            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="text-xs text-white/50 hover:text-white/70 mt-2 transition-colors">
                    {open ? "Hide bio" : "Show bio"}
                  </DisclosureButton>
                  <DisclosurePanel className="text-sm text-white/60 mt-2 leading-relaxed">
                    {person.bio}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </section>
  );
}
