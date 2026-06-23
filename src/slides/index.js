import Slide01Title from './01-title';
import Slide02Architecture from './02-architecture';
import Slide03ActorsTimeline from './03-actors-timeline';
import Slide04Vulnerabilities from './04-vulnerabilities';
import Slide05RiskMatrix from './05-risk-matrix';
import Slide06Nist from './06-nist';
import Slide07Forensics from './07-forensics';
import Slide08Recommendations from './08-recommendations';
import Slide09Closing from './09-closing';

export const slides = [
  Slide01Title,
  Slide02Architecture,
  Slide03ActorsTimeline,
  Slide04Vulnerabilities,
  Slide05RiskMatrix,
  Slide06Nist,
  Slide07Forensics,
  Slide08Recommendations,
  Slide09Closing,
];

export const slideMeta = [
  { id: '01-title', title: 'Portada / Apertura', timing: '0:45' },
  { id: '02-architecture', title: 'Contexto y Arquitectura Vulnerable', timing: '1:30' },
  { id: '03-actors-timeline', title: 'Actores, Cronología e Impacto', timing: '1:15' },
  { id: '04-vulnerabilities', title: 'Tres Vulnerabilidades Críticas', timing: '1:30' },
  { id: '05-risk-matrix', title: 'Gestión de Riesgos / ALE', timing: '1:45' },
  { id: '06-nist', title: 'Respuesta al Incidente NIST', timing: '1:30' },
  { id: '07-forensics', title: 'Pericias Forenses', timing: '1:00' },
  { id: '08-recommendations', title: 'Propuestas de Mejora', timing: '1:30' },
  { id: '09-closing', title: 'Cierre', timing: '0:45' },
];
