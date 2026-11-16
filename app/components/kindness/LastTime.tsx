// Placeholder: replaced by the section build.
import { sections } from "~/data/kindness";

export default function LastTime() {
  if (!sections.lastTime.show) return null;
  return <section id="last-time" className="rk-sec" />;
}
