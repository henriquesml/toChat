import faker from 'faker'
import { ApiAuthentication } from './api-authentication'
import { HttpPostClientSpy } from '../../tests'
import { HttpStatusCode } from '../../protocols/http'
import { mockAuthentication, mockUserModel } from '../../../domain/tests'
import { InvalidCredentialsError, UnexpectedError } from '../../../domain/erros'
import { AuthenticationParams } from '../../../domain/usecases'
import { UserModel } from '../../../domain/models'

type SutTypes = {
  sut: ApiAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, UserModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    UserModel
  >()
  const sut = new ApiAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('ApiAuthentication', () => {
  test('Deve chamar HttpPostClient com a URL correta', async() => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Deve chamar HttpPostClient com body correto', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Deve retornar uma exceção de credenciais inválidas quando HttpPostClient retornar 401', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 400', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 404', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar uma exceção de erro inesperado quando HttpPostClient retornar 500', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Deve retornar UserModel quando HttpPostClient retornar 200', async() => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockUserModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
