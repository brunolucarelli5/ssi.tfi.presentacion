import SlideLayout from './components/SlideLayout';
import './styles/06-nist.css';

const NIST_PHASES = [
  {
    name: 'Preparación',
    eval: 'Deficiente',
    level: 'bad',
    detail: 'Sin CSIRT ni SOC vehicular. La vulnerabilidad fue descubierta por investigadores externos.',
  },
  {
    name: 'Detección y análisis',
    eval: 'Ausente',
    level: 'bad',
    detail: 'Sin SIEM ni IDS. Dependencia total de la divulgación de Miller y Valasek.',
  },
  {
    name: 'Contención / erradicación',
    eval: 'Parcial',
    level: 'partial',
    detail: 'Sprint bloqueó el puerto 6667 (24 jul). Parche 15.26.1 efectivo, pero tardío.',
  },
  {
    name: 'Recuperación / post-incidente',
    eval: 'Deficiente',
    level: 'bad',
    detail: 'Recall manual por USB. Sin OTA. Sin lecciones aprendidas formales documentadas.',
  },
];

const Slide06Nist = () => (
  <SlideLayout
    label="Respuesta al incidente"
    title="Evaluación según NIST SP 800-61"
    subtitle="Cuatro fases del ciclo de vida de respuesta a incidentes aplicadas al caso Jeep"
    slideNumber={9}
    totalSlides={12}
  >
    <div className="nist-slide">
      <ol className="nist-phases" aria-label="Fases NIST SP 800-61">
        {NIST_PHASES.map((phase, index) => (
          <li
            key={phase.name}
            className={`nist-phase-card nist-phase-card--${phase.level}`}
          >
            <div className="nist-phase-marker" aria-hidden="true">
              <span className="nist-phase-num">{index + 1}</span>
              {index < NIST_PHASES.length - 1 && (
                <span className="nist-phase-connector" />
              )}
            </div>

            <div className="nist-phase-body">
              <div className="nist-phase-head">
                <h3 className="nist-phase-name">{phase.name}</h3>
                <span className={`nist-eval-badge nist-eval-badge--${phase.level}`}>
                  <span className={`nist-semaphore nist-semaphore--${phase.level}`} aria-hidden="true" />
                  {phase.eval}
                </span>
              </div>
              <p className="nist-phase-detail">{phase.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="nist-aside" aria-label="Resumen de la evaluación">
        <div className="nist-aside-card nist-aside-card--alert">
          <span className="nist-aside-value">3 / 4</span>
          <span className="nist-aside-label">Fases deficientes o ausentes</span>
        </div>

        <div className="nist-aside-card">
          <span className="nist-aside-value">0 %</span>
          <span className="nist-aside-label">Detección interna — todo vía divulgación externa</span>
        </div>

        <p className="nist-aside-note">
          Respuesta reactiva: contención de Sprint y parche de firmware llegaron después de la exposición pública.
        </p>

        <div className="nist-aside-framework">
          <span className="nist-aside-framework-label">Marco</span>
          <span className="nist-aside-framework-value">NIST SP 800-61 Rev. 2</span>
        </div>
      </aside>
    </div>
  </SlideLayout>
);

export default Slide06Nist;
