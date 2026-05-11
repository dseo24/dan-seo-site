import { projects } from './overlays/projects.js';

export class Overlay {
  constructor() {
    this._el       = document.getElementById('overlay');
    this._generic  = document.getElementById('overlay-generic');
    this._projects = document.getElementById('overlay-projects');

    // generic panel elements
    this._closeBtn = document.getElementById('overlay-close');
    this._body     = document.getElementById('overlay-body');
    this._title    = document.getElementById('overlay-title');

    // projects panel elements
    this._menuList    = document.getElementById('projects-menu-list');
    this._menuClose   = document.getElementById('projects-menu-close');
    this._detailPane  = document.getElementById('projects-detail');
    this._detailClose = document.getElementById('projects-detail-close');
    this._detailBody  = document.getElementById('projects-detail-body');

    this._mode = null;

    this._closeBtn.addEventListener('click', () => this.close());
    this._menuClose.addEventListener('click', () => this.close());
    this._detailClose.addEventListener('click', () => this._closeDetail());
    this._el.addEventListener('click', (e) => {
      if (e.target === this._el) this.close();
    });
    this._projects.addEventListener('click', (e) => {
      if (e.target !== this._projects) return;
      if (this._detailPane.classList.contains('open')) {
        this._closeDetail();
      } else {
        this.close();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this._mode === 'projects' && this._detailPane.classList.contains('open')) {
          this._closeDetail();
        } else {
          this.close();
        }
      }
    });
  }

  open(content) {
    if (content.title === 'Projects') {
      this._openProjects();
    } else {
      this._openGeneric(content);
    }
    this._el.classList.add('visible');
  }

  _openGeneric(content) {
    this._mode = 'generic';
    this._title.textContent = content.title;
    this._body.innerHTML = content.render();
    this._generic.classList.add('active');
    this._projects.classList.remove('active');
  }

  _openProjects() {
    this._mode = 'projects';
    this._generic.classList.remove('active');
    this._projects.classList.add('active');
    this._closeDetail();
    this._renderMenu();
  }

  _renderMenu() {
    this._menuList.innerHTML = projects.map((p, i) => `
      <button class="proj-menu-item" data-index="${i}">
        <span class="proj-menu-title">${p.title}</span>
        <span class="proj-menu-stack">${p.stack}</span>
      </button>
    `).join('');

    this._menuList.querySelectorAll('.proj-menu-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this._menuList.querySelectorAll('.proj-menu-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._openDetail(projects[parseInt(btn.dataset.index, 10)]);
      });
    });
  }

  _openDetail(project) {
    const media = project.media.type === 'video'
      ? `<video src="${project.media.src}" class="proj-detail-media" autoplay loop muted playsinline></video>`
      : `<img src="${project.media.src}" alt="${project.media.alt}" class="proj-detail-media" />`;

    this._detailBody.innerHTML = `
      ${media}
      <div class="proj-detail-meta">
        <h2 class="proj-detail-title">${project.title}</h2>
        <p class="proj-detail-stack">${project.stack}</p>
        <p class="proj-detail-desc">${project.description.replace(/\n/g, '<br>')}</p>
        <a class="proj-detail-link" href="${project.link.href}" target="_blank" rel="noopener noreferrer">${project.link.label}</a>
      </div>
    `;

    this._detailPane.classList.add('open');
    this._projects.classList.add('detail-open');
  }

  _closeDetail() {
    this._detailPane.classList.remove('open');
    this._projects.classList.remove('detail-open');
    this._menuList.querySelectorAll('.proj-menu-item').forEach(b => b.classList.remove('active'));
  }

  close() {
    this._el.classList.remove('visible');
    this._mode = null;
    setTimeout(() => {
      this._generic.classList.remove('active');
      this._projects.classList.remove('active');
      this._closeDetail();
    }, 300);
  }

  get isOpen() {
    return this._el.classList.contains('visible');
  }
}
