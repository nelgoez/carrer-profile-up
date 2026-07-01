import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..');
const MANIFEST_PATH = resolve(ROOT, '.context', 'portfolio', 'media', 'manifest.json');

interface ManifestAsset {
  id: string
  type: string
  file: string
  alt_text?: string
  used_in?: string[]
}

interface Manifest {
  assets: ManifestAsset[]
}

function run(): { ok: number, fail: number, errors: string[] } {
  let ok = 0;
  let fail = 0;
  const errors: string[] = [];

  if (!existsSync(MANIFEST_PATH)) {
    return { ok: 0, fail: 0, errors: [] };
  }

  const raw = readFileSync(MANIFEST_PATH, 'utf-8');
  let manifest: Manifest;
  try {
    manifest = JSON.parse(raw) as Manifest;
  }
  catch {
    return { ok: 0, fail: 1, errors: ['manifest.json is not valid JSON'] };
  }

  for (const asset of manifest.assets) {
    const assetPath = resolve(ROOT, '.context', 'portfolio', 'media', asset.file);
    if (!existsSync(assetPath)) {
      fail++;
      errors.push(`MISSING: ${asset.id} → ${asset.file}`);
      continue;
    }
    if (!asset.alt_text || asset.alt_text.trim().length === 0) {
      errors.push(`NO_ALT: ${asset.id} — alt_text is empty`);
    }
    ok++;
  }

  return { ok, fail, errors };
}

const result = run();
for (const err of result.errors) {
  console.error(`  ✖ ${err}`);
}
console.log(`\n  Assets: ${result.ok}/${result.ok + result.fail} valid${result.fail > 0 ? ' ✖' : ' ✓'}`);
if (result.fail > 0) {
  process.exit(1);
}
