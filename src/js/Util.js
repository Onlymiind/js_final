export function assertType(val, valName, typ) {
  if (typeof (val) !== typ) {
    throw new Error('invalid ' + valName + ' type: expected ' + typ + ', got ' + typeof (val));
  }
}
