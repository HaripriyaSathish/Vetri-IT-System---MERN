// Default content for the Explore VIS (home) page, taken from the SEO content document.
// Images, videos and brochures are served from server/media (/media/...).
import pool from '../config/db.js';
import { servicePages, servicePageMeta } from './seedServices.js';

const LIVE = '/media';
const img = (path, alt = '') => ({ url: `${LIVE}/${path}`, public_id: '', type: 'image', alt });

const PHONE = '8438781327';
const ADDRESS = 'VTS & VIS, Shanthi Complex, Surandai Old Market, Near Surandai Bus Stand, Surandai - 627859, Tenkasi District, Tamil Nadu';

export const siteSettings = {
  company_name: 'Vetri IT Systems Private Limited',
  short_name: 'Vetri IT Systems',
  tagline: 'DIGITAL EXCELLENCE',
  logo: img('branding/SB_Interior_LLC_-_Login.png', 'Vetri IT Systems Private Limited logo'),
  header_button_text: 'Get in Touch',
  header_button_link: '/contact',
  phone: PHONE,
  whatsapp: `91${PHONE}`,
  email: '',
  address: ADDRESS,
  map_link: '',
  footer_about: 'Vetri IT Systems is a premier IT solutions company from Tamil Nadu, India. We build premium websites, mobile apps, digital marketing campaigns and enterprise software that drive business growth.',
  social_heading: 'CONNECT WITH US',
  instagram: 'https://www.instagram.com/vetriitsystems',
  linkedin: 'https://www.linkedin.com/company/vetri-it-systems-private-limited/',
  facebook: '',
  youtube: '',
  copyright: '© 2026 Vetri IT Systems Private Limited. All rights reserved.',
  call_button_title: 'Call Vetri IT Systems',
  whatsapp_button_title: 'Chat with Vetri IT Systems on WhatsApp',
};

export const pages = [
  {
    slug: 'home', name: 'Explore VIS',
    meta_title: 'Vetri IT Systems | Digital Solutions Built to Perform',
    meta_description: 'Vetri IT Systems is an IT company in Tamil Nadu offering website development, mobile app development, custom software and digital marketing. Request a quote.',
    meta_keywords: 'IT company in Tamil Nadu, website development, mobile app development, software development, digital marketing, Tenkasi, Surandai',
  },
  { slug: 'about', name: 'About' },
  { slug: 'website-development', name: 'Website Development' },
  { slug: 'app-development', name: 'App Development' },
  { slug: 'software-development', name: 'Software Development' },
  { slug: 'digital-marketing', name: 'Digital Marketing' },
  { slug: 'graphic-designing', name: 'Graphic Designing' },
  { slug: 'solutions', name: 'Vetri Products' },
  { slug: 'contact', name: 'Contact' },
];

