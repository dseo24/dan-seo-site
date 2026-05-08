# dan-seo-site

Personal portfolio site built with [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/).

An interactive 3D experience — rotate through a carousel of cards, each opening an overlay with info about me, my projects, and how to get in touch. The first card renders a transparent PNG headshot as a `PlaneGeometry` so the image silhouette shows cleanly with no visible edges on rotation.

## Stack

- **Three.js** — 3D scene, cube carousel, lighting, animations
- **Vite** — dev server and build tooling
- Vanilla JS (ES modules), no frameworks

## Structure

```
src/
  main.js           # Entry point
  state.js          # App state
  core/             # Renderer, scene, camera setup
  objects/          # Cube, Overlay, Shadow classes + carousel logic
  objects/overlays/ # About, Projects, Contact content
  app/              # Input handling, UI, animation loop
  utils/            # Materials, animations
```

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
