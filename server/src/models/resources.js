// Table config for the generic admin CRUD (/api/admin/c/:resource).
// fields = columns admin can write. json = columns stored as JSON.
export const resources = {
  services: {
    table: 'services',
    fields: ['slug', 'title', 'nav_label', 'nav_icon', 'badge', 'flow', 'description', 'image', 'link', 'link_title', 'sort_order', 'is_active', 'show_on_home'],
    json: ['image'],
  },
  solutions: {
    table: 'solutions',
    fields: ['slug', 'tab_label', 'badge', 'title', 'subtitle', 'description', 'features', 'stats', 'image', 'live_label', 'button_text', 'button_link', 'sort_order', 'is_active'],
    json: ['features', 'stats', 'image'],
  },
  pages: {
    table: 'pages',
    fields: ['slug', 'name', 'meta_title', 'meta_description', 'meta_keywords', 'og_image'],
    json: ['og_image'],
    order: 'id',
  },
  enquiries: {
    table: 'enquiries',
    fields: ['status'],
    order: 'created_at DESC',
  },
};