export const homeSections = [
  {
    key: 'hero', label: 'Hero Banner',
    content: {
      eyebrow: 'FULL VIDEO DEMONSTRATIONS AVAILABLE',
      title: 'Digital Solutions Built to Perform. Watch Them Work.',
      highlight: 'Perform.',
      description: 'Vetri IT Systems is an IT solutions company in Tamil Nadu, helping businesses grow with custom websites, mobile apps, business software and digital marketing services. Explore our solutions through live video demos and see how we bring ideas to life.',
      tags: ['Working Live Demos', 'Transparent Agile Code', 'Rapid Deployment'],
      stats: [
        { value: '50+', label: 'Digital Solutions Delivered' },
        { value: '99.4%', label: 'On-Time Project Delivery' },
        { value: '30+', label: 'Senior Engineers & Designers' },
        { value: '5+', label: 'Countries Served' },
      ],
      background: img('sections/herobanner.png', 'Vetri IT Systems developers and designers working together in the Tamil Nadu office'),
      primary_button: { text: 'Start Your Project', link: '/contact' },
      secondary_button: { text: 'Watch Demo', link: '' },
      demo_video: { url: `${LIVE}/demo.mp4`, public_id: '', type: 'video', alt: 'Vetri IT Systems demo video' },
    },
  },
  {
    key: 'ticker', label: 'Services Ticker',
    content: {
      items: ['Custom Software Development', 'Digital Marketing Services', 'Website Development', 'Mobile App Development'],
      separator: '🔶',
      speed: 40,
    },
  },
  {
    key: 'about', label: 'About Vetri IT',
    content: {
      eyebrow: 'ABOUT VETRI IT SYSTEMS',
      title: 'Rooted in Tamil Nadu - Turning Business Ideas into Digital Success.',
      highlight: 'Turning Business Ideas into Digital Success.',
      paragraphs: [
        'Vetri IT Systems is an IT solutions company based in Surandai, Tenkasi district, Tamil Nadu. We combine technical expertise with a passion for innovation to deliver websites, mobile apps and business software that help companies grow across India and beyond.',
        'Our name “Vetri” means victory, and that is what we aim to deliver for every client. From startups to enterprises, we have helped over 50 organizations transform digitally through custom software development, website development and digital marketing services.',
      ],
      image: img('sections/aboutimg.png', 'Vetri IT Systems team members reviewing a project plan together'),
      image_secondary: img('office.png', 'Vetri IT Systems office in Surandai, Tamil Nadu'),
      badge_value: '2+',
      badge_label: 'Years of Excellence',
      cards: [
        { icon: '♧', title: 'Quality First', description: 'Every line of code is reviewed, every pixel is polished. We deliver nothing short of excellence.' },
        { icon: '↗', title: 'On-Time Delivery', description: 'Our agile software development approach helps us ship fast without compromising on quality or scope.' },
        { icon: '♙', title: 'Expert Team', description: 'A passionate team of developers, designers and strategists with deep industry experience.' },
        { icon: '♡', title: 'Long-Term Support', description: 'We don’t just build and leave. Ongoing maintenance and support keep your product thriving.' },
      ],
    },
  },
  {
    key: 'services', label: 'Our Services',
    content: {
      eyebrow: 'WHAT WE DO',
      title: 'Our IT Services',
      highlight: 'IT Services',
      description: 'As an IT services company, we offer comprehensive technology solutions designed to turn your ideas into powerful digital products, from website development to mobile apps, custom software and digital marketing.',
      flow_label: 'ENGINEERED FLOW',
    },
  },
  {
    key: 'solutions', label: 'Smart Solutions',
    content: {
      eyebrow: 'READY-TO-DEPLOY ENTERPRISE SOFTWARE',
      title: 'Smart Solutions. Built for Real Businesses.',
      highlight: 'Built for Real Businesses.',
      description: 'Ready-to-deploy business management software developed to resolve core bottlenecks in billing, workflow management and human resources.',
    },
  },
  {
    key: 'why_choose', label: 'Why Choose Us',
    content: {
      title: 'Why Businesses Choose Vetri IT Systems?',
      highlight: 'Vetri IT Systems?',
      description: 'More than just a service, we are your digital growth partner.',
      image: img('why.png', 'Illustration of a team celebrating a successful project with the message Let us build something great'),
      items: [
        { icon: '♧', title: 'Experienced Team', description: 'Skilled professionals with real-world experience across web, mobile and software development.' },
        { icon: '◷', title: 'On-Time Delivery', description: 'We value your time and deliver on schedule through structured agile sprints.' },
        { icon: '⚒', title: 'Custom Solutions', description: 'Custom software built specifically around your unique business workflows and operational goals.' },
        { icon: '♧', title: 'Affordable Pricing', description: 'High-quality engineering solutions at transparent, competitive rates.' },
        { icon: '♡', title: 'Support & Maintenance', description: 'We are with you even after launch, ensuring uninterrupted uptime and continuous growth.' },
      ],
    },
  },
  {
    key: 'process', label: 'Our Process',
    content: {
      eyebrow: 'OUR PROCESS',
      title: 'From Idea to Digital Product.',
      highlight: 'Digital Product.',
      description: 'Our software development process helps businesses turn ideas into practical digital products through thoughtful UI/UX design, reliable development and measurable results.',
      steps: [
        { icon: '☼', title: 'Idea', description: 'We study your goals, users and requirements before any design begins.' },
        { icon: '◇', title: 'Design', description: 'UI/UX design turns the requirements into clear, easy-to-use screens.' },
        { icon: '⌘', title: 'Development', description: 'Agile sprints build your website, app or software with regular reviews.' },
        { icon: '♧', title: 'Product', description: 'Testing, launch and ongoing support keep your product performing.' },
      ],
    },
  },
  {
    key: 'team', label: 'Dedicated Engineers',
    content: {
      eyebrow: 'END-TO-END CRAFTSMANSHIP',
      title: 'The Team Behind Your Digital Solutions',
      highlight: 'Digital Solutions',
      description: 'Our in-house software developers and UI/UX designers collaborate across ideation, interface architecture, full-stack programming and cloud deployment to ship web, mobile and enterprise software that outpaces the competition.',
      tags: ['Sprint-Based Delivery', 'Direct Architect Access'],
      image: img('team.png', 'Product designer working at a computer with digital interface designs on screen'),
    },
  },
  {
    key: 'cta', label: 'Call To Action',
    content: {
      eyebrow: 'LET’S COLLABORATE',
      title: 'Ready to Build Something Great?',
      subtitle: 'Let’s Build Your Digital Future Together.',
      description: 'Turn your ideas into powerful digital solutions with Vetri IT Systems, an IT solutions company in Tamil Nadu. From website development and mobile apps to custom software and digital marketing services, we help businesses grow with technology that delivers.',
      image: img('cta.png', 'Business team collaborating around a laptop on a digital project'),
      primary_button: { text: 'Start Your Project', link: '/contact' },
      secondary_button: { text: 'Talk to Our Team', link: `tel:${PHONE}` },
    },
  },
];

