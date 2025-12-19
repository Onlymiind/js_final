import * as weapon from './Weapon';

export class Bow extends weapon.Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}
