// @flow
export const base = {
  a: {
    b: {
      c: {
        d: 1,
      },
    },
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
          type: 'object',
          title: 'The B Schema',
          required: ['c'],
          properties: {
            c: {
              $id: '#/properties/a/properties/b/properties/c',
              type: 'object',
              title: 'The C Schema',
              required: ['d'],
              properties: {
                d: {
                  $id: '#/properties/a/properties/b/properties/c/properties/d',
                  type: 'integer',
                  title: 'The D Schema',
                  default: 0,
                  examples: [1],
                },
              },
            },
          },
        },
      },
    },
  },
};

export const contract = `isObject({
  a: isObject({
    b: isObject({
      c: isObject({
        d: isNumber,
      })(''),
    })(''),
  })(''),
})('');
`;
