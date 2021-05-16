import { ValidationComposite } from '../validators'
import { MissingFieldError } from '../../presentation/errors'
import { ValidationSpy } from '../../presentation/tests/mocks'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Deve retornar um erro se qualqer uma das validações falhar', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingFieldError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Deve retornar o primeiro eror se mais de uma das validações falhar', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingFieldError(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Não deve retornar nada quando nenhuma validação falhar', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
