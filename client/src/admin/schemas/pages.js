// Pages managed in the admin, and how to find the editor form / icon for any section on them
import { Compass, Globe, Smartphone, Code2, Megaphone, Palette, Package, Info, Mail, FolderKanban } from 'lucide-react';
import { EXPERTISE_PAGES, PRODUCTS_PAGE, PROJECTS_PAGE, ABOUT_PAGE, CONTACT_PAGE, SERVICE_SECTION_TYPES } from '../../lib/sectionTypes';
import { sectionSchemas, sectionIcons, SectionFallbackIcon } from './sections';
import { serviceSchemas, serviceTypeIcons } from './serviceSections';

const expertiseIcons = { 'website-development': Globe, 'app-development': Smartphone, 'software-development': Code2, 'digital-marketing': Megaphone, 'graphic-designing': Palette };

export const HOME_PAGE = { slug: 'home', name: 'Explore VIS', icon: Compass, path: '/' };
export const ABOUT = { ...ABOUT_PAGE, icon: Info, path: '/about' };
export const CONTACT = { ...CONTACT_PAGE, icon: Mail, path: '/contact' };
export const PRODUCTS = { ...PRODUCTS_PAGE, icon: Package, path: '/solutions' };
export const EXPERTISE = EXPERTISE_PAGES.map((p) => ({ ...p, icon: expertiseIcons[p.slug], path: `/${p.path || p.slug}` }));
export const PROJECTS = { ...PROJECTS_PAGE, icon: FolderKanban, path: '/projects' };
export const MANAGED_PAGES = [HOME_PAGE, ABOUT, PRODUCTS, PROJECTS, CONTACT, ...EXPERTISE];

export const pageInfo = (slug) => MANAGED_PAGES.find((p) => p.slug === slug) || { slug, name: slug, path: `/${slug}` };

export const getSectionSchema = (page, key) =>
  page === 'home' ? sectionSchemas[key] : serviceSchemas[SERVICE_SECTION_TYPES[key]];

export const getSectionIcon = (page, key) =>
  (page === 'home' ? sectionIcons[key] : serviceTypeIcons[SERVICE_SECTION_TYPES[key]]) || SectionFallbackIcon;
