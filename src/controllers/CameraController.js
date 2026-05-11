import * as THREE from 'three';

export const CAMERA_HOME_Y      = 10;
export const CAMERA_PORTFOLIO_Y = 0;

const SNAP_THRESHOLD = 0.001;
const UI_THRESHOLD   = 0.5;   // fire onComplete while still visually panning
const LERP_FACTOR    = 0.04;

export class CameraController {
  constructor(camera, renderer, composer) {
    this.camera      = camera;
    this._targetY    = camera.position.y;
    this._lookTarget = new THREE.Vector3(0, 0, 0);
    this._onPanComplete = null;
    this._panning    = false;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  panTo(y, onComplete = null) {
    this._targetY       = y;
    this._onPanComplete = onComplete;
    this._panning       = true;
  }

  /** Returns true while a pan is in progress. */
  update() {
    if (!this._panning) return false;

    const cam  = this.camera;
    const diff = this._targetY - cam.position.y;

    // Fire callback early so UI fades in while camera is still visually settling
    if (this._onPanComplete && Math.abs(diff) < UI_THRESHOLD) {
      const cb = this._onPanComplete;
      this._onPanComplete = null;
      cb();
    }

    if (Math.abs(diff) < SNAP_THRESHOLD) {
      cam.position.y = this._targetY;
      this._lookTarget.y = this._targetY;
      cam.lookAt(this._lookTarget);
      this._panning = false;
      return false;
    }

    cam.position.y += diff * LERP_FACTOR;
    this._lookTarget.y = cam.position.y;
    cam.lookAt(this._lookTarget);
    return true;
  }
}
