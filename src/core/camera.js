import * as THREE from 'three';
import { CAMERA_HOME_Y } from '../controllers/CameraController.js';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, CAMERA_HOME_Y, 6);
  camera.lookAt(0, CAMERA_HOME_Y, 0);
  return camera;
}
