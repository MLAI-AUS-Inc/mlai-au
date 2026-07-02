/* ============================================================
   MLAI VOLUNTEERS — content model
   Ported from the Claude Design handoff (public/volunteers/README.md
   + Volunteers.dc.html). All copy is final/approved.
   ============================================================ */

export const SLACK_INVITE =
  "https://join.slack.com/t/mlai-aus/shared_invite/zt-3xsuoq3yb-_hah3nVNtga9pFQUvsxJeQ";
export const ROO_URL = "https://mlai.au/roo";

export const JUMP_ITEMS: { id: string; label: string }[] = [
  { id: "why", label: "Why volunteer" },
  { id: "join", label: "How to join" },
  { id: "roles", label: "What volunteers do" },
  { id: "earn", label: "Earn Roo Points" },
  { id: "perks", label: "Perks" },
  { id: "faq", label: "FAQ" },
];

export type BenefitCard = { emoji: string; title: string; body: string; bg: string; fg: string; bodyFg: string; highlight?: string };
export const BENEFITS: BenefitCard[] = [
  { emoji: "🛠️", title: "Real builder skills", bg: "#ff003d", fg: "#fff", bodyFg: "#ffd6e0", body: "Run events, ship content, mentor founders, build tools. Volunteering at MLAI is reps you can't get from a course." },
  { emoji: "🤝", title: "A serious network", bg: "#4b0db3", fg: "#fff", bodyFg: "#d9ccf5", body: "Work shoulder-to-shoulder with founders, operators, researchers and the MLAI Team. The room remembers who shows up." },
  { emoji: "🪙", title: "Earn Roo Points", bg: "#00ffd7", fg: "#1a1a1a", bodyFg: "#1a1a1a", body: "Meaningful work earns Roo Points you can spend on coworking, event tickets, mentoring and merch. Volunteer work is the main way to earn." },
  { emoji: "🚀", title: "Back the mission", bg: "#1a1a1a", fg: "#fff", bodyFg: "#b8b2a4", body: "Help create 1,000 Australian startups by 2030. Every shift, post and intro moves it forward.", highlight: "1,000 Australian startups by 2030" },
];

export type Stat = { n: string; label: string; bg: string; fg: string; dim: number };
export const STATS: Stat[] = [
  { n: "1000", label: "startups by 2030", bg: "#ff3c00", fg: "#fff", dim: 0.92 },
  { n: "100%", label: "volunteer-run", bg: "#4b0db3", fg: "#fff", dim: 0.92 },
  { n: "6", label: "ways to help", bg: "#fefc22", fg: "#1a1a1a", dim: 0.75 },
  { n: "~10min", label: "≈ 1 Roo Point", bg: "#3637dc", fg: "#fff", dim: 0.92 },
];

export type Step = { n: string; title: string; body: string; bg: string; fg: string; pillBg: string };
export const STEPS: Step[] = [
  { n: "STEP 01", title: "Join the Slack", body: "The community lives in Slack. Jump in — that's where Roo, the team and every task live.", bg: "#00ffd7", fg: "#1a1a1a", pillBg: "rgba(0,0,0,.12)" },
  { n: "STEP 02", title: "Introduce yourself", body: "Post a quick intro in #_start-here — who you are, what you're building, how you'd like to help. That's +2 Roo Points.", bg: "#fefc22", fg: "#1a1a1a", pillBg: "rgba(0,0,0,.1)" },
  { n: "STEP 03", title: "Pick a role or task", body: "Claim something that fits your time from the roles below — an event shift, a post, a mentoring slot.", bg: "#ff3c00", fg: "#fff", pillBg: "rgba(255,255,255,.16)" },
  { n: "STEP 04", title: "Do it & tag @Roo", body: "Do the work, tag @Roo and an MLAI Team member, and ask for your Roo Points. They approve — Roo logs it.", bg: "#3637dc", fg: "#fff", pillBg: "rgba(255,255,255,.16)" },
];

