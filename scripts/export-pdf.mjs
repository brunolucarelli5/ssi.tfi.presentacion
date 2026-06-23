import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outputDir = path.join(rootDir, 'export');
const outputFile = path.join(outputDir, 'presentacion-jeep-cherokee.pdf');
const port = 4173;
const previewUrl = `http://127.0.0.1:${port}/?pdf=1`;

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
      const request = http.get(previewUrl, (response) => {
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

  throw new Error(`No se pudo conectar a ${previewUrl}`);
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

  try {
    await waitForServer();
    await mkdir(outputDir, { recursive: true });

    console.log('Renderizando PDF...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto(previewUrl, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');
    await page.evaluate(async () => {
      await document.fonts.ready;
      window.dispatchEvent(new Event('resize'));
    });
    await page.waitForFunction(() => {
      const slideElements = document.querySelectorAll('.print-mode .slide');
      return slideElements.length === 10
        && Array.from(slideElements).every((slide) => parseFloat(slide.style.zoom) > 0);
    }, { timeout: 15000 });

    await page.pdf({
      path: outputFile,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    console.log(`PDF exportado en: ${outputFile}`);
  } finally {
    previewProcess.kill('SIGTERM');
  }
};

exportPdf().catch(async (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
