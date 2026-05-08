import * as THREE from 'three';

function createFromImageTexture(src, mirror = false, tint = null) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);

  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.clearRect(0, 0, size, size);
    if (mirror) {
      ctx.save();
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(img, 0, 0, size, size);
    if (mirror) ctx.restore();
    if (tint) {
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = tint;
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';
    }
    texture.needsUpdate = true;
  };

  return texture;
}

export function createImageSlabMaterials(src) {
  const front = new THREE.MeshStandardMaterial({ color: 0xffffff, map: createFromImageTexture(src, false), transparent: true });
  const back  = new THREE.MeshStandardMaterial({ color: 0xffffff, map: createFromImageTexture(src, true), transparent: true });
  const edge  = new THREE.MeshStandardMaterial({ color: 0xC4B8AC, roughness: 0.7 });
  return [edge, edge, edge, edge, front, back];
}

export function createImagePlaneMaterial(src, tint = null) {
  return new THREE.MeshStandardMaterial({
    map: createFromImageTexture(src, false, tint),
    transparent: true,
    side: THREE.DoubleSide,
  });
}

export function createPlainSlabMaterials(color = 0xBBBBBB) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.0 });
  return [mat, mat, mat, mat, mat, mat];
}
