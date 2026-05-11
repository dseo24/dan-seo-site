const TEXT = "Hey, I'm Dan. Welcome to my portfolio site. Click the icons above to explore.";
const CHAR_DELAY = 38; // ms per character

export class DialogueBox {
  constructor() {
    this._el       = document.getElementById('dialogue-box');
    this._textEl   = document.getElementById('dialogue-text');
    this._closeBtn = document.getElementById('dialogue-close');
    this._timer    = null;
    this._dismiss  = this._dismiss.bind(this);

    this._closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._dismiss();
    });
  }

  show() {
    this._el.classList.add('visible');
    this._typewrite(TEXT);

    document.addEventListener('keydown', this._dismiss, { once: true });
    this._el.addEventListener('click', this._dismiss, { once: true });
  }

  _typewrite(text) {
    this._textEl.textContent = '';
    let i = 0;
    this._timer = setInterval(() => {
      this._textEl.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(this._timer);
    }, CHAR_DELAY);
  }

  _dismiss() {
    clearInterval(this._timer);
    this._el.classList.remove('visible');
    document.removeEventListener('keydown', this._dismiss);
    this._el.removeEventListener('click', this._dismiss);
  }
}
