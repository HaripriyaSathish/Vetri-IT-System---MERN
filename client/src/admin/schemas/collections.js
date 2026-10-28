// Admin form + list definitions for collection tables (generic /admin/c/:resource API)
export const collections = {
  services: {
    singular: 'Service', plural: 'Service cards',
    titleKey: 'title', subtitleKey: 'badge', imageKey: 'image',
    defaults: { image: null, is_active: 1, show_on_home: 1 },
    tabs: [
      {
        tab: 'Card', fields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'nav_label', label: 'Menu label', type: 'text', hint: 'Shown in the Our Expertise dropdown', half: true },
          { name: 'nav_icon', label: 'Menu icon', type: 'icon', hint: 'Icon next to the label in the Our Expertise dropdown' },
          { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'e.g. website-development', half: true },
          { name: 'badge', label: 'Badge', type: 'text', placeholder: 'Flagship Web' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        tab: 'Flow & Link', fields: [
          { name: 'flow', label: 'Engineered flow', type: 'textarea', rows: 2, hint: 'Steps separated by →' },
          { name: 'link', label: 'Page link', type: 'text', placeholder: '/website-development', half: true },
          { name: 'link_title', label: 'Link title (SEO)', type: 'text', half: true },
          { name: 'show_on_home', label: 'Show as a card in the home page "Our Services" section', type: 'switch' },
        ],
      },
      { tab: 'Image', fields: [{ name: 'image', label: 'Card image', type: 'media' }] },
    ],
  },

  solutions: {
    singular: 'Product', plural: 'Product tabs',
    titleKey: 'tab_label', subtitleKey: 'title', imageKey: 'image',
    defaults: { features: [], stats: [], image: null, is_active: 1 },
    tabs: [
      {
        tab: 'Heading', fields: [
          { name: 'tab_label', label: 'Tab label', type: 'text', required: true, half: true },
          { name: 'slug', label: 'Slug', type: 'text', required: true, half: true },
          { name: 'badge', label: 'Badge', type: 'text' },
          { name: 'title', label: 'Heading (H3)', type: 'text', required: true },
          { name: 'subtitle', label: 'Sub-heading', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        tab: 'Features', fields: [{
          name: 'features', label: 'Features', type: 'list', itemLabel: 'Feature', titleKey: 'title', fields: [
            { name: 'icon', label: 'Icon', type: 'icon' },
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
          ],
        }],
      },
      {
        tab: 'Stats', fields: [{
          name: 'stats', label: 'Stats', type: 'list', itemLabel: 'Stat', titleKey: 'label', fields: [
            { name: 'value', label: 'Value', type: 'text' },
            { name: 'label', label: 'Label', type: 'text' },
          ],
        }],
      },
      {
        tab: 'Media & Button', fields: [
          { name: 'image', label: 'Dashboard image', type: 'media' },
          { name: 'live_label', label: 'Caption under image', type: 'text' },
          { name: 'button_text', label: 'Button text', type: 'text', half: true },
          { name: 'button_link', label: 'Button link', type: 'text', half: true, placeholder: '#enquiry' },
        ],
      },
    ],
  },
};
