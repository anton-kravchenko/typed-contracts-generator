// @flow
import { Emitter } from './emitter';
import type { Node } from './types';
import { isObject, isString } from 'typed-contracts';

export const generateContract = (source: Node, emitter: Emitter, varName: ?string): void => {
  switch (source.type) {
    case 'integer':
    case 'number':
      emitter.emitValType('number', varName);
      break;
    case 'boolean':
      emitter.emitValType('boolean', varName);
      break;
    case 'string':
      emitter.emitValType('string', varName);
      break;
    case 'object': {
      const { required, properties } = source;
      if (!required || !properties) {
        throw new Error(
          `Proper object node should have "required" and "properties" fields: ${JSON.stringify(
            source,
          )}`,
        );
      }

      emitter.emitRefType('object', varName);
      // emitter.emit('print_new_line'); // TODO: incapsulate it to the object emitter

      required.forEach(fieldName => {
        const node = properties[fieldName];
        generateContract(node, emitter, fieldName);
      });

      emitter.emitCloseObject(); // FIXME: bad implementation

      break;
    }
    case 'array': {
      const { items } = source;
      if (!items) {
        throw new Error(`Proper array node should have "items" field: ${JSON.stringify(source)}`);
      }

      emitter.emitRefType('array', varName);
      if ('object' === items.type) {
        generateContract(items, emitter);
      } else {
        emitter.emitValType(items.type === 'integer' ? 'number' : items.type);
      }
      emitter.emitCleanTailingComasAndNewLines(); // FIXME: bad implementation
      emitter.emitCloseArray(); // FIXME: bad implementation

      break;
    }
    default: {
      (source.type: empty);
      throw new Error(`Can't process "${source.type}" node.`);
    }
  }
};
