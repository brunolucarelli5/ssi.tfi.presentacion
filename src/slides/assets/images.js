/**
 * Imágenes en public/images/
 */
export const IMAGES = {
  jeepCherokee: {
    src: '/images/white-cherokee.png',
    filename: 'white-cherokee.png',
    alt: 'Jeep Cherokee 2014 (generación KL) — modelo afectado',
    available: true,
    fit: 'contain',
    darkBg: true,
  },
  jeepCherokeePhoto: {
    src: '/images/jeep-cherokee.jpg',
    filename: 'jeep-cherokee.jpg',
    alt: 'Jeep Cherokee en circulación',
    available: true,
    fit: 'cover',
  },
  uconnectLogo: {
    src: '/images/uconnect-logo.jpg',
    filename: 'uconnect-logo.jpg',
    alt: 'Logo Uconnect',
    available: true,
    lightBg: true,
  },
  logoJeep: {
    src: '/images/jeep-logo.png',
    filename: 'jeep-logo.png',
    alt: 'Logo Jeep',
    available: true,
    invert: true,
  },
  logoJeepSvg: {
    src: '/images/logo-jeep.svg',
    filename: 'logo-jeep.svg',
    alt: 'Logo Jeep',
    available: true,
    invert: true,
  },
  logoUtn: {
    src: '/images/logo-utn.png',
    filename: 'logo-utn.png',
    alt: 'Logo UTN — Universidad Tecnológica Nacional',
    available: true,
    darkBg: true,
  },
  logoWired: {
    src: '/images/logo-wired.svg',
    filename: 'logo-wired.svg',
    alt: 'Logo Wired',
    available: true,
    invert: true,
  },
  logoFca: {
    src: '/images/fiat-chrysler-automobiles.png',
    filename: 'fiat-chrysler-automobiles.png',
    alt: 'Logo FCA — Fiat Chrysler Automobiles',
    available: true,
    darkBg: true,
  },
  logoSprint: {
    src: '/images/sprint.png',
    filename: 'sprint.png',
    alt: 'Logo Sprint',
    available: true,
    darkBg: true,
  },
  logoHarman: {
    src: '/images/harman-logo.png',
    filename: 'harman-logo.png',
    alt: 'Logo Harman — desarrollador de Uconnect',
    available: true,
    darkBg: true,
  },
  logoQnx: {
    src: '/images/qnx-logo.png',
    filename: 'qnx-logo.png',
    alt: 'Logo QNX — sistema operativo embebido',
    available: true,
    darkBg: true,
  },
  logoDarpa: {
    src: '/images/darpa-logo.png',
    filename: 'darpa-logo.png',
    alt: 'Logo DARPA',
    available: true,
    darkBg: true,
  },
};

export const ACTORS = [
  { id: 'fca', name: 'FCA', role: 'Fabricante víctima', imageKey: 'logoFca' },
  { id: 'sprint', name: 'Sprint', role: 'Red celular 4G', imageKey: 'logoSprint' },
  { id: 'harman', name: 'Harman', role: 'Desarrolla Uconnect', imageKey: 'logoHarman' },
  { id: 'qnx', name: 'QNX', role: 'SO del OMAP', imageKey: 'logoQnx' },
  { id: 'darpa', name: 'DARPA', role: 'Financia investigación', imageKey: 'logoDarpa' },
];
