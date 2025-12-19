import { Crossbowman } from './js/Crossbowman';
import { Dwarf } from './js/Dwarf';
import { Archer } from './js/Archer';
import { Mage } from './js/Mage';
import { Demiurge } from './js/Demiurge';
import { Warrior } from './js/Warrior';
import { play } from './js/game';

play([
  new Warrior(-100, 'Warrior'),
  new Dwarf(-10, 'Dwarf'),
  new Archer(10, 'Archer'),
  new Crossbowman(100, 'Crossbowman'),
  new Mage(0, 'Mage'),
  new Demiurge(50, 'Demiurge'),
]);
