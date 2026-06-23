import { Fragment } from 'react';
import SlideLayout from './components/SlideLayout';
import { IMAGES } from './assets/images';
import './styles/architecture-shared.css';
import './styles/02-architecture.css';

const BrakeDiscIcon = () => (
  <svg className="arch-pipeline-brake-icon" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="32" cy="14" r="3.5" fill="currentColor" />
    <circle cx="32" cy="50" r="3.5" fill="currentColor" />
    <circle cx="14" cy="32" r="3.5" fill="currentColor" />
    <circle cx="50" cy="32" r="3.5" fill="currentColor" />
    <circle cx="19.3" cy="19.3" r="3" fill="currentColor" />
    <circle cx="44.7" cy="44.7" r="3" fill="currentColor" />
    <circle cx="44.7" cy="19.3" r="3" fill="currentColor" />
    <circle cx="19.3" cy="44.7" r="3" fill="currentColor" />
  </svg>
);

const FLOW_STEPS = [
  {
    step: 1,
    imageKey: 'logoSprint',
    label: 'Red Sprint',
    detail: 'Internet / 4G',
    lightBg: true,
  },
  {
    step: 2,
    imageKey: 'logoQnx',
    label: 'OMAP-DM3730',
    detail: 'QNX + D-Bus',
  },
  {
    step: 3,
    icon: '⚙',
    label: 'V850ES',
    detail: 'Puente SPI',
    numWarning: true,
  },
  {
    step: 4,
    imageKey: 'logoJeep',
    label: 'CAN-C',
    detail: 'Bus crítico',
    critical: true,
  },
  {
    step: 5,
    icon: 'brake',
    label: 'ABS · EPS · PCM',
    detail: 'Seguridad activa',
    critical: true,
  },
];

const PipelineStep = ({
  step,
  imageKey,
  icon,
  label,
  detail,
  critical,
  lightBg,
  numWarning,
}) => {
  const asset = imageKey ? IMAGES[imageKey] : null;
  const useLightBg = lightBg || asset?.lightBg;

  const stepClass = [
    'arch-pipeline-step',
    critical ? 'arch-pipeline-step-critical' : '',
    numWarning ? 'arch-pipeline-step-warning-num' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={stepClass}>
      <span className="arch-pipeline-num" aria-hidden="true">{step}</span>
      <div className="arch-pipeline-icon" aria-hidden="true">
        {asset ? (
          <img
            src={asset.src}
            alt=""
            className={[
              'arch-pipeline-logo',
              asset.invert ? 'arch-pipeline-logo-invert' : '',
              useLightBg ? 'arch-pipeline-logo-light' : '',
            ].filter(Boolean).join(' ')}
          />
        ) : icon === 'brake' ? (
          <BrakeDiscIcon />
        ) : (
          <span className="arch-pipeline-fallback">{icon}</span>
        )}
      </div>
      <h3 className="arch-pipeline-label">{label}</h3>
      <p className="arch-pipeline-detail">{detail}</p>
    </article>
  );
};

const Slide02Architecture = () => (
  <SlideLayout
    label="Contexto y arquitectura"
    title="Cadena de compromiso del Uconnect"
    subtitle="Desde la red celular Sprint hasta los ECUs de seguridad activa del vehículo"
    slideNumber={2}
  >
    <div className="arch-flow-slide">
      <p className="arch-flow-lead">5 saltos consecutivos — sin gateway, sin ACL, sin autenticación</p>

      <div className="arch-pipeline">
        <div className="arch-pipeline-zones" aria-hidden="true">
          <div className="arch-pipeline-zone arch-pipeline-zone-remote">Acceso remoto</div>
          <div className="arch-pipeline-zone arch-pipeline-zone-uconnect">Head unit Uconnect</div>
          <div className="arch-pipeline-zone arch-pipeline-zone-critical">Control físico</div>
        </div>

        <div className="arch-pipeline-track">
          {FLOW_STEPS.map((item, index) => (
            <Fragment key={item.step}>
              <PipelineStep {...item} />
              {index < FLOW_STEPS.length - 1 && (
                <div className="arch-pipeline-connector" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="arch-flow-context">
        <div className="arch-flow-context-item arch-flow-context-uconnect">
          <img
            src={IMAGES.uconnectLogo.src}
            alt={IMAGES.uconnectLogo.alt}
            className="arch-flow-context-logo"
          />
          <span className="arch-flow-context-text">Sistema central del ataque · Harman International</span>
        </div>
        <div className="arch-flow-context-divider" aria-hidden="true" />
        <img
          src={IMAGES.logoHarman.src}
          alt={IMAGES.logoHarman.alt}
          className="arch-flow-context-harman"
        />
      </div>
    </div>
  </SlideLayout>
);

export default Slide02Architecture;
