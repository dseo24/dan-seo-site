/** @type {{ title: string, render: () => string }} */
export default {
  title: 'Projects',
  render() {
    return `
      <div class="project-card">
        <img src="/site-picture.png" alt="dan-seo site screenshot" class="project-img" />
        <div class="project-meta">
          <h2>danseo.dev</h2>
          <p class="project-stack">Three.js &middot; Vite &middot; Vanilla JS</p>
          <p>My 3D/interactive take on the personal portfolio website. Built with Three.js and Vite.
          The cube is a carousel, each face maps to a section, clicking opens an overlay.
          Scene, camera, and input handling are all custom.
          Dithering is applied to the entire site to push the pixelated aesthetic.</p>
          <a href="https://github.com/dseo24/dan-seo-site/" target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
      </div>
      <hr class="project-divider" />
      <div class="project-card">
        <video src="/rhythm-game-demo.mp4" class="project-img" autoplay loop muted playsinline></video>
        <div class="project-meta">
          <h2>Rhythm Game</h2>
          <p class="project-stack">Unity &middot; C#</p>
          <p>A call-and-response rhythm game inspired by Rhythm Heaven. Listen to a beatmap, then repeat it back. Built in Unity with a DSP-based timing system for frame-accurate note judgment.</p>
          <a href="https://github.com/dseo24/beat-game/" target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
      </div>
    `;
  },
};
