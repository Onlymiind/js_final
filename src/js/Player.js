import { Arm } from 'Arm';

export class Player {
  hp = 100;
  mana = 20;
  speed = 1;
  attack = 10;
  agility = 5;
  luck = 10;
  description = 'Игрок';
  prosition;
  name;
  weapon = new Arm;

  getLuck() { }

  getDamage(distance) { distance; }

  takeDamage(damage) { damage; }

  isDead() { }

  constructor(position, name) {
    this.name = name;
    this.position = position;
  }
}
