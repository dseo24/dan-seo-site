import * as THREE from 'three';

export class InputHandler {
  constructor(canvas, { camera, carousel, overlay, cubeContents, state }) {
    this.camera = camera;
    this.carousel = carousel;
    this.overlay = overlay;
    this.cubeContents = cubeContents;
    this.state = state;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    canvas.addEventListener('click', this._onClick.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));

    this.canvas = canvas;
  }

  _onClick(e) {
    if (this.overlay.isOpen) return;

    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const selected = this.carousel.getSelected();
    const hits = this.raycaster.intersectObject(selected.mesh);
    if (hits.length > 0 && this.cubeContents[this.state.selectedIndex]) {
      this.overlay.open(this.cubeContents[this.state.selectedIndex]);
    }
  }

  _onMouseMove(e) {
    this.state.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.state.mouseY = -((e.clientY / window.innerHeight) * 2 - 1);

    if (!this.overlay.isOpen && this.cubeContents[this.state.selectedIndex]) {
      this.pointer.x = this.state.mouseX;
      this.pointer.y = this.state.mouseY;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const hits = this.raycaster.intersectObject(this.carousel.getSelected().mesh);
      this.canvas.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    } else {
      this.canvas.style.cursor = 'default';
    }
  }
}
