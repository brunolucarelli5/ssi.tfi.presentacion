import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src/index.css');
const lines = fs.readFileSync(sourcePath, 'utf8').split('\n');

const slice = (start, end) => `${lines.slice(start - 1, end).join('\n').trim()}\n`;

const write = (relPath, content) => {
  const fullPath = path.join(root, 'src', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

const chunks = [
  ['styles/global.css', slice(1, 97)],
  ['styles/slide-layout.css', slice(98, 286)],
  ['slides/components/TitleSlide.css', slice(287, 521)],
  ['styles/shared.css', slice(522, 976)],
  ['styles/controls.css', slice(977, 1144)],
  ['styles/print.css', `${slice(1146, 1261).trim()}\n\n${slice(3544, 3572).trim()}\n`],
  ['slides/components/SlideImage.css', slice(1263, 1360)],
  ['styles/layouts.css', slice(1362, 1636)],
  ['slides/components/BrandChip.css', slice(1638, 1705)],
  ['slides/styles/architecture-shared.css', [
    slice(1707, 1738).trim(),
    slice(2094, 2163).trim(),
    slice(2391, 2396).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/02-architecture.css', [
    slice(1740, 1979).trim(),
    slice(2055, 2092).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/03-architecture-domains.css', slice(1981, 2053)],
  ['slides/styles/03-actors-timeline.css', [
    slice(2165, 2301).trim(),
    slice(2398, 2449).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/04-vulnerabilities.css', [
    slice(2303, 2389).trim(),
    slice(2451, 2465).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/05-risk-matrix.css', slice(2467, 2758)],
  ['slides/styles/06-nist.css', [
    slice(2760, 2784).trim(),
    slice(2839, 2916).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/07-forensics.css', [
    slice(2786, 2815).trim(),
    slice(2914, 2916).trim(),
  ].join('\n\n') + '\n'],
  ['slides/styles/08-recommendations.css', slice(2918, 2975)],
  ['slides/styles/09-closing.css', [
    slice(2817, 2837).trim(),
    slice(2977, 3050).trim(),
  ].join('\n\n') + '\n'],
  ['styles/responsive.css', slice(3052, 3114)],
  ['styles/presentation-scale.css', slice(3116, 3543)],
];

chunks.forEach(([relPath, content]) => write(relPath, content));

const imports = [
  './styles/global.css',
  './styles/slide-layout.css',
  './styles/shared.css',
  './styles/layouts.css',
  './styles/controls.css',
  './slides/components/SlideImage.css',
  './slides/components/BrandChip.css',
  './slides/components/TitleSlide.css',
  './slides/styles/architecture-shared.css',
  './slides/styles/02-architecture.css',
  './slides/styles/03-architecture-domains.css',
  './slides/styles/03-actors-timeline.css',
  './slides/styles/04-vulnerabilities.css',
  './slides/styles/05-risk-matrix.css',
  './slides/styles/06-nist.css',
  './slides/styles/07-forensics.css',
  './slides/styles/08-recommendations.css',
  './slides/styles/09-closing.css',
  './styles/responsive.css',
  './styles/presentation-scale.css',
  './styles/print.css',
];

write('index.css', `${imports.map((file) => `@import '${file}';`).join('\n')}\n`);

console.log(`Split ${sourcePath} into ${chunks.length} files.`);
