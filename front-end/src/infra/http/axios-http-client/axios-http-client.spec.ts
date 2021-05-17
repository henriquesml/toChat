import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '../../tests'
import { mockPostRequest } from '../../../data/tests'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Deve chamar o axios com a URL, o verbo e o body correto', async() => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Deve retornar o statusCode e o body correto', async() => {
    const { sut, mockedAxios } = makeSut()
    const httpResponsePromise = sut.post(mockPostRequest())
    expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('Deve retornar o statusCode e o body correto quando a requisição falhar', async() => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const httpResponsePromise = sut.post(mockPostRequest())
    expect(httpResponsePromise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
