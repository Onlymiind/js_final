import { Player } from './Player';
import { Bow } from './Bow';
import { assertType } from './Util';

export class Archer extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getDamage(distance) {
    assertType(distance, 'distance', 'number');
    if (distance <= 0) {
      throw new Error('distance must be positive, got: ' + distance);
    }
    return (this.attack + this.weapon.getDamage()) * this.getLuck() * distance / this.weapon.range;
  }
}
