import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import { IMAGES } from './assets/images';
import './styles/07-forensics.css';

const FORENSIC_LAYERS = [
  {
    step: '1°',
    level: 'high',
    label: 'Alta volatilidad',
    artifacts: ['RAM OMAP-DM3730', 'Caché ARP', 'Sesiones D-Bus · /dev/shmem'],
  },
  {
    step: '2°',
    level: 'medium',
    label: 'Volatilidad media',
    artifacts: ['Logs QNX (slogger)', 'Sistema ETFS', 'Tráfico celular Sprint (pcap)'],
  },
  {
    step: '3°',
    level: 'low',
    label: 'Baja volatilidad',
    artifacts: ['Imagen NAND flash', 'Dump firmware V850', 'Bus logs CAN vía OBD-II'],
  },
];

const CUSTODY_ITEMS = ['Jaula de Faraday', 'Write-blocker', 'SHA-256 antes y después'];

const Slide07Forensics = () => (
  <SlideLayout
    label="Pericias forenses"
    title="Artefactos y cadena de custodia"
    subtitle="RFC 3227 · ISO/IEC 27037 · CPPN Arts. 253–276"
    slideNumber={10}
    totalSlides={13}
  >
    <div className="forensic-slide">
      <section className="forensic-acquisition" aria-label="Orden de adquisición forense">
        <p className="forensic-acquisition-hint">Mayor → menor volatilidad</p>

        <ol className="forensic-stack">
          {FORENSIC_LAYERS.map((layer, index) => (
            <li
              key={layer.label}
              className={`forensic-step forensic-step--${layer.level}`}
            >
              <div className="forensic-step-marker" aria-hidden="true">
                <span className="forensic-step-order">{layer.step}</span>
                {index < FORENSIC_LAYERS.length - 1 && (
                  <span className="forensic-step-connector" />
                )}
              </div>

              <div className="forensic-step-card">
                <span className={`forensic-step-badge forensic-step-badge--${layer.level}`}>
                  {layer.label}
                </span>
                <ul className="forensic-artifacts">
                  {layer.artifacts.map((artifact) => (
                    <li key={artifact} className="forensic-artifact">{artifact}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="forensic-sidebar" aria-label="Evidencia física">
        <SlideImage
          src={IMAGES.jeepCherokee.src}
          alt={IMAGES.jeepCherokee.alt}
          className="forensic-vehicle"
          caption="El vehículo completo es portador de evidencia digital"
          objectFit="contain"
          darkBg
        />

        <div className="forensic-custody" aria-label="Cadena de custodia">
          <h3 className="forensic-custody-title">Cadena de custodia</h3>
          <ul className="forensic-custody-items">
            {CUSTODY_ITEMS.map((item) => (
              <li key={item} className="forensic-custody-item">{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  </SlideLayout>
);

export default Slide07Forensics;
