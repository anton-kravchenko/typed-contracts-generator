// @flow

// FIXME: HOW TO HANDLE SEVERAL TYPES
// /Users/anton.kravchenko/typed-contracts-generator/test_schemas/result/data/airings/GET/0_schema

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

      emitter.emitObjectType(varName);

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

      emitter.emitArrayType(varName);
      if ('object' === items.type) {
        generateContract(items, emitter);
      } else {
        emitter.emitValType(items.type === 'integer' ? 'number' : items.type);
      }
      emitter.emitCleanTailingComasAndNewLines(); // FIXME: bad implementation
      emitter.emitCloseArray(items.type); // FIXME: bad implementation

      break;
    }
    // case 'null': {
    //   emitter.emitNullType(varName);
    //   break;
    // }
    default: {
      (source.type: empty);
      throw new Error(`Can't process "${source.type}" node.`);
    }
  }
};
