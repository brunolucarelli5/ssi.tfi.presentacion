import { useState } from 'react';
import { IMAGES } from '../assets/images';

const LogoBadge = ({ imageKey, name, role, size = 'md', highlight = false }) => {
  const asset = IMAGES[imageKey];
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  if (!asset || hasError) {
    const initials = name
      .split(/[\s-]+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();

    return (
      <div
        className={`logo-badge logo-badge-fallback logo-badge-${size} ${highlight ? 'highlight' : ''}`}
        title={`${name}${role ? ` — ${role}` : ''}`}
      >
        <span className="logo-badge-initials" aria-hidden="true">{initials}</span>
        <span className="logo-badge-name">{name}</span>
        {role && <span className="logo-badge-role">{role}</span>}
      </div>
    );
  }

  const imgClass = [
    'logo-badge-img',
    asset.lightBg ? 'logo-badge-img-light' : '',
    asset.darkBg ? 'logo-badge-img-dark' : '',
    asset.invert ? 'logo-badge-img-invert' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`logo-badge logo-badge-${size} ${highlight ? 'highlight' : ''}${asset.lightBg ? ' logo-badge-light-bg' : ''}`}
      title={`${name}${role ? ` — ${role}` : ''}`}
    >
      <img
        src={asset.src}
        alt={asset.alt}
        className={imgClass}
        loading="lazy"
        onError={handleError}
      />
      <span className="logo-badge-name">{name}</span>
      {role && <span className="logo-badge-role">{role}</span>}
    </div>
  );
};

export default LogoBadge;
