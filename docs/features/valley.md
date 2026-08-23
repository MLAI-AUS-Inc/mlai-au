# Valley prototype

Valley is a mobile-first prototype for verified founder profiles and monthly
updates. It lives inside the MLAI website, but has its own routes, layout, and
browser-local state.

## Current scope

Valley is a demo-first prototype. It has no authentication or server-side
database. State is seeded in the browser and persisted in `localStorage`.
Stripe and Google Analytics are represented as prototype data sources rather
than live OAuth integrations.

The core loop is:

```text
Dashboard -> connect data source -> draft update -> review -> publish
```

A profile becomes verified when company setup is complete, at least one data
source is connected, and three monthly updates containing metric data have been
published.

## Routes

| Route | Purpose |
| --- | --- |
| `/valley` | Dashboard and verification progress |
| `/valley/update/new` | Draft a monthly update |
| `/valley/update/review` | Review the investor-facing update |
| `/valley/update/published` | Publication confirmation |
| `/valley/profile` | Read-only investor-facing profile |

Run the main application with `bun run dev`, then open
<http://localhost:5173/valley>. Use **Reset demo** to restore the seed state.

## Deferred work

- Authentication and magic-link login
- Real Stripe and Google Analytics OAuth
- Investor matching
- Additional data sources
- AI-assisted drafting
- Pitch-deck uploads

Do not infer backend contracts from this prototype. Data-backed founder tools
are separate route families and use APIs owned by `mlai-backend`.