export const services = [
  {
    slug: 'website-development', title: 'Website Development', nav_label: 'Website Development', badge: 'Flagship Web',
    flow: 'Home → About / Services → Product Listing → Product Details → Add to Cart → Checkout',
    description: 'As a website development company, we build modern, responsive and high-performance websites, including ecommerce website development, that attract users and convert visitors into customers.',
    image: img('items/webdev.png', 'Responsive ecommerce website displayed across desktop, tablet and mobile screens'),
    link: '/website-development', link_title: 'Website development services',
  },
  {
    slug: 'app-development', title: 'Mobile App Development', nav_label: 'App Development', badge: 'iOS & Android',
    flow: 'Onboarding → Home → Browse → Details → Actions → Completion',
    description: 'Our team develops user-friendly Android apps designed around your business needs.',
    image: img('items/appdev.png', 'Mobile application interfaces displayed on smartphone screens'),
    link: '/app-development', link_title: 'Mobile app development services',
  },
  {
    slug: 'software-development', title: 'Software Development', nav_label: 'Software Development', badge: 'Flagship Web',
    flow: 'Login → Dashboard → Modules → Data / Workflow → Reports',
    description: 'Custom software and web application development that streamline operations, improve productivity and support business growth.',
    image: img('items/fintrack.png', 'Business software dashboard displaying reports and operational data'),
    link: '/software-development', link_title: 'Software development services',
  },
  {
    slug: 'digital-marketing', title: 'Digital Marketing', nav_label: 'Digital Marketing', badge: 'iOS & Android',
    flow: 'Campaign Setup → Social Activity → Audience Growth → Analytics → Reporting',
    description: 'As a digital marketing agency, we use data-driven strategies, social media content and audience insights to help businesses increase visibility, attract leads and grow online.',
    image: img('marketing.png', 'Digital marketing analytics and social media performance displayed on a dashboard'),
    link: '/digital-marketing', link_title: 'Digital marketing services',
  },
];

