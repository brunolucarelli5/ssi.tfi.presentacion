import SlideLayout from './components/SlideLayout';
import { IMAGES } from './assets/images';

const NIST_PHASES = [
  {
    phase: '1. Preparación',
    eval: 'DEFICIENTE',
    level: 'bad',
    detail: 'Sin CSIRT ni SOC vehicular. Vulnerabilidad descubierta por externos.',
  },
  {
    phase: '2. Detección y análisis',
    eval: 'AUSENTE',
    level: 'bad',
    detail: 'Sin SIEM ni IDS. Dependencia total de Miller y Valasek.',
  },
  {
    phase: '3. Contención / erradicación',
    eval: 'PARCIAL',
    level: 'partial',
    detail: 'Sprint bloqueó :6667 (24 jul). Parche 15.26.1 efectivo pero tardío.',
  },
  {
    phase: '4. Recuperación / post-incidente',
    eval: 'DEFICIENTE',
    level: 'bad',
    detail: 'Recall manual por USB. Sin OTA. Sin lecciones aprendidas formales.',
  },
];

const Slide06Nist = () => (
  <SlideLayout
    label="Respuesta al incidente"
    title="Evaluación según NIST SP 800-61"
    subtitle="FCA y Sprint frente al ciclo de vida de respuesta a incidentes"
    slideNumber={6}
  >
    <div className="nist-orgs">
      <img src={IMAGES.logoFca.src} alt={IMAGES.logoFca.alt} className="nist-org-logo" />
      <img src={IMAGES.logoSprint.src} alt={IMAGES.logoSprint.alt} className="nist-org-logo" />
      <span className="nist-orgs-label">Organizaciones evaluadas</span>
    </div>

    <div className="nist-table">
      <div className="nist-table-header">
        <span>Fase NIST SP 800-61</span>
        <span>Evaluación</span>
      </div>
      {NIST_PHASES.map((row) => (
        <div className="nist-table-row" key={row.phase}>
          <div className="nist-table-phase">{row.phase}</div>
          <div className="nist-table-eval">
            <span className={`nist-semaphore nist-semaphore-${row.level}`} aria-hidden="true" />
            <span className={`nist-eval-badge ${row.level}`}>{row.eval}</span>
            <span className="nist-table-detail">{row.detail}</span>
          </div>
        </div>
      ))}
    </div>
  </SlideLayout>
);

export default Slide06Nist;
