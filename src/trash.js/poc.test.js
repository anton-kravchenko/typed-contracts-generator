// @flow

// import { validateSearchAutocompleteContract } from '../../schemas/335';
import { isObject, isArray, isString, isNumber, isBoolean } from 'typed-contracts';
import { validate, type ExtractType } from '../../src/contracts_emitter/validator';

const { array, object, string, union, ValidationError } = require('typed-contracts');

// const val = isObject({
//   name: string,
//   gender: union('m', 'f'),
//   friends: array((valueName, value) => person(valueName, value)),
//   email: union(string, array(string)).optional,
// });

test('should return valid obj', () => {
  const val = object({
    a: array((valueName, value) =>
      object({
        b: string,
      })(valueName, value),
    ),
  })('');

  const obj = {
    a: [{ b: '123', slug: 456 }],
  };

  const r = val(obj);

  expect(r).toEqual(obj);
});

test('should return valid array of strings', () => {
  const val = object({
    a: array(string),
  })('');

  const obj = {
    a: ['a', 'bs', '1'],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('should return valid array of objects with number', () => {
  const val = isArray((valueName, value) =>
    isObject({
      a: isNumber,
    })(valueName, value),
  )('');

  const obj = [{ a: 1 }, { a: 1 }];

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('109', () => {
  const val = isArray((valueName, value) =>
    isObject({
      name: isString,
      slug: isString,
      source: isString,
    })(valueName, value),
  )('');

  const obj = [
    { name: 'name', slug: 'slug', source: 'source' },
    { name: 'name', slug: 'slug', source: 'source' },
  ];

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('115', () => {
  const val = isObject({
    movies: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    shows: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
  })('');
  const obj = {
    movies: [{ name: 'name', slug: 'slug' }],
    shows: [{ name: 'name', slug: 'slug' }],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('123', () => {
  const val = isObject({
    error: isObject({
      code: isNumber,
      description: isString,
    }),
  })('');

  const obj = {
    error: {
      code: 1,
      description: 'description',
    },
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('148', () => {
  const val = isObject({
    completions: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
        type: isString,
      })(valueName, value),
    ),
  })('');

  const obj = {
    completions: [
      {
        name: 'name',
        slug: 'slug',
        type: 'type',
      },
      {
        name: 'name',
        slug: 'slug',
        type: 'type',
      },
    ],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('174', () => {
  const val = isObject({
    count: isNumber,
    movies: isArray((valueName, value) =>
      isObject({
        movie: isObject({
          is_locked: isBoolean,
        }),
      })(valueName, value),
    ),
  })('');

  const obj = {
    count: 1,
    movies: [{ movie: { is_locked: false } }, { movie: { is_locked: true } }],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('246', () => {
  const val = isObject({
    'a-z': isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    genres: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    ratings: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
  })('');

  const obj = {
    'a-z': [{ name: 'isString', slug: 'isString' }],
    genres: [{ name: 'isString', slug: 'isString' }],
    ratings: [{ name: 'isString', slug: 'isString' }],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('251', () => {
  const val = isObject({
    'a-z': isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    genres: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    ratings: isArray((valueName, value) =>
      isObject({
        name: isString,
        slug: isString,
      })(valueName, value),
    ),
    whats_hot: isArray((valueName, value) =>
      isObject({
        genres: isArray((valueName, value) =>
          isObject({
            name: isString,
            slug: isString,
            source: isString,
          })(valueName, value),
        ),
        regions: isArray((valueName, value) =>
          isObject({
            name: isString,
            slug: isString,
            source: isString,
          })(valueName, value),
        ),
      })(valueName, value),
    ),
  })('');

  const obj = {
    'a-z': [{ name: 'isString', slug: 'isString' }],
    genres: [{ name: 'isString', slug: 'isString' }],
    ratings: [{ name: 'isString', slug: 'isString' }],
    whats_hot: [
      {
        genres: [{ name: 'isString', slug: 'isString', source: 'source' }],
        regions: [{ name: 'isString', slug: 'isString', source: 'string' }],
      },
    ],
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('334', () => {
  const val = isObject({
    contentRights: isObject({
      contentId: isString,
      usageRules: isObject({
        expirationDate: isString,
        viewingDuration: isNumber,
        viewingWindow: isString,
      }),
    }),
    errorCode: isNumber.optional,
    errorMessage: isString,
    portalData: isString,
    privateData: isString,
    status: isString,
  })('');

  const obj = {
    contentRights: {
      contentId: 'isString',
      usageRules: {
        expirationDate: 'isString',
        viewingDuration: 1,
        viewingWindow: 'isString',
      },
    },
    errorCode: 1,
    errorMessage: 'isString',
    portalData: 'isString',
    privateData: 'isString',
    status: 'isString',
  };

  const r = val(obj);
  expect(r).toEqual(obj);
});

test('multidimensional array', () => {
  const contract = isObject({
    sorts: isArray(isArray(isString)),
  })('');

  const base = { sorts: [['1'], ['1']] };

  expect(contract(base)).toEqual(base);
});

test('empty objects', () => {
  const contract = isObject({
    error: isString,
    timer_preferences: isObject({}),
  })('');

  const base = { error: '1', timer_preferences: { someAdditionalData: 123 } };
  expect(contract(base)).toEqual(base);
});
