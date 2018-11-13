// @flow
export const base = [{ a: 1 }];
export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'object',
    title: 'The Items Schema',
    required: ['a'],
    properties: {
      a: {
        $id: '#/items/properties/a',
        type: 'integer',
        title: 'The A Schema',
        default: 0,
        examples: [1],
      },
    },
  },
};
// const c = isArray(array((valueName, value) =>
//   isObject({
//     a: isNumber,
//   })(valueName, value),
// )('')

export const contract = `isArray((valueName, value) =>
  isObject({
    a: isNumber,
  })(valueName, value),
)('');
`;
