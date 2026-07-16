<div align="center">

<pre>
                   ░█████  ░██████ ░███████░███   ░██░████████░██ ░██████                        
                  ░██  ░██░██      ░██     ░████  ░██   ░██   ░██░██                             
                  ░███████░██  ░███░█████  ░██░██ ░██   ░██   ░██░██                             
  ██████████     ░██  ░██░██   ░██░██     ░██ ░██░██   ░██   ░██░██                             
  ██▀▀▀▀▀▀██     ░██  ░██ ░██████ ░███████░██  ░████   ░██   ░██ ░██████                        
  ██ ◉  ◉ ██     ░░   ░░  ░░░░░░  ░░░░░░░ ░░   ░░░░    ░░    ░░  ░░░░░░                         
  ██   3  ██                                                                                    
  ██████████     ░███████░███   ░██ ░██████ ░██░███   ░██░███████░███████░██████                
   ██    ██      ░██     ░████  ░██░██      ░██░████  ░██░██     ░██     ░██  ░██               
                  ░█████  ░██░██ ░██░██  ░███░██░██░██ ░██░█████  ░█████  ░██████                
                  ░██     ░██ ░██░██░██   ░██░██░██ ░██░██░██     ░██     ░██  ░██               
                  ░███████░██  ░████ ░██████ ░██░██  ░████░███████░███████░██  ░██               
                  ░░░░░░░ ░░   ░░░░  ░░░░░░  ░░ ░░   ░░░░ ░░░░░░░ ░░░░░░░ ░░   ░░                
                                Agentic QA Engineer | Backend Dev                                      
</pre>

<h1>Nahuel Gomez — Career Profile</h1>

<p>
  <a href="https://nelthor.com.ar"><b>nelthor.com.ar</b></a> ·
  <a href="https://linkedin.com/in/nelgoez">LinkedIn</a> ·
  <a href="https://github.com/nelgoez">GitHub</a> ·
  <a href="https://wa.link/mtf64p">WhatsApp</a>
</p>

<p><i>SDET turned Agentic QA Engineer. 5+ years building test automation at Newfold Digital. Now designing intelligent quality systems that work alongside AI agents.</i></p>

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

</div>

<br />

## What This Is

A personal career portfolio — think of it as your professional landing page with projects, blog, QA evidence, and a printable CV. It's built with modern web tools but designed so **you don't need to be a developer** to use it.

Two ways to use this repo:

1. **Use as a template** — fork it, swap your info, deploy. Your portfolio goes live in minutes.
2. **Explore the agentic workflow** — if you use AI coding assistants (Claude, OpenCode), this repo includes pre-built "skills" that automate common development tasks.

---

## Portfolio

