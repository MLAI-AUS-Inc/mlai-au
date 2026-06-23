/* ============================================================
   MLAI PRESS KIT — content model
   Ported from the Claude Design handoff (design_handoff_press_kit/
   pk-data.jsx). All copy here is final/approved press content.
   ============================================================ */

export type PkStat = { big: string; label: string; c: string; t: string };
export type PkAsset = { file: string; name: string; note: string; bg: "cream" | "ink" };
export type PkColor = { name: string; hex: string; role: string; t: string };
export type PkFont = {
  name: string; role: string; sample: string;
  ff: string; weight: number; style: "normal" | "italic";
  tt: "uppercase" | "none"; size: number;
};
export type PkPerson = { name: string; img: string; role: string };
export type PkPressItem = { outlet: string; img: string; quote: string };
export type PkEvent = { tag: string; title: string; body: string; c: string; t: string };
export type PkSocial = { label: string; handle: string; href: string; c: string; t: string };

/* ---------- Key facts ---------- */
export const PK_FACTS: PkStat[] = [
  { big: "12,000+", label: "Members in the community", c: "#00ffd7", t: "#1a1a1a" },
  { big: "1000", label: "Aussie startups by 2030 — the mission", c: "#4b0db3", t: "#fff" },
  { big: "50+", label: "Sponsoring & partner organisations", c: "#ff3c00", t: "#fff" },
  { big: "100%", label: "Not-for-profit · volunteer-run", c: "#fefc22", t: "#1a1a1a" },
];

export const PK_FACTS_ROWS: [string, string][] = [
  ["Founded", "2023"],
  ["Type", "Not-for-profit · volunteer · community-first"],
  ["Home base", "Melbourne, VIC → expanding Australia-wide"],
  ["What we run", "Events · hackathons · coworking · workshops · weekly newsletter"],
  ["Mascot", "Roo — a red kangaroo in pixel deal-with-it shades"],
  ["Tagline", "Come for the AI. Stay for the community."],
];

/* ---------- Boilerplate copy ---------- */
export const PK_BOILER_SHORT =
  "MLAI is a Melbourne-based not-for-profit AI community helping Australians learn, build and launch startups through practical events, workshops, hackathons and founder-focused programs. Our mission is to help get 1,000 Australian startups off the ground by 2030, with a focus on AI-enabled companies, better local capability and more high-complexity exports. We have grown into a community of 12,000+ people, regularly running events with 100–300 attendees, major hackathons, sponsor-backed programs and partnerships across startups, government, universities and industry.";

export const PK_BOILER_LONG =
  "MLAI is a Melbourne-based not-for-profit AI community focused on helping Australians learn, build and start companies in the AI era. Our mission is to help get 1,000 Australian startups off the ground by 2030 by making AI practical, accessible and fun through community events, workshops, hackathons, build days and founder-focused programs. We bring together builders, clinicians, designers, students, operators, researchers, founders, investors and industry partners who want to learn together and turn ideas into real products.\n\nThe organisation has grown quickly into a community of 12,000+ people, with regular events drawing 100–300 attendees and larger hackathons attracting major sponsor, government and industry interest. MLAI has run AI startup events, build sessions, healthcare and energy-focused hackathons, and is developing repeatable programs that help people move from learning AI to building prototypes, forming teams and launching companies. We are volunteer-led, community-first and increasingly supported by partners who see MLAI as a practical entry point into Australia's emerging AI startup ecosystem.";

export const PK_QUOTE = {
  text: "MLAI has been a fantastic community for connecting with like-minded, talented people. Everyone has been warm, welcoming, and eager to talk nitty-gritty tech details.",
  who: "Xavier Andueza, Founding AI Engineer — Userdoc",
};

