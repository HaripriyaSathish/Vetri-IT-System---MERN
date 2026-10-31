// "Our Expertise" pages: live-site layout with the copy from the October 2026 SEO content documents
// (Website, App, Software Development and Digital Marketing).
// Section keys map to shared section types (see client ServicePage + admin serviceSections).
const LIVE = '/media';
const img = (path, alt = '') => ({ url: `${LIVE}/${path}`, public_id: '', type: 'image', alt });

const STATS = {
  items: [
    { value: '50+', label: 'Digital Solutions Delivered' },
    { value: '99.4%', label: 'On-Time Project Delivery' },
    { value: '30+', label: 'Senior Engineers & Designers' },
    { value: '5+', label: 'Countries Served' },
  ],
};

const BUDGETS = ['Below ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹50,000', 'Above ₹50,000'];

const JOURNEY = {
  title: 'How We Work',
  highlight: 'Work',
  steps: [
    { icon: 'Lightbulb', title: 'Discover', description: 'Goals, audience, scope.' },
    { icon: 'PenTool', title: 'Design', description: 'Wireframes and visual UI.' },
    { icon: 'Code2', title: 'Develop', description: 'Clean, fast code.' },
    { icon: 'ClipboardCheck', title: 'Test', description: 'Every device, every browser.' },
    { icon: 'Rocket', title: 'Launch', description: 'Go live and grow.' },
  ],
};

const CAP_STATS = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '99.9%', label: 'Uptime' },
  { value: '50+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support' },
];

// Live client websites (confirmed by the team), matched by project / case-study name.
// Used for the Website Development portfolio, the Our Projects cards and the case-study popups.
const LIVE_SITES = {
  ironmeka: 'https://ironmeka.in/',
  londonindiantamils: 'https://londonindiantamils.com/',
  suseehyundai: 'https://www.suseehyundaitheni.in/',
  globaltamiluniversity: 'https://www.globaltamiluniversity.in/',
  ntts: 'https://newtrackindia.com/',
  newtrackindiantts: 'https://newtrackindia.com/',
  classiccomfortinteriors: 'https://classiccomfortinteriors.in/',
  classiccomfortinteriorexterior: 'https://classiccomfortinteriors.in/',
  varahitourstravels: 'https://www.varahitoursandtravels.com/',
  varahitoursandtravels: 'https://www.varahitoursandtravels.com/',
};
const liveSite = (name = '') => LIVE_SITES[name.toLowerCase().replace(/[^a-z]/g, '')] || '';

// Portfolio order, names, locations and alt text from the Website Development SEO content document
const webClients = [
  ['saswanthtravels.png', 'Sashwanth Travels', 'Tirunelveli', 'Sashwanth Travels website homepage'],
  ['mountdental.png', 'Mount Dentalcare', 'Chennai', 'Mount Dentalcare dental clinic website homepage'],
  ['truetech.png', 'TrueTecs', 'Dubai', 'TrueTecs IT infrastructure services website homepage'],
  ['varahi.png', 'Varahi Tours & Travels', 'Madurai', 'Varahi Tours & Travels cab booking and tour packages website'],
  ['Csafe.png', 'CSafe', 'Coimbatore', 'CSafe website homepage'],
  ['Travu.png', 'Travu', 'Coimbatore', 'Travu cab booking and tour website homepage'],
  ['Susee.png', 'Susee Hyundai', 'Theni', 'Susee Hyundai car dealership website homepage'],
  ['Dana_JvlKkYs.png', 'Dhanalakshmi Enterprises', 'Trichy', 'Dhanalakshmi Enterprises business website homepage'],
  ['Lic.png', 'LIC Agency', 'Madurai', 'LIC Agency insurance services website homepage'],
  ['tsing.png', 'TS Singing Arena', 'Chennai', 'TS Singing Arena music and events website homepage'],
  ['sjr.png', 'SJR Groups', 'Kovilpatti', 'SJR Groups business website homepage'],
  ['Medex.png', 'Medex', 'Chennai', 'Medex healthcare technology website homepage'],
  ['nammasu.png', 'Namma Surandai', 'Surandai', 'Namma Surandai local community portal homepage'],
  ['globalim.png', 'Global Tamil University', 'Coimbatore', 'Global Tamil University website homepage'],
  ['ntts.png', 'NTTS', 'Chennai', 'NTTS ride booking website homepage'],
  ['Antex.png', 'Antex Private Limited', 'UAE', 'Antex Private Limited global trade solutions website'],
  ['london.png', 'London Indian Tamils', 'London', 'London Indian Tamils community website homepage'],
  ['classic.png', 'Classic & Comfort Interiors', 'Chennai', 'Classic & Comfort Interiors interior design website homepage'],
  ['builders.png', 'Nagercoil Builders', 'Nagercoil', 'Nagercoil Builders home construction website homepage'],
  ['Rushik.png', 'Rushik Bio Organic', 'Surandai', 'Rushik Bio Organic agriculture products online store'],
  ['olympus.png', 'Olympus Diagnostics', 'Bangalore', 'Olympus Diagnostics laboratory testing website homepage'],
  ['cygmagm.png', 'Cygmagm', 'UAE', 'Cygmagm medical supplies website homepage'],
].map(([file, name, location, alt]) => ({ image: img(`items/${file}`, alt), name, location, category: '', description: '', link: liveSite(name) }));

const capItems = (list) => list.map(([icon, label]) => ({ icon, label }));

export const servicePageMeta = {
  'graphic-designing': {
    meta_title: 'Logo, Visiting Card & Brochure Design | Vetri IT Systems',
    meta_description: 'Custom logo, visiting card and brochure design services from Vetri IT Systems. Get all three in one customized business design package for ₹2,000.',
  },
  'website-development': {
    meta_title: 'Website Development Services | Vetri IT Systems',
    meta_description: 'Vetri IT Systems offers website development services for business websites, e-commerce stores and custom web applications. Plans start at ₹3,000 + GST.',
  },
  'app-development': {
    meta_title: 'Mobile App Development Company | Vetri IT Systems',
    meta_description: 'Vetri IT Systems builds custom Android business and e-commerce apps with clear pricing. Packages from ₹9,999 + GST. Explore options and get a quote.',
  },
  'software-development': {
    meta_title: 'Software Development Services | Vetri IT Systems',
    meta_description: 'Vetri IT Systems is a software development Services offering custom software, GST billing software and business management software. Get a quote.',
  },
  'digital-marketing': {
    meta_title: 'Digital Marketing Services | Vetri IT Systems',
    meta_description: 'Vetri IT Systems offers SEO, social media marketing, Google Ads and content marketing to help businesses improve online visibility and generate enquiries.',
  },
  contact: {
    meta_title: 'Contact Vetri IT Systems Surandai | IT Solutions Company',
    meta_description: 'Contact Vetri IT Systems in Surandai, Tenkasi, for website, mobile app, software development and digital marketing services. Call 8438781327 for a free estimate.',
  },
  about: {
    meta_title: 'About Vetri IT Systems | IT Solutions Company in Surandai, Tamil Nadu',
    meta_description: 'Vetri IT Systems is an IT solutions company in Tenkasi, Tamil Nadu, building websites, mobile apps, custom software and Digital Marketing Services for growing businesses.',
  },
  projects: {
    meta_title: 'Digital Projects Portfolio & Case Studies | Vetri IT Systems',
    meta_description: 'Explore Vetri IT Systems’ website development projects and digital portfolio, including apps, custom software and graphic design solutions for businesses.',
  },
  solutions: {
    meta_title: 'Business Software & Software Solutions | Vetri Products',
    meta_description: 'Explore Vetri Products by Vetri IT Systems: Vetri Bills for GST invoices, VTMS for training management and Vetri Files for online PDF tools.',
  },
};

// Vetri Products page: live page structure (hero, product cards with screenshot + video, CTA)
// with copy and the newly added sections from the Products SEO content document.
const video = (path, alt) => ({ url: `${LIVE}/${path}`, public_id: '', type: 'video', alt });
// brochure file in server/media/brochures, listed in the Brochure Download section
const doc = (title, file) => ({ title, file: { url: `${LIVE}/brochures/${file}`, public_id: '', type: /\.(png|jpe?g|webp)$/i.test(file) ? 'image' : 'file', alt: title } });
export const BROCHURE_FILES = {
  'website-development': [doc('Landing Page Website Brochure', 'landing-page-brochure.pdf'), doc('E-commerce Website Brochure', 'ecommerce-brochure.pdf')],
  'app-development': [doc('Mobile App Brochure (₹9,999)', 'mobile-app-brochure-9999.pdf'), doc('Mobile App Brochure (₹19,999)', 'mobile-app-brochure-19999.pdf')],
  'graphic-designing': [doc('Graphic Design Package Brochure', 'graphic-design-brochure.png')],
};

// Our Projects page: copy from the Our Projects SEO content document; screenshots are the original
// project images already used on the Website Development, App and Software Development pages.
const TRAVEL = 'Travel & Transportation';
const HEALTH = 'Healthcare & Medical';
const AUTO = 'Automotive';
const INDUSTRIAL = 'Industrial, Engineering & Safety';
const IT = 'IT & Business Services';
const EDU = 'Education & Careers';
const HOME = 'Home, Interiors & Garment Care';
const TRADE = 'Trade, Export & Global Business';
const COMMUNITY = 'Community, Media & Entertainment';
const WD = 'Website Development';
const shot = (path, alt) => (path ? img(path, alt) : { url: '', public_id: '', type: 'image', alt });

