// @flow
import fs from 'fs';

// TODO: handle no file, read errors, parse error
export const readJsonSchema = (path: string) => {
  const jsonData = fs.readFileSync(path);
  const data = JSON.parse(jsonData);
  return data;
};
