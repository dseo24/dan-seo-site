import * as THREE from 'three';
import { applyFloat, applyCarouselPosition } from '../utils/animations.js';

export const CUBE_BASE_Y = 0.65;

export class Cube {
  constructor(materials, phaseOffset = 0, geometry = new THREE.BoxGeometry(2, 2, 0.05)) {
    this.mesh = new THREE.Mesh(geometry, materials);
    this.mesh.position.y = CUBE_BASE_Y;

    this.animState = {
      velPosY: 0,
      currentScale: 1,
      baseY: CUBE_BASE_Y,
      emergeY: CUBE_BASE_Y,
      phaseOffset,
    };
  }

  update(t, mouseX, mouseY, isSelected, carouselTarget, swayMult = 1, freqMult = 1) {
    applyFloat(this.mesh, this.animState, t, mouseX, mouseY, isSelected, swayMult, freqMult);
    applyCarouselPosition(this.mesh, this.animState, carouselTarget);
  }
}
