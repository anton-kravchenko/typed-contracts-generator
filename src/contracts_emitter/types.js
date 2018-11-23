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

export type ValueNodeType<T, V: NodeTag> = {|
  $id?: string,
  type: V,
  title?: string,
  default?: T,
|};

export type ReferenceTypeNode = ObjectNodeType | ArrayNodeType;

// export type IntegerNode = {
//   type: 'integer',
// };

export type NumberNode = ValueNodeType<number, 'number'>;
export type IntegerNode = ValueNodeType<number, 'integer'>;
export type StringNode = ValueNodeType<string, 'string'>;
export type BooleanNode = ValueNodeType<boolean, 'boolean'>;
export type NullNode = {
  type: 'null',
};

// TODO: schemas are almost equal - use generics

export type EmptySchemaType = {
  $schema: string,
  // $id?: string,
};

export type ObjectNodeType = {
  type: 'object',
  title?: string,
  required?: Array<string>,
  properties?: {
    [key: string]:
      | {
          type: NodeTag, // | Array<NodeTag>,
        }
      | anyOfNode,
  },
};

export type anyOfNode = { anyOf: Array<ObjectNodeType | NullNode | ArrayNodeType> };

export type ArrayNodeType = {
  type: 'array',
  title?: string,
  items?: { type: NodeTag | Array<NodeTag> },
};

export type Node =
  | NumberNode
  | StringNode
  | BooleanNode
  | NullNode
  | IntegerNode
  | ObjectNodeType
  | ArrayNodeType // TODO: add array type
  | anyOfNode;
// | (EmptySchemaType & { type: Array<NodeTag> });
