import * as THREE from 'three';

function createFromImageTexture(src, mirror = false, tint = null) {
  const size   = 512;
  const canvas = document.createElement('canvas');
  canvas.width  = size;
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

export function createImagePlaneMaterial(src, tint = null) {
  return new THREE.MeshStandardMaterial({
    map: createFromImageTexture(src, false, tint),
    transparent: true,
    side: THREE.DoubleSide,
  });
}
