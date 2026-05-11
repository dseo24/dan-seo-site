import { DITHER_PALETTE } from '../config/theme.js';

const DITHER_ENABLED = false;

const BAYER_4X4 = [
   0/16,  8/16,  2/16, 10/16,
  12/16,  4/16, 14/16,  6/16,
   3/16, 11/16,  1/16,  9/16,
  15/16,  7/16, 13/16,  5/16,
];

function nearestPaletteColor(r, g, b, palette) {
  let best = palette[0];
  let bestDist = Infinity;
  for (const color of palette) {
    const dr = r - color[0], dg = g - color[1], db = b - color[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) { bestDist = dist; best = color; }
  }
  return best;
}

function clamp(v) { return Math.max(0, Math.min(1, v)); }

function buildDitherTile(pixelSize, palette) {
  const size   = 4 * pixelSize;
  const canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  for (let py = 0; py < 4; py++) {
    for (let px = 0; px < 4; px++) {
      const threshold = BAYER_4X4[py * 4 + px];
      const [br, bg, bb] = palette[0];
      const sr = clamp(br + (threshold - 0.5) * 0.5);
      const sg = clamp(bg + (threshold - 0.5) * 0.5);
      const sb = clamp(bb + (threshold - 0.5) * 0.5);
      const [or, og, ob] = nearestPaletteColor(sr, sg, sb, palette);
      ctx.fillStyle = `rgb(${Math.round(or * 255)},${Math.round(og * 255)},${Math.round(ob * 255)})`;
      ctx.fillRect(px * pixelSize, py * pixelSize, pixelSize, pixelSize);
    }
  }

  return canvas.toDataURL();
}

export function initCssDither(
  selectors = ['#overlay-generic', '#projects-menu', '#projects-detail-body'],
  pixelSize = 2,
  opacity   = 0.3,
) {
  if (!DITHER_ENABLED) return;

  const palette = DITHER_PALETTE;
  const tileUrl = buildDitherTile(pixelSize, palette);
  const size    = 4 * pixelSize;

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;

    const overlay = document.createElement('div');
    overlay.setAttribute('data-css-dither', '');
    overlay.style.cssText = [
      'position:absolute',
      'inset:0',
      `background-image:url("${tileUrl}")`,
      'background-repeat:repeat',
      `background-size:${size}px ${size}px`,
      'pointer-events:none',
      `opacity:${opacity}`,
      'mix-blend-mode:overlay',
    ].join(';');

    el.insertBefore(overlay, el.firstChild);
  }
}
