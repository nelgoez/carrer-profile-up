# Blog Content System

**Slug:** `CP-blog-content-system`
**Priority:** High
**Status:** Backlog

---

## Epic Description

The blog listing page shows 5 posts but only 1 has actual content — the rest return "Post not found". This epic delivers a proper MDX-based content pipeline so blog content is maintainable as `.mdx` files, writes the 4 missing posts, and integrates blog content into the homepage.

**Business Value:** A complete blog establishes domain authority (Agentic QA), drives traffic from Dev.to/Reddit cross-posts, and showcases the portfolio as a living product.

---

## User Stories

1. **MDX Pipeline** — Set up MDX/remark pipeline so blog content lives in `.mdx` files instead of hardcoded JS objects
2. **Write Remaining Posts** — Write/publish 4 posts: SDET-to-Agentic QA, Testing AI Agents, KATA Framework, Behind the Scenes: Two Eras
3. **Homepage Blog Teaser** — Add "Latest posts" section to homepage linking to recent articles

---

## Dependencies

- **Blocked by:** Nothing
- **Blocks:** Nothing

---

## Definition of Done

- [ ] All 5 blog posts have content and render correctly
- [ ] Blog detail pages load from MDX files, not hardcoded JS
- [ ] Homepage shows latest 2-3 posts
- [ ] Build passes, no broken links