/* ---------- Logo & mascot asset manifest ---------- */
export const PK_ASSETS: PkAsset[] = [
  { file: "logo-wide-teal.png", name: "Horizontal lockup", note: "Teal disc · primary", bg: "cream" },
  { file: "logo-wide-black.png", name: "Horizontal lockup", note: "Black disc · mono", bg: "cream" },
  { file: "logo-stacked-teal.png", name: "Stacked lockup", note: "Teal disc", bg: "cream" },
  { file: "logo-stacked-black.png", name: "Stacked lockup", note: "Black disc · mono", bg: "cream" },
  { file: "mascot-teal.png", name: "Roo mascot", note: "Teal disc", bg: "ink" },
  { file: "mascot-black.png", name: "Roo mascot", note: "Black disc", bg: "cream" },
  { file: "roo-icon.png", name: "Roo icon / avatar", note: "2000×2000 · favicon", bg: "ink" },
  { file: "wordmark-black.png", name: "MLAI wordmark", note: "Type only", bg: "cream" },
  { file: "text-logo.png", name: "MLAI AUS wordmark", note: "Reversed · on dark", bg: "ink" },
];

/* Usage do / don't */
export const PK_DOS = [
  "Give the Roo room — keep clear space around every lockup.",
  "Use teal-disc lockups on cream; reversed / black on dark.",
  "Keep the logo flat — solid colour, no shadows, ever.",
  "Scale proportionally; the shades stay pixel-crisp.",
];
export const PK_DONTS = [
  "Don't recolour the Roo or swap the disc to off-brand hues.",
  "Don't add drop shadows, glows, gradients or outlines.",
  "Don't stretch, skew, rotate or crop into the mascot.",
  "Don't place a busy photo behind the logo — keep it flat.",
];

/* ---------- Palette ---------- */
export const PK_PALETTE: PkColor[] = [
  { name: "Electric Teal", hex: "#00ffd7", role: "Signature accent", t: "#1a1a1a" },
  { name: "Hot Orange", hex: "#ff3c00", role: "Energy · CTAs", t: "#fff" },
  { name: "Acid Yellow", hex: "#fefc22", role: "Highlight · marker", t: "#1a1a1a" },
  { name: "Electric Blue", hex: "#3637dc", role: "Focus · accent", t: "#fff" },
  { name: "Hot Red", hex: "#ff003d", role: "Accent · alert", t: "#fff" },
  { name: "Deep Purple", hex: "#4b0db3", role: "Accent", t: "#fff" },
  { name: "Ink", hex: "#1a1a1a", role: "Primary ink", t: "#f5f0e6" },
  { name: "Cream", hex: "#f5f0e6", role: "Paper background", t: "#1a1a1a" },
];

/* ---------- Fonts ---------- */
export const PK_FONTS: PkFont[] = [
  { name: "Oswald", role: "Display · headings · big numbers", sample: "PRESS START", ff: "'Oswald', 'Arial Narrow', sans-serif", weight: 700, style: "normal", tt: "uppercase", size: 48 },
  { name: "Roboto", role: "Body · UI · captions", sample: "Come for the AI.", ff: "'Roboto', system-ui, sans-serif", weight: 500, style: "normal", tt: "none", size: 34 },
  { name: "Source Serif 4", role: "Pull-quotes only", sample: "Stay for the community.", ff: "'Source Serif 4', Georgia, serif", weight: 400, style: "italic", tt: "none", size: 34 },
];

/* ---------- Team ---------- */
export const PK_TEAM: PkPerson[] = [
  { name: "Sam Donegan", img: "team-sam-donegan.png", role: "President" },
  { name: "Sonia Kaurah", img: "team-sonia-kaurah.webp", role: "VP External & Growth" },
  { name: "Alisa Belova", img: "team-alisa-belova.png", role: "VP Community & Operations" },
  { name: "Pegah Khaleghi", img: "team-pegah-khaleghi.png", role: "Treasurer" },
  { name: "Anjali Singh", img: "team-anjali-singh.jpeg", role: "Head of Marketing" },
  { name: "Juan Bernal", img: "team-juan-bernal.png", role: "Tech Lead" },
];

