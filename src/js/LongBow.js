import * as bow from './Bow';

export class LongBow extends bow.Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}
