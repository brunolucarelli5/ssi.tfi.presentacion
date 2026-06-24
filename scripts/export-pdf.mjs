import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'export');
const outputFile = path.join(outputDir, 'presentacion-jeep-cherokee.pdf');
const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;
/** Zoom del navegador en pantalla completa (1.5 = 150%). */
const BROWSER_ZOOM = 1.5;
const LAYOUT_WIDTH = Math.round(SLIDE_WIDTH / BROWSER_ZOOM);
const LAYOUT_HEIGHT = Math.round(SLIDE_HEIGHT / BROWSER_ZOOM);
const HEADLESS = process.env.PDF_HEADLESS !== '0';

const runCommand = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: false,
    ...options,
  });

  child.on('error', reject);
  child.on('close', (code) => {
    if (code === 0) {
      resolve();
      return;
    }

    reject(new Error(`"${command} ${args.join(' ')}" terminó con código ${code}`));
  });
});

const waitForServer = async () => {
  const deadline = Date.now() + 30000;

  while (Date.now() < deadline) {
    const isReady = await new Promise((resolve) => {
      const request = http.get(`${baseUrl}/?capture=1&slide=0`, (response) => {
        response.resume();
        resolve(response.statusCode >= 200 && response.statusCode < 500);
      });

      request.on('error', () => resolve(false));
      request.setTimeout(1000, () => {
        request.destroy();
        resolve(false);
      });
    });

    if (isReady) {
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }

  throw new Error(`No se pudo conectar a ${baseUrl}`);
};

const waitForCaptureReady = async (page) => {
  await page.waitForSelector('[data-capture-ready="true"]', { timeout: 30000 });
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForFunction(() => (
    [...document.images].every((image) => image.complete && image.naturalWidth > 0)
  ), { timeout: 30000 });
};

const captureSlideCount = async (page) => {
  const slideCount = await page.locator('[data-slide-count]').first().evaluate(
    (element) => Number.parseInt(element.dataset.slideCount ?? '0', 10),
  );

  if (!Number.isFinite(slideCount) || slideCount < 1) {
    throw new Error('No se pudo determinar la cantidad de diapositivas');
  }

  return slideCount;
};

const buildPdfFromScreenshots = async (page, slideCount) => {
  const pdfDoc = await PDFDocument.create();

  for (let index = 0; index < slideCount; index += 1) {
    const slideUrl = `${baseUrl}/?capture=1&slide=${index}`;
    await page.goto(slideUrl, { waitUntil: 'networkidle', timeout: 60000 });
    await waitForCaptureReady(page);

    const pngBuffer = await page.screenshot({
      type: 'png',
      animations: 'disabled',
      scale: 'device',
    });

    const image = await pdfDoc.embedPng(pngBuffer);
    const pdfPage = pdfDoc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT]);

    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
    });

    console.log(`  capturada diapositiva ${index + 1}/${slideCount}`);
  }

  return pdfDoc.save();
};

const exportPdf = async () => {
  console.log('Generando build...');
  await runCommand('npm', ['run', 'build']);

  console.log('Iniciando servidor de preview...');
  const previewProcess = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: rootDir,
    stdio: 'pipe',
    shell: false,
  });

  let browser;

  try {
    await waitForServer();
    await mkdir(outputDir, { recursive: true });

    console.log(
      `Capturando ${SLIDE_WIDTH}x${SLIDE_HEIGHT}px (layout ${LAYOUT_WIDTH}x${LAYOUT_HEIGHT}, zoom ${BROWSER_ZOOM * 100}%)...`,
    );
    browser = await chromium.launch({
      headless: HEADLESS,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        `--window-size=${SLIDE_WIDTH},${SLIDE_HEIGHT}`,
      ],
    });
    const context = await browser.newContext({
      viewport: { width: LAYOUT_WIDTH, height: LAYOUT_HEIGHT },
      deviceScaleFactor: BROWSER_ZOOM,
    });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/?capture=1&slide=0`, { waitUntil: 'networkidle', timeout: 60000 });
    const slideCount = await captureSlideCount(page);

    const pdfBytes = await buildPdfFromScreenshots(page, slideCount);
    await writeFile(outputFile, pdfBytes);

    await browser.close();
    browser = undefined;
    console.log(`PDF exportado en: ${outputFile}`);
  } finally {
    if (browser) {
      await browser.close().catch(() => undefined);
    }

    previewProcess.kill('SIGTERM');
  }
};

exportPdf().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
