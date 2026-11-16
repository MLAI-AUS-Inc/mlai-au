// Placeholder: replaced by the section build.
import { sections } from "~/data/kindness";

export default function Behind() {
  if (!sections.behind.show) return null;
  return <section id="whos-behind-it" className="rk-sec" />;
}
