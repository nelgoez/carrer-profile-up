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
| DNS | cloudefare.com → DigitalPlat (qzz.io) |
| Scripts | Bun + TypeScript (health checks, README generator) |
| CI/CD | GitHub Actions (auto-deploy on push) |

## What's in this repo

This repo is both the **source code** for the portfolio and the **workspace** where it was built using agentic development workflows. It includes:

- `nelthor.qzz.io/` — Next.js portfolio app
- `scripts/` — health checks, README generator for GitHub profile
- `.claude/skills/` — reusable AI workflow skills (sprint-development, product-management, etc.)
- `.context/` — design specs, content plans, media assets

## Use this as a template

This repo is a **GitHub Template** — click the green "Use this template" button at the top of the repo page to create your own copy.

### For your own portfolio

1. Click **Use this template** → name it `<your-username>.github.io` or whatever you like
2. Clone your new repo: `git clone https://github.com/<your-username>/<your-repo>.git`
3. `bun install`
4. Replace content in `nelthor.qzz.io/` with your own (pages, components, styles)
5. Deploy: push to `main` — GitHub Actions builds and deploys automatically

### For QA professionals / Analysts

No CLI tools required beyond `git` and `bun`. The template includes:
- A ready-to-deploy Next.js portfolio with dark theme
- Health check scripts to validate your content
- GitHub Actions CI that builds on every push

Swap the name, bio, experience, and projects — your portfolio is live in minutes.

## Quick start (local)

```bash
bun install
cp .env.example .env
bun run generate:readme   # auto-generate GitHub profile README
bun run health:check      # run portfolio health checks
cd <your-porfolio-name> && bun install && bun run build
```

## License

MIT
