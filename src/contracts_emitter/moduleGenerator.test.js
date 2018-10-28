import { generateHeader, generateJsModule } from './moduleGenerator';

describe('test moduleGenerator module', () => {
  it('should properly generate header with all required imports (4 imports)', () => {
    const contract = `isObject({
    a: isObject({
        b: isNumber,
        c: isBoolean,
    }),
    b: isArray(is)`;
    const expectedHeader = `// @flow
import { isObject, isArray, isNumber, isBoolean } from 'typed-contracts';
import { validate, type ExtractType } from './validator';

`;

    expect(generateHeader(contract)).toBe(expectedHeader);
  });

  it('should properly generate header with all required imports (5 imports)', () => {
    const contract = `isObject({
    a: isObject({
        b: isNumber,
        c: isBoolean,
        d: isString,
    }),
    b: isArray(is)`;
    const expectedHeader = `// @flow
import {
  isObject,
  isArray,
  isNumber,
  isBoolean,
  isString,
} from 'typed-contracts';
import { validate, type ExtractType } from './validator';

`;

    expect(generateHeader(contract)).toBe(expectedHeader);
  });

  it('should properly generate basic js module', () => {
    const contractName = 'BasicModel';
    const contract = `isObject({
  id: isNumber,
  type: isString,
})`;

    const expectedModule = `// @flow
import { isObject, isNumber, isString } from 'typed-contracts';
import { validate, type ExtractType } from './validator';

const ${contractName}Contract = ${contract};

export type ${contractName}Type = ExtractType<typeof ${contractName}Contract>;
export const validate${contractName}Contract = validate<${contractName}Type>(
  ${contractName}Contract,
);
`;
    expect(generateJsModule(contract, contractName)).toBe(expectedModule);
  });
});
