import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const MEDIA_DIR = resolve(ROOT, '.context', 'portfolio', 'media');

const MEDIA_TYPES: Record<string, string[]> = {
  screenshot: ['.png', '.jpg', '.jpeg'],
  diagram: ['.svg', '.png'],
  recording: ['.gif', '.mp4', '.webm'],
  document: ['.pdf', '.html'],
};

interface Asset {
  id: string;
  type: string;
  file: string;
  alt_text: string;
  used_in: string[];
}

function generateManifest(): Asset[] {
  if (!existsSync(MEDIA_DIR)) {
    mkdirSync(MEDIA_DIR, { recursive: true });
    return [];
  }

  const files = readdirSync(MEDIA_DIR);
  const assets: Asset[] = [];

  for (const file of files) {
    const ext = file.toLowerCase().replace(/.*\./, '.');
    let type = 'unknown';
    for (const [category, exts] of Object.entries(MEDIA_TYPES)) {
      if (exts.includes(ext)) { type = category; break; }
    }
    assets.push({
      id: file.replace(/\.[^.]+$/, ''),
      type,
      file,
      alt_text: '',
      used_in: [],
    });
  }

  return assets;
}

const manifest = { version: 1, updated: new Date().toISOString().split('T')[0], assets: generateManifest() };
writeFileSync(resolve(MEDIA_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Media manifest: ${manifest.assets.length} assets`);
