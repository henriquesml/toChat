import { SignUpController, SignUpControllerRequest } from '@/presentation/controllers'
import { MissingParamError, ServerError, UsernameInUseError } from '@/presentation/errors'
import { ok, serverError, badRequest, forbidden } from '@/presentation/helpers'
import { AuthenticationSpy, ValidationSpy, AddUserSpy } from '@/presentation/tests/mocks'
import { throwError } from '@/domain/tests/mocks'

import faker from 'faker'

const mockRequest = (): SignUpControllerRequest => {
  const password = faker.internet.password()
  return {
    username: faker.name.findName(),
    password,
    confirmPassword: password
  }
}

type SutTypes = {
  sut: SignUpController
  addUserSpy: AddUserSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const addUserSpy = new AddUserSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(addUserSpy, validationSpy, authenticationSpy)
  return {
    sut,
    addUserSpy,
    validationSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  test('Deve retornar 500 se AddUser throws', async() => {
    const { sut, addUserSpy } = makeSut()
    jest.spyOn(addUserSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Deve chamar AddUser com os valores corretos', async() => {
    const { sut, addUserSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addUserSpy.params).toEqual({
      username: request.username,
      password: request.password
    })
  })

  test('Deve retornar 403 se AddUser retornar false', async() => {
    const { sut, addUserSpy } = makeSut()
    addUserSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new UsernameInUseError()))
  })

  test('Deve retornar 200 se os dados enviados forem válidos', async() => {
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

  test('Deve retornar 400 se Validation retornar um error', async() => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Deve chamar Authentication com os valores corretos', async() => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      username: request.username,
      password: request.password
    })
  })

  test('Deve retornar 500 se Authentication throws', async() => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
