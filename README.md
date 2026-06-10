# Valley

**Verified founder profiles. Monthly updates. Investor trust.**

Valley is a mobile-first MVP that lets startup founders publish monthly updates with real metric data, earn a verified badge after three consistent updates, and get discovered by investors and VIC Gov grant programs.

---

## What this is

This is **v0.1 — built from scratch, mobile-first, no backend.**

It lives inside the [MLAI](https://mlai.au) codebase and shares its design system, but Valley is its own product surface with its own routing, layout, and state. It draws on lessons from the earlier **Vibe Raising** platform — same founder audience, same verification logic — but cuts everything that wasn't core to the loop:

| Vibe Raising | Valley v0.1 |
|---|---|
| Auth + login flow | No auth — demo-first |
| Server-side DB | localStorage (persists across refresh) |
| Multiple integrations (Xero, Notion, Slack…) | Stripe + Google Analytics only |
| Investor matching | Investor-facing profile view |
| Full onboarding | Seed data, reset button |

---

## The core loop

```
Dashboard → Connect data source → Draft update → Review → Publish
```

Three published updates with real metrics = **Verified** badge.

---

## Screens

| Route | What it does |
|---|---|
| `/valley` | Dashboard — verification progress, data sources, past updates |
| `/valley/update/new` | Draft — metric cards prefill from Stripe/GA, manual fallback, memo fields |
| `/valley/update/review` | Investor-ready preview before publishing |
| `/valley/update/published` | Confirmation + verification progress |
| `/valley/profile` | Read-only investor-facing profile |

---

## Running it

```bash
bun run dev
# → localhost:5173/valley
```

Hit **Reset demo** in the header to wipe state back to seed data.

---

## Stack

- **React Router v7** (file-based routing)
- **Tailwind CSS v4** (no component library — everything is hand-rolled)
- **localStorage** — all state, no backend calls
- **Bun** — package manager and dev server

Fonts and palette match the MLAI brand guide: Inter, teal `#008080`, warm paper whites, orange accent.

---

## Verification logic (MVP)

A profile becomes **Verified** when:

1. Company setup is complete (ABN + core fields present in seed/state)
2. At least **1 live data source** connected (Stripe or Google Analytics)
3. **3 monthly updates** published with real metric data

Verified = trust signal for investors + VIC Gov startup directory eligibility.

---

## What's seeded

The demo starts with Mira Halvorsen at **Loamly** (soil-health analytics, Melbourne, Pre-seed) and one published February 2026 update. Publish two more to unlock the badge.

---

## What's not here yet (post-MVP)

- Auth / magic link login
- Real Stripe / GA OAuth
- Investor matching by sector + stage
- Additional data sources (Xero, bank feed)
- AI-assisted drafting
- Pitch deck upload

---

Built on the [MLAI](https://mlai.au) platform · [mlai.au](https://mlai.au)
