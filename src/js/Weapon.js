export class Weapon {
  name;
  attack;
  durability;
  initDurability;
  range;

  takeDamage(damage) {
    if (typeof (damage) != 'number')
      throw new Error('invalid damage value: ' + damage);
    this.durability = Math.min(Math.max(this.durability - damage, 0), this.initDurability);
  }

  getDamage() {
    if (this.durability >= 0.3 * this.initDurability)
      return this.attack;
    else if (this.durability > 0)
      return this.attack / 2;
    return 0;
  }

  isBroken() {
    return this.durability <= 0;
  }

  constructor(name, attack, durability, range) {
    if (typeof (name) != 'string')
      throw new Error('name must be a string, got: ' + name);
    if (typeof (attack) != 'number' || attack <= 0)
      throw new Error('invalid attack value: ' + attack);
    if (typeof (range) != 'number' || range <= 0)
      throw new Error('invalid range: ' + range); this.name = name;
    if (typeof (durability) != 'number' || durability <= 0)
      throw new Error('invalid durability: ' + durability);
    this.attack = attack;
    this.durability = durability;
    this.initDurability = durability;
    this.range = range;
  }
}
