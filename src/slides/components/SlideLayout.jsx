const SlideLayout = ({
  label,
  title,
  subtitle,
  slideNumber,
  totalSlides = 12,
  children,
}) => (
  <div className="slide-frame">
    <div className="slide-corner slide-corner-tl" aria-hidden="true" />
    <div className="slide-corner slide-corner-tr" aria-hidden="true" />
    <div className="slide-corner slide-corner-bl" aria-hidden="true" />
    <div className="slide-corner slide-corner-br" aria-hidden="true" />

    <header className="slide-header">
      <div className="slide-header-left">
        {label && (
          <div className="slide-label">
            <span className="slide-label-dot" aria-hidden="true" />
            {label}
          </div>
        )}
        {title && <h2 className="slide-title">{title}</h2>}
        {subtitle && <p className="slide-subtitle">{subtitle}</p>}
      </div>
      {slideNumber && (
        <div className="slide-number" aria-label={`Diapositiva ${slideNumber} de ${totalSlides}`}>
          <span className="slide-number-current">{String(slideNumber).padStart(2, '0')}</span>
          <span className="slide-number-sep">/</span>
          <span className="slide-number-total">{String(totalSlides).padStart(2, '0')}</span>
        </div>
      )}
    </header>

    <div className="slide-body">{children}</div>

    <footer className="slide-footer">
      <span className="slide-footer-brand">UTN — FR Villa María</span>
      <span className="slide-footer-course">Seguridad en Sistemas de Información · TFI</span>
    </footer>
  </div>
);

export default SlideLayout;
