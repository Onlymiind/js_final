import { Axe } from './Axe';
import { Warrior } from './Warrior';
import { assertType } from './Util';

export class Dwarf extends Warrior {
  #hitCounter = 0;

  constructor(position, name) {
    super(position, name);

    this.setMaxLife(130);
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe();
  }

  takeDamage(damage) {
    assertType(damage, 'damage', 'number');
    this.#hitCounter = (this.#hitCounter + 1) % 6;
    if (this.#hitCounter === 0 && this.getLuck() > 0.5) {
      damage /= 2;
    }
    super.takeDamage(damage);
  }
}
