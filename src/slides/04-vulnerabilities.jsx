import SlideLayout from './components/SlideLayout';
import { IMAGES } from './assets/images';
import './styles/04-vulnerabilities.css';

const VULNERABILITIES = [
  {
    id: 'R1',
    icon: '🔓',
    title: 'D-Bus expuesto',
    detail: 'Puerto TCP 6667 con auth ANONYMOUS en la red celular de Sprint',
    outcome: 'Ejecución remota de código con shell root',
    cia: ['C', 'I', 'D'],
    brand: 'logoSprint',
  },
  {
    id: 'R2',
    icon: '🔀',
    title: 'Sin segmentación CAN',
    detail: 'Head unit conectada directamente a CAN-C sin gateway de seguridad',
    outcome: 'Pivoting desde OMAP hacia ECUs críticas',
    cia: ['I', 'D'],
    brand: 'logoHarman',
  },
  {
    id: 'R3',
    icon: '🔑',
    title: 'Sin Secure Boot V850',
    detail: 'Firmware reemplazable por SPI sin verificación criptográfica',
    outcome: 'Compromiso lógico convertido en ataque físico persistente',
    cia: ['I', 'D'],
    brand: 'logoQnx',
  },
];

const Slide04Vulnerabilities = () => (
  <SlideLayout
    label="Kill chain"
    title="Tres vulnerabilidades encadenadas"
    subtitle="Cada falla habilita la siguiente hasta alcanzar control físico del vehículo en movimiento"
    slideNumber={7}
    totalSlides={12}
  >
    <div className="vuln-grid">
      {VULNERABILITIES.map((vuln) => (
        <div className="vuln-card" key={vuln.id}>
          <div className="vuln-card-header">
            <span className="vuln-card-icon" aria-hidden="true">{vuln.icon}</span>
            <span className="vuln-card-id">{vuln.id}</span>
          </div>
          <div className="vuln-card-title">{vuln.title}</div>
          <div className="vuln-card-detail">{vuln.detail}</div>
          <div className="vuln-card-outcome">{vuln.outcome}</div>
          <div className="vuln-card-footer">
            <div className="vuln-cia" aria-label={`Tríada CIA: ${vuln.cia.join(', ')}`}>
              {vuln.cia.map((letter) => (
                <span className="vuln-cia-badge" key={letter}>{letter}</span>
              ))}
            </div>
            <img
              src={IMAGES[vuln.brand].src}
              alt=""
              className="vuln-card-brand"
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="vuln-chain-footer">
      R1 + R2 + R3 → Control de frenos, dirección y motor sin acceso físico
    </div>
  </SlideLayout>
);

export default Slide04Vulnerabilities;
