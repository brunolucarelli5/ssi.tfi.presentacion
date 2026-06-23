import SlideLayout from './components/SlideLayout';
import RiskMatrix from './components/RiskMatrix';

const ALE_ROWS = [
  { risk: 'R1 — D-Bus RCE', ale: 'USD 400.000', level: 'CRÍTICO' },
  { risk: 'R2 — Pivoting CAN', ale: 'USD 360.000', level: 'CRÍTICO' },
  { risk: 'R5 — Sin OTA', ale: 'USD 200.000.000', level: 'CRÍTICO', highlight: true },
];

const Slide05RiskMatrix = () => (
  <SlideLayout
    label="Gestión de riesgos"
    title="Matriz de riesgo inherente y ALE"
    subtitle="ISO 31000 / ISO/IEC 27005 · Riesgo = Probabilidad × Impacto (escala 1–5)"
    slideNumber={5}
  >
    <div className="risk-slide-layout">
      <RiskMatrix />

      <div className="ale-panel">
        <h3 className="ale-panel-title">Pérdida anualizada (ALE)</h3>
        <p className="ale-panel-intro">
          El recall físico de 1,4M vehículos domina el análisis cuantitativo.
        </p>
        {ALE_ROWS.map((row) => (
          <div className={`ale-card${row.highlight ? ' ale-card-highlight' : ''}`} key={row.risk}>
            <div className="ale-card-risk">{row.risk}</div>
            <div className="ale-card-value">{row.ale}</div>
            <span className="ale-card-level">{row.level}</span>
          </div>
        ))}
        <p className="ale-panel-footnote">
          R1–R4: cuadrante crítico (15–25 pts) · R5: alto (16 pts)
          <br />
          ROSI de OTA desde el diseño: abismalmente positivo
        </p>
      </div>
    </div>
  </SlideLayout>
);

export default Slide05RiskMatrix;
