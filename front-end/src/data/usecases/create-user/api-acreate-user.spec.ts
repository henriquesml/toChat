import faker from 'faker'
import { ApiCreateUser } from './api-create-user'
import { HttpPostClientSpy } from '../../tests'
import { HttpStatusCode } from '../../protocols/http'
import { mockCreateUser, mockUserModel } from '../../../domain/tests'
import { InvalidCredentialsError, UnexpectedError, UsernameInUseError } from '../../../domain/erros'
import { AuthenticationParams } from '../../../domain/usecases'
import { UserModel } from '../../../domain/models'

type SutTypes = {
  sut: ApiCreateUser
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, UserModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    UserModel
  >()
  const sut = new ApiCreateUser(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('ApiCreateUser', () => {
  test('Deve chamar HttpPostClient com a URL correta', async() => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.createUser(mockCreateUser())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Deve chamar HttpPostClient com body correto', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockCreateUser()
    await sut.createUser(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Deve retornar uma exceção de credenciais inválidas quando HttpPostClient retornar 401', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.createUser(mockCreateUser())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Deve retornar uma exceção de usuário em uso quando HttpPostClient retornar 403', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.createUser(mockCreateUser())
    await expect(promise).rejects.toThrow(new UsernameInUseError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 400', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.createUser(mockCreateUser())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 404', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.createUser(mockCreateUser())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 500', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.createUser(mockCreateUser())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar UserModel quando HttpPostClient retornar 200', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockUserModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.createUser(mockCreateUser())
    expect(account).toEqual(httpResult)
  })
})
