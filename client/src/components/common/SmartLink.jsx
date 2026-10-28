import { Link } from 'react-router-dom';
import { isExternal } from './Common';

// Handles router links, in-page hashes (#enquiry) and external/tel links from CMS data
export default function SmartLink({ to = '', children, ...rest }) {
  if (!to) return <span {...rest}>{children}</span>;
  if (to.startsWith('#'))
    return (
      <a href={to} {...rest} onClick={(e) => {
        const el = document.querySelector(to);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
        rest.onClick?.(e);
      }}>{children}</a>
    );
  if (isExternal(to)) return <a href={to} {...rest} {...(to.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>;
  return <Link to={to} {...rest}>{children}</Link>;
}
