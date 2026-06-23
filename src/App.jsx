import { useState, useEffect, useCallback, useRef } from 'react';
import { slides } from './slides';

const isPdfMode = new URLSearchParams(window.location.search).has('pdf');
const shouldAutoPrint = new URLSearchParams(window.location.search).has('print');

const SLIDE_DESIGN_WIDTH = 1920;
const SLIDE_DESIGN_HEIGHT = 1080;
const SLIDE_SAFE_MARGIN = 48;

const PrintSlide = ({ SlideComponent, index }) => {
  const innerRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    const fitSlide = () => {
      const inner = innerRef.current;
      const slide = slideRef.current;
      if (!inner || !slide) {
        return;
      }

      slide.style.zoom = '1';
      const availableWidth = inner.clientWidth - SLIDE_SAFE_MARGIN * 2;
      const availableHeight = inner.clientHeight - SLIDE_SAFE_MARGIN * 2;
      const scale = Math.min(
        availableWidth / SLIDE_DESIGN_WIDTH,
        availableHeight / SLIDE_DESIGN_HEIGHT,
      );
      slide.style.zoom = String(Number.isFinite(scale) ? scale : 1);
    };

    fitSlide();
    const frame = window.requestAnimationFrame(fitSlide);
    const timers = [100, 400, 900].map((delay) => window.setTimeout(fitSlide, delay));
    document.fonts.ready.then(fitSlide);

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <section className="print-slide" aria-label={`Diapositiva ${index + 1}`}>
      <div className="print-slide-inner" ref={innerRef}>
        <div className="slide" ref={slideRef}>
          <SlideComponent />
        </div>
      </div>
    </section>
  );
};

const PrintView = () => {
  useEffect(() => {
    if (!shouldAutoPrint) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      window.print();
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="presentation print-mode">
      {slides.map((SlideComponent, index) => (
        <PrintSlide key={index} SlideComponent={SlideComponent} index={index} />
      ))}
    </div>
  );
};

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (isPdfMode) {
      return undefined;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      }
      if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, totalSlides]);

  if (isPdfMode) {
    return <PrintView />;
  }

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="presentation">
      <div className="slide-container">
        <div className="slide" key={currentSlide}>
          <CurrentSlideComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
