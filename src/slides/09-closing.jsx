import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import { IMAGES } from './assets/images';
import './styles/09-closing.css';

const FRAMEWORKS = [
  { icon: '🧮', label: 'Gestión de riesgos', detail: 'ISO 27005 · ALE · R1–R5' },
  { icon: '🔍', label: 'Respuesta al incidente', detail: 'NIST SP 800-61' },
  { icon: '📋', label: 'Pericias forenses', detail: 'ISO/IEC 27037 · RFC 3227' },
];

const Slide09Closing = () => (
  <SlideLayout
    label="Cierre"
    title="Lección central del análisis"
    slideNumber={12}
    totalSlides={12}
  >
    <div className="closing-layout-v2">
      <div className="closing-main-v2">
        <blockquote className="closing-quote-main">
          &ldquo;El costo de diseñar bien es siempre fraccionariamente menor al costo de remediar tarde.&rdquo;
        </blockquote>

        <div className="closing-frameworks">
          {FRAMEWORKS.map((fw) => (
            <div className="closing-framework" key={fw.label}>
              <span className="closing-framework-icon" aria-hidden="true">{fw.icon}</span>
              <div className="closing-framework-label">{fw.label}</div>
              <div className="closing-framework-detail">{fw.detail}</div>
            </div>
          ))}
        </div>

        <div className="closing-impact-bar">
          <span className="closing-impact-item"><strong>1.4M</strong> vehículos</span>
          <span className="closing-impact-sep" aria-hidden="true">·</span>
          <span className="closing-impact-item"><strong>USD 200M</strong> en recall</span>
          <span className="closing-impact-sep" aria-hidden="true">·</span>
          <span className="closing-impact-item">evitable con OTA y Secure Boot</span>
        </div>

        <div className="closing-contact">
          <img src={IMAGES.logoUtn.src} alt={IMAGES.logoUtn.alt} className="closing-logo" />
          <span className="closing-contact-name">Bruno Lucarelli</span>
          <span className="closing-contact-sep">·</span>
          <span>Leg. 14988</span>
          <span className="closing-contact-sep">·</span>
          <span>Quedo a disposición para preguntas</span>
        </div>
      </div>

      <SlideImage
        src={IMAGES.jeepCherokee.src}
        alt={IMAGES.jeepCherokee.alt}
        className="closing-vehicle"
        caption="Jeep Cherokee KL (2014–2018)"
        objectFit="contain"
        darkBg
        overlay={
          <img src={IMAGES.logoJeep.src} alt="" className="title-hero-logo" aria-hidden="true" />
        }
      />
    </div>
  </SlideLayout>
);

export default Slide09Closing;
