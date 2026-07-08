# EPIC: Cross-Repo Content Sync Pipeline

**Status:** Building (Phase 1-3 complete)
**Priority:** High
**Goal:** Unified sync pipeline that ingests metadata/images from source repos (bunkai, DTS, UNC), updates portfolio content, and regenerates the GitHub profile README — all in one event-driven workflow.

---

## Architecture (Option 1 — Unified Sync)

```
Source repos (bunkai, DTS, UNC, etc.)
    │  push to main / release published
    │  ┌──────────────────────────────────┐
    │  │ trigger-portfolio-sync.yml       │  (15 lines per source repo)
    │  │ gh api repos/.../dispatches ...  │
    │  └──────────────────────────────────┘
    ▼
repository_dispatch (event_type: portfolio-sync)
    │
career-profile-up
    ├── sync-all.yml (workflow)
    │   ├── checkout: all source repos
    │   ├── checkout: nelgoez/nelgoez
    │   └── run: scripts/sync-all.ts
    │
    ▼
sync-all.ts (the brain)
    ├── PHASE A: Ingest from source repos
    │   ├── Read README.md + portfolio.json from each
    │   ├── Scan for images (docs/media/, docs/screenshots/)
    │   └── Extract CI badges, topics, languages
    │
    ├── PHASE B: Update portfolio content
    │   ├── Generate _projects.json manifest
    │   ├── Copy images → .context/portfolio/media/
    │   └── Optionally generate MDX snippets
    │
    ├── PHASE C: Generate profile README
    │   ├── Read portfolio data (blog, skills, experience, metrics)
    │   ├── Fetch GitHub API (stats, repos)
    │   ├── Merge with synced source repo metadata
    │   └── Write README.md for nelgoez/nelgoez
    │
    └── PHASE D: Commit + push to both repos
        ├── Portfolio repo → auto-triggers deploy-portfolio.yml
        └── Profile repo → nelgoez/nelgoez README updated
```

---

## Files Changed/Created

### NEW files in career-profile-up

| File | Purpose |
|---|---|
| `scripts/sync-all.ts` | Unified sync script (phases A-D) |
| `.github/workflows/sync-all.yml` | Orchestrator: repo_dispatch + cron + manual |
| `nelthor.qzz.io/content/projects/_projects.json` | Auto-generated project manifest consumed by site |
| `docs/cross-repo-sync.md` | Runbook: how to add a new source repo |

### MODIFIED files in career-profile-up

| File | Change |
|---|---|
| `scripts/generate-readme.ts` | Refactored as Phase C of sync-all.ts (or retired) |
| `nelthor.qzz.io/components/projects-section.tsx` | Fallback to _projects.json when API fails, or use manifest for thumbnails |
| `.github/workflows/update-github-profile.yml` | Fixed write-to-root bug, or replaced by sync-all.yml |

### NEW files in each source repo (bunkai, DTS, UNC, etc.)

| File | Purpose |
|---|---|
| `portfolio.json` | Metadata: featured, thumbnail, displayName, tags, order |
| `.github/workflows/trigger-portfolio-sync.yml` | Sends repository_dispatch on push/release |
| `docs/screenshots/` or `docs/media/` | Optional: images referenced by portfolio.json |

---

## Implementation Phases

### Phase 1: Foundation — Script + Data Model

**Step 1.1 — Define `portfolio.json` schema** ✅ DONE

Standard metadata file at root of each source repo. Deployed to `bunkai-qa-engineering` as test case.
```json
{
  "featured": true,
  "thumbnail": "docs/screenshots/demo.png",
  "displayName": "Bunkai QA Engineering",
  "shortDescription": "AI-driven test decomposition framework for agentic QA",
  "category": "qa-framework",
  "tags": ["playwright", "typescript", "agentic-qa"],
  "order": 1
}
```

All fields optional — fallback to GitHub API data.

**Step 1.2 — Write `scripts/sync-all.ts`** ✅ DONE

Single `sync-all.ts` with 3 phases + inline media manifest regeneration.
- Phase A: reads `portfolio.json`, README.md, package.json from each source repo
- Phase B: generates `_projects.json`, copies images, regenerates media manifest
- Phase C: reads blog posts from MDX, fetches GitHub API, generates profile README with: portfolio link, blog posts, tech stack shields, metrics table, QA philosophy section, featured projects with thumbnails, GitHub stats + trophies

**Step 1.3 — Create `_projects.json` data structure**

