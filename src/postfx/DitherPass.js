import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { DITHER_PALETTE } from '../config/theme.js';

// 4x4 Bayer matrix, normalized to [0,1]
const BAYER_4X4 = [
   0/16,  8/16,  2/16, 10/16,
  12/16,  4/16, 14/16,  6/16,
   3/16, 11/16,  1/16,  9/16,
  15/16,  7/16, 13/16,  5/16,
];

const DitherShader = {
  uniforms: {
    tDiffuse:     { value: null },
    uResolution:  { value: [window.innerWidth, window.innerHeight] },
    uPalette:     { value: null },
    uPaletteSize: { value: 0 },
    uBayer:       { value: new Float32Array(BAYER_4X4) },
    uPixelSize:   { value: 1 },
  },

  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform vec3 uPalette[16];
    uniform int uPaletteSize;
    uniform float uBayer[16];
    uniform float uPixelSize;
    varying vec2 vUv;

    float luma(vec3 c) {
      return dot(c, vec3(0.299, 0.587, 0.114));
    }

    vec3 nearestPaletteColor(vec3 col) {
      vec3 best = uPalette[0];
      float bestDist = distance(col, uPalette[0]);
      for (int i = 1; i < 16; i++) {
        if (i >= uPaletteSize) break;
        float d = distance(col, uPalette[i]);
        if (d < bestDist) { bestDist = d; best = uPalette[i]; }
      }
      return best;
    }

    void main() {
      vec2 pixUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
      vec3 col = texture2D(tDiffuse, pixUv).rgb;

      vec2 px = floor(vUv * uResolution / uPixelSize);
      int bx = int(mod(px.x, 4.0));
      int by = int(mod(px.y, 4.0));
      float threshold = uBayer[by * 4 + bx];

      vec3 spread = col + (threshold - 0.5) * 0.25;
      gl_FragColor = vec4(nearestPaletteColor(clamp(spread, 0.0, 1.0)), 1.0);
    }
  `,
};

export function createDitherPass(pixelSize = 1) {
  const pass    = new ShaderPass(DitherShader);
  const palette = DITHER_PALETTE;
  const dpr     = window.devicePixelRatio || 1;

  const flat = new Float32Array(palette.length * 3);
  palette.forEach(([r, g, b], i) => {
    flat[i * 3] = r; flat[i * 3 + 1] = g; flat[i * 3 + 2] = b;
  });

  pass.material.uniforms.uResolution.value = [window.innerWidth * dpr, window.innerHeight * dpr];
  pass.material.uniforms.uPaletteSize.value = palette.length;
  pass.material.uniforms.uPixelSize.value   = pixelSize;
  pass.material.uniforms.uPalette           = { value: flat };

  pass.material.fragmentShader = DitherShader.fragmentShader
    .replace('uniform vec3 uPalette[16];',      `uniform vec3 uPalette[${palette.length}];`)
    .replace('for (int i = 1; i < 16; i++) {',  `for (int i = 1; i < ${palette.length}; i++) {`);
  pass.material.needsUpdate = true;

  window.addEventListener('resize', () => {
    const r = window.devicePixelRatio || 1;
    pass.material.uniforms.uResolution.value = [window.innerWidth * r, window.innerHeight * r];
  });

  return pass;
}
