import { appState } from '../config/AppState.js';

const cubeLabel = document.getElementById('cube-label');
const uiEl      = document.getElementById('ui');
const navEl     = document.getElementById('site-nav');
const headerEl  = document.getElementById('site-header');

export function showPortfolioUI() {
  uiEl.style.transition = 'opacity 0.4s ease';
  uiEl.style.opacity    = '1';
  uiEl.style.pointerEvents = 'all';
  uiEl.classList.add('visible');
  navEl.classList.remove('nav-hidden');
  headerEl.classList.remove('header-hidden');
  requestAnimationFrame(() => { headerEl.style.opacity = '1'; });
}

export function updateLabel(cubeContents) {
  cubeLabel.textContent = cubeContents[appState.selectedIndex]?.title ?? '';
}

export function initUI(carousel, cubeContents, overlay) {
  uiEl.style.opacity    = '0';
  uiEl.style.pointerEvents = 'none';
  navEl.classList.add('nav-hidden');
  headerEl.classList.add('header-hidden');

  const hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click', () => {
    const open = navEl.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navEl.contains(e.target)) {
      navEl.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index, 10);
      carousel.goTo(index);
      updateLabel(cubeContents);
      overlay.open(cubeContents[index]);
      navEl.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  updateLabel(cubeContents);
}
