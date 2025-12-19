import * as sword from './Sword';

export class Axe extends sword.Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800;
    this.initDurability = this.durability;
  }
}
