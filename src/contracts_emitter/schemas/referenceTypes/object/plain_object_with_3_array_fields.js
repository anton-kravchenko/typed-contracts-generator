// @flow

export const base = {
  a: [1],
  b: ['1'],
  c: [false, true],
};

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['a', 'b', 'c'],
  properties: {
    a: {
      $id: '#/properties/a',
      type: 'array',
      title: 'The A Schema',
      items: {
        $id: '#/properties/a/items',
        type: 'integer',
        title: 'The Items Schema',
        default: 0,
        examples: [1],
      },
    },
    b: {
      $id: '#/properties/b',
      type: 'array',
      title: 'The B Schema',
      items: {
        $id: '#/properties/b/items',
        type: 'string',
        title: 'The Items Schema',
        default: '',
        examples: ['1'],
        pattern: '^(.*)$',
      },
    },
    c: {
      $id: '#/properties/c',
      type: 'array',
      title: 'The C Schema',
      items: {
        $id: '#/properties/c/items',
        type: 'boolean',
        title: 'The Items Schema',
        default: false,
        examples: [false, true],
      },
    },
  },
};

export const contract = `isObject({
  a: isArray(isNumber),
  b: isArray(isString),
  c: isArray(isBoolean),
});
`;
