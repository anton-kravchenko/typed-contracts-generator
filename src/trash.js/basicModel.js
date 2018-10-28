// @flow
import * as t from "typed-contracts";
import { validate, type ExtractType } from "../contracts_emitter/validator";

const BasicModelContract = t.isObject({
  id: t.isNumber,
  type: t.isString
})("campaign");

export type BasicModelT = ExtractType<typeof BasicModelContract>;
export const validateBasicModelContract = validate<BasicModelT>(
  BasicModelContract
);

export const validBasicModel: BasicModelT = { id: 1, type: "s" };
export const invalidBasicModel: BasicModelT = { id: 1 };

const {
  array,
  object,
  string,
  union,
  ValidationError
} = require("typed-contracts");

type Person = {
  name: string,
  gender: "m" | "f",
  friends: $ReadOnlyArray<Person>,
  email?: string | $ReadOnlyArray<string>
};

// person returns Person-compatible value or ValidationError
const person = object({
  name: string,
  gender: union("m", "f"),
  friends: array((valueName, value) => person(valueName, value)),
  email: union(string, array(string)).optional
});

// We need to control compatibility of the return value type with Person
const userValidate: (value: mixed) => Person | ValidationError = person("user");

const user = userValidate({ name: "Vasya" });
