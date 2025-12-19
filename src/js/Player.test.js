import { Archer } from './Archer';
import { Crossbowman } from './Crossbowman';
import { Demiurge } from './Demiurge';
import { Dwarf } from './Dwarf';
import { Mage } from './Mage';
import { Warrior } from './Warrior';
import { Player } from './Player';
import { Arm } from './Arm';
import { Axe } from './Axe';
import { Bow } from './Bow';
import { Knife } from './Knife';
import { LongBow } from './LongBow';
import { Staff } from './Staff';
import { StormStaff } from './StormStaff';
import { Sword } from './Sword';
import { expect, test } from '@jest/globals';


function doWithLuckyPlayer(player, func) {
  const prevLuck = player.luck;
  player.luck = Infinity;
  func(player);
  player.luck = prevLuck;
}

function doWithUnluckyPlayer(player, func) {
  const prevLuck = player.luck;
  player.luck = -Infinity;
  func(player);
  player.luck = prevLuck;
}

test.each([
  ['Player', 100, 20, 1, 10, 5, 10, 'Игрок', new Knife(), Player, 1],
  ['Warrior', 120, 20, 2, 10, 5, 10, 'Воин', new Sword(), Warrior, 2],
  ['Archer', 80, 35, 1, 5, 10, 10, 'Лучник', new Bow(), Archer, 3],
  ['Mage', 70, 100, 1, 5, 8, 10, 'Маг', new Staff(), Mage, 4],
  ['Dwarf', 130, 20, 2, 15, 5, 20, 'Гном', new Axe(), Dwarf, 5],
  ['Crossbowman', 85, 35, 1, 8, 20, 15, 'Арбалетчик', new LongBow(), Crossbowman, 6],
  ['Demiurge', 80, 120, 1, 6, 8, 12, 'Демиург', new StormStaff(), Demiurge, 7],
])('Init values and weapon swapping (%s)', (
  caseName, life, magic, speed,
  attack, agility, luck, description,
  weapon, constructFunc, idx) => {
  const player = new constructFunc(idx, idx.toString());
  expect(player.life).toEqual(life);
  expect(player.magic).toEqual(magic);
  expect(player.speed).toEqual(speed);
  expect(player.attack).toEqual(attack);
  expect(player.agility).toEqual(agility);
  expect(player.luck).toEqual(luck);
  expect(player.weapon).toEqual(weapon);
  expect(player.description).toEqual(description);
  expect(player.position).toEqual(idx);
  expect(player.name).toEqual(idx.toString());

  player.checkWeapon();
  expect(player.weapon).toEqual(weapon);

  if (!(player.weapon instanceof Knife)) {
    player.weapon.takeDamage(Infinity); // break the weapon
    player.checkWeapon();
    expect(player.weapon).toEqual(new Knife());
  }

  player.weapon.takeDamage(Infinity); // break the Knife
  player.checkWeapon();
  expect(player.weapon).toEqual(new Arm());
});

test('move', () => {
  const player = new Player(1, '1');

  player.moveLeft(10);
  expect(player.position).toEqual(0);
  player.moveRight(8);
  expect(player.position).toEqual(1);

  player.move(-2);
  expect(player.position).toEqual(0);
  player.move(100);
  expect(player.position).toEqual(1);
});

test('takeDamage (Player)', () => {
  const player = new Player(1, '1');
  const initialLife = player.life;
  player.takeDamage(initialLife * 0.1);
  expect(player.life).toBeCloseTo(initialLife * 0.9);

  player.takeDamage(initialLife);
  expect(player.life).toEqual(0);
  expect(player.isDead()).toEqual(true);
});


test('getLuck', () => {
  let player = new Player(1, '1');

  doWithLuckyPlayer(player, (player) => {
    expect(player.isAttackBlocked()).toEqual(true);
  });

  doWithUnluckyPlayer(player, (player) => {
    expect(player.isAttackBlocked()).toEqual(false);
  });
});

test('dodged', () => {
  let player = new Player(1, '1');

  doWithLuckyPlayer(player, (player) => {
    expect(player.dodged()).toEqual(true);
  });

  doWithUnluckyPlayer(player, (player) => {
    expect(player.dodged()).toEqual(false);
  });
});

test('chooseEnemy', () => {
  const player = new Player(1, '1');
  expect(() => player.chooseEnemy(1)).toThrow();
  expect(() => player.chooseEnemy([player, 1])).toThrow();

  const players = [player];
  expect(player.chooseEnemy(players)).toEqual(-1);
  players.push(new Player(2, '2'), new Player(3, '3'), new Player(4, '4'), new Player(5, '5'));
  players[2].takeDamage(20);
  players[3].takeDamage(50);
  players[1].takeDamage(50);
  player.takeDamage(70);

  expect(player.chooseEnemy(players)).toEqual(1);
});

