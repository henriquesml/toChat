import faker from 'faker'
import { LocalGetCurrentUser } from './local-get-current-user'
import { GetStorageMock } from '../../tests'

type SutTypes = {
  sut: LocalGetCurrentUser
  getStorageMock: GetStorageMock
}

const makeSut = (): SutTypes => {
  const getStorageMock = new GetStorageMock()
  const sut = new LocalGetCurrentUser(getStorageMock)
  return {
    sut,
    getStorageMock
  }
}

describe('LocalGetCurrentUser', () => {
  test('Deve chama o setStorage correto', async() => {
    const { sut, getStorageMock } = makeSut()
    await sut.get()
    expect(getStorageMock.key).toBe('username')
  })

  test('Deve retornar o que o getStorage retorna', async() => {
    const { sut, getStorageMock } = makeSut()
    jest.spyOn(getStorageMock, 'get').mockResolvedValue('userData')
    const promise = await sut.get()
    expect(promise).toEqual({ id: 'userData', username: 'userData' })
  })

  test('Deve retornar uma string vazia caso o getStorage retorne null', async() => {
    const { sut, getStorageMock } = makeSut()
    jest.spyOn(getStorageMock, 'get').mockResolvedValue(null)
    const promise = await sut.get()
    expect(promise).toEqual({ id: '', username: '' })
  })

  test('Deve lançar uma exceção', async() => {
    const { sut, getStorageMock } = makeSut()
    jest.spyOn(getStorageMock, 'get').mockRejectedValueOnce(new Error())
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new Error())
  })
})