// [name, location, industry, tags, description, screenshot, alt text, case study name]
const projectItems = [
  ['Susee Hyundai', 'Theni', AUTO, [WD, 'SEO', 'GSC'], 'Dealership website for Theni with test drive booking, a quick quote form and WhatsApp enquiry for buyers.', 'items/Susee.png', 'Susee Hyundai dealership website in Theni with test drive booking', 'Susee Hyundai'],
  ['Travu', 'Coimbatore', TRAVEL, [WD, 'SEO'], 'Taxi and car rental website for Coimbatore with easy online booking, ride options and call or WhatsApp contact.', 'items/Travu.png', 'Travu taxi and car rental website in Coimbatore'],
  ['Mount Dentalcare', 'Chennai', HEALTH, [WD, 'SEO'], 'Dental clinic website for Chennai focused on easy appointment booking and building patient trust.', 'items/mountdental.png', 'Mount Dentalcare dental clinic website in Chennai'],
  ['Dhanalakshmi Enterprises', 'Trichy', INDUSTRIAL, [WD, 'SEO'], 'Manpower and workforce solutions website for Trichy, serving factories and warehouses with quick quote enquiry.', 'items/Dana_JvlKkYs.png', 'Dhanalakshmi Enterprises manpower and workforce solutions website in Trichy'],
  ['TrueTecs', 'Dubai', IT, [WD, 'SEO'], 'IT infrastructure and support website for Dubai offering 24/7 monitoring, cloud, cybersecurity and automation.', 'items/truetech.png', 'TrueTecs IT infrastructure and support website for Dubai'],
  ['LIC Agency', 'Madurai', EDU, [WD, 'SEO'], 'Career website for aspiring LIC agents in Madurai, with an online agency application form and training details.', 'items/Lic.png', 'LIC Agency career website for aspiring agents in Madurai'],
  ['TS Singing Arena', 'Chennai', COMMUNITY, [WD, 'SEO'], 'Singing competition and music events website for Chennai with event listings and an easy arena sign-up.', 'items/tsing.png', 'TS Singing Arena singing competition and music events website in Chennai', 'TS Singing Arena'],
  ['SJR Groups', 'Kovilpatti', IT, [WD, 'SEO'], 'Business group website for Kovilpatti covering jewellery, traditional snacks, a sports ground and innovation club.', 'items/sjr.png', 'SJR Groups business group website in Kovilpatti'],
  ['Namma Surandai', 'Surandai', COMMUNITY, [WD, 'SEO'], 'Local community portal for Surandai with news, places, events, jobs, businesses and local offers in one place.', 'items/nammasu.png', 'Namma Surandai local community portal for Surandai'],
  ['Global Tamil University', 'Coimbatore', EDU, [WD, 'SEO'], 'University website for Coimbatore with academics, admissions, research and campus details, plus online apply.', 'items/globalim.png', 'Global Tamil University website in Coimbatore'],
  ['NTTS', 'Chennai', TRAVEL, [WD, 'SEO'], 'Taxi booking website for Chennai covering airport, outstation, one-way and local rides with live tracking.', 'items/ntts.png', 'NTTS taxi booking website in Chennai', 'New Track India (NTTS)'],
  ['Antex Private Limited', 'UAE', TRADE, [WD, 'SEO'], 'Global trade website for the UAE covering sourcing, quality inspection, packaging, logistics and customs support.', 'items/Antex.png', 'Antex Private Limited global trade website for the UAE'],
  ['London Indian Tamils', 'London', COMMUNITY, [WD, 'SEO'], 'Community website connecting Tamil-speaking people across the UK, with events, membership and donations.', 'items/london.png', 'London Indian Tamils community website in the UK', 'London Indian Tamils'],
  ['Classic & Comfort Interiors', 'Chennai', HOME, [WD, 'SEO'], 'Interior design website for Chennai covering residential and commercial spaces, with a simple quote request.', 'items/classic.png', 'Classic & Comfort Interiors interior design website in Chennai', 'Classic Comfort Interior & Exterior'],
  ['Nagercoil Builders', 'Nagercoil', INDUSTRIAL, [WD], 'Construction website for Nagercoil with services, plan and pricing details, project showcase and enquiry form.', 'items/builders.png', 'Nagercoil Builders construction website in Nagercoil'],
  ['Olympus Diagnostics', 'Bangalore', HEALTH, [WD], 'Diagnostic lab website for Bangalore with online test booking, home sample collection and prescription upload.', 'items/olympus.png', 'Olympus Diagnostics diagnostic lab website in Bangalore'],
  ['Cygmagm', 'UAE', TRADE, [WD], 'Business website for medical supplies and global trade in the UAE, with product categories and enquiry option.', 'items/cygmagm.png', 'Cygmagm medical supplies and global trade website for the UAE'],
  ['Ironmeka', '', HOME, [WD, 'SEO', 'Logo Design', 'Business Card'], 'Website and logo design for Ironmeka. A consistent look across the website and brand mark, so the business is easy to recognise.', 'items/ironmeka.png', 'Ironmeka website and logo design', 'Ironmeka'],
  ['Imaya Mercantile', '', TRADE, [WD, 'SEO', 'Logo Design'], 'Website and logo design for Imaya Mercantile, an export business. A professional website and logo that present the business clearly to international buyers.', '', 'Imaya Mercantile export business website and logo design', 'Imaya Mercantile'],
  ['Sashwanth Travels', '', TRAVEL, [WD, 'SEO', 'Logo Design', 'AI Chatbot'], 'Travel website and logo design created for Sashwanth Travels. Clear tour package details, enquiry forms and a smooth user journey.', 'items/saswanthtravels.png', 'Sashwanth Travels travel and tour packages website and logo design'],
  ['Alpha & Omega', '', INDUSTRIAL, [WD, 'SEO'], 'Website for Alpha & Omega Industrial Technologies, supplying industrial equipment such as compressors. Includes product pages, services, industries and quote request options.', '', 'Alpha & Omega industrial equipment and engineering solutions website'],
  ['CSafe', '', INDUSTRIAL, [WD, 'SEO'], 'Website for Chitra Fire and Safety Equipments, focused on reflective safety jackets. Includes product categories, industry pages, a bulk quote option and WhatsApp and call buttons.', 'items/Csafe.png', 'CSafe reflective safety jackets website', 'CSAFE'],
  ['MedEx', '', HEALTH, [WD, 'SEO', 'Logo Design', 'AI Assistant'], 'Website for MedEx, a biomedical engineering and healthcare technology company. Covers products, services and quote requests for hospitals, diagnostic centers and clinics.', 'items/Medex.png', 'MedEx biomedical engineering and healthcare technology website', 'MedEx Biomed'],
  ['Varahi Tours and Travels', '', TRAVEL, [WD, 'SEO'], 'Website for Varahi Tours & Travels, offering Madurai cab services and Tamil Nadu tour packages. Includes a quick enquiry form, fleet, packages, destinations and WhatsApp booking support.', 'items/varahi.png', 'Varahi Tours & Travels Madurai cab services and tour packages website'],
  // App Development
  ['QuickRetail POS', '', IT, ['App Development'], 'Android point-of-sale app built for retail businesses. Helps shop staff handle sales at the counter.', 'reference/app-project-1.jpg', 'QuickRetail POS Android point-of-sale app for retail businesses'],
  ['MedPulse Telehealth', '', HEALTH, ['App Development'], 'Android telehealth app built for healthcare services. Helps patients connect with doctors remotely.', 'reference/app-project-2.jpg', 'MedPulse Telehealth Android telehealth app for healthcare'],
  // Custom Software Development
  ['Akash Photography', '', COMMUNITY, ['Software Development'], 'Software built for a photography business. Helps manage the studio’s work in one place.', 'items/Ak.png', 'Akash Photography software for a photography business'],
  // Graphic Design
  ['Vistaara Capital', '', TRADE, ['Logo Design'], 'Custom logo design created for Vistaara Capital. A clean brand mark that gives the business a professional identity.', '', 'Vistaara Capital logo design'],
  ['Kulfi Machi', '', TRADE, ['Logo Design'], 'Custom logo design for Kulfi Machi, a kulfi brand. A fresh brand presence with a logo that gives the brand its own identity.', '', 'Kulfi Machi kulfi brand website and logo design'],
].map(([name, location, industry, tags, description, path, alt, caseStudy]) => ({
  name, location, industry, tags, description, image: shot(path, alt), link: liveSite(name), case_study: caseStudy || '',
}));

const caseStudy = (name, industry, industry_icon, path, alt, heading, description, features, popup_description, challenge, solution, key_features, highlights) => ({
  name, industry, industry_icon, image: shot(path, alt), link: liveSite(name), heading, description,
  features: features.map(([icon, label]) => ({ icon, label })), popup_description, challenge, solution, key_features, highlights,
});

const projectsPage = [
  {
    key: 'hero', label: 'Hero Section',
    content: {
      eyebrow: 'VETRI IT SYSTEMS / OUR PROJECTS',
      title: 'Explore Our Digital Projects & Creative Solutions', highlight: 'Digital Projects', align: 'split',
      description: 'Discover how Vetri IT Systems delivers websites, mobile applications, custom software, digital marketing and graphic design solutions for businesses across industries.',
      button: { text: 'Talk to Our Team', link: '/contact' },
      secondary_button: { text: 'Explore Our Expertise', link: '/#services' },
      image: null,
      screens: [
        { name: 'Susee Hyundai', image: img('items/Susee.png', 'Susee Hyundai dealership website in Theni with test drive booking') },
        { name: 'Sashwanth Travels', image: img('items/saswanthtravels.png', 'Sashwanth Travels travel and tour packages website and logo design') },
        { name: 'Mount Dentalcare', image: img('items/mountdental.png', 'Mount Dentalcare dental clinic website in Chennai') },
        { name: 'Classic & Comfort Interiors', image: img('items/classic.png', 'Classic & Comfort Interiors interior design website in Chennai') },
        { name: 'Varahi Tours and Travels', image: img('items/varahi.png', 'Varahi Tours & Travels Madurai cab services and tour packages website') },
      ],
    },
  },
  { key: 'stats', label: 'Stats', content: STATS },
  {
    key: 'portfolio', label: 'Our Projects',
    content: {
      eyebrow: 'Our Work', title: 'Discover Our Digital Project Portfolio Across Five Services', highlight: 'Across Five Services',
      description: 'Browse our website development projects, digital marketing work, application and software solutions, and graphic design portfolio—all in one place.',
      search_placeholder: 'Search client projects...', all_label: 'All Projects',
      filters: [
        { icon: 'Bus', label: TRAVEL }, { icon: 'HeartPulse', label: HEALTH }, { icon: 'Car', label: AUTO },
        { icon: 'Factory', label: INDUSTRIAL }, { icon: 'Laptop', label: IT }, { icon: 'GraduationCap', label: EDU },
        { icon: 'House', label: HOME }, { icon: 'Globe', label: TRADE }, { icon: 'Users', label: COMMUNITY },
      ],
      items: projectItems,
    },
  },
  {
    key: 'case_studies', label: 'Case Study Carousel',
    content: {
      eyebrow: 'Client Case Studies', title: 'Digital Solutions That Address Real Business Needs', highlight: 'Real Business Needs',
      description: 'Discover selected client case studies, explore the challenges behind each project, and see how our digital solutions address specific business requirements across Tamil Nadu and beyond.',
      items: [
        caseStudy('Susee Hyundai', AUTO, 'Car', 'items/Susee.png', 'Susee Hyundai dealership website in Theni with test drive booking',
          'From Low Online Visibility to More Customer Enquiries',
          'A modern dealership website showcasing Hyundai cars, offers and test-drive options to drive customer enquiries.',
          [['Car', 'Car Models'], ['CalendarCheck', 'Test-Drive Requests'], ['MessageCircle', 'Enquiry Options']],
          'A modern dealership website helping customers explore Hyundai vehicles, services and test-drive options in Theni, with SEO improvements to increase Google Search visibility.',
          'Customers needed easy access to vehicle and dealership information, while the website needed better visibility in Google Search results.',
          'Vetri IT Systems developed a responsive dealership website and optimised it for relevant Hyundai dealership and local search terms. Google Search Console (GSC) was used to monitor search performance and visibility.',
          ['Hyundai vehicle information', 'Dealership service details', 'Test-drive enquiries', 'Contact and location information', 'On-page SEO optimisation', 'Local search keyword targeting'],
          ['Modern dealership presentation', 'Organised vehicle information', 'Improved Google Search visibility for targeted queries', 'Convenient enquiry journey']),
        caseStudy('MedEx Biomed', HEALTH, 'HeartPulse', 'items/Medex.png', 'MedEx biomedical engineering and healthcare technology website',
          'Make Complex Biomedical Services Easy to Understand',
          'A healthcare technology website showcasing biomedical equipment, technical services and support for medical facilities.',
          [['Stethoscope', 'Equipment Range'], ['Wrench', 'Technical Services'], ['Phone', 'Contact Options']],
          'A healthcare technology website presenting biomedical engineering services, telehealth products and equipment support for hospitals, diagnostic centers and clinics.',
          'Healthcare facilities needed a clear way to understand maintenance, calibration and telehealth offerings, and to reach the team quickly when equipment support was urgent.',
          'Vetri IT Systems built a structured website covering services, products and company information, with an AI assistant, quote form and WhatsApp contact for faster enquiries.',
          ['Biomedical equipment information', 'Product categories', 'Maintenance services', 'Calibration and repair information', 'Service enquiry options', 'Company contact details'],
          ['Healthcare-focused presentation', 'Organised product information', 'Structured service details', 'Accessible enquiry options']),
        caseStudy('CSAFE', INDUSTRIAL, 'Factory', 'items/Csafe.png', 'CSafe reflective safety jackets website',
          'Turn Safety Wear Browsing into Bulk Order Enquiries',
          'A product-focused website showcasing reflective safety wear, custom printing and bulk order options.',
          [['HardHat', 'Safety Wear Range'], ['Palette', 'Custom Branding'], ['Boxes', 'Bulk Enquiries']],
          'A product-focused website presenting reflective safety jackets in multiple GSM ranges, with custom printing and bulk supply for industrial buyers.',
          'Industrial buyers needed to compare many jacket specifications and find bulk supply and branding options without lengthy back-and-forth.',
          'Vetri IT Systems built a catalogue-style website organised by GSM, colour and jacket type, with product-level WhatsApp enquiry, a bulk quote form and industry-wise information.',
          ['Reflective safety jackets', 'Product specifications', 'Colour and GSM options', 'Custom printing information', 'Industry-specific product details', 'Bulk enquiry options'],
          ['Product-focused presentation', 'Organised safety-wear catalogue', 'Customisation information', 'Business enquiry pathway']),
        caseStudy('Classic Comfort Interior & Exterior', HOME, 'House', 'items/classic.png', 'Classic & Comfort Interiors interior design website in Chennai',
          'Turn Design Inspiration into Real Project Enquiries',
          'An interior design website showcasing residential, commercial and exterior solutions to attract prospective clients.',
          [['House', 'Home Interiors'], ['Building2', 'Office Spaces'], ['FileText', 'Project Quotes']],
          'An interior design website presenting kitchens, wardrobes, false ceilings and facade works for homeowners and businesses in Chennai.',
          'Prospective clients needed to see the full scope of interior and exterior work in one place and feel confident in the team before sharing their space requirements.',
          'Vetri IT Systems created a design-led website with service sections, a filterable project portfolio, a step-by-step design process and a service-based enquiry form.',
          ['Residential interior services', 'Commercial interior solutions', 'Kitchen and wardrobe information', 'Exterior design services', 'Project portfolio', 'Enquiry options'],
          ['Visual project showcase', 'Six-step design process', 'Single-team design-to-finish story', 'Homeowner and business testimonials']),
        caseStudy('Ironmeka', HOME, 'Shirt', 'items/ironmeka.png', 'Ironmeka website and logo design',
          'Discover Specialised Garment-Care Services Through a Clear Online Presence',
          'A coordinated website and logo design giving Ironmeka a clear, professional and recognisable brand presence.',
          [['Shirt', 'Garment-Care Services'], ['FileText', 'Service Information'], ['MessageCircle', 'Customer Enquiries']],
          'A coordinated website and logo design project giving Ironmeka, a garment-care business, a clear and recognisable brand presence online.',
          'Ironmeka needed customers to quickly understand its garment-care services and recognise the brand consistently across its website and visual identity.',
          'Vetri IT Systems designed the website and logo together, presenting service details clearly with simple ways for customers to get in touch.',
          ['Custom website design', 'Logo design', 'Business card design', 'Consistent brand visuals', 'Structured website content', 'Contact information'],
          ['Matching website and logo identity', 'Easy-to-scan service content', 'Print-ready business card', 'Consistent brand look']),
        caseStudy('Imaya Mercantile', TRADE, 'Ship', '', 'Imaya Mercantile export business website and logo design',
          'Connect Global Buyers with Indian Spices and Agricultural Exports',
          'An export-focused business website presenting Indian agricultural products, including turmeric, millets, jaggery and cardamom, to help prospective buyers explore the product range and connect with the business.',
          [['Boxes', 'Product Catalogue'], ['Ship', 'Export Focus'], ['Mail', 'Buyer Enquiries']],
          'An export-focused website presenting turmeric, black pepper, cardamom, jaggery and millets to international buyers, with a clear route to export enquiries.',
          'International buyers needed product specifications, packaging options and sourcing details in one place before approaching an Indian spice and agri exporter.',
          'Vetri IT Systems built a trade website with product overview pop-ups, a source-to-shipment process, a certification gallery section and a detailed buyer enquiry form.',
          ['Agricultural product information', 'Spice and millet categories', 'Product range presentation', 'Export business details', 'Custom logo design', 'Buyer enquiry options'],
          ['Spice and agri-product focus', 'Certification gallery section', 'Bulk-order buyer FAQs', 'Export-ready logo design']),
        caseStudy('TS Singing Arena', COMMUNITY, 'Music', 'items/tsing.png', 'TS Singing Arena singing competition and music events website in Chennai',
          'Bring Singing Talent and Event Opportunities into the Spotlight',
          'An event website presenting singing competitions, event details and participant registration opportunities.',
          [['Music', 'Singing Events'], ['Calendar', 'Event Information'], ['Users', 'Participation']],
          'A music community website for Chennai presenting singing competitions, past event highlights and registration support for singers of every age.',
          'Singers and parents needed one place to discover upcoming events, understand how online and offline competitions work and register with confidence.',
          'Vetri IT Systems built an event website with upcoming and past event tabs, a photo gallery, community testimonials, FAQs and WhatsApp registration support.',
          ['Singing competition information', 'Event details', 'Competition formats', 'Participant information', 'Event gallery', 'Registration and contact options'],
          ['No-age-limit inclusive messaging', 'Awards and recognition showcase', 'Founder story and community vision', 'Singer and parent FAQs']),
        caseStudy('London Indian Tamils', COMMUNITY, 'Users', 'items/london.png', 'London Indian Tamils community website in the UK',
          'Create a Digital Hub for the Tamil Community in London',
          'A community-oriented website designed to bring London-based Tamil community information, events and support opportunities together in one accessible online space.',
          [['Users', 'Community'], ['Sparkles', 'Cultural Events'], ['HeartHandshake', 'Membership & Support']],
          'A community website connecting Tamil-speaking Indians across London and the UK through events, networking, careers and cultural activities.',
          'Community activity was spread across WhatsApp conversations, making it hard for newcomers to discover events, opportunities and how to join.',
          'Vetri IT Systems built a community website with an about story, featured event bookings, founder and supporter messages, social links and a direct sign-up route.',
          ['Community information', 'Cultural activities', 'Event information', 'Membership details', 'Community updates', 'Contact and sign-up options'],
          ['Connect, Support, Celebrate theme', 'Founder and supporter messages', 'Instagram community moments', 'Tamil and English touches']),
        caseStudy('New Track India (NTTS)', TRAVEL, 'Bus', 'items/ntts.png', 'NTTS taxi booking website in Chennai',
          'Explore Local, Airport and Outstation Taxi Services in One Place',
          'A taxi-booking website presenting local rides, airport transfers, cab services, helping customers understand available travel options and navigate the booking process.',
          [['Car', 'Taxi Services'], ['Plane', 'Airport Transfers'], ['MapPin', 'Trip Options']],
          'A taxi-booking website presenting airport, outstation, one-way and local cab services with upfront fares and a simple online booking form.',
          'Travellers needed to compare vehicle types and fares and book the right ride without uncertainty about pricing or safety.',
          'Vetri IT Systems built a booking-focused website with a ride-type form, fleet and fare comparison, a three-step booking guide and rider safety information.',
          ['Local taxi services', 'Airport transfers', 'Outstation travel options', 'Fleet information', 'Fare and package details', 'Booking enquiry options'],
          ['Verified-driver and safety information', 'Live tracking and SOS highlights', 'Rider reviews and FAQs', 'Corporate mobility background']),
      ],
    },
  },
  {
    key: 'contact_cta', label: 'Final CTA',
    content: {
      title: 'Your Next Big Idea Starts with the Right Digital Partner', highlight: 'the Right Digital Partner',
      description: 'From websites and applications to marketing, software and graphic design, let\'s explore the right solution for your business.',
      button: { text: 'Talk to Our Team', link: '/contact' }, whatsapp_text: 'WhatsApp Us', show_contact: true,
    },
  },
  {
    key: 'faq', label: 'Frequently Asked Questions',
    content: {
      title: 'Frequently Asked Questions', highlight: 'Questions',
      items: [
        { question: 'What services does Vetri IT Systems offer?', answer: 'Vetri IT Systems offers website development, mobile app development, custom software development, digital marketing and graphic design services.' },
        { question: 'What projects has Vetri IT Systems worked on?', answer: 'Our portfolio includes business websites, booking platforms, mobile applications, custom software solutions, digital marketing work and graphic design projects across different industries.' },
        { question: 'Do you develop mobile apps?', answer: 'Yes. We develop Android applications, including solutions for retail point-of-sale and telehealth use cases.' },
        { question: 'Do you build websites with online booking?', answer: 'Yes. We develop booking-focused websites for businesses that need customers to explore services and submit bookings or enquiries online.' },
        { question: 'Do you build custom software for businesses?', answer: 'Yes. We develop custom software based on business requirements, including solutions designed to help organise business workflows.' },
        { question: 'Do you offer digital marketing?', answer: 'Yes. Our digital marketing services include SEO and social media marketing, depending on the client\'s requirements.' },
        { question: 'How can I discuss a project with Vetri IT Systems?', answer: 'Click “Talk to Our Team” to discuss your requirements with Vetri IT Systems.' },
      ],
    },
  },
];

