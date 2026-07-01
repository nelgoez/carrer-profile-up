# Career Profile Portfolio — Design Spec

**Date**: 2026-06-30
**Author**: AI + Nahuel (nelgoez)
**Status**: Draft

---

## 1. Purpose

Transform `carrer-profile-up` (currently a bare agentic-dev-boilerplate) into a **career command center** that:

1. **Orchestrates** Nahuel's professional presence across platforms (GitHub, LinkedIn, Outlier)
2. **Auto-generates** a dynamic GitHub Profile README (`nelgoez/nelgoez`) with live metrics
3. **Hosts** a portfolio landing page (`nelthor.qzz.io`) as a full-stack showcase
4. **Demonstrates** the agentic-dev workflow itself — the boilerplate skills become the delivery mechanism, proving Nahuel's "Agentic QA Engineer" positioning
5. **Showcases** the full spectrum of capability — from traditional manual craftsmanship (Newfold Digital era) to cutting-edge agentic development — via a "Behind the Scenes" section with screenshots, recordings, and architecture diagrams

---

## 2. Architecture

```
carrer-profile-up (LOCAL — not published)
├── .context/portfolio/       ← Portfolio content as "product" (PRD, epics, stories)
│   └── media/                ← Raw media assets + manifest.json
├── scripts/
│   ├── generate-readme.ts    ← Profile README generator
│   └── health/               ← Health & quality tooling
│       ├── check-assets.ts
│       ├── check-readme.ts
│       ├── check-staleness.ts
│       ├── check-consistency.ts
│       └── run-all.ts        ← Orchestrator
├── tools/                    ← Landing page scaffolding (Next.js SSG)
└── .claude/skills/           ← Boilerplate skills used for orchestration
     ├── /project-foundation  → Portfolio PRD
     ├── /product-management  → Backlog of portfolio improvements
     └── /sprint-development  → Ship features for nelthor.qzz.io

=== PUBLIC FACING ===

nelthor.qzz.io (Vercel)         ← Portfolio landing page, blog, live project data
github.com/nelgoez/nelgoez  ← Auto-generated profile README
```

### 2.1 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Landing page framework | Next.js Static Export | Free on Vercel, no backend needed, best DX |
| Content source | Local markdown + GitHub API | No CMS dependency, always synced with repos |
| Profile README update | GitHub Actions (cron daily) | Industry standard, zero infra |
| Domain | nelthor.qzz.io | Short, professional, own brand |
| Boilerplate usage | Orchestration layer only | Repurpose skills, don't fight them |

---

## 3. Component: GitHub Profile Automator

### 3.1 Location
- Repo: `github.com/nelgoez/nelgoez`
- Trigger: `.github/workflows/update-profile.yml` (schedule: daily 6AM UTC)
- Runtime: `ubuntu-latest`, Bun

### 3.2 Pipeline

```
GitHub API (repos, events, languages)
    │
    ▼
Script: generate-readme.ts (Bun)
    │  - Fetches public repos sorted by updated_at
    │  - Computes language breakdown
    │  - Pulls latest blog/content from local markdown
    │  - Applies template with sections
    │
    ▼
README.md template:
    ├── Header (animated typing SVG)
    ├── Bio + current focus
    ├── Tech stack badges (shields.io)
    ├── 🔥 Latest project updates (auto from repos)
    ├── 📊 GitHub stats card
    ├── 📝 Latest blog/tutorial entries
    └── Footer + contact
    │
    ▼
git commit + push (only if changed)
```

### 3.3 Data Sources

| Data | Source | Update cadence |
|------|--------|----------------|
| Repo list + metadata | GitHub REST API (`/users/nelgoez/repos`) | Each run |
| Language stats | GitHub API + `github-readme-stats` widget | Each run |
| Blog/tutorials | Local markdown in `nelgoez/nelgoez/blog/` | Manual + commit |
| Profile bio | Template variable | Manual when changing focus |

---

## 4. Component: Landing Page (nelthor.qzz.io)

### 4.1 Stack

- **Framework**: Next.js 15+ with Static Export (`output: 'export'`)
- **Styling**: Tailwind CSS 4
- **Data**: GitHub REST API (client-side fetch with SWR/fetch)
- **Content**: Local MDX for blog posts
- **Deploy**: Vercel (free tier, custom domain)
- **Domain**: nelthor.qzz.io (purchased via Vercel or Namecheap)

### 4.2 Sections

