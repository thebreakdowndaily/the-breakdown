/**
 * Fix remaining 9 external images:
 *  3 Unsplash 404s → update story records (images already exist in Supabase)
 *  2 Valid Wikimedia → download & upload to Supabase
 *  4 Hallucinated Wikimedia → use existing Supabase images as fallbacks
 *
 * Usage: node scripts/fix-remaining-images.mjs
 */

import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ─── Load credentials ──────────────────────────────────────────────
const envPath = join(root, 'fact-check-cms', '.env');
const envContent = readFileSync(envPath, 'utf-8');
function getEnvVar(name) {
  const m = envContent.match(new RegExp(`^${name}=['"]?(.+?)['"]?$`, 'm'));
  return m ? m[1].trim() : null;
}
const supabaseUrl = getEnvVar('SUPABASE_URL');
const serviceKey = getEnvVar('SUPABASE_SERVICE_KEY');
if (!supabaseUrl || !serviceKey) {
  console.error('ERROR: Could not load credentials from .env');
  process.exit(1);
}

const baseStorageUrl = `${supabaseUrl}/storage/v1/object/public/story-images`;
const supabaseAuth = { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey };

const tmpDir = join(tmpdir(), `newsjack-fix-${Date.now()}`);
mkdirSync(tmpDir, { recursive: true });
console.log(`Temp dir: ${tmpDir}\n`);

let updated = 0;
let failed = 0;

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', avif: 'image/avif', webp: 'image/webp' };
  return mimes[ext] || 'image/jpeg';
}

async function downloadImage(url, dest) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(dest, buffer);
  return buffer.length;
}

async function uploadToSupabase(filePath, filename) {
  const buffer = readFileSync(filePath);
  const uploadUrl = `${supabaseUrl}/storage/v1/object/story-images/${filename}`;
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { ...supabaseAuth, 'Content-Type': getMimeType(filename), 'x-upsert': 'true' },
    body: buffer,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed (${response.status}): ${text}`);
  }
  return `${baseStorageUrl}/${filename}`;
}

async function updateStoryRecord(slug, imageUrl) {
  const response = await fetch(`${supabaseUrl}/rest/v1/stories?slug=eq.${slug}`, {
    method: 'PATCH',
    headers: { ...supabaseAuth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fact_check_image: imageUrl }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Update failed (${response.status}): ${text}`);
  }
}

async function processItem(label, slug, action) {
  console.log(`[${label}] ${slug}`);
  try {
    await action();
    updated++;
    console.log(`  ✓`);
  } catch (err) {
    console.error(`  FAILED: ${err.message}`);
    failed++;
  }
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  // ── Batch 1: 3 Unsplash 404s → already in Supabase ──
  console.log('=== Batch 1: Update 3 stories (images already in Supabase) ===');
  const batch1 = [
    { slug: 'neet-2026-exam-that-broke-india',          file: 'hero-neet-2026.jpg' },
    { slug: 'us-iran-80b-pentagon-war-cost',             file: 'hero-iran-80b.jpg' },
    { slug: 'reuters-digital-news-report-2026-india-trust-crisis', file: 'hero-trust-news.jpg' },
  ];
  for (const { slug, file } of batch1) {
    await processItem('B1', slug, () => updateStoryRecord(slug, `${baseStorageUrl}/${file}`));
  }

  // ── Batch 2: 2 Valid Wikimedia → download & upload ──
  console.log('\n=== Batch 2: Download & Upload 2 valid Wikimedia ===');
  const batch2 = [
    { slug: 'modi-cabinet-reshuffle-2026',                source: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Third_Modi_Ministry_First_Meeting.jpg', file: 'third-modi-ministry-meeting.jpg' },
    { slug: 'rbi-monsoon-warning-growth-inflation-outlook-june-2026', source: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/RBI-Tower.jpg', file: 'rbi-tower-mumbai.jpg' },
  ];
  for (const { slug, source, file } of batch2) {
    await processItem('B2', slug, async () => {
      const dest = join(tmpDir, file);
      const size = await downloadImage(source, dest);
      console.log(`  Downloaded ${(size / 1024).toFixed(1)} KB`);
      const url = await uploadToSupabase(dest, file);
      console.log(`  Uploaded`);
      await updateStoryRecord(slug, url);
    });
  }

  // ── Batch 3: 4 Hallucinated Wikimedia → use existing Supabase images ──
  console.log('\n=== Batch 3: 4 hallucinated files → use Supabase fallbacks ===');
  const batch3 = [
    // AI governance → use anthropic AI image (AI-related, already in Supabase)
    { slug: 'india-ai-governance-guidelines-impact-summit-2026',    file: 'hero-anthropic-ai.jpg' },
    // India-China → use India global dossier (India-related)
    { slug: 'doval-wang-india-china-lac-normalisation-june-2026',    file: 'india-global-dossier.jpg' },
    // Drone threat → use Iran 80b (military/defense themed)
    { slug: 'drone-threat-intelligence-reset-jk-northeast-2026',    file: 'hero-iran-80b.jpg' },
    // TMC implosion → use UK politics (generic political scene)
    { slug: 'tmc-implosion-ndpi-merger-2026',                       file: 'hero-uk-politics.jpg' },
  ];
  for (const { slug, file } of batch3) {
    await processItem('B3', slug, () => updateStoryRecord(slug, `${baseStorageUrl}/${file}`));
  }

  // ─── Summary ────────────────────────────────────────────────────
  console.log(`\n=========================================`);
  console.log(`SUMMARY`);
  console.log(`  Updated:  ${updated}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`=========================================`);

  rmSync(tmpDir, { recursive: true, force: true });
  console.log('Temp dir cleaned up.');
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
