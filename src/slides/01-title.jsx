import TitleSlide from './components/TitleSlide';

const Slide01Title = () => (
  <TitleSlide
    badge="TFI — Seguridad en Sistemas de Información"
    title={
      <>
        Hackeo Remoto del
        <br />
        Jeep Cherokee (2015)
      </>
    }
    subtitle="Explotación remota de un vehículo de pasajeros sin modificaciones"
    meta={[
      { label: 'Autor', value: 'Bruno Lucarelli — Leg. 14988' },
      { label: 'Docente', value: 'Ing. Ignacio Daniel Favro' },
      { label: 'Institución', value: 'UTN — FR Villa María' },
    ]}
  />
);

export default Slide01Title;
