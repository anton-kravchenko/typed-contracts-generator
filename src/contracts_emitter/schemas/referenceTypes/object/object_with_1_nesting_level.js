// @flow
export const base = {
  a: {
    b: 1,
  },
  c: {
    d: '1',
  },
};

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['a', 'c'],
  properties: {
    a: {
      $id: '#/properties/a',
      type: 'object',
      title: 'The A Schema',
      required: ['b'],
      properties: {
        b: {
          $id: '#/properties/a/properties/b',
          type: 'integer',
          title: 'The B Schema',
          default: 0,
          examples: [1],
        },
      },
    },
    c: {
      $id: '#/properties/c',
      type: 'object',
      title: 'The C Schema',
      required: ['d'],
      properties: {
        d: {
          $id: '#/properties/c/properties/d',
          type: 'string',
          title: 'The D Schema',
          default: '',
          examples: ['1'],
          pattern: '^(.*)$',
        },
      },
    },
  },
};

export const contract = `isObject({
  a: isObject({
    b: isNumber,
  }),
  c: isObject({
    d: isString,
  }),
});
`;