```
┌─────────────────────────────────────────┐
│  HERO                                   │
│  "Nahuel — Agentic QA Engineer"         │
│  Tagline + CTA (Contact / Download CV)  │
├─────────────────────────────────────────┤
│  SKILLS & TECH STACK                    │
│  Interactive badges, categorized        │
│  (Testing, Backend, Tools, Cloud)       │
├─────────────────────────────────────────┤
│  EXPERIENCE TIMELINE                    │
│  Newfold Digital (4.5yr SDET)          │
│  + earlier roles, chrono               │
├─────────────────────────────────────────┤
│  FEATURED PROJECTS                     │
│  Cards from GitHub API (live data)      │
│  bunkai-qa-engineering                  │
│  agentic-diplo-track-sys                │
│  food-app                               │
│  → stars, language, last push           │
├─────────────────────────────────────────┤
│  BEHIND THE SCENES / METHODOLOGY        │
│  Side-by-side: traditional vs agentic   │
│  Screenshots, recordings, arch diagrams │
│  Shows the HOW behind the WHAT          │
├─────────────────────────────────────────┤
│  BLOG / TUTORIALS                       │
│  MDX articles on Agentic QA,           │
│  test automation, career transition    │
├─────────────────────────────────────────┤
│  CONTACT                                │
│  Email link + LinkedIn + WhatsApp       │
└─────────────────────────────────────────┘
```

### 4.3 GitHub API Integration

- Public repos: `GET /users/nelgoez/repos?sort=updated&per_page=10`
- Profile: `GET /users/nelgoez`
- README: `GET /repos/nelgoez/nelgoez/readme`
- Rate limit: 60 req/hr unauthenticated — sufficient for page loads
- Cache: SWR with 1-hour revalidation, optional Vercel ISR

### 4.4 Blog/Tutorials

- Content: `.mdx` files in `nelthor.qzz.io/content/blog/`
- Categories: Agentic QA, Test Automation, Career, Tutorials
- Frontmatter: `title`, `date`, `tags`, `description`
- Generation: `getStaticProps` reads all MDX at build time
- No CMS — simple, portable, git-versioned

### 4.5 Behind the Scenes Section

A dedicated page/section showing **the process** — not just what was built, but how. Two parallel narratives:

**Traditional / Manual era (Newfold Digital):**
- Cucumber + TypeScript framework architecture screenshots
- Jenkins pipeline diagrams with stages (lint → build → test → deploy)
- Robot Framework + Python test reports
- Jira integration: BDD feature files ↔ test execution traceability
- Allure/Extent reports showing historical trends

**Agentic era (current projects):**
- Agent workflow diagrams: how prompts flow through skills → code → review → deploy
- Session recordings (terminal + browser) of AI-assisted development cycles
- KATA architecture visual: Component → Action → Test layers
- Prompt engineering examples: how acceptance criteria become test cases
- Before/after comparisons: manual test effort vs agentic automation

**Layout:** Side-by-side tabs or timeline toggle — user picks "Traditional" or "Agentic" and sees the same problem solved both ways. Shows depth across both eras.

| Problem | Traditional approach | Agentic approach |
|---------|--------------------|-----------------|
| Write test for new feature | Manual Cucumber feature file + step defs | AI generates from AC → human reviews |
| CI/CD pipeline config | Jenkinsfile hand-coded | Agent proposes → human approves + adjusts |
| Framework architecture | Researched, POC'd, coded over weeks | Scaffolded in hours via skills |
| Test reporting | Custom reporter code | KATA reporter + Allure out of the box |

### 4.6 Media Content — Types & Sources

| Media type | Source | What it shows | Placement |
|-----------|--------|---------------|-----------|
| Screenshots | Newfold Digital projects (if available) | Framework structure, CI pipelines, test reports | Behind the Scenes |
| Terminal recordings (asciinema/SVG) | Current dev sessions | AI agent interactions, terminal workflows | Behind the Scenes + Blog |
| Architecture diagrams (Mermaid/Excalidraw) | Both eras | System design, component relationships | Behind the Scenes + Project cards |
| Video screen captures | Browser automation runs | Playwright test execution, pass/fail flows | Project cards + GitHub README |
| Allure reports (static export) | Current test runs | Test trends, coverage, flakiness | Project cards |
| GitHub activity graphs | API | Contribution consistency, language diversity | GitHub profile, landing page |
| Agent session logs (anonymized) | Agentic-dev sessions | Skill dispatch, planning, review loops | Blog articles (technical) |
| Jira boards (screenshots) | Both eras | Sprint planning, traceability, workflows | Behind the Scenes |
| Diff comparisons | Code commits | Before/after refactors, traditional vs AI-generated | Blog articles |

**Pro tip:** Keep a `media/` folder under `.context/portfolio/media/` with organized raw assets. An `.assets/` manifest JSON tracks captions, dates, and which section each asset belongs to. Reuse across GitHub README (SVG/static images via `raw.githubusercontent.com`) and nelthor.qzz.io (optimized via Next.js Image).

