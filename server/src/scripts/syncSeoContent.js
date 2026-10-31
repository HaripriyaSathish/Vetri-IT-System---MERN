// Applies the October 2026 SEO content documents to an existing database:
//   npm run sync-seo                          (all pages below)
//   npm run sync-seo -- website-development   (only the named page(s))
// For each page below: meta title/description are updated, every section's text is replaced with the
// seed copy, missing sections are added and sections follow the seed order. Images, videos, brochure
// files and client website links already chosen in the admin are kept (only their alt text changes).
// The old image CTA banners on these expertise pages are hidden: the enquiry form now ends those pages.
// Website Development follows its revised SEO document, which also drops the separate brochure section
// (the Single-Page package card links the brochure instead). Graphic Designing keeps its brochure section.
import pool from '../config/db.js';
import { pages, homeSections } from '../db/seed.js';
import { servicePages, servicePageMeta } from '../db/seedServices.js';

const SYNC = {
  home: homeSections,
  'app-development': servicePages['app-development'],
  'software-development': servicePages['software-development'],
  'website-development': servicePages['website-development'],
  'graphic-designing': servicePages['graphic-designing'],
  projects: servicePages.projects,
};
const RETIRE = { 'app-development': ['cta'], 'software-development': ['cta'], 'website-development': ['cta', 'brochure'], 'graphic-designing': [] };
const KEEP_AS_IS = ['files', 'link']; // brochure uploads and links edited in the admin

const isMedia = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'url' in v;
const keyOf = (o) => String(o?.name || o?.title || o?.label || o?.question || '').toLowerCase();

// fresh seed copy, with the admin's media and links carried over
const merge = (fresh, old) => {
  if (Array.isArray(fresh)) {
    if (!Array.isArray(old)) return fresh;
    return fresh.map((item, i) => {
      if (!item || typeof item !== 'object') return item;
      // same name, else same image (a renamed client keeps the website link set in the admin)
      const match = old.find((o) => keyOf(o) && keyOf(o) === keyOf(item))
        || (item.image?.url && old.find((o) => o?.image?.url === item.image.url))
        || (keyOf(item) ? null : old[i]);
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

const only = process.argv.slice(2);
for (const [slug, list] of Object.entries(SYNC).filter(([slug]) => !only.length || only.includes(slug))) {
  const { meta_title, meta_description } = metaFor(slug);
  // new pages (e.g. Our Projects) get their row first
  const info = pages.find((p) => p.slug === slug);
  if (info) await pool.query('INSERT IGNORE INTO pages (slug, name) VALUES (?, ?)', [slug, info.name]);
  await pool.query('UPDATE pages SET meta_title = ?, meta_description = ? WHERE slug = ?', [meta_title, meta_description, slug]);

  const [rows] = await pool.query('SELECT section_key, content, sort_order FROM sections WHERE page_slug = ?', [slug]);
  const existing = new Map(rows.map((r) => [r.section_key, r]));
  let order = 0;
  for (const s of list) {
    order += 1;
    const row = existing.get(s.key);
    if (row) {
      const content = merge(s.content, parse(row.content));
      // sections marked inactive in the seed keep whatever visibility the admin chose
      await pool.query(`UPDATE sections SET content = ?, label = ?, sort_order = ?${s.inactive ? '' : ', is_active = 1'} WHERE page_slug = ? AND section_key = ?`,
        [JSON.stringify(content), s.label, order, slug, s.key]);
    } else {
      await pool.query('INSERT INTO sections (page_slug, section_key, label, content, sort_order, is_active) VALUES (?,?,?,?,?,?)',
        [slug, s.key, s.label, JSON.stringify(s.content), order, s.inactive ? 0 : 1]);
      console.log(`   + ${slug}: ${s.label}${s.inactive ? ' (hidden)' : ''}`);
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
