// Applies the October 2026 SEO content documents to an existing database:
//   npm run sync-seo
// For each page below: meta title/description are updated, every section's text is replaced with the
// seed copy, missing sections are added and sections follow the seed order. Images, videos, brochure
// files and client website links already chosen in the admin are kept (only their alt text changes).
// The old image CTA banners on these expertise pages are hidden: the enquiry form now ends those pages.
// Website Development is deliberately not synced: it keeps its existing content.
import pool from '../config/db.js';
import { pages, homeSections } from '../db/seed.js';
import { servicePages, servicePageMeta } from '../db/seedServices.js';

const SYNC = {
  home: homeSections,
  'app-development': servicePages['app-development'],
  'software-development': servicePages['software-development'],
};
const RETIRE = { 'app-development': ['cta'], 'software-development': ['cta'] };
const KEEP_AS_IS = ['files', 'link']; // brochure uploads and links edited in the admin

const isMedia = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'url' in v;
const keyOf = (o) => String(o?.name || o?.title || o?.label || o?.question || '').toLowerCase();

// fresh seed copy, with the admin's media and links carried over
const merge = (fresh, old) => {
  if (Array.isArray(fresh)) {
    if (!Array.isArray(old)) return fresh;
    return fresh.map((item, i) => {
      if (!item || typeof item !== 'object') return item;
      const match = old.find((o) => keyOf(o) && keyOf(o) === keyOf(item)) || (keyOf(item) ? null : old[i]);
      return match ? merge(item, match) : item;
    });
  }
  if (isMedia(fresh) || (fresh === null && isMedia(old))) {
    if (!old?.url) return fresh;
    return { ...old, alt: fresh?.alt ?? old.alt };
  }
  if (!fresh || typeof fresh !== 'object' || !old || typeof old !== 'object') return fresh;
  const out = { ...fresh };
  for (const k of Object.keys(fresh)) {
    if (KEEP_AS_IS.includes(k) && old[k] !== undefined && (Array.isArray(old[k]) ? old[k].length : old[k])) out[k] = old[k];
    else if (k in old) out[k] = merge(fresh[k], old[k]);
  }
  return out;
};

const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v);
const metaFor = (slug) => servicePageMeta[slug] || pages.find((p) => p.slug === slug);

for (const [slug, list] of Object.entries(SYNC)) {
  const { meta_title, meta_description } = metaFor(slug);
  await pool.query('UPDATE pages SET meta_title = ?, meta_description = ? WHERE slug = ?', [meta_title, meta_description, slug]);

  const [rows] = await pool.query('SELECT section_key, content, sort_order FROM sections WHERE page_slug = ?', [slug]);
  const existing = new Map(rows.map((r) => [r.section_key, r]));
  let order = 0;
  for (const s of list) {
    order += 1;
    const row = existing.get(s.key);
    if (row) {
      const content = merge(s.content, parse(row.content));
      await pool.query('UPDATE sections SET content = ?, label = ?, sort_order = ?, is_active = 1 WHERE page_slug = ? AND section_key = ?',
        [JSON.stringify(content), s.label, order, slug, s.key]);
    } else {
      await pool.query('INSERT INTO sections (page_slug, section_key, label, content, sort_order, is_active) VALUES (?,?,?,?,?,1)',
        [slug, s.key, s.label, JSON.stringify(s.content), order]);
      console.log(`   + ${slug}: ${s.label}`);
    }
  }
  // sections that are not in the documents keep their place after the synced ones
  for (const r of rows.filter((r) => !list.some((s) => s.key === r.section_key)).sort((a, b) => a.sort_order - b.sort_order)) {
    order += 1;
    const retire = RETIRE[slug]?.includes(r.section_key);
    await pool.query(`UPDATE sections SET sort_order = ?${retire ? ', is_active = 0' : ''} WHERE page_slug = ? AND section_key = ?`, [order, slug, r.section_key]);
    if (retire) console.log(`   - ${slug}: ${r.section_key} hidden`);
  }
  console.log(`✅ ${slug} synced`);
}
process.exit(0);
