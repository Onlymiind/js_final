import { Player } from './Player';
import { Sword } from './Sword';
import { assertType } from './Util';

export class Warrior extends Player {
  #maxLife = 0;

  constructor(position, name) {
    super(position, name);

    this.life = 120;
    this.#maxLife = this.life;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword();
  }

  takeDamage(damage) {
    assertType(damage, 'damage', 'number');
    if (this.magic > 0 && this.life / this.#maxLife < 0.5 && this.getLuck() > 0.8) {
      this.magic = Math.max(this.magic - damage, 0);
    } else {
      super.takeDamage(damage);
    }
  }

  setMaxLife(life) {
    assertType(life, 'life', 'number');
    if (life <= 0)
      throw new Error('life must be positive, got: ' + life);
    this.#maxLife = life;
    this.life = life;
  }
}