---

## 5. Health & Quality Tools

Quality tooling is **not overhead** — it's the feature that proves Nahuel is an SDET who builds quality into everything, including his own career presence.

### 5.1 Tool Suite

`scripts/health/` directory with individual checks and a run-all orchestrator:

```
scripts/health/
├── check-assets.ts       ← Asset Integrity
├── check-readme.ts       ← README Freshness Gate
├── check-staleness.ts    ← Content Staleness Report
├── check-consistency.ts  ← Profile Consistency Check
└── run-all.ts            ← Orchestrator: exit 0/1, JSON + table output
```

### 5.2 check-assets.ts

| Property | Value |
|----------|-------|
| **What** | Reads `manifest.json`, validates every asset file exists on disk, checks image headers aren't broken, confirms alt_text is non-empty |
| **Output** | `X/Y valid ✓` with per-asset detail; exits 1 if any asset missing |
| **Frequency** | On-demand via `bun run health:check`; pre-commit hook optional |
| **Failure action** | Blocks commit if linked from active pages; warning-only if staged but unreferenced |

### 5.3 check-readme.ts

| Property | Value |
|----------|-------|
| **What** | Before the profile README auto-commit, scans for empty sections, `TODO`/`TBD` strings, placeholder text (`[your name]`, `{{variable}}`), broken shield.io badge URLs |
| **Output** | Table of warnings; exits 1 on any red-flag issue |
| **Frequency** | Gates the GitHub Action that commits README (step before `git commit`) |
| **Failure action** | README commit is skipped, Action logs error with line numbers |

### 5.4 check-staleness.ts

| Property | Value |
|----------|-------|
| **What** | Scans blog posts by frontmatter date; flags any >90 days old. Compares repo `updated_at` timestamps against last README generation; warns if a repo has new activity but README hasn't picked it up |
| **Output** | `⚠️` warnings grouped by severity (blog, repos, skills). Never exits 1 — informational |
| **Frequency** | Runs after every README generation + on demand |
| **Failure action** | None (informational). Surface in health report only |

### 5.5 check-consistency.ts

| Property | Value |
|----------|-------|
| **What** | Compares canonical data across platforms: GitHub bio ↔ LinkedIn headline ↔ `.agents/project.yaml` position. Flags mismatches like "Agentic QA Engineer" on GitHub but "QA Automation" on LinkedIn |
| **Output** | Table of fields with per-platform values; warns on any 3-way divergence |
| **Frequency** | Weekly on-demand |
| **Failure action** | Prints actionable diff. No exit code failure — positioning drift is a judgment call |

### 5.6 run-all.ts — Orchestrator

Runs all 4 checks, aggregates results, prints a single table:

```
┌──────────────────────────────────────────────┐
│  Career Command Center — Health Report        │
├──────────────────────────────────────────────┤
│  Assets:    10/10 valid ✓                     │
│  README:    Generated OK, no placeholders ✓   │
│  Content:   Blog ok, 2 repos stale ⚠️         │
│  Profile:   GitHub ≠ LinkedIn headline ⚠️      │
└──────────────────────────────────────────────┘
```

Exit code 0 if no blockers, 1 if action required.

### 5.7 Package.json integration

```json
{
  "scripts": {
    "health:check": "bun scripts/health/run-all.ts",
    "health:assets": "bun scripts/health/check-assets.ts",
    "health:readme": "bun scripts/health/check-readme.ts",
    "health:staleness": "bun scripts/health/check-staleness.ts",
    "health:consistency": "bun scripts/health/check-consistency.ts"
  }
}
```

### 5.8 Out of Scope (v1)

- **Deploy Health Dashboard** — Vercel status + SSL + domain expiry. Needs network calls and a mini-UI. Postpone to v2.
- **Automated fixes** — tools warn but don't auto-fix content. Human reviews the diff, applies changes.
- **GitHub Actions integration** — health checks run locally or pre-commit. CI integration adds cross-repo complexity for v1.

---

## 7. Orchestration via Boilerplate Skills

The boilerplate is **not just infrastructure** — it's a living demo:

| Skill | How it maps to the portfolio |
|-------|------------------------------|
| `/project-foundation` | Define "Nahuel's Career as a Product" — PRD with goals, audience, KPIs |
| `/design-system` | Design tokens for nelthor.qzz.io (colors, typography, spacing) |
| `/project-bootstrap` | Scaffold the Next.js landing page |
| `/product-management` | Maintain backlog of portfolio improvements as epics/stories |
| `/sprint-development` | Implement each feature: profile automator, blog, live metrics |
| `/git-flow-master` | Manage branches, commits, PRs for the portfolio |
| `/sync-ai-memory` | Keep CLAUDE.md aligned with evolving portfolio scope |
| `/business-data-map` | Map the "data" of Nahuel's career (roles, skills, projects) |

