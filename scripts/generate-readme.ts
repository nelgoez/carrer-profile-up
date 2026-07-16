import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PORTFOLIO_DIR = resolve(ROOT, 'nelthor.qzz.io');
const BLOG_DIR = resolve(PORTFOLIO_DIR, 'content', 'blog');
const OUTPUT = resolve(ROOT, 'dist', 'profile', 'README.md');

const GITHUB_USER = 'nelgoez';

interface Repo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  stargazers_count: number
  updated_at: string
  private: boolean
}

interface GitHubUser {
  login: string
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

interface BlogPost {
  title: string
  date: string
  description: string
  slug: string
}

function parseFrontmatter(filePath: string): { title: string, date: string, description: string } | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) { return null; }
    const frontmatter: Record<string, string> = {};
    for (const line of match[1].split('\n')) {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) { continue; }
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if ((value.startsWith('\'') && value.endsWith('\'')) || (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
    return {
      title: frontmatter.title ?? 'Untitled',
      date: frontmatter.date ?? '',
      description: frontmatter.description ?? '',
    };
  }
  catch {
    return null;
  }
}

function getBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  if (!existsSync(BLOG_DIR)) { return posts; }
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const fm = parseFrontmatter(resolve(BLOG_DIR, file));
    if (fm) {
      posts.push({
        ...fm,
        slug: file.replace(/\.mdx$/, ''),
      });
    }
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'career-profile-up' },
  });
  if (!res.ok) { throw new Error(`GitHub API ${res.status}: ${url}`); }
  return res.json() as Promise<T>;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function repoBadge(repo: Repo): string {
  const slug = repo.language?.toLowerCase() ?? 'unknown';
  const colorMap: Record<string, string> = {
    typescript: '3178c6',
    javascript: 'f7df1e',
    python: '3776ab',
    html: 'e34f26',
    css: '1572b6',
    java: 'b07219',
    shell: '89e051',
  };
  const color = colorMap[slug] ?? '666';
  return `![${repo.language ?? ''}](https://img.shields.io/badge/${slug}-${color}?style=flat-square)`;
}

function starsBadge(count: number): string {
  if (count === 0) { return ''; }
  return `![Stars](https://img.shields.io/badge/stars-${count}-yellow?style=flat-square)`;
}

