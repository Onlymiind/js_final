import { Crossbowman } from './Crossbowman';
import { Dwarf } from './Dwarf';
import { Archer } from './Archer';
import { Mage } from './Mage';
import { Demiurge } from './Demiurge';
import { Warrior } from './Warrior';
import { play } from './game';
import { expect, test } from '@jest/globals';

test('play', () => {
  const winner = play([
    new Warrior(-100, 'Warrior'),
    new Dwarf(-10, 'Dwarf'),
    new Archer(10, 'Archer'),
    new Crossbowman(100, 'Crossbowman'),
    new Mage(0, 'Mage'),
    new Demiurge(50, 'Demiurge'),
  ]);

  expect(winner).not.toBeNull();
  expect(winner.life).toBeGreaterThan(0);

  const nullWinner = play([]);
  expect(nullWinner).toBeNull();
});
