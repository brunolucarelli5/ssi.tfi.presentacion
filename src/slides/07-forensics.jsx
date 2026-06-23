import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import { IMAGES } from './assets/images';

const FORENSIC_LAYERS = [
  {
    level: 'high',
    label: 'Alta volatilidad',
    items: 'RAM OMAP-DM3730 · Caché ARP · Sesiones D-Bus en /dev/shmem',
  },
  {
    level: 'medium',
    label: 'Volatilidad media',
    items: 'Logs QNX (slogger) · Sistema ETFS · Tráfico celular Sprint (pcap)',
  },
  {
    level: 'low',
    label: 'Baja volatilidad',
    items: 'Imagen NAND flash · Dump firmware V850 · Bus logs CAN vía OBD-II',
  },
];

const Slide07Forensics = () => (
  <SlideLayout
    label="Pericias forenses"
    title="Artefactos y cadena de custodia"
    subtitle="Orden de adquisición según RFC 3227 e ISO/IEC 27037"
    slideNumber={7}
  >
    <div className="forensic-slide-layout">
      <div className="forensic-slide-main">
        <div className="forensic-layers">
          {FORENSIC_LAYERS.map((layer) => (
            <div className={`forensic-layer ${layer.level}`} key={layer.label}>
              <div className="forensic-priority">{layer.label}</div>
              <div className="forensic-items">{layer.items}</div>
            </div>
          ))}
        </div>

        <div className="grid-3 forensic-cards">
          <div className="card">
            <div className="card-title">Cadena de custodia</div>
            <div className="card-text">Jaula de Faraday · Write-blocker · SHA-256 antes y después</div>
          </div>
          <div className="card">
            <div className="card-title">Dispositivo de evidencia</div>
            <div className="card-text">El vehículo completo es portador de evidencia digital</div>
          </div>
          <div className="card">
            <div className="card-title">Marco normativo</div>
            <div className="card-text">ISO/IEC 27037 · RFC 3227 · CPPN Arts. 253–276</div>
          </div>
        </div>
      </div>

      <aside className="forensic-slide-aside">
        <SlideImage
          src={IMAGES.jeepCherokee.src}
          alt={IMAGES.jeepCherokee.alt}
          className="forensic-vehicle"
          caption="Vehículo = evidencia física"
          objectFit="contain"
          darkBg
        />
        <img
          src={IMAGES.logoQnx.src}
          alt={IMAGES.logoQnx.alt}
          className="forensic-qnx-logo"
        />
      </aside>
    </div>
  </SlideLayout>
);

export default Slide07Forensics;
