import { useState } from 'react';

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

  return (
    <figure className={`slide-image ${className}`}>
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
    </figure>
  );
};

export default SlideImage;
