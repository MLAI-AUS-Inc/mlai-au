export type IslandFocus = "start" | "implement" | "choose" | "custom";

export interface CustomIslandBrief {
  subject: string;
  description: string;
  audience: string;
  focus: string;
  name: string;
  keyword: string;
}

export const ISLAND_FOCUSES = [
  { id: "start", label: "Explain and explore", summary: "Answer questions, introduce ideas and help people understand a topic.", detail: "Help this audience understand the subject, explore different perspectives and answer their questions." },
  { id: "implement", label: "Share practical guidance", summary: "Teach useful skills, solve problems and share step-by-step advice.", detail: "Help this audience put ideas into practice, develop useful skills, solve relevant problems and learn from examples." },
  { id: "choose", label: "Compare options", summary: "Help people weigh up approaches and make informed choices.", detail: "Help this audience compare relevant options, understand their differences and trade-offs, and decide what fits their needs." },
  { id: "custom", label: "Define my own direction", summary: "Describe exactly what you want your content to achieve.", detail: "" },
] as const;

export function islandFocusBrief(focus: IslandFocus, customDirection = ""): string {
  return focus === "custom" ? customDirection.trim() : ISLAND_FOCUSES.find((option) => option.id === focus)!.detail;
}

export function suggestIslandName(theme: string, focus: IslandFocus): string {
  if (focus === "custom") return theme.trim().slice(0, 160);
  const suffix = { start: "explained", implement: "in practice", choose: "comparing options" }[focus];
  return `${theme.trim()}: ${suffix}`.slice(0, 160);
}

export function islandExampleAngles(theme: string, focus: IslandFocus): string[] {
  const subject = theme.trim() || "your topic";
  switch (focus) {
    case "start": return [`Where to start with ${subject}`, `Common mistakes to avoid with ${subject}`, `Your first steps towards ${subject}`];
    case "implement": return [`${subject}: a practical guide`, `${subject}: common problems and how to solve them`, `${subject}: lessons from real examples`];
    case "choose": return [`${subject}: comparing your options`, `${subject}: trade-offs to consider`, `${subject}: questions to ask before you decide`];
    case "custom": return [];
  }
}

export const ISLAND_BRIEF_EXAMPLES = [
  { label: "A topic", subject: "Small-space gardening", description: "Explore growing herbs and vegetables on balconies and small patios, including planting, seasonal care and common problems.", audience: "People who want to grow food at home with limited outdoor space." },
  { label: "A service", subject: "Home energy improvements", description: "Explain ways to reduce household energy use, compare upgrades and understand what to expect from a home energy assessment.", audience: "Homeowners looking for a more comfortable, energy-efficient home." },
  { label: "A product or feature", subject: "Automated invoice reminders", description: "Help freelancers understand how automated reminders work, plan useful follow-ups and spend less time chasing overdue invoices.", audience: "Freelancers and small teams who manage their own invoicing." },
] as const;
