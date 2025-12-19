import { assertType } from './Util';
import { expect, test } from '@jest/globals';

test('assertType', () => {
  expect(() => assertType(1, '', 'number')).not.toThrow();
  expect(() => assertType(1, '', 'string')).toThrow(Error);
});
