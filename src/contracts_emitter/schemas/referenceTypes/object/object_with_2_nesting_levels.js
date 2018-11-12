// @flow
export const base = {
  a: {
    b: 1,
  },
};

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['a'],
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
  },
};

export const contract = `isObject({
  a: isObject({
    b: isNumber,
  })(''),
})('');
`;