export const solutions = [
  {
    slug: 'billing-software', tab_label: 'Billing Software', badge: 'SMART POS & CLOUD INVOICING',
    title: 'GST Billing Software',
    subtitle: 'High-Speed Invoicing, GST Compliance & Multi-Store Inventory Management',
    description: 'Purpose-built billing software for retail chains, distributors and service companies across Tamil Nadu and global markets. Manage multi-counter billing, thermal receipt printing, automated GST filing exports and live cash registers, with inventory management software built into the same system.',
    features: [
      { icon: '⌘', title: 'Rapid Barcode POS & Counter Sync', description: 'Scan items, adjust batch prices and process split payments in seconds.' },
      { icon: '▤', title: 'Automated GST Compliance', description: 'Generate GSTR-1 and GSTR-3B reports and simplify invoice numbering and GST reporting.' },
      { icon: '▣', title: 'Multi-Branch Inventory Balancing', description: 'Live stock tracking with low-inventory SMS alerts and inter-branch transfers.' },
    ],
    stats: [
      { value: '< 2.5s', label: 'Average Checkout Time' },
      { value: '100%', label: 'GST & E-Way Bill Ready' },
      { value: '99.99%', label: 'Offline Billing Uptime' },
    ],
    image: img('items/fintrack-dashboard.png', 'GST billing software dashboard showing invoices, GST reports and monthly finance overview'),
    live_label: 'vetri-billing-engine.cloud.app • Live Cloud Instance',
    button_text: 'Request Billing Software Demo', button_link: '/contact',
  },
  {
    slug: 'project-management-software', tab_label: 'Project Management Software', badge: 'CLOUD WORKSPACE & TASK TRACKING',
    title: 'Project Management Software',
    subtitle: 'Plan Projects, Assign Tasks and Track Progress in One Cloud Workspace',
    description: 'Project management software built for teams that need clear task ownership, deadlines and real-time progress tracking in one cloud-based workspace.',
    features: [],
    stats: [],
    image: img('items/pjt.png', 'Project management software dashboard showing tasks, deadlines and team progress'),
    live_label: '',
    button_text: 'Request Project Management Demo', button_link: '/contact',
  },
  {
    slug: 'hr-management-system', tab_label: 'HR Management System', badge: 'PEOPLE, ATTENDANCE & PAYROLL',
    title: 'HR Management System (HRMS)',
    subtitle: 'One Digital Platform for Employee Records and Everyday HR Work',
    description: 'An HR management system and HR software that brings employee records, attendance, leave and day-to-day HR workflows into one secure platform for growing companies.',
    features: [],
    stats: [],
    image: img('items/HR.png', 'HR management system dashboard showing employee records, attendance and leave'),
    live_label: '',
    button_text: 'Request HR Software Demo', button_link: '/contact',
  },
];

// Our Expertise dropdown icons (lucide names, changeable in Admin → service card)
const navIcons = {
  'website-development': 'Globe', 'app-development': 'Smartphone', 'software-development': 'Code2',
  'digital-marketing': 'Megaphone', 'graphic-designing': 'Palette',
};

const insertMany = async (table, rows, jsonCols = []) => {
  for (const [i, row] of rows.entries()) {
    const data = { ...row, sort_order: i + 1 };
    jsonCols.forEach((c) => { if (data[c] !== undefined) data[c] = JSON.stringify(data[c]); });
    await pool.query(`INSERT INTO ${table} SET ?`, [data]);
  }
};

const isEmpty = async (table, where = '', params = []) =>
  (await pool.query(`SELECT COUNT(*) c FROM ${table} ${where}`, params))[0][0].c === 0;

