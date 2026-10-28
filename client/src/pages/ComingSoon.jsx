import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

// Placeholder for pages that are rebuilt one by one after the home page
export default function ComingSoon({ title, notFound }) {
  return (
    <section className="section page-state page-state--tall">
      <div className="container container--narrow" style={{ textAlign: 'center' }}>
        <span className="icon-box icon-box--lg" style={{ margin: '0 auto 20px' }}><Construction size={28} /></span>
        <h1 className="page-state__title">{notFound ? 'Page not found' : title}</h1>
        <p>{notFound ? 'The page you are looking for does not exist.' : 'This page is being rebuilt. Please check back soon.'}</p>
        <Link to="/" className="btn btn--primary" style={{ marginTop: 24 }}><ArrowLeft size={17} />Back to Explore VIS</Link>
      </div>
    </section>
  );
}
