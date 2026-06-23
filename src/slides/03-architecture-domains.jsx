import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import { IMAGES } from './assets/images';
import './styles/architecture-shared.css';
import './styles/03-architecture-domains.css';

const Slide03ArchitectureDomains = () => (
  <SlideLayout
    label="Contexto y arquitectura"
    title="Dos dominios sin aislamiento"
    subtitle="La head unit conectaba Internet con los buses de control del vehículo sin ningún gateway de seguridad"
    slideNumber={3}
  >
    <div className="arch-domains-slide">
      <div className="arch-domains">
        <div className="arch-domain arch-domain-infotainment">
          <div className="arch-domain-title">Infotainment</div>
          <SlideImage
            src={IMAGES.jeepCherokeeConsole.src}
            alt={IMAGES.jeepCherokeeConsole.alt}
            className="arch-domain-photo"
            objectFit="cover"
            fallbackLabel="Uconnect — clima y audio"
          />
          <div className="arch-domain-items">OMAP · QNX · D-Bus · CAN-IHS (clima, audio)</div>
        </div>

        <div className="arch-domain-bridge" aria-hidden="true">
          <div className="arch-domain-bridge-line" />
          <span className="arch-domain-bridge-label">Sin gateway</span>
        </div>

        <div className="arch-domain arch-domain-critical">
          <div className="arch-domain-title">Control crítico</div>
          <SlideImage
            src={IMAGES.jeepCherokeeMotor.src}
            alt={IMAGES.jeepCherokeeMotor.alt}
            className="arch-domain-photo"
            objectFit="cover"
            fallbackLabel="Motor — ECUs de seguridad"
          />
          <div className="arch-domain-items">V850 · CAN-C · frenos · dirección · motor</div>
        </div>
      </div>

      <div className="arch-warning">
        <span className="arch-warning-icon" aria-hidden="true">⚠</span>
        Sin gateway · Sin ACL · Sin autenticación de origen de mensajes
      </div>
    </div>
  </SlideLayout>
);

export default Slide03ArchitectureDomains;
