# Backend Handoff

This note captures the backend wiring expected by the current Founder Tools and Vibe Raising frontend work.

## Context

- Frontend repo: `mlai-au`
- Product surface: `/founder-tools/*`
- Integration branch: `codex/vibe-raising-merge-train`
- Local preview can use dev stubs for SupportSorted while real backend data is being wired.

## Frontend Expectations

Founder Tools should support:

- Google-authenticated founder sessions.
- A founder profile with an active company.
- Company setup, update, and active-company switching.
- Monthly update create, draft, resume, publish, and listing flows.
- Optional connected sources and manual materials for update drafting.

Relevant frontend entry points:

- `app/lib/vibe-raising.ts`
- `app/routes/vibe-raising-app._index.tsx`
- `app/routes/vibe-raising-app.company-setup.tsx`
- `app/routes/vibe-raising-app.connect-data.tsx`
- `app/routes/vibe-raising-app.create-update.tsx`
- `app/routes/vibe-raising-app.companies.tsx`

## API Endpoints

The frontend currently calls:

- `GET /api/v1/founder-tools/profile/`
- `POST /api/v1/founder-tools/companies/`
- `POST /api/v1/founder-tools/active-company/`
- `GET /api/v1/vibe-raising/updates/`
- `POST /api/v1/vibe-raising/updates/`
- `GET /api/v1/vibe-raising/drafts/`
- `POST /api/v1/vibe-raising/updates/:id/publish/`
- `POST /api/v1/vibe-raising/uploads/pitch-deck/session/`
- `POST /api/v1/vibe-raising/uploads/pitch-deck/complete/`
- `POST /api/v1/vibe-raising/uploads/video/session/`
- `POST /api/v1/vibe-raising/uploads/video/complete/`
- `GET /api/v1/integrations/sources/status`

## Data Shape

Founder profile:

```ts
{
  role: "founder" | "investor";
  organizationName?: string | null;
  companies: Array<{
    id: string;
    name: string;
    domain?: string | null;
    companyLinkedInUrl?: string | null;
    abn?: string | null;
    location?: string | null;
    founderProfiles?: Array<{ name: string; linkedinUrl?: string | null }>;
    founderNames?: string[];
    stage?: string | null;
    registered: boolean;
  }>;
  activeCompanyId?: string | null;
}
```

Monthly update:

```ts
{
  id: string;
  isoMonth?: string | null;
  month: string;
  monthName?: string | null;
  year?: number;
  date: string;
  status?: string | null;
  visibility?: "private" | "published" | string | null;
  publishedAt?: string | null;
  summary?: string | null;
  sourceUrl?: string | null;
  pitchDeckUrl?: string | null;
  videoUrl?: string | null;
  manualDocuments?: Array<{ id: string; originalFilename: string }>;
  metrics: Record<string, string>;
  metricSuggestions?: Array<{ metricKey: string; label: string; reason?: string }>;
  highlights: string;
  challenges: string;
  asks: string;
  learnings: string;
  next30Days: string;
}
```

`POST /api/v1/vibe-raising/updates/` may receive `saveMode: "draft" | "ready"`.

## SupportSorted Seed Data

Use this only for backend/demo parity with local preview stubs:

- Founder: `Dr Sam Donegan`
- Email: `sam@supportsorted.com.au`
- Company: `SupportSorted (SuSo)`
- Domain: `supportsorted.com.au`
- Location: `Melbourne, Australia`
- Stage: `Pre-seed`
- January 2026 update:
  - `revenue`: `250+ matches`
  - `users`: `10k+ professionals`
  - `mrr`: `12 paying pilots`
  - `runway`: `MAP cohort`
  - Summary: SupportSorted is an AI-powered referral and matching platform for disability support professionals, allied-health clinics, and care coordinators.

## Done Means

- A real founder can sign in and land in `/founder-tools`.
- Profile, company, active company, monthly update, draft, and publish data are persisted in PostgreSQL.
- Company setup validation failures return field-level or readable errors for inline rendering.
- Local SupportSorted stubs are not needed for normal deployed use.
