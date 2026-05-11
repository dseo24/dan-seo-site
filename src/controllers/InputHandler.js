import * as THREE from 'three';
import { appState } from '../config/AppState.js';
import { updateLabel } from '../ui/ui.js';

export class InputHandler {
  constructor(canvas, { camera, carousel, overlay, cubeContents }) {
    this.camera       = camera;
    this.carousel     = carousel;
    this.overlay      = overlay;
    this.cubeContents = cubeContents;

    this.raycaster  = new THREE.Raycaster();
    this.pointer    = new THREE.Vector2();
    this.canvas     = canvas;
    this._hoveredIndex = null;

    canvas.addEventListener('click', this._onClick.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
  }

  // Returns 'center' | 'left' | 'right' | null for a given item index
  _slotOf(itemIndex) {
    const { selectedIndex } = appState;
    const total  = this.carousel.items.length;
    const offset = ((itemIndex - selectedIndex) % total + total) % total;
    if (offset === 0) return 'center';
    if (offset === 1) return 'right';
    return 'left';
  }

  _hitTest(e) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);

    for (let i = 0; i < this.carousel.items.length; i++) {
      const target = this.carousel.items[i].hitProxy ?? this.carousel.items[i].mesh;
      const hits = this.raycaster.intersectObject(target);
      if (hits.length > 0) return { index: i, slot: this._slotOf(i) };
    }
    return null;
  }

  _onClick(e) {
    if (this.overlay.isOpen) return;
    const hit = this._hitTest(e);
    if (!hit) return;

    if (hit.slot === 'center') {
      if (this.cubeContents[appState.selectedIndex]) {
        this.overlay.open(this.cubeContents[appState.selectedIndex]);
      }
    } else if (hit.slot === 'left') {
      this.carousel.prev();
      updateLabel(this.cubeContents);
    } else if (hit.slot === 'right') {
      this.carousel.next();
      updateLabel(this.cubeContents);
    }
  }

  _onMouseMove(e) {
    appState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    appState.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);

    if (this.overlay.isOpen) {
      this.canvas.style.cursor = 'default';
      this._hoveredIndex = null;
      return;
    }

    const hit = this._hitTest(e);

    if (hit) {
      this.canvas.style.cursor = 'pointer';
      if (hit.slot !== 'center' && hit.index !== this._hoveredIndex) {
        this.carousel.items[hit.index].triggerSpin();
      }
      this._hoveredIndex = hit.index;
    } else {
      this.canvas.style.cursor = 'default';
      this._hoveredIndex = null;
    }
  }
}
