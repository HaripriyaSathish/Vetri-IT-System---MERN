// Admin form definitions per home-page section (section_key).
// Each section is split into tabs so no editor becomes one long scrolling form.
import {
  Image, Repeat, Info, Briefcase, Package, ThumbsUp, Workflow, Users, Megaphone, LayoutTemplate, Building2,
} from 'lucide-react';

const heading = (extra = []) => [
  { name: 'eyebrow', label: 'Eyebrow label', type: 'text', hint: 'Small pill text above the heading' },
  { name: 'title', label: 'Heading', type: 'text', required: true },
  { name: 'highlight', label: 'Orange highlight', type: 'text', hint: 'Exact words from the heading to show in orange' },
  { name: 'description', label: 'Intro text', type: 'textarea' },
  ...extra,
];

const iconCards = (name, label, itemLabel) => ({
  name, label, type: 'list', itemLabel, titleKey: 'title',
  fields: [
    { name: 'icon', label: 'Icon', type: 'icon' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  ],
});

export const sectionIcons = {
  hero: Image, ticker: Repeat, about: Info, services: Briefcase, solutions: Package,
  industries: Building2, why_choose: ThumbsUp, process: Workflow, team: Users,
  cta: Megaphone,
};
export const SectionFallbackIcon = LayoutTemplate;

export const sectionSchemas = {
  hero: [
    {
      tab: 'Heading', fields: [
        { name: 'eyebrow', label: 'Eyebrow label', type: 'text' },
        { name: 'title', label: 'Main heading (H1)', type: 'textarea', rows: 2, required: true },
        { name: 'highlight', label: 'Orange highlight', type: 'text', hint: 'Exact words from the heading to show in orange' },
        { name: 'description', label: 'Sub-text', type: 'textarea' },
      ],
    },
    {
      tab: 'Tags & Buttons', fields: [
        { name: 'tags', label: 'Feature tags', type: 'tags' },
        { name: 'primary_button', label: 'Primary button', type: 'button' },
        { name: 'secondary_button', label: 'Demo video button', type: 'button', noLink: true, hint: 'Opens the demo video in a popup' },
      ],
    },
    { tab: 'Stats', fields: [{ name: 'stats', label: 'Stat counters', type: 'list', itemLabel: 'Stat', titleKey: 'label', fields: [
      { name: 'value', label: 'Value', type: 'text', placeholder: '50+' },
      { name: 'label', label: 'Label', type: 'text' },
    ] }] },
    {
      tab: 'Media', fields: [
        { name: 'background', label: 'Background image / video', type: 'media', accept: 'image/*,video/*' },
        { name: 'demo_video', label: 'Demo video (popup)', type: 'media', accept: 'video/*' },
      ],
    },
  ],

  ticker: [
    {
      tab: 'Ticker', fields: [
        { name: 'items', label: 'Scrolling items', type: 'tags' },
        { name: 'separator', label: 'Separator symbol', type: 'text', placeholder: '🔶', half: true },
        { name: 'speed', label: 'Speed (seconds per loop)', type: 'number', hint: 'Lower = faster. Default 40', half: true },
      ],
    },
  ],

  about: [
    {
      tab: 'Content', fields: [
        { name: 'eyebrow', label: 'Eyebrow label', type: 'text' },
        { name: 'title', label: 'Heading (H2)', type: 'text', required: true },
        { name: 'highlight', label: 'Orange highlight', type: 'text' },
        { name: 'paragraphs', label: 'Paragraphs', type: 'paragraphs' },
      ],
    },
    { tab: 'Feature Cards', fields: [iconCards('cards', 'Animated cards', 'Card')] },
    {
      tab: 'Images & Badge', fields: [
        { name: 'image', label: 'Main image', type: 'media' },
        { name: 'image_secondary', label: 'Small floating image', type: 'media' },
        { name: 'badge_value', label: 'Badge value', type: 'text', placeholder: '2+', half: true },
        { name: 'badge_label', label: 'Badge label', type: 'text', placeholder: 'Years of Excellence', half: true },
      ],
    },
  ],

  services: [
    { tab: 'Heading', fields: heading([{ name: 'flow_label', label: 'Flow caption', type: 'text', placeholder: 'ENGINEERED FLOW' }]) },
    { tab: 'Service Cards', collection: 'services' },
  ],

  solutions: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Product Tabs', collection: 'solutions' },
  ],

  industries: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Industries', fields: [iconCards('items', 'Industries', 'Industry')] },
  ],

  why_choose: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Reasons', fields: [iconCards('items', 'Reasons', 'Reason')] },
    { tab: 'Image', fields: [{ name: 'image', label: 'Side illustration', type: 'media' }] },
  ],

  process: [
    { tab: 'Heading', fields: heading() },
    { tab: 'Steps', fields: [iconCards('steps', 'Process steps', 'Step')] },
  ],

  team: [
    { tab: 'Content', fields: heading([{ name: 'tags', label: 'Tags', type: 'tags' }]) },
    { tab: 'Image', fields: [{ name: 'image', label: 'Section image', type: 'media' }] },
  ],

  cta: [
    {
      tab: 'Content', fields: [
        { name: 'eyebrow', label: 'Eyebrow label', type: 'text' },
        { name: 'title', label: 'Heading (H2)', type: 'text', required: true },
        { name: 'subtitle', label: 'Orange sub-heading', type: 'text' },
        { name: 'description', label: 'Text', type: 'textarea' },
      ],
    },
    {
      tab: 'Buttons', fields: [
        { name: 'primary_button', label: 'Primary button', type: 'button', hint: 'e.g. /contact' },
        { name: 'secondary_button', label: 'Secondary button', type: 'button', hint: 'e.g. tel:8438781327' },
      ],
    },
    { tab: 'Background', fields: [{ name: 'image', label: 'Background image', type: 'media' }] },
  ],

};
