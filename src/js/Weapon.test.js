import { Arm } from './Arm';
import { Axe } from './Axe';
import { Bow } from './Bow';
import { Knife } from './Knife';
import { LongBow } from './LongBow';
import { Staff } from './Staff';
import { StormStaff } from './StormStaff';
import { Sword } from './Sword';
import { Weapon } from './Weapon';
import { expect, test } from '@jest/globals';

test('constructor', () => {
  expect(() => new Weapon).toThrow(Error);
  expect(() => new Weapon(1, 1, 1, 1)).toThrow(Error);
  expect(() => new Weapon('1', {}, 1, 1)).toThrow(Error);
  expect(() => new Weapon('1', 1, -1, 100)).toThrow(Error);
  expect(() => new Weapon('1', 10, 2, [])).toThrow(Error);

  const weapon = new Weapon('1', 10, 100, 2);
  expect(weapon.name).toEqual('1');
  expect(weapon.attack).toEqual(10);
  expect(weapon.durability).toEqual(100);
  expect(weapon.initDurability).toEqual(100);
  expect(weapon.range).toEqual(2);
});

test('takeDamage', () => {
  const weapon = new Weapon('1', 10, 100, 2);
  expect(() => weapon.takeDamage({})).toThrow(Error);
  weapon.takeDamage(80);
  expect(weapon.durability).toEqual(20);
  weapon.takeDamage(100);
  expect(weapon.durability).toEqual(0);
  weapon.takeDamage(-10);
  expect(weapon.durability).toEqual(10);
  weapon.takeDamage(-10000);
  expect(weapon.durability).toEqual(100);
});

test('getDamage', () => {
  const weapon = new Weapon('1', 10, 100, 2);
  expect(weapon.getDamage()).toEqual(10);
  weapon.takeDamage(69);
  expect(weapon.getDamage()).toEqual(10);
  weapon.takeDamage(2);
  expect(weapon.getDamage()).toBeCloseTo(5);
  weapon.takeDamage(100);
  expect(weapon.getDamage()).toEqual(0);
});

test('isBroken', () => {
  const weapon = new Weapon('1', 2, 100, 1);
  expect(weapon.isBroken()).toEqual(false);
  weapon.takeDamage(10);
  expect(weapon.isBroken()).toEqual(false);
  weapon.takeDamage(90);
  expect(weapon.isBroken()).toEqual(true);
});

test.each(
  [
    ['Arm', 'Рука', 1, Infinity, 1, new Arm()],
    ['Knife', 'Нож', 5, 300, 1, new Knife()],
    ['Sword', 'Меч', 25, 500, 1, new Sword()],
    ['Bow', 'Лук', 10, 200, 3, new Bow()],
    ['Staff', 'Посох', 8, 300, 2, new Staff()],
    ['StormStaff', 'Посох Бури', 10, 300, 3, new StormStaff()],
    ['LongBow', 'Длинный лук', 15, 200, 4, new LongBow()],
    ['Axe', 'Секира', 27, 800, 1, new Axe()],
  ]
)('Init values (%s)',
  (caseName, name, attack, durability, range, weapon) => {
    expect(weapon.name).toEqual(name);
    expect(weapon.attack).toEqual(attack);
    expect(weapon.durability).toEqual(durability);
    expect(weapon.initDurability).toEqual(durability);
    expect(weapon.range).toEqual(range);
  });
