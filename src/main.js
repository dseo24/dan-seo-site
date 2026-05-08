import * as THREE from 'three';
import { createScene } from './core/scene.js';
import { createRenderer } from './core/renderer.js';
import { createCamera, onResize } from './core/camera.js';
import { Cube } from './objects/Cube.js';
import { Shadow } from './objects/Shadow.js';
import { CubeCarousel } from './objects/carousels/CubeCarousel.js';
import { createImagePlaneMaterial } from './utils/materials.js';
import { state } from './state.js';
import { Overlay } from './objects/Overlay.js';
import { InputHandler } from './app/InputHandler.js';
import { initUI } from './app/ui.js';
import { startLoop } from './app/loop.js';
import { BackgroundGrid } from './objects/BackgroundGrid.js';
import { createComposer } from './core/composer.js';
import { initCssDither } from './core/CssDither.js';
import { CUBE_BASE_Y } from './objects/Cube.js';
import aboutContent from './objects/overlays/about.js';
import projectsContent from './objects/overlays/projects.js';
import resumeContent from './objects/overlays/resume.js';

const scene = createScene();
const renderer = createRenderer();
const camera = createCamera();

// const EMERGE_DEPTH = -12;

function makeCube(src, phase, tint = null) {
  const c = new Cube(createImagePlaneMaterial(src, tint), phase, new THREE.PlaneGeometry(2, 2));
  // c.mesh.position.y = EMERGE_DEPTH;
  // c.animState.baseY = EMERGE_DEPTH;
  // c.animState.emergeY = EMERGE_DEPTH;
  scene.add(c.mesh);
  return c;
}

const cubes = [
  makeCube('/pixelated-headshot.png', 0),
  makeCube('/computer.svg', 1.3, '#888888'),
  makeCube('/folder.svg', 2.6, '#888888'),
];

const shadow = new Shadow();
scene.add(shadow.mesh);

const backgroundGrid = new BackgroundGrid();
scene.add(backgroundGrid.group);

const carousel = new CubeCarousel(cubes, state);
const overlay = new Overlay();
const cubeContents = [aboutContent, projectsContent, resumeContent];

const composer = createComposer(renderer, scene, camera);
initCssDither();

// TODO: re-enable begin() intro when dither is resolved
cubes.forEach(c => { c.animState.baseY = CUBE_BASE_Y; });
// Pre-settle carousel positions so cubes don't explode in on first frame
for (let i = 0; i < 120; i++) carousel.update(0);
document.getElementById('intro').style.display = 'none';
// TODO: remove when begin() is re-enabled
setTimeout(() => document.getElementById('ui').classList.add('visible'), 50);
document.getElementById('site-nav').classList.remove('nav-hidden');
// TODO: remove when begin() is re-enabled
document.getElementById('cube-label').textContent = cubeContents[state.selectedIndex]?.title ?? '';

new InputHandler(renderer.domElement, { camera, carousel, overlay, cubeContents, state });
initUI(carousel, cubeContents, cubes, overlay);
onResize(camera, renderer);
startLoop(carousel, shadow, composer, scene, camera);
