import { RequiredFieldValidation } from '../validators'
import { MissingFieldError } from '../../presentation/errors'

import faker from 'faker'

const field = faker.random.word()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Deve retornar um MissingFieldError se a validação falhar', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new MissingFieldError(field))
  })

  test('Não retorna nada se a validação for sucesso', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