function generateReadme(user: GitHubUser, repos: Repo[], posts: BlogPost[]): string {
  const topRepos = repos
    .filter(r => !r.private && !/^test/i.test(r.name) && r.name !== 'nelgoez')
    .slice(0, 6);

  const projectCards = topRepos.map((r) => {
    const desc = r.description ? `*${r.description}*` : '';
    const topics = r.topics.slice(0, 4).map(t => `\`${t}\``).join(' ');
    return [
      `### [${r.name}](${r.html_url})`,
      desc,
      `${repoBadge(r)} ${starsBadge(r.stargazers_count)}`,
      topics,
      `📅 Updated ${formatDate(r.updated_at)}`,
      '',
    ].filter(Boolean).join('\n');
  }).join('\n\n');

  const langCounts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) {
      langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
  }
  const topLangs = [...langCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)
    .join(', ');

  const blogCards = posts.slice(0, 4).map((p) => {
    const date = formatDate(p.date);
    return [
      `### [${p.title}](https://nelthor.com.ar/blog/${p.slug})`,
      p.description,
      `📅 ${date}`,
      '',
    ].join('\n');
  }).join('\n\n');

  return [
    '<div align="center">',
    '',
    '<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Nahuel%20Leonardo%20Elias&fontSize=50&fontAlignY=35&desc=SDET%20→%20Agentic%20QA%20Engineer%20|%20Backend%20Dev%20|%20TypeScript%20%7C%20Python%20|%20Bun&descAlignY=55"/>',
    '',
    '</div>',
    '',
    '<p align="center">',
    '  <a href="https://linkedin.com/in/nelgoez"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>',
    '  <a href="https://github.com/nelgoez"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/></a>',
    '  <a href="mailto:gomeznahuel@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"/></a>',
    '  <a href="https://wa.link/mtf64p"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>',
    '  <a href="https://nelthor.com.ar"><img src="https://img.shields.io/badge/Portfolio-8B5CF6?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a>',
    '</p>',
    '',
    '---',
    '',
    '## 🌐 Full Portfolio',
    '',
    '> Everything I do, documented with evidence: **[nelthor.com.ar](https://nelthor.com.ar)** — projects, blog, QA scorecards, architecture, and behind-the-scenes of how this profile stays updated.',
    '',
    '',
    '---',
    '',
    '## 🎯 What I Do',
    '',
    `${user.bio ?? 'QA Automation Engineer with 5+ years building robust test automation frameworks. I specialize in agentic QA engineering — building intelligent test automation systems that work alongside AI agents.'}`,
    '',
    '**Impact:** Reduced test execution overhead by leveraging agentic patterns while maintaining deterministic quality gates.',
    '',
    '---',
    '',
    '## 📝 Latest Blog Posts',
    '',
    blogCards,
    '',
    '',
    '➡️ [Read more on nelthor.com.ar](https://nelthor.com.ar/blog)',
    '',
    '',
    '---',
    '',
    '',
    '## 💼 Tech Stack',
    '',
    '<details open>',
    '<summary><b>Testing & QA Automation</b></summary>',
    '',
    '![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)',
    '![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)',
    '![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white)',
    '![Robot Framework](https://img.shields.io/badge/Robot%20Framework-000000?style=for-the-badge&logo=robotframework&logoColor=white)',
    '![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)',
    '![WebdriverIO](https://img.shields.io/badge/WebdriverIO-EA5906?style=for-the-badge&logo=webdriverio&logoColor=white)',
    '![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)',
    '![Allure](https://img.shields.io/badge/Allure-FF6600?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBDOC45NTggMCAwIDguOTU4IDAgMjBzOC45NTggMjAgMjAgMjAgMjAtOC45NTggMjAtMjBTMzEuMDQyIDAgMjAgMHoiIGZpbGw9IiNmZmY2MDAiLz48L3N2Zz4=)',
    '![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)',
    '',
    '</details>',
    '',
    '<details>',
    '<summary><b>Languages & Backend</b></summary>',
    '',
    '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)',
    '![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)',
    '![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)',
    '![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)',
    '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)',
    '![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)',
    '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)',
    '![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)',
    '',
    '</details>',
    '',
    '<details>',
    '<summary><b>Tools & Platforms</b></summary>',
    '',
    '![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)',
    '![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)',
    '![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)',
    '![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)',
    '![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)',
    '![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)',
    '![Confluence](https://img.shields.io/badge/Confluence-172B4D?style=for-the-badge&logo=confluence&logoColor=white)',
    '',
    '</details>',
    '',
    '<details>',
    '<summary><b>Agentic AI & Workflow</b></summary>',
    '',
    '![Claude](https://img.shields.io/badge/Claude-FF6600?style=for-the-badge&logo=anthropic&logoColor=white)',
    '![OpenCode](https://img.shields.io/badge/OpenCode-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBvbHlsaW5lIHBvaW50cz0iMTAgMzAgMzAgMjAgMTAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==)',
    '![Tavily](https://img.shields.io/badge/Tavily-4F46E5?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==)',
    '',
    '</details>',
    '',
    '---',
    '',
    '## 📊 By the Numbers',
    '',
    '| Metric | Value |',
    '|--------|-------|',
    '| **Public Repos** | 1 |',
    '| **CI/CD Workflows** | 6+ active |',
    '| **Test Coverage** | 78% average |',
    '| **Years Experience** | 5+ |',
    '',
    '---',
    '',
    '',
    '## 🧪 QA Philosophy',
    '',
    '> Quality Engineering is a design discipline, not a testing phase. Shift-left thinking — finding issues before they become bugs, building testability into architecture, and using automation to amplify human judgment, not replace it.',
    '',
    '📊 [View full QA scorecard →](https://nelthor.com.ar/qa)',
    '',
    '',
    '---',
    '',
    '## 🔥 Featured Projects',
    '',
    projectCards || '_No public repos to show yet_',
    '',
    '---',
    '',
    '## 📈 GitHub Stats',
    '',
    '<div align="center">',
    '',
    `<img src="https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&count_private=true&theme=radical&hide_border=true" height="165"/>`,
    `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=radical&hide_border=true&langs_count=${Math.min(topLangs.split(',').length, 8)}" height="165"/>`,
    '',
    '<br/>',
    '',
    `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=radical&hide_border=true"/>`,
    '',
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
  ].join('\n');
}

async function main() {
  console.log('Fetching GitHub profile...');
  const user = await fetchJSON<GitHubUser>(`https://api.github.com/users/${GITHUB_USER}`);

  console.log('Fetching repositories...');
  const repos = await fetchJSON<Repo[]>(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20&type=public`,
  );

  console.log('Reading blog posts...');
  const posts = getBlogPosts();

  console.log('Generating README...');
  const readme = generateReadme(user, repos, posts);

  const outDir = resolve(OUTPUT, '..');
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  writeFileSync(OUTPUT, readme, 'utf-8');
  console.log(`\nREADME written to ${OUTPUT}`);
  console.log(`Repos fetched: ${repos.length}`);
  console.log(`Blog posts loaded: ${posts.length}`);
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
