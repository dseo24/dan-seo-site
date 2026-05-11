import * as THREE from 'three';
import { COLORS } from '../config/theme.js';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.bg);
const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2);
  keyLight.position.set(4, 4, 12);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-4, 2, -3);
  scene.add(fillLight);

  return scene;
}
