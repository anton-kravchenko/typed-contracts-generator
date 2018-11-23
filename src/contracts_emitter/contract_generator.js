// @flow

// FIXME: HOW TO HANDLE SEVERAL TYPES
// /Users/anton.kravchenko/typed-contracts-generator/test_schemas/result/data/airings/GET/0_schema

// FIXME: test_schemas/result/data/airings/GET/0_schema
// airings: isUnion(isArray(isString), isNull, (valueName, value) => isObject({})), - "(valueName, value)" =>  is redundant
import { Emitter } from './emitter';
import type { Node } from './types';
import { isObject, isString } from 'typed-contracts';

export const generateContract = (source: Node, emitter: Emitter, varName: ?string): void => {
  if (Array.isArray(source.type)) {
    // source.type = source.type.join(','); // FIXME: this breaks tagged literal Node type
    emitter.emitUnionType(true, varName);
    source.type.forEach(type => {
      generateContract({ type }, emitter, null);
    });

    emitter.emitUnionType(false);
    return;
  }

  console.log('\n\n\nsource', source);
  if (source['anyOf']) {
    emitter.emitUnionType(true, varName);
    source['anyOf'].forEach(node => {
      generateContract(node, emitter, null); // null instead of property name because property is related to is union
    });

    emitter.emitUnionType(false);
    return;
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
      // FIXME: add valid type def for schema
      let { properties } = source; // NOTE: properties may not be present
      let { required } = source;

      // FIXME: add note about empty object
      // TODO: make tool that adds node type for every json schema to validate type itself !!!!!  - do it in first place, because it will help to implement exhaustive generation

      if (!properties) {
        // throw new Error(
        //   `Proper object node should have "properties" field: ${JSON.stringify(source)}`,
        // );

        // FIXME: add tolerant mode??? or remove

        console.error(
          `Proper object node should have "properties" field: ${JSON.stringify(source)}`,
        );
        required = [];
        properties = [];
      }

      if (!required) {
        console.error('Emulating "required" object field');
        required = Object.keys(properties);
      }

      emitter.emitObjectType(varName);

      if (Object.keys(properties).length !== required.length) {
        console.error(
          `Amount of properties in object doesn't match amount of required fields: properties - ${Object.keys(
            properties,
          )}, required - ${required} - emitting full list`, // FIXME: CALC delta between required and actual and add .optional postfix
        );

        required = Object.keys(properties); // - fixme - uncomment to enable generation of contracts for full list
      }

      required.forEach(fieldName => {
        const node = properties[fieldName];
        generateContract(node, emitter, fieldName);
      });

      emitter.emitCloseObject(); // FIXME: bad implementation

      break;
    }
    case 'object,null': {
      source.type = 'object';
      generateContract(source, emitter);
      emitter.emitOptionalType();

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
      // FIXME: array may have array in type
      if (Array.isArray(items.type)) {
        // items.type = items.type.join(','); // FIXME: check it
        generateContract(items, emitter);
      } else if ('object' === items.type) {
        generateContract(items, emitter);
      } else if ('array' === items.type) {
        generateContract(items, emitter);
      } else if (Array.isArray(items.anyOf)) {
        emitter.emitUnionType(true, null);
        items.anyOf.forEach(node => {
          generateContract(node, emitter, null);
        });
        emitter.emitUnionType(false);
      } else if (items.type === 'null') {
        emitter.emitNullType(null);
      } else {
        emitter.emitValType(items.type === 'integer' ? 'number' : items.type);
      }
      emitter.emitCleanTailingComasAndNewLines(); // FIXME: bad implementation
      emitter.emitCloseArray(items.type); // FIXME: bad implementation

      break;
    }
    // case 'array,null': {
    //   source.type = 'array';
    //   generateContract(source, emitter, varName);
    //   emitter.emitOptionalType();
    //   break;
    // }
    // case 'null,string':
    // case 'string,null': {
    //   emitter.emitValType('string', varName, true);
    //   break;
    // }
    // case 'null,integer':
    // case 'integer,null': {
    //   emitter.emitValType('number', varName, true);
    //   break;
    // }
    // case 'boolean,string': {
    //   emitter.emitValType('string', varName, true);
    //   break;
    // }
    case 'null': {
      emitter.emitNullType(varName);
      break;
    }
    case 'number,string':
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
