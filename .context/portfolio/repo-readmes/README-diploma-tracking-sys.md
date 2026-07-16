# diploma-tracking-sys

> **Full-stack academic diploma tracking platform** — Supabase + Next.js + Hono API. Built and maintained by [Nahuel Gomez](https://nelthor.com.ar).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![Supabase](https://img.shields.io/badge/Supabase-latest-3ECF8E?logo=supabase&logoColor=white)](https://supabase.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

Full-stack academic platform for managing diploma tracking, student progress, certificates, and enrollment workflows. Supabase backend with RLS-secured data access, Moodle integration, PDF certificate generation, and a rule engine for enrollment eligibility.

## Stack

| Layer | Tech |
|-------|------|
| Runtime | Bun + TypeScript |
| Frontend | React + Vite (auto-scaffolded) |
| Backend | Hono API on Bun |
| Database | Supabase (Postgres + RLS) |
| AI layer | 14-phase AI-assisted dev methodology |
| CI/CD | GitHub Actions (6 workflows) |
| Testing | Playwright E2E + Allure reports + a11y |

## What it demonstrates

- **Full-stack architecture** — Hono API with 15+ route files, services layer, provider abstraction
- **Security by design** — Supabase RLS policies, JWT auth, role-based access (admin/coordinador/estudiante)
- **Integration patterns** — Moodle sync, Guarani integration, PDF generation service
- **Rule engine** — Declarative enrollment eligibility with coordinator-exception support
- **Testing maturity** — Playwright E2E (auth fixture, business-flow, a11y smoke) + Allure CI reports + traceability
- **Dev methodology** — 14-phase AI-assisted workflow documented in Spanish, from discovery to production deploy

## Demo access

One-click demo mode at `https://diplomatrackingsystem.qzz.io/` — mock data, no signup required.

## Related

- [Portfolio](https://nelthor.com.ar) — Nahuel Gomez, Agentic QA Engineer
- [agentic-diplo-track-sys](https://github.com/nelgoez/agentic-diplo-track-sys) — dev workflow hub (companion repo)
- [bunkai-qa-engineering](https://github.com/nelgoez/bunkai-qa-engineering) — QA automation framework

---

*Built with agentic workflows. Maintained by [@nelgoez](https://github.com/nelgoez).*
