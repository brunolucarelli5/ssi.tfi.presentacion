import { useState, useEffect, useCallback } from 'react';
import { slides } from './slides';

const searchParams = new URLSearchParams(window.location.search);
const isPdfMode = searchParams.has('pdf');
const isCaptureMode = searchParams.has('capture');
const shouldAutoPrint = searchParams.has('print');
const captureSlideIndex = isCaptureMode
  ? Number.parseInt(searchParams.get('slide') ?? '0', 10)
  : null;

const PresentationSlide = ({ SlideComponent, slideIndex }) => (
  <div
    className="presentation"
    data-capture-ready="true"
    data-slide-index={slideIndex}
    data-slide-count={slides.length}
  >
    <div className="slide-container">
      <div className="slide">
        <SlideComponent />
      </div>
    </div>
  </div>
);

const PrintSlide = ({ SlideComponent, index }) => (
  <section className="print-slide" aria-label={`Diapositiva ${index + 1}`}>
    <div className="presentation print-slide-stage">
      <div className="slide-container">
        <div className="slide">
          <SlideComponent />
        </div>
      </div>
    </div>
  </section>
);

const PrintView = () => {
  useEffect(() => {
    document.documentElement.classList.add('pdf-export');

    return () => {
      document.documentElement.classList.remove('pdf-export');
    };
  }, []);

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
    <div className="print-mode" data-slide-count={slides.length}>
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
    if (isPdfMode || isCaptureMode) {
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

  if (isCaptureMode) {
    const slideIndex = Number.isFinite(captureSlideIndex)
      ? Math.min(Math.max(captureSlideIndex, 0), totalSlides - 1)
      : 0;
    const CaptureSlideComponent = slides[slideIndex];

    return (
      <PresentationSlide
        SlideComponent={CaptureSlideComponent}
        slideIndex={slideIndex}
      />
    );
  }

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
