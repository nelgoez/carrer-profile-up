# agentic-diplo-track-sys

> **Agentic dev boilerplate** — From PRD to staging deploy, driven by AI skills. Built and maintained by [Nahuel Gomez](https://nelthor.com.ar).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

A full-stack development starter where **AI agents drive the workflow** — not just autocomplete, but the whole loop: define the product, scaffold the stack, refine the backlog, ship every story, deploy to staging. Ten workflow skills cover every phase.

## Stack

| Layer | Tech |
|-------|------|
| Runtime | Bun + TypeScript |
| Frontend | Next.js 15 (auto-scaffolded) |
| Backend | Supabase (auto-scaffolded) |
| AI layer | 10 workflow skills + 5 slash commands |
| CI/CD | GitHub Actions |
| Agent | Claude Code / OpenCode |

## What it demonstrates

- **Full agentic dev lifecycle** — `/project-foundation` → `/product-management` → `/sprint-development` → deploy
- **Skill orchestration** — modular `.claude/skills/` with auto-trigger + slash commands
- **Agentskills.io spec** — cross-agent compatible (Claude, OpenCode, Cursor, Copilot)
- **Session resilience** — auto-resume, progress tracking, archive
- **Autonomous mode** — 3-tier gate bypass (`off`/`semi`/`full`)

## Quick start

```bash
bunx create-agentic-dev@latest <your-repo-name>
cd <your-repo-name>
# then: /project-foundation → /design-system → /project-bootstrap → /sprint-development
```

## Related

- [Portfolio](https://nelthor.com.ar) — Nahuel Gomez, Agentic QA Engineer
- [bunkai-qa-engineering](https://github.com/nelgoez/bunkai-qa-engineering) — QA automation framework (companion repo)
- [career-profile-up](https://github.com/nelgoez/career-profile-up) — career command center

---

*Built with agentic workflows. Maintained by [@nelgoez](https://github.com/nelgoez).*
