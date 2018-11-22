// @flow
import prettier from 'prettier';

const contractsNames = [
  'isObject',
  'isArray',
  'isNumber',
  'isBoolean',
  'isString',
  'isUnion',
  'isNull',
];

export const generateHeader = (contract: string): string => {
  const validatorImport = `import { validate, type ExtractType } from './validator';`;
  const header = `// @flow\n`;
  let contracts = [];

  for (const contractName of contractsNames) {
    if (contract.includes(contractName)) {
      contracts.push(contractName);
    }
  }

  // FIXME: line length from prettier

  const importLineStart = `import {`;
  const importLineEnd = `} from 'typed-contracts';`;

  return (
    prettier.format(header + importLineStart + contracts.join() + importLineEnd + validatorImport, {
      parser: 'babylon',
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 100,
    }) + '\n'
  );
};

// FIXME: should we support different type aliases?
export const generateJsModule = (contract: string, contractName: string): string => {
  const header = generateHeader(contract);
  const contractDefinition = `const ${contractName}Contract = ${contract};\n\n`;
  const typeDefinitionAndExport = `export type ${contractName}Type = ExtractType<typeof ${contractName}Contract>;\n`;
  const exportValidateFunc = `export const validate${contractName}Contract = validate<${contractName}Type>(
  ${contractName}Contract,
);`;
  return [header, contractDefinition, typeDefinitionAndExport, exportValidateFunc].join('') + '\n';
};
