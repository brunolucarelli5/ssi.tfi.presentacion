import SlideImage from './SlideImage';
import { IMAGES } from '../assets/images';
import './TitleSlide.css';

const TitleSlide = ({ badge, title, subtitle, meta, heroImage = IMAGES.jeepCherokee }) => (
  <div className="title-slide slide-frame title-slide-frame">
    <div className="title-slide-bg" aria-hidden="true">
      <div className="title-slide-grid" />
      <div className="title-slide-glow" />
    </div>

    <div className="title-slide-utn-badge">
      <img
        src={IMAGES.logoUtn.src}
        alt={IMAGES.logoUtn.alt}
        className="title-slide-utn-corner"
      />
    </div>

    <div className="title-slide-layout">
      <div className="title-slide-content">
        <div className="title-logos-row">
          <img
            src={IMAGES.logoJeep.src}
            alt={IMAGES.logoJeep.alt}
            className="title-logo title-logo-jeep-png"
          />
        </div>

        <div className="title-badge">
          <span className="title-badge-icon" aria-hidden="true">🛡</span>
          {badge}
        </div>

        <div className="title-divider" aria-hidden="true" />

        <h1 className="slide-title">{title}</h1>

        {subtitle && <p className="slide-subtitle title-subtitle">{subtitle}</p>}

        <div className="title-divider title-divider-short" aria-hidden="true" />

        <div className="title-meta">
          {meta.map(({ label, value }) => (
            <div className="title-meta-item" key={label}>
              <span className="title-meta-label">{label}</span>
              <span className="title-meta-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <SlideImage
        src={heroImage.src}
        alt={heroImage.alt}
        className="title-hero-image"
        fallbackLabel="Jeep Cherokee"
        objectFit={heroImage.fit || 'contain'}
        darkBg={false}
      />
    </div>

    <footer className="title-slide-footer">
      <span>Trabajo Final Integrador</span>
    </footer>
  </div>
);

export default TitleSlide;
