// @flow

export const base = false;
export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'boolean',
  title: 'The Root Schema',
  default: false,
};

export const contract = `isBoolean;\n`;
