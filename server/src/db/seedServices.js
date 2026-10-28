// "Our Expertise" pages. Website / App / Software content is copied exactly from the live site;
// Digital Marketing has no live page, so it uses the Digital Marketing SEO content document.
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

const webClients = [
  ['saswanthtravels.png', 'SASHWANTH TRAVELS', 'Tirunelveli'],
  ['Csafe.png', 'CSAFE', 'Karur'],
  ['Susee.png', 'SUSEE HYUNDAI', 'Theni'],
  ['Travu.png', 'TRAVU', 'Coimbatore'],
  ['mountdental.png', 'MOUNT DENTALCARE', 'Chennai'],
  ['Dana_JvlKkYs.png', 'DHANALAKSHMI ENTERPRISES', 'Trichy'],
  ['truetech.png', 'TRUETECS', 'Dubai'],
  ['Lic.png', 'LIC AGENCY', 'Madurai'],
  ['tsing.png', 'TS SINGING ARENA', 'Chennai'],
  ['sjr.png', 'SJRGROUPS', 'Kovilpatti'],
  ['Medex.png', 'MEDEX', 'Chennai'],
  ['varahi.png', 'VARAHI TOURS & TRAVELS', 'Madurai'],
  ['nammasu.png', 'NAMMA SURANDAI', 'Surandai'],
  ['globalim.png', 'GLOBAL TAMIL UNIVERSITY', 'Coimbatore'],
  ['ntts.png', 'NTTS', 'Chennai'],
  ['Antex.png', 'ANTEX PRIVATE LIMITED', 'UAE'],
  ['london.png', 'LONDON INDIAN TAMILS', 'London'],
  ['classic.png', 'CLASSIC & COMFORT INTERIORS', 'Chennai'],
  ['builders.png', 'NAGERCOIL BUILDERS', 'Nagercoil'],
  ['Rushik.png', 'RUSHIK BIO ORGANIC', 'Surandai'],
  ['olympus.png', 'OLYMPUS DIAGNOSTICS', 'Bangalore'],
  ['cygmagm.png', 'CYGMAGM', 'UAE'],
].map(([file, name, location]) => ({ image: img(`items/${file}`, name), name, location, category: '', description: '', link: '' }));

const capItems = (list) => list.map(([icon, label]) => ({ icon, label }));

