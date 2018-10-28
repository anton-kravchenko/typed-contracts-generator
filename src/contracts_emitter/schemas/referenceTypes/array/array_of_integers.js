// @flow

export const base = [1, 2];

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'integer',
    title: 'The Items Schema',
    default: 0,
    examples: [1, 2],
  },
};

export const contract = `isArray(isNumber);\n`;
