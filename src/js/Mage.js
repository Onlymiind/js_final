import { Player } from './Player';
import { Staff } from './Staff';
import { assertType } from './Util';

export class Mage extends Player {
  #maxMagic = 0;

  constructor(position, name) {
    super(position, name);

    this.life = 70;
    this.magic = 100;
    this.#maxMagic = this.magic;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff();
  }

  takeDamage(damage) {
    assertType(damage, 'damage', 'number');
    if (this.magic / this.#maxMagic > 0.5) {
      damage /= 2;
      this.magic = Math.max(this.magic - 12, 0);
    }
    super.takeDamage(damage);
  }

  setMaxMagic(magic) {
    assertType(magic, 'magic', 'number');
    if (magic <= 0) {
      throw new Error('magic must be positive, got: ' + magic);
    }
    this.#maxMagic = magic;
    this.magic = magic;
  }
}
