// @flow
export const base = { a: [1] };
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
  },
};

export const contract = `isObject({
  a: isArray(isNumber),
});
`;
