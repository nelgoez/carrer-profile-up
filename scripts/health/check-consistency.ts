import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

const ROOT = resolve(import.meta.dirname, '..', '..');
const PROJECT_YAML = resolve(ROOT, '.agents', 'project.yaml');

interface ProjectConfig {
  project?: {
    project_name?: string
    position?: string
  }
}

function run(): { divergences: string[] } {
  const divergences: string[] = [];

  if (!existsSync(PROJECT_YAML)) {
    divergences.push('.agents/project.yaml not found');
    return { divergences };
  }

  const raw = readFileSync(PROJECT_YAML, 'utf-8');
  let config: ProjectConfig;
  try {
    config = parse(raw) as ProjectConfig;
  }
  catch {
    divergences.push('.agents/project.yaml is not valid YAML');
    return { divergences };
  }

  const localPosition = config.project?.position ?? '(not set)';

  // Note: GitHub bio and LinkedIn headline would require API calls.
  // For v1, we check local config consistency and print expected values.
  divergences.push(`Expected GitHub bio / LinkedIn headline: "${localPosition}"`);
  divergences.push('  → Run manually: compare against https://github.com/nelgoez');
  divergences.push('  → Run manually: compare against LinkedIn profile');

  return { divergences };
}

const result = run();
for (const d of result.divergences) {
  console.error(`  ℹ ${d}`);
}
console.log(`\n  Profile: ${result.divergences.length} items to verify`);
