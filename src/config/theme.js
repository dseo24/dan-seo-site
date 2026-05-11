export const COLORS = {
  bg:        '#545454',
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

/**
 * Inject COLORS into CSS custom properties on :root.
 * Call once at app startup — eliminates manual CSS/JS sync.
 */
export function applyTheme() {
  const root = document.documentElement.style;
  root.setProperty('--color-bg',         COLORS.bg);
  root.setProperty('--color-fg',         COLORS.fg);
  root.setProperty('--color-muted',      COLORS.muted);
  root.setProperty('--color-body-text',  COLORS.bodyText);
  root.setProperty('--color-accent',     COLORS.accent);
  root.setProperty('--color-border',     COLORS.border);
  root.setProperty('--color-overlay-bg', COLORS.overlayBg);
  root.setProperty('--color-header-bg',  COLORS.headerBg);
}
