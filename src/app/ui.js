import { CUBE_BASE_Y } from '../objects/Cube.js';
import { initSounds, play, resumeCtx } from '../utils/sound.js';

const cubeLabel = document.getElementById('cube-label');

function updateLabel(carousel, cubeContents) {
  cubeLabel.textContent = cubeContents[carousel.state.selectedIndex]?.title ?? '';
}

export function initUI(carousel, cubeContents, cubes, overlay) {
  initSounds();

  function begin() {
    if (begin.started) return;
    begin.started = true;

    resumeCtx();
    play('startup');
    cubes.forEach(c => { c.animState.baseY = CUBE_BASE_Y; });

    document.getElementById('intro').classList.add('hidden');
    updateLabel(carousel, cubeContents);
    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('ui').classList.add('visible');
      document.getElementById('site-nav').classList.remove('nav-hidden');
    }, 800);
  }
  begin.started = false;

  function navigate(fn) { fn(); updateLabel(carousel, cubeContents); play('select'); }
  document.getElementById('arrow-left').addEventListener('click', () => navigate(() => carousel.prev()));
  document.getElementById('arrow-right').addEventListener('click', () => navigate(() => carousel.next()));

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      begin();
      const index = parseInt(btn.dataset.index, 10);
      carousel.goTo(index);
      updateLabel(carousel, cubeContents);
      overlay.open(cubeContents[index]);
    });
  });

  window.addEventListener('keydown', begin);
  window.addEventListener('click', begin);
}
