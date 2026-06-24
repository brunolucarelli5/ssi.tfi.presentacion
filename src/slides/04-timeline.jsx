import SlideLayout from './components/SlideLayout';
import { IMAGES } from './assets/images';
import './styles/04-timeline.css';

const TIMELINE_EVENTS = [
  {
    date: 'Octubre de 2014',
    phase: 'Divulgación',
    label: 'Reporte responsable del D-Bus a FCA',
    detail: 'Primera notificación al fabricante',
  },
  {
    date: 'Marzo de 2015',
    phase: 'Investigación',
    label: 'Se informa reprogramación del V850',
    detail: 'Escalada hacia el dominio crítico',
  },
  {
    date: '16 de Julio de 2015',
    phase: 'Mitigación',
    label: 'Parche firmware 15.26.1',
    detail: 'Actualización antes de la publicación',
  },
  {
    date: '21 de Julio de 2015',
    phase: 'Crisis pública',
    label: 'Publicación en ',
    detail: 'Demostración remota en vivo',
    highlight: true,
    wired: true,
  },
  {
    date: '24 de Julio de 2015',
    phase: 'Respuesta',
    label: 'Sprint bloquea el puerto 6667 · Recall NHTSA',
    detail: 'Cierre del vector celular y recall oficial',
    highlight: true,
  },
];

const Slide04Timeline = () => (
  <SlideLayout
    label="Cronología"
    title="De la divulgación al recall"
    subtitle="Miller y Valasek refutaron que hackear un auto requería acceso físico al OBD-II"
    slideNumber={5}
    totalSlides={12}
  >
    <div className="timeline-slide">
      <ol className="timeline-v2" aria-label="Cronología del incidente">
        {TIMELINE_EVENTS.map((event, index) => (
          <li
            key={event.date}
            className={`timeline-v2-item${event.highlight ? ' timeline-v2-item--highlight' : ''}`}
          >
            <div className="timeline-v2-marker" aria-hidden="true">
              <span className="timeline-v2-dot" />
              {index < TIMELINE_EVENTS.length - 1 && (
                <span className="timeline-v2-connector" />
              )}
            </div>

            <div className="timeline-v2-card">
              <div className="timeline-v2-card-head">
                <time className="timeline-v2-date" dateTime={event.date}>
                  {event.date}
                </time>
                <span className="timeline-v2-phase">{event.phase}</span>
              </div>
              <p className="timeline-v2-label">
                {event.label}
                {event.wired && (
                  <img
                    src={IMAGES.logoWired.src}
                    alt={IMAGES.logoWired.alt}
                    className="timeline-v2-wired"
                  />
                )}
              </p>
              <p className="timeline-v2-detail">{event.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="timeline-aside" aria-label="Hitos clave">
        <div className="timeline-aside-card timeline-aside-card--alert">
          <span className="timeline-aside-value">5 días</span>
          <span className="timeline-aside-label">Entre parche y publicación Wired</span>
        </div>
        <div className="timeline-aside-card">
          <span className="timeline-aside-value">3 días</span>
          <span className="timeline-aside-label">Hasta bloqueo Sprint y recall</span>
        </div>
        <p className="timeline-aside-note">
          Ventana crítica donde el vector remoto seguía activo para millones de vehículos
        </p>
      </aside>
    </div>
  </SlideLayout>
);

export default Slide04Timeline;
