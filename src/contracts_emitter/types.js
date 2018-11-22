/* eslint-disable no-use-before-define */
// @flow

export type NodeTag =
  | 'object'
  | 'array'
  | 'boolean'
  | 'string'
  | 'number'
  | 'integer'
  | 'null'
  | 'union'; // FIXME: check if its fine

export type ContractType =
  | 'isObject'
  | 'isArray'
  | 'isBoolean'
  | 'isString'
  | 'isNumber'
  | 'isNull'
  | 'isUnion';

export type ValueNodeType<T, V: NodeTag> = {
  definitions: {},
  $schema: string,
  $id: string,
  type: V,
  title: string,
  default: T,
};
export type ReferenceTypeNode = ObjectNodeType | ArrayNodeType;

export type NumberNode = ValueNodeType<number, 'number'>;
export type IntegerNode = ValueNodeType<number, 'integer'>;
export type StringNode = ValueNodeType<string, 'string'>;
export type BooleanNode = ValueNodeType<boolean, 'boolean'>;
export type NullNode = ValueNodeType<null, 'null'>;

// TODO: schemas are almost equal - use generics
export type ObjectNodeType = {
  definitions: {},
  $schema: string,
  $id: string,
  type: 'object',
  title: string,
  required?: Array<string>,
  properties?: { [key: string]: Node },
};

export type ArrayNodeType = {
  definitions: {},
  $schema: string,
  $id: string,
  type: 'array',
  title: string,
  items?: {
    $id: '#/items',
    type: NodeTag,
    title: string, //
    default: mixed, // TODO: improve
    examples: Array<mixed>,
  },
};

export type Node =
  | NumberNode
  | StringNode
  | BooleanNode
  | NullNode
  | IntegerNode
  | ObjectNodeType
  | ArrayNodeType; // TODO: add array type
