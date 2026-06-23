import SlideLayout from './components/SlideLayout';

const RECOMMENDATIONS = [
  {
    icon: '🔒',
    title: 'Gateway CAN',
    desc: 'Filtrar mensajes entre infotainment y control. Hardware independiente del OMAP.',
    ref: 'AUTOSAR SecOC',
    risk: 'Mitiga R2',
  },
  {
    icon: '🔐',
    title: 'Hardening D-Bus',
    desc: 'Sin exposición en red externa. Eliminar método execute de NavTrailService.',
    ref: 'OWASP Embedded',
    risk: 'Mitiga R1',
  },
  {
    icon: '🏛',
    title: 'Secure Boot V850',
    desc: 'Firma criptográfica, challenge-response y HSM para claves.',
    ref: 'ISO/SAE 21434',
    risk: 'Mitiga R3',
  },
  {
    icon: '📡',
    title: 'OTA segura',
    desc: 'Entrega automática, verificación criptográfica y rollback ante fallos.',
    ref: 'UNECE WP.29',
    risk: 'Mitiga R5',
  },
  {
    icon: '🏢',
    title: 'Secure SDLC + CVD',
    desc: 'Threat modeling desde diseño. Canal formal de divulgación coordinada.',
    ref: 'ISO 27001 Ctrl 8.25',
    risk: 'Organizacional',
    org: true,
  },
];

const Slide08Recommendations = () => (
  <SlideLayout
    label="Propuestas de mejora"
    title="Mitigaciones técnicas y organizacionales"
    subtitle="Cada recomendación ataca la causa raíz de un riesgo identificado"
    slideNumber={8}
  >
    <div className="rec-grid">
      {RECOMMENDATIONS.map((rec) => (
        <div className={`rec-card${rec.org ? ' rec-card-org' : ''}`} key={rec.title}>
          <div className="rec-card-top">
            <span className="rec-card-icon" aria-hidden="true">{rec.icon}</span>
            <span className="rec-card-risk">{rec.risk}</span>
          </div>
          <div className="rec-card-title">{rec.title}</div>
          <div className="rec-card-desc">{rec.desc}</div>
          <div className="rec-card-ref">{rec.ref}</div>
        </div>
      ))}
    </div>
  </SlideLayout>
);

export default Slide08Recommendations;