const productsPage = [
  {
    key: 'hero', label: 'Hero Banner',
    content: {
      eyebrow: 'Proprietary Enterprise Products',
      title: 'Business Software That Makes Everyday Work Easier', highlight: 'Everyday Work Easier', align: 'left',
      description: 'Vetri IT Systems offers practical business software solutions that help simplify everyday operations. Explore Vetri Bills for invoicing, VTMS for training management and Vetri Files for PDF and document tasks.',
      image: img('sections/products.png', 'Vetri Products business software'),
      button: { text: 'Explore Our Products', link: '#products' },
    },
  },
  {
    key: 'products', label: 'Our Products',
    content: {
      eyebrow: 'Vetri Products', title: 'Explore Software Solutions for Everyday Business Needs', highlight: 'Everyday Business Needs',
      description: 'Smart tools to simplify your everyday business operations.',
      items: [
        {
          icon: 'Receipt', name: 'Vetri Bills', chips: ['GST Invoices', 'Inventory'],
          summary: 'Billing software to create GST invoices, manage invoices and keep your business organised.',
          image: img('items/bill.png', 'Vetri Bills software dashboard showing sales overview and recent invoices'),
          video: video('product-videos/Vetri_Billing_Eng__gaT0SpI._2.mp4', 'Shopkeeper reviewing records at her counter in the Vetri Billing introduction video'),
          primary_text: 'Talk to Our Team', primary_link: '/contact', secondary_text: 'Learn More', secondary_link: '#faqs',
        },
        {
          icon: 'GraduationCap', name: 'VTMS', chips: ['Training Batches', 'Attendance', 'Trainee Progress'],
          summary: 'Training management system to manage training batches, attendance and trainee progress.',
          image: img('items/download.png', 'VTMS training management system dashboard showing active batches, trainees and attendance rate'),
          video: video('product-videos/VTMS_Product_demo_Video_with_story_telling.mp4', 'Professional working with spreadsheets in an office in the VTMS introduction video'),
          primary_text: 'Talk to Our Team', primary_link: '/contact', secondary_text: 'Learn More', secondary_link: '#faqs',
        },
        {
          icon: 'FileText', name: 'Vetri Files', chips: ['Compress', 'Merge', 'Split', 'Sign', 'Lock', 'Convert'],
          summary: 'Online PDF tools to compress, merge, split, sign, lock and convert your documents.',
          image: img('items/files.png', 'Vetri Files document tools screen with compress, signature, lock, merge and split PDF options'),
          video: video('product-videos/VETRI_FILES__1.mp4', 'Man stressed by scattered PDF, audio and image files in the Vetri Files introduction video'),
          primary_text: 'Talk to Our Team', primary_link: '/contact', secondary_text: 'Learn More', secondary_link: '#faqs',
        },
      ],
    },
  },
  {
    key: 'why', label: 'Why Choose Vetri Products',
    content: {
      eyebrow: 'Why Vetri Products', title: 'Why Choose Vetri Products?', highlight: 'Vetri Products?',
      description: 'Vetri products are built by Vetri IT Systems, an IT solutions company from Tamil Nadu, India, to make daily business work simpler.',
      items: [
        { icon: 'Briefcase', title: 'Practical business software', description: 'Each product is designed around a real everyday task: billing, training management or document handling.' },
        { icon: 'LayoutTemplate', title: 'Built for everyday business management', description: 'Our business management software products help you keep invoices, training records and documents organised.' },
        { icon: 'Zap', title: 'Less manual work', description: 'Our software solutions aim to reduce repetitive tasks and support workflow automation and business automation in daily operations.' },
        { icon: 'Layers', title: 'Software from one team', description: 'Billing software, a training management system and online PDF tools, all from Vetri IT Systems.' },
        { icon: 'Users', title: 'Talk to the team that builds it', description: 'Discuss your requirement directly with Vetri IT Systems.' },
      ],
    },
  },
  {
    key: 'ecosystem', label: 'How the Products Work Together',
    content: {
      title: 'One Ecosystem, Different Business Needs', highlight: 'Different Business Needs',
      description: 'Vetri IT Systems offers products to simplify everyday business operations:',
      center: 'Vetri IT Systems',
      items: [
        { icon: 'Receipt', title: 'Vetri Bills', description: 'Manage billing and invoices.' },
        { icon: 'GraduationCap', title: 'VTMS', description: 'Manage training batches, attendance, and trainee progress.' },
        { icon: 'FileText', title: 'Vetri Files', description: 'Handle PDF and document-related tasks.' },
        { icon: 'Wrench', title: 'Custom Solutions', description: 'Contact our team to discuss your specific business requirements.' },
      ],
    },
  },
  {
    key: 'custom', label: 'Custom Product Development',
    content: {
      eyebrow: 'Custom Product Development', title: 'Need Custom Business Software Built Around Your Workflow?', highlight: 'Built Around Your Workflow?',
      description: 'Every business works in its own way. Along with our ready products, Vetri IT Systems develops custom software products built around your requirements. Whether you need custom business software to manage daily operations or a tailor-made tool for your team, we can develop it for you.',
      points: ['Custom software development for your business needs', 'Custom business software built around your way of working', 'Develop a new product or extend a ready-made one'],
      button: { text: 'Discuss Your Custom Requirement', link: '#enquiry' },
      image: null,
    },
  },
  {
    key: 'industry_cards', label: 'Industries We Serve',
    content: {
      eyebrow: 'Industries We Serve', title: 'Business Software for Different Industry Needs', highlight: 'Different Industry Needs',
      description: 'Vetri IT Systems builds practical business software for organisations that need simple tools for their daily work.',
      items: [
        { icon: 'ShoppingCart', title: 'Retail & Trading', description: 'Billing software with GST invoices and inventory for shops and traders.' },
        { icon: 'GraduationCap', title: 'Training & Education', description: 'A training management system to manage batches, attendance and trainee progress for training institutes.' },
        { icon: 'Building2', title: 'Offices & Professional Services', description: 'Online PDF tools to compress, merge, split, sign and convert documents.' },
        { icon: 'Wrench', title: 'Custom Solutions for Any Industry', description: 'Tell us your requirement and we will develop a custom product around it.' },
      ],
    },
  },
  {
    key: 'faq', label: 'Product FAQs',
    content: {
      title: 'Vetri Products: Frequently Asked Questions', highlight: 'Frequently Asked Questions',
      items: [
        { question: 'What is Vetri Bills?', answer: 'Vetri Bills is billing software from Vetri IT Systems. It helps you simplify billing, manage invoices and keep your business organised.' },
        { question: 'Can I create GST invoices with Vetri Bills?', answer: 'Yes. GST invoices are one of the key features shown for Vetri Billing. Contact our team to discuss your billing requirements.' },
        { question: 'What can I manage with VTMS?', answer: 'VTMS is a training management system. It helps you manage training batches, attendance and trainee progress.' },
        { question: 'Which PDF tools does Vetri Files offer?', answer: 'Vetri Files includes tools to compress PDF, add signature, lock PDF, unlock PDF, merge PDFs, split PDF, convert Word to PDF, convert Word to HTML and extract text from scanned documents. It also has image tools.' },
        { question: 'How do I choose the right Vetri product?', answer: 'Choose Vetri Billing for billing and invoices, VTMS for training management, and Vetri Files for document tools. If you are not sure, talk to our team and we will help you decide.' },
        { question: 'Can Vetri IT Systems develop a custom product for my business?', answer: 'Yes. Along with Vetri Billing, VTMS and Vetri Files, we develop custom software products around your business requirements. Use the enquiry form or call us on 8438781327 to discuss your idea.' },
        { question: 'How can I discuss a product with Vetri IT Systems?', answer: 'Click Discuss This Product on any product card, or use the enquiry form below. You can also call us on 8438781327.' },
      ],
    },
  },
  {
    key: 'enquiry', label: 'Enquiry Form',
    content: {
      title: 'Find the Right Business Software for Your Team', highlight: 'Business Software',
      description: 'Let’s build a solution around the way your business works. Tell us what you need and our team will get back to you.',
      image: img('sections/Vetri_Products.gif', 'Vetri Products dashboards for Vetri Billing, VTMS and Vetri Files'),
      requirement_label: 'Product', requirements: ['Vetri Bills', 'VTMS', 'Vetri Files', 'Custom Software'],
      budgets: [],
      button_text: 'Enquire Now', whatsapp_text: 'Talk to Our Team',
      success_message: 'Thank you! Our team will contact you shortly.',
    },
  },
];

