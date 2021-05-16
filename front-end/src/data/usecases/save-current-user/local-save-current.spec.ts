import faker from 'faker'
import { LocalSaveCurrentUser } from './local-save-current-user'
import { SetStorageMock } from '../../tests'

type SutTypes = {
  sut: LocalSaveCurrentUser
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveCurrentUser(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveCurrentUser', () => {
  test('Deve chama o setStorage correto', async() => {
    const { sut, setStorageMock } = makeSut()
    const id = faker.random.alphaNumeric()
    const username = faker.internet.userName()
    await sut.save(id, username)
    expect(setStorageMock.key).toBe('username')
  })

  test('Deve chamar o setStorage com o valor correto', async() => {
    const { sut, setStorageMock } = makeSut()
    const id = faker.random.alphaNumeric()
    const username = faker.internet.userName()
    await sut.save(id, username)
    expect(setStorageMock.value).toBe(username)
  })

  test('Deve lançar uma exceção', async() => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save('', '')
    await expect(promise).rejects.toThrow(new Error())
  })
})
