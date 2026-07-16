import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const MEDIA_DIR = resolve(ROOT, '.context', 'portfolio', 'media');
const PUBLIC_MEDIA = resolve(ROOT, 'nelthor.qzz.io', 'public', 'media');

const MEDIA_TYPES: Record<string, string[]> = {
  screenshot: ['.png', '.jpg', '.jpeg', '.webp'],
  diagram: ['.svg', '.png'],
  recording: ['.gif', '.mp4', '.webm'],
  document: ['.pdf', '.html'],
};

interface Asset {
  id: string
  type: string
  file: string
  alt_text: string
  used_in: string[]
}

function walk(dir: string, files: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === 'manifest.json') { continue; }
    if (statSync(full).isDirectory()) { walk(full, files); }
    else { files.push(full); }
  }
  return files;
}

function generateManifest(): Asset[] {
  if (!existsSync(MEDIA_DIR)) {
    mkdirSync(MEDIA_DIR, { recursive: true });
    return [];
  }

  const files = walk(MEDIA_DIR);
  const assets: Asset[] = [];

  for (const file of files) {
    const rel = resolve(file).replace(`${resolve(MEDIA_DIR)}\\`, '').replace(`${resolve(MEDIA_DIR)}/`, '').replace(/\\/g, '/');
    const ext = file.toLowerCase().replace(/.*\./, '.');
    let type = 'unknown';
    for (const [category, exts] of Object.entries(MEDIA_TYPES)) {
      if (exts.includes(ext)) { type = category; break; }
    }
    assets.push({
      id: rel.replace(/\.[^.]+$/, '').replace(/[/\\]/g, '-'),
      type,
      file: rel,
      alt_text: '',
      used_in: [],
    });
  }

  return assets;
}

const manifest = { version: 2, updated: new Date().toISOString().split('T')[0], assets: generateManifest() };
writeFileSync(resolve(MEDIA_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

if (!existsSync(PUBLIC_MEDIA)) { mkdirSync(PUBLIC_MEDIA, { recursive: true }); }
let copied = 0;
for (const asset of manifest.assets) {
  const src = resolve(MEDIA_DIR, asset.file);
  if (!statSync(src).isFile()) { continue; }
  const dst = resolve(PUBLIC_MEDIA, asset.file);
  mkdirSync(dirname(dst), { recursive: true });
  copyFileSync(src, dst);
  copied++;
}

console.log(`Media manifest: ${manifest.assets.length} assets, ${copied} copied to public/media/`);
