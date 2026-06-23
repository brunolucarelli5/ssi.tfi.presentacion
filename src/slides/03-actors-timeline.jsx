import SlideLayout from './components/SlideLayout';
import SlideImage from './components/SlideImage';
import LogoBadge from './components/LogoBadge';
import { IMAGES, ACTORS } from './assets/images';

const TIMELINE_EVENTS = [
  { date: 'Oct 2014', label: 'Divulgación responsable del D-Bus a FCA' },
  { date: 'Mar 2015', label: 'Se informa reprogramación del V850' },
  { date: '16 Jul', label: 'Parche firmware 15.26.1' },
  { date: '21 Jul', label: 'Publicación Wired', highlight: true, wired: true },
  { date: '24 Jul', label: 'Sprint bloquea :6667 · Recall', highlight: true },
];

const Slide03ActorsTimeline = () => (
  <SlideLayout
    label="Actores, cronología e impacto"
    title="Cronología e impacto de negocio"
    subtitle="Miller y Valasek refutaron que hackear un auto requería acceso físico al OBD-II"
    slideNumber={3}
  >
    <div className="actors-timeline-layout">
      <div className="actors-timeline-main">
        <div className="actors-researchers">
          <div className="actors-researchers-text">
            <strong>Chris Valasek</strong> (IOActive) · <strong>Charlie Miller</strong>
            <span className="actors-researchers-sub">Divulgación coordinada con Andy Greenberg</span>
          </div>
          <img
            src={IMAGES.logoDarpa.src}
            alt={IMAGES.logoDarpa.alt}
            className="actors-darpa-logo"
            title="Financiados por DARPA"
          />
        </div>

        <div className="h-timeline" role="list" aria-label="Cronología del incidente">
          {TIMELINE_EVENTS.map((event) => (
            <div
              className={`h-timeline-item${event.highlight ? ' highlight' : ''}`}
              key={event.date}
              role="listitem"
            >
              <div className="h-timeline-date">{event.date}</div>
              <div className="h-timeline-dot" aria-hidden="true" />
              <div className="h-timeline-label">
                {event.label}
                {event.wired && (
                  <img
                    src={IMAGES.logoWired.src}
                    alt={IMAGES.logoWired.alt}
                    className="h-timeline-wired"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="logo-grid logo-grid-compact">
          {ACTORS.map((actor) => (
            <LogoBadge
              key={actor.id}
              imageKey={actor.imageKey}
              name={actor.name}
              role={actor.role}
              highlight={actor.id === 'fca' || actor.id === 'sprint'}
            />
          ))}
        </div>
      </div>

      <div className="actors-timeline-impact">
        <SlideImage
          src={IMAGES.jeepCherokee.src}
          alt={IMAGES.jeepCherokee.alt}
          className="actors-vehicle-img"
          caption="Recall 15V461000"
          objectFit="contain"
          darkBg
        />
        <div className="stat-block stat-block-accent impact-stat">
          <div className="stat-value danger">USD 200M</div>
          <div className="stat-label">Costo del recall físico</div>
        </div>
        <div className="stat-block impact-stat">
          <div className="stat-value accent">1.4M</div>
          <div className="stat-label">Vehículos · Jeep, Dodge, Ram, Chrysler</div>
        </div>
        <div className="media-quote media-quote-compact">
          <img src={IMAGES.logoFca.src} alt={IMAGES.logoFca.alt} className="media-quote-logo-fca" />
          <p className="media-quote-text">
            Sin OTA: distribución de parches por USB a toda la flota
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

export default Slide03ActorsTimeline;
