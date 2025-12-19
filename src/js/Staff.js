import * as weapon from './Weapon';

export class Staff extends weapon.Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}
