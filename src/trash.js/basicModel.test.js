import { validBasicModel, invalidBasicModel, validateBasicModelContract } from './basicModel';

it('should return basicModel object', () => {
  expect(validateBasicModelContract(validBasicModel)).toBe(validBasicModel);
});

it('should throw and error when passing invalid basicModel', () => {
  expect(() => validateBasicModelContract(invalidBasicModel)).toThrow();
});
