import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { createDitherPass } from './DitherPass.js';

const DITHER_ENABLED = true;

export function createComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  const dpr      = renderer.getPixelRatio();
  composer.setPixelRatio(dpr);
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.addPass(new RenderPass(scene, camera));

  if (DITHER_ENABLED) {
    composer.addPass(createDitherPass(1));
  }

  return composer;
}
