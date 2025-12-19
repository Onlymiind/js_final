import { assertType } from './Util';

export class Weapon {
  name;
  attack;
  durability;
  initDurability;
  range;

  takeDamage(damage) {
    assertType(damage, 'damage', 'number');
    this.durability = Math.min(Math.max(this.durability - damage, 0), this.initDurability);
  }

  getDamage() {
    if (this.durability >= 0.3 * this.initDurability) {
      return this.attack;
    } else if (this.durability > 0) {
      return this.attack / 2;
    }
    return 0;
  }

  isBroken() {
    return this.durability <= 0;
  }

  constructor(name, attack, durability, range) {
    assertType(name, 'name', 'string');
    assertType(attack, 'attack', 'number');
    assertType(range, 'range', 'number');
    assertType(durability, 'durability', 'number');
    if (durability <= 0) {
      throw new Error('invalid durability: ' + durability);
    }

    this.attack = attack;
    this.durability = durability;
    this.initDurability = durability;
    this.range = range;
    this.name = name;
  }
}