test('tryAttack', () => {
  const player = new Player(1, '1');
  expect(() => player.tryAttack(new Arm())).toThrow();

  const enemy = new Player(10, '2');
  enemy.luck = -Infinity; // prevent blocking and dodging
  let prevLife = enemy.life;
  player.tryAttack(enemy);
  expect(enemy.life).toEqual(prevLife);

  enemy.position = 1.5;
  prevLife = enemy.life;
  player.tryAttack(enemy);
  expect(enemy.life).toBeLessThan(prevLife);

  enemy.position = player.position;
  prevLife = enemy.life;
  player.tryAttack(enemy);
  expect(enemy.life).toBeLessThan(prevLife);
  expect(enemy.position).toEqual(player.position + 1);
});

test('moveToEnemy', () => {
  const player = new Player(1, '1');
  player.speed = 10;
  expect(() => player.moveToEnemy(1)).toThrow();

  let prevPos = player.position;
  player.moveToEnemy(new Player(100, '2'));
  expect(player.position).toEqual(prevPos + player.speed);

  prevPos = player.position;
  player.moveToEnemy(new Player(-100, '3'));
  expect(player.position).toEqual(prevPos - player.speed);

  const reachableEnemy = new Player(player.position + player.speed * 0.7, '4');
  player.moveToEnemy(reachableEnemy);
  expect(player.position).toEqual(reachableEnemy.position);
});

test('Attack blocking and dodging', () => {
  const player = new Player(1, '1');
  player.luck = Infinity;
  const life = player.life;
  const weaponDurability = player.weapon.durability;
  const damage = 20;

  player.takeAttack(damage);
  expect(player.life).toEqual(life);
  expect(player.weapon.durability).toEqual(weaponDurability - damage);

  player.isAttackBlocked = () => false;
  player.takeAttack(damage);
  expect(player.life).toEqual(life);
  expect(player.weapon.durability).toEqual(weaponDurability - damage);
});

test('getDamage (Archer)', () => {
  const archer = new Archer(1, '1');
  expect(() => archer.getDamage(-1)).toThrow();
  expect(archer.getDamage(10)).toBeGreaterThan(0);
});

test('takeDamage (Warrior)', () => {
  const warrior = new Warrior(1, '1');
  warrior.luck = Infinity;
  const damage = 1;
  const checkCase = (expectMagicBlocking) => {
    const prevLife = warrior.life;
    const prevMagic = warrior.magic;
    warrior.takeDamage(damage);
    if (!expectMagicBlocking) {
      expect(warrior.life).toEqual(prevLife - damage);
      expect(warrior.magic).toEqual(prevMagic);
    } else {
      expect(warrior.life).toEqual(prevLife);
      expect(warrior.magic).toEqual(prevMagic - damage);
    }
  }

  checkCase(false);

  warrior.life *= 0.4;
  checkCase(true);

  doWithUnluckyPlayer(warrior, () => {
    checkCase(false);
  });

  warrior.magic = 0;
  checkCase(false);
});

test('takeDamage (Dwarf)', () => {
  const dwarf = new Dwarf(1, '1');
  const damage = 1;
  const checkCase = (isLucky) => {
    for (let i = 0; i < 5; ++i) {
      const prevLife = dwarf.life;
      dwarf.takeDamage(damage);
      expect(dwarf.life).toEqual(prevLife - damage);
    }

    const prevLife = dwarf.life;
    dwarf.takeDamage(damage * 2);
    expect(dwarf.life).toEqual(prevLife - (isLucky ? damage : damage * 2));
  }

  doWithLuckyPlayer(dwarf, () => {
    checkCase(true);
  });

  doWithUnluckyPlayer(dwarf, () => {
    checkCase(false);
  });
});

test('turn', () => {
  const player = new Player(1, '1');
  let prevPos = player.position;
  player.turn([player]);
  expect(player.position).toEqual(prevPos);

  const enemy = new Player(3.1, '2');
  enemy.luck = -Infinity;
  prevPos = player.position;
  let prevLife = enemy.life;
  player.turn([player, enemy]);
  expect(player.position).toEqual(prevPos + player.speed);
  expect(enemy.life).toEqual(prevLife);

  prevPos = player.position;
  prevLife = enemy.life;
  player.turn([player, enemy]);
  expect(player.position).toEqual(prevPos + player.speed);
  expect(enemy.life).toBeLessThan(prevLife);
});

test('takeDamage (Mage)', () => {
  const mage = new Mage(1, '1');
  let prevMagic = mage.magic;
  let prevLife = mage.life;
  const damage = 10;

  mage.takeDamage(damage);
  expect(mage.life).toBeCloseTo(prevLife - damage / 2);
  expect(mage.magic).toEqual(prevMagic - 12);

  mage.magic *= 0.3;
  prevLife = mage.life;
  prevMagic = mage.magic;
  mage.takeDamage(damage);
  expect(mage.life).toEqual(prevLife - damage);
  expect(mage.magic).toEqual(prevMagic);
});

test('getDamage (Demiurge)', () => {
  const demiurge = new Demiurge(1, '1');
  demiurge.luck = Infinity;
  expect(demiurge.getDamage(10)).toBeGreaterThan(0); // no good way to check Demiurge specifics
});
