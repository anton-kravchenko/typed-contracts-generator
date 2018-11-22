// @flow

// FIXME: HOW TO HANDLE SEVERAL TYPES
// /Users/anton.kravchenko/typed-contracts-generator/test_schemas/result/data/airings/GET/0_schema

import { Emitter } from './emitter';
import type { Node } from './types';
import { isObject, isString } from 'typed-contracts';

export const generateContract = (source: Node, emitter: Emitter, varName: ?string): void => {
  if (Array.isArray(source.type)) {
    source.type = source.type.join(','); // FIXME: this breaks tagged literal Node type
  }

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
      const { properties } = source;
      let { required } = source;

      if (!properties) {
        throw new Error(
          `Proper object node should have "properties" field: ${JSON.stringify(source)}`,
        );
      }
      if (!required) {
        console.error('Emulating "required" object field');
        required = Object.keys(properties);
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
      let { items } = source;
      if (!items) {
        const errMessage = `Proper array node should have "items" field: ${JSON.stringify(source)}`;
        console.error(errMessage);
        console.log('EMULATING STRING ITEMS');
        items = { type: 'string' };
        if (false) {
          // FIXME: ADD MODE, which tries to fix some errors and report them
          throw new Error(errMessage);
        }
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
    case 'null,string':
    case 'string,null': {
      emitter.emitValType('string', varName, true);
      break;
    }
    case 'null,integer':
    case 'integer,null': {
      emitter.emitValType('number', varName, true);
      break;
    }
    // case 'boolean,string': {
    //   emitter.emitValType('string', varName, true);
    //   break;
    // }
    case 'null': {
      emitter.emitNullType(varName);
      break;
    }
    // case 'integer,string': {
    //   emitter.emitValType('string', varName, true);
    //   break;
    // }
    case 'integer,string': {
      emitter.emitUnionType(true, varName);

      const intNode: Node = {
        type: 'number',
        definitions: {},
        $schema: '',
        $id: '',
        title: '',
        default: 0,
      };

      const srtNode: Node = {
        type: 'string',
        definitions: {},
        $schema: '',
        $id: '',
        title: '',
        default: '',
      };

      generateContract(intNode, emitter);
      generateContract(srtNode, emitter);

      emitter.emitUnionType(false);
      break;
    }
    case 'boolean,string': {
      emitter.emitUnionType(true, varName);

      const intNode: Node = {
        type: 'number',
        definitions: {},
        $schema: '',
        $id: '',
        title: '',
        default: 0,
      };

      const boolNode: Node = {
        type: 'boolean',
        definitions: {},
        $schema: '',
        $id: '',
        title: '',
        default: false,
      };

      generateContract(intNode, emitter);
      generateContract(boolNode, emitter);

      emitter.emitUnionType(false);
      break;
    }
    default: {
      (source.type: empty);
      throw new Error(`Can't process "${source.type}" node.`);
    }
  }
};