export const servicePageMeta = {
  'graphic-designing': { meta_title: 'Graphic Designing | Vetri IT Systems Private Limited', meta_description: 'Graphic design services from Vetri IT Systems: logos, branding, social media creatives, brochures and marketing designs.' },
  'website-development': { meta_title: 'Website Development | Vetri IT Systems Private Limited', meta_description: 'Website Development — custom digital solutions from Vetri IT Systems Private Limited.' },
  'app-development': { meta_title: 'App Development | Vetri IT Systems Private Limited', meta_description: 'App Development — custom digital solutions from Vetri IT Systems Private Limited.' },
  'software-development': { meta_title: 'Software Development | Vetri IT Systems Private Limited', meta_description: 'Software Development — custom digital solutions from Vetri IT Systems Private Limited.' },
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
      eyebrow: 'Quick Answers', title: 'Frequently Asked Questions About Contacting Us', highlight: 'Contacting Us',
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
  'graphic-designing': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Graphic Designing That Makes Your Brand Memorable', highlight: 'Memorable', align: 'center',
        description: 'Logos, brand identity, social media creatives, brochures and marketing designs crafted to look great and communicate clearly.',
        image: img('marketing.png', 'Graphic design team working on brand creatives'),
        button: { text: 'Get a Quote', link: '#enquiry' },
      },
    },
    {
      key: 'enquiry', label: 'Enquiry Form',
      content: {
        title: 'Have a Design Project in Mind?', highlight: 'Design Project',
        description: 'Tell us what you need and our design team will get back to you with ideas and a quote.',
        image: img('cta.png', 'Design team discussing a project'),
        requirements: ['Logo & Branding', 'Social Media Creatives', 'Brochure & Print Design', 'UI / Web Design', 'Other'],
        budgets: ['Below ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹50,000', 'Above ₹50,000'],
        button_text: 'Get a Quote', whatsapp_text: 'WhatsApp Us',
        success_message: 'Thank you! Our team will contact you shortly.',
      },
    },
  ],

  contact: contactPage,
  about: aboutPage,
  solutions: productsPage,
  'website-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Transforming Ideas into Enterprise-Grade Digital Reality', highlight: '', align: 'center',
        description: 'We design, build, and scale custom web platforms, mobile apps, and enterprise cloud software that power measurable commercial growth.',
        image: img('sections/8b92283e-2871-4d7c-8f0d-ddc58eae6d77.png', 'Transforming Ideas into Enterprise-Grade Digital Reality'),
        button: { text: '', link: '' },
      },
    },
    { key: 'stats', label: 'Stats', content: STATS },
    { key: 'clients', label: 'Our Clients', content: { eyebrow: '/ Project Showcase', title: 'Our Clients', highlight: 'Clients', items: webClients } },
    { key: 'journey', label: 'How We Work', content: JOURNEY },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        title: 'Capabilities', highlight: '', variant: 'chips',
        items: capItems([
          ['Search', 'SEO Ready'], ['LayoutTemplate', 'CMS'], ['CreditCard', 'Payment Gateway'], ['Gauge', 'Speed Optimised'],
          ['MonitorSmartphone', 'Responsive Design'], ['BarChart3', 'Analytics'], ['ShieldCheck', 'Secure Hosting'], ['Languages', 'Multilingual'],
          ['Accessibility', 'Accessibility'], ['Workflow', 'Custom Workflow'], ['Smartphone', 'Mobile First'], ['Activity', '99.9% Uptime'],
          ['TrendingUp', 'High Conversion'], ['Database', 'Scalable Backend'],
        ]),
        stats: [],
      },
    },
    {
      key: 'pricing', label: 'Pricing Packages',
      content: {
        title: 'Website Pricing Packages', highlight: 'Pricing Packages',
        plans: [
          { name: 'Single Page Website', subtitle: '1-PAGE', price: '₹ 3,000 + GST', features: ['1 Year Server Free', '1 Year Domain Free', 'Basic Call and Mail Integration', 'No Payment Gateway'], button_text: 'BOOK NOW ↗', button_link: '/contact' },
          { name: 'Service Based – Commerce Website', subtitle: '3-PAGES', price: '₹ 10,000 + GST', features: ['1 Year Server Free', '1 Year Domain Free', 'Service Catalogue', 'Appointment Booking', 'Payment Gateway'], button_text: 'BOOK NOW ↗', button_link: '/contact', featured: true },
          { name: 'Customized Website', subtitle: 'Based on Requirements', price: '₹ 10,000 – ₹15,000 + GST', features: ['1 Year Server Free', '1 Year Domain Free', 'Service Catalogue', 'Payment Gateway'], button_text: 'BOOK NOW ↗', button_link: '/contact' },
        ],
      },
    },
    {
      key: 'brochure', label: 'Brochure Download',
      content: {
        title: 'Download Web Development Brochure', highlight: 'Development Brochure',
        description: 'Explore our website development services, capabilities and solutions in our company brochure.',
        button_text: 'Download Brochure', link: '', files: BROCHURE_FILES['website-development'],
        book_label: 'VIS', book_title: 'Website Development', book_caption: 'COMPANY BROCHURE',
      },
    },
    {
      key: 'cta', label: 'Call To Action',
      content: {
        eyebrow: 'Let’s Collaborate', title: 'YOUR NEXT DIGITAL EXPERIENCE STARTS HERE', subtitle: '', description: '',
        image: img('reference/web-cta.png', ''), primary_button: { text: 'Create Your Website', link: '/contact' }, secondary_button: { text: '', link: '' },
      },
    },
  ],

  'app-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Transforming Ideas into Enterprise-Grade Digital Reality', highlight: '', align: 'center',
        description: 'We design, build, and scale custom web platforms, mobile apps, and enterprise cloud software that power measurable commercial growth.',
        image: img('sections/Appbg.png', 'Transforming Ideas into Enterprise-Grade Digital Reality'),
        button: { text: '', link: '' },
      },
    },
    { key: 'stats', label: 'Stats', content: STATS },
    {
      key: 'clients', label: 'Our Clients',
      content: {
        eyebrow: '/ Project Showcase', title: 'Our Clients', highlight: 'Clients',
        items: [
          { image: img('reference/app-project-1.jpg', 'QUICKRETAIL POS'), name: 'QUICKRETAIL POS', location: '', category: 'Mobile Commerce', description: 'Sub-second checkout mobile POS with 42% order speed lift.', link: '' },
          { image: img('reference/app-project-2.jpg', 'MEDPULSE TELEHEALTH'), name: 'MEDPULSE TELEHEALTH', location: '', category: 'Digital Healthcare', description: 'HIPAA-compliant telemedicine app serving 120,000+ monthly patients.', link: '' },
        ],
      },
    },
    { key: 'journey', label: 'How We Work', content: JOURNEY },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        title: 'Capabilities', highlight: '', variant: 'app',
        items: capItems([
          ['Apple', 'iOS Native (Swift)'], ['Smartphone', 'Android (Kotlin)'], ['Layers', 'Flutter Cross-Platform'], ['Atom', 'React Native'],
          ['WifiOff', 'Offline-First SQLite'], ['Bell', 'Push Notifications (FCM/APNs)'], ['Fingerprint', 'Biometric Auth (Face / Touch ID)'],
          ['Wallet', 'Razorpay / UPI Integration'], ['Radio', 'Real-time WebSockets'], ['MapPin', 'Mapbox & Live GPS'], ['Bluetooth', 'Bluetooth BLE Sync'],
          ['Store', 'App Store Optimization (ASO)'], ['Zap', '60 FPS Micro-Interactions'],
        ]),
        stats: [{ value: '100+', label: 'Apps Delivered' }, { value: '99.9%', label: 'Uptime' }, { value: '50+', label: 'Happy Clients' }, { value: '24/7', label: 'Support' }],
      },
    },
    {
      key: 'cta', label: 'Call To Action',
      content: {
        eyebrow: 'Let’s Collaborate', title: 'YOUR NEXT BIG IDEA BELONGS IN AN APP', subtitle: 'Bring Your App Idea to Life.',
        description: 'We build mobile experiences that feel natural, perform reliably, and help your business connect with customers.',
        image: img('reference/app-cta.png', ''), primary_button: { text: 'Build Your App', link: '/contact' }, secondary_button: { text: '', link: '' },
      },
    },
  ],

  'software-development': [
    {
      key: 'hero', label: 'Hero Banner',
      content: {
        title: 'Transforming Business Operations into High-Throughput Custom Software', highlight: '', align: 'left',
        description: 'We architect, engineer, and scale custom ERPs, cloud platforms, automated billing engines, and robust business systems built for zero downtime and measurable commercial growth.',
        image: img('sections/softbg.png', 'Transforming Business Operations into High-Throughput Custom Software'),
        button: { text: '', link: '' },
      },
    },
    {
      key: 'clients', label: 'Our Clients',
      content: {
        eyebrow: '/ Project Showcase', title: 'Our Clients', highlight: 'Clients',
        items: [
          { image: img('items/vift.png', 'VETRI BILLING'), name: 'VETRI BILLING', location: '', category: 'ERP & Billing', description: '', link: '' },
          { image: img('items/Ak.png', 'Akash Photography'), name: 'Akash Photography', location: '', category: 'Projects Tracking', description: '', link: '' },
        ],
      },
    },
    { key: 'journey', label: 'How We Work', content: JOURNEY },
    {
      key: 'capabilities', label: 'Capabilities',
      content: {
        title: 'Our Capabilities', highlight: 'Capabilities', variant: 'software',
        items: capItems([
          ['Building2', 'Enterprise ERP'], ['Receipt', 'Custom Billing POS'], ['Cloud', 'Cloud Architecture'], ['Layers', 'Multi-Tenant SaaS'],
          ['Cpu', 'High-Concurrency Go / Node'], ['Database', 'PostgreSQL & TimescaleDB'], ['Container', 'Docker & Kubernetes'], ['FileCheck2', 'Automated GST / E-Way'],
          ['Lock', 'Role-Based Access (RBAC)'], ['RefreshCw', 'Offline-First Sync'], ['ShieldCheck', 'SOC2 & ISO 27001'], ['Activity', '99.99% Uptime SLA'],
          ['Network', 'Kafka Event Streams'], ['Timer', 'Sub-Second Latency'],
        ]),
        stats: CAP_STATS,
      },
    },
    {
      key: 'cta', label: 'Call To Action',
      content: {
        eyebrow: 'Let’s Collaborate', title: 'BUILT AROUND THE WAY YOU WORK', subtitle: 'Stop Adapting Your Business to Software.',
        description: 'Get custom-built software designed around your processes, challenges, and ambitions — not someone else’s template.',
        image: img('reference/software-cta.png', ''), primary_button: { text: 'Build Your Solution', link: '/contact' }, secondary_button: { text: '', link: '' },
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
  'app-development': ['App Development', 'Development Brochure', 'cta'],
  'software-development': ['Software Development', 'Development Brochure', 'cta'],
  'digital-marketing': ['Digital Marketing', 'Marketing Brochure', 'faq'],
  'graphic-designing': ['Graphic Designing', 'Designing Brochure', 'enquiry'],
};
for (const [slug, [topic, highlight, before]] of Object.entries(BROCHURE_BEFORE)) {
  const list = servicePages[slug];
  const at = list.findIndex((s) => s.key === before);
  list.splice(at < 0 ? list.length : at, 0, brochure(slug, topic, highlight));
}
