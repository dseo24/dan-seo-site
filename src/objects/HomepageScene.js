import * as THREE from 'three';
import { createImagePlaneMaterial } from '../utils/materials.js';

const COUNT = 15;
const Z_NEAR = -1;
const Z_FAR = -7;
const SCALE_NEAR = 1.1;
const SCALE_FAR = 0.4;
const SPEED_MIN = 0.35;
const SPEED_MAX = 0.9;
const PLANE_SIZE = 1.4;
const ROT_Y_AMP = 1;
const ROT_Z_AMP = 1.2;
const ROT_X_AMP = 0.15;
const ROT_Y_FREQ = 0.4;
const ROT_Z_FREQ = 0.3;
const ROT_X_FREQ = 0.3;
const BOB_AMP = 0.15;
const BOB_FREQ = 0.35;

// Camera intrinsics — must match core/camera.js
const CAM_FOV = 45;
const CAM_Z   = 6;

export class HomepageScene {
  constructor(scene, cameraHomeY) {
    this.scene  = scene;
    this._homeY = cameraHomeY;
    this.planes = [];
    this._spawnPlanes();
  }

  _spawnPlanes() {
    const IMAGES = [
      { src: '/pixelated-headshot.png', tint: null },
      { src: '/folder.svg',             tint: '#888888' },
      { src: '/icons.svg',              tint: '#888888' },
    ];
    for (let i = 0; i < COUNT; i++) {
      const { src, tint } = IMAGES[Math.floor(Math.random() * IMAGES.length)];
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE),
        createImagePlaneMaterial(src, tint)
      );
      const z = Z_FAR + Math.random() * (Z_NEAR - Z_FAR);
      const depthT = (z - Z_FAR) / (Z_NEAR - Z_FAR);
      mesh.scale.setScalar(SCALE_FAR + depthT * (SCALE_NEAR - SCALE_FAR));

      const goRight = i % 2 === 0;
      const speed = (SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN)) * (goRight ? 1 : -1);

      const viewH = this._viewHeightAt(z);
      const bucket = i / COUNT;
      const baseY = this._homeY + (bucket + Math.random() / COUNT - 0.5) * viewH;

      const bound = this._viewWidthAt(z) / 2 + 2;
      const startX = (goRight ? -1 : 1) * Math.random() * bound;

      mesh.position.set(startX, baseY, z);

      const phase = (i / COUNT) * Math.PI * 2;

      this.planes.push({ mesh, speed, z, phase, goRight, baseY });
      this.scene.add(mesh);
    }
  }

  _viewHeightAt(z) {
    return 2 * Math.tan((CAM_FOV * Math.PI / 180) / 2) * (CAM_Z - z);
  }

  _viewWidthAt(z) {
    return this._viewHeightAt(z) * (window.innerWidth / window.innerHeight);
  }

  removeFromScene() {
    for (const p of this.planes) this.scene.remove(p.mesh);
  }

  update(t) {
    for (const p of this.planes) {
      p.mesh.position.x += p.speed * 0.016;
      p.mesh.position.y = p.baseY + Math.sin(t * BOB_FREQ + p.phase) * BOB_AMP;
      p.mesh.rotation.y = Math.sin(t * ROT_Y_FREQ + p.phase) * ROT_Y_AMP;
      p.mesh.rotation.z = Math.sin(t * ROT_Z_FREQ + p.phase + 1.2) * ROT_Z_AMP;
      p.mesh.rotation.x = Math.sin(t * ROT_X_FREQ + p.phase + 2.4) * ROT_X_AMP;

      const bound = this._viewWidthAt(p.z) / 2 + 2;
      if (p.goRight && p.mesh.position.x > bound) {
        p.mesh.position.x = -bound;
        p.baseY = this._homeY + (Math.random() - 0.5) * this._viewHeightAt(p.z) * 0.5;
      } else if (!p.goRight && p.mesh.position.x < -bound) {
        p.mesh.position.x = bound;
        p.baseY = this._homeY + (Math.random() - 0.5) * this._viewHeightAt(p.z) * 0.5;
      }
    }
  }
}
