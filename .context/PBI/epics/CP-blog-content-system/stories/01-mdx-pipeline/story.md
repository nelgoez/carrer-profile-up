# MDX Pipeline

**Epic:** Blog Content System
**Priority:** High
**Status:** Backlog

---

## User Story

**As a** site owner
**I want to** author blog posts as `.mdx` files with frontmatter
**So that** content is maintainable, formatable, and doesn't require editing JS objects

---

## Acceptance Criteria

- [ ] `nelthor.com.ar/content/blog/` contains `.mdx` files with frontmatter (title, date, description, tags, slug)
- [ ] Blog listing page reads from MDX files instead of hardcoded JS
- [ ] Blog detail page renders MDX content with proper formatting (headings, code blocks, images)
- [ ] `generateStaticParams` works for all `.mdx` files
- [ ] Build succeeds with static export

---

## Technical Notes

- Install `@next/mdx` or `next-mdx-remote` for MDX processing
- Frontmatter via `gray-matter` or built-in MDX parsing
- Move existing `how-i-built-this-portfolio` content from JS to `.mdx`
- Keep existing URL slugs unchanged

---

## Definition of Done

- [ ] MDX pipeline works end-to-end
- [ ] All current blog posts render from MDX
- [ ] Build + static export succeeds
