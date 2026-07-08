import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

// ── Constants ────────────────────────────────────────────────────────────────────────

const GITHUB_USER = 'nelgoez';
const PORTFOLIO_DIR = resolve(import.meta.dirname, '..');
const PROFILE_DIR = process.env.PROFILE_DIR ? resolve(process.env.PROFILE_DIR) : null;
const SOURCE_DIRS = process.env.SOURCE_DIRS ? resolve(process.env.SOURCE_DIRS) : null;

const PROJECTS_MANIFEST = resolve(PORTFOLIO_DIR, 'nelthor.qzz.io', 'content', 'projects', '_projects.json');
const MEDIA_TARGET = resolve(PORTFOLIO_DIR, '.context', 'portfolio', 'media');
const BLOG_DIR = resolve(PORTFOLIO_DIR, 'nelthor.qzz.io', 'content', 'blog');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

// ── Types ────────────────────────────────────────────────────────────────────────────

interface PortfolioJson {
  featured?: boolean
  thumbnail?: string
  displayName?: string
  shortDescription?: string
  category?: string
  tags?: string[]
  order?: number
  screenshots?: { path: string, alt: string }[]
  links?: Record<string, string>
}

interface SourceRepo {
  name: string
  owner: string
  dir: string
  metadata: PortfolioJson
  readmePreview: string
  language: string | null
  topics: string[]
  description: string | null
  defaultBranch: string | null
  updatedAt: string
}

interface ProjectEntry {
  name: string
  displayName: string
  description: string
  url: string
  language: string | null
  tags: string[]
  thumbnail: string | null
  featured: boolean
  order: number
  updatedAt: string
  screenshots: { path: string, alt: string }[]
  links: Record<string, string>
}

interface Repo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  private: boolean
  updated_at: string
  default_branch: string | null
  license: { spdx_id: string } | null
}

interface BlogPost {
  title: string
  date: string
  description: string
  slug: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────

function readJSON<T>(filePath: string): T | null {
  try { return JSON.parse(readFileSync(filePath, 'utf-8')) as T; }
  catch { return null; }
}

function writeJSON(filePath: string, data: unknown) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }); }
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function parseFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n(?:---|\.\.\.)\n/);
  if (!match) { return null; }
  try { return parseYaml(match[1]) as Record<string, unknown>; }
  catch { return null; }
}

function walkFiles(dir: string, exts?: Set<string>): string[] {
  const files: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) { files.push(...walkFiles(full, exts)); }
      else if (!exts || exts.has(entry.toLowerCase().replace(/.*\./, '.'))) {
        files.push(full);
      }
    }
  }
  catch { }
  return files;
}

function readFirstLines(filePath: string, count = 4): string {
  try {
    return readFileSync(filePath, 'utf-8').split('\n').slice(0, count).filter(l => l.trim() && !l.startsWith('<') && !l.startsWith('```') && !l.startsWith('#')).join(' ').slice(0, 200);
  }
  catch { return ''; }
}

async function fetchJSON<T>(url: string, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'User-Agent': 'career-profile-up' };
  if (token) { headers.Authorization = `Bearer ${token}`; }
  const res = await fetch(url, { headers });
  if (!res.ok) { throw new Error(`GitHub API ${res.status}: ${url}`); }
  return res.json() as Promise<T>;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function repoNameFromDir(dir: string): string {
  const parts = dir.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1];
}

// ── Phase A: Ingest Source Repos ────────────────────────────────────────────────────

function ingestSourceRepos(): SourceRepo[] {
  if (!SOURCE_DIRS || !existsSync(SOURCE_DIRS)) {
    console.log('[A] No SOURCE_DIRS set or directory missing — skipping repo ingestion');
    return [];
  }

  const repoDirs = readdirSync(SOURCE_DIRS).map(d => join(SOURCE_DIRS, d)).filter(d => statSync(d).isDirectory() && existsSync(join(d, '.git')));

  console.log(`[A] Found ${repoDirs.length} source repos: ${repoDirs.map(d => repoNameFromDir(d)).join(', ')}`);

  const repos: SourceRepo[] = [];

  for (const dir of repoDirs) {
    const name = repoNameFromDir(dir);
    const metadataPath = join(dir, 'portfolio.json');
    const metadata = readJSON<PortfolioJson>(metadataPath) ?? {};
    const readmePath = join(dir, 'README.md');
    const readmePreview = existsSync(readmePath) ? readFirstLines(readmePath) : '';
    const pkgPath = join(dir, 'package.json');
    const pkg = readJSON<{ description?: string }>(pkgPath);

    repos.push({
      name,
      owner: GITHUB_USER,
      dir,
      metadata,
      readmePreview: metadata.shortDescription ?? readmePreview,
      language: null,
      topics: metadata.tags ?? [],
      description: metadata.shortDescription ?? pkg?.description ?? null,
      defaultBranch: null,
      updatedAt: new Date().toISOString().split('T')[0],
    });
  }

  return repos;
}

