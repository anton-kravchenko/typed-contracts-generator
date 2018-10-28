// @flow
import type { NodeTag, ContractType } from './types';

export const NodeEmitContractMapping = new Map<NodeTag, ContractType>();
NodeEmitContractMapping.set('object', 'isObject');
NodeEmitContractMapping.set('array', 'isArray');
NodeEmitContractMapping.set('boolean', 'isBoolean');
NodeEmitContractMapping.set('string', 'isString');
NodeEmitContractMapping.set('number', 'isNumber');
NodeEmitContractMapping.set('null', 'isNull');
