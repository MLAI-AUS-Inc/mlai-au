# MLAI website

The public MLAI website and browser application, served at
[mlai.au](https://mlai.au). This repository contains the public site, member
experiences, founder tools, editorial content, and event-specific applications.

This is a React Router v7 application deployed as a Cloudflare Worker. Most
authenticated and data-backed features call the Django APIs in
[`mlai-backend`](https://github.com/MLAI-AUS-Inc/mlai-backend).

## Start here

New to the wider MLAI platform? Read the cross-repository guide in
[`mlai-engineering`](https://github.com/MLAI-AUS-Inc/mlai-engineering), then
return here for repository-specific commands. Until that repository is
published, use [`docs/NEW_DEVELOPER_SETUP.md`](docs/NEW_DEVELOPER_SETUP.md).

AI coding agents must read [`AGENTS.md`](AGENTS.md) before changing this
repository.

## What this repository owns

- Public MLAI pages, events, community pages, and editorial articles
- Member login and platform-facing browser flows
- Founder Tools and Vibe Raising browser experiences
- eSafety, HealthHack, MedHack, and Watt The Hack browser applications
- The Valley founder-profile prototype
- Cloudflare Worker routing and browser-facing configuration

It does not own the Django API, persistent application data, scheduled backend
jobs, MLAI Chat, Plane, or the `admin.mlai.au` edge gateway.

Routes are declared centrally in [`app/routes.ts`](app/routes.ts). Feature code
generally lives under `app/routes`, `app/components`, and `app/lib`.

## Requirements

- Bun 1.2.15 or newer (the package manager version is pinned in `package.json`)
- Node.js 18 or newer

## Local development

```bash
bun install --frozen-lockfile
test -f .dev.vars || cp .dev.vars.example .dev.vars
bun run dev
```

The development server is available at <http://localhost:5173>. Example values
are enough to render the public site shell. Features that call external
services need explicitly provisioned development or staging credentials; never
use production credentials for routine local development.

Common routes include:

| Area | Local path |
| --- | --- |
| Public website | `/` |
| Articles | `/articles` |
| Member platform | `/platform/login` |
| Founder Tools | `/founder-tools` |
| Watt The Hack | `/watt-the-hack` |
| HealthHack | `/healthhack` and `/hospital/app` |
| Valley prototype | `/valley` |

The Valley feature is documented separately in
[`docs/features/valley.md`](docs/features/valley.md).

## Checks

For code changes, the minimum repository gates are:

```bash
bun run typecheck
bun run build
```

The build submits IndexNow data in `postbuild`; consult `package.json` and the
maintainer for the intended environment before running it with live
credentials. `bun run typecheck` also validates internal article links.

## Configuration and deployment

- Client-visible values use `import.meta.env.VITE_*`.
- Server-side Worker bindings are accessed through the React Router loader or
  action environment, not `process.env`.
- Local Worker values live in the untracked `.dev.vars` file.
- Production bindings are configured in Cloudflare and `wrangler.jsonc`.
- Normal production deployment happens through the repository's reviewed
  GitHub workflow after merge. New engineers should not deploy during setup.

See [`AGENTS.md`](AGENTS.md) for the invariants that apply when porting code
from other frontend projects.

## Documentation map

- [`docs/NEW_DEVELOPER_SETUP.md`](docs/NEW_DEVELOPER_SETUP.md): onboarding for
  the original website/backend/Roo repository group
- [`BACKEND_HANDOFF.md`](BACKEND_HANDOFF.md): frontend/backend handoff context
- [`docs/features/valley.md`](docs/features/valley.md): Valley prototype
- [`AGENTS.md`](AGENTS.md): repository rules for AI coding agents

Implementation plans and dated audits are context, not automatically current
architecture. Verify them against the code and this README before acting.
