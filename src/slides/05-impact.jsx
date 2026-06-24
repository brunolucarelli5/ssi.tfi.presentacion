import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import { IMAGES } from './assets/images';
import './styles/05-impact.css';

const RECALL_PDF_URL = 'https://static.nhtsa.gov/odi/rcl/2015/RCONL-15V461-2256.pdf';

const AFFECTED_BRANDS = ['Jeep', 'Dodge', 'Ram', 'Chrysler'];

const Slide05Impact = () => (
  <SlideLayout
    label="Impacto"
    title="Costo de negocio y alcance del recall"
    subtitle="Sin capacidad OTA: distribución física de parches a toda la flota"
    slideNumber={6}
    totalSlides={12}
  >
    <div className="impact-slide">
      <div className="impact-visual">
        <SlideImage
          src={IMAGES.jeepCherokee.src}
          alt={IMAGES.jeepCherokee.alt}
          className="impact-vehicle"
          caption="Recall NHTSA 15V461000"
          objectFit="contain"
          darkBg
          href={RECALL_PDF_URL}
          linkLabel="Abrir PDF del recall NHTSA 15V461000"
        />
        <div className="impact-brands" aria-label="Marcas afectadas">
          {AFFECTED_BRANDS.map((brand) => (
            <span key={brand} className="impact-brand-chip">{brand}</span>
          ))}
        </div>
      </div>

      <div className="impact-metrics">
        <div className="impact-stat-card impact-stat-card--danger">
          <span className="impact-stat-value">USD 200.000.000</span>
          <span className="impact-stat-label">Costo estimado del recall físico</span>
        </div>

        <div className="impact-stat-card impact-stat-card--accent">
          <span className="impact-stat-value">1.400.000</span>
          <span className="impact-stat-label">Vehículos afectados en Norteamérica</span>
        </div>

        <blockquote className="impact-quote">
          <p className="impact-quote-text">
            Sin actualizaciones over-the-air: FCA distribuyó parches por USB a concesionarios
            para reprogramar cada unidad de la flota.
          </p>
        </blockquote>

        <div className="impact-footnote">
          <span className="impact-footnote-icon" aria-hidden="true">⚠</span>
          <p>
            Primer recall de ciberseguridad automotriz a escala masiva, 
            precedente regulatorio y de la industria
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default Slide05Impact;