export const seedIfEmpty = async ({ force = false } = {}) => {
  if (force) {
    await pool.query("DELETE FROM sections WHERE page_slug = 'home'");
    await pool.query('DELETE FROM services');
    await pool.query('DELETE FROM solutions');
    await pool.query("DELETE FROM settings WHERE setting_key = 'site'");
    await pool.query("DELETE FROM pages WHERE slug = 'home'");
  }

  if (await isEmpty('settings', "WHERE setting_key = 'site'"))
    await pool.query("INSERT INTO settings (setting_key, value) VALUES ('site', ?)", [JSON.stringify(siteSettings)]);

  for (const p of pages)
    await pool.query('INSERT IGNORE INTO pages SET ?', [p]);

  if (await isEmpty('sections', "WHERE page_slug = 'home'")) {
    for (const [i, s] of homeSections.entries())
      await pool.query('INSERT INTO sections (page_slug, section_key, label, content, sort_order, is_active) VALUES (?,?,?,?,?,?)',
        ['home', s.key, s.label, JSON.stringify(s.content), i + 1, s.active === false ? 0 : 1]);
    console.log('🌱 Home page sections seeded');
  }
  if (await isEmpty('services')) await insertMany('services', services, ['image']);
  if (await isEmpty('solutions')) await insertMany('solutions', solutions, ['features', 'stats', 'image']);
  // Graphic Designing: dropdown item only (added once, together with its page)
  if (force || await isEmpty('sections', "WHERE page_slug = 'graphic-designing'")) {
    const [[{ next }]] = await pool.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM services');
    await pool.query('INSERT IGNORE INTO services SET ?', [{
      slug: 'graphic-designing', title: 'Graphic Designing', nav_label: 'Graphic Designing', badge: 'Creative Design',
      description: 'Logos, branding, social media creatives and marketing designs.', link: '/graphic-designing',
      link_title: 'Graphic design services', nav_icon: navIcons['graphic-designing'], sort_order: next, is_active: 1, show_on_home: 0,
    }]);
  }
  for (const [slug, icon] of Object.entries(navIcons))
    await pool.query('UPDATE services SET nav_icon = ? WHERE slug = ? AND nav_icon IS NULL', [icon, slug]);
  await seedServicePages({ force });
};

// Our Expertise pages: each page is seeded only while it has no sections (or with --force)
// Sections marked `ensure` that were added after a page was first seeded: insert once, before the
// section that follows them in the seed list (later the admin can edit, hide or reorder them).
const addMissingSections = async (slug, list) => {
  for (const [i, s] of list.entries()) {
    if (!s.ensure || !(await isEmpty('sections', 'WHERE page_slug = ? AND section_key = ?', [slug, s.key]))) continue;
    const [rows] = await pool.query('SELECT section_key, sort_order FROM sections WHERE page_slug = ?', [slug]);
    const nextKeys = list.slice(i + 1).map((x) => x.key);
    const next = rows.filter((r) => nextKeys.includes(r.section_key)).sort((a, b) => a.sort_order - b.sort_order)[0];
    const order = next ? next.sort_order : Math.max(0, ...rows.map((r) => r.sort_order)) + 1;
    if (next) await pool.query('UPDATE sections SET sort_order = sort_order + 1 WHERE page_slug = ? AND sort_order >= ?', [slug, order]);
    await pool.query('INSERT INTO sections (page_slug, section_key, label, content, sort_order) VALUES (?,?,?,?,?)',
      [slug, s.key, s.label, JSON.stringify(s.content), order]);
    console.log(`🌱 ${slug}: ${s.label} section added`);
  }
};

const seedServicePages = async ({ force }) => {
  for (const [slug, list] of Object.entries(servicePages)) {
    if (force) await pool.query('DELETE FROM sections WHERE page_slug = ?', [slug]);
    const { meta_title, meta_description } = servicePageMeta[slug];
    await pool.query('UPDATE pages SET meta_title = ?, meta_description = ? WHERE slug = ? AND (meta_title IS NULL OR ? = 1)',
      [meta_title, meta_description, slug, force ? 1 : 0]);
    if (!(await isEmpty('sections', 'WHERE page_slug = ?', [slug]))) { await addMissingSections(slug, list); continue; }
    for (const [i, s] of list.entries())
      await pool.query('INSERT INTO sections (page_slug, section_key, label, content, sort_order) VALUES (?,?,?,?,?)',
        [slug, s.key, s.label, JSON.stringify(s.content), i + 1]);
    console.log(`🌱 ${slug} sections seeded`);
  }
};
