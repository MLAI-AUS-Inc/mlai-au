# MLAI website

The public MLAI website at [mlai.au](https://mlai.au). The production build
renders public HTML and serves it through Cloudflare. The website does not
sign members in or refresh sessions. **Log in** opens [MLAI Chat](https://chat.mlai.au/);
founders write [monthly Pulse updates](https://chat.mlai.au/my-startup/updates?view=new) there.

## Start here

New to the wider MLAI platform? Read the cross-repository guide in
[`mlai-engineering`](https://github.com/MLAI-AUS-Inc/mlai-engineering), then
return here for repository-specific commands. Until that repository is
published, use [`docs/NEW_DEVELOPER_SETUP.md`](docs/NEW_DEVELOPER_SETUP.md).

AI coding agents must read [`AGENTS.md`](AGENTS.md) before changing this
repository.

## What this repository owns

- Public pages, event guides, Studio intake, articles and downloadable resources
- Static HTML generation, public feed data and legacy URL redirects
- Public previews of MLAI founder tools; the member workspace lives in Chat

Old event dashboards link to public guides. Existing Roo account links go to Chat. Roo top-up links open a static,
session-free purchase review; only explicit terms acceptance can open Stripe
Checkout. The website does not process old app form submissions. Operations signs administrators in on its own domain. Deploy
the Operations login before rolling out this website change.

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
| Member login (redirect) | `/login` or `/platform/login` |
| Founder Tools public introduction | `/founder-tools/start` |
| HealthHack guide | `/healthhack` |
| Hackathon directory | `/hackathons` |

The build renders the canonical public pages, article URLs and directory pages
with the built Worker in an isolated local runtime. It does not require feed
credentials. On the first visit the browser refreshes events, newsletter
listings and time-sensitive article information using public loaders.
Query-specific views, redirects and errors still go through the Worker.

## Checks

For code changes, the minimum repository gates are:

```bash
bun run typecheck
bun run build
```

`bun run test:coverage:check` runs the full suite. IndexNow submission is a
separate manual command. `bun run typecheck` also validates internal article links.

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
- [`AGENTS.md`](AGENTS.md): repository rules for AI coding agents

Keep task scratchpads, handoff notes, PR drafts, dated audits, and generated
reports local. Common filenames and output directories are gitignored; use
`.local/` for other working files. Commit maintained documentation and shared
configuration, and put review summaries in the pull request itself.
