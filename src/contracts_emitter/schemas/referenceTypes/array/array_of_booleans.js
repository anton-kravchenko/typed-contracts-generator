// @flow

export const base = [true, false];

export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'array',
  title: 'The Root Schema',
  items: {
    $id: '#/items',
    type: 'boolean',
    title: 'The Items Schema',
    default: false,
    examples: [false, true],
  },
};

export const contract = `isArray(isBoolean)('');\n`;
