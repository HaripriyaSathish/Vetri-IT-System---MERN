// Admin form definitions for the "Our Expertise" pages, by section type
// (section key -> type mapping lives in lib/sectionTypes.js).
import {
  Image, BarChart3, Building2, Workflow, Sparkles, BadgeIndianRupee, BookOpen, Megaphone, LayoutGrid, Tags, HelpCircle, ClipboardList,
  Boxes, Orbit, Wrench, Crown, Target, Mail, MapPinned, Palette, FolderKanban, BookOpenCheck,
} from 'lucide-react';
import { DESIGN_ART_OPTIONS } from '../../components/service/DesignArt';

// animated cartoon illustration (Graphic Designing) + its alt text
const artFields = (label = 'Cartoon illustration') => [
  { name: 'art', label, type: 'select', options: DESIGN_ART_OPTIONS, half: true },
  { name: 'art_alt', label: 'Illustration alt text', type: 'text', half: true },
];

const heading = (extra = []) => [
  { name: 'eyebrow', label: 'Eyebrow label', type: 'text' },
  { name: 'title', label: 'Heading', type: 'text', required: true },
  { name: 'highlight', label: 'Orange highlight', type: 'text', hint: 'Exact words from the heading to show in orange' },
  { name: 'description', label: 'Intro text', type: 'textarea' },
  ...extra,
];

const iconItems = (name, label, itemLabel, withDesc = true) => ({
  name, label, type: 'list', itemLabel, titleKey: withDesc ? 'title' : 'label',
  fields: withDesc
    ? [{ name: 'icon', label: 'Icon', type: 'icon' }, { name: 'title', label: 'Title', type: 'text' }, { name: 'description', label: 'Description', type: 'textarea', rows: 2 }]
    : [{ name: 'icon', label: 'Icon', type: 'icon' }, { name: 'label', label: 'Label', type: 'text' }, { name: 'description', label: 'Short description (optional)', type: 'text' }],
});

const statsList = (name = 'items', label = 'Stats') => ({
  name, label, type: 'list', itemLabel: 'Stat', titleKey: 'label',
  fields: [{ name: 'value', label: 'Value', type: 'text', placeholder: '50+', half: true }, { name: 'label', label: 'Label', type: 'text', half: true }],
});

export const serviceTypeIcons = {
  hero: Image, stats: BarChart3, clients: Building2, journey: Workflow, capabilities: Sparkles, pricing: BadgeIndianRupee,
  brochure: BookOpen, cta: Megaphone, cards: LayoutGrid, chips: Tags, faq: HelpCircle, enquiry: ClipboardList,
  offerings: Palette, portfolio: FolderKanban, casestudies: BookOpenCheck, ctaband: Megaphone, products: Boxes, ecosystem: Orbit, split: Wrench, leaders: Crown, mission: Target, contact: Mail, map: MapPinned,
};

