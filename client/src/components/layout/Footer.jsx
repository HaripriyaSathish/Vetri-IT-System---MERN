import { Link } from 'react-router-dom';
import { Facebook, Youtube, ChevronRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Media } from '../common/Common';

// Exact brand icons used in the live site's footer
const Svg = ({ d }) => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d={d} /></svg>;
const INSTAGRAM = 'M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.76 3.76 0 0 0 4 7.75v8.5A3.76 3.76 0 0 0 7.75 20h8.5A3.76 3.76 0 0 0 20 16.25v-8.5A3.76 3.76 0 0 0 16.25 4h-8.5Zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z';
const LINKEDIN = 'M5.34 3.5A2.34 2.34 0 1 1 5.34 8.18 2.34 2.34 0 0 1 5.34 3.5ZM3.32 9.8h4.04V21H3.32V9.8Zm6.58 0h3.87v1.53h.06c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.21V21h-4.04v-4.93c0-1.18-.02-2.69-1.64-2.69-1.64 0-1.89 1.28-1.89 2.6V21H9.9V9.8Z';
const WHATSAPP = 'M12.04 2a9.84 9.84 0 0 0-8.43 14.92L2 22l5.22-1.55A9.92 9.92 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.09-1.12l-.29-.17-3.1.92.94-3.02-.19-.31A8.02 8.02 0 1 1 12.04 19.98Zm4.4-6.01c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z';

const FLink = ({ to, children }) => (
  <Link to={to} className="footer__link"><ChevronRight size={12} className="footer__link-icon" />{children}</Link>
);

export default function Footer() {
  const { settings: s, services, solutions } = useSite();
  const socials = [
    { href: s.instagram, icon: <Svg d={INSTAGRAM} />, label: 'Instagram' },
    { href: s.linkedin, icon: <Svg d={LINKEDIN} />, label: 'LinkedIn' },
    { href: s.facebook, icon: <Facebook size={17} />, label: 'Facebook' },
    { href: s.youtube, icon: <Youtube size={17} />, label: 'YouTube' },
    { href: s.whatsapp && `https://wa.me/${s.whatsapp}`, icon: <Svg d={WHATSAPP} />, label: 'WhatsApp' },
  ].filter((x) => x.href);

  return (
    <footer className="footer">
      <div className="footer__accent" />
      <div className="footer__main">
        <div className="footer__container footer__grid">
          <div className="footer__company">
            <div className="footer__brand">
              <span className="footer__logo"><Media m={s.logo} width={120} /></span>
              <div className="footer__brand-text">
                <strong>{s.company_name}</strong>
                <span>{s.tagline}</span>
              </div>
            </div>
            <p className="footer__desc">{s.footer_about}</p>
            {socials.length > 0 && (
              <div className="footer__social-wrap">
                <span className="footer__social-label">{s.social_heading || 'Connect With Us'}</span>
                <div className="footer__social">
                  {socials.map((x) => (
                    <a key={x.label} href={x.href} target="_blank" rel="noreferrer" aria-label={x.label} title={x.label}
                      className={`footer__social-link footer__social-link--${x.label.toLowerCase()}`}>{x.icon}</a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Company</h3>
            <div className="footer__links">
              <FLink to="/">Explore VIS</FLink>
              <FLink to="/about">About</FLink>
              <FLink to="/website-development">Our Expertise</FLink>
              <FLink to="/contact">Contact</FLink>
            </div>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">Services</h3>
            <div className="footer__links">
              {services.map((x) => <FLink key={x.slug} to={x.link || `/${x.slug}`}>{x.title}</FLink>)}
            </div>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">Solutions</h3>
            <div className="footer__links">
              {solutions.map((x) => <FLink key={x.slug} to="/solutions">{x.title}</FLink>)}
            </div>
          </div>
          <div className="footer__col">
            <h3 className="footer__title">Get in Touch</h3>
            <div className="footer__links footer__contact">
              {s.address && <div className="footer__link"><ChevronRight size={12} className="footer__link-icon" /><span>{s.address}</span></div>}
              {s.phone && <a href={`tel:${s.phone}`} className="footer__link"><ChevronRight size={12} className="footer__link-icon" />{s.phone}</a>}
              {s.email && <a href={`mailto:${s.email}`} className="footer__link"><ChevronRight size={12} className="footer__link-icon" />{s.email}</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="footer__container footer__separator" />
      <div className="footer__bottom-area">
        <div className="footer__container footer__bottom">
          <small>{s.copyright}</small>
          <div className="footer__signature">
            <span className="footer__signature-mark"><svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4 4L19 6" /></svg></span>
            <span>Driven by Digital Excellence · {s.company_name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
