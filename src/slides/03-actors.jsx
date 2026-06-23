import SlideLayout from './components/SlideLayout';
import LogoBadge from './components/LogoBadge';
import { IMAGES, ACTORS } from './assets/images';
import './styles/03-actors.css';

const ECOSYSTEM_ACTORS = ACTORS.filter((actor) => actor.id !== 'darpa');
const KEY_ACTORS = new Set(['fca', 'sprint']);

const Slide03Actors = () => (
  <SlideLayout
    label="Actores"
    title="Quién intervino en el incidente"
    subtitle="Investigadores, fabricante, operador y cadena de suministro del Uconnect"
    slideNumber={4}
    totalSlides={12}
  >
    <div className="actors-slide">
      <section className="actors-hero" aria-label="Investigadores">
        <div className="actors-hero-glow" aria-hidden="true" />
        <div className="actors-hero-content">
          <span className="actors-hero-tag">Divulgación coordinada</span>
          <h3 className="actors-hero-names">
            <strong>Chris Valasek</strong>
            <span className="actors-hero-sep" aria-hidden="true">·</span>
            <strong>Charlie Miller</strong>
          </h3>
          <p className="actors-hero-meta">
            IOActive · Artículo con Andy Greenberg en Wired
          </p>
        </div>
        <div className="actors-hero-funding">
          <img
            src={IMAGES.logoDarpa.src}
            alt={IMAGES.logoDarpa.alt}
            className="actors-hero-darpa"
          />
          <span className="actors-hero-funding-label">Financiados por DARPA</span>
        </div>
      </section>

      <div className="actors-ecosystem">
        <div className="actors-ecosystem-header">
          <span className="actors-ecosystem-line" aria-hidden="true" />
          <span className="actors-ecosystem-title">Ecosistema industrial</span>
          <span className="actors-ecosystem-line" aria-hidden="true" />
        </div>

        <div className="actors-grid" role="list" aria-label="Actores del ecosistema">
          {ECOSYSTEM_ACTORS.map((actor) => (
            <div key={actor.id} className="actors-grid-cell" role="listitem">
              <LogoBadge
                imageKey={actor.imageKey}
                name={actor.name}
                role={actor.role}
                size="md"
                showName={false}
                highlight={KEY_ACTORS.has(actor.id)}
              />
            </div>
          ))}
        </div>

        <div className="actors-legend">
          <span className="actors-legend-item">
            <span className="actors-legend-dot actors-legend-dot--key" aria-hidden="true" />
            Rol central en el incidente
          </span>
          <span className="actors-legend-item">
            <span className="actors-legend-dot" aria-hidden="true" />
            Cadena de suministro
          </span>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default Slide03Actors;
