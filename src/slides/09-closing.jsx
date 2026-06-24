import SlideLayout from './components/SlideLayout';
import './styles/09-closing.css';

const Slide09Closing = () => (
  <SlideLayout
    label="Cierre"
    title="Lección central del análisis"
    slideNumber={12}
    totalSlides={13}
  >
    <div className="closing-center">
      <blockquote className="closing-quote-hero">
        &ldquo;El costo de diseñar bien es siempre fraccionariamente menor al costo de remediar tarde.&rdquo;
      </blockquote>
    </div>
  </SlideLayout>
);

export default Slide09Closing;
