# Context Engineering — Career Profile Project

> How `career-profile-up` structures context for AI agents.
> Loaded by Claude Code and OpenCode at session start.

---

## 1. What is Context Engineering?

A structured approach to organizing project knowledge so AI agents can find, consume, and reference it efficiently — without reading every file or guessing conventions.

## 2. Directory Structure

```
career-profile-up/
├── .agents/
│   └── project.yaml            Project config + git strategy
│
├── .claude/
│   ├── skills/                 Workflow skills (T1, committed)
│   │   ├── agentic-dev-core/   Shared doctrine (briefing, dispatch, orchestration)
│   │   ├── sprint-development/ Per-story dev loop (mega-orchestrator)
│   │   ├── product-management/ Backlog + epic + INVEST/AC refinement
│   │   ├── project-foundation/ Constitution + Architecture + Discovery
│   │   ├── project-bootstrap/  Infra scaffolding (frontend, backend, auth)
│   │   ├── design-system/      DESIGN.md generation
│   │   ├── unit-testing/       TDD red-green-refactor
│   │   ├── testability-guide/  In-app /qa page + credentials artifact
│   │   ├── git-flow-master/    Git/PR automation
│   │   ├── vercel-cli/         Vercel deploy cookbook
│   │   └── agentic-dev-onboard/ First-time orientation
│   ├── commands/               Slash commands (sync-ai-memory, business-*-map)
│   └── settings.json
│
├── .context/
│   ├── PBI/                    Product Backlog Items (local-first planning)
│   ├── portfolio/media/        Media assets + manifest.json
│   ├── PRD/                    Product requirements (placeholder)
│   ├── SRS/                    Software requirements (placeholder)
│   └── ADR/                    Architecture Decision Records
│
├── scripts/
│   ├── generate-readme.ts      GitHub profile README generator
│   └── health/                 Health check tooling
│
├── nelthor.com.ar/             Portfolio landing page (Next.js SSG)
├── docs/                       Design specs, methodology
├── AGENTS.md                   AI agent interface
└── CLAUDE.md                   AI persistent memory
```

## 3. Key conventions

- **Skills-first**: all workflows live in `.claude/skills/`. Match intent → load skill.
- **Local-first planning**: `.context/PBI/` is authored directly in markdown. No Jira sync.
- **Autonomous mode**: gates control human checkpoints per skill. Set via `/autonomous`.
- **Health checks**: `bun run health:check` validates assets, README, content, consistency.
- **Project variables**: resolved from `.agents/project.yaml` via `{{VAR}}` syntax.

## 4. Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Bun 1.x |
| Portfolio | Next.js 15 (static export) |
| Profile generator | TypeScript + GitHub REST API |
| AI agents | OpenCode / Claude Code |
| MCPs | Tavily, Context7, Supabase, n8n |

## 5. Agent workflow

1. User requests a change (new blog post, feature, fix)
2. Load matching skill (`/sprint-development`, `/product-management`, etc.)
3. Skill reads context from `.context/PBI/` + `.agents/project.yaml`
4. Plan → implement → review → deploy (gate-checked per autonomous mode)
5. Health checks validate output before completion