// About page: live layout (light hero with illustration, mission/vision with image, principles, process, FAQ)
// with copy and newly added sections (leadership, team) from the About SEO content document.
// Milestones are left out: the document only has placeholder years and says to remove them unless verified.
const aboutPage = [
  {
    key: 'hero', label: 'Hero Banner',
    content: {
      eyebrow: 'About Vetri IT Systems (VIS)',
      title: 'IT Solutions That Move Your Business Forward', highlight: 'Your Business Forward', align: 'split',
      description: 'Vetri IT Systems Private Limited is an IT solutions company based in Surandai, Tamil Nadu. We develop custom websites, mobile apps and business software to help companies streamline operations, improve customer experiences and grow with confidence.',
      description_2: 'From planning to development, we focus on practical solutions, transparent pricing and clear communication.',
      tags: ['Zero Generic Templates', 'Engineered for Scale', '100% Code Ownership'],
      image: img('reference/about-hero.png', 'Vetri IT Systems team working on website and software projects'),
      button: { text: 'Talk to Our Team', link: '/contact' },
    },
  },
  {
    key: 'leadership', label: 'Leadership',
    content: {
      eyebrow: 'Leadership', title: 'Meet the People Leading Vetri IT Systems', highlight: 'Leading Vetri IT Systems',
      description: 'Vetri IT Systems Private Limited is supported by leadership that brings together business planning, operational direction and a focus on practical technology solutions. The aim is to understand client needs, build dependable working relationships and help the business grow sustainably.',
      items: [
        {
          name: 'Pravin Kumar P', role: 'Founder - Vetri Companies Management', photo: null,
          description: 'Provides overall direction for Vetri Companies Management, helping shape business priorities, partnerships and long-term plans. In relation to Vetri IT Systems, this includes supporting the company’s focus on practical digital solutions and client requirements.',
        },
        {
          name: 'Punitha V', role: 'MD & CEO - Vetri Companies Management', photo: null,
          description: 'Supports business operations and planning across Vetri Companies Management, with attention to team coordination, consistent processes and the progress of key business initiatives. For Vetri IT Systems, this direction helps keep service delivery and business goals aligned.',
        },
      ],
    },
  },
  {
    key: 'mission', label: 'Mission & Vision',
    content: {
      eyebrow: 'Engineering With Purpose', title: 'Our Mission and Vision', highlight: 'Mission and Vision', description: '',
      image: img('reference/about-mission.png', 'Illustration showing the mission and vision of Vetri IT Systems'),
      items: [
        { icon: 'Target', title: 'Our Vision', description: 'To become a trusted technology partner for businesses by delivering innovative digital solutions that simplify work and support sustainable growth.' },
        { icon: 'Rocket', title: 'Our Mission', description: 'To build practical, reliable and affordable technology solutions that help businesses work smarter, serve customers better and grow with confidence.' },
      ],
    },
  },
  {
    key: 'why', label: 'Why Choose Vetri IT Systems',
    content: {
      eyebrow: 'Why VIS', title: 'Why Businesses Choose Vetri IT Systems', highlight: 'Vetri IT Systems',
      description: 'We focus on understanding your business needs and delivering technology solutions that create practical value.',
      items: [
        { icon: 'BadgeIndianRupee', title: 'Transparent Pricing', description: 'Clear project costs and scope before work begins.' },
        { icon: 'Layers', title: 'Multiple IT Services', description: 'Website development, mobile apps, software development and digital marketing to support different business needs.' },
        { icon: 'Boxes', title: 'Software Product Development', description: 'Experience in developing business software products, including Vetri Bills and Vetri Files.' },
        { icon: 'HeartHandshake', title: 'Clear Communication', description: 'Direct communication to discuss project requirements, updates and feedback.' },
        { icon: 'LifeBuoy', title: 'Ongoing Support', description: 'Maintenance and improvements based on your project requirements and support agreement.' },
      ],
    },
  },
  {
    key: 'process', label: 'Our Process',
    content: {
      eyebrow: 'Our Process', title: 'How We Turn Business Needs into Digital Solutions', highlight: 'Digital Solutions',
      description: 'We follow a structured process to understand your requirements, plan the right solution and deliver your project efficiently. Our IT consulting services help clarify the project scope, priorities and suitable approach before development begins.',
      steps: [
        { icon: 'Lightbulb', title: 'Understand', description: 'Learn about your business, target audience and goals.' },
        { icon: 'Target', title: 'Plan', description: 'Define the project scope, suitable solution, timeline and budget.' },
        { icon: 'PenTool', title: 'Design', description: 'Prepare the user interface and project flow based on your requirements.' },
        { icon: 'Code2', title: 'Develop & Test', description: 'Build the solution and test its functionality.' },
        { icon: 'Rocket', title: 'Launch', description: 'Deploy the completed project and provide the necessary handover.' },
        { icon: 'LifeBuoy', title: 'Support', description: 'Help with maintenance and future improvements based on agreed requirements.' },
      ],
    },
  },
  {
    key: 'team', label: 'Our Team',
    content: {
      eyebrow: 'Our Team', title: 'The Team Behind Your Digital Solutions', highlight: 'Digital Solutions',
      description: 'Our team brings together development, design and digital marketing skills to help businesses choose and build solutions suited to their goals. From website and app projects to custom software, we work collaboratively to keep the requirements, user experience and delivery plan aligned.',
      points: ['Web Development', 'Mobile App Development', 'Software Development', 'UI/UX Design', 'Digital Marketing'],
      button: { text: '', link: '' },
      image: img('sections/aboutimg.png', 'The Vetri IT Systems team at the Surandai office'),
    },
  },
  {
    key: 'faq', label: 'FAQs',
    content: {
      title: 'IT Solutions FAQs: About Vetri IT Systems', highlight: 'About Vetri IT Systems',
      items: [
        { question: 'What does Vetri IT Systems do?', answer: 'Vetri IT Systems is an IT solutions company based in Surandai, Tamil Nadu, providing website, mobile app, Custom software development, and Digital Marketing services for businesses.' },
        { question: 'Where is Vetri IT Systems located?', answer: 'Vetri IT Systems is located in Surandai, Tamil Nadu, India.' },
        { question: 'What services does Vetri IT Systems offer?', answer: 'We offer website development, mobile app development, software development, UI/UX design, digital marketing and AI solutions.' },
        { question: 'Does Vetri IT Systems provide customized software solutions?', answer: 'Yes, we develop software solutions tailored to your business needs, workflows and specific requirements.' },
        { question: 'What software products does Vetri IT Systems offer?', answer: 'Our products include Vetri Bills and Vetri Files, designed to support business operations and improve workflow efficiency.' },
        { question: 'How can I start a project with Vetri IT Systems?', answer: 'Contact our team through our website to discuss your requirements and find the right technology solution for your business.' },
      ],
    },
  },
  {
    key: 'cta', label: 'Call To Action',
    content: {
      eyebrow: 'Let’s Collaborate', title: 'Let’s Build the Right Digital Solution for Your Business', subtitle: '',
      description: 'Have a website, mobile app or software idea? Tell us about your project, and our team will help you explore the right technology solution for your business.',
      image: img('cta.png', 'Start your website, app or software project with Vetri IT Systems'),
      primary_button: { text: 'Start Your Project', link: '/contact' },
      secondary_button: { text: 'Chat on WhatsApp', link: 'https://wa.me/918438781327' },
    },
  },
];

// Contact page: live layout (light hero, consultation form + direct contact card) with the Contact SEO
// document copy and its newly added sections (office map, contact FAQs).
const OFFICE_ADDRESS = 'VTS & VIS, Shanthi Complex, Surandai Old Market, Near Surandai Bus Stand, Surandai - 627859, Tenkasi District, Tamil Nadu';
const MAP_QUERY = encodeURIComponent('Shanthi Complex, Surandai Old Market, Near Surandai Bus Stand, Surandai, Tamil Nadu 627859');

