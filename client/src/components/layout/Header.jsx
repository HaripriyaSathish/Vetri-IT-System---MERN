import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, Briefcase, ChevronDown, LayoutGrid, Info, Mail, MessageSquare, ArrowUpRight, Menu, X } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Media, Icon } from '../common/Common';

export default function Header() {
  const { settings: s, services } = useSite();
  const [open, setOpen] = useState(false);
  const [dropShut, setDropShut] = useState(false); // hides the Expertise menu after a pick until the button is hovered again
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  const pickExpertise = (e) => { setDropShut(true); e.currentTarget.blur(); };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const expertiseActive = services.some((x) => x.link && pathname.startsWith(x.link));

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="Vetri IT Systems home">
          <Media m={s.logo} width={200} loading="eager" />
        </Link>

        <nav className={`nav${open ? ' nav--open' : ''}`}>
          <NavLink to="/" end className="nav__link"><Compass size={17} />Explore VIS</NavLink>
          <div className={`nav__drop${expertiseActive ? ' active' : ''}${dropShut ? ' nav__drop--shut' : ''}`}>
            <button className="nav__link" type="button" onMouseEnter={() => setDropShut(false)} onFocus={() => setDropShut(false)}><Briefcase size={17} />Our Expertise<ChevronDown size={15} className="nav__chev" /></button>
            <div className="nav__menu">
              {services.map((x) => (
                <NavLink key={x.slug} to={x.link || `/${x.slug}`} className="nav__menu-item" onClick={pickExpertise}>
                  <span className="nav__menu-icon"><Icon name={x.nav_icon || 'Sparkles'} size={18} /></span>
                  <span>{x.nav_label || x.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink to="/solutions" className="nav__link"><LayoutGrid size={17} />Vetri Products</NavLink>
          <NavLink to="/about" className="nav__link"><Info size={17} />About</NavLink>
          <NavLink to="/contact" className="nav__link"><Mail size={17} />Contact</NavLink>
          <Link to={s.header_button_link || '/contact'} className="btn btn--primary nav__cta-mobile">
            <MessageSquare size={17} />{s.header_button_text || 'Get in Touch'}
          </Link>
        </nav>

        <Link to={s.header_button_link || '/contact'} className="btn btn--primary header__cta">
          <MessageSquare size={17} />{s.header_button_text || 'Get in Touch'}<ArrowUpRight size={16} />
        </Link>
        <button className="header__burger" onClick={() => { setOpen(!open); setDropShut(false); }} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
