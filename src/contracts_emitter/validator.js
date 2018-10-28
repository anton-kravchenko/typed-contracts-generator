// @flow
import { ValidationError } from 'typed-contracts';

type Validator<T> = mixed => ValidationError | T;
type StrictValidator<T> = mixed => T;

export function validate<T>(validator: Validator<T>): StrictValidator<T> {
  return (value: mixed) => {
    const validationResult = validator(value);
    if (validationResult instanceof ValidationError) {
      throw validationResult;
    }
    return (validationResult: T);
  };
}

export type ExtractType<C: Validator<mixed>> = $Call<
  $Call<typeof validate, C>,
  mixed,
>;
