import { LoginController, LoginControllerRequest } from '@/presentation/controllers'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/tests/mocks'
import { throwError } from '@/domain/tests/mocks'

import faker from 'faker'

const mockRequest = (): LoginControllerRequest => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  test('Deve chamar o Authentication com os valores corretos', async() => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      username: request.username,
      password: request.password
    })
  })

  test('Deve retornar 401 se as credênciais estiverem inválidas', async() => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Deve retornar 500 se Authentication throws', async() => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve retornar 200 se as credênciais estiverem válidas', async() => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })

  test('Deve chamar Validation com o valor correto', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Deve retornar 400 se Validation retornar um erro', async() => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })
})
