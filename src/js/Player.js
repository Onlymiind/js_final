import { Arm } from './Arm';
import { Knife } from './Knife';
import { assertType } from './Util'

export class Player {
  life = 100;
  magic = 20;
  speed = 1;
  attack = 10;
  agility = 5;
  luck = 10;
  description = 'Игрок';
  prosition;
  name;
  weapon = new Knife();

  getLuck() {
    // * 101 because we need a number in [0, 100]
    return (Math.random() * 101 + this.luck) / 100
  }

  getDamage(distance) {
    assertType(distance, 'distance', 'number');
    if (distance <= 0) {
      throw new Error('distance must be positive, got: ' + distance);
    }
    return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
  }

  takeDamage(damage) {
    assertType(damage, 'damage', 'number');
    this.life = Math.max(this.life - damage, 0);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    assertType(distance, 'distance', 'number');
    this.position -= Math.sign(distance) * Math.min(this.speed, Math.abs(distance));
  }

  moveRight(distance) {
    assertType(distance, 'distance', 'number');
    this.position += Math.sign(distance) * Math.min(this.speed, Math.abs(distance));
  }

  move(distance) {
    assertType(distance, 'distance', 'number');
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
    console.log(this.name + ' moves to ' + this.position);
  }

  isAttackBlocked() {
    return this.getLuck() > ((100 - this.luck) / 100);
  }

  dodged() {
    return this.getLuck() > ((100 - this.agility - this.speed * 3) / 100);
  }

  takeAttack(damage) {
    assertType(damage, 'damage', 'number');
    if (this.isAttackBlocked()) {
      console.log(this.name + ' blocks the attack');
      this.weapon.takeDamage(damage);
      this.checkWeapon();
    } else if (this.dodged()) {
      console.log(this.name + ' dodges the attack');
    } else {
      this.takeDamage(damage);
      console.log(this.name + ' takes damage, HP is ' + this.life);
    }
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }
    console.log(this.name + "'s weapon " + this.weapon.name + ' breaks!');
    // Arm doesn't break, so check only for knife
    if (!(this.weapon instanceof Knife)) {
      this.weapon = new Knife();
    } else {
      this.weapon = new Arm();
    }
  }

  tryAttack(enemy) {
    if (!(enemy instanceof Player)) {
      throw new Error('enemy is not a Player');
    }

    let distance = Math.abs(this.position - enemy.position);
    if (this.weapon.range < distance) {
      return;
    }

    /*
    * it makes more sense for the weapon to take damage *AFTER*
    * the attack, but the task explicitly specifies reverse order
    */
    this.weapon.takeDamage(10 * this.getLuck());
    this.checkWeapon();

    let damageModifier = 1;
    if (distance === 0) {
      console.log(this.name + ' knocks back ' + enemy.name);
      enemy.move(1);
      damageModifier = 2;
      distance = Math.abs(this.position - enemy.position);
    }

    const damage = this.getDamage(distance) * damageModifier;
    console.log(this.name + ' attacks ' + enemy.name + ' for ' + damage);
    enemy.takeAttack(damage);
  }

  chooseEnemy(players) {
    if (!Array.isArray(players)) {
      throw new Error('players must be an array');
    }
    let chosenIdx = -1;
    let minHP = Infinity;
    for (const i in players) {
      const player = players[i];
      if (!(player instanceof Player)) {
        throw new Error('object at index ' + i + ' is not a player');
      } else if (player === this) {
        continue;
      }

      if (player.life < minHP) {
        chosenIdx = i;
        minHP = player.life
      }
    }

    return typeof (chosenIdx) === 'number' ? chosenIdx : parseInt(chosenIdx);
  }

  moveToEnemy(enemy) {
    if (!(enemy instanceof Player)) {
      throw new Error('enemy is not a player');
    }
    this.move(enemy.position - this.position);
  }

  turn(players) {
    const enemyIdx = this.chooseEnemy(players);
    if (enemyIdx < 0) {
      return;
    }
    const enemy = players[enemyIdx];
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }

  constructor(position, name) {
    assertType(position, 'position', 'number');
    assertType(name, 'name', 'string')

    this.name = name;
    this.position = position;
  }
}
