import SlideLayout from './components/SlideLayout';
import RiskMatrix from './components/RiskMatrix';
import './styles/05-risk-matrix.css';

const ALE_ROWS = [
  { risk: 'R1 — D-Bus RCE', ale: 'USD 400K', level: 'CRÍTICO' },
  { risk: 'R2 — Pivoting CAN', ale: 'USD 360K', level: 'CRÍTICO' },
  { risk: 'R5 — Sin OTA', ale: 'USD 200M', level: 'CRÍTICO', highlight: true },
];

const Slide05RiskMatrix = () => (
  <SlideLayout
    label="Gestión de riesgos"
    title="Matriz de riesgo inherente y ALE"
    subtitle="ISO 31000 / ISO/IEC 27005 · Riesgo = Probabilidad × Impacto (escala 1–5)"
    slideNumber={8}
    totalSlides={13}
  >
    <div className="risk-slide-layout risk-slide">
      <RiskMatrix compact />

      <div className="ale-panel">
        <h3 className="ale-panel-title">Pérdida anualizada (ALE)</h3>
        <p className="ale-panel-intro">
          El recall físico de 1,4M vehículos domina el análisis cuantitativo.
        </p>
        <div className="ale-cards">
          {ALE_ROWS.map((row) => (
            <div className={`ale-card${row.highlight ? ' ale-card-highlight' : ''}`} key={row.risk}>
              <div className="ale-card-risk">{row.risk}</div>
              <div className="ale-card-value">{row.ale}</div>
              <span className="ale-card-level">{row.level}</span>
            </div>
          ))}
        </div>
        <p className="ale-panel-footnote">
          R1–R4: crítico (15–25 pts) · R5: alto (16 pts) · ROSI OTA: abismalmente positivo
        </p>
      </div>
    </div>
  </SlideLayout>
);

export default Slide05RiskMatrix;
