import * as weapon from './Weapon';

export class Knife extends weapon.Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}
