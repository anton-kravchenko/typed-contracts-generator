// @flow
import 'regenerator-runtime/runtime';

import { readJsonSchema } from './src/reader/f_reader';
import { parseCliArgs } from './src/cli/parser';
import { generateContract } from './src/contracts_emitter/contract_generator';
import { emitter } from './src/contracts_emitter/emitter';
import { writeFile } from './src/writter/f_writter';
import { generateJsModule } from './src/contracts_emitter/moduleGenerator';

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
  const opts = parseCliArgs();

  console.log('OPTIONS FROM MAIN1:', opts);
  console.log('MAIN END');

  const { source, dest } = opts;
  const data = readJsonSchema(source);

  generateContract(data, emitter);
  const contract = emitter.extract();

  const jsModule = generateJsModule(contract, 'SearchAutocomplete');
  writeFile(dest, jsModule);
};

main();
