import { emitter } from './emitter';

beforeEach(() => emitter.reset());

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
  emitter.emit('print_tab', 'current');
  expect(emitter.tabulate()).toEqual('');

  emitter.emit('print_tab', 'more');
  expect(emitter.tabulate()).toEqual('  ');

  emitter.emit('print_tab', 'more');
  expect(emitter.tabulate()).toEqual('    ');

  emitter.emit('print_tab', 'less');
  expect(emitter.tabulate()).toEqual('  ');

  emitter.emit('print_tab', 'less');
  expect(emitter.tabulate()).toEqual('');
});

// FIXME: remove code styling (tabs, spacing, e.t.c) from emitter
// it('should append new line to the output', () => {
//   emitter.emit('print_tab', 'more');
//   emitter.emit('print_new_line');
//   expect(emitter.extract()).toEqual('  ');
// });

it('should properly emit variable with number type', () => {
  emitter.emit('val_type', 'number', 'numberVar');
  expect(emitter.extract()).toBe(`numberVar: isNumber;\n`);
});

it('should properly emit variable with number type (without var name)', () => {
  emitter.emit('val_type', 'number', null);
  expect(emitter.extract()).toBe(`isNumber;\n`);
});

it('should emit variable with string type', () => {
  emitter.emit('val_type', 'string', 'stringVar');
  expect(emitter.extract()).toBe('stringVar: isString;\n');
});

it('should emit variable with string type (without var name)', () => {
  emitter.emit('val_type', 'string', null);
  expect(emitter.extract()).toBe('isString;\n');
});

it('should emit variable with boolean type', () => {
  emitter.emit('val_type', 'boolean', 'booleanVar');
  expect(emitter.extract()).toBe('booleanVar: isBoolean;\n');
});

it('should emit variable with boolean type (without var name)', () => {
  emitter.emit('val_type', 'boolean', null);
  expect(emitter.extract()).toBe('isBoolean;\n');
});

it('should emit variable with object type', () => {
  emitter.emit('ref_type', 'object', 'objectVar');
  expect(emitter.extract()).toBe('objectVar: isObject({');
});

it('should emit variable with object type (without var name)', () => {
  emitter.emit('ref_type', 'object', null);
  expect(emitter.extract()).toBe('isObject({');
});

it('should emit array of integers', () => {
  emitter.emit('ref_type', 'array', null);
  expect(emitter.extract()).toBe(`isArray(`);
});

it('should properly react to "close_array" event', () => {
  emitter.emit('close_array');
  expect(emitter.result).toBe('),\n');
});

it('should throw when receiving unsupported type', () => {
  expect(() => emitter.emit('val_type', 'magic', 'variable')).toThrow(
    `"magic" type is not supported.`,
  );
});

it('should cur all unnecessary new lines and trailing comas', () => {
  const message = 'core,\n\n\n,,,,,\n,\n,';
  expect(emitter.cleanTailTrailingComasAndNewLines(message)).toBe('core');
});
