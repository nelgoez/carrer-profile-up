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

<h3>Your career, managed as a product — with AI agents.</h3>

<p><i>A career command center that manages your professional presence across platforms: auto-generates your GitHub profile README, hosts your portfolio, tracks content freshness, and demonstrates agentic workflows. Built with the agentic-dev-boilerplate.</i></p>

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-EAB308?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

<br />

## What this is

**carrer-profile-up** is a local command center that manages your professional career presence. It uses AI workflow skills to:

- **Auto-generate** your GitHub Profile README from live API data
- **Host** a portfolio landing page (`nelthor.qzz.io`) with projects, blog, and behind-the-scenes content
- **Monitor** content freshness via health check tools (`bun run health:check`)
- **Orchestrate** improvements using the agentic-dev workflow (skills for planning, sprints, reviews)

It's a **personal project** that doubles as a **portfolio piece** — showing both traditional SDET skills (Cucumber, Jenkins, Python) and cutting-edge agentic AI workflows.

## Quick start

```bash
# Install dependencies
bun install

# Copy env template
cp .env.example .env

# Generate GitHub profile README (requires internet)
bun run generate:readme

# Run health checks
bun run health:check

# Build landing page
cd nelthor.qzz.io && bun install && bun run build
```

## Project structure

```
carrer-profile-up/
├── .agents/              # Project config + git strategy
├── .claude/skills/       # AI workflow skills (sprint-dev, product-mgmt, etc.)
├── .context/             # Product backlog, business maps, media assets
├── nelthor.qzz.io/       # Portfolio landing page (Next.js SSG)
├── scripts/
│   ├── generate-readme.ts    # GitHub profile README generator
│   └── health/               # Health check tooling
│       ├── check-assets.ts
│       ├── check-readme.ts
│       ├── check-staleness.ts
│       ├── check-consistency.ts
│       └── run-all.ts
├── docs/                 # Design specs, methodology
├── AGENTS.md             # AI agent interface (/autonomous, behavioral registers)
└── CLAUDE.md             # AI persistent memory
```

## Key features

| Feature | Description | How to run |
|---------|-------------|------------|
| **Profile auto-generator** | Fetches repos from GitHub API, generates README with stats, badges, latest projects | `bun run generate:readme` |
| **Portfolio page** | Next.js static site with projects, blog, behind-the-scenes comparisons | `cd nelthor.qzz.io && bun run build` |
| **Health checks** | 4 checks: assets integrity, README freshness, content staleness, profile consistency | `bun run health:check` |
| **Autonomous mode** | Gate bypass for faster AI execution: `off`/`semi`/`full` | `/autonomous full` |

## Autonomous mode

Three levels of AI autonomy — defined in `AGENTS.md` and `CLAUDE.md` §13.

```
/autonomous off    → all checkpoints fire (default)
/autonomous semi   → upfront manifest approval, per-phase WAITs fire
/autonomous full   → only HARD gates surface
```

Gate tables cover 7 workflow skills: sprint-development, project-foundation, design-system, project-bootstrap, product-management, unit-testing, testability-guide.

## Making it your own

This project is designed to be forked: change the GitHub username in `scripts/generate-readme.ts`, update the domain, swap the content, and you have your own AI-powered career profile.

## License

MIT — use it, fork it, improve it.
