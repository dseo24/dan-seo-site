import { AppPhase, appState } from '../config/AppState.js';
import { CAMERA_PORTFOLIO_Y } from './CameraController.js';

const SUBTEXTS = [
  'product builder.',
  'v6 climber.',
  'product manager.',
  'noodle monger.',
  'AI-pilled.',
  'makes good spotify playlists.',
  'did I mention I can climb v6?',
];

const CYCLE_INTERVAL = 4000;
const FADE_DURATION  = 1000;

export class HomepageController {
  /**
   * @param {CameraController} cameraController
   * @param {HomepageScene}    homepageScene
   * @param {Function}         onEnterPortfolio  called once pan completes
   */
  constructor(cameraController, homepageScene, onEnterPortfolio) {
    this._cam        = cameraController;
    this._scene      = homepageScene;
    this._onComplete = onEnterPortfolio;

    this._subtextEl    = document.getElementById('homepage-subtext');
    this._homepageEl   = document.getElementById('homepage');
    this._subtextIndex = 0;
    this._timer        = null;

    this._subtextEl.textContent = SUBTEXTS[0];
    this._startCycle();

    document.getElementById('homepage-cta').addEventListener('click', () => this._enter());
  }

  _startCycle() {
    this._timer = setInterval(() => {
      this._subtextEl.classList.add('fade');
      setTimeout(() => {
        this._subtextIndex = (this._subtextIndex + 1) % SUBTEXTS.length;
        this._subtextEl.textContent = SUBTEXTS[this._subtextIndex];
        this._subtextEl.classList.remove('fade');
      }, FADE_DURATION);
    }, CYCLE_INTERVAL);
  }

  _enter() {
    if (appState.phase !== AppPhase.HOMEPAGE) return;
    appState.phase = AppPhase.PANNING;

    clearInterval(this._timer);
    this._homepageEl.classList.add('hidden');

    this._cam.panTo(CAMERA_PORTFOLIO_Y, () => {
      appState.phase = AppPhase.PORTFOLIO;
      this._scene.removeFromScene();
      this._onComplete();
    });
  }

  /** Call each frame while phase is HOMEPAGE or PANNING. */
  update(t) {
    this._scene.update(t);
  }
}
