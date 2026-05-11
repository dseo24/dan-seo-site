import { inject } from '@vercel/analytics';
import * as THREE from 'three';
import { applyTheme } from './config/theme.js';
import { appState, AppPhase } from './config/AppState.js';
import { createScene } from './core/scene.js';
import { createRenderer } from './core/renderer.js';
import { createCamera } from './core/camera.js';
import { createComposer } from './postfx/composer.js';
import { initCssDither } from './postfx/CssDither.js';
import { CameraController, CAMERA_HOME_Y } from './controllers/CameraController.js';
import { HomepageController } from './controllers/HomepageController.js';
import { InputHandler } from './controllers/InputHandler.js';
import { initUI, showPortfolioUI } from './ui/ui.js';
import { DialogueBox } from './ui/DialogueBox.js';
import { Cube, CUBE_BASE_Y } from './objects/Cube.js';
import { Shadow } from './objects/Shadow.js';
import { BackgroundGrid } from './objects/BackgroundGrid.js';
import { CubeCarousel } from './objects/carousels/CubeCarousel.js';
import { HomepageScene } from './objects/HomepageScene.js';
import { Overlay } from './objects/Overlay.js';
import { createImagePlaneMaterial } from './utils/materials.js';
import aboutContent from './objects/overlays/about.js';
import projectsContent from './objects/overlays/projects.js';
import resumeContent from './objects/overlays/resume.js';

// ── Vercel Analytics ───────────────────────────────────────
inject();

// ── Theme ──────────────────────────────────────────────────
applyTheme();

// ── Three.js core ──────────────────────────────────────────
const scene    = createScene();
const renderer = createRenderer();
const camera   = createCamera();
const composer = createComposer(renderer, scene, camera);
initCssDither();

// ── Scene objects ──────────────────────────────────────────
function makeCube(src, phase, tint = null) {
  const c = new Cube(createImagePlaneMaterial(src, tint), phase, new THREE.PlaneGeometry(2, 2));
  scene.add(c.mesh);
  return c;
}

const cubes = [
  makeCube('/pixelated-headshot.png', 0),
  makeCube('/computer.svg', 1.3, '#888888'),
  makeCube('/folder.svg', 2.6, '#888888'),
];

cubes.forEach(c => { c.animState.baseY = CUBE_BASE_Y; });

const shadow         = new Shadow();
const backgroundGrid = new BackgroundGrid();
const homepageScene  = new HomepageScene(scene, CAMERA_HOME_Y);

scene.add(shadow.mesh);
scene.add(backgroundGrid.group);

// ── App objects ────────────────────────────────────────────
const cubeContents = [aboutContent, projectsContent, resumeContent];
const carousel     = new CubeCarousel(cubes);
const overlay      = new Overlay();
const cameraCtrl   = new CameraController(camera, renderer, composer);

for (let i = 0; i < 120; i++) carousel.update(0);

new InputHandler(renderer.domElement, { camera, carousel, overlay, cubeContents });
initUI(carousel, cubeContents, overlay);

const dialogueBox  = new DialogueBox();
const homepageCtrl = new HomepageController(cameraCtrl, homepageScene, () => {
  showPortfolioUI();
  dialogueBox.show();
});

// ── Animation loop ─────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  const isHomephase = appState.phase === AppPhase.HOMEPAGE || appState.phase === AppPhase.PANNING;

  if (isHomephase) {
    cameraCtrl.update();
    homepageCtrl.update(t);
  }

  if (appState.phase === AppPhase.PANNING || appState.phase === AppPhase.PORTFOLIO) {
    carousel.update(t);
    const { x, y, z } = carousel.getSelected().mesh.position;
    shadow.update(x, y, z);
  }

  composer.render();
}

animate();
