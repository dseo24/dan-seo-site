export const projects = [
  {
    id: 'dan-seo-site',
    title: 'danseo.dev',
    stack: 'Three.js · Vite · Vanilla JS',
    description: `My 3D/interactive take on the personal portfolio website. Built with Three.js and Vite.
    Scene, camera, and input handling are all custom.`,
    media: { type: 'image', src: '/site-picture.png', alt: 'dan-seo site screenshot' },
    link: { href: 'https://github.com/dseo24/dan-seo-site/', label: 'View on GitHub' },
  },
  {
    id: 'rhythm-game',
    title: 'Rhythm Game',
    stack: 'Unity · C#',
    description: `A call-and-response rhythm game inspired by Rhythm Heaven. Listen to a beatmap, then repeat it back. Built in Unity with a DSP-based timing system for frame-accurate note judgment.`,
    media: { type: 'video', src: '/rhythm-game-demo.mp4' },
    link: { href: 'https://github.com/dseo24/beat-game/', label: 'View on GitHub' },
  },
];

/** @type {{ title: string, render: () => string }} */
export default {
  title: 'Projects',
  render() { return ''; },
};