/* ---------- Press mentions ---------- */
export const PK_PRESS: PkPressItem[] = [
  { outlet: "Rachel Zhao, Woofya", img: "press-rachel-zhao.jpeg", quote: "As we implement AI-powered features such as medication adherence tracking, the support from the MLAI community has been invaluable. The collaboration has helped accelerate our product development and provided opportunities to learn from leading AI practitioners in Australia." },
  { outlet: "Eike Zoller, Ecosystem Director — Stone & Chalk", img: "press-eike-zoller.jpg", quote: "It was an absolute pleasure to work with the MLAI team at Ecosystem Drinks: Talent meets Startups. It was amazing to see so many engaging members of the MLAI community in it for the startup speed dating." },
  { outlet: "Kendra Vant, Director — EuropaLabs", img: "press-kendra-vant.png", quote: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch, get involved!" },
];

/* ---------- Events & community ---------- */
export const PK_EVENTS: PkEvent[] = [
  { tag: "Hackathon", title: "Build weekends", body: "Ship a working AI prototype in 48 hours alongside hundreds of builders.", c: "#ff3c00", t: "#fff" },
  { tag: "In person", title: "Coworking", body: "Open coworking days where founders build in the same room, not on Zoom.", c: "#00ffd7", t: "#1a1a1a" },
  { tag: "Workshops", title: "Founder Tools", body: "Hands-on tracks: Coding, Marketing, Raising & Coworking.", c: "#3637dc", t: "#fff" },
  { tag: "Newsletter", title: "Weekly dispatch", body: "AI jobs, news, events & memes — your weekly dose on the path to 1,000 startups.", c: "#fefc22", t: "#1a1a1a" },
];

/* ---------- Social / contact ---------- */
export const PK_SOCIAL: PkSocial[] = [
  { label: "Website", handle: "mlai.au", href: "https://mlai.au", c: "#ff3c00", t: "#fff" },
  { label: "Slack", handle: "MLAI community", href: "https://join.slack.com/t/mlai-aus/shared_invite/zt-3zxshyhls-LhyXSFSy4feq4UM~5a511g", c: "#4b0db3", t: "#fff" },
  { label: "Luma", handle: "luma.com/mlai_au", href: "https://luma.com/mlai_au", c: "#00ffd7", t: "#1a1a1a" },
  { label: "Substack", handle: "mlaiaus.substack.com", href: "https://mlaiaus.substack.com", c: "#ff003d", t: "#fff" },
  { label: "LinkedIn", handle: "company/mlai-aus-inc", href: "https://www.linkedin.com/company/mlai-aus-inc", c: "#3637dc", t: "#fff" },
  { label: "Instagram", handle: "@mlai_aus", href: "https://instagram.com/mlai_aus", c: "#fefc22", t: "#1a1a1a" },
];

export const PK_CONTACT = { name: "Sonia Kaurah", email: "partnerships@mlai.au" };

/* README.txt bundled inside the "Download all" zip */
export const PK_ZIP_README = `MLAI — BRAND ASSETS
Come for the AI. Stay for the community.
==================================================

WHAT'S IN HERE
Transparent PNG logos, wordmarks and the Roo mascot:
  logo-wide-teal / logo-wide-black     — horizontal lockup (Roo + MLAI)
  logo-stacked-teal / logo-stacked-black — vertical lockup
  mascot-teal / mascot-black           — the Roo, on a coloured disc
  roo-icon                             — Roo head only (favicon / avatar)
  wordmark-black / text-logo           — MLAI wordmarks

USING THE LOGO
  DO  keep clear space around every lockup
  DO  use teal-disc lockups on light, black/reversed on dark
  DO  keep it flat — solid colour, scaled proportionally
  DON'T recolour the Roo or change the disc colour
  DON'T add shadows, glows, gradients or outlines
  DON'T stretch, skew, rotate or crop into the mascot
  DON'T place the logo on a busy photo

BRAND COLOURS
  Electric Teal  #00FFD7   (signature)
  Hot Orange     #FF3C00   (CTAs)
  Acid Yellow    #FEFC22   (highlight)
  Electric Blue  #3637DC
  Hot Red        #FF003D
  Deep Purple    #4B0DB3
  Ink            #1A1A1A
  Cream          #F5F0E6

TYPEFACES
  Oswald (display) · Roboto (body) · Source Serif 4 italic (quotes)

ABOUT MLAI
MLAI is a Melbourne-based, not-for-profit, volunteer-run AI community of
12,000+ builders on a mission to help create 1,000 Australian startups by 2030.

Press & partnerships: partnerships@mlai.au
More details & full guidelines: mlai.au/press-kit
`;
