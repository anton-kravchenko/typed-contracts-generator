import { generateContract } from './contract_generator';
import { emitter } from './emitter';

import {
  numberSchema,
  booleanSchema,
  stringSchema,
  numberContract,
  booleanContract,
  stringContract,
} from './schemas/valueTypes';

import {
  plainObjectSchema,
  plainObjectContract,
  objectWith1NestingLevelSchema,
  objectWith1NestingLevelContract,
  objectWith2NestingLevelsSchema,
  objectWith2NestingLevelsContract,
  objectWith3NestingLevelsSchema,
  objectWith3NestingLevelsContract,
  objectWith4NestingLevelsContract,
  objectWith4NestingLevelsSchema,
  objectWith5NestingLevelsContract,
  objectWith5NestingLevelsSchema,
  crazyObjectSchema,
  crazyObjectContract,
  arrayOfIntegersSchema,
  arrayOfIntegersContract,
  arrayOfStringsSchema,
  arrayOfStringsContract,
  arrayOfBooleansSchema,
  arrayOfBooleansContract,
  arrayOfPlainObjectsSchema,
  arrayOfPlainObjectsContract,
  plainObjectWithAnArrayFieldSchema,
  plainObjectWithAnArrayFieldContract,
  plainObjectWith2ArrayFieldsSchema,
  plainObjectWith2ArrayFieldsContract,
  plainObjectWith3ArrayFieldsSchema,
  plainObjectWith3ArrayFieldsContract,
} from './schemas/referenceTypes';

afterEach(() => emitter.reset());

it('should emit number type', () => {
  generateContract(numberSchema, emitter);
  expect(emitter.extract()).toBe(numberContract);
});

it('should emit boolean type', () => {
  generateContract(booleanSchema, emitter);
  expect(emitter.extract()).toBe(booleanContract);
});

it('should emit string type', () => {
  generateContract(stringSchema, emitter);
  expect(emitter.extract()).toBe(stringContract);
});

it('should throw when processing unsupported node type', () => {
  expect(() => generateContract({ type: 'magic' }, emitter)).toThrow(
    `Can't process "magic" node.`,
  );
});

it(`should throw when receiving invalid object (with no "required" field`, () => {
  expect(() => generateContract({ type: 'object' }, emitter)).toThrow(
    `Proper object node should have "required" and "properties" fields: {"type":"object"}`,
  );
});

it('should properly emit plain object with 2 fields', () => {
  generateContract(plainObjectSchema, emitter);
  expect(emitter.extract()).toBe(plainObjectContract);
});

it('should properly emit object with 1 nesting level', () => {
  generateContract(objectWith1NestingLevelSchema, emitter);
  expect(emitter.extract()).toBe(objectWith1NestingLevelContract);
});

it('should properly emit object with 2 nesting levels', () => {
  generateContract(objectWith2NestingLevelsSchema, emitter);
  expect(emitter.extract()).toBe(objectWith2NestingLevelsContract);
});

it('should properly emit object with 3 nesting levels', () => {
  generateContract(objectWith3NestingLevelsSchema, emitter);
  expect(emitter.extract()).toBe(objectWith3NestingLevelsContract);
});

it('should properly emit object with 4 nesting levels', () => {
  generateContract(objectWith4NestingLevelsSchema, emitter);
  expect(emitter.extract()).toBe(objectWith4NestingLevelsContract);
});

it('should properly emit object with 5 nesting levels', () => {
  generateContract(objectWith5NestingLevelsSchema, emitter);
  expect(emitter.extract()).toBe(objectWith5NestingLevelsContract);
});

it('should properly emit contract for a crazy object', () => {
  generateContract(crazyObjectSchema, emitter);
  expect(emitter.extract()).toBe(crazyObjectContract);
});

it('should properly emit array of numbers', () => {
  generateContract(arrayOfIntegersSchema, emitter);
  expect(emitter.extract()).toBe(arrayOfIntegersContract);
});

it('should properly emit array of strings', () => {
  generateContract(arrayOfStringsSchema, emitter);
  expect(emitter.extract()).toBe(arrayOfStringsContract);
});

it('should properly emit array of booleans', () => {
  generateContract(arrayOfBooleansSchema, emitter);
  expect(emitter.extract()).toBe(arrayOfBooleansContract);
});

// TODO: add nested array example
it('should properly emit array of plain objects', () => {
  generateContract(arrayOfPlainObjectsSchema, emitter);
  expect(emitter.extract()).toBe(arrayOfPlainObjectsContract);
});

it('should properly emit object with array of strings', () => {
  generateContract(plainObjectWithAnArrayFieldSchema, emitter);
  expect(emitter.extract()).toBe(plainObjectWithAnArrayFieldContract);
});

it('should properly emit object with 2 array fields', () => {
  generateContract(plainObjectWith2ArrayFieldsSchema, emitter);
  expect(emitter.extract()).toBe(plainObjectWith2ArrayFieldsContract);
});

it('should properly emit object with 3 array fields', () => {
  generateContract(plainObjectWith3ArrayFieldsSchema, emitter);
  expect(emitter.extract()).toBe(plainObjectWith3ArrayFieldsContract);
});

// console.log('SCHEMA:', arrayOfPlainObjectsSchema);
// console.log('CONTRACT:', arrayOfPlainObjectsContract);
