export default function PageHeader({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="adm-page-head">
      {Icon && <span className="adm-page-head__icon"><Icon size={24} /></span>}
      <div className="adm-page-head__text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="adm-page-head__actions">{children}</div>}
    </div>
  );
}
