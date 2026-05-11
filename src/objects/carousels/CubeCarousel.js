import { appState } from '../../config/AppState.js';
import { Carousel } from '../Carousel.js';

const CENTER = { x: 0,   z: 0,  scale: 1    };
const SIDE   = { x: 4.5, z: -2, y: -.3, scale: 0.6 };

function getSlotTarget(slotIndex, selectedIndex, total) {
  const offset = ((slotIndex - selectedIndex) % total + total) % total;
  if (offset === 0) return { x:  CENTER.x, z: CENTER.z, y: 0,        scale: CENTER.scale };
  if (offset === 1) return { x:  SIDE.x,   z: SIDE.z,   y: SIDE.y,   scale: SIDE.scale   };
  return                   { x: -SIDE.x,   z: SIDE.z,   y: SIDE.y,   scale: SIDE.scale   };
}

export class CubeCarousel extends Carousel {
  update(t) {
    const { selectedIndex, mouseX, mouseY } = appState;
    this.items.forEach((cube, i) => {
      const isSelected = i === selectedIndex;
      const target     = getSlotTarget(i, selectedIndex, this.items.length);
      cube.update(t, mouseX, mouseY, isSelected, target, isSelected ? 1 : 12, isSelected ? 1 : 0.5);
    });
  }
}
