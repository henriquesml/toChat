import { makeSignUpValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Deve chamar ValidationComposite com todos os validadores', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['username', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
