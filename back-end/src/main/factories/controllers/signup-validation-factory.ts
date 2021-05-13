import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['username', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
  return new ValidationComposite(validations)
}
