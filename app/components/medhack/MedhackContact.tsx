import { MEDHACK_CONTACTS } from "~/data/medhack-frontiers";

export default function MedhackContact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-white mb-2">
        Contact & Socials
      </h2>
      <p className="text-white/70 mb-8">Get in touch with us</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MEDHACK_CONTACTS.map((contact) => (
          <a
            key={contact.platform}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-5 hover:bg-[#783f8e]/20 transition-colors"
          >
            <span className="text-sm font-bold uppercase text-[#e2a9f1] tracking-wide">
              {contact.platform}
            </span>
            <p className="text-lg font-medium text-white mt-1">
              {contact.label}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
