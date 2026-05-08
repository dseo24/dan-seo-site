export function startLoop(carousel, shadow, composer, scene, camera) {
  function animate() {
    requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    carousel.update(t);
    const { x, y, z } = carousel.getSelected().mesh.position;
    shadow.update(x, y, z);
    composer.render();
  }
  animate();
}
