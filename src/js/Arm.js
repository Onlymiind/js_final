import * as weapon from './Weapon';

export class Arm extends weapon.Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }
}
