import * as THREE from 'three';

const COLOR = 0xd7d7d7; // --color-close
const OPACITY = 0.28;

const FLOOR_Y = -1.5;
const WALL_Z = -17;

const FLOOR = { cols: 14, rows: 10, cellW: 3, cellD: 3 };
const WALL  = { cols: 14, rows: 6,  cellW: 3, cellH: 3 };

function buildGrid(cols, rows, cellW, cellH) {
  const halfW = (cols / 2) * cellW;
  const halfH = (rows / 2) * cellH;
  const points = [];

  for (let i = 0; i <= cols; i++) {
    const x = -halfW + i * cellW;
    points.push(new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, halfH * 2, 0));
  }
  for (let j = 0; j <= rows; j++) {
    const y = j * cellH;
    points.push(new THREE.Vector3(-halfW, y, 0), new THREE.Vector3(halfW, y, 0));
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function makeMaterial() {
  return new THREE.LineBasicMaterial({ color: COLOR, transparent: true, opacity: OPACITY });
}

export class BackgroundGrid {
  constructor() {
    const floorGeom = buildGrid(FLOOR.cols, FLOOR.rows, FLOOR.cellW, FLOOR.cellD);
    const floorMesh = new THREE.LineSegments(floorGeom, makeMaterial());
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, FLOOR_Y, WALL_Z + FLOOR.rows * FLOOR.cellD);

    const wallGeom = buildGrid(WALL.cols, WALL.rows, WALL.cellW, WALL.cellH);
    const wallMesh = new THREE.LineSegments(wallGeom, makeMaterial());
    wallMesh.position.set(0, FLOOR_Y, WALL_Z);

    this.group = new THREE.Group();
    this.group.add(floorMesh, wallMesh);
  }
}