export type Role = { emoji: string; name: string; blurb: string; color: string; fg: string; chipBg: string; tasks: string[] };
export const ROLES: Role[] = [
  { emoji: "🎪", name: "Event Crew", blurb: "Make meetups & hackathons actually happen.", color: "#ff3c00", fg: "#fff", chipBg: "rgba(255,255,255,.16)", tasks: ["Setup & pack-down", "Registration desk", "Help run workshops", "AV & logistics"] },
  { emoji: "📣", name: "Content & Social", blurb: "Tell the story — write, design, film, boost.", color: "#3637dc", fg: "#fff", chipBg: "rgba(255,255,255,.16)", tasks: ["Write articles & docs", "Design graphics", "Film & edit clips", "#link-love boosts"] },
  { emoji: "💬", name: "Community Crew", blurb: "Keep Slack warm and newcomers moving.", color: "#00ffd7", fg: "#1a1a1a", chipBg: "rgba(0,0,0,.10)", tasks: ["Welcome in #_start-here", "Answer questions", "Keep channels healthy", "Weekly updates"] },
  { emoji: "🤝", name: "Mentor", blurb: "Help founders get unstuck.", color: "#4b0db3", fg: "#fff", chipBg: "rgba(255,255,255,.16)", tasks: ["Office hours", "Deep-dive mentoring", "Review pitches", "Give a talk"] },
  { emoji: "💻", name: "Builder", blurb: "Ship the tools the community runs on.", color: "#ff003d", fg: "#fff", chipBg: "rgba(255,255,255,.16)", tasks: ["Build the platform", "Fix bugs", "Internal tools", "Data & research"] },
  { emoji: "🧭", name: "Partnerships", blurb: "Bring in sponsors, grants & partners.", color: "#fefc22", fg: "#1a1a1a", chipBg: "rgba(0,0,0,.10)", tasks: ["Sponsor outreach", "Grants & research", "Partner logistics", "Warm intros"] },
];

export type Activity = { key: string; label: string; pts: number };
export const ACTIVITIES: Activity[] = [
  { key: "boost", label: "Boost a founder in #link-love", pts: 1 },
  { key: "update", label: "Monthly startup update", pts: 10 },
  { key: "shift", label: "Volunteer an event shift", pts: 14 },
  { key: "workshop", label: "Help run a workshop", pts: 20 },
  { key: "office", label: "Run an office-hours session", pts: 12 },
];
export const ESTIMATOR_DEFAULT = ["boost", "shift"];

export function unlockText(total: number): string {
  if (total >= 48) return "Enough for a free workshop ticket — or a hot-desk week.";
  if (total >= 24) return "Enough for a deep-dive mentoring session.";
  if (total >= 12) return "Enough for a free community event ticket.";
  if (total >= 4) return "Enough for a hot-desk coworking day.";
  if (total >= 1) return "Enough for a sticker — keep going!";
  return "Tap activities to see what they could unlock.";
}

export const APPROVAL_STEPS = [
  "A lead or MLAI Team member posts or assigns the task.",
  "You do the work.",
  "Tag @Roo + the team member and ask for X points for Y.",
  "They approve it — Roo logs the award to your balance.",
];

export type Perk = { emoji: string; title: string; sub: string; bg: string; fg: string; dim: number };
export const PERKS: Perk[] = [
  { emoji: "🪑", title: "Coworking", sub: "from 4 pts / hot-desk day", bg: "#fefc22", fg: "#1a1a1a", dim: 0.8 },
  { emoji: "🎟️", title: "Events", sub: "from 12 pts / ticket", bg: "#ff3c00", fg: "#fff", dim: 0.92 },
  { emoji: "🧠", title: "Mentoring", sub: "from 12 pts / office hours", bg: "#4b0db3", fg: "#fff", dim: 0.92 },
  { emoji: "👕", title: "Merch", sub: "from 1 pt / sticker", bg: "#00ffd7", fg: "#1a1a1a", dim: 0.8 },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "Do I need experience to volunteer?", a: "No. Most roles need reliability and good vibes, not credentials. Pick something small first — an intro, an event shift, a #link-love boost — and grow from there." },
  { q: "How much time does it take?", a: "As much or as little as you want. One shift, one post or one mentoring slot all count. There is no minimum commitment — Roo Points reward momentum, not busywork." },
  { q: "Is volunteering paid?", a: "No. MLAI is a not-for-profit, volunteer-run community. You earn Roo Points (which are not money and have no cash value) plus real reputation. Consistent contributors can be considered for paid work when relevant roles exist — but it is never automatic." },
  { q: "How do I earn Roo Points as a volunteer?", a: "Do organised work, then tag @Roo and the relevant MLAI Team member in Slack and ask for X points for doing Y. They approve it and Roo logs the award. Roughly 1 point reflects about 10 minutes of meaningful contribution." },
  { q: "What's the difference between a volunteer and the MLAI Team?", a: "Volunteers help out on tasks and events. The MLAI Team posts and assigns work, approves Roo Points, and keeps things accountable. Volunteers who show up consistently often get invited deeper — including into Team roles." },
  { q: "Can students volunteer?", a: "Absolutely — students are very welcome. Volunteering is one of the best ways to build skills, meet founders and operators, and find a way into AI and startups in Australia." },
  { q: "Where do I apply?", a: "There is no long form. Join the MLAI Slack, post an intro in #_start-here, and let the team know how you would like to help. Tap any 'I want to volunteer' button on this page to get started." },
];
