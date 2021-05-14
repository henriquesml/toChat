import { makeLoginValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Deve chamar ValidationComposite com todos os validadores', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['username', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