export const serviceSchemas = {
  hero: [
    {
      tab: 'Content', fields: [
        { name: 'eyebrow', label: 'Eyebrow label (optional)', type: 'text' },
        { name: 'title', label: 'Main heading (H1)', type: 'textarea', rows: 2, required: true },
        { name: 'highlight', label: 'Orange highlight', type: 'text' },
        { name: 'description', label: 'Sub-text', type: 'textarea' },
        { name: 'description_2', label: 'Second paragraph (light layout)', type: 'textarea', rows: 2 },
        { name: 'tags', label: 'Tag pills (light layout)', type: 'tags' },
        {
          name: 'badges', label: 'Floating badges around the image (light layout, up to 4)', type: 'list', itemLabel: 'Badge', titleKey: 'text',
          fields: [{ name: 'icon', label: 'Icon', type: 'icon', half: true }, { name: 'text', label: 'Text', type: 'text', half: true }],
        },
        {
          name: 'align', label: 'Layout', type: 'select', half: true,
          options: [['center', 'Image background · centered text'], ['left', 'Image background · left text'], ['split', 'Light · text left, image right']],
        },
        { name: 'button', label: 'Button (optional)', type: 'button' },
        { name: 'secondary_button', label: 'Second button (light layout)', type: 'button' },
      ],
    },
    {
      tab: 'Image', fields: [
        { name: 'image', label: 'Hero image', type: 'media' }, ...artFields('Cartoon scene instead of the image (light layout)'),
        {
          name: 'screens', label: 'Project screenshots cycling in a laptop (light layout, replaces the image)', type: 'list', itemLabel: 'Screenshot', titleKey: 'name',
          fields: [{ name: 'name', label: 'Project name', type: 'text' }, { name: 'image', label: 'Screenshot', type: 'media' }],
        },
      ],
    },
  ],

  contact: [
    {
      tab: 'Form', fields: [
        { name: 'form_title', label: 'Form heading', type: 'text' },
        { name: 'form_intro', label: 'Form intro', type: 'textarea', rows: 3 },
        { name: 'trust_points', label: 'Trust chips under the heading (up to 3)', type: 'tags', hint: 'Default: Free technical estimate · Reply within 1 business day · 100% confidential' },
        { name: 'services', label: 'Service dropdown options', type: 'tags' },
        { name: 'button_text', label: 'Submit button text', type: 'text', half: true },
        { name: 'success_message', label: 'Success message', type: 'textarea', rows: 2 },
      ],
    },
    {
      tab: 'Contact Details', fields: [
        { name: 'details_title', label: 'Card heading', type: 'text' },
        { name: 'phones', label: 'Phone numbers', type: 'tags' },
        { name: 'whatsapp', label: 'WhatsApp number', type: 'text', half: true, hint: 'Country code + number, digits only' },
        { name: 'hours', label: 'Working hours', type: 'text', half: true },
        { name: 'office_title', label: 'Office heading', type: 'text' },
        { name: 'office_name', label: 'Office name', type: 'text', half: true },
        { name: 'address', label: 'Address', type: 'textarea', rows: 2, hint: 'Keep it exactly as in the Google Business Profile' },
        { name: 'directions_link', label: 'Directions button link', type: 'text', hint: 'Google Business Profile / Maps link. Leave empty to search the address' },
      ],
    },
  ],

  map: [
    {
      tab: 'Content', fields: heading([
        { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
        { name: 'hours', label: 'Working hours', type: 'text', half: true },
        { name: 'phone', label: 'Phone', type: 'text', half: true },
      ]),
    },
    {
      tab: 'Map & Button', fields: [
        { name: 'map_embed', label: 'Google Maps embed URL', type: 'textarea', rows: 2, hint: 'Google Maps → Share → Embed a map → copy the src link' },
        { name: 'map_title', label: 'Map title (accessibility)', type: 'text' },
        { name: 'button', label: 'Directions button', type: 'button', hint: 'Link to your Google Business Profile or Google Maps' },
      ],
    },
  ],

  leaders: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Leaders', fields: [{
        name: 'items', label: 'Leaders', type: 'list', itemLabel: 'Leader', titleKey: 'name',
        fields: [
          { name: 'photo', label: 'Photo (initials show when empty)', type: 'media' },
          { name: 'name', label: 'Name', type: 'text', half: true },
          { name: 'role', label: 'Designation', type: 'text', half: true },
          { name: 'description', label: 'About', type: 'textarea', rows: 4 },
        ],
      }],
    },
  ],

  mission: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Cards', fields: [iconItems('items', 'Vision / Mission cards', 'Card')] },
    { tab: 'Image', fields: [{ name: 'image', label: 'Side image', type: 'media' }] },
  ],

  stats: [{ tab: 'Stats', fields: [statsList()] }],

  clients: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Clients', fields: [{
        name: 'items', label: 'Client / project cards', type: 'list', itemLabel: 'Client', titleKey: 'name', hideable: true,
        fields: [
          { name: 'image', label: 'Screenshot', type: 'media' },
          { name: 'name', label: 'Name', type: 'text', half: true },
          { name: 'location', label: 'Location', type: 'text', half: true },
          { name: 'category', label: 'Category tag', type: 'text', half: true },
          { name: 'link', label: 'Website link (optional)', type: 'text', half: true, placeholder: 'https://www.client-site.com', hint: 'The client name and screenshot open this site in a new tab' },
          { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
          { name: 'problem', label: 'Client problem', type: 'textarea', rows: 3, hint: 'What the client was struggling with (shown under the project name; leave empty to hide)' },
          { name: 'solution', label: 'Our solution', type: 'textarea', rows: 3, hint: 'How we solved it (leave empty to hide)' },
        ],
      }],
    },
  ],

  journey: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Steps', fields: [iconItems('steps', 'Steps', 'Step')] },
  ],

  capabilities: [
    {
      tab: 'Heading', fields: heading([
        { name: 'variant', label: 'Layout', type: 'select', options: [['chips', 'Chip grid'], ['app', 'List + phone mockups'], ['software', 'List + laptop mockup']], half: true },
      ]),
    },
    { tab: 'Capabilities', fields: [iconItems('items', 'Capabilities', 'Capability', false)] },
    { tab: 'Cards & Stats', fields: [iconItems('cards', 'Feature cards (optional)', 'Card'), statsList('stats', 'Stats under the mockup')] },
  ],

  pricing: [
    {
      tab: 'Heading', fields: heading([
        {
          name: 'layout', label: 'Card layout', type: 'select', half: true,
          options: [['auto', 'Auto (wide rows for 1–2 plans)'], ['cards', 'Cards side by side'], ['wide', 'Wide rows (shorter cards)'], ['showcase', 'Showcase cards (tag, icon, two buttons)']],
        },
      ]),
    },
    {
      tab: 'Plans', fields: [{
        name: 'plans', label: 'Plans / packages', type: 'list', itemLabel: 'Plan', titleKey: 'name',
        fields: [
          { name: 'name', label: 'Plan name', type: 'text', half: true },
          { name: 'tag', label: 'Tag (optional)', type: 'text', half: true, placeholder: 'Special Offer' },
          { name: 'icon', label: 'Icon (showcase cards)', type: 'icon', half: true },
          { name: 'subtitle', label: 'Sub label', type: 'text', half: true, placeholder: '1-PAGE' },
          { name: 'price', label: 'Price', type: 'text', half: true },
          { name: 'price_note', label: 'Price note', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
          { name: 'features', label: 'Features (start with "No " to show a cross)', type: 'tags' },
          { name: 'benefits', label: 'Benefit chips', type: 'tags' },
          { name: 'note', label: 'Small note', type: 'textarea', rows: 2 },
          { name: 'button_text', label: 'Button text', type: 'text', half: true },
          { name: 'button_link', label: 'Button link', type: 'text', half: true },
          { name: 'secondary_text', label: 'Second button text', type: 'text', half: true },
          { name: 'secondary_link', label: 'Second button link', type: 'text', half: true },
          { name: 'featured', label: 'Highlight this plan', type: 'switch' },
          ...artFields('Cartoon on the card (wide layout)'),
        ],
      }],
    },
  ],

  brochure: [
    {
      tab: 'Content', fields: [
        { name: 'title', label: 'Heading', type: 'text', required: true },
        { name: 'highlight', label: 'Orange highlight', type: 'text' },
        { name: 'description', label: 'Text', type: 'textarea' },
        { name: 'button_text', label: 'Button text', type: 'text', half: true },
      ],
    },
    {
      tab: 'Files', fields: [
        {
          name: 'files', label: 'Brochure files', type: 'list', itemLabel: 'Brochure', titleKey: 'title',
          hint: 'The Download Brochure button downloads every file listed here, one after another.',
          fields: [
            { name: 'title', label: 'Name shown to visitors', type: 'text', placeholder: 'e.g. E-commerce Website Brochure' },
            { name: 'file', label: 'File — PDF, image or ZIP', type: 'media', accept: 'application/pdf,image/*,.zip,application/zip,application/x-zip-compressed' },
          ],
        },
        { name: 'link', label: 'Or external download link', type: 'text', hint: 'Used only when no files are added above' },
      ],
    },
    {
      tab: 'Book Cover', fields: [
        { name: 'book_label', label: 'Top label', type: 'text', half: true },
        { name: 'book_caption', label: 'Bottom caption', type: 'text', half: true },
        { name: 'book_title', label: 'Title', type: 'text' },
      ],
    },
  ],

  cta: [
    {
      tab: 'Content', fields: [
        { name: 'eyebrow', label: 'Eyebrow label', type: 'text' },
        { name: 'title', label: 'Heading', type: 'text', required: true },
        { name: 'subtitle', label: 'Orange sub-heading', type: 'text' },
        { name: 'description', label: 'Text', type: 'textarea' },
      ],
    },
    { tab: 'Buttons', fields: [{ name: 'primary_button', label: 'Primary button', type: 'button' }, { name: 'secondary_button', label: 'Secondary button', type: 'button' }] },
    { tab: 'Background', fields: [{ name: 'image', label: 'Background image', type: 'media' }] },
  ],

  cards: [
    { tab: 'Heading', fields: heading([{ name: 'layout', label: 'Card style', type: 'select', half: true, options: [['', 'Standard cards'], ['tiles', 'Numbered tiles (fill on hover)']] }]) },
    { tab: 'Cards', fields: [iconItems('items', 'Cards', 'Card')] },
  ],

  chips: [
    { tab: 'Heading', fields: heading(artFields('Cartoon beside the chips (optional)')) },
    { tab: 'Items', fields: [{ name: 'items', label: 'Items', type: 'tags' }] },
  ],

  faq: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Questions', fields: [{
        name: 'items', label: 'Questions', type: 'list', itemLabel: 'Question', titleKey: 'question',
        fields: [{ name: 'question', label: 'Question', type: 'text' }, { name: 'answer', label: 'Answer', type: 'textarea', rows: 4 }],
      }],
    },
  ],

  portfolio: [
    { tab: 'Heading', fields: heading([{ name: 'search_placeholder', label: 'Search box placeholder', type: 'text', half: true }, { name: 'all_label', label: 'First tab label', type: 'text', half: true, placeholder: 'All Projects' }]) },
    {
      tab: 'Service categories', fields: [{
        name: 'categories', label: 'Service category filters', type: 'list', itemLabel: 'Category', titleKey: 'label', hideable: true,
        hint: 'The main filter row. A project shows under a category when one of its Service tags is in that category\'s tag list.',
        fields: [
          { name: 'icon', label: 'Icon', type: 'icon', half: true },
          { name: 'label', label: 'Category name', type: 'text', half: true },
          { name: 'match_tags', label: 'Project service tags in this category', type: 'tags', hint: 'e.g. SEO, GSC for Digital Marketing' },
        ],
      }],
    },
    {
      tab: 'Industry tabs', fields: [{
        name: 'filters', label: 'Industry filter tabs', type: 'list', itemLabel: 'Tab', titleKey: 'label', hideable: true,
        hint: 'Second filter row. A project shows under a tab when its Industry matches the tab label exactly; tabs with no projects in the chosen category are not shown.',
        fields: [{ name: 'icon', label: 'Icon', type: 'icon', half: true }, { name: 'label', label: 'Label', type: 'text', half: true }],
      }],
    },
    {
      tab: 'Projects', fields: [{
        name: 'items', label: 'Project cards', type: 'list', itemLabel: 'Project', titleKey: 'name', hideable: true,
        fields: [
          { name: 'image', label: 'Screenshot', type: 'media' },
          { name: 'name', label: 'Project name (H3)', type: 'text', half: true },
          { name: 'location', label: 'Location', type: 'text', half: true },
          { name: 'industry', label: 'Industry (must match a tab label)', type: 'text', half: true },
          { name: 'case_study', label: 'Case study name (arrow opens it)', type: 'text', half: true },
          { name: 'tags', label: 'Service tags', type: 'tags' },
          { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
          { name: 'link', label: 'Live website link', type: 'text', placeholder: 'https://www.client-site.com', hint: 'Opens in a new tab with rel="nofollow noopener". Leave empty to hide the Live Website link.' },
        ],
      }],
    },
  ],

  casestudies: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Case studies', fields: [{
        name: 'items', label: 'Case study cards', type: 'list', itemLabel: 'Case study', titleKey: 'name', hideable: true,
        fields: [
          { name: 'image', label: 'Screenshot', type: 'media' },
          { name: 'name', label: 'Client name (H3)', type: 'text', half: true },
          { name: 'industry', label: 'Industry', type: 'text', half: true },
          { name: 'industry_icon', label: 'Industry icon', type: 'icon', half: true },
          { name: 'link', label: 'Live website link', type: 'text', half: true },
          { name: 'heading', label: 'Card heading', type: 'text' },
          { name: 'description', label: 'Card description', type: 'textarea', rows: 2 },
          {
            name: 'features', label: 'Card key features (3)', type: 'list', itemLabel: 'Feature', titleKey: 'label',
            fields: [{ name: 'icon', label: 'Icon', type: 'icon', half: true }, { name: 'label', label: 'Label', type: 'text', half: true }],
          },
          { name: 'popup_description', label: 'Popup description', type: 'textarea', rows: 3 },
          { name: 'challenge', label: 'The Challenge', type: 'textarea', rows: 3 },
          { name: 'solution', label: 'Our Solution', type: 'textarea', rows: 3 },
          { name: 'key_features', label: 'Popup key features', type: 'tags' },
          { name: 'highlights', label: 'Project highlights', type: 'tags' },
        ],
      }],
    },
  ],

  ctaband: [
    {
      tab: 'Content', fields: heading([
        { name: 'button', label: 'Main button', type: 'button' },
        { name: 'whatsapp_text', label: 'WhatsApp button text (empty hides it)', type: 'text', half: true },
        { name: 'show_contact', label: 'Show phone, email and address from Site Settings', type: 'switch', half: true },
      ]),
    },
  ],

  offerings: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Services', fields: [{
        name: 'items', label: 'Service cards', type: 'list', itemLabel: 'Service', titleKey: 'title',
        fields: [
          ...artFields(),
          { name: 'icon', label: 'Icon (when no cartoon)', type: 'icon', half: true },
          { name: 'title', label: 'Title', type: 'text', half: true },
          { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
          { name: 'features', label: 'Feature list', type: 'tags' },
        ],
      }],
    },
  ],

  products: [
    { tab: 'Heading', fields: heading() },
    {
      tab: 'Products', fields: [{
        name: 'items', label: 'Product cards', type: 'list', itemLabel: 'Product', titleKey: 'name',
        fields: [
          { name: 'icon', label: 'Icon', type: 'icon', half: true },
          { name: 'name', label: 'Product name', type: 'text', half: true },
          { name: 'summary', label: 'Summary', type: 'textarea', rows: 2 },
          { name: 'chips', label: 'Feature chips', type: 'tags' },
          { name: 'image', label: 'Dashboard screenshot', type: 'media' },
          { name: 'video', label: 'Intro video', type: 'media', accept: 'video/*' },
          { name: 'primary_text', label: 'Main button text', type: 'text', half: true },
          { name: 'primary_link', label: 'Main button link', type: 'text', half: true },
          { name: 'secondary_text', label: 'Second button text', type: 'text', half: true },
          { name: 'secondary_link', label: 'Second button link', type: 'text', half: true },
        ],
      }],
    },
  ],

  ecosystem: [
    { tab: 'Heading', fields: heading([{ name: 'center', label: 'Hub label', type: 'text', half: true }]) },
    { tab: 'Items', fields: [iconItems('items', 'Items around the hub', 'Item')] },
  ],

  split: [
    { tab: 'Content', fields: heading([{ name: 'points', label: 'Checklist points', type: 'tags' }, { name: 'button', label: 'Button', type: 'button' }]) },
    { tab: 'Image', fields: [{ name: 'image', label: 'Side image (optional)', type: 'media', hint: 'Leave empty to show the animated code window' }] },
  ],

  enquiry: [
    {
      tab: 'Content', fields: heading([
        { name: 'whatsapp_text', label: 'WhatsApp button text', type: 'text', half: true },
        { name: 'brochure_text', label: 'Brochure button text (optional)', type: 'text', half: true },
        { name: 'brochure_link', label: 'Brochure file / link', type: 'text', half: true, placeholder: '/media/brochures/...' },
        ...artFields('Cartoon under the text (optional)'),
      ]),
    },
    {
      tab: 'Form', fields: [
        { name: 'business_field', label: 'Ask for Business Name', type: 'switch', half: true },
        { name: 'requirement_label', label: 'Dropdown label', type: 'text', half: true, placeholder: 'Requirement' },
        { name: 'requirements', label: 'Dropdown options', type: 'tags' },
        { name: 'budgets', label: 'Budget options (leave empty to hide)', type: 'tags' },
        { name: 'button_text', label: 'Submit button text', type: 'text', half: true },
        { name: 'success_message', label: 'Success message', type: 'textarea', rows: 2 },
      ],
    },
    { tab: 'Background', fields: [{ name: 'image', label: 'Background image', type: 'media' }] },
  ],
};
