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

<h1>Nahuel Elias — Career Profile</h1>

<p>
  <a href="https://nelthor.qzz.io"><b>nelthor.qzz.io</b></a> ·
  <a href="https://linkedin.com/in/nelgoez">LinkedIn</a> ·
  <a href="https://github.com/nelgoez">GitHub</a>
</p>

<p><i>SDET turned Agentic QA Engineer. 5+ years building test automation at Newfold Digital. Now designing intelligent quality systems that work alongside AI agents.</i></p>

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

</div>

<br />

## Portfolio

**→ [nelthor.qzz.io](https://nelthor.qzz.io)** — static portfolio built with Next.js, deployed to GitHub Pages.

| Section | What you'll find |
|---------|-----------------|
| **Projects** | Live repos from GitHub API, tech stack, links |
| **Behind the Scenes** | How this was built — traditional QA vs agentic workflows |
| **Blog** | Articles on Agentic QA, test automation, career |
| **Experience** | Timeline: Newfold Digital → Agentic QA Engineer |

## Tech

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 15 (static export), Tailwind CSS 4, TypeScript |
| Hosting | GitHub Pages + custom domain (nelthor.qzz.io) |
| DNS | FreeDNS (afraid.org) → DigitalPlat (qzz.io) |
| Scripts | Bun + TypeScript (health checks, README generator) |
| CI/CD | GitHub Actions (auto-deploy on push) |

## What's in this repo

This repo is both the **source code** for the portfolio and the **workspace** where it was built using agentic development workflows. It includes:

- `nelthor.qzz.io/` — Next.js portfolio app
- `scripts/` — health checks, README generator for GitHub profile
- `.claude/skills/` — reusable AI workflow skills (sprint-development, product-management, etc.)
- `.context/` — design specs, content plans, media assets

## Quick start (local)

```bash
bun install
cp .env.example .env
bun run generate:readme   # auto-generate GitHub profile README
bun run health:check      # run portfolio health checks
cd nelthor.qzz.io && bun install && bun run build
```

## License

MIT
