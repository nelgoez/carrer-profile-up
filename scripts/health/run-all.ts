import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const HEALTH_DIR = resolve(ROOT, 'scripts', 'health');

interface CheckResult {
  name: string
  status: 'ok' | 'warn' | 'fail'
  message: string
}

function runCheck(script: string): CheckResult {
  try {
    const output = execSync(`bun ${resolve(HEALTH_DIR, script)}`, {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const lines = output.trim().split('\n');
    const lastLine = lines[lines.length - 1] ?? '';
    if (
      lastLine.includes('✓')
      || lastLine.includes('valid')
      || lastLine.includes('Clean')
      || lastLine.includes('0 stale')
    ) {
      return { name: script.replace('.ts', ''), status: 'ok', message: output.trim() };
    }
    return { name: script.replace('.ts', ''), status: 'warn', message: output.trim() };
  }
  catch (e: any) {
    return {
      name: script.replace('.ts', ''),
      status: 'fail',
      message: e.stdout || e.message || 'unknown error',
    };
  }
}

const checks = ['check-assets.ts', 'check-readme.ts', 'check-staleness.ts', 'check-consistency.ts'];
const results = checks.map(runCheck);

console.log('┌──────────────────────────────────────────────┐');
console.log('│  Career Command Center — Health Report        │');
console.log('├──────────────────────────────────────────────┤');

let hasFail = false;
for (const r of results) {
  const icon = r.status === 'ok' ? '✓' : r.status === 'warn' ? '⚠️' : '✖';
  const label = r.status === 'ok' ? '' : r.status === 'warn' ? ' (warn)' : ' (FAIL)';
  console.log(`${`│  ${r.name.replace('check-', '')}: ${icon}${label}`.padEnd(48)}│`);
  if (r.status === 'fail') { hasFail = true; }
}

console.log('└──────────────────────────────────────────────┘');

if (hasFail) {
  console.error('\nBlocking issues found. Run individual checks for details:');
  for (const r of results) {
    if (r.status === 'fail') {
      console.error(`\n$ bun run health:${r.name.replace('check-', '')}`);
      console.error(r.message);
    }
  }
  process.exit(1);
}