// ── Phase B: Generate Portfolio Content ─────────────────────────────────────────────

function generatePortfolioContent(repos: SourceRepo[]) {
  console.log('\n[B] Generating portfolio content...');

  // Build project manifest
  const entries: ProjectEntry[] = repos.map(r => ({
    name: r.name,
    displayName: r.metadata.displayName ?? r.name,
    description: (r.description ?? r.readmePreview) || '',
    url: `https://github.com/${r.owner}/${r.name}`,
    language: r.language,
    tags: r.topics,
    thumbnail: null,
    featured: r.metadata.featured ?? false,
    order: r.metadata.order ?? 99,
    updatedAt: r.updatedAt,
    screenshots: r.metadata.screenshots ?? [],
    links: r.metadata.links ?? {},
  }));

  entries.sort((a, b) => a.order - b.order);
  writeJSON(PROJECTS_MANIFEST, { updated: new Date().toISOString().split('T')[0], repos: entries });
  console.log(`[B] Wrote ${entries.length} projects to _projects.json`);

  // Copy images from source repos to portfolio media dir
  let copied = 0;
  for (const repo of repos) {
    const targetDir = join(MEDIA_TARGET, repo.name);
    if (!existsSync(targetDir)) { mkdirSync(targetDir, { recursive: true }); }

    const images = walkFiles(repo.dir, IMAGE_EXTS);
    for (const img of images) {
      const rel = relative(repo.dir, img);
      const dst = join(targetDir, rel);
      const dstDir = dirname(dst);
      if (!existsSync(dstDir)) { mkdirSync(dstDir, { recursive: true }); }
      copyFileSync(img, dst);
      copied++;
    }

    // Copy explicit thumbnail
    if (repo.metadata.thumbnail) {
      const thumbSrc = join(repo.dir, repo.metadata.thumbnail);
      if (existsSync(thumbSrc)) {
        const thumbDst = join(targetDir, `thumbnail${repo.metadata.thumbnail.replace(/.*\./, '.')}`);
        copyFileSync(thumbSrc, thumbDst);
        // Update entry thumbnail path
        const entry = entries.find(e => e.name === repo.name);
        if (entry) { entry.thumbnail = `/media/${repo.name}/thumbnail${repo.metadata.thumbnail.replace(/.*\./, '.')}`; }
      }
    }
  }

  // Update manifest with thumbnail paths
  writeJSON(PROJECTS_MANIFEST, {
    updated: new Date().toISOString().split('T')[0],
    repos: entries,
  });

  // Regenerate media manifest (reuse existing script logic inline)
  regenerateMediaManifest();

  console.log(`[B] Copied ${copied} images to media dir`);
}

function regenerateMediaManifest() {
  if (!existsSync(MEDIA_TARGET)) {
    mkdirSync(MEDIA_TARGET, { recursive: true });
    return;
  }

  const files = walkFiles(MEDIA_TARGET)
    .filter(f => !f.endsWith('manifest.json'));

  const MEDIA_TYPES: Record<string, string[]> = {
    screenshot: ['.png', '.jpg', '.jpeg', '.webp'],
    diagram: ['.svg', '.png'],
    recording: ['.gif', '.mp4', '.webm'],
    document: ['.pdf', '.html'],
  };

  const assets = files.map((file) => {
    const rel = relative(MEDIA_TARGET, file);
    const ext = file.toLowerCase().replace(/.*\./, '.');
    let type = 'unknown';
    for (const [cat, exts] of Object.entries(MEDIA_TYPES)) {
      if (exts.includes(ext)) { type = cat; break; }
    }
    return {
      id: rel.replace(/\.[^.]+$/, '').replace(/[/\\]/g, '-'),
      type,
      file: rel,
      alt_text: '',
      used_in: [],
    };
  });

  writeJSON(join(MEDIA_TARGET, 'manifest.json'), {
    version: 2,
    updated: new Date().toISOString().split('T')[0],
    assets,
  });
}

// ── Phase C: Generate Profile README ────────────────────────────────────────────────

