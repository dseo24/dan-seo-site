import { appState } from '../config/AppState.js';

export class Carousel {
  constructor(items) {
    this.items = items;
  }

  prev() {
    appState.selectedIndex = (appState.selectedIndex + this.items.length - 1) % this.items.length;
  }

  next() {
    appState.selectedIndex = (appState.selectedIndex + 1) % this.items.length;
  }

  goTo(index) {
    appState.selectedIndex = ((index % this.items.length) + this.items.length) % this.items.length;
  }

  getSelected() {
    return this.items[appState.selectedIndex];
  }

  update(_t) {
    throw new Error('Carousel.update() must be implemented by subclass');
  }
}
