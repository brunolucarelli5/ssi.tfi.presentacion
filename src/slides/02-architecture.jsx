import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import BrandChip from './components/BrandChip';
import { IMAGES } from './assets/images';

const Slide02Architecture = () => (
  <SlideLayout
    label="Contexto y arquitectura"
    title="Arquitectura vulnerable del Uconnect"
    subtitle="La head unit conectaba Internet (Sprint) con los buses de control del vehículo sin ningún aislamiento"
    slideNumber={2}
  >
    <div className="arch-slide-layout">
      <div className="arch-slide-main">
        <div className="arch-flow">
          <BrandChip imageKey="logoSprint" label="Red Sprint" detail="Internet / 4G" />
          <div className="arch-flow-arrow" aria-hidden="true">→</div>
          <BrandChip imageKey="logoQnx" label="OMAP-DM3730" detail="QNX + D-Bus" />
          <div className="arch-flow-arrow" aria-hidden="true">→</div>
          <div className="brand-chip">
            <span className="brand-chip-fallback" aria-hidden="true">⚙</span>
            <div className="brand-chip-text">
              <span className="brand-chip-label">V850ES</span>
              <span className="brand-chip-detail">Puente SPI</span>
            </div>
          </div>
          <div className="arch-flow-arrow" aria-hidden="true">→</div>
          <BrandChip imageKey="logoJeep" label="CAN-C" detail="Bus crítico" critical />
          <div className="arch-flow-arrow" aria-hidden="true">→</div>
          <div className="brand-chip brand-chip-critical">
            <span className="brand-chip-fallback" aria-hidden="true">🚗</span>
            <div className="brand-chip-text">
              <span className="brand-chip-label">ABS · EPS · PCM</span>
              <span className="brand-chip-detail">Seguridad activa</span>
            </div>
          </div>
        </div>

        <div className="arch-domains">
          <div className="arch-domain arch-domain-infotainment">
            <div className="arch-domain-title">Infotainment</div>
            <div className="arch-domain-items">OMAP · QNX · D-Bus · CAN-IHS (clima, audio)</div>
          </div>
          <div className="arch-domain-bridge" aria-hidden="true">
            <div className="arch-domain-bridge-line" />
            <span className="arch-domain-bridge-label">Sin gateway</span>
          </div>
          <div className="arch-domain arch-domain-critical">
            <div className="arch-domain-title">Control crítico</div>
            <div className="arch-domain-items">V850 · CAN-C · frenos · dirección · motor</div>
          </div>
        </div>

        <div className="arch-warning">
          <span className="arch-warning-icon" aria-hidden="true">⚠</span>
          Sin gateway · Sin ACL · Sin autenticación de origen de mensajes
        </div>
      </div>

      <aside className="arch-slide-aside">
        <div className="arch-uconnect-card">
          <img
            src={IMAGES.uconnectLogo.src}
            alt={IMAGES.uconnectLogo.alt}
            className="arch-uconnect-logo"
          />
          <p className="arch-uconnect-caption">Sistema central del ataque</p>
        </div>
        <img
          src={IMAGES.logoHarman.src}
          alt={IMAGES.logoHarman.alt}
          className="arch-harman-logo"
        />
        <SlideImage
          src={IMAGES.jeepCherokee.src}
          alt={IMAGES.jeepCherokee.alt}
          className="arch-vehicle-thumb"
          caption="Vehículo afectado"
          objectFit="contain"
          darkBg
        />
      </aside>
    </div>
  </SlideLayout>
);

export default Slide02Architecture;
