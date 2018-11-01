// @flow
import 'regenerator-runtime/runtime';

import { readJsonSchema } from './src/file_reader';
import { parseCliArgs } from './src/cli/parser';

/* TODO:
 - parser:
   - null
   - empty object
   - array object
   - handle optional arguments
   - check compliance with typed-contract (add tests)
   - handle union types
   - emit "smart" import statement
   - add cli. Args
    - required: src, dest
    - optional: pretty print (low priority: read .prettierrc file, tabs/spaces, tab size
    - enhancers like var name, contract name, e.t.c.
  - generated file should be syntactically valid and "usable" out of the box
  - add config files (var name?, path to dir with schemas, e.t.c)
  - fink of ability to generate all schemas at once and emitting appropriate tree of contracts
  - get rid of react-scripts?
  - add version
  - add node version to pkj
*/

const main = async () => {
  const opts = await parseCliArgs();
  console.log('OPTIONS FROM MAON:', opts);
};

main();
