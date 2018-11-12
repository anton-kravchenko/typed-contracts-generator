// @flow

import { validateSearchAutocompleteContract } from '../../schemas/335';
import { isObject, isArray, isString } from 'typed-contracts';
import { validate, type ExtractType } from '../../src/contracts_emitter/validator';

const { array, object, string, union, ValidationError } = require('typed-contracts');

const val = object({
  a: array((valueName, value) =>
    object({
      b: string,
    })(valueName, value),
  ),
})('');

// const val = isObject({
//   name: string,
//   gender: union('m', 'f'),
//   friends: array((valueName, value) => person(valueName, value)),
//   email: union(string, array(string)).optional,
// });

test('should return valid obj', () => {
  const obj = {
    a: [{ b: '123', slug: 456 }],
  };

  const r = val(obj);
  console.log(r);
  expect(r).toEqual(obj);
});
