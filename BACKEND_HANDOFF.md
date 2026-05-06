# Backend Handoff

This note is for wiring the current Founder Tools frontend work to the existing backend.

## Context

- Frontend repo: `mlai-au`
- Frontend branch: `yichen/supportsorted-founder-tools-mvp`
- Product surface: `/founder-tools/*`
- Current localhost preview uses **stub data** for SupportSorted so design and flow can be reviewed before real backend data is connected.

Important: the frontend is already rendering the intended Founder Tools experience for a founder account. The backend work here is mainly about replacing local stubs with real authenticated API-backed data in PostgreSQL.

## What The Frontend Now Shows

The current Founder Tools preview is set up around:

- Founder: `Dr Sam Donegan`
- Company: `SupportSorted (SuSo)`
- Location: `Melbourne, Australia`
- One stored monthly update dated `January 30, 2026`

The Updates page now behaves like this:

- "Current Update" means an update from the **current calendar month**
- if there is no update for the current month, the UI defaults to **Past Updates**
- past updates can be **expanded inline** to read the full content
- edit remains a separate action

The Companies page expects one active company and can support switching between companies.

## Frontend Files That Reflect The Current Expectations

- [app/lib/vibe-raising.ts](C:/Users/Yichen%20Cao/OneDrive/Documents/2026/MLAI/mlai-au/app/lib/vibe-raising.ts)
- [app/routes/vibe-raising-app._index.tsx](C:/Users/Yichen%20Cao/OneDrive/Documents/2026/MLAI/mlai-au/app/routes/vibe-raising-app._index.tsx)
- [app/routes/vibe-raising-app.company-setup.tsx](C:/Users/Yichen%20Cao/OneDrive/Documents/2026/MLAI/mlai-au/app/routes/vibe-raising-app.company-setup.tsx)
- [app/routes/vibe-raising-app.companies.tsx](C:/Users/Yichen%20Cao/OneDrive/Documents/2026/MLAI/mlai-au/app/routes/vibe-raising-app.companies.tsx)
- [app/lib/auth.ts](C:/Users/Yichen%20Cao/OneDrive/Documents/2026/MLAI/mlai-au/app/lib/auth.ts)

## What Is Still Stubbed Locally

These frontend stubs are only for localhost preview and should be replaced by real backend responses:

- `DEV_AUTH_STUB` in `app/lib/auth.ts`
- `DEV_VIBE_PROFILE_STUB` in `app/lib/vibe-raising.ts`
- `DEV_MONTHLY_UPDATES_STUB` in `app/lib/vibe-raising.ts`

The frontend currently uses those when local dev bypass or backend stub mode is enabled.

## Backend Integration Goal

When this branch is pushed and deployed, the frontend should stop depending on local preview stubs and instead:

1. authenticate the founder via Google auth
2. load the founder profile and active company from the backend
3. load monthly updates from PostgreSQL
4. create/update company records through backend APIs
5. create/update monthly updates through backend APIs

## What The Backend Should Verify Or Wire

### 1. Google Auth + Founder Tools App Session

Please verify that Google-auth sign-in works cleanly for the `founder-tools` app flow, and that the authenticated user can land inside `/founder-tools` with a valid session.

Frontend assumptions:

- the user can sign in with Google
- the backend can identify or create the app user
- the founder session works for Founder Tools routes
- a signed-in founder can fetch profile, company, and updates data without using local dev stubs

### 2. Founder Profile Shape

The frontend expects a founder profile that can resolve:

- `role`
- `organizationName` (optional)
- `companies[]`
- `activeCompanyId`

Each company should be able to provide:

- `id`
- `name`
- `domain`
- `companyLinkedInUrl` (optional)
- `abn` (optional)
- `location` (optional)
- `registered`

### 3. Monthly Updates

The frontend expects updates returned newest-first and shaped roughly like:

```ts
{
  id: string;
  isoMonth?: string | null;
  month: string;
  monthName?: string | null;
  year?: number;
  date: string;
  status?: string | null;
  summary?: string | null;
  sourceUrl?: string | null;
  metrics: Record<string, string>;
  highlights: string;
  challenges: string;
  asks: string;
  learnings: string;
  next30Days: string;
}
```

Notes:

- `metrics` can be sparse; not every key is required
- frontend currently displays keys like `revenue`, `users`, `mrr`, `runway`, `burnRate`, and `monthlyCosts`
- older updates should remain accessible in the Past Updates list
- current-month detection is frontend-side based on `date`

### 4. Company Management

The frontend already supports:

- creating or updating a company
- setting an active company
- showing an active company card on `/founder-tools/companies`

Please verify the backend contract for:

- create company
- update company
- switch active company

### 5. PostgreSQL Persistence

Please verify that Founder Tools company and monthly update data is stored in PostgreSQL and survives page reloads, sign-out/sign-in, and environment restarts.

The important product outcome is:

- a real founder can sign in
- SupportSorted can exist as a real company record
- the January 2026 update can exist as a real monthly update record
- the frontend then renders the same experience using backend data instead of stubs

## API Endpoints The Frontend Is Already Calling

From the frontend code, the integration points are:

- `GET /api/v1/founder-tools/profile/`
- `POST /api/v1/founder-tools/companies/`
- `POST /api/v1/founder-tools/active-company/`
- `GET /api/v1/vibe-raising/updates/`
- `POST /api/v1/vibe-raising/updates/`

If backend route names differ slightly, frontend can be adjusted, but the response shapes above are the important part.

## SupportSorted Seed Data To Create In Backend

If you want to mirror the current frontend preview in real backend data, use:

### Founder

- Name: `Dr Sam Donegan`

### Company

- Name: `SupportSorted (SuSo)`
- Domain: `supportsorted.com.au`
- Location: `Melbourne, Australia`
- Registered: `true`

### Monthly Update

- Date: `2026-01-30`
- Month label: `January 2026`
- Summary:
  - `SupportSorted (SuSo) is an AI-powered referral and matching platform for disability support professionals, allied-health clinics, and care coordinators. We are seeing early product-market resonance, active pilots, and MAP accelerator backing while we focus this quarter on shipping and tightening the core matching loop.`
- Metrics:
  - `revenue`: `250+ matches`
  - `users`: `10k+ professionals`
  - `mrr`: `12 paying pilots`
  - `runway`: `MAP cohort`
- Highlights:
  - accepted into MAP
  - simpler pricing model launched
  - active pilots with support coordinators and allied-health clinics
- Challenges:
  - manual referral behavior still slows onboarding
  - fundraising paused while focusing on product velocity
  - conversion benchmarks still need tightening
- Asks:
  - intros to support coordinators
  - intros to allied-health professionals and practice managers
  - NDIA-relevant intros
- Learnings:
  - trust in match quality matters more than broad marketplace coverage
  - simpler pricing is easier for clinics to absorb
- Next 30 Days:
  - complete MAP milestones
  - expand pilots
  - tighten KPIs before re-opening the raise

## Done Means

This handoff is complete when:

- Founder Tools works for a real Google-authenticated founder account
- company/profile/update data is returned by backend APIs
- the frontend no longer needs SupportSorted stub data for normal preview
- the SupportSorted founder flow renders correctly on:
  - `/founder-tools/updates`
  - `/founder-tools/companies`
  - `/founder-tools/company-setup`

## Frontend Verification Already Done

- `bun run typecheck` passes on the frontend branch
- localhost preview has been checked on:
  - `/founder-tools/updates`
  - `/founder-tools/companies`
- past updates now expand inline
- the metric cards were adjusted to behave better responsively

