import * as THREE from 'three';
import { applyFloat, applyCarouselPosition } from '../utils/animations.js';

export const CUBE_BASE_Y = .85;

export class Cube {
  constructor(materials, phaseOffset = 0, geometry = new THREE.BoxGeometry(2, 2, 0.05)) {
    this.mesh = new THREE.Mesh(geometry, materials);
    this.mesh.position.y = CUBE_BASE_Y;

    // Invisible hit proxy — same transform as mesh, but deep enough to be clickable at any rotation
    const proxyGeo = new THREE.BoxGeometry(2.4, 2.4, 1.2);
    const proxyMat = new THREE.MeshBasicMaterial({ visible: false });
    this.hitProxy = new THREE.Mesh(proxyGeo, proxyMat);
    this.mesh.add(this.hitProxy);

    this.animState = {
      velPosY: 0,
      currentScale: 1,
      baseY: CUBE_BASE_Y,
      emergeY: CUBE_BASE_Y,
      phaseOffset,
    };
  }

  triggerSpin() {
    this.animState.spinVel = (this.animState.spinVel ?? 0) + Math.PI / 20;
  }

  update(t, mouseX, mouseY, isSelected, carouselTarget, swayMult = 1, freqMult = 1) {
    applyFloat(this.mesh, this.animState, t, mouseX, mouseY, isSelected, swayMult, freqMult);
    applyCarouselPosition(this.mesh, this.animState, carouselTarget);
  }
}
