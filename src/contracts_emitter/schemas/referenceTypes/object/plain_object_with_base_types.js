// @flow

export const base = { a: 1, b: '2', c: false };

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
      type: 'integer',
      title: 'The A Schema',
      default: 0,
      examples: [1],
    },
    b: {
      $id: '#/properties/b',
      type: 'string',
      title: 'The B Schema',
      default: '',
      examples: ['2'],
      pattern: '^(.*)$',
    },
    c: {
      $id: '#/properties/c',
      type: 'boolean',
      title: 'The C Schema',
      default: false,
      examples: [false],
    },
  },
};

export const contract = `isObject({
  a: isNumber,
  b: isString,
  c: isBoolean,
})('');
`;
