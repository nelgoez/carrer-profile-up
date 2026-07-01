# Media Assets Manifest

**Epic:** Portfolio Polish
**Priority:** Low
**Status:** Backlog

---

## User Story

**As a** site maintainer
**I want to** have a centralized media assets manifest with screenshots of key pages
**So that** I can reuse them for social media, presentations, and documentation

---

## Acceptance Criteria

- [ ] `.context/portfolio/media/manifest.json` exists with metadata for each asset
- [ ] `.context/portfolio/media/` directory contains screenshots of key pages (home, projects, blog, behind-the-scenes)
- [ ] `scripts/build-media-index.ts` exists to regenerate the manifest
- [ ] Each asset entry includes: filename, description, page captured, date

---

## Definition of Done

- [ ] Manifest + media directory created
- [ ] Build script exists and runs without errors