**→ [nelthor.com.ar](https://nelthor.com.ar)** — live portfolio built with Next.js, deployed to GitHub Pages.

| Section | What you'll find |
|---------|-----------------|
| **Projects** | Live repos from GitHub API, tech stack, links |
| **Behind the Scenes** | How this was built — traditional QA vs agentic workflows |
| **Blog** | Articles on Agentic QA, test automation, career |
| **Experience** | Timeline: Newfold Digital → Agentic QA Engineer |
| **QA Scorecard** | Testability guide with live Allure dashboards |

---

## Quick Start for Non-Developers

You only need two things: **Git** (free) and **Bun** (free, faster than Node).

### Step 1 — Create your copy

1. Go to [github.com/nelgoez/career-profile-up](https://github.com/nelgoez/career-profile-up)
2. Click the green **"Use this template"** button
3. Name it `<your-username>.github.io` (or any name you like)
4. Click **"Create repository from template"**

### Step 2 — Download your copy

```bash
# Open a terminal (Command Prompt on Windows, Terminal on Mac)
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### Step 3 — Install Bun (one-time)

- **Windows**: Download from [bun.sh](https://bun.sh) → run the `.exe` installer
- **Mac/Linux**: Open terminal → paste `curl -fsSL https://bun.sh/install | bash`

Verify it worked:
```bash
bun --version
```

### Step 4 — Install dependencies

```bash
bun install
```

### Step 5 — Replace with your content

Edit these files with your own information:

| File | What to change |
|------|---------------|
| `dist/profile/README.md` | Your GitHub profile README (auto-generated, or edit directly) |
| `<your-portfolio>/app/page.tsx` | Homepage content |
| `<your-portfolio>/content/blog/` | Add/remove blog posts |
| `docs/cv-printable.md` | Your printable CV |

### Step 6 — Deploy (goes live)

Push to `main`:
```bash
git add .
git commit -m "my portfolio"
git push
```

GitHub Actions builds and deploys automatically. Your site will be at `https://<your-username>.github.io/<repo-name>/`.

---

## Tech

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 15 (static export), Tailwind CSS 4, TypeScript |
| Hosting | GitHub Pages + custom domain |
| DNS | Cloudflare → DigitalPlat (qzz.io) |
| Scripts | Bun + TypeScript (health checks, README generator) |
| CI/CD | GitHub Actions (auto-deploy on push + daily cron auto-sync) |

---

## What's in this repo

| Directory | What's inside |
|-----------|---------------|
| `nelthor.com.ar/` | The portfolio website (Next.js app) |
| `scripts/` | Health checks, README generator for GitHub profile |
| `.claude/skills/` | Reusable AI workflow skills for Claude/OpenCode users |
| `.context/` | Design specs, content plans, media assets |
| `docs/` | Printable CV, design specs |
| `dist/profile/` | Auto-generated GitHub profile README output |

---

## For AI Agent Users (OpenCode / Claude)

If you use AI coding assistants, this repo comes with 14 pre-built **skills** under `.claude/skills/`:

| Skill | What it does |
|-------|-------------|
| `sprint-development` | Drives feature work: plan → code → review → deploy |
| `product-management` | Backlog management, epics, acceptance criteria |
| `agentic-debate` | Multi-agent research debate for tough decisions |
| `git-flow-master` | Git operations (commit, branch, PR, merge) |
| `unit-testing` | TDD workflow: red → green → refactor |
| `vercel-cli` | Vercel deploy, env sync, log streaming |
| `testability-guide` | Generates a `/qa` page with scorecards |
| `project-foundation` | PRD, SRS, architecture discovery |
| `project-bootstrap` | Backend/frontend scaffolding |
| `design-system` | DESIGN.md generation (branding, tokens) |
| `agentic-dev-onboard` | First-time orientation of this repo |
| `agentic-dev-core` | Shared reference library (loaded by other skills) |

Skills start with `/` — e.g. type `/agentic-debate` in your AI session.

---

## Auto-Sync Pipeline

Your portfolio stays fresh **without manual pushing**. The deploy workflow (`deploy-portfolio.yml`) runs on three triggers:

| Trigger | When | What it syncs |
|---------|------|---------------|
| **Push to main** | You push design/CV/structural changes | Manual deploy, full control |
| **Daily cron** (6 AM UTC) | Every morning automatically | New blog posts, updated repos, profile README |
| **Workflow dispatch** | You click "Run workflow" on GitHub | On-demand rebuild anytime |

When the cron fires, it:
1. Runs `bun run generate:readme` to sync repos + blog posts → profile README
2. Builds the Next.js portfolio
3. Deploys to GitHub Pages

Blog content you write as MDX flows to your live site automatically. Major changes like experience edits or design overhauls stay manual-gated via push.

---

## Quick start commands

```bash
bun install                  # install dependencies
cp .env.example .env         # create env file (edit as needed)
bun run generate:readme      # auto-generate GitHub profile README
bun run health:check         # run portfolio health checks
cd nelthor.com.ar && bun run dev  # start dev server (preview)
cd nelthor.com.ar && bun run build # build for production
```

---

## License

MIT
