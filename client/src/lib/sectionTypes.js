// Section key -> shared section type for the "Our Expertise" pages.
// Used by the website (which component renders) and the admin (which editor form to show).
export const SERVICE_SECTION_TYPES = {
  hero: 'hero', stats: 'stats', clients: 'clients', journey: 'journey', process: 'journey',
  capabilities: 'capabilities', pricing: 'pricing', packages: 'pricing', brochure: 'brochure', cta: 'cta',
  services: 'cards', why: 'cards', tools: 'chips', industries: 'chips', faq: 'faq', enquiry: 'enquiry',
  products: 'products', ecosystem: 'ecosystem', custom: 'split', industry_cards: 'cards',
  portfolio: 'portfolio', case_studies: 'casestudies', contact_cta: 'ctaband',
  offerings: 'offerings', leadership: 'leaders', mission: 'mission', team: 'split', contact: 'contact', map: 'map',
};

export const CONTACT_PAGE = { slug: 'contact', name: 'Contact' };
export const ABOUT_PAGE = { slug: 'about', name: 'About' };
export const PRODUCTS_PAGE = { slug: 'solutions', name: 'Vetri Products' };
export const PROJECTS_PAGE = { slug: 'projects', name: 'Our Projects' };

export const EXPERTISE_PAGES = [
  { slug: 'website-development', name: 'Website Development' },
  { slug: 'app-development', name: 'App Development' },
  { slug: 'software-development', name: 'Software Development' },
  { slug: 'digital-marketing', name: 'Digital Marketing' },
  // public URL from the Graphic Design SEO document; the old /graphic-designing redirects here
  { slug: 'graphic-designing', name: 'Graphic Designing', path: 'graphic-design-services', oldPath: 'graphic-designing' },
];
