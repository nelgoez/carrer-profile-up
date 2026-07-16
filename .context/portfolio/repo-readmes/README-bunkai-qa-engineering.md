# bunkai-qa-engineering

> **AI-powered QA automation framework** — Playwright + TypeScript, KATA architecture, Jira/Xray integration. Built and maintained by [Nahuel Gomez](https://nelthor.com.ar).

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-latest-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

A production-grade test automation framework that showcases **end-to-end QA engineering** — from KATA component architecture to CI/CD regression pipelines. Demonstrates the full spectrum: traditional test automation (Playwright, Cucumber, Allure) + agentic workflows (AI-driven test generation, skill-based orchestration).

## Stack

| Layer | Tech |
|-------|------|
| Automation | Playwright + TypeScript |
| Architecture | KATA (Component → Action → Test) |
| Reporting | Allure, Playwright HTML Report |
| TMS | Jira / Xray (test case sync) |
| CI/CD | GitHub Actions (smoke, sanity, regression) |
| AI layer | Agentic workflows via Claude Code / OpenCode |

## What it demonstrates

- **Framework architecture** — scalable 4-layer KATA design (TestContext → UiBase/ApiBase → Domain Components → TestFixture)
- **CI/CD pipelines** — daily smoke tests, pattern-based sanity, full regression
- **Test data management** — factories, fixtures, typed generators
- **AI integration** — skills that plan, code, and review tests via agent orchestration
- **TMS traceability** — `@atc:JIRA-123` decorators that sync results back to Xray

## Quick start

```bash
bun install
bun run pw:install
cp .env.example .env   # fill in your credentials
bun run test           # run full suite
```

## Related

- [Portfolio](https://nelthor.com.ar) — Nahuel Gomez, Agentic QA Engineer
- [agentic-diplo-track-sys](https://github.com/nelgoez/agentic-diplo-track-sys) — dev workflow boilerplate (companion repo)
- [career-profile-up](https://github.com/nelgoez/career-profile-up) — career command center

---

*Built with agentic workflows. Maintained by [@nelgoez](https://github.com/nelgoez).*
