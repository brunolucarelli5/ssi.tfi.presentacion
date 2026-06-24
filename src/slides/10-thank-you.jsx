import SlideLayout from './components/SlideLayout';
import './styles/10-thank-you.css';

const Slide10ThankYou = () => (
  <SlideLayout
    label="Agradecimiento"
    slideNumber={13}
    totalSlides={13}
  >
    <div className="thankyou-center">
      <h2 className="thankyou-title">Gracias</h2>
      <div className="thankyou-divider" aria-hidden="true" />
      <p className="thankyou-subtitle">Quedo a disposición para preguntas</p>
    </div>
  </SlideLayout>
);

export default Slide10ThankYou;
