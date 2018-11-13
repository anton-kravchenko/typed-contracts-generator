// @flow
import 'regenerator-runtime/runtime';
import fs from 'fs';

import { readJsonSchema } from './src/reader/f_reader';
import { parseCliArgs } from './src/cli/parser';
import { generateContract } from './src/contracts_emitter/contract_generator';
import { Emitter } from './src/contracts_emitter/emitter';
import { writeFile } from './src/writter/f_writter';
import { generateJsModule } from './src/contracts_emitter/moduleGenerator';
import { getPathsToSchemas } from './src/reader/tree_reader';

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

const emitter = new Emitter();

const notValidJsons = [];
const nullNodes = [];
const emptyJSONSchemas = [];

const generateModule = (source: string, dest: string, name: string) => {
  try {
    emitter.reset();
    const data = readJsonSchema(source);

    generateContract(data, emitter);
    const contract = emitter.extract();

    const jsModule = generateJsModule(contract, 'SearchAutocomplete');
    writeFile(dest, jsModule);
    console.log(`Generating ${dest} - ${jsModule.length}`);
  } catch (e) {
    if (e.message.includes('- empty json schema')) {
      emptyJSONSchemas.push(e);
    } else if (e.message.includes('not a valid JSON file')) {
      notValidJsons.push(e);
    } else if (e.message.includes(`Can't process "null" node`)) {
      nullNodes.push(source + e.message);
    } else {
      console.error(`Fail to generate js module for ${source} - ${e}`);
    }
    // console.error(`Fail to generate js module for ${source}`);
  }
};

const main = async () => {
  const opts = parseCliArgs();

  console.log('OPTIONS FROM MAIN1:', opts);

  const pathsToSchemas = getPathsToSchemas('./test_schemas/');

  let id = 500;

  console.log('SCHEMAS AMOUNT: ', pathsToSchemas.length);

  const mapping = JSON.parse(fs.readFileSync('./manifest.json').toString());

  pathsToSchemas.forEach(pathToSchema => {
    let resultingPath = mapping[pathToSchema];
    if (!resultingPath) {
      resultingPath = `./newSchemas/${id}.js`;
      id++;
      console.log('GEN NEW NAME');
    }

    generateModule(pathToSchema, resultingPath, id.toString());
  });
  console.log(`\n\n\n NOT VALID JSONS (${notValidJsons.length}):\n ${notValidJsons.join('\n')}`);
  console.log(`\n\n\n NULL NODES (${nullNodes.length}):\n ${nullNodes.join('\n')}`);
  console.log(`\n\n\n EMPTY SHEMAS (${emptyJSONSchemas.length}):\n ${emptyJSONSchemas.join('\n')}`);

  console.log('MAIN END');
};

main();