```json
{
  "updated": "2026-07-08",
  "repos": [
    {
      "name": "bunkai-qa-engineering",
      "displayName": "Bunkai QA Engineering",
      "description": "AI-driven test decomposition...",
      "url": "https://github.com/nelgoez/bunkai-qa-engineering",
      "language": "TypeScript",
      "tags": ["playwright", "typescript", "agentic-qa"],
      "thumbnail": "/media/bunkai-qa-engineering/demo.png",
      "ci_status": "passing",
      "featured": true,
      "order": 1,
      "updated_at": "2026-07-07"
    }
  ]
}
```

### Phase 2: Portfolio Site Integration ✅ DONE

**Step 2.1 — Update `projects-section.tsx`** ✅ DONE
- Server component reads `_projects.json` at build time, passes as `initialProjects` prop
- Client component shows synced data immediately (no loading skeleton)
- Merges with GitHub API response when available (stars, freshness)
- Uses synced displayName and thumbnail from source repos

**Step 2.2 — Wire synced media into /behind-the-scenes**
- Media copied to `.context/portfolio/media/<repo-name>/` and automatically appears in gallery via manifest

### Phase 3: Workflows ✅ DONE

**Step 3.1 — `.github/workflows/sync-all.yml`** ✅ DONE
- Triggers: `repository_dispatch`, daily cron (5am UTC), `workflow_dispatch`
- Handles single-repo dispatch (from source repo) and full batch (cron)
- Commits portfolio changes → auto-triggers `deploy-portfolio.yml`
- Commits profile changes to `nelgoez/nelgoez`
- `deploy-portfolio.yml` paths expanded to include `.context/portfolio/media/**` and `scripts/**`

**Step 3.2 — Trigger workflow in source repos** ✅ DONE (bunkai-qa-engineering)

Remaining source repos still need trigger workflow added (DTS, UNC, etc.).

A reusable workflow template. Documented in `docs/cross-repo-sync.md`. Source repos copy this.

```yaml
name: Trigger Portfolio Sync
on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - run: |
          gh api repos/nelgoez/career-profile-up/dispatches \
            -f event_type=portfolio-sync \
            -f client_payload[repo]="${{ github.repository }}" \
            -f client_payload[ref]="${{ github.ref }}"
        env:
          GH_TOKEN: ${{ secrets.GH_PAT }}
```

### Phase 4: Profile README Enrichment

After Phase 3, the profile gets these new sections (data sourced from portfolio):

| Section | Source in portfolio |
|---|---|
| Latest Blog Posts | `content/blog/*.mdx` frontmatter |
| Skills (unified badges) | `components/translated-home.tsx` + `messages/en.json` |
| Work Timeline | `components/timeline.tsx` |
| Impact Metrics | `components/impact-metrics.tsx` |
| QA Evidence Links | `app/qa/page.tsx` → link to nelthor.qzz.io/qa |
| "Built with Agentic Dev" callout | How this pipeline works |

### Phase 5: Template + Social Post (boxed for later)

**Template feature:** Update `.template/` with an inventory of:
- All skills available (the agentic dev skills)
- MCPs configured (Tavily, Context7, Supabase, n8n, Atlassian)
- Workflow patterns (GH Actions, sync pipelines)
- How to fork and customize

**LinkedIn post:** Draft highlighting:
- The cross-repo sync pipeline architecture
- Before/after: profile README was stale, now auto-updating
- How portfolio content feeds the GitHub profile
- Open-source template for others

---

## Key Design Decisions

1. **Single script, single workflow** — Avoids coordination between 2-3 workflows. One atomic unit.
2. **Checkout repos via git clone** — Simpler than GitHub API for binary files (images). Also gives access to full file trees.
3. **portfolio.json as convention** — Optional. Without it, script uses GitHub API data + README.md heuristics. Zero cost to add.
4. **Projects manifest (_projects.json)** — Static JSON consumed at build time. No runtime API call needed for thumbnails. Falls back to GitHub API if stale/missing.
5. **Profile README is generated, not hand-edited** — The `nelgoez/nelgoez` README becomes a pure output artifact. All profile data lives in the portfolio.

---

## Rollout Order

```
Week 1: Phase 1 (script + data model)
  Day 1-2: Write portfolio.json schema, create sync-all.ts skeleton
  Day 3-4: Implement Phase A (ingest from repos)
  Day 5:   Implement Phase B (portfolio content generation)

Week 2: Phase 2-3 (integration + workflows)
  Day 1-2: Implement Phase C (profile README generation)
  Day 3:   Create sync-all.yml, test with manual dispatch
  Day 4:   Update projects-section.tsx, fix generate-readme bug
  Day 5:   Add trigger workflows to first source repo (bunkai)

Week 3: Phase 4 (enrichment)
  Day 1-3: Enrich profile README with blog/skills/experience/metrics
  Day 4-5: Roll out to remaining source repos (DTS, UNC)

Week 4: Phase 5 (template + social)
  Template docs + LinkedIn post
```
