# Download CV Button

**Epic:** Portfolio Polish
**Priority:** Medium
**Status:** Backlog

---

## User Story

**As a** recruiter visiting the portfolio
**I want to** download a PDF CV directly from the hero section
**So that** I can quickly save the candidate's resume without scrolling or searching

---

## Acceptance Criteria

- [ ] "Download CV" button visible in the Hero section alongside "View Projects" and "Contact"
- [ ] Clicking downloads a PDF CV from `/cv.pdf` or equivalent
- [ ] Button styling matches existing CTA buttons (dark theme, accent color)
- [ ] CV PDF exists at a public path

---

## Technical Notes

- CV PDF needs to be created and placed in `public/` or served as a static asset
- Options: hand-crafted PDF, or generate from markdown with a tool

---

## Definition of Done

- [ ] CV button on homepage downloads a PDF
- [ ] PDF is the latest version of the resume
- [ ] Build passes
