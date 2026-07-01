import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const BLOG_DIR = resolve(ROOT, 'content', 'blog');
const STALE_DAYS = 90;

interface BlogPost {
  file: string
  title: string
  date: Date | null
}

function parseFrontmatter(content: string): { title: string, date: string | null } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) { return { title: '', date: null }; }

  const frontmatter = match[1];
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?$/m);
  const dateMatch = frontmatter.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?$/m);

  return {
    title: titleMatch?.[1] ?? '',
    date: dateMatch?.[1] ?? null,
  };
}

function run(): { stale: BlogPost[], total: number, errors: string[] } {
  const errors: string[] = [];
  const stale: BlogPost[] = [];
  let total = 0;

  if (!existsSync(BLOG_DIR)) {
    return { stale: [], total: 0, errors: [] };
  }

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const now = new Date();

  for (const file of files) {
    total++;
    const content = readFileSync(resolve(BLOG_DIR, file), 'utf-8');
    const { title, date } = parseFrontmatter(content);

    if (date) {
      const postDate = new Date(date);
      const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays > STALE_DAYS) {
        stale.push({ file, title, date: postDate });
      }
    }
    else {
      errors.push(`${file}: no date in frontmatter`);
    }
  }

  return { stale, total, errors };
}

const result = run();
for (const post of result.stale) {
  console.error(`  ⚠ Stale: "${post.title || post.file}" (${post.date?.toISOString().split('T')[0]})`);
}
for (const err of result.errors) {
  console.error(`  ⚠ ${err}`);
}
console.log(`\n  Content: ${result.total} posts, ${result.stale.length} stale`);
