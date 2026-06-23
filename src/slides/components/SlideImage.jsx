import { useState } from 'react';
import './SlideImage.css';

const SlideImage = ({
  src,
  alt,
  className = '',
  caption,
  overlay,
  fallbackLabel,
  objectFit = 'cover',
  darkBg = false,
  invert = false,
  href,
  linkLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <figure className={`slide-image slide-image-fallback ${className}`}>
        <div className="slide-image-placeholder" aria-hidden="true">
          <span className="slide-image-placeholder-icon">🖼</span>
          <span className="slide-image-placeholder-text">{fallbackLabel || alt}</span>
        </div>
        {caption && <figcaption className="slide-image-caption">{caption}</figcaption>}
      </figure>
    );
  }

  const frameClass = [
    'slide-image-frame',
    darkBg ? 'slide-image-frame-dark' : '',
    objectFit === 'contain' ? 'slide-image-frame-contain' : '',
  ].filter(Boolean).join(' ');

  const imgClass = [
    'slide-image-img',
    objectFit === 'contain' ? 'slide-image-img-contain' : '',
    invert ? 'slide-image-img-invert' : '',
  ].filter(Boolean).join(' ');

  const figure = (
    <>
      <div className={frameClass}>
        <img
          src={src}
          alt={alt}
          className={imgClass}
          loading="lazy"
          onError={() => setHasError(true)}
        />
        {overlay && <div className="slide-image-overlay">{overlay}</div>}
      </div>
      {caption && <figcaption className="slide-image-caption">{caption}</figcaption>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`slide-image slide-image-link ${className}`}
        aria-label={linkLabel || caption || alt}
      >
        <figure className="slide-image-inner">{figure}</figure>
      </a>
    );
  }

  return <figure className={`slide-image ${className}`}>{figure}</figure>;
};

export default SlideImage;
