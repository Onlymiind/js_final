import { Weapon } from './Weapon';

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
