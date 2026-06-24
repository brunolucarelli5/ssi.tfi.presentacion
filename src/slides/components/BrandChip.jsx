import { useState } from 'react';
import { getImageLoadingProps } from '../../utils/pdf-export';
import { IMAGES } from '../assets/images';
import './BrandChip.css';

const BrandChip = ({ imageKey, label, detail, critical = false }) => {
  const asset = IMAGES[imageKey];
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`brand-chip${critical ? ' brand-chip-critical' : ''}`}>
      {asset && !hasError ? (
        <img
          src={asset.src}
          alt=""
          className={`brand-chip-logo${asset.lightBg ? ' brand-chip-logo-light' : ''}${asset.invert ? ' brand-chip-logo-invert' : ''}`}
          {...getImageLoadingProps()}
          onError={() => setHasError(true)}
          aria-hidden="true"
        />
      ) : (
        <span className="brand-chip-fallback" aria-hidden="true">●</span>
      )}
      <div className="brand-chip-text">
        <span className="brand-chip-label">{label}</span>
        {detail && <span className="brand-chip-detail">{detail}</span>}
      </div>
    </div>
  );
};

export default BrandChip;
