import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const README_PATH = resolve(ROOT, 'README.md');

const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /TBD/i,
  /\[your name\]/i,
  /\[your/i,
];

function run(): { ok: boolean, warnings: string[] } {
  const warnings: string[] = [];

  if (!existsSync(README_PATH)) {
    return { ok: false, warnings: ['README.md does not exist'] };
  }

  const content = readFileSync(README_PATH, 'utf-8');
  const lines = content.split('\n');

  for (const pattern of PLACEHOLDER_PATTERNS) {
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        warnings.push(`Line ${i + 1}: matches "${pattern.source}"`);
      }
    }
  }

  const shieldBadges = content.match(/https?:\/\/img\.shields\.io\/badge\/[^\s")]+/g);
  if (shieldBadges) {
    for (const badge of shieldBadges) {
      if (badge.includes('undefined') || badge.includes('null')) {
        warnings.push(`Badge may be broken: ${badge}`);
      }
    }
  }

  return { ok: warnings.length === 0, warnings };
}

const result = run();
for (const w of result.warnings) {
  console.error(`  ⚠ ${w}`);
}
console.log(`\n  README: ${result.ok ? 'Clean ✓' : `${result.warnings.length} issues ⚠️`}`);
if (!result.ok) {
  process.exit(1);
}
