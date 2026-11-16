// Placeholder: replaced by the section build.
import { sections } from "~/data/kindness";

export default function Encore() {
  if (!sections.contact.show) return null;
  return <footer id="contact" className="rk-encore" />;
}
