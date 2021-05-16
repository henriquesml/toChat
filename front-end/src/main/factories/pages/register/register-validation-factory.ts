import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '../../../../validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeRegisterValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['username', 'senha', 'confirmação de senha']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('senha', 'confirmação de senha'))
  return new ValidationComposite(validations)
}