function getBlogPosts(): BlogPost[] {
  if (!existsSync(BLOG_DIR)) { return []; }
  return readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).map((f) => {
    const source = readFileSync(join(BLOG_DIR, f), 'utf8');
    const frontmatter = parseFrontmatter(source);
    if (!frontmatter) { return null; }
    return {
      title: String(frontmatter.title ?? ''),
      date: String(frontmatter.date ?? ''),
      description: String(frontmatter.description ?? ''),
      slug: f.replace(/\.mdx$/, ''),
    };
  }).filter((p): p is BlogPost => p !== null).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateProfileReadme(_repos: SourceRepo[]) {
  console.log('\n[C] Generating profile README...');

  const blogPosts = getBlogPosts();
  const projectsManifest = readJSON<{ repos: ProjectEntry[] }>(PROJECTS_MANIFEST);
  const syncedEntries = projectsManifest?.repos ?? [];

  // ── Skill definitions ──
  const skills = {
    testing: [
      { name: 'Playwright', color: '45ba4b' },
      { name: 'Cucumber', color: '23D96C' },
      { name: 'Selenium', color: '43B02A' },
      { name: 'Robot Framework', color: '000000' },
      { name: 'Jest', color: 'C21325' },
      { name: 'WebdriverIO', color: 'EA5906' },
      { name: 'Allure', color: 'FF6600' },
      { name: 'Postman', color: 'FF6C37' },
    ],
    backend: [
      { name: 'TypeScript', color: '3178C6' },
      { name: 'Python', color: '3776AB' },
      { name: 'Node.js', color: '339933' },
      { name: 'Next.js', color: '000000' },
      { name: 'Express', color: '000000' },
      { name: 'PostgreSQL', color: '336791' },
      { name: 'Supabase', color: '3ECF8E' },
    ],
    tools: [
      { name: 'GitHub Actions', color: '2088FF' },
      { name: 'Jenkins', color: 'D24939' },
      { name: 'Docker', color: '2496ED' },
      { name: 'Vercel', color: '000000' },
      { name: 'Jira', color: '0052CC' },
      { name: 'Confluence', color: '172B4D' },
    ],
  };

  const skillShields = (items: { name: string, color: string }[]) =>
    items.map(s => `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${s.color}?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4=)`).join('\n');

  // ── Build project cards ──
  const featuredRepos = syncedEntries.filter(r => r.featured).slice(0, 6);
  const projectCards = featuredRepos.map((r) => {
    const desc = r.description ? `*${r.description}*` : '';
    const tags = r.tags.slice(0, 4).map(t => `\`${t}\``).join(' ');
    const thumb = r.thumbnail
      ? `<img src="https://raw.githubusercontent.com/${GITHUB_USER}/career-profile-up/main/.context/portfolio/media/${r.thumbnail.replace('/media/', '')}" width="320" alt="${r.displayName} screenshot"/>`
      : '';
    return [
      `### [${r.displayName}](${r.url})`,
      desc,
      tags,
      thumb,
      `📅 Updated ${r.updatedAt}`,
      '',
    ].filter(Boolean).join('\n');
  }).join('\n\n');

  // ── Build blog section ──
  const blogSection = blogPosts.length > 0
    ? [
        '## 📝 Latest Blog Posts',
        '',
        ...blogPosts.slice(0, 3).map(p => [
          `### [${p.title}](https://nelthor.qzz.io/blog/${p.slug})`,
          `${p.description}`,
          `📅 ${formatDate(p.date)}`,
          '',
        ].join('\n')),
        '',
        '➡️ [Read more on nelthor.qzz.io](https://nelthor.qzz.io/blog)',
        '',
      ].join('\n')
    : '';

  // ── Metrics ──
  const metricsLine = syncedEntries.length > 0
    ? `| Metric | Value |\n|--------|-------|\n| **Public Repos** | ${syncedEntries.length} |\n| **CI/CD Workflows** | 6+ active |\n| **Test Coverage** | 78% average |\n| **Years Experience** | 5+ |`
    : '';

  // ── QA approach ──
  const qaSection = [
    '## 🧪 QA Philosophy',
    '',
    '> Quality Engineering is a design discipline, not a testing phase. Shift-left thinking — finding issues before they become bugs, building testability into architecture, and using automation to amplify human judgment, not replace it.',
    '',
    '📊 [View full QA scorecard →](https://nelthor.qzz.io/qa)',
    '',
  ].join('\n');

  const portfolioLink = [
    '## 🌐 Full Portfolio',
    '',
    '> Everything I do, documented with evidence: **[nelthor.qzz.io](https://nelthor.qzz.io)** — projects, blog, QA scorecards, architecture, and behind-the-scenes of how this profile stays updated.',
    '',
  ].join('\n');

  const readme = [
    '<div align="center">',
    '',
    '<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Nahuel%20Leonardo%20Elias&fontSize=50&fontAlignY=35&desc=SDET%20%E2%86%92%20Agentic%20QA%20Engineer%20%7C%20Backend%20Dev%20%7C%20TypeScript%20%7C%20Python&descAlignY=55"/>',
    '',
    '</div>',
    '',
    '<p align="center">',
    '  <a href="https://linkedin.com/in/nelgoez"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>',
    '  <a href="https://github.com/nelgoez"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/></a>',
    '  <a href="mailto:gomeznahuel@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/></a>',
    '  <a href="https://wa.link/mtf64p"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>',
    '  <a href="https://nelthor.qzz.io"><img src="https://img.shields.io/badge/Portfolio-8B5CF6?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a>',
    '</p>',
    '',
    '---',
    '',
    portfolioLink,
    '',
    '---',
    '',
    '## 🎯 What I Do',
    '',
    'QA Automation Engineer with 5+ years building robust test automation frameworks. I specialize in **agentic QA engineering** — building intelligent test automation systems that work alongside AI agents.',
    '',
    '**Impact:** Reduced test execution overhead by leveraging agentic patterns while maintaining deterministic quality gates.',
    '',
    '---',
    '',
    blogSection ? `${blogSection}\n\n---\n` : '',
    '',
    '## 💼 Tech Stack',
    '',
    '<details open>',
    '<summary><b>Testing & QA Automation</b></summary>',
    '',
    skillShields(skills.testing),
    '',
    '</details>',
    '',
    '<details>',
    '<summary><b>Languages & Backend</b></summary>',
    '',
    skillShields(skills.backend),
    '',
    '</details>',
    '',
    '<details>',
    '<summary><b>Tools & Platforms</b></summary>',
    '',
    skillShields(skills.tools),
    '',
    '</details>',
    '',
    '---',
    '',
    metricsLine ? `## 📊 By the Numbers\n\n${metricsLine}\n\n---\n` : '',
    '',
    qaSection,
    '',
    '---',
    '',
    '## 🔥 Featured Projects',
    '',
    projectCards || '*(Syncing from source repos...)*',
    '',
    '---',
    '',
    '## 📈 GitHub Stats',
    '',
    '<div align="center">',
    '',
    `<img src="https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&count_private=true&theme=radical&hide_border=true" height="165"/>`,
    `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=radical&hide_border=true" height="165"/>`,
    '',
    '<br/>',
    '',
    `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=radical&hide_border=true"/>`,
    '',
    '</div>',
    '',
    '---',
    '',
    '## 🏆 GitHub Trophies',
    '',
    '<div align="center">',
    `<img src="https://github-profile-trophy.vercel.app/?username=${GITHUB_USER}&theme=radical&no-frame=true&no-bg=true&column=7"/>`,
    '</div>',
    '',
    '---',
    '',
    '<div align="center">',
    '',
    '<i>⚡ Profile auto-generated from live repo data — blog posts, project metadata, and screenshots synced from bunkai-qa-engineering, agentic-diplo-track-sys, and more.</i>',
    '',
    '<br/><br/>',
    '',
    `<img src="https://komarev.com/ghpvc/?username=${GITHUB_USER}&label=Profile+Views&color=blueviolet&style=flat-square"/>`,
    '',
    '</div>',
    '',
  ].filter(Boolean).join('\n');

  return readme;
}

