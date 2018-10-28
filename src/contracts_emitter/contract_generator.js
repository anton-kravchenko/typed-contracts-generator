// @flow
import { Emitter } from './emitter';
import type { Node } from './types';
import { isObject, isString } from 'typed-contracts';

export const generateContract = (
  source: Node,
  emitter: Emitter,
  varName: ?string,
): void => {
  switch (source.type) {
    case 'integer':
    case 'number':
      emitter.emit('val_type', 'number', varName);
      break;
    case 'boolean':
      emitter.emit('val_type', 'boolean', varName);
      break;
    case 'string':
      emitter.emit('val_type', 'string', varName);
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

      emitter.emit('ref_type', 'object', varName);
      // emitter.emit('print_new_line'); // TODO: incapsulate it to the object emitter

      required.forEach(fieldName => {
        const node = properties[fieldName];
        generateContract(node, emitter, fieldName);
      });

      emitter.emit('close_object'); // FIXME: bad implementation

      break;
    }
    case 'array': {
      const { items } = source;
      if (!items) {
        throw new Error(
          `Proper array node should have "items" field: ${JSON.stringify(
            source,
          )}`,
        );
      }

      emitter.emit('ref_type', 'array', varName);
      if ('object' === items.type) {
        generateContract(items, emitter);
      } else {
        emitter.emit(
          'val_type',
          items.type === 'integer' ? 'number' : items.type,
        );
      }
      emitter.emit('clean_tailing_comas_and_new_lines'); // FIXME: bad implementation
      emitter.emit('close_array'); // FIXME: bad implementation

      break;
    }
    default: {
      (source.type: empty);
      throw new Error(`Can't process "${source.type}" node.`);
    }
  }
};
