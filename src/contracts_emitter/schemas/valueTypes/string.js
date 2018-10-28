// @flow

export const base = '1';
export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'string',
  title: 'The Root Schema',
  default: '',
  pattern: '^(.*)$',
};
export const contract = `isString;\n`;