// ── Main ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== sync-all.ts — Cross-Repo Content Sync ===\n');
  const start = Date.now();

  // Phase A
  const repos = ingestSourceRepos();
  const ghToken = process.env.GH_PAT;

  // Enrich with GitHub API data
  if (ghToken && repos.length > 0) {
    try {
      const ghRepos = await fetchJSON<Repo[]>(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=public`,
        ghToken,
      );
      for (const repo of repos) {
        const match = ghRepos.find(r => r.name === repo.name);
        if (match) {
          repo.language = match.language;
          repo.topics = repo.metadata.tags ?? match.topics ?? [];
          repo.description = repo.metadata.shortDescription ?? match.description ?? repo.description;
          repo.defaultBranch = match.default_branch;
          repo.updatedAt = match.updated_at;
        }
      }
    }
    catch (err) {
      console.log(`[A] GitHub API enrichment skipped: ${err instanceof Error ? err.message : 'unknown error'}`);
    }
  }

  // Phase B
  if (repos.length > 0) {
    generatePortfolioContent(repos);
  }
  else {
    console.log('\n[B] No repos to sync — skipping portfolio content generation');
  }

  // Phase C
  const readme = generateProfileReadme(repos);

  if (PROFILE_DIR) {
    const readmePath = resolve(PROFILE_DIR, 'README.md');
    writeFileSync(readmePath, readme, 'utf-8');
    console.log(`[C] Profile README written to ${readmePath}`);
  }
  else {
    const localPath = resolve(PORTFOLIO_DIR, 'dist', 'profile', 'README.md');
    const dir = dirname(localPath);
    if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }); }
    writeFileSync(localPath, readme, 'utf-8');
    console.log(`[C] Profile README written to ${localPath} (PROFILE_DIR not set)`);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n=== Done in ${elapsed}s ===`);
}

main().catch((err) => {
  console.error('Fatal:', err instanceof Error ? err.message : err);
  process.exit(1);
});
