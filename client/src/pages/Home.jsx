import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Seo } from '../components/common/Common';
import Hero from '../components/home/Hero';
import Ticker from '../components/home/Ticker';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Solutions from '../components/home/Solutions';
import WhyChoose from '../components/home/WhyChoose';
import Process from '../components/home/Process';
import Team from '../components/home/Team';
import Cta from '../components/home/Cta';
import { IconCards } from '../components/service/ServiceSections';

// section_key (from MySQL) -> component. Order & visibility come from the admin panel.
const registry = {
  hero: Hero, ticker: Ticker, about: About, services: Services, solutions: Solutions,
  industries: IconCards, why_choose: WhyChoose, process: Process, team: Team, cta: Cta,
};

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/pages/home').then((r) => setData(r.data)).catch(() => setError(true));
  }, []);

  if (error) return <div className="page-state">Unable to load the page. Please try again shortly.</div>;
  if (!data) return <div className="page-state"><span className="loader" /></div>;

  return (
    <>
      <Seo page={data.page} />
      {data.sections.map(({ section_key, content }) => {
        const Section = registry[section_key];
        return Section ? <Section key={section_key} c={content || {}} data={data} /> : null;
      })}
    </>
  );
}
