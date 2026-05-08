import * as THREE from 'three';
import { CUBE_BASE_Y } from './Cube.js';

const SHADOW_Y = CUBE_BASE_Y - 1.5;
const BASE_SCALE_X = 1.1;
const BASE_SCALE_Z = 1.1;
const BASE_OPACITY = 0.9;
const OPACITY_RANGE = 0.25;
const BOUNCE_RANGE = 0.12;

function createShadowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0, 'rgba(180,180,180,0.7)');
  grad.addColorStop(0.45, 'rgba(180,180,180,0.3)');
  grad.addColorStop(1, 'rgba(180,180,180,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export class Shadow {
  constructor() {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      opacity: BASE_OPACITY,
      depthWrite: false,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = SHADOW_Y;
    this.mesh.scale.set(BASE_SCALE_X, BASE_SCALE_Z, 1);
  }

  update(x, y, z) {
    const t = (y - CUBE_BASE_Y) / BOUNCE_RANGE;
    const s = 1 - t * 0.08;
    this.mesh.scale.set(BASE_SCALE_X * s, BASE_SCALE_Z * s, 1);
    this.mesh.material.opacity = BASE_OPACITY - Math.abs(t) * OPACITY_RANGE;
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }
}
