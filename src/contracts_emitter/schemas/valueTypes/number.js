// @flow

export const base = 1;
export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'integer',
  title: 'The Root Schema',
  default: 0,
};
export const contract = `isNumber;\n`;
