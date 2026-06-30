/**
 * Re-host external images (Unsplash, Wikimedia, Reuters) to Supabase storage.
 *
 * For each external image:
 *   1. Downloads the source image via fetch
 *   2. Uploads to Supabase storage bucket (story-images)
 *   3. Updates the story record's fact_check_image in Supabase
 *
 * Usage: node scripts/rehost-images.mjs
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
  console.error('ERROR: Could not load SUPABASE_URL or SUPABASE_SERVICE_KEY from .env');
  process.exit(1);
}

const baseStorageUrl = `${supabaseUrl}/storage/v1/object/public/story-images`;

// ─── Temp dir ──────────────────────────────────────────────────────
const tmpDir = join(tmpdir(), `newsjack-rehost-${Date.now()}`);
mkdirSync(tmpDir, { recursive: true });
console.log(`Temp dir: ${tmpDir}`);

// ─── External images to re-host ────────────────────────────────────
const externalImages = [
  // ── Unsplash (13) ──
  { slug: 'neet-2026-exam-that-broke-india',                    source: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&h=630&fit=crop',                                          file: 'hero-neet-2026.jpg' },
  { slug: 'kunal-shah-meta-story-2026',                          source: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop',                                          file: 'hero-kunal-shah.jpg' },
  { slug: 'canada-social-media-ban-under-16',                    source: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop',                                        file: 'hero-canada-social-media.jpg' },
  { slug: 'tata-electronics-ransomware-apple-tesla-trade-secrets', source: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=630&fit=crop',                                         file: 'tata-hero.jpg' },
  { slug: 'mohan-yadav-ujjain-land-scam',                        source: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop',                                          file: 'hero-mohan-yadav.jpg' },
  { slug: 'india-us-trade-deal-2026',                             source: 'https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=1200&h=630&fit=crop',                                       file: 'hero-india-us-trade.jpg' },
  { slug: 'us-iran-80b-pentagon-war-cost',                        source: 'https://images.unsplash.com/photo-1600626292260-6a2c90bfa3e3?w=1200&h=630&fit=crop',                                       file: 'hero-iran-80b.jpg' },
  { slug: 'reuters-digital-news-report-2026-india-trust-crisis', source: 'https://images.unsplash.com/photo-1504711434969-e33886168d0c?w=1200&h=630&fit=crop',                                       file: 'hero-trust-news.jpg' },
  { slug: 'lucknow-fire-tragedy',                                 source: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1200&h=630&fit=crop',                                       file: 'hero-lucknow-fire.jpg' },
  { slug: 'el-nino-2026',                                         source: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=630&fit=crop',                                       file: 'hero-el-nino.jpg' },
  { slug: 'india-digital-regulation-offensive-2026-dpdp-it-rules-crypto', source: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',                               file: 'hero-digital-regulation.jpg' },
  { slug: 'anthropic-mythos-ai-2026',                             source: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',                                       file: 'hero-anthropic-ai.jpg' },
  { slug: 'china-lineshine-supercomputer-top500-2026',            source: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',                                          file: 'hero-china-supercomputer.jpg' },

  // ── Wikimedia (6) ──
  { slug: 'modi-cabinet-reshuffle-2026',                          source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Third_Modi_Ministry_First_Meeting.jpg/1200px-Third_Modi_Ministry_First_Meeting.jpg', file: 'third-modi-ministry-meeting.jpg' },
  { slug: 'india-ai-governance-guidelines-impact-summit-2026',    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Narendra_Modi_AI_Summit_2025.jpg/1200px-Narendra_Modi_AI_Summit_2025.jpg', file: 'modi-ai-summit-2025.jpg' },
  { slug: 'doval-wang-india-china-lac-normalisation-june-2026',   source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/India_and_China_Flag.jpg/1200px-India_and_China_Flag.jpg',       file: 'india-china-flags.jpg' },
  { slug: 'rbi-monsoon-warning-growth-inflation-outlook-june-2026', source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/RBI-Tower.jpg/1200px-RBI-Tower.jpg',                           file: 'rbi-tower-mumbai.jpg' },
  { slug: 'drone-threat-intelligence-reset-jk-northeast-2026',    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Indian_Army_drone_countermeasure.jpg/1200px-Indian_Army_drone_countermeasure.jpg', file: 'indian-army-drone-countermeasure.jpg' },
  { slug: 'tmc-implosion-ndpi-merger-2026',                       source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mamata_Banerjee_-_Kolkata_2018-04-25_0484.jpg/1200px-Mamata_Banerjee_-_Kolkata_2018-04-25_0484.jpg', file: 'mamata-banerjee-portrait.jpg' },

  // ── Reuters (1) ──
  { slug: 'cbi-operation-chakra-vi-digital-arrest',               source: 'https://www.reuters.com/resizer/v2/LRPG3CEJTJJL7GWHXV6A6NE7TQ.jpg?auth=110909df4e9aaf31e72504ad2e900f81101dcfc3cfe08536fd8ca58ec047e6aa&height=630&width=1200&quality=80&smart=true', file: 'cbi-digital-arrest-reuters.jpg' },
];

// ─── Helpers ───────────────────────────────────────────────────────
const supabaseAuth = { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey };

async function downloadImage(url, dest) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(dest, buffer);
  return buffer.length;
}

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', avif: 'image/avif', webp: 'image/webp', gif: 'image/gif' };
  return mimes[ext] || 'image/jpeg';
}

async function uploadToSupabase(filePath, filename) {
  const buffer = readFileSync(filePath);
  const uploadUrl = `${supabaseUrl}/storage/v1/object/story-images/${filename}`;
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      ...supabaseAuth,
      'Content-Type': getMimeType(filename),
      'x-upsert': 'true',
    },
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

// ─── Execute ───────────────────────────────────────────────────────
async function main() {
  console.log(`=== Re-hosting ${externalImages.length} external images to Supabase ===\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < externalImages.length; i++) {
    const { slug, source, file } = externalImages[i];
    const destPath = join(tmpDir, file);
    console.log(`\n[${i + 1}/${externalImages.length}] ${slug}`);

    try {
      // 1) Download
      const size = await downloadImage(source, destPath);
      console.log(`  Downloaded: ${(size / 1024).toFixed(1)} KB`);

      // 2) Upload
      const uploadedUrl = await uploadToSupabase(destPath, file);
      console.log(`  Uploaded: ${uploadedUrl}`);

      // 3) Update story record
      await updateStoryRecord(slug, uploadedUrl);
      console.log(`  Story record updated ✓`);

      updated++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=========================================`);
  console.log(`SUMMARY`);
  console.log(`  Updated:  ${updated}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`=========================================`);

  // Cleanup
  rmSync(tmpDir, { recursive: true, force: true });
  console.log('Temp dir cleaned up.');

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
