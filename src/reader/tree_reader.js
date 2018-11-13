// @flow
import { spawnSync } from 'child_process';

// const cmd = 'find test_schemas -type f -name "0_schema"';
export const getPathsToSchemas = (dir: string): Array<string> => {
  const child = spawnSync('find', ['test_schemas', '-type', 'f', '-name', '0_schema']);
  // FIXME: track errors
  const paths = child.stdout.toString().split('\n');
  return paths.slice(0, paths.length - 2);
};
