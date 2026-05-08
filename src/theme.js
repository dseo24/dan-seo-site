// Single source of truth for design tokens shared between CSS and JS.
// CSS vars in style.css must stay in sync with these values manually.
// DitherPass.js and CssDither.js read from here to avoid a CSS-timing
// race on Vercel where getComputedStyle returns "" before stylesheets apply.

export const COLORS = {
  bg:        '#2f2f2f',
  fg:        '#1a1a1a',
  muted:     '#888888',
  bodyText:  '#444444',
  accent:    '#d27b44',
  border:    '#d0d0d0',
  overlayBg: '#ebebeb',
  headerBg:  '#5d5d5d',
};

/** Parse a 6-digit hex string like "#e2e2e2" into a [r, g, b] float triple. */
export function hexToRgb(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255];
}

/** The dither palette as [r, g, b] float triples, ready for the shader. */
export const DITHER_PALETTE = [
  hexToRgb(COLORS.bg),
  hexToRgb(COLORS.fg),
  hexToRgb(COLORS.headerBg),
  hexToRgb(COLORS.accent),
  hexToRgb(COLORS.bodyText),
  hexToRgb(COLORS.muted),
  hexToRgb(COLORS.border),
  hexToRgb(COLORS.overlayBg),
];
