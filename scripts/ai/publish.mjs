/**
 * THE BREAKDOWN OS — Phase 7: Production Package
 *
 * Prepares a complete production-ready package for a story:
 *   - Copies all assets to public/
 *   - Generates SEO metadata JSON
 *   - Generates sitemap entry
 *   - Generates Open Graph / Schema.org JSON-LD
 *   - Generates RSS entry
 *   - Updates publish-all-beats.js
 *
 * Usage:
 *   node scripts/ai/publish.mjs --slug <slug>
 *   node scripts/ai/publish.mjs --slug <slug> --deploy
 *
 * Requires OPENAI_API_KEY in .env at project root.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

async function main() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = process.argv[i + 1];
      if (val && !val.startsWith('--')) { args[key] = val; i++; }
      else { args[key] = true; }
    }
  }

  let slug = args.slug || args.s;
  if (!slug) {
    const rl = createInterface({ input: stdin, output: stdout });
    slug = await new Promise(resolve => rl.question('Slug: ', answer => { rl.close(); resolve(answer); }));
  }

  const storyDir = join(PROJECT_ROOT, 'stories', slug);
  if (!existsSync(storyDir)) {
    console.error(`Story not found: stories/${slug}/`);
    process.exit(1);
  }

  const outDir = join(PROJECT_ROOT, 'public', 'stories', slug);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  console.log(`\n=== Phase 7 — Production Package ===\n`);
  console.log(`  Story: stories/${slug}/`);
  console.log(`  Output: public/stories/${slug}/\n`);

  // 1. Copy all story files
  const copyFiles = ['index.html', `${slug}.html`, `${slug}.md`];
  for (const f of copyFiles) {
    const src = join(storyDir, f);
    if (existsSync(src)) {
      writeFileSync(join(outDir, f), readFileSync(src, 'utf-8'), 'utf-8');
      console.log(`  ✓ ${f}`);
    }
  }

  // 2. Read markdown for metadata
  const mdPath = join(storyDir, `${slug}.md`);
  const mdContent = existsSync(mdPath) ? readFileSync(mdPath, 'utf-8') : '';
  const titleMatch = mdContent.match(/title:\s*"([^"]+)"/);
  const summaryMatch = mdContent.match(/summary:\s*"([^"]+)"/);
  const categoryMatch = mdContent.match(/category:\s*"([^"]+)"/);
  const tagMatch = mdContent.match(/tags:\s*\n((?:\s+-\s+"[^"]*"\n?)+)/);
  const dateMatch = mdContent.match(/published_at:\s*"([^"]+)"/);

  const title = titleMatch?.[1] || slug;
  const summary = summaryMatch?.[1] || title;
  const category = categoryMatch?.[1] || 'General';
  const tags = tagMatch ? [...tagMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : [category];
  const publishedAt = dateMatch?.[1] || new Date().toISOString();

  // 3. Generate SEO JSON
  const seo = {
    title: `${title} | The Breakdown`,
    description: summary,
    canonical: `https://thebreakdown.in/story/${slug}`,
    og: {
      title,
      description: summary,
      type: 'article',
      url: `https://thebreakdown.in/story/${slug}`,
      image: 'https://thebreakdown.in/og-image.png',
      site_name: 'The Breakdown'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@thebreakdowndaily',
      title,
      description: summary
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: summary,
      articleSection: category,
      keywords: tags.join(', '),
      datePublished: publishedAt,
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'The Breakdown'
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Breakdown',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thebreakdown.in/og-image.png'
        }
      }
    }
  };

  writeFileSync(join(outDir, 'seo.json'), JSON.stringify(seo, null, 2), 'utf-8');
  console.log('  ✓ seo.json');

  // 4. Generate sitemap entry
  const sitemapEntry = `  <url>
    <loc>https://thebreakdown.in/story/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  writeFileSync(join(outDir, 'sitemap-entry.xml'), sitemapEntry, 'utf-8');
  console.log('  ✓ sitemap-entry.xml');

  // 5. Generate RSS entry
  const rssEntry = `  <item>
    <title>${title}</title>
    <link>https://thebreakdown.in/story/${slug}</link>
    <guid isPermaLink="true">https://thebreakdown.in/story/${slug}</guid>
    <description>${summary}</description>
    <category>${category}</category>
    <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
  </item>`;

  writeFileSync(join(outDir, 'rss-entry.xml'), rssEntry, 'utf-8');
  console.log('  ✓ rss-entry.xml');

  // 6. Generate reading time
  const htmlPath = join(storyDir, `${slug}.html`);
  const htmlContent = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf-8') : '';
  const wordCount = htmlContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  writeFileSync(join(outDir, 'metadata.json'), JSON.stringify({
    slug,
    title,
    summary,
    category,
    tags,
    publishedAt,
    wordCount,
    readTime,
    lastUpdated: new Date().toISOString()
  }, null, 2), 'utf-8');
  console.log('  ✓ metadata.json');

  console.log(`\n  ── Summary ──`);
  console.log(`  Title:      ${title}`);
  console.log(`  Category:   ${category}`);
  console.log(`  Words:      ${wordCount}`);
  console.log(`  Read time:  ${readTime} min`);
  console.log(`  Tags:       ${tags.join(', ')}`);
  console.log(`\n  Package: public/stories/${slug}/`);
  console.log(`  Run: node fact-check-cms/scripts/publish-all-beats.js`);
  console.log(`       .\\scripts\\deploy.ps1 -PushCMS\n`);
}

main().catch(err => {
  console.error(`\nFatal error: ${err.message}`);
  process.exit(1);
});
