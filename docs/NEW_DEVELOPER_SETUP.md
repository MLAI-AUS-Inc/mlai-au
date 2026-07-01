# New Developer Setup

This is the short path for someone who needs to develop, test, and push work on the main MLAI repos.

Main repos:
- `mlai-au` - public website and React Router app
- `mlai-backend` - Django API and backend jobs
- `roo` - Roo Slack/agent service

Clone `content-factory` too only when working on article/content generation flows. The backend full local stack expects it as a sibling repo.

## Access Needed

Before setup:
- Claude Code access through a paid Claude plan or team/enterprise account.
- GitHub invite accepted for `MLAI-AUS-Inc`.
- GitHub write access to repos they will push branches to.

For local shell-only development:
- No production secrets.
- `mlai-au` can run from example env values for the site shell.
- `mlai-backend` tests can run against SQLite.

For external integration development:
- `mlai-au`: `.dev.vars` secrets from Apple Passwords entry `Website Secrets .dev.vars`.
- `mlai-backend`: `.env` or `.env.local-docker` secrets, plus any required API keys.
- `roo`: Slack bot token/signing secret, LLM API key, backend API key.
- New developers and volunteers should not receive SSH, production server, or live database access. Use local, mocked, or explicitly provisioned dev/staging credentials.

For deployment:
- Do not deploy manually during onboarding. Normal deploys happen through GitHub Actions after merge to `main`.

## 1. Install Tools

macOS:

```bash
xcode-select --install
brew install git gh python@3.11 node bun
brew install --cask docker
curl -fsSL https://claude.ai/install.sh | bash
```

Verify:

```bash
git --version
gh --version
python3.11 --version
bun --version
docker --version
claude --version
claude doctor
```

Start Docker Desktop before backend work.

## 2. Log In Once

GitHub:

```bash
gh auth login --git-protocol https --web
gh auth status
gh auth setup-git
```

Claude:

```bash
claude
```

Follow the browser login. Exit Claude after login if you want to run the clone commands manually.

## 3. Clone Main Repos

Manual clone path:

```bash
mkdir -p ~/Coding/MLAI
cd ~/Coding/MLAI

gh repo clone MLAI-AUS-Inc/mlai-au
gh repo clone MLAI-AUS-Inc/mlai-backend
gh repo clone MLAI-AUS-Inc/roo
```

Optional for content/article flows:

```bash
gh repo clone MLAI-AUS-Inc/content-factory
```

If this fails, ask an admin to confirm the repo name and grant access.

## 4. Prompt Claude To Clone And Finish Setup

Run from `~/Coding/MLAI`:

```bash
claude
```

Paste:

```text
You are setting up a new MLAI developer machine.

Only work on these repos unless I ask otherwise:
- mlai-au
- mlai-backend
- roo
- content-factory only if it exists locally or is needed for backend content-generation flows

If any main repo is missing, clone it with GitHub CLI:
- gh repo clone MLAI-AUS-Inc/mlai-au
- gh repo clone MLAI-AUS-Inc/mlai-backend
- gh repo clone MLAI-AUS-Inc/roo

First read each repo README, package files, docker compose files, and test/CI config before changing anything.

Do not commit or push. Do not overwrite local files. Do not request production secrets unless a command genuinely needs them.

Set up dependencies for local development and tests:
- mlai-au: install dependencies, create local env from example if present, run typecheck/build commands from package.json.
- mlai-backend: create a Python 3.11 virtualenv, install requirements, run Django checks and the same targeted tests as CI using SQLite.
- roo: create a Python virtualenv under roo/roo-standalone, install requirements, run pytest if available.

At the end, report:
- what installed successfully
- which commands passed or failed
- which secrets/accesses are still needed for external integrations
- the exact commands I should run daily to develop, test, and push
```

## 5. Manual Setup Commands

`mlai-au`:

```bash
cd ~/Coding/MLAI/mlai-au
bun install
test -f .dev.vars || cp .dev.vars.example .dev.vars
bun run dev
bun run typecheck
bun run build
```

`mlai-backend` test setup:

```bash
cd ~/Coding/MLAI/mlai-backend
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt -r requirements-engine.txt

DATABASE_URL=sqlite:////tmp/mlai_backend_dev.sqlite3 python manage.py makemigrations --check --dry-run
DATABASE_URL=sqlite:////tmp/mlai_backend_dev.sqlite3 python manage.py check
DATABASE_URL=sqlite:////tmp/mlai_backend_dev.sqlite3 python manage.py test \
  roo.tests_api.TaskViewSetTests \
  tests.test_validate_prod_urls \
  tests.test_content_factory_org_config \
  tests.test_new_endpoints.EndpointTests \
  tests.test_new_endpoints.ContentFactoryCallbackTests \
  --verbosity 2
```

`roo`:

```bash
cd ~/Coding/MLAI/roo/roo-standalone
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
test -f .env || cp .env.example .env
pytest
uvicorn roo.main:app --reload
```

## 6. Backend Full Local Stack

Only use this when backend integration work needs Docker services and the sibling `content-factory` repo.

Expected layout:

```text
~/Coding/MLAI/
  mlai-backend/
  content-factory/
```

Ask an admin for the required local/dev env files. Volunteers should use local services or a dev/staging database, not production data.

Useful commands:

```bash
cd ~/Coding/MLAI/mlai-backend
docker network create mlai-local-shared
docker compose -f docker-compose.local.yml up --build
```

Do not run live DB scripts during onboarding. If production investigation is required, a maintainer should run it and share the minimum safe output.

## 7. Daily Work Flow

Start work:

```bash
cd ~/Coding/MLAI/mlai-au
git switch main
git pull --ff-only
git switch -c your-name/short-task-name
```

Use the matching base branch for backend/Roo if the task is already on a feature branch.

Before pushing:

```bash
git status
git diff
```

Run the repo checks listed above for the repo you changed.

Push and open a PR:

```bash
git add <files>
git commit -m "Short imperative summary"
git push -u origin HEAD
gh pr create --fill
gh pr checks --watch
```

If checks fail:

```bash
gh pr checks
gh run list --branch "$(git branch --show-current)"
```

Fix locally, rerun checks, commit again, and push. Do not force-push to `main`.

## 8. What To Ask An Admin For

Ask before setup:
- GitHub org invite and repo permissions.
- Claude Code account access.

Ask only when needed:
- `mlai-au` dev/staging `.dev.vars` secrets.
- `mlai-backend` local/dev env files.
- Roo Slack app credentials.
- OpenAI/Gemini/Anthropic API keys.
- Cloudflare/Wrangler deployment access for maintainers only.

Most new contributors should start with GitHub access, Claude login, and local test commands. Add secrets only when their first task needs them.
