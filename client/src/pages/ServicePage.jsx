import { useEffect, useState } from 'react';
import api from '../lib/api';
import { SERVICE_SECTION_TYPES } from '../lib/sectionTypes';
import { Seo } from '../components/common/Common';
import Cta from '../components/home/Cta';
import {
  PageHero, StatsStrip, ClientGrid, Journey, Capabilities, Pricing, Brochure, IconCards, Chips, FaqList, EnquiryCta,
} from '../components/service/ServiceSections';
import { ProductShowcase, Ecosystem, SplitFeature } from '../components/service/ProductSections';
import { SplitHero, Leaders, MissionVision } from '../components/service/AboutSections';
import { ContactBlock, OfficeMap } from '../components/service/ContactSections';
import ComingSoon from './ComingSoon';
import '../styles/service.css';
import '../styles/products.css';
import '../styles/about.css';
import '../styles/about-motion.css';
import '../styles/contact.css';

// section type -> component. Order & visibility come from the admin panel.
const registry = {
  hero: PageHero, stats: StatsStrip, clients: ClientGrid, journey: Journey, capabilities: Capabilities,
  pricing: Pricing, brochure: Brochure, cta: Cta, cards: IconCards, chips: Chips, faq: FaqList, enquiry: EnquiryCta,
  products: ProductShowcase, ecosystem: Ecosystem, split: SplitFeature, leaders: Leaders, mission: MissionVision,
  contact: ContactBlock, map: OfficeMap,
};

// Shared section-based page: About, Contact, Vetri Products and the Our Expertise pages
export default function ServicePage({ slug, title }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setData(null);
    setError(false);
    api.get(`/pages/${slug}`).then((r) => setData(r.data)).catch(() => setError(true));
  }, [slug]);

  if (error) return <ComingSoon title={title} />;
  if (!data) return <div className="page-state"><span className="loader" /></div>;

  return (
    <div className={`service-page service-page--${slug}`}>
      <Seo page={data.page} />
      {data.sections.map(({ section_key, content }) => {
        const type = SERVICE_SECTION_TYPES[section_key];
        const Section = type === 'hero' && content?.align === 'split' ? SplitHero : registry[type];
        return Section ? <Section key={section_key} c={content || {}} data={data} page={data.page} /> : null;
      })}
    </div>
  );
}
