# Connected agents navigation

`/platform/agents` is an authenticated entry point from the platform dashboard
to the backend's Connected agents UI. It is hidden and returns 404 unless the
build-time `VITE_AGENT_RUNTIME_ENABLED=true` flag is deliberately set. The example
is in `../.env.agent-runtime.example`; the default is false.

The loader uses the existing MLAI account session with development auth bypass
disabled. Signed-out users follow `/platform/login?next=…`. The eventual
destination is the configured `BACKEND_BASE_URL`, with a fixed agent-runtime
path; a caller cannot choose an external destination. Only the documented OAuth
authorization query fields may be preserved to the backend's consent page.
Credentials are never inserted into redirect query parameters. The existing
parent-domain account cookie supplies backend authentication.

The backend separately gates the runtime and enforces owner/session, scope,
resource, source-membership and revocation checks. This frontend flag does not
enable those capabilities or the paused native Buzz/MLAI Chat agent UI. Public
Slack reads, writes, public web access and event webhooks remain independent
backend controls.

No deployment or live account action is part of this source change. See
`../../mlai-backend/docs/agent-runtime-api.md` in the sibling backend checkout for
the API contract and staged verification requirements.
