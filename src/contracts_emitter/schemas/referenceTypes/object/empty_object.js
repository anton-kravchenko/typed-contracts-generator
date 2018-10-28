// @flow
export const base = {};
export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
};
export const contract = `isObject{()}`; // TODO: check is contracts support that
