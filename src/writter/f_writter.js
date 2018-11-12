// @flow

import fs from 'fs';
// TODO: integrate with error codes if needed

export const writeFile = (fPath: string, data: string): void => {
  try {
    fs.writeFileSync(fPath, data);
  } catch (e) {
    console.error(`Failed to write file ${fPath}: ${e}`);
    process.exit(1);
  }
};
