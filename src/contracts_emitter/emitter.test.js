// @flow
import { Emitter } from './emitter';

let emitter;
beforeEach(() => (emitter = new Emitter()));

it('should have 0 in initial tabs amount field', () => {
  expect(emitter.tabulate()).toEqual('');
});

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter
// it('should properly add tabs', () => {
//   emitter.addTab();
//   expect(emitter.extract()).toEqual('  ');
// });

// it('should properly delete tabs', () => {
//   emitter.addTab();
//   emitter.deleteTab();
//   expect(emitter.tabulate()).toEqual('');
// });

it('should properly react to "print_tab" event ', () => {
  emitter.emitPrintTab('current');
  expect(emitter.tabulate()).toEqual('');

  emitter.emitPrintTab('more');
  expect(emitter.tabulate()).toEqual('  ');

  emitter.emitPrintTab('more');
  expect(emitter.tabulate()).toEqual('    ');

  emitter.emitPrintTab('less');
  expect(emitter.tabulate()).toEqual('  ');

  emitter.emitPrintTab('less');
  expect(emitter.tabulate()).toEqual('');
});

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter
// it('should append new line to the output', () => {
//   emitter.emitPrintTab('more');
//   emitter.emit('print_new_line');
//   expect(emitter.extract()).toEqual('  ');
// });

// it('should properly emit variable with number type', () => {
//   emitter.emitValType('number', 'numberVar');
//   expect(emitter.extract()).toBe(`numberVar: isNumber;\n`);
// });

it('should properly emit variable with number type (without var name)', () => {
  emitter.emitValType('number', null);
  expect(emitter.extract()).toBe(`isNumber('');\n`);
});

// it('should emit variable with string type', () => {
//   emitter.emitValType('string', 'stringVar');
//   expect(emitter.extract()).toBe(`"stringVar": isString('');\n`);
// });

it('should emit variable with string type (without var name)', () => {
  emitter.emitValType('string', null);
  expect(emitter.extract()).toBe(`isString('');\n`);
});

// it('should emit variable with boolean type', () => {
//   emitter.emitValType('boolean', 'booleanVar');
//   expect(emitter.extract()).toBe(`"booleanVar": isBoolean('');\n`);
// });

it('should emit variable with boolean type (without var name)', () => {
  emitter.emitValType('boolean', null);
  expect(emitter.extract()).toBe(`isBoolean('');\n`);
});

it('should emit variable with object type', () => {
  emitter.emitRefType('object', 'objectVar');
  expect(emitter.extract()).toBe('"objectVar": isObject({');
});

it('should emit variable with object type (without var name)', () => {
  emitter.emitRefType('object', null);
  expect(emitter.extract()).toBe('isObject({');
});

it('should emit array of integers', () => {
  emitter.emitRefType('array', null);
  expect(emitter.extract()).toBe(`isArray(`);
});

it('should properly react to "close_array" event', () => {
  emitter.emitCloseArray();
  expect(emitter.result).toBe(")(''),\n");
});

it('should throw when receiving unsupported type', () => {
  expect(() => emitter.emitValType('magic', 'variable')).toThrow(`"magic" type is not supported.`);
});

it('should cur all unnecessary new lines and trailing comas', () => {
  const message = 'core,\n\n\n,,,,,\n,\n,';
  expect(emitter.cleanTailTrailingComasAndNewLines(message)).toBe('core');
});
