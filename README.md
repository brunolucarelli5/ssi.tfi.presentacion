# Presentación — Hackeo Remoto Jeep Cherokee

Presentación interactiva en React para el Trabajo Integrador Final de Seguridad en Sistemas de Información.

**Duración sugerida:** ~11 minutos (12 diapositivas)

## Cómo usar

```bash
cd presentacion
npm install
npm run dev
```

Abrir la URL que muestra Vite (normalmente `http://localhost:5173`).

### Navegación

- `→` / `Espacio` / `Page Down` — siguiente diapositiva
- `←` / `Page Up` — anterior
- `Home` / `End` — primera / última

## Despliegue

### Build estático

```bash
npm run build
```

Los archivos quedan en `dist/`. Podés subirlos a:

- **GitHub Pages** — activar Pages desde la carpeta `dist`
- **Netlify / Vercel** — conectar el repo, build command: `npm run build`, publish: `dist`
- **Cualquier hosting estático** — subir el contenido de `dist/`

### Preview local del build

```bash
npm run preview
```

## Exportar a PDF

Cada página del PDF corresponde a una diapositiva (formato 16:9).

### Desde la presentación (manual)

1. Ejecutar `npm run dev`
2. Clic en el botón **PDF** (barra inferior) o abrir `http://localhost:5173/?pdf=1&print=1`
3. En el diálogo de impresión: destino **Guardar como PDF**, activar **Gráficos de fondo**

### Automático (recomendado)

```bash
npm install
npm run export:pdf
```

Genera `export/presentacion-jeep-cherokee.pdf` con las 12 diapositivas.

## Estructura

| Diapositiva | Tema | ~Tiempo |
|-------------|------|---------|
| 1 | Título | 1 min |
| 2 | El incidente (datos clave) | 1 min |
| 3 | Arquitectura vulnerable | 1 min |
| 4 | Cadena de ataque | 1.5 min |
| 5 | Vulnerabilidades e impacto | 1 min |
| 6 | Cronología | 1 min |
| 7 | Actores | 1 min |
| 8 | Matriz de riesgos | 1 min |
| 9 | Respuesta NIST | 1 min |
| 10 | Pericias forenses | 1 min |
| 11 | Recomendaciones | 1 min |
| 12 | Conclusión | 1 min |
