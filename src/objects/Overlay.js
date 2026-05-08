export class Overlay {
  constructor() {
    this._el = document.getElementById('overlay');
    this._closeBtn = document.getElementById('overlay-close');
    this._body = document.getElementById('overlay-body');
    this._title = document.getElementById('overlay-title');

    this._closeBtn.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(content) {
    this._title.textContent = content.title;
    this._body.innerHTML = content.render();
    this._el.classList.add('visible');
  }

  close() {
    this._el.classList.remove('visible');
  }

  get isOpen() {
    return this._el.classList.contains('visible');
  }
}
