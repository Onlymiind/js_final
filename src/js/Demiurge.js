import { Mage } from './Mage';
import { StormStaff } from './StormStaff';

export class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.setMaxMagic(120);
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff();
  }

  getDamage(distance) {
    let damage = super.getDamage(distance);
    if (this.magic > 0 && this.getLuck() > 0.6) {
      damage *= 1.5;
    }
    return damage;
  }
}