---

## 8. Content Strategy

### 8.1 GitHub Profile README — Sections

1. **Animated header** — "QA Engineer | Backend Dev | Agentic Testing Specialist"
2. **Short bio** — 2-3 lines, current focus
3. **🔥 Recent activity** — auto-generated from last 5 updated repos
4. **Tech stack** — grouped badges (Testing / Backend / Tools / Cloud)
5. **Stats widget** — `github-readme-stats` card
6. **📝 Latest blog** — auto-pulled from nelthor.qzz.io/blog RSS
7. **Contact** — email, LinkedIn, WhatsApp

### 8.2 Blog Topics (initial batch)

| Article | Topic | Target |
|---------|-------|--------|
| "From SDET to Agentic QA Engineer" | Career transition story | Recruiters |
| "Testing AI Agents — A Practical Guide" | Non-deterministic testing | QA peers |
| "Building a KATA Framework with Playwright" | Technical tutorial | Developers |
| "How I Automated My GitHub Profile" | Meta-article | Portfolio visitors |
| "Behind the Scenes: Same Problem, Two Eras" | Traditional vs agentic comparison | Hiring managers |

### 8.3 Media Content Audit — Asset Manifest

A lightweight JSON manifest tracks all media assets used across the portfolio:

`.context/portfolio/media/manifest.json`
```json
{
  "assets": [
    {
      "id": "nd-cucumber-framework-arch",
      "type": "screenshot",
      "source": "newfold-digital",
      "era": "traditional",
      "caption": "Cucumber + TypeScript test framework layer diagram",
      "tags": ["framework", "cucumber", "typescript", "architecture"],
      "used_in": ["nelthor.qzz.io/behind-the-scenes", "github-readme"],
      "file": "nd-cucumber-arch.png",
      "alt_text": "Architecture diagram of Cucumber BDD framework with Page Object layers"
    },
    {
      "id": "agentic-kata-workflow",
      "type": "diagram",
      "source": "generated",
      "era": "agentic",
      "caption": "KATA architecture — Component → Action → Test with AI agent dispatch",
      "tags": ["kata", "agentic", "architecture", "framework"],
      "used_in": ["nelthor.qzz.io/behind-the-scenes", "blog/kata-guide"],
      "file": "kata-agentic-flow.svg",
      "alt_text": "Flow diagram showing KATA layers with AI skill dispatch points"
    }
  ],
  "categories": [
    { "id": "screenshot", "label": "Screenshot", "extensions": [".png", ".jpg"] },
    { "id": "diagram", "label": "Architecture Diagram", "extensions": [".svg", ".png"] },
    { "id": "recording", "label": "Screen Recording", "extensions": [".gif", ".mp4"] },
    { "id": "report", "label": "Test Report", "extensions": [".html", ".pdf"] }
  ]
}
```

The manifest is source-of-truth. A build script (`scripts/build-media-index.ts`) validates all paths exist before deploy. Missing assets = CI warning, not blocker. This prevents broken images in production.

---

## 9. Success Metrics

| Metric | Current | Target (90 days) |
|--------|---------|-------------------|
| GitHub profile views/week | ? | +200% |
| LinkedIn profile views/week | ? | +150% |
| Inbound recruiter messages/month | ? | ≥ 5 |
| nelthor.qzz.io unique visitors/month | N/A | ≥ 500 |
| Blog articles published | 0 | ≥ 4 |
| Media assets in manifest | 0 | ≥ 10 (mix of traditional + agentic) |
| Behind the Scenes section live | No | Yes, with ≥ 6 media assets |
| Profile README freshness | Static | Daily auto-update |
| Pages on nelthor.qzz.io | 0 | ≥ 5 (home, projects, blog, behind-the-scenes, contact) |
| Health checks passing | N/A | 4/4 green |

---

## 10. Out of Scope (v1)

- Dynamic backend / API server — static export first, add later
- Comments system for blog — use LinkedIn discussions instead
- Custom CMS — markdown is sufficient
- Multiple languages — English only for maximum reach
- Analytics dashboard — Vercel Analytics is enough
- Health deploy dashboard — network + mini-UI, postpone v2

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| GitHub API rate limiting | Use unauthenticated + cache headers or fine-grained token |
| Vercel free tier limits | Static export uses negligible bandwidth; blog images on CDN |
| Profile README update creates noisy commits | Action checks diff before commit; skip if unchanged |
| Content staleness | Monthly review cycle via `/sprint-development` backlog |
| Health tools become noise | Single `run-all.ts` orchestrator with clear exit codes; tools that never fail get ignored |
