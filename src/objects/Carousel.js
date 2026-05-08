export class Carousel {
  constructor(items, state) {
    this.items = items;
    this.state = state;
  }

  prev() {
    this.state.selectedIndex = (this.state.selectedIndex + this.items.length - 1) % this.items.length;
  }

  next() {
    this.state.selectedIndex = (this.state.selectedIndex + 1) % this.items.length;
  }

  goTo(index) {
    this.state.selectedIndex = ((index % this.items.length) + this.items.length) % this.items.length;
  }

  getSelected() {
    return this.items[this.state.selectedIndex];
  }

  update(_t) {
    throw new Error('Carousel.update() must be implemented by subclass');
  }
}