const contactPage = [
  {
    key: 'hero', label: 'Hero Banner',
    content: {
      eyebrow: 'Start a Conversation',
      title: 'Let’s Build Something Great Together.', highlight: 'Great Together.', align: 'split',
      description: 'Have a website, mobile app, software platform or digital marketing requirement in mind? Share your goals with the senior engineering team at Vetri IT Systems, an IT solutions company in Surandai, Tamil Nadu, and receive an architectural roadmap and proposal.',
      tags: [],
      badges: [{ icon: 'MessageCircle', text: 'Quick reply' }, { icon: 'Mail', text: 'Free estimate' }, { icon: 'Phone', text: 'Call us' }, { icon: 'Clock', text: 'Mon – Sat' }],
      image: img('reference/contact-team.png', 'Vetri IT Systems Customer support executive assisting a client with a project enquiry'),
      button: { text: 'Start Your Enquiry', link: '#contact-form' },
    },
  },
  {
    key: 'contact', label: 'Consultation Form & Contact Details',
    content: {
      form_title: 'Project Consultation Form',
      form_intro: 'Tell us about your project, and our team will connect you with the right specialists for website development, mobile apps, custom software or digital marketing. One enquiry is all it takes to get started.',
      services: ['Website Development', 'Mobile App Development', 'Software Development', 'Digital Marketing', 'Vetri Products', 'Others'],
      button_text: 'Submit Project Enquiry',
      success_message: 'Thank you for contacting Vetri IT Systems. Our team will review your project details and get back to you shortly.',
      details_title: 'Direct Contact Coordinates',
      phones: ['8438781327', '7397654827'],
      whatsapp: '918438781327',
      office_title: 'Visit Our Office in Surandai, Tenkasi',
      office_name: 'Vetri IT Systems Pvt Ltd',
      address: OFFICE_ADDRESS,
      hours: 'Monday – Saturday: 10:00 AM – 6:00 PM IST',
    },
  },
  {
    key: 'map', label: 'Visit Our Office (Map)',
    content: {
      eyebrow: 'Find Us', title: 'Visit Our Office in Surandai, Tenkasi', highlight: 'Surandai, Tenkasi',
      description: 'Our office is at Shanthi Complex, Surandai Old Market, near Surandai Bus Stand in Tenkasi District. Visit us between 10:00 AM and 6:00 PM IST, Monday to Saturday, to discuss your project in person.',
      address: OFFICE_ADDRESS,
      hours: 'Monday – Saturday: 10:00 AM – 6:00 PM IST',
      phone: '8438781327',
      map_embed: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
      map_title: 'Map showing the Vetri IT Systems office in Surandai, Tenkasi District',
      button: { text: 'Get Directions', link: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}` },
    },
  },
  {
    key: 'faq', label: 'Contact FAQs',
    content: {
      eyebrow: 'QUICK ANSWERS', title: 'Frequently Asked Questions About Contacting Us', highlight: 'Contacting Us',
      items: [
        { question: 'How can I contact Vetri IT Systems Surandai?', answer: 'Call or WhatsApp 8438781327 or 7397654827, visit our office near Surandai Bus Stand, or submit the project consultation form on this page.' },
        { question: 'What are your working hours?', answer: 'We are available Monday to Saturday, 10:00 AM to 6:00 PM IST.' },
        { question: 'Which services can I enquire about?', answer: 'You can enquire about website development, mobile app development, software development and digital marketing. Choose the service in the form and describe your goals.' },
        { question: 'What happens after I submit the form?', answer: 'Our senior engineering team reviews your requirements and responds with a free technical estimation and timeline, followed by an architectural roadmap and proposal.' },
        { question: 'Can I enquire if I only have an idea?', answer: 'Yes. Describe your project, target audience and goals in the form, and our team will help shape the requirements with you.' },
        { question: 'Do you work with businesses outside Tamil Nadu?', answer: 'Yes. We work with businesses across India and beyond, and you can reach us by call, WhatsApp or the enquiry form.' },
      ],
    },
  },
];

export const servicePages = {
  // Placeholder until the Graphic Designing SEO content is ready; edit or add sections in the admin
  // Graphic Designing: copy from the corrected Graphic Design SEO content document
  'graphic-designing': [
    {
      key: 'hero', label: 'Hero Section',
      content: {
        title: 'Logo, Visiting Card & Brochure Design Services for Your Business', highlight: 'Brochure Design Services', align: 'split',
        description: 'Vetri IT Systems offers logo design services, professional visiting card design and business brochure design. Every design is created around your business name, industry and brand colours.',
        tags: ['100% Customized Designs', 'Final Files in PDF & JPG'],
        button: { text: 'Get a Quote', link: '#enquiry' },
        image: null,
        art: 'hero', art_alt: 'Graphic designer creating a custom logo, visiting card and brochure design',
      },
    },
    {
      key: 'offerings', label: 'Our Graphic Design Services',
      content: {
        eyebrow: 'Our Graphic Design Services', title: 'Logo, Visiting Card & Brochure Design Services', highlight: 'Brochure Design Services',
        description: 'From a recognizable logo to a professional first impression, our design services help keep your business materials visually consistent.',
        items: [
          {
            art: 'logo', art_alt: 'Custom logo design for a business by Vetri IT Systems', icon: 'PenTool', title: 'Custom Logo Design',
            description: 'Get a custom logo design created around your business name, industry and identity. Whether you need a business logo design for a new business or a company logo design for an existing one, the design is made specifically for you.',
            features: ['Customized logo design', 'A unique design concept tailored to your business', 'Final files in PDF and JPG formats'],
          },
          {
            art: 'card', art_alt: 'Professional visiting card design front and back', icon: 'BadgeCheck', title: 'Professional Visiting Card Design',
            description: 'Make a strong first impression with a professional visiting card design. Our company visiting card design presents your business name and contact details clearly.',
            features: ['Business card design with front and back', 'Business name and contact details', 'Design coordinated with your logo and brand colours', 'Final files in PDF and JPG formats'],
          },
          {
            art: 'brochure', art_alt: 'Business brochure design in A5 four-page format', icon: 'FileText', title: 'Business Brochure Design',
            description: 'Share your business information, products and services with a customized, professional brochure design created to present your business clearly.',
            features: ['A5 brochure design', 'Customized layout and design', 'Business information and service highlights', 'Consistent brand colours and visual style', 'Final files in PDF and JPG formats'],
          },
        ],
      },
    },
    {
      key: 'packages', label: 'Design Package',
      content: {
        eyebrow: 'Design Package', title: 'Affordable Logo, Visiting Card & Brochure Design Package', highlight: 'Design Package',
        description: 'Get three essential design services together in one package: a custom logo, a front-and-back visiting card and a four-page A5 brochure.',
        layout: 'wide',
        plans: [
          {
            name: 'Logo, Visiting Card & Brochure Design Package', price: '₹2,000', price_note: 'Package Price',
            features: ['1 customized logo design', '1 business visiting card design (front and back)', '1 A5 brochure design (4 pages)', 'Final files in PDF and JPG formats'],
            note: 'Additional charges: Extra brochure pages – ₹250 per page. Changes after final approval are charged separately. Printing charges are not included.',
            secondary_text: 'Download Brochure', secondary_link: '/media/brochures/graphic-design-brochure.png',
            button_text: 'Get This Package', button_link: '#enquiry', featured: true,
            art: 'package', art_alt: 'Logo, visiting card and brochure design package',
          },
        ],
      },
    },
    {
      // the Graphic Design package flyer, shown as a preview with a Download Brochure button
      key: 'brochure', label: 'Brochure Download',
      content: {
        title: 'Download Graphic Designing Brochure', highlight: 'Designing Brochure',
        description: 'Explore our graphic designing services, capabilities and solutions in our company brochure.',
        button_text: 'Download Brochure', link: '', files: BROCHURE_FILES['graphic-designing'],
        book_label: 'VIS', book_title: 'Graphic Designing', book_caption: 'COMPANY BROCHURE',
      },
    },
    {
      key: 'why', label: 'Why Choose Vetri IT Systems?',
      content: {
        eyebrow: 'Why Choose Vetri IT Systems?', title: 'What You Get with Vetri IT Systems', highlight: 'Vetri IT Systems',
        items: [
          { icon: 'Sparkles', title: '100% Customized Designs', description: 'Designs are created to reflect your business identity, not ready-made templates.' },
          { icon: 'Layers', title: 'Consistent Business Identity', description: 'Keep your logo, visiting card and brochure aligned with the same visual style.' },
          { icon: 'Award', title: 'Professional Design Output', description: 'Business details and service highlights are arranged in a clear, organized layout.' },
          { icon: 'BadgeIndianRupee', title: 'Affordable Package', description: 'Logo design, visiting card design and brochure design together for ₹2,000.' },
          { icon: 'ClipboardCheck', title: 'Clear Scope', description: 'The package covers design services. Printing charges are not included.' },
        ],
      },
    },
    {
      // Hidden until real, client-approved work images are uploaded (per the content document)
      key: 'clients', label: 'Our Work', inactive: true,
      content: {
        eyebrow: 'Our Work', title: 'Graphic Design Work for Businesses', highlight: 'for Businesses',
        description: 'Showcase selected logo designs, visiting card designs and brochure designs created for clients.',
        items: [
          // sample images (items/gd-sample-*.png) until the client-approved work is uploaded in the admin
          ['Kulfi Machi', 'Custom Logo Design', 'Kulfi Machi logo design', 'gd-sample-kulfi-machi.png'],
          ['Ironmeka', 'Custom Logo Design', 'Ironmeka logo design', 'ironmeka-logo.png'], // real logo
          ['Ironmeka', 'Business Visiting Card Design', 'Ironmeka business card design', 'gd-sample-ironmeka-card.png'],
          ['Imaya Mercantile', 'Custom Logo Design', 'Imaya Mercantile logo design', 'gd-sample-imaya-mercantile.png'],
          ['Sashwanth Travels', 'Custom Logo Design', 'Sashwanth Travels logo design', 'gd-sample-sashwanth-travels.png'],
          ['Vistaara Capital', 'Custom Logo Design', 'Vistaara Capital logo design', 'gd-sample-vistaara-capital.png'],
        ].map(([name, category, alt, file]) => ({ image: img(`items/${file}`, alt), name, location: '', category, description: '', link: '' })),
      },
    },
    {
      key: 'process', label: 'Our Design Process',
      content: {
        eyebrow: 'Our Design Process', title: 'How Our Design Process Works', highlight: 'Design Process',
        steps: [
          { icon: 'Search', title: 'Discover', description: 'Understand your business, industry and design requirements.' },
          { icon: 'FileText', title: 'Collect Details', description: 'Receive your business name, contact information, content, images and preferred brand colours.' },
          { icon: 'Palette', title: 'Design', description: 'Create your customized logo, visiting card and brochure designs aligned with your business identity.' },
          { icon: 'BadgeCheck', title: 'Review & Approval', description: 'Share the designs with you for review and approval.' },
          { icon: 'Send', title: 'Finalize', description: 'Deliver the approved files in PDF and JPG formats.' },
        ],
      },
    },
    {
      key: 'tools', label: 'Design Capabilities',
      content: {
        eyebrow: 'Design Capabilities', title: 'Design Solutions for Your Business', highlight: 'Your Business',
        description: 'Our package covers logo design, visiting card design and brochure design for businesses. This includes business logo design, company logo design, business card design, professional visiting card design, business brochure design and company profile brochure design.',
        items: ['Business Logo Design', 'Company Logo Design', 'Business Card Design', 'Professional Visiting Card Design', 'Business Brochure Design', 'Company Profile Brochure Design'],
        art: 'profile', art_alt: 'Company profile brochure design for a business',
      },
    },
    {
      key: 'industries', label: 'Who Is This Package For?',
      content: {
        eyebrow: 'Who Is This Package For?', title: 'Graphic Design Services for Every Business', highlight: 'Every Business',
        description: 'Our graphic design package is ideal for startups, small businesses, retail shops, professional service providers, IT companies, freelancers and entrepreneurs looking to build a consistent brand identity with custom logo designs, professional visiting cards and business brochures.',
        items: ['Startups', 'Small Businesses', 'Retail Shops', 'Professional Service Providers', 'IT Companies', 'Freelancers', 'Entrepreneurs'],
        art: 'audience', art_alt: 'Startups, shops and freelancers building a consistent brand identity',
      },
    },
    {
      key: 'faq', label: 'Frequently Asked Questions',
      content: {
        title: 'Frequently Asked Questions', highlight: 'Questions',
        items: [
          { question: 'What design services does Vetri IT Systems offer?', answer: 'Our current package includes custom logo design, front-and-back visiting card design and A5 brochure design.' },
          { question: 'How much does the design package cost?', answer: 'The complete package costs ₹2,000. It includes one customized logo, one front-and-back business visiting card design and one four-page A5 brochure design.' },
          { question: 'What is included in the logo design service?', answer: 'One customized logo design tailored to your business identity, with final files provided in PDF and JPG formats.' },
          { question: 'Do you provide professional visiting card design?', answer: 'Yes. The package includes one business visiting card design with front and back layouts, your business details and styling coordinated with your logo and brand colours.' },
          { question: 'What brochure design do you provide?', answer: 'The package includes one customized A5 brochure design with business information and service highlights.' },
          { question: 'Do you offer brochure design and printing?', answer: 'We provide the design. Printing charges are not included in the package.' },
          { question: 'Can I add more brochure pages?', answer: 'Yes. Additional brochure pages cost ₹250 per page.' },
          { question: 'What if I need changes after final approval?', answer: 'Changes after final approval are charged separately.' },
        ],
      },
    },
    {
      key: 'enquiry', label: 'Final CTA & Enquiry Form',
      content: {
        title: 'Ready to Give Your Business a Professional Look?', highlight: 'a Professional Look?',
        description: 'Get custom logo design, visiting card design and brochure design from Vetri IT Systems. Contact our team to get started with the ₹2,000 design package.',
        image: img('cta.png', 'Design team discussing a project'),
        business_field: true, business_label: 'Business Name',
        requirement_label: 'Required Design Service',
        requirements: ['Logo, Visiting Card & Brochure Design Package', 'Custom Logo Design', 'Professional Visiting Card Design', 'Business Brochure Design', 'Extra Brochure Pages'],
        budgets: [],
        brochure_text: 'Download Brochure', brochure_link: '/media/brochures/graphic-design-brochure.png',
        button_text: 'Get This Package', whatsapp_text: '',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],

  contact: contactPage,
  about: aboutPage,
  solutions: productsPage,
  projects: projectsPage,
  // Website Development: copy from the revised Website Development SEO content document
  'website-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Custom Website Development That Drives Business Growth', highlight: 'Drives Business Growth', align: 'center',
        description: 'We design and develop professional, mobile-friendly websites that help businesses build an online presence, showcase services and generate enquiries.',
        image: img('sections/8b92283e-2871-4d7c-8f0d-ddc58eae6d77.png', 'Team working on website development and digital solutions'),
        button: { text: 'Get a Quote', link: '#enquiry' },
      },
    },
    {
      key: 'stats', label: 'Stats',
      content: {
        items: [
          { value: '50+', label: 'Digital Solutions' },
          { value: '99.4%', label: 'On-Time Delivery' },
          { value: '30+', label: 'Engineers & Designers' },
          { value: '5+', label: 'Countries Served' },
        ],
      },
    },
    {
      key: 'services', label: 'Our Services',
      content: {
        eyebrow: 'Our Services', title: 'Website Development Services Built Around Your Business', highlight: 'Built Around Your Business', layout: 'tiles',
        description: 'From simple websites to custom web applications, we build digital solutions tailored to your business needs.',
        items: [
          { icon: 'Briefcase', title: 'Business Website', description: 'Professional websites to showcase your business and services.' },
          { icon: 'ShoppingCart', title: 'E-commerce Website', description: 'Online stores with product catalogues and payment integration.' },
          { icon: 'Award', title: 'Portfolio Website', description: 'Showcase your work and achievements online.' },
          { icon: 'LayoutTemplate', title: 'Landing Page', description: 'Focused pages designed to generate enquiries.' },
          { icon: 'Code2', title: 'Web Application', description: 'Custom dashboards, portals and business tools.' },
          { icon: 'Calendar', title: 'Booking Website', description: 'Online appointment and service booking solutions.' },
        ],
      },
    },
    {
      key: 'pricing', label: 'Website Development Pricing',
      content: {
        eyebrow: 'Website Development Pricing', title: 'Website Development Packages & Pricing', highlight: 'Packages & Pricing', layout: 'showcase',
        plans: [
          {
            tag: 'Starter', icon: 'LayoutTemplate', name: 'Single-Page Website', price: '₹3,000 + GST',
            features: ['1 year Server Hosting', '1 year Domain Free', 'Basic contact integration', 'Mobile Responsive Design', 'No Payment Gateway'],
            secondary_text: 'Download Brochure', secondary_link: '/media/brochures/landing-page-brochure.pdf',
            button_text: 'Get This Package', button_link: '#enquiry',
          },
          {
            tag: 'Business', icon: 'Settings2', name: 'Service-Based Website', price: 'Starting at ₹10,000 + GST',
            features: ['Up to three pages', 'Service catalogue', 'Contact forms', 'Additional features as agreed'],
            button_text: 'Book Now', button_link: '#enquiry', featured: true,
          },
          {
            tag: 'Advanced', icon: 'Code2', name: 'Custom Website', price: '₹10,000–₹15,000 + GST',
            features: ['Custom design and functionality', 'Service or product catalogue', 'Optional integrations based on scope'],
            button_text: 'Get a Quote', button_link: '#enquiry',
          },
        ],
      },
    },
    {
      key: 'why', label: 'Why Choose Vetri IT Systems?',
      content: {
        eyebrow: 'Why Choose Vetri IT Systems?', title: 'Why Businesses Choose Vetri IT Systems for Web Development', highlight: 'Vetri IT Systems',
        items: [
          { icon: 'ClipboardCheck', title: 'Reliable Delivery', description: 'Structured development and project planning.' },
          { icon: 'Server', title: 'Domain & Server', description: 'One year included in eligible packages.' },
          { icon: 'MonitorSmartphone', title: 'Responsive Design', description: 'Websites for mobile, tablet and desktop.' },
          { icon: 'Search', title: 'SEO-Friendly Structure', description: 'Search-friendly page structure and metadata.' },
          { icon: 'LifeBuoy', title: 'Ongoing Support', description: 'Maintenance and updates based on your support plan.' },
          { icon: 'Building2', title: 'Industry Experience', description: 'Website solutions for businesses across multiple industries.' },
        ],
      },
    },
    {
      key: 'clients', label: 'Our Portfolio',
      content: {
        eyebrow: 'Our Portfolio', title: 'Website Projects Built for Businesses Across Industries', highlight: 'Across Industries',
        description: 'Explore our website projects across travel, healthcare, IT and other industries.',
        items: webClients,
      },
    },
    {
      key: 'journey', label: 'Our Process',
      content: {
        eyebrow: 'Our Process', title: 'Our Website Design and Development Process', highlight: 'Design and Development Process',
        steps: [
          { icon: 'Lightbulb', title: 'Discover', description: 'Understand your business goals.' },
          { icon: 'PenTool', title: 'Design', description: 'Create an intuitive website layout.' },
          { icon: 'Code2', title: 'Develop', description: 'Build the website and required features.' },
          { icon: 'ClipboardCheck', title: 'Test', description: 'Check functionality and responsiveness.' },
          { icon: 'Rocket', title: 'Launch', description: 'Publish the website and complete the handover.' },
        ],
      },
    },
    {
      key: 'capabilities', label: 'Website Features',
      content: {
        eyebrow: 'Website Features', title: 'Website Features Built for Performance and Growth', highlight: 'Performance and Growth', variant: 'chips',
        items: capItems([
          ['MonitorSmartphone', 'Responsive Design'], ['Search', 'SEO-Friendly Structure'], ['LayoutTemplate', 'CMS'], ['CreditCard', 'Payment Gateway'],
          ['Gauge', 'Speed Optimisation'], ['BarChart3', 'Analytics'], ['ShieldCheck', 'Secure Hosting'], ['Languages', 'Multilingual Support'],
          ['Workflow', 'Custom Workflows'], ['Layers', 'Scalable Applications'],
        ]),
        cards: [
          { icon: 'Code2', title: 'Web Application Development', description: 'Custom dashboards, portals and workflow solutions.' },
          { icon: 'ShoppingCart', title: 'E-commerce Development', description: 'Product management, shopping cart and payment integration.' },
        ],
        stats: [],
      },
    },
    {
      key: 'tools', label: 'Technologies We Use',
      content: {
        eyebrow: 'Technologies We Use', title: 'Technologies Behind Our Web Development Services', highlight: 'Web Development Services',
        // only technologies actively supported by the team (per the content document)
        items: ['React', 'Node.js', 'MERN', 'PHP'],
      },
    },
    {
      key: 'industries', label: 'Industries We Serve',
      content: {
        eyebrow: 'Industries We Serve', title: 'Website Development Solutions for Your Industry', highlight: 'Your Industry',
        items: ['Travel & Tourism', 'Healthcare', 'Insurance', 'Automobile', 'Real Estate', 'Education', 'IT Services', 'Entertainment', 'Retail'],
      },
    },
    {
      key: 'faq', label: 'Frequently Asked Questions',
      content: {
        eyebrow: 'Frequently Asked Questions', title: 'Website Development FAQs', highlight: 'FAQs',
        items: [
          { question: 'How much does website development cost?', answer: 'Our packages start at ₹3,000 + GST. Custom website pricing depends on your requirements.' },
          { question: 'How long does website development take?', answer: 'The timeline depends on the website\'s size, features and content readiness.' },
          { question: 'Is domain and hosting included?', answer: 'One year of domain and server services is included in eligible packages, subject to terms.' },
          { question: 'Do you develop e-commerce websites?', answer: 'Yes. We develop online stores with product catalogues and suitable payment integrations.' },
          { question: 'Will my website be mobile-friendly and SEO-friendly?', answer: 'Yes. We build responsive websites with fundamental on-page SEO practices.' },
          { question: 'Do you provide website maintenance?', answer: 'Yes. Maintenance and support are available based on the selected service plan.' },
        ],
      },
    },
    {
      key: 'enquiry', label: 'Final CTA & Enquiry Form',
      content: {
        title: 'Ready to Build a Website Around Your Business Goals?', highlight: 'Your Business Goals?',
        description: 'Tell us about your website requirements. Our team will help you explore the right solution for your business.',
        image: img('reference/web-cta.png', 'Business team collaborating on a website development project'),
        requirements: [
          'Single-Page Website', 'Service-Based Website', 'Custom Website', 'Business Website', 'E-commerce Website',
          'Portfolio Website', 'Landing Page', 'Web Application', 'Booking Website', 'Other',
        ],
        budgets: BUDGETS,
        button_text: 'Get a Quote', whatsapp_text: 'WhatsApp Us',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],

  'app-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Your App Idea. Our Expertise. Your Next Big Move.', highlight: 'Your Next Big Move.', align: 'center',
        description: 'We are an app development company that designs and builds custom mobile apps around your business, with web and app development under one team. Your business, in every customer’s pocket.',
        image: img('sections/Appbg.png', 'Mobile app development team designing a custom Android business app'),
        button: { text: 'Get a Quote and Explore Packages', link: '#packages' },
      },
    },
    { key: 'stats', label: 'Stats', content: STATS },
    {
      key: 'services', label: 'Our Services',
      content: {
        eyebrow: 'Our Services', title: 'From Business Ideas to Powerful Custom Mobile Apps', highlight: 'Powerful Custom Mobile Apps',
        description: 'From a simple business app to a full e-commerce store, we deliver mobile application development that is designed around your customers and built to bring you enquiries.',
        items: [
          { icon: 'Smartphone', title: 'Android App Development', description: 'Custom Android apps built for the Google Play Store and for the phones your customers already use.' },
          { icon: 'Briefcase', title: 'Custom Business Apps', description: 'A fully customised app for your business with your services, products, enquiry form, contact options and location in one place.' },
          { icon: 'ShoppingCart', title: 'E-Commerce Mobile Apps', description: 'Product catalogue, categories, search, cart, order enquiry via WhatsApp and a web admin panel to manage your products.' },
          { icon: 'Calendar', title: 'Business & Productivity Apps', description: 'Booking, enquiry and task tracking app solutions built around how your team and customers work.' },
          { icon: 'PenTool', title: 'Mobile UI/UX Design', description: 'Mobile UI UX design that is clean, simple to use and matched to your brand, never copied from a template.' },
          { icon: 'Rocket', title: 'Deployment & Support', description: 'Device testing, Google Play Store listing setup and support after launch.' },
        ],
      },
    },
    {
      key: 'packages', label: 'Package Details',
      content: {
        eyebrow: 'App Development Packages', title: 'The Right App. The Right Starting Point.', highlight: 'The Right Starting Point.',
        description: 'Choose the right plan for your business. One clear price, no surprises, and a custom Android app designed around your business.',
        plans: [
          {
            tag: '2-Week Delivery', name: 'Custom Business Mobile App', subtitle: 'PACKAGE 1',
            description: 'Your business, in every customer’s pocket. A fully customised Android app designed and built around your business, not copied from a template.',
            price: '₹9,999 + GST', price_note: 'Delivery: 2 weeks to a ready-to-use app',
            features: [
              'Custom-built business mobile app for Android phones', 'Customised UI/UX design, no generic template-based design', 'App icon and splash screen with your logo',
              'Enquiry and contact actions: Call, WhatsApp, Email, Map and Enquire', 'Google Maps integration', 'Client-provided content integrated (your text, images and details)',
              'Device testing on multiple Android devices', 'Deployment included, with Google Play Store listing setup and support',
            ],
            benefits: ['Business Introduction', 'Products & Services', 'About Your Business', 'Why Choose Us', 'Customer Enquiry Form', 'Contact Information', 'Location Integration', 'Call-to-Action Buttons'],
            note: 'Best for: local businesses, startups, service businesses, shops and stores, consultants, restaurants and cafés, clinics and healthcare, real estate and many other businesses. Good to know: ₹9,999 is exclusive of GST. Google Play Store publishing fees, if applicable, are separate.',
            button_text: 'Get This Package', button_link: '#enquiry', secondary_text: 'Download Brochure', secondary_link: '#brochure', featured: true,
          },
          {
            tag: 'Online Store Ready', name: 'E-Commerce Mobile App', subtitle: 'PACKAGE 2',
            description: 'Your products. Your app. Your customers. A customised e-commerce Android app to showcase your products, receive customer enquiries and build a direct digital presence.',
            price: '₹19,999 + GST', price_note: 'Starting price · Delivery: 30–45 working days from design approval and receipt of content · Payment: 50% advance to start, 50% before final delivery',
            features: [
              'Android mobile app', 'Customised UI/UX design (up to 2 design revisions)', 'Product categories and product search', 'Up to 25 products with images, details and price display',
              'Add to cart and send order enquiry via WhatsApp', 'Customer login / registration', 'Customer enquiry, Call and WhatsApp integration', 'Customer address / delivery details',
              'App icon and splash screen', 'Device testing', 'Basic web admin panel to manage products, categories, images, prices, banners and enquiries', 'Backend / server setup',
              '1 year backend / server support (fair usage)', 'Play Store support', '1 month free bug-fix support after launch (new features are chargeable)',
              'No online payment gateway integration (quoted separately)', 'No order management system (status updates, invoices)', 'No inventory / stock management', 'No delivery tracking',
              'No coupon and discount system', 'No multiple admin roles', 'No advanced sales reports', 'No separate admin mobile app', 'No custom e-commerce workflows',
            ],
            benefits: ['Up to 25 Products', 'Cart & WhatsApp Orders', 'Web Admin Panel', '1 Year Backend Support'],
            note: 'Product limit: the package covers setup and display of up to 25 products. Additional products or advanced e-commerce requirements are quoted separately. Best for: retail shops, fashion and clothing, jewellery, home and lifestyle stores, beauty and personal care, small product businesses, local e-commerce businesses, startups and new brands. Good to know: Google Play account fees, domain, SMS / WhatsApp API and other third-party charges are borne by the client. Server hosting after the first year is chargeable. Terms and conditions apply.',
            button_text: 'Get This Package', button_link: '#enquiry', secondary_text: 'Download Brochure', secondary_link: '#brochure',
          },
        ],
      },
    },
    {
      key: 'why', label: 'Why Choose Us',
      content: {
        eyebrow: 'Why Choose Vetri IT Systems?', title: 'Built Around Your Business. Never Just a Template.', highlight: 'Never Just a Template.',
        description: 'Get a custom-designed Android app with clear package scope, practical features and deployment support.',
        items: [
          { icon: 'Palette', title: 'Customised Design', description: 'Designed around your business and requirements, not a one-size-fits-all layout.' },
          { icon: 'LayoutTemplate', title: 'No Generic Templates', description: 'We never drop your content into a recycled template.' },
          { icon: 'Smartphone', title: 'Mobile-First Experience', description: 'Smooth, fast and easy to use on everyday smartphones.' },
          { icon: 'MessageCircle', title: 'Enquiry-Focused', description: 'Call, WhatsApp, Email and Map actions built in from day one.' },
          { icon: 'Timer', title: 'Quick Delivery', description: 'Your business app is ready in 2 weeks.' },
          { icon: 'Rocket', title: 'Complete Deployment', description: 'Device testing and deployment included, end to end.' },
          { icon: 'BadgeIndianRupee', title: 'One Clear Price', description: 'No hidden charges, with clear package scope.' },
        ],
      },
    },
    {
      key: 'clients', label: 'Our Portfolio',
      content: {
        eyebrow: 'Our Portfolio', title: 'Mobile Apps Built by Our App Developers', highlight: 'Our App Developers',
        description: 'Our mobile app developers build custom Android applications for businesses, from enquiry-focused business apps to product-based e-commerce apps.',
        items: [
          { image: img('reference/app-project-1.jpg', 'QuickRetail POS mobile app showing shopping cart and barcode scanning'), name: 'QUICKRETAIL POS', location: '', category: 'Mobile Commerce', description: 'Sub-second checkout mobile POS with 42% order speed lift.', link: '' },
          { image: img('reference/app-project-2.jpg', 'MedPulse Telehealth mobile app showing consultation and health vitals'), name: 'MEDPULSE TELEHEALTH', location: '', category: 'Digital Healthcare', description: 'HIPAA-compliant telemedicine app serving 120,000+ monthly patients.', link: '' },
        ],
      },
    },
    {
      key: 'journey', label: 'Our Process',
      content: {
        eyebrow: 'Our Process', title: 'Our Mobile Application Development Process', highlight: 'Development Process',
        description: 'A clear five-step process takes your app from discovery and design through development, testing and launch.',
        steps: [
          { icon: 'Lightbulb', title: 'Discover', description: 'Share your business details, content and images, and tell us your goals and audience.' },
          { icon: 'PenTool', title: 'Design', description: 'We create a customised mobile UI UX design with wireframes and visual screens, which you review and approve.' },
          { icon: 'Code2', title: 'Develop', description: 'We build your mobile app with clean, fast code and regular progress updates.' },
          { icon: 'ClipboardCheck', title: 'Test', description: 'We test every feature on multiple Android devices before release.' },
          { icon: 'Rocket', title: 'Launch', description: 'Your app is deployed on Google Play Store and ready for customers.' },
        ],
      },
    },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        eyebrow: 'Capabilities', title: 'What Can Your Android App Do?', highlight: 'Your Android App',
        description: 'From customer enquiries and product catalogues to integrations and admin panels, we build features around your needs.',
        variant: 'app',
        items: [
          { icon: 'Smartphone', label: 'Android (Kotlin)', description: 'Android app development and native app development for fast, smooth performance.' },
          { icon: 'WifiOff', label: 'Offline-First SQLite', description: 'Apps that keep working with weak or no internet.' },
          { icon: 'Bell', label: 'Push Notifications (FCM)', description: 'Send offers and updates straight to your customers’ phones.' },
          { icon: 'Fingerprint', label: 'Biometric Auth', description: 'Face and fingerprint sign-in for secure access.' },
          { icon: 'Wallet', label: 'Razorpay / UPI Integration', description: 'Payment options for apps that need online payments (quoted separately for packages).' },
          { icon: 'Radio', label: 'Real-time WebSockets', description: 'Live updates for chats, orders and tracking.' },
          { icon: 'MapPin', label: 'Mapbox & Live GPS', description: 'Maps, location and tracking features.' },
          { icon: 'Bluetooth', label: 'Bluetooth BLE Sync', description: 'Connect your app with Bluetooth devices.' },
          { icon: 'Store', label: 'Play Store Optimization', description: 'Help your app get found on Google Play.' },
          { icon: 'Zap', label: '60 FPS Micro-Interactions', description: '' },
          { icon: 'Palette', label: 'UI/UX Design Services', description: 'UI UX design services that keep every screen simple, clear and on brand.' },
        ],
        stats: [{ value: '100+', label: 'Apps Delivered' }, { value: '99.9%', label: 'Uptime' }, { value: '50+', label: 'Happy Clients' }, { value: '24/7', label: 'Support' }],
      },
    },
    {
      key: 'tools', label: 'Technologies We Use',
      content: {
        eyebrow: 'Technologies We Use', title: 'The Technology Behind Your App', highlight: 'Your App',
        description: 'We use suitable development tools, platforms and services to build, test, deploy and support Android applications.',
        items: ['Kotlin', 'Flutter', 'React Native', 'SQLite', 'Firebase Cloud Messaging'],
      },
    },
    {
      key: 'industries', label: 'Industries We Serve',
      content: {
        eyebrow: 'Industries We Serve', title: 'Mobile App Developed for the Way Your Industry Works', highlight: 'Your Industry Works',
        description: 'Custom Android app solutions for retailers, startups, service businesses and other industries across Tamil Nadu.',
        items: ['Local Businesses', 'Startups', 'Service Businesses', 'Shops & Stores', 'Consultants & Professionals', 'Restaurants & Cafés', 'Clinics & Healthcare', 'Real Estate', 'Retail & Fashion', 'Jewellery', 'Beauty & Personal Care'],
      },
    },
    {
      key: 'faq', label: 'FAQs',
      content: {
        title: 'Your App Development Questions, Answered', highlight: 'Questions, Answered',
        items: [
          { question: 'Which mobile app development company should I choose for my business?', answer: 'Choose one that designs around your business and includes testing and deployment. Vetri IT Systems builds custom Android apps with clear pricing and no generic templates, so you know what you get.' },
          { question: 'How much does mobile app development cost?', answer: 'Our Custom Business Mobile App package is ₹9,999 + GST, and our E-Commerce Mobile App starts at ₹19,999 + GST. Advanced features are quoted separately.' },
          { question: 'How fast will my app be ready?', answer: 'The Custom Business Mobile App is ready in 2 weeks. The E-Commerce Mobile App takes 30–45 working days from design approval and receipt of content.' },
          { question: 'Do I need to provide content?', answer: 'Yes. You share your business content, images and details, and we design and build the app around them.' },
          { question: 'Is this a template-based app?', answer: 'No. Your app is custom designed around your business. We never simply drop your content into a recycled template.' },
          { question: 'Is GST included in the price?', answer: 'No. The package prices are exclusive of GST.' },
          { question: 'Can I publish the app on Google Play Store?', answer: 'Yes. We provide Google Play Store listing setup and deployment support for your Android app. Google Play publishing fees, if applicable, are separate.' },
          { question: 'How many products can I add in the e-commerce app?', answer: 'The package supports up to 25 products. Additional products are quoted separately.' },
          { question: 'Is an admin panel included?', answer: 'Yes. A basic web admin panel is included to manage products, categories, images, prices, banners and enquiries. A separate admin mobile app can be added as an extra.' },
        ],
      },
    },
    {
      key: 'enquiry', label: 'Final CTA & Enquiry Form',
      content: {
        title: 'Have an App Idea? Let’s Make It Happen. Bring Your App Idea to Life with Our App Development Team', highlight: 'Let’s Make It Happen.',
        description: 'Looking for app development, a mobile development company you can trust or a custom Android app for your business? Tell us your requirement and we will help you choose the right package.',
        image: img('reference/app-cta.png', 'App developers collaborating on a mobile app idea'),
        requirements: ['Custom Business Mobile App', 'E-Commerce Mobile App', 'Custom App Requirement', 'Other'],
        budgets: BUDGETS,
        button_text: 'Build Your App', whatsapp_text: 'WhatsApp Us',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],

  'software-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Custom Software Development Built Around Your Business', highlight: 'Built Around Your Business', align: 'left',
        description: 'We offer custom software development and enterprise software development, from GST billing software to business management software, built around the way your team works.',
        image: img('sections/softbg.png', 'Software development team building custom business software and digital solutions'),
        button: { text: 'Get a Quote', link: '#enquiry' },
      },
    },
    { key: 'stats', label: 'Stats', content: STATS },
    {
      key: 'services', label: 'Our Services',
      content: {
        eyebrow: 'Our Services', title: 'Custom Software Development Services for Real Business Needs', highlight: 'Real Business Needs',
        description: 'From everyday billing tools to enterprise platforms, we build software that fits your workflow and grows with your business.',
        items: [
          { icon: 'Settings2', title: 'Custom Business Software', description: 'Tailor-made software for your own processes, reports and users.' },
          { icon: 'Building2', title: 'Enterprise Software', description: 'ERP and enterprise software for managing operations across teams and branches.' },
          { icon: 'Receipt', title: 'Billing & GST Software', description: 'Billing software with GST invoicing and E-Way support for businesses.' },
          { icon: 'ClipboardCheck', title: 'Project Management Software', description: 'Track projects, tasks, teams and deadlines in one place.' },
          { icon: 'Users', title: 'HR Management Software', description: 'HRMS management for employee records, attendance and leave.' },
          { icon: 'Cloud', title: 'SaaS Platforms', description: 'Multi-tenant SaaS products built to serve many customers on one platform.' },
        ],
      },
    },
    {
      key: 'pricing', label: 'Pricing Packages',
      content: {
        eyebrow: 'Pricing Packages', title: 'Custom Software Development Pricing for Your Requirements', highlight: 'Your Requirements',
        description: 'Software pricing depends on scope, users and features. Tell us what you need and we will prepare a clear quote.',
        plans: [
          { name: 'Ready-to-Use Business Software', subtitle: 'BILLING · PROJECTS · HR', price: 'Custom Quote', features: ['Billing, project management or HR management software', 'Set-up for your business', 'Training for your team'], button_text: 'Get a Quote', button_link: '#enquiry' },
          { name: 'Custom Software', subtitle: 'BUILT AROUND YOUR WORKFLOW', price: 'Custom Quote', features: ['Software built around your workflow', 'Custom features and reports', 'Integrations based on scope'], button_text: 'Get a Quote', button_link: '#enquiry', featured: true },
          { name: 'Enterprise & SaaS Platforms', subtitle: 'ERP · SAAS · CLOUD', price: 'Custom Quote', features: ['ERP and enterprise software', 'Multi-tenant SaaS products', 'Cloud setup based on scope'], button_text: 'Get a Quote', button_link: '#enquiry' },
        ],
      },
    },
    {
      key: 'why', label: 'Why Choose Us',
      content: {
        eyebrow: 'Why Choose Vetri IT Systems?', title: 'Why Businesses Choose Vetri IT Systems for Software Development', highlight: 'for Software Development', description: '',
        items: [
          { icon: 'Timer', title: 'On-Time Delivery', description: 'Structured planning and clear milestones keep your project on schedule.' },
          { icon: 'Workflow', title: 'Built Around Your Work', description: 'Software designed for your workflow, not the other way round.' },
          { icon: 'MonitorSmartphone', title: 'Mobile-Friendly Design', description: 'Web-based software that works smoothly on mobile, tablet and desktop.' },
          { icon: 'LifeBuoy', title: 'Post-Launch Support', description: 'Maintenance and updates based on your support plan.' },
          { icon: 'Globe', title: 'Tamil Nadu and Dubai Experience', description: 'Software solutions delivered for businesses in India and the UAE.' },
        ],
      },
    },
    {
      key: 'clients', label: 'Our Portfolio',
      content: {
        eyebrow: 'Our Portfolio', title: 'Business Software Built to Simplify Everyday Work', highlight: 'Simplify Everyday Work',
        description: 'Explore the billing, project tracking and ERP solutions we have built for growing businesses.',
        items: [
          { image: img('items/vift.png', 'Vetri Billing GST billing software dashboard showing invoices and GST reports'), name: 'VETRI BILLING', location: '', category: 'ERP & Billing', description: 'GST billing software for invoices, GST reports and day-to-day billing.', link: '' },
          { image: img('items/Ak.png', 'Projects Tracking project management software showing tasks and project progress'), name: 'Akash Photography', location: '', category: 'Projects Tracking', description: 'Project management software to plan work, assign tasks and follow progress.', link: '' },
        ],
      },
    },
    {
      key: 'journey', label: 'Our Process',
      content: {
        eyebrow: 'Our Process', title: 'From Business Requirements to Reliable Software', highlight: 'Reliable Software',
        steps: [
          { icon: 'Lightbulb', title: 'Discover', description: 'Understand your workflow and find where business process automation can save time.' },
          { icon: 'PenTool', title: 'Design', description: 'Plan the screens, features and user journey.' },
          { icon: 'Code2', title: 'Develop', description: 'Build clean, reliable software with regular progress updates.' },
          { icon: 'ClipboardCheck', title: 'Test', description: 'Check every feature, device and browser before release.' },
          { icon: 'Rocket', title: 'Launch', description: 'Go live, train your team and support you after launch.' },
        ],
      },
    },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        eyebrow: 'Capabilities', title: 'Explore Our Custom Software Development Capabilities', highlight: 'Development Capabilities', variant: 'software',
        items: [
          { icon: 'Building2', label: 'Enterprise ERP', description: 'Enterprise software development for operations, finance and reporting.' },
          { icon: 'FileCheck2', label: 'GST & E-Way Billing', description: 'GST billing software with invoicing and E-Way bill support.' },
          { icon: 'Layers', label: 'Multi-Tenant SaaS', description: 'A SaaS development company approach: one platform, many customers, separate data.' },
          { icon: 'Cloud', label: 'Cloud Architecture', description: 'Cloud computing services for secure, scalable and reliable hosting.' },
          { icon: 'Workflow', label: 'Workflow Automation', description: 'Workflow management software and business process automation to reduce manual work.' },
          { icon: 'Boxes', label: 'Inventory Management', description: 'Stock tracking, purchases and sales in one system.' },
          { icon: 'Sparkles', label: 'AI Solutions', description: 'AI solutions such as smart reports and automation, added where they help your business.' },
          { icon: 'ShieldCheck', label: 'Secure & Scalable Backend', description: '' },
        ],
        stats: CAP_STATS,
      },
    },
    {
      key: 'tools', label: 'Technologies We Use',
      content: {
        eyebrow: 'Technologies We Use', title: 'The Technologies Behind Our Software Solutions', highlight: 'Our Software Solutions', description: '',
        items: ['React', 'Node.js', 'PHP'],
      },
    },
    {
      key: 'industries', label: 'Industries We Serve',
      content: {
        eyebrow: 'Industries We Serve', title: 'Custom Software Development for Your Industry', highlight: 'Your Industry', description: '',
        items: ['Retail & Trading', 'Manufacturing', 'Healthcare', 'Education', 'Real Estate', 'Logistics & Trade', 'IT Services'],
      },
    },
    {
      key: 'faq', label: 'FAQs',
      content: {
        title: 'Software Development FAQs', highlight: 'FAQs',
        items: [
          { question: 'How much does custom software development cost?', answer: 'The cost depends on the features, number of users and integrations you need. Share your requirement and we will send a quote.' },
          { question: 'How long does software development take?', answer: 'The timeline depends on the size of the software, the features and how quickly content and feedback are shared.' },
          { question: 'What is a bespoke software development service?', answer: 'It means software built specifically for your business and your workflow, instead of using a ready-made tool that only partly fits.' },
          { question: 'Do you build GST billing software?', answer: 'Yes. We build GST billing software with invoicing and GST reporting, and can customise it for your business.' },
          { question: 'Can you add AI solutions to my software?', answer: 'Yes. We can add AI solutions and automation where they save time, such as smart reports and workflow automation.' },
          { question: 'Do you provide hosting and maintenance?', answer: 'Yes. Cloud hosting, security support and annual maintenance are available based on the selected plan.' },
          { question: 'Do you provide SEO and content support?', answer: 'Yes. SEO and content writing are available as add-on services.' },
        ],
      },
    },
    {
      key: 'enquiry', label: 'Final CTA & Enquiry Form',
      content: {
        title: 'Need Custom Business Software for Your Workflow?', highlight: 'Your Workflow?',
        description: 'Need workflow management software, a bespoke software development service or custom business software? Tell us your requirement and our team will help you find the right solution.',
        image: img('reference/software-cta.png', 'Software development team collaborating on custom business solutions'),
        requirements: ['Ready-to-Use Business Software', 'Custom Software', 'Enterprise & SaaS Platform', 'Other'],
        budgets: BUDGETS,
        button_text: 'Get a Quote', whatsapp_text: 'WhatsApp Us',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],

  'digital-marketing': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Digital Marketing That Turns Visibility into Enquiries', highlight: 'Enquiries', align: 'center',
        description: 'We are a digital marketing agency that provides digital marketing services to help businesses get found online, reach the right customers and turn visitors into enquiries, through SEO, social media, online advertising and content marketing.',
        image: img('marketing.png', 'Digital marketing team planning SEO and social media campaigns'),
        button: { text: 'Get a Quote', link: '#enquiry' },
      },
    },
    {
      key: 'stats', label: 'Stats',
      content: { items: [{ value: '50+', label: 'Digital Solutions' }, { value: '99.4%', label: 'On-Time Delivery' }, { value: '30+', label: 'Engineers & Designers' }, { value: '5+', label: 'Countries Served' }] },
    },
    {
      key: 'services', label: 'Our Services',
      content: {
        eyebrow: 'Our Services', title: 'Digital Marketing Services to Reach the Right Customers', highlight: 'Reach the Right Customers',
        description: 'From search visibility to social media and paid campaigns, our digital marketing solutions are planned around your business goals and budget.',
        items: [
          { icon: 'Search', title: 'Search Engine Optimisation (SEO)', description: 'Improve your Google rankings and bring in more organic traffic.' },
          { icon: 'Share2', title: 'Social Media Marketing', description: 'Build your brand and engage customers on Facebook, Instagram and LinkedIn.' },
          { icon: 'MousePointerClick', title: 'Google Ads & Online Advertising', description: 'Targeted online advertising campaigns that reach customers who are ready to enquire.' },
          { icon: 'FileText', title: 'Content Marketing', description: 'Blogs, website content and creatives that attract and inform your audience.' },
          { icon: 'Palette', title: 'Digital Marketing & Branding', description: 'Logo, visual identity and consistent branding across online channels.' },
          { icon: 'MapPin', title: 'Local SEO & Google Business Profile', description: 'Get discovered by customers searching near you.' },
        ],
      },
    },
    {
      key: 'packages', label: 'Packages',
      content: {
        title: 'Digital Marketing Packages for Your Business Goals', highlight: 'Your Business Goals',
        plans: [
          {
            tag: 'Special Offer', name: 'SEO + GSC Growth Package', subtitle: '',
            description: 'Get found on Google and bring more local customers to your business. A complete SEO setup with Google Search Console to improve your visibility, rankings and business growth.',
            price: '₹3,000 + GST', price_note: 'one-time setup',
            features: ['Keyword Research & Mapping', 'On-Page SEO Optimisation', 'Google Search Console Setup', 'Sitemap & Robots.txt Review', 'Google Business Profile Optimisation', 'Local SEO Recommendations', 'Citation Recommendations', 'Schema Recommendations', 'Page Speed Audit', 'Content Gap Opportunities', 'SEO Action & Recommendations Report'],
            benefits: ['Better Visibility', 'More Customers', 'Local Business Focus', 'Measurable Results'],
            note: 'SEO is an ongoing process. Rankings and traffic depend on competition, search demand, website quality, content, technical factors and Google’s systems.',
            button_text: 'Get This Package', button_link: '#enquiry', secondary_text: 'Download Brochure', secondary_link: '', featured: true,
          },
          {
            tag: 'Digital Marketing Package', name: 'Social Media Package', subtitle: '',
            description: 'Create, plan and grow your brand on Instagram and Facebook. Professional posts, reels and a monthly content plan, all from one team.',
            price: '₹3,000 + GST', price_note: 'per month (30 content pieces × ₹100)',
            features: ['16 Static Posts', '4 Festival Posts', '4 Carousels (5 slides each)', '4 Reels (30 seconds each)', '2 Stories', '1 Monthly Content Calendar', '2 Competitor Analyses', '1 Month-End Growth Map', 'Instagram & Facebook Profile Setup or Optimisation', 'Captions & Hashtags for Every Creative'],
            benefits: ['Create', 'Plan', 'Grow'],
            note: 'Other than the 30 creatives, everything else is complimentary. Social media handle access is required for the complimentary services. Creatives are delivered within 3 days of calendar approval.',
            button_text: 'Get This Package', button_link: '#enquiry', secondary_text: 'Download Brochure', secondary_link: '',
          },
        ],
      },
    },
    {
      key: 'why', label: 'Why Choose Us',
      content: {
        eyebrow: 'Why Choose Vetri IT Systems?', title: 'Why Businesses Choose Vetri IT Systems for Digital Marketing', highlight: 'for Digital Marketing', description: '',
        items: [
          { icon: 'Target', title: 'Business-Focused Strategy', description: 'Online marketing plans built around enquiries, not just clicks.' },
          { icon: 'Globe', title: 'Website + Marketing Under One Roof', description: 'We build your website and market it, so everything works together.' },
          { icon: 'BarChart3', title: 'Transparent Reporting', description: 'Clear monthly reports on traffic, leads and campaign performance.' },
          { icon: 'Search', title: 'Search-Friendly Approach', description: 'On-page SEO and content planned for long-term growth.' },
          { icon: 'Layers', title: 'Flexible Packages', description: 'Digital marketing for business of every size, with plans you can scale.' },
          { icon: 'Award', title: 'Industry Experience', description: 'Marketing support for businesses across multiple industries.' },
        ],
      },
    },
    {
      key: 'process', label: 'Our Process',
      content: {
        title: 'Our Digital Marketing Process: Plan, Launch & Improve', highlight: 'Plan, Launch & Improve',
        steps: [
          { icon: 'Lightbulb', title: 'Discover', description: 'Understand your business, audience and goals.' },
          { icon: 'Target', title: 'Plan', description: 'Research keywords, analyse competitors and build your marketing strategy.' },
          { icon: 'Settings2', title: 'Prepare', description: 'Set up your digital profiles and essential tracking tools.' },
          { icon: 'PenTool', title: 'Create', description: 'Develop SEO-friendly content and engaging social media creatives.' },
          { icon: 'Rocket', title: 'Launch', description: 'Publish approved content according to the planned schedule.' },
          { icon: 'TrendingUp', title: 'Improve', description: 'Review performance, share reports and identify growth opportunities.' },
        ],
      },
    },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        title: 'Explore Our Digital Marketing Solutions', highlight: 'Digital Marketing Solutions', variant: 'chips',
        items: capItems([
          ['Search', 'On-Page SEO'], ['Hash', 'Keyword Research'], ['Share2', 'Social Media Management'], ['MousePointerClick', 'Google Ads'],
          ['PenLine', 'Content Writing'], ['Palette', 'Digital Branding'], ['MapPin', 'Local SEO'], ['BarChart3', 'Analytics & Reporting'],
          ['Users', 'Lead Generation'], ['Gauge', 'Campaign Optimisation'],
        ]),
        cards: [
          { icon: 'FileText', title: 'Search & Content Marketing', description: 'SEO, keyword research, blogs and website content that build lasting visibility.' },
          { icon: 'Megaphone', title: 'Paid Advertising', description: 'Google Ads and social media ads focused on measurable enquiries.' },
        ],
        stats: [],
      },
    },
    {
      key: 'tools', label: 'Tools & Platforms',
      content: {
        title: 'The Tools Behind Our Digital Marketing Services', highlight: 'Digital Marketing Services', description: '',
        items: ['Google Analytics', 'Google Search Console', 'Google Ads', 'Meta Business Suite', 'Google Business Profile'],
      },
    },
    {
      key: 'industries', label: 'Industries We Serve',
      content: {
        title: 'Digital Marketing Strategies for Your Industry', highlight: 'Your Industry', description: '',
        items: ['Travel & Tourism', 'Healthcare', 'Insurance', 'Automobile', 'Real Estate', 'Education', 'IT Services', 'Entertainment', 'Retail'],
      },
    },
    {
      key: 'faq', label: 'FAQs',
      content: {
        title: 'Digital Marketing FAQs', highlight: 'FAQs',
        items: [
          { question: 'What are digital marketing services?', answer: 'Digital marketing services help businesses promote themselves online through SEO, social media, Google Ads, content marketing and branding.' },
          { question: 'How much do digital marketing packages cost?', answer: 'Cost depends on the services you choose and your goals. Our SEO + GSC Growth Package starts at ₹3,000 + GST. Contact us for a quote based on your requirements.' },
          { question: 'How long does digital marketing take to show results?', answer: 'Paid ads can bring enquiries quickly, while SEO and content marketing usually take a few months to build lasting results.' },
          { question: 'Do you provide both website development and digital marketing?', answer: 'Yes. We build business websites and also promote them through SEO, social media and online advertising.' },
          { question: 'What makes the best digital marketing agency?', answer: 'The best digital marketing agency understands your business, sets clear goals, reports openly and focuses on enquiries and sales rather than vanity numbers.' },
          { question: 'What do digital marketing agency services include?', answer: 'Our digital marketing agency services include SEO, social media marketing, Google Ads, content marketing and digital branding.' },
          { question: 'Do online advertising agencies handle ad spend?', answer: 'Ad spend is paid separately to the platform (such as Google or Meta). Our fee covers campaign setup, management and reporting.' },
          { question: 'Do you work with small businesses?', answer: 'Yes. Our flexible packages suit small and growing businesses as well as established companies.' },
        ],
      },
    },
    {
      key: 'enquiry', label: 'Enquiry Form',
      content: {
        title: 'Ready to Reach More Customers Online?', highlight: 'More Customers Online?',
        description: 'Tell us about your business and goals. Our team will help you find the right digital marketing solution.',
        image: img('cta.png', 'Business team reviewing digital marketing results'),
        requirements: ['SEO + GSC Growth Package', 'Social Media Package', 'Google Ads', 'Content Marketing', 'Digital Branding', 'Other'],
        budgets: ['Below ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹50,000', 'Above ₹50,000'],
        button_text: 'Get a Quote', whatsapp_text: 'WhatsApp Us',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],
};

// "Download Brochure" section on every Our Expertise page (Website Development has its own above).
// Hidden on the site until a brochure PDF/ZIP is uploaded in the admin (Brochure Download → File).
const brochure = (slug, topic, highlight) => ({
  key: 'brochure', label: 'Brochure Download', ensure: true,
  content: {
    title: `Download ${topic} Brochure`, highlight,
    description: `Explore our ${topic.toLowerCase()} services, capabilities and solutions in our company brochure.`,
    button_text: 'Download Brochure', link: '', files: BROCHURE_FILES[slug] || [],
    book_label: 'VIS', book_title: topic, book_caption: 'COMPANY BROCHURE',
  },
});
const BROCHURE_BEFORE = {
  'app-development': ['App Development', 'Development Brochure', 'why'],
  'software-development': ['Software Development', 'Development Brochure', 'why'],
  'digital-marketing': ['Digital Marketing', 'Marketing Brochure', 'faq'],
};
for (const [slug, [topic, highlight, before]] of Object.entries(BROCHURE_BEFORE)) {
  const list = servicePages[slug];
  const at = list.findIndex((s) => s.key === before);
  list.splice(at < 0 ? list.length : at, 0, brochure(slug, topic, highlight));
}
